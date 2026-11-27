import type { ImageAspectRatio } from '../../types/index';
import { generateUUID } from '#lib/uuid';

export interface ImageGenerationRequest {
  prompt: string;
  aspectRatio?: ImageAspectRatio;
  size?: string;
  model?: string;
  signal?: AbortSignal;
}

export interface ImageGenerationResult {
  id: string;
  imageUrl: string;
  revisedPrompt?: string;
  aspectRatio: ImageAspectRatio;
  size: string;
  createdAt: string;
}

export interface ImageApiConfig {
  endpoint: string;
  apiKey: string;
  model: string;
  configured: boolean;
}

export const IMAGE_ASPECT_RATIOS: ReadonlyArray<{
  id: ImageAspectRatio;
  label: string;
  size: string;
}> = [
  { id: '1:1', label: '1:1', size: '1024x1024' },
  { id: '16:9', label: '16:9', size: '1792x1024' },
  { id: '9:16', label: '9:16', size: '1024x1792' },
  { id: '4:3', label: '4:3', size: '1152x896' },
  { id: '3:4', label: '3:4', size: '896x1152' },
];

export const ASPECT_RATIO_TO_SIZE: Record<ImageAspectRatio, string> = {
  '1:1': '1024x1024',
  '16:9': '1792x1024',
  '9:16': '1024x1792',
  '4:3': '1152x896',
  '3:4': '896x1152',
};

function readViteEnv(key: 'VITE_IMAGE_API_KEY' | 'VITE_IMAGE_ENDPOINT' | 'VITE_IMAGE_MODEL'): string {
  try {
    const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
    const val = env?.[key];
    return typeof val === 'string' ? val.trim() : '';
  } catch {
    return '';
  }
}

export function getImageApiConfig(overrides?: {
  endpoint?: string;
  apiKey?: string;
  model?: string;
}): ImageApiConfig {
  const endpoint = (overrides?.endpoint ?? readViteEnv('VITE_IMAGE_ENDPOINT')).trim();
  const apiKey = (overrides?.apiKey ?? readViteEnv('VITE_IMAGE_API_KEY')).trim();
  const model = (overrides?.model ?? readViteEnv('VITE_IMAGE_MODEL')).trim();
  return {
    endpoint,
    apiKey,
    model,
    configured: Boolean(endpoint && apiKey),
  };
}

export function resolveImageSize(aspectRatio: ImageAspectRatio = '1:1', explicitSize?: string): string {
  if (explicitSize && /^\d{2,4}x\d{2,4}$/i.test(explicitSize.trim())) {
    return explicitSize.trim().toLowerCase();
  }
  return ASPECT_RATIO_TO_SIZE[aspectRatio] ?? '1024x1024';
}

export function sanitizeImageUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (/^data:image\/[a-z0-9.+-]+;base64,[a-z0-9+/=\s]+$/i.test(trimmed)) {
    return trimmed;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
  } catch {
    // Not a valid absolute URL
  }
  return null;
}

function toDataUrl(b64: string, mimeType = 'image/png'): string | null {
  const cleaned = b64.trim();
  if (!cleaned) return null;
  if (cleaned.startsWith('data:image/')) {
    return sanitizeImageUrl(cleaned);
  }
  const safeMime = /^image\/[a-z0-9.+-]+$/i.test(mimeType) ? mimeType : 'image/png';
  return sanitizeImageUrl(`data:${safeMime};base64,${cleaned}`);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to decode binary image response.'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read image response stream.'));
      reader.readAsDataURL(blob);
    } catch (err) {
      reject(err instanceof Error ? err : new Error('Unable to convert image response.'));
    }
  });
}

