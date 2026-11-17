export function float32ToPcm16Base64(input: Float32Array): string {
  const buffer = new ArrayBuffer(input.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export function float32ToPcm16ArrayBuffer(input: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(input.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

export function pcm16Base64ToFloat32(base64: string): Float32Array {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const view = new DataView(bytes.buffer);
  const samples = len / 2;
  const out = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    out[i] = view.getInt16(i * 2, true) / 32768;
  }
  return out;
}

export function computeRms(input: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input[i] * input[i];
  }
  return Math.sqrt(sum / Math.max(1, input.length));
}

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const idx = result.indexOf(',');
      resolve(idx >= 0 ? result.slice(idx + 1) : result);
    };
    reader.onerror = () => reject(new Error('Failed to read binary blob'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Gapless 24kHz PCM Output Scheduler with Barge-In Interrupt & AnalyserNode
 */
export class GaplessPcmPlayer {
  private ctx: AudioContext;
  private analyser: AnalyserNode;
  private nextStartTime = 0;
  private activeSources = new Set<AudioBufferSourceNode>();
  private onSpeakingChange?: (speaking: boolean) => void;

  constructor(onSpeakingChange?: (speaking: boolean) => void) {
    this.ctx = new AudioContext({ sampleRate: 24000 });
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 128;
    this.analyser.connect(this.ctx.destination);
    this.onSpeakingChange = onSpeakingChange;
  }

  async resume() {
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  enqueueBase64Pcm(base64: string) {
    const float32 = pcm16Base64ToFloat32(base64);
    if (float32.length === 0) return;

    const buffer = this.ctx.createBuffer(1, float32.length, 24000);
    buffer.getChannelData(0).set(float32);

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.analyser);

    const now = this.ctx.currentTime;
    if (this.nextStartTime < now) {
      this.nextStartTime = now + 0.02;
    }

    source.start(this.nextStartTime);
    this.nextStartTime += buffer.duration;

    this.activeSources.add(source);
    this.onSpeakingChange?.(true);

    source.onended = () => {
      this.activeSources.delete(source);
      if (this.activeSources.size === 0) {
        this.onSpeakingChange?.(false);
      }
    };
  }

  interrupt() {
    for (const src of this.activeSources) {
      try {
        src.stop();
      } catch {
        // Ignore already stopped source
      }
    }
    this.activeSources.clear();
    this.nextStartTime = this.ctx.currentTime;
    this.onSpeakingChange?.(false);
  }

  getFrequencyData(target: Uint8Array<ArrayBuffer>) {
    this.analyser.getByteFrequencyData(target);
  }

  async close() {
    this.interrupt();
    if (this.ctx.state !== 'closed') {
      await this.ctx.close();
    }
  }
}
