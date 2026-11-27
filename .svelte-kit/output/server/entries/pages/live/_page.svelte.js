import { A as FILENAME, d as spread_props, f as store_get, g as push_element, h as pop_element, k as escape_html, l as sanitize_props, m as unsubscribe_stores, o as ensure_array_like, t as attr_class, u as slot, w as attr, x as prevent_snippet_stringification } from "../../../chunks/server.js";
import { t as onDestroy } from "../../../chunks/index-server.js";
import "../../../chunks/navigation.js";
import { t as Brain } from "../../../chunks/brain.js";
import { f as settings, v as Icon } from "../../../chunks/workspace.js";
import { t as Radio } from "../../../chunks/radio.js";
import { t as Send_horizontal } from "../../../chunks/send-horizontal.js";
// node_modules/lucide-svelte/dist/icons/phone-call.svelte
Phone_call[FILENAME] = "node_modules/lucide-svelte/dist/icons/phone-call.svelte";
function Phone_call($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	$$renderer.component(($$renderer) => {
		/**
		* @license lucide-svelte v1.0.1 - ISC
		*
		* ISC License
		*
		* Copyright (c) 2026 Lucide Icons and Contributors
		*
		* Permission to use, copy, modify, and/or distribute this software for any
		* purpose with or without fee is hereby granted, provided that the above
		* copyright notice and this permission notice appear in all copies.
		*
		* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		*
		* ---
		*
		* The following Lucide icons are derived from the Feather project:
		*
		* airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		*
		* The MIT License (MIT) (for the icons listed above)
		*
		* Copyright (c) 2013-present Cole Bemis
		*
		* Permission is hereby granted, free of charge, to any person obtaining a copy
		* of this software and associated documentation files (the "Software"), to deal
		* in the Software without restriction, including without limitation the rights
		* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		* copies of the Software, and to permit persons to whom the Software is
		* furnished to do so, subject to the following conditions:
		*
		* The above copyright notice and this permission notice shall be included in all
		* copies or substantial portions of the Software.
		*
		* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		* SOFTWARE.
		*
		*/
		Icon($$renderer, spread_props([
			{ name: "phone-call" },
			$$sanitized_props,
			{
				/**
				* @component @name PhoneCall
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTMgMmE5IDkgMCAwIDEgOSA5IiAvPgogIDxwYXRoIGQ9Ik0xMyA2YTUgNSAwIDAgMSA1IDUiIC8+CiAgPHBhdGggZD0iTTEzLjgzMiAxNi41NjhhMSAxIDAgMCAwIDEuMjEzLS4zMDNsLjM1NS0uNDY1QTIgMiAwIDAgMSAxNyAxNWgzYTIgMiAwIDAgMSAyIDJ2M2EyIDIgMCAwIDEtMiAyQTE4IDE4IDAgMCAxIDIgNGEyIDIgMCAwIDEgMi0yaDNhMiAyIDAgMCAxIDIgMnYzYTIgMiAwIDAgMS0uOCAxLjZsLS40NjguMzUxYTEgMSAwIDAgMC0uMjkyIDEuMjMzIDE0IDE0IDAgMCAwIDYuMzkyIDYuMzg0IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/phone-call
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M13 2a9 9 0 0 1 9 9" }],
					["path", { "d": "M13 6a5 5 0 0 1 5 5" }],
					["path", { "d": "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Phone_call);
}
Phone_call.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// src/routes/live/+page.svelte
_page[FILENAME] = "src/routes/live/+page.svelte";
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let pipeline = store_get($$store_subs ??= {}, "$settings", settings)?.voicePipeline ?? "gemini-live";
		let cameraOn = false;
		let transcript = [];
		let memoryFeed = [];
		let textInject = "";
		let elapsedSeconds = 0;
		let ws = null;
		let player = null;
		let inputCtx = null;
		let micStream = null;
		let videoStream = null;
		let videoInterval = null;
		let processor = null;
		let modularAudio = null;
		function stopCamera() {
			if (videoInterval) {
				window.clearInterval(videoInterval);
				videoInterval = null;
			}
			videoStream?.getTracks().forEach((t) => t.stop());
			videoStream = null;
			cameraOn = false;
		}
		async function cleanupCallResources() {
			stopCamera();
			if (processor) {
				processor.disconnect();
				processor = null;
			}
			micStream?.getTracks().forEach((t) => t.stop());
			micStream = null;
			if (inputCtx && inputCtx.state !== "closed") {
				await inputCtx.close();
				inputCtx = null;
			}
			if (player) {
				await player.close();
				player = null;
			}
			if (ws) {
				ws.close();
				ws = null;
			}
			modularAudio?.pause();
			modularAudio = null;
		}
		onDestroy(() => {
			cleanupCallResources();
		});
		function formatDuration(sec) {
			return `${Math.floor(sec / 60).toString().padStart(2, "0")}:${(sec % 60).toString().padStart(2, "0")}`;
		}
		if (store_get($$store_subs ??= {}, "$settings", settings)) {
			$$renderer.push(`<!--[0--><div class="flex-1 overflow-y-auto px-2.5 sm:px-8 py-3 sm:py-6 bg-[#0a0b08] relative font-mono">`);
			push_element($$renderer, "div", 734, 2);
			$$renderer.push(`<div class="absolute inset-0 pointer-events-none crt-scanlines opacity-15">`);
			push_element($$renderer, "div", 735, 4);
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="max-w-6xl mx-auto space-y-4 sm:space-y-6 relative z-10">`);
			push_element($$renderer, "div", 737, 4);
			$$renderer.push(`<div class="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4 pb-3 sm:pb-4 border-b border-olive-drab/40">`);
			push_element($$renderer, "div", 738, 6);
			$$renderer.push(`<div>`);
			push_element($$renderer, "div", 741, 8);
			$$renderer.push(`<h1 class="text-base sm:text-xl font-bold tracking-wider text-olive-bright uppercase">`);
			push_element($$renderer, "h1", 742, 10);
			$$renderer.push(`Guerilla Live Comms</h1>`);
			pop_element();
			$$renderer.push(` <p class="text-[10.5px] sm:text-xs text-stone-400 mt-0.5 break-words">`);
			push_element($$renderer, "p", 745, 10);
			$$renderer.push(`${escape_html(pipeline === "gemini-live" ? `GEMINI LIVE · VOICE: ${store_get($$store_subs ??= {}, "$settings", settings).geminiVoice} · 16KHZ/24KHZ PCM` : `MODULAR · STT: ${store_get($$store_subs ??= {}, "$settings", settings).sttProvider} → LLM: ${store_get($$store_subs ??= {}, "$settings", settings).activeModel} → TTS: ${store_get($$store_subs ??= {}, "$settings", settings).ttsProvider}`)}</p>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 rounded border border-olive-drab/45 bg-[#12140e] w-full sm:w-auto">`);
			push_element($$renderer, "div", 752, 8);
			$$renderer.push(`<button type="button"${attr("disabled", false, true)}${attr_class(`h-8 sm:h-auto px-2.5 sm:px-3 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60 ${pipeline === "gemini-live" ? "bg-[#3d462c] text-olive-bright border border-olive-bright/30" : "text-stone-400 hover:text-stone-200"}`)}>`);
			push_element($$renderer, "button", 755, 10);
			$$renderer.push(`GEMINI LIVE</button>`);
			pop_element();
			$$renderer.push(` <button type="button"${attr("disabled", false, true)}${attr_class(`h-8 sm:h-auto px-2.5 sm:px-3 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60 ${pipeline === "modular" ? "bg-[#3d462c] text-olive-bright border border-olive-bright/30" : "text-stone-400 hover:text-stone-200"}`)}>`);
			push_element($$renderer, "button", 768, 10);
			$$renderer.push(`DEEPGRAM + FISH</button>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-stretch">`);
			push_element($$renderer, "div", 792, 6);
			$$renderer.push(`<div class="lg:col-span-5 rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 sm:p-5 flex flex-col justify-between gap-3.5 sm:gap-5">`);
			push_element($$renderer, "div", 794, 8);
			$$renderer.push(`<div class="flex items-center justify-between text-xs">`);
			push_element($$renderer, "div", 797, 10);
			$$renderer.push(`<div class="inline-flex items-center gap-2">`);
			push_element($$renderer, "div", 798, 12);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span class="font-bold uppercase tracking-wider text-[11px] sm:text-xs text-olive-bright">`);
			push_element($$renderer, "span", 802, 14);
			$$renderer.push(`${escape_html("CHANNEL STANDBY")}</span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <span class="font-mono tabular-nums text-xs text-cyber-cyan">`);
			push_element($$renderer, "span", 814, 12);
			$$renderer.push(`${escape_html(formatDuration(elapsedSeconds))}</span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="relative rounded border border-[#005a63]/50 bg-[#050b0c] overflow-hidden h-36 sm:h-52 flex items-center justify-center">`);
			push_element($$renderer, "div", 819, 10);
			$$renderer.push(`<video autoplay="" playsinline="" muted=""${attr_class(`w-full h-full object-cover ${cameraOn ? "block" : "hidden"}`)}>`);
			push_element($$renderer, "video", 822, 12);
			$$renderer.push(`</video>`);
			pop_element();
			$$renderer.push(` `);
			if (!cameraOn) {
				$$renderer.push(`<!--[0--><canvas${attr("width", 420)}${attr("height", 160)} class="w-full h-28 sm:h-36 px-3 sm:px-6">`);
				push_element($$renderer, "canvas", 830, 14);
				$$renderer.push(`</canvas>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (cameraOn) {
				$$renderer.push(`<!--[0--><div class="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-black/75 border border-cyber-cyan/40 text-[10px] text-cyber-cyan">`);
				push_element($$renderer, "div", 838, 14);
				$$renderer.push(`1 FPS VISION FEED</div>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(` <div class="flex flex-wrap items-center justify-center gap-2">`);
			push_element($$renderer, "div", 846, 10);
			$$renderer.push(`<!--[0--><button type="button" class="w-full sm:w-auto h-10 px-5 rounded bg-[#3d462c] hover:bg-[#4c5836] border border-olive-bright/40 text-stone-100 text-xs font-bold tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer uppercase shadow-[0_0_15px_rgba(143,168,92,0.2)]">`);
			push_element($$renderer, "button", 848, 14);
			Phone_call($$renderer, { class: "w-4 h-4 text-olive-bright" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 854, 16);
			$$renderer.push(`Open Comms Channel</span>`);
			pop_element();
			$$renderer.push(`</button>`);
			pop_element();
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(` <div class="flex items-center gap-1.5 pt-2 border-t border-olive-drab/25">`);
			push_element($$renderer, "div", 914, 10);
			$$renderer.push(`<input type="text"${attr("disabled", true, true)}${attr("value", textInject)}${attr("placeholder", "Open channel to inject text")} class="flex-1 min-w-0 h-9 px-3 text-xs rounded border border-olive-drab/45 bg-[#0d0e0a] text-stone-200 disabled:opacity-50 focus:outline-none focus:border-olive-bright"/>`);
			push_element($$renderer, "input", 915, 12);
			pop_element();
			$$renderer.push(` <button type="button"${attr("disabled", true, true)} aria-label="Send text packet" class="w-9 h-9 flex items-center justify-center rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-olive-bright border border-olive-bright/30 cursor-pointer shrink-0">`);
			push_element($$renderer, "button", 927, 12);
			Send_horizontal($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----></button>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="lg:col-span-7 rounded-lg border border-[#005a63]/50 bg-[#091517] p-3.5 sm:p-5 flex flex-col min-h-[290px] sm:min-h-[420px] relative">`);
			push_element($$renderer, "div", 940, 8);
			$$renderer.push(`<div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan opacity-45">`);
			push_element($$renderer, "div", 943, 10);
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="flex items-center justify-between pb-2.5 border-b border-[#005a63]/35">`);
			push_element($$renderer, "div", 946, 10);
			$$renderer.push(`<div class="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider text-cyber-cyan uppercase">`);
			push_element($$renderer, "div", 947, 12);
			Radio($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 951, 14);
			$$renderer.push(`Live Comms Transcript</span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <span class="text-[10.5px] text-cyber-cyan/60 tabular-nums">`);
			push_element($$renderer, "span", 953, 12);
			$$renderer.push(`${escape_html(transcript.length)} TURNS</span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="flex-1 overflow-y-auto py-3 space-y-2.5 max-h-[240px] sm:max-h-[300px]">`);
			push_element($$renderer, "div", 958, 10);
			if (transcript.length === 0) {
				$$renderer.push(`<!--[0--><div class="h-full flex items-center justify-center font-prose text-xs text-cyan-200/50 text-center px-4 py-8">`);
				push_element($$renderer, "div", 960, 14);
				$$renderer.push(`Open the comms channel and speak. Barge-in interrupt clears queued audio immediately.</div>`);
				pop_element();
			} else {
				$$renderer.push(`<!--[-1--><!--[-->`);
				const each_array = ensure_array_like(transcript);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let item = each_array[$$index];
					$$renderer.push(`<div class="space-y-0.5">`);
					push_element($$renderer, "div", 967, 16);
					$$renderer.push(`<div class="text-[10px] uppercase tracking-wider text-stone-500">`);
					push_element($$renderer, "div", 968, 18);
					$$renderer.push(`${escape_html(item.role === "user" ? "Operator" : "AI Dispatch")}</div>`);
					pop_element();
					$$renderer.push(` <p${attr_class(`font-prose text-[13.5px] sm:text-[13px] leading-relaxed ${item.role === "user" ? "text-olive-bright" : "text-cyan-100"}`)}>`);
					push_element($$renderer, "p", 971, 18);
					$$renderer.push(`${escape_html(item.text)}</p>`);
					pop_element();
					$$renderer.push(`</div>`);
					pop_element();
				}
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(` <div class="pt-2.5 border-t border-[#005a63]/35 space-y-1.5">`);
			push_element($$renderer, "div", 983, 10);
			$$renderer.push(`<div class="flex items-center justify-between text-xs">`);
			push_element($$renderer, "div", 984, 12);
			$$renderer.push(`<span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-olive-bright uppercase">`);
			push_element($$renderer, "span", 985, 14);
			Brain($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 987, 16);
			$$renderer.push(`Mnemosyne OS Live Feed</span>`);
			pop_element();
			$$renderer.push(`</span>`);
			pop_element();
			$$renderer.push(` <span class="text-cyber-cyan/60 tabular-nums text-[10.5px]">`);
			push_element($$renderer, "span", 989, 14);
			$$renderer.push(`${escape_html(memoryFeed.length)} EVENTS</span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` `);
			if (memoryFeed.length === 0) {
				$$renderer.push(`<!--[0--><p class="font-prose text-xs text-cyan-200/45">`);
				push_element($$renderer, "p", 994, 14);
				$$renderer.push(`Live memory recalls, web searches, and tool-committed facts appear here.</p>`);
				pop_element();
			} else {
				$$renderer.push(`<!--[-1--><div class="max-h-28 overflow-y-auto space-y-1 text-xs">`);
				push_element($$renderer, "div", 998, 14);
				$$renderer.push(`<!--[-->`);
				const each_array_1 = ensure_array_like(memoryFeed);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let ev = each_array_1[$$index_1];
					$$renderer.push(`<div class="flex items-start justify-between gap-2 text-cyan-100/80">`);
					push_element($$renderer, "div", 1e3, 18);
					$$renderer.push(`<span class="font-prose text-xs leading-snug">`);
					push_element($$renderer, "span", 1001, 20);
					$$renderer.push(`<span${attr_class(`font-mono text-[10.5px] uppercase mr-1.5 ${ev.action === "save" ? "text-olive-bright" : "text-cyber-cyan"}`)}>`);
					push_element($$renderer, "span", 1002, 22);
					$$renderer.push(`[${escape_html(ev.action)}]</span>`);
					pop_element();
					$$renderer.push(` ${escape_html(ev.summary)}</span>`);
					pop_element();
					$$renderer.push(` <span class="text-[10px] text-stone-500 tabular-nums shrink-0">`);
					push_element($$renderer, "span", 1011, 20);
					$$renderer.push(`${escape_html(ev.timestamp)}</span>`);
					pop_element();
					$$renderer.push(`</div>`);
					pop_element();
				}
				$$renderer.push(`<!--]--></div>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	}, _page);
}
_page.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map