function extractImageFromJson(payload: unknown): {
  imageUrl: string | null;
  revisedPrompt?: string;
} {
  if (!payload || typeof payload !== 'object') {
    return { imageUrl: null };
  }
  const obj = payload as Record<string, unknown>;

  // 1. OpenAI / NanoGPT / LiteLLM / Together style: { data: [{ url | b64_json, revised_prompt }] }
  if (Array.isArray(obj.data) && obj.data.length > 0) {
    const first = obj.data[0] as Record<string, unknown>;
    if (first && typeof first === 'object') {
      const revisedPrompt =
        typeof first.revised_prompt === 'string' ? first.revised_prompt : undefined;
      if (typeof first.url === 'string') {
        const url = sanitizeImageUrl(first.url);
        if (url) return { imageUrl: url, revisedPrompt };
      }
      if (typeof first.b64_json === 'string') {
        const dataUrl = toDataUrl(first.b64_json, 'image/png');
        if (dataUrl) return { imageUrl: dataUrl, revisedPrompt };
      }
    }
  }

  // 2. Gemini Imagen predict style: { predictions: [{ bytesBase64Encoded, mimeType }] }
  if (Array.isArray(obj.predictions) && obj.predictions.length > 0) {
    const first = obj.predictions[0] as Record<string, unknown>;
    if (first && typeof first === 'object' && typeof first.bytesBase64Encoded === 'string') {
      const mime = typeof first.mimeType === 'string' ? first.mimeType : 'image/png';
      const dataUrl = toDataUrl(first.bytesBase64Encoded, mime);
      if (dataUrl) return { imageUrl: dataUrl };
    }
  }

  // 3. Gemini generateContent style: { candidates: [{ content: { parts: [{ inlineData }] } }] }
  if (Array.isArray(obj.candidates) && obj.candidates.length > 0) {
    const cand = obj.candidates[0] as Record<string, unknown>;
    const content = cand?.content as Record<string, unknown> | undefined;
    const parts = Array.isArray(content?.parts) ? content.parts : [];
    for (const part of parts) {
      if (!part || typeof part !== 'object') continue;
      const p = part as Record<string, unknown>;
      const inline = (p.inlineData ?? p.inline_data) as Record<string, unknown> | undefined;
      if (inline && typeof inline.data === 'string') {
        const mime =
          typeof inline.mimeType === 'string'
            ? inline.mimeType
            : typeof inline.mime_type === 'string'
              ? inline.mime_type
              : 'image/png';
        const dataUrl = toDataUrl(inline.data, mime);
        if (dataUrl) return { imageUrl: dataUrl };
      }
    }
  }

  // 4. Generic single-image REST response: { url | image_url | imageUrl | dataUrl | image | b64_json }
  const directCandidates = [obj.url, obj.image_url, obj.imageUrl, obj.dataUrl, obj.image];
  for (const cand of directCandidates) {
    if (typeof cand === 'string' && cand.trim()) {
      const url = sanitizeImageUrl(cand) ?? toDataUrl(cand, 'image/png');
      if (url) {
        return {
          imageUrl: url,
          revisedPrompt:
            typeof obj.revised_prompt === 'string'
              ? obj.revised_prompt
              : typeof obj.revisedPrompt === 'string'
                ? obj.revisedPrompt
                : undefined,
        };
      }
    }
  }

  if (typeof obj.b64_json === 'string') {
    const dataUrl = toDataUrl(obj.b64_json, 'image/png');
    if (dataUrl) return { imageUrl: dataUrl };
  }

  // 5. Array of images: { images: [url | base64 | { url | b64_json }] }
  if (Array.isArray(obj.images) && obj.images.length > 0) {
    const first = obj.images[0];
    if (typeof first === 'string') {
      const url = sanitizeImageUrl(first) ?? toDataUrl(first, 'image/png');
      if (url) return { imageUrl: url };
    } else if (first && typeof first === 'object') {
      const item = first as Record<string, unknown>;
      if (typeof item.url === 'string') {
        const url = sanitizeImageUrl(item.url);
        if (url) return { imageUrl: url };
      }
      if (typeof item.b64_json === 'string') {
        const dataUrl = toDataUrl(item.b64_json, 'image/png');
        if (dataUrl) return { imageUrl: dataUrl };
      }
    }
  }

  return { imageUrl: null };
}

function extractApiError(payload: unknown, fallbackStatus: number): string {
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>;
    if (typeof obj.error === 'string' && obj.error.trim()) return obj.error.trim();
    if (obj.error && typeof obj.error === 'object') {
      const nested = obj.error as Record<string, unknown>;
      if (typeof nested.message === 'string' && nested.message.trim()) {
        return nested.message.trim();
      }
    }
    if (typeof obj.message === 'string' && obj.message.trim()) return obj.message.trim();
    if (typeof obj.detail === 'string' && obj.detail.trim()) return obj.detail.trim();
  }
  return `Image API request failed (HTTP ${fallbackStatus}).`;
}

