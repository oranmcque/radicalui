
import error from './shared/error-template.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_trusted_origins: [],
	service_worker_options: undefined,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"en\" class=\"dark\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Aetheris WebUI — Mnemosyne OS &amp; Multimodal Voice Workspace</title>\n    <meta\n      name=\"description\"\n      content=\"Self-hosted AI workspace with Mnemosyne OS persistent memory, multi-provider LLM routing (Gemini, OpenAI, DeepSeek, NanoGPT), Deepgram & Fish Audio voice pipelines, and real-time multimodal Live Call.\"\n    />\n    <meta property=\"og:title\" content=\"Aetheris WebUI — Mnemosyne OS & Multimodal Voice Workspace\" />\n    <meta\n      property=\"og:description\"\n      content=\"Self-hosted AI workspace with Mnemosyne OS persistent memory, multi-provider LLM routing, and real-time multimodal Live Call.\"\n    />\n    <meta property=\"og:type\" content=\"website\" />\n    <meta name=\"twitter:card\" content=\"summary_large_image\" />\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap\"\n      rel=\"stylesheet\"\n    />\n    " + head + "\n  </head>\n  <body\n    data-sveltekit-preload-data=\"hover\"\n    class=\"bg-[#0a0b08] text-stone-300 font-mono antialiased selection:bg-[#8fa85c]/30 selection:text-[#00f0ff]\"\n  >\n    <div style=\"display: contents\">" + body + "</div>\n  </body>\n</html>\n",
		error
	}
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let init;
	

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		init,
		reroute,
		transport
	};
}
