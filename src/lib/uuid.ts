/**
 * Generates an RFC 4122 v4 UUID safely in both Secure Contexts (HTTPS/localhost)
 * and plain HTTP origins where `crypto.randomUUID` is unavailable.
 */
export function generateUUID(): string {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj && typeof cryptoObj.randomUUID === 'function') {
    try {
      return cryptoObj.randomUUID();
    } catch {
      // Fall through to non-secure-context generator
    }
  }

  let timestamp = Date.now();
  let perf =
    typeof globalThis.performance !== 'undefined' &&
    typeof globalThis.performance.now === 'function'
      ? Math.floor(globalThis.performance.now() * 1000)
      : 0;

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    let rand = Math.random() * 16;
    if (timestamp > 0) {
      rand = (timestamp + rand) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      rand = (perf + rand) % 16 | 0;
      perf = Math.floor(perf / 16);
    }
    const val = char === 'x' ? rand : (rand & 0x3) | 0x8;
    return val.toString(16);
  });
}