export async function generateImage(
  request: ImageGenerationRequest,
  configOverrides?: { endpoint?: string; apiKey?: string; model?: string }
): Promise<ImageGenerationResult> {
  const prompt = request.prompt.trim();
  if (!prompt) {
    throw new Error('Enter a descriptive prompt to generate an image.');
  }

  const aspectRatio: ImageAspectRatio = request.aspectRatio ?? '1:1';
  const size = resolveImageSize(aspectRatio, request.size);
  const cfg = getImageApiConfig(configOverrides);

  if (!cfg.endpoint) {
    throw new Error(
      'Image generation endpoint is not configured. Set VITE_IMAGE_ENDPOINT and VITE_IMAGE_API_KEY in your environment before building.'
    );
  }

  if (!cfg.apiKey) {
    throw new Error(
      'Image generation API key is missing. Set VITE_IMAGE_API_KEY in your environment before building.'
    );
  }

  const cleanEndpoint = sanitizeImageUrl(cfg.endpoint);
  if (!cleanEndpoint) {
    throw new Error('VITE_IMAGE_ENDPOINT must be a valid http:// or https:// URL.');
  }

  const model = (request.model || cfg.model || '').trim();
  const isGeminiEndpoint = /generativelanguage\.googleapis\.com/i.test(cleanEndpoint);

  try {
    let targetUrl = cleanEndpoint;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json, image/*',
    };
    let bodyPayload: Record<string, unknown>;

    if (isGeminiEndpoint) {
      headers['x-goog-api-key'] = cfg.apiKey;
      if (/:predict$/i.test(targetUrl)) {
        bodyPayload = {
          instances: [{ prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio,
          },
        };
      } else {
        bodyPayload = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ['IMAGE'],
            imageConfig: { aspectRatio },
          },
        };
      }
    } else {
      headers['Authorization'] = `Bearer ${cfg.apiKey}`;
      bodyPayload = {
        prompt,
        size,
        aspect_ratio: aspectRatio,
        n: 1,
      };
      if (model) {
        bodyPayload.model = model;
      }
    }

    const res = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyPayload),
      signal: request.signal,
    });

    const contentType = (res.headers.get('content-type') || '').toLowerCase();

    if (!res.ok) {
      let errPayload: unknown = null;
      try {
        if (contentType.includes('application/json')) {
          errPayload = await res.json();
        } else {
          const text = await res.text();
          if (text.trim() && !text.trim().startsWith('<')) {
            errPayload = { message: text.trim().slice(0, 240) };
          }
        }
      } catch {
        // Ignore parse error on error response
      }
      throw new Error(extractApiError(errPayload, res.status));
    }

    // Handle direct binary image response (image/png, image/jpeg, image/webp)
    if (contentType.startsWith('image/')) {
      const blob = await res.blob();
      const dataUrl = await blobToDataUrl(blob);
      const validUrl = sanitizeImageUrl(dataUrl);
      if (!validUrl) {
        throw new Error('Image API returned an unreadable image stream.');
      }
      return {
        id: generateUUID(),
        imageUrl: validUrl,
        aspectRatio,
        size,
        createdAt: new Date().toISOString(),
      };
    }

    let json: unknown;
    try {
      json = await res.json();
    } catch {
      throw new Error(
        'Image API returned a non-JSON response. Verify VITE_IMAGE_ENDPOINT points to a valid image generation API.'
      );
    }

    const { imageUrl, revisedPrompt } = extractImageFromJson(json);
    if (!imageUrl) {
      throw new Error('Image API responded successfully, but no image URL or image data was found.');
    }

    return {
      id: generateUUID(),
      imageUrl,
      revisedPrompt,
      aspectRatio,
      size,
      createdAt: new Date().toISOString(),
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Image generation was cancelled.');
    }
    if (err instanceof TypeError) {
      throw new Error(
        'Network or CORS error contacting VITE_IMAGE_ENDPOINT. Check the endpoint URL and CORS policy.'
      );
    }
    throw err instanceof Error ? err : new Error('Image generation failed.');
  }
}
