import { A as FILENAME, d as spread_props, f as store_get, g as push_element, h as pop_element, i as derived, k as escape_html, l as sanitize_props, m as unsubscribe_stores, o as ensure_array_like, u as slot, w as attr, x as prevent_snippet_stringification } from "../../../chunks/server.js";
import "../../../chunks/navigation.js";
import { t as Database } from "../../../chunks/database.js";
import { n as External_link, t as File_text } from "../../../chunks/file-text.js";
import { t as Globe } from "../../../chunks/globe.js";
import { f as settings, g as updateSettings, v as Icon } from "../../../chunks/workspace.js";
import { t as Search } from "../../../chunks/search.js";
// node_modules/lucide-svelte/dist/icons/message-square-plus.svelte
Message_square_plus[FILENAME] = "node_modules/lucide-svelte/dist/icons/message-square-plus.svelte";
function Message_square_plus($$renderer, $$props) {
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
			{ name: "message-square-plus" },
			$$sanitized_props,
			{
				/**
				* @component @name MessageSquarePlus
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjIgMTdhMiAyIDAgMCAxLTIgMkg2LjgyOGEyIDIgMCAwIDAtMS40MTQuNTg2bC0yLjIwMiAyLjIwMkEuNzEuNzEgMCAwIDEgMiAyMS4yODZWNWEyIDIgMCAwIDEgMi0yaDE2YTIgMiAwIDAgMSAyIDJ6IiAvPgogIDxwYXRoIGQ9Ik0xMiA4djYiIC8+CiAgPHBhdGggZD0iTTkgMTFoNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/message-square-plus
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" }],
					["path", { "d": "M12 8v6" }],
					["path", { "d": "M9 11h6" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Message_square_plus);
}
Message_square_plus.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/sparkles.svelte
Sparkles[FILENAME] = "node_modules/lucide-svelte/dist/icons/sparkles.svelte";
function Sparkles($$renderer, $$props) {
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
			{ name: "sparkles" },
			$$sanitized_props,
			{
				/**
				* @component @name Sparkles
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTEuMDE3IDIuODE0YTEgMSAwIDAgMSAxLjk2NiAwbDEuMDUxIDUuNTU4YTIgMiAwIDAgMCAxLjU5NCAxLjU5NGw1LjU1OCAxLjA1MWExIDEgMCAwIDEgMCAxLjk2NmwtNS41NTggMS4wNTFhMiAyIDAgMCAwLTEuNTk0IDEuNTk0bC0xLjA1MSA1LjU1OGExIDEgMCAwIDEtMS45NjYgMGwtMS4wNTEtNS41NThhMiAyIDAgMCAwLTEuNTk0LTEuNTk0bC01LjU1OC0xLjA1MWExIDEgMCAwIDEgMC0xLjk2Nmw1LjU1OC0xLjA1MWEyIDIgMCAwIDAgMS41OTQtMS41OTR6IiAvPgogIDxwYXRoIGQ9Ik0yMCAydjQiIC8+CiAgPHBhdGggZD0iTTIyIDRoLTQiIC8+CiAgPGNpcmNsZSBjeD0iNCIgY3k9IjIwIiByPSIyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/sparkles
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" }],
					["path", { "d": "M20 2v4" }],
					["path", { "d": "M22 4h-4" }],
					["circle", {
						"cx": "4",
						"cy": "20",
						"r": "2"
					}]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Sparkles);
}
Sparkles.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// src/routes/search/+page.svelte
_page[FILENAME] = "src/routes/search/+page.svelte";
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const PROVIDER_OPTIONS = [
			{
				id: "gemini-native",
				label: "Gemini Native"
			},
			{
				id: "searxng",
				label: "SearXNG"
			},
			{
				id: "brave",
				label: "Brave Search"
			},
			{
				id: "tavily",
				label: "Tavily"
			},
			{
				id: "custom",
				label: "Custom"
			},
			{
				id: "parallel",
				label: "Parallel MCP"
			}
		];
		let query = "";
		let fetchingUrl = null;
		let indexingUrl = null;
		let sendingToChat = false;
		let results = [];
		let fetchedPages = {};
		let directUrl = "";
		let activeProvider = derived(() => store_get($$store_subs ??= {}, "$settings", settings)?.searchProvider ?? "gemini-native");
		const QUICK_PROBES = [
			"Latest SvelteKit and Vite release notes",
			"OpenAI DeepSeek Gemini coding benchmarks",
			"Self hosted SearXNG Docker setup tips"
		];
		function safeExternalUrl(raw) {
			try {
				const parsed = new URL(raw);
				return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : null;
			} catch {
				return null;
			}
		}
		$$renderer.push(`<div class="flex-1 overflow-y-auto px-2.5 sm:px-8 py-3 sm:py-6 bg-[#0a0b08] relative font-mono">`);
		push_element($$renderer, "div", 195, 0);
		$$renderer.push(`<div class="absolute inset-0 pointer-events-none crt-scanlines opacity-15">`);
		push_element($$renderer, "div", 196, 2);
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <div class="max-w-5xl mx-auto space-y-4 sm:space-y-6 relative z-10">`);
		push_element($$renderer, "div", 197, 2);
		$$renderer.push(`<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b border-olive-drab/40">`);
		push_element($$renderer, "div", 199, 4);
		$$renderer.push(`<div>`);
		push_element($$renderer, "div", 202, 6);
		$$renderer.push(`<h1 class="text-base sm:text-xl font-bold tracking-wider text-olive-bright uppercase">`);
		push_element($$renderer, "h1", 203, 8);
		$$renderer.push(`Web Recon · Modular Search</h1>`);
		pop_element();
		$$renderer.push(` <p class="font-prose text-[13px] sm:text-xs text-stone-400 mt-0.5 leading-snug">`);
		push_element($$renderer, "p", 206, 8);
		$$renderer.push(`Query Gemini Native, SearXNG, Brave, Tavily, Custom Endpoint, or Parallel MCP and index findings into Mnemosyne OS.</p>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <div class="flex items-center gap-2">`);
		push_element($$renderer, "div", 210, 6);
		$$renderer.select({
			"aria-label": "Active Web Recon provider",
			value: activeProvider(),
			onchange: (e) => void updateSettings({ searchProvider: e.currentTarget.value }),
			class: "flex-1 sm:flex-initial h-8 px-2.5 rounded border border-[#005a63]/60 bg-[#091517] text-[11px] font-bold tracking-wider uppercase text-cyber-cyan focus:outline-none focus:border-cyber-cyan"
		}, ($$renderer) => {
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(PROVIDER_OPTIONS);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let opt = each_array[$$index];
				$$renderer.option({ value: opt.id }, ($$renderer) => {
					push_element($$renderer, "option", 221, 12);
					$$renderer.push(`${escape_html(opt.label)}`);
					pop_element();
				});
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(` <a href="/vault" class="h-8 px-2.5 rounded border border-olive-drab/50 bg-[#12140e] text-[11px] font-bold tracking-wider uppercase inline-flex items-center gap-1.5 text-olive-bright hover:border-olive-bright transition-colors shrink-0">`);
		push_element($$renderer, "a", 224, 8);
		Globe($$renderer, { class: "w-3.5 h-3.5" });
		$$renderer.push(`<!----> <span>`);
		push_element($$renderer, "span", 229, 10);
		$$renderer.push(`CONFIG</span>`);
		pop_element();
		$$renderer.push(`</a>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <form class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3 sm:p-4 space-y-2.5">`);
		push_element($$renderer, "form", 235, 4);
		$$renderer.push(`<div class="flex flex-col sm:flex-row gap-2">`);
		push_element($$renderer, "div", 239, 6);
		$$renderer.push(`<div class="relative flex-1">`);
		push_element($$renderer, "div", 240, 8);
		Search($$renderer, { class: "w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" });
		$$renderer.push(`<!----> <input type="text"${attr("value", query)} placeholder="Search the live internet..." class="w-full h-9 pl-9 pr-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
		push_element($$renderer, "input", 242, 10);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <button type="submit"${attr("disabled", !query.trim(), true)} class="h-9 px-4 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-xs font-bold tracking-wider inline-flex items-center justify-center gap-2 border border-olive-bright/30 cursor-pointer uppercase">`);
		push_element($$renderer, "button", 249, 8);
		$$renderer.push("<!--[-1-->");
		Globe($$renderer, { class: "w-3.5 h-3.5 text-olive-bright" });
		$$renderer.push(`<!----> <span>`);
		push_element($$renderer, "span", 259, 12);
		$$renderer.push(`SEARCH WEB</span>`);
		pop_element();
		$$renderer.push(`<!--]--></button>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <div class="flex flex-wrap items-center gap-1.5">`);
		push_element($$renderer, "div", 264, 6);
		$$renderer.push(`<span class="text-[10px] uppercase tracking-wider text-stone-500">`);
		push_element($$renderer, "span", 265, 8);
		$$renderer.push(`Quick Probes:</span>`);
		pop_element();
		$$renderer.push(` <!--[-->`);
		const each_array_1 = ensure_array_like(QUICK_PROBES);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let probe = each_array_1[$$index_1];
			$$renderer.push(`<button type="button" class="font-prose px-2 py-1 rounded border border-olive-drab/35 bg-[#0d0e0a] hover:border-olive-bright/60 text-[11.5px] text-stone-300 hover:text-olive-bright transition-colors cursor-pointer">`);
			push_element($$renderer, "button", 267, 10);
			$$renderer.push(`${escape_html(probe)}</button>`);
			pop_element();
		}
		$$renderer.push(`<!--]--></div>`);
		pop_element();
		$$renderer.push(`</form>`);
		pop_element();
		$$renderer.push(` <div class="rounded-lg border border-olive-drab/35 bg-[#12140e] p-3 sm:p-4 space-y-2">`);
		push_element($$renderer, "div", 282, 4);
		$$renderer.push(`<div class="text-[10.5px] font-bold tracking-wider text-stone-400 uppercase">`);
		push_element($$renderer, "div", 283, 6);
		$$renderer.push(`Direct URL Reader (web_fetch)</div>`);
		pop_element();
		$$renderer.push(` <div class="flex flex-col sm:flex-row gap-2">`);
		push_element($$renderer, "div", 286, 6);
		$$renderer.push(`<input type="url"${attr("value", directUrl)} placeholder="https://example.com/article" class="flex-1 h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
		push_element($$renderer, "input", 287, 8);
		pop_element();
		$$renderer.push(` <button type="button"${attr("disabled", !directUrl.trim(), true)} class="h-9 px-3.5 rounded border border-[#005a63]/60 bg-[#091517] hover:border-cyber-cyan disabled:opacity-40 text-cyber-cyan text-xs font-bold uppercase cursor-pointer inline-flex items-center justify-center gap-1.5">`);
		push_element($$renderer, "button", 293, 8);
		File_text($$renderer, { class: "w-3.5 h-3.5" });
		$$renderer.push(`<!----> <span>`);
		push_element($$renderer, "span", 300, 10);
		$$renderer.push(`${escape_html(fetchingUrl === directUrl.trim() ? "READING..." : "FETCH PAGE")}</span>`);
		pop_element();
		$$renderer.push(`</button>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <!--[-->`);
		const each_array_2 = ensure_array_like(Object.values(fetchedPages).filter((p) => !results.some((r) => r.url === p.url)));
		for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
			let pageItem = each_array_2[$$index_2];
			$$renderer.push(`<div class="rounded-lg border border-[#005a63]/60 bg-[#091517] p-3.5 sm:p-4 space-y-2">`);
			push_element($$renderer, "div", 319, 6);
			$$renderer.push(`<div class="flex flex-wrap items-center justify-between gap-2">`);
			push_element($$renderer, "div", 320, 8);
			$$renderer.push(`<div class="font-prose text-sm font-semibold text-cyber-cyan break-all">`);
			push_element($$renderer, "div", 321, 10);
			$$renderer.push(`${escape_html(pageItem.title || pageItem.url)}</div>`);
			pop_element();
			$$renderer.push(` `);
			if (pageItem.publishDate) {
				$$renderer.push(`<!--[0--><span class="text-[10px] text-stone-400 tabular-nums">`);
				push_element($$renderer, "span", 325, 12);
				$$renderer.push(`${escape_html(pageItem.publishDate)}</span>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(` <div class="font-prose space-y-2 text-[13.5px] sm:text-[13px] text-cyan-100/85 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">`);
			push_element($$renderer, "div", 328, 8);
			$$renderer.push(`${escape_html(pageItem.excerpts.join("\n\n"))}</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
		}
		$$renderer.push(`<!--]--> `);
		if (results.length > 0) {
			$$renderer.push(`<!--[0--><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">`);
			push_element($$renderer, "div", 336, 6);
			$$renderer.push(`<div class="text-[11px] text-stone-400 uppercase tracking-wider">`);
			push_element($$renderer, "div", 337, 8);
			$$renderer.push(`${escape_html(results.length)} LIVE RESULTS `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(` <button type="button"${attr("disabled", sendingToChat, true)} class="h-8 px-3.5 rounded bg-[#091517] hover:border-cyber-cyan border border-[#005a63]/60 text-cyber-cyan text-[11px] font-bold uppercase inline-flex items-center justify-center gap-1.5 cursor-pointer">`);
			push_element($$renderer, "button", 340, 8);
			Message_square_plus($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 347, 10);
			$$renderer.push(`${escape_html("Synthesize in Dispatch")}</span>`);
			pop_element();
			$$renderer.push(`</button>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="space-y-3">`);
			push_element($$renderer, "div", 351, 6);
			$$renderer.push(`<!--[-->`);
			const each_array_3 = ensure_array_like(results);
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let item = each_array_3[$$index_3];
				const href = safeExternalUrl(item.url);
				const fetched = fetchedPages[item.url];
				$$renderer.push(`<article class="rounded-lg border border-[#005a63]/50 bg-[#091517] p-3 sm:p-4 space-y-2 relative">`);
				push_element($$renderer, "article", 355, 10);
				$$renderer.push(`<div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2">`);
				push_element($$renderer, "div", 358, 12);
				$$renderer.push(`<div class="min-w-0 space-y-0.5">`);
				push_element($$renderer, "div", 359, 14);
				if (href) {
					$$renderer.push(`<!--[0--><a${attr("href", href)} target="_blank" rel="noopener noreferrer" class="font-prose inline-flex items-center gap-1.5 text-[14.5px] sm:text-sm font-semibold text-cyber-cyan hover:underline break-words leading-snug">`);
					push_element($$renderer, "a", 361, 18);
					$$renderer.push(`<span>`);
					push_element($$renderer, "span", 367, 20);
					$$renderer.push(`${escape_html(item.title)}</span>`);
					pop_element();
					$$renderer.push(` `);
					External_link($$renderer, { class: "w-3.5 h-3.5 shrink-0" });
					$$renderer.push(`<!----></a>`);
					pop_element();
				} else {
					$$renderer.push(`<!--[-1--><h2 class="font-prose text-[14.5px] sm:text-sm font-semibold text-cyber-cyan leading-snug">`);
					push_element($$renderer, "h2", 371, 18);
					$$renderer.push(`${escape_html(item.title)}</h2>`);
					pop_element();
				}
				$$renderer.push(`<!--]--> <div class="text-[10.5px] text-stone-400 truncate">`);
				push_element($$renderer, "div", 373, 16);
				$$renderer.push(`${escape_html(item.url)} `);
				if (item.publishDate) {
					$$renderer.push(`<!--[0--><span class="ml-1.5 text-olive-bright tabular-nums">`);
					push_element($$renderer, "span", 376, 20);
					$$renderer.push(`· ${escape_html(item.publishDate)}</span>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <div class="flex items-center gap-1.5 shrink-0">`);
				push_element($$renderer, "div", 381, 14);
				$$renderer.push(`<button type="button"${attr("disabled", fetchingUrl === item.url, true)} class="h-7 px-2.5 rounded border border-olive-drab/50 bg-[#12140e] hover:border-olive-bright text-[10.5px] font-bold text-stone-200 hover:text-olive-bright cursor-pointer inline-flex items-center gap-1 uppercase">`);
				push_element($$renderer, "button", 382, 16);
				Sparkles($$renderer, { class: "w-3 h-3" });
				$$renderer.push(`<!----> <span>`);
				push_element($$renderer, "span", 389, 18);
				$$renderer.push(`${escape_html(fetchingUrl === item.url ? "READING..." : fetched ? "REFRESH" : "READ PAGE")}</span>`);
				pop_element();
				$$renderer.push(`</button>`);
				pop_element();
				$$renderer.push(` <button type="button"${attr("disabled", indexingUrl === item.url, true)} class="h-7 px-2.5 rounded border border-olive-drab/50 bg-[#12140e] hover:border-cyber-cyan text-[10.5px] font-bold text-stone-200 hover:text-cyber-cyan cursor-pointer inline-flex items-center gap-1 uppercase">`);
				push_element($$renderer, "button", 391, 16);
				Database($$renderer, { class: "w-3 h-3" });
				$$renderer.push(`<!----> <span>`);
				push_element($$renderer, "span", 398, 18);
				$$renderer.push(`${escape_html(indexingUrl === item.url ? "SAVING..." : "VAULT")}</span>`);
				pop_element();
				$$renderer.push(`</button>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` `);
				if (fetched) {
					$$renderer.push(`<!--[0--><div class="font-prose rounded border border-[#005a63]/40 bg-[#060f11] p-2.5 sm:p-3 text-[13.5px] sm:text-[13px] text-cyan-100/85 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">`);
					push_element($$renderer, "div", 404, 14);
					$$renderer.push(`${escape_html(fetched.excerpts.join("\n\n"))}</div>`);
					pop_element();
				} else if (item.excerpt) {
					$$renderer.push(`<!--[1--><p class="font-prose text-[13.5px] sm:text-[13px] text-cyan-100/80 leading-relaxed whitespace-pre-wrap">`);
					push_element($$renderer, "p", 410, 14);
					$$renderer.push(`${escape_html(item.excerpt)}</p>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></article>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></div>`);
			pop_element();
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		if ($$store_subs) unsubscribe_stores($$store_subs);
	}, _page);
}
_page.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map