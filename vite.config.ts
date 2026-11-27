import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';

/**
 * Prevents SvelteKit's client fetcher.js from throwing
 * `TypeError: Cannot set property fetch of #<Window> which has only a getter`
 * when hosted inside sandboxed iframes that define `window.fetch` via a getter.
 */
function safeSvelteKitFetchPlugin(): Plugin {
  return {
    name: 'safe-sveltekit-fetch',
    enforce: 'pre',
    transform(code, id) {
      const normalized = id.replace(/\\/g, '/');
      if (!normalized.includes('@sveltejs/kit/src/runtime/client/fetcher.js')) {
        return null;
      }
      if (!/window\.fetch\s*=/.test(code)) {
        return null;
      }
      const patched =
        `let __sveltekit_safe_fetch;\n` +
        code
          .replace(/window\.fetch\s*=/g, '__sveltekit_safe_fetch =')
          .replace(
            'const cache = new Map();',
            `if (typeof __sveltekit_safe_fetch === 'function') {
  try {
    let target = window;
    let desc = Object.getOwnPropertyDescriptor(target, 'fetch');
    while (!desc && target) {
      target = Object.getPrototypeOf(target);
      if (target) desc = Object.getOwnPropertyDescriptor(target, 'fetch');
    }
    if (!desc || desc.writable || typeof desc.set === 'function') {
      window.fetch = __sveltekit_safe_fetch;
    }
  } catch {
    // Keep host-provided getter-only window.fetch intact
  }
}
const cache = new Map();`
          );
      return { code: patched, map: null };
    },
  };
}

export default defineConfig({
  plugins: [
    safeSvelteKitFetchPlugin(),
    tailwindcss(),
    sveltekit({
      adapter: adapter({
        pages: 'dist',
        assets: 'dist',
        fallback: 'index.html',
        strict: false,
      }),
    }),
  ],
  server: {
    hmr: false,
    watch: null,
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
});
