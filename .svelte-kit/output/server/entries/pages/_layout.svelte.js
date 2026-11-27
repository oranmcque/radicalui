import { A as FILENAME, d as spread_props, f as store_get, g as push_element, h as pop_element, i as derived, k as escape_html, l as sanitize_props, m as unsubscribe_stores, o as ensure_array_like, t as attr_class, u as slot, w as attr, x as prevent_snippet_stringification } from "../../chunks/server.js";
import "../../chunks/index-server.js";
import { n as goto } from "../../chunks/navigation.js";
import { t as page } from "../../chunks/state.js";
import { t as Brain } from "../../chunks/brain.js";
import { t as Globe } from "../../chunks/globe.js";
import { t as Key_round } from "../../chunks/key-round.js";
import { _ as vaultDocs, c as providers, d as serverOnline, f as settings, h as threads, i as deleteThreadById, n as activeThreadId, o as memories, r as createNewThread, s as models, u as selectModel, v as Icon } from "../../chunks/workspace.js";
import { t as Radio } from "../../chunks/radio.js";
import { t as Plus } from "../../chunks/plus.js";
import { t as Search } from "../../chunks/search.js";
import { t as Trash_2 } from "../../chunks/trash-2.js";
import { t as Chevron_down } from "../../chunks/chevron-down.js";
// node_modules/lucide-svelte/dist/icons/menu.svelte
Menu[FILENAME] = "node_modules/lucide-svelte/dist/icons/menu.svelte";
function Menu($$renderer, $$props) {
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
			{ name: "menu" },
			$$sanitized_props,
			{
				/**
				* @component @name Menu
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCA1aDE2IiAvPgogIDxwYXRoIGQ9Ik00IDEyaDE2IiAvPgogIDxwYXRoIGQ9Ik00IDE5aDE2IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/menu
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M4 5h16" }],
					["path", { "d": "M4 12h16" }],
					["path", { "d": "M4 19h16" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Menu);
}
Menu.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/message-square.svelte
Message_square[FILENAME] = "node_modules/lucide-svelte/dist/icons/message-square.svelte";
function Message_square($$renderer, $$props) {
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
			{ name: "message-square" },
			$$sanitized_props,
			{
				/**
				* @component @name MessageSquare
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjIgMTdhMiAyIDAgMCAxLTIgMkg2LjgyOGEyIDIgMCAwIDAtMS40MTQuNTg2bC0yLjIwMiAyLjIwMkEuNzEuNzEgMCAwIDEgMiAyMS4yODZWNWEyIDIgMCAwIDEgMi0yaDE2YTIgMiAwIDAgMSAyIDJ6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/message-square
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [["path", { "d": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" }]],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Message_square);
}
Message_square.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/panel-left-close.svelte
Panel_left_close[FILENAME] = "node_modules/lucide-svelte/dist/icons/panel-left-close.svelte";
function Panel_left_close($$renderer, $$props) {
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
			{ name: "panel-left-close" },
			$$sanitized_props,
			{
				/**
				* @component @name PanelLeftClose
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik05IDN2MTgiIC8+CiAgPHBhdGggZD0ibTE2IDE1LTMtMyAzLTMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/panel-left-close
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["rect", {
						"width": "18",
						"height": "18",
						"x": "3",
						"y": "3",
						"rx": "2"
					}],
					["path", { "d": "M9 3v18" }],
					["path", { "d": "m16 15-3-3 3-3" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Panel_left_close);
}
Panel_left_close.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/panel-left-open.svelte
Panel_left_open[FILENAME] = "node_modules/lucide-svelte/dist/icons/panel-left-open.svelte";
function Panel_left_open($$renderer, $$props) {
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
			{ name: "panel-left-open" },
			$$sanitized_props,
			{
				/**
				* @component @name PanelLeftOpen
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik05IDN2MTgiIC8+CiAgPHBhdGggZD0ibTE0IDkgMyAzLTMgMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/panel-left-open
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["rect", {
						"width": "18",
						"height": "18",
						"x": "3",
						"y": "3",
						"rx": "2"
					}],
					["path", { "d": "M9 3v18" }],
					["path", { "d": "m14 9 3 3-3 3" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Panel_left_open);
}
Panel_left_open.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/terminal.svelte
Terminal[FILENAME] = "node_modules/lucide-svelte/dist/icons/terminal.svelte";
function Terminal($$renderer, $$props) {
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
			{ name: "terminal" },
			$$sanitized_props,
			{
				/**
				* @component @name Terminal
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMTloOCIgLz4KICA8cGF0aCBkPSJtNCAxNyA2LTYtNi02IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/terminal
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [["path", { "d": "M12 19h8" }], ["path", { "d": "m4 17 6-6-6-6" }]],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Terminal);
}
Terminal.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// src/lib/components/Sidebar.svelte
Sidebar[FILENAME] = "src/lib/components/Sidebar.svelte";
function Sidebar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { threads, activeThreadId, memoryCount, vaultCount, serverOnline, onSelectThread, onNewThread, onDeleteThread, onCollapse, onNavigate } = $$props;
		let search = "";
		let filtered = derived(() => threads.filter((t) => t.title.toLowerCase().includes(search.toLowerCase())));
		$$renderer.push(`<aside class="w-full md:w-72 shrink-0 h-full flex flex-col justify-between border-r border-olive-drab/40 bg-[#12140e] p-3.5 pb-safe font-mono">`);
		push_element($$renderer, "aside", 52, 0);
		$$renderer.push(`<div class="flex flex-col min-h-0 flex-1">`);
		push_element($$renderer, "div", 55, 2);
		$$renderer.push(`<div class="flex items-center justify-between mb-4">`);
		push_element($$renderer, "div", 57, 4);
		$$renderer.push(`<div>`);
		push_element($$renderer, "div", 58, 6);
		$$renderer.push(`<h1 class="text-olive-bright font-black text-lg tracking-wider select-none">`);
		push_element($$renderer, "h1", 59, 8);
		$$renderer.push(`PHEONIKZ UI</h1>`);
		pop_element();
		$$renderer.push(` <span class="text-olive-drab text-[10px] tracking-widest block -mt-0.5 uppercase">`);
		push_element($$renderer, "span", 62, 8);
		$$renderer.push(`Mnemosyne Tactical Node</span>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <button type="button" aria-label="Collapse sidebar" class="w-8 h-8 flex items-center justify-center rounded text-stone-400 hover:text-olive-bright hover:bg-olive-drab/15 transition-colors cursor-pointer">`);
		push_element($$renderer, "button", 66, 6);
		Panel_left_close($$renderer, { class: "w-4 h-4" });
		$$renderer.push(`<!----></button>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <button type="button" class="w-full h-9 bg-[#3d462c] hover:bg-[#4c5836] active:scale-[0.98] transition-all text-stone-100 font-bold px-3.5 rounded border border-olive-bright/30 hover:border-olive-bright/60 flex items-center justify-center gap-2 mb-4 shadow-[0_0_15px_rgba(143,168,92,0.15)] cursor-pointer text-xs tracking-wider uppercase">`);
		push_element($$renderer, "button", 77, 4);
		Plus($$renderer, { class: "w-4 h-4 text-olive-bright" });
		$$renderer.push(`<!----> <span>`);
		push_element($$renderer, "span", 86, 6);
		$$renderer.push(`New Dispatch</span>`);
		pop_element();
		$$renderer.push(`</button>`);
		pop_element();
		$$renderer.push(` <div class="space-y-1 mb-4">`);
		push_element($$renderer, "div", 90, 4);
		$$renderer.push(`<div class="flex items-center gap-2 px-2 text-olive-bright text-[10px] tracking-widest font-bold mb-1 uppercase">`);
		push_element($$renderer, "div", 91, 6);
		Terminal($$renderer, { class: "w-3 h-3" });
		$$renderer.push(`<!----> <span>`);
		push_element($$renderer, "span", 95, 8);
		$$renderer.push(`Command Modules</span>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <a href="/search"${attr_class(`w-full h-9 text-left text-xs px-2.5 rounded flex items-center justify-between border transition-colors ${page.url.pathname === "/search" ? "text-cyber-cyan bg-[#091517] border-[#005a63]/60" : "text-stone-300 hover:text-cyber-cyan hover:bg-[#091517] border-transparent hover:border-[#005a63]/50"}`)}>`);
		push_element($$renderer, "a", 98, 6);
		$$renderer.push(`<span class="inline-flex items-center gap-2">`);
		push_element($$renderer, "span", 105, 8);
		Globe($$renderer, { class: "w-3.5 h-3.5 text-cyber-cyan" });
		$$renderer.push(`<!----> <span class="font-prose font-medium text-[13px]">`);
		push_element($$renderer, "span", 107, 10);
		$$renderer.push(`Web Recon</span>`);
		pop_element();
		$$renderer.push(`</span>`);
		pop_element();
		$$renderer.push(` <span class="text-[10px] text-cyber-cyan/70">`);
		push_element($$renderer, "span", 109, 8);
		$$renderer.push(`MODULAR</span>`);
		pop_element();
		$$renderer.push(`</a>`);
		pop_element();
		$$renderer.push(` <a href="/live"${attr_class(`w-full h-9 text-left text-xs px-2.5 rounded flex items-center justify-between border transition-colors ${page.url.pathname === "/live" ? "text-cyber-cyan bg-[#091517] border-[#005a63]/60" : "text-stone-300 hover:text-cyber-cyan hover:bg-[#091517] border-transparent hover:border-[#005a63]/50"}`)}>`);
		push_element($$renderer, "a", 112, 6);
		$$renderer.push(`<span class="inline-flex items-center gap-2">`);
		push_element($$renderer, "span", 119, 8);
		Radio($$renderer, { class: "w-3.5 h-3.5 text-cyber-cyan" });
		$$renderer.push(`<!----> <span class="font-prose font-medium text-[13px]">`);
		push_element($$renderer, "span", 121, 10);
		$$renderer.push(`Live Voice Comms</span>`);
		pop_element();
		$$renderer.push(`</span>`);
		pop_element();
		$$renderer.push(` <span class="text-[10px] text-cyber-cyan/70">`);
		push_element($$renderer, "span", 123, 8);
		$$renderer.push(`REALTIME</span>`);
		pop_element();
		$$renderer.push(`</a>`);
		pop_element();
		$$renderer.push(` <a href="/mnemosyne"${attr_class(`w-full h-9 text-left text-xs px-2.5 rounded flex items-center justify-between border transition-colors ${page.url.pathname === "/mnemosyne" ? "text-olive-bright bg-olive-drab/20 border-olive-bright/40" : "text-stone-300 hover:text-olive-bright hover:bg-olive-drab/15 border-transparent hover:border-olive-drab/40"}`)}>`);
		push_element($$renderer, "a", 126, 6);
		$$renderer.push(`<span class="inline-flex items-center gap-2">`);
		push_element($$renderer, "span", 133, 8);
		Brain($$renderer, { class: "w-3.5 h-3.5 text-olive-bright" });
		$$renderer.push(`<!----> <span class="font-prose font-medium text-[13px]">`);
		push_element($$renderer, "span", 135, 10);
		$$renderer.push(`Mnemosyne OS</span>`);
		pop_element();
		$$renderer.push(`</span>`);
		pop_element();
		$$renderer.push(` <span class="text-[10px] tabular-nums text-olive-bright/80">`);
		push_element($$renderer, "span", 137, 8);
		$$renderer.push(`${escape_html(memoryCount)} · ${escape_html(vaultCount)}</span>`);
		pop_element();
		$$renderer.push(`</a>`);
		pop_element();
		$$renderer.push(` <a href="/vault"${attr_class(`w-full h-9 text-left text-xs px-2.5 rounded flex items-center justify-between border transition-colors ${page.url.pathname === "/vault" ? "text-olive-bright bg-olive-drab/20 border-olive-bright/40" : "text-stone-300 hover:text-olive-bright hover:bg-olive-drab/15 border-transparent hover:border-olive-drab/40"}`)}>`);
		push_element($$renderer, "a", 142, 6);
		$$renderer.push(`<span class="inline-flex items-center gap-2">`);
		push_element($$renderer, "span", 149, 8);
		Key_round($$renderer, { class: "w-3.5 h-3.5 text-olive-bright" });
		$$renderer.push(`<!----> <span class="font-prose font-medium text-[13px]">`);
		push_element($$renderer, "span", 151, 10);
		$$renderer.push(`Settings &amp; Vault</span>`);
		pop_element();
		$$renderer.push(`</span>`);
		pop_element();
		$$renderer.push(` <span class="text-[10px] text-stone-500">`);
		push_element($$renderer, "span", 153, 8);
		$$renderer.push(`CONFIG</span>`);
		pop_element();
		$$renderer.push(`</a>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <div class="mb-3">`);
		push_element($$renderer, "div", 158, 4);
		$$renderer.push(`<div class="relative">`);
		push_element($$renderer, "div", 159, 6);
		Search($$renderer, { class: "w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" });
		$$renderer.push(`<!----> <input type="text"${attr("value", search)} placeholder="Filter dispatches..." class="w-full h-9 pl-8 pr-2.5 text-xs rounded border border-olive-drab/40 bg-[#0d0e0a] text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
		push_element($$renderer, "input", 161, 8);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <div class="text-[10px] tracking-widest uppercase text-stone-500 px-2 mb-1.5 font-bold">`);
		push_element($$renderer, "div", 171, 4);
		$$renderer.push(`Dispatch Logs</div>`);
		pop_element();
		$$renderer.push(` <div class="flex-1 overflow-y-auto space-y-1 pr-0.5 min-h-0">`);
		push_element($$renderer, "div", 174, 4);
		if (filtered().length === 0) {
			$$renderer.push(`<!--[0--><div class="px-2 py-6 text-[11px] text-stone-600 text-center">`);
			push_element($$renderer, "div", 176, 8);
			$$renderer.push(`${escape_html("NO ACTIVE DISPATCHES")}</div>`);
			pop_element();
		} else {
			$$renderer.push(`<!--[-1--><!--[-->`);
			const each_array = ensure_array_like(filtered());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let thread = each_array[$$index];
				const active = thread.id === activeThreadId && page.url.pathname === "/";
				$$renderer.push(`<div${attr_class(`group flex items-center justify-between gap-1 px-2.5 py-1.5 rounded text-xs transition-colors border ${active ? "text-olive-bright bg-olive-drab/15 border-olive-bright/40" : "text-stone-400 hover:text-stone-200 hover:bg-olive-drab/10 border-transparent"}`)}>`);
				push_element($$renderer, "div", 182, 10);
				$$renderer.push(`<button type="button" class="flex-1 min-w-0 py-0.5 flex flex-col justify-center text-left cursor-pointer">`);
				push_element($$renderer, "button", 187, 12);
				$$renderer.push(`<div class="truncate font-prose font-medium text-[13px] leading-snug">`);
				push_element($$renderer, "div", 196, 14);
				$$renderer.push(`${escape_html(thread.title)}</div>`);
				pop_element();
				$$renderer.push(` <div class="text-[10px] text-stone-500 truncate mt-0.5 tabular-nums">`);
				push_element($$renderer, "div", 197, 14);
				$$renderer.push(`${escape_html(thread.model)} · ${escape_html(thread.messages.length)} msgs</div>`);
				pop_element();
				$$renderer.push(`</button>`);
				pop_element();
				$$renderer.push(` <button type="button" aria-label="Delete thread" class="w-7 h-7 flex items-center justify-center opacity-70 md:opacity-0 md:group-hover:opacity-100 rounded text-stone-500 hover:text-red-400 transition-opacity cursor-pointer shrink-0">`);
				push_element($$renderer, "button", 201, 12);
				Trash_2($$renderer, { class: "w-3.5 h-3.5" });
				$$renderer.push(`<!----></button>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <div class="border-t border-olive-drab/25 pt-2.5 mt-2.5 flex items-center justify-between text-[11px]">`);
		push_element($$renderer, "div", 219, 2);
		$$renderer.push(`<div class="flex items-center gap-2">`);
		push_element($$renderer, "div", 220, 4);
		$$renderer.push(`<span${attr_class(`inline-block w-2 h-2 rounded-full ${serverOnline ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-red-500"}`)}>`);
		push_element($$renderer, "span", 221, 6);
		$$renderer.push(`</span>`);
		pop_element();
		$$renderer.push(` <span${attr_class(`font-bold uppercase tracking-wider ${serverOnline ? "text-emerald-400" : "text-red-400"}`)}>`);
		push_element($$renderer, "span", 226, 6);
		$$renderer.push(`${escape_html(serverOnline ? "Server: Online" : "Server: Offline")}</span>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <span class="text-[10px] text-stone-500">`);
		push_element($$renderer, "span", 234, 4);
		$$renderer.push(`LOCAL</span>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(`</aside>`);
		pop_element();
	}, Sidebar);
}
Sidebar.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// src/lib/components/ModelSelector.svelte
ModelSelector[FILENAME] = "src/lib/components/ModelSelector.svelte";
function ModelSelector($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { models, providers, activeProvider, activeModel, onSelect } = $$props;
		const PROVIDER_LABELS = {
			gemini: "GOOGLE GEMINI",
			nanogpt: "NANOGPT",
			deepseek: "DEEPSEEK",
			openai: "OPENAI"
		};
		let currentModel = derived(() => models.find((m) => m.id === activeModel && m.provider === activeProvider) || models.find((m) => m.id === activeModel) || models[0]);
		$$renderer.push(`<div class="relative min-w-0">`);
		push_element($$renderer, "div", 48, 0);
		$$renderer.push(`<button type="button" class="inline-flex items-center gap-1.5 px-2 sm:px-3 h-8 sm:h-[34px] rounded border border-olive-drab/50 bg-[#141710] hover:border-olive-bright/60 text-[11px] sm:text-xs font-mono text-stone-200 transition-colors cursor-pointer whitespace-nowrap max-w-[175px] sm:max-w-none">`);
		push_element($$renderer, "button", 49, 2);
		$$renderer.push(`<span class="truncate text-olive-bright font-semibold">`);
		push_element($$renderer, "span", 54, 4);
		$$renderer.push(`${escape_html(currentModel()?.label ?? activeModel)}</span>`);
		pop_element();
		$$renderer.push(` <span class="text-[10px] text-stone-500 hidden sm:inline uppercase tracking-wider">`);
		push_element($$renderer, "span", 57, 4);
		$$renderer.push(`${escape_html(PROVIDER_LABELS[activeProvider])}</span>`);
		pop_element();
		$$renderer.push(` `);
		Chevron_down($$renderer, { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 text-olive-bright/80 shrink-0" });
		$$renderer.push(`<!----></button>`);
		pop_element();
		$$renderer.push(` `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		pop_element();
	}, ModelSelector);
}
ModelSelector.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// src/routes/+layout.svelte
_layout[FILENAME] = "src/routes/+layout.svelte";
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { children } = $$props;
		let desktopSidebarOpen = true;
		let mobileDrawerOpen = false;
		async function handleNewDispatch() {
			await createNewThread();
			mobileDrawerOpen = false;
			await goto("/");
		}
		if (!store_get($$store_subs ??= {}, "$settings", settings)) {
			$$renderer.push(`<!--[0--><div class="h-[100dvh] w-full flex items-center justify-center bg-[#0a0b08] text-xs font-mono text-olive-bright uppercase tracking-widest px-4 text-center">`);
			push_element($$renderer, "div", 48, 2);
			$$renderer.push(`Initializing Pheonikz UI Tactical Node...</div>`);
			pop_element();
		} else {
			$$renderer.push(`<!--[-1--><div class="h-[100dvh] w-full flex overflow-hidden bg-[#0a0b08] text-stone-300 font-mono">`);
			push_element($$renderer, "div", 54, 2);
			if (desktopSidebarOpen) {
				$$renderer.push(`<!--[0--><div class="hidden md:flex h-full shrink-0">`);
				push_element($$renderer, "div", 57, 6);
				Sidebar($$renderer, {
					threads: store_get($$store_subs ??= {}, "$threads", threads),
					activeThreadId: store_get($$store_subs ??= {}, "$activeThreadId", activeThreadId),
					memoryCount: store_get($$store_subs ??= {}, "$memories", memories).length,
					vaultCount: store_get($$store_subs ??= {}, "$vaultDocs", vaultDocs).length,
					serverOnline: store_get($$store_subs ??= {}, "$serverOnline", serverOnline),
					onSelectThread: (id) => activeThreadId.set(id),
					onNewThread: () => void handleNewDispatch(),
					onDeleteThread: (id) => void deleteThreadById(id),
					onCollapse: () => desktopSidebarOpen = false
				});
				$$renderer.push(`<!----></div>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (mobileDrawerOpen) {
				$$renderer.push(`<!--[0--><div class="fixed inset-0 z-40 bg-black/75 backdrop-blur-[1px] md:hidden" role="presentation">`);
				push_element($$renderer, "div", 74, 6);
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <div class="fixed inset-y-0 left-0 z-50 w-[84vw] max-w-[300px] md:hidden shadow-2xl">`);
				push_element($$renderer, "div", 79, 6);
				Sidebar($$renderer, {
					threads: store_get($$store_subs ??= {}, "$threads", threads),
					activeThreadId: store_get($$store_subs ??= {}, "$activeThreadId", activeThreadId),
					memoryCount: store_get($$store_subs ??= {}, "$memories", memories).length,
					vaultCount: store_get($$store_subs ??= {}, "$vaultDocs", vaultDocs).length,
					serverOnline: store_get($$store_subs ??= {}, "$serverOnline", serverOnline),
					onSelectThread: (id) => activeThreadId.set(id),
					onNewThread: () => void handleNewDispatch(),
					onDeleteThread: (id) => void deleteThreadById(id),
					onCollapse: () => mobileDrawerOpen = false,
					onNavigate: () => mobileDrawerOpen = false
				});
				$$renderer.push(`<!----></div>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="flex-1 flex flex-col min-w-0 h-full">`);
			push_element($$renderer, "div", 95, 4);
			$$renderer.push(`<header class="h-11 md:h-14 shrink-0 px-2.5 sm:px-6 border-b border-olive-drab/40 bg-[#12140e] flex items-center justify-between gap-2 sm:gap-6 pt-safe">`);
			push_element($$renderer, "header", 97, 6);
			$$renderer.push(`<div class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 md:flex-initial">`);
			push_element($$renderer, "div", 100, 8);
			$$renderer.push(`<button type="button" aria-label="Open navigation drawer" class="md:hidden w-8 h-8 flex items-center justify-center rounded border border-olive-drab/40 text-olive-bright hover:bg-olive-drab/15 transition-colors cursor-pointer shrink-0">`);
			push_element($$renderer, "button", 101, 10);
			Menu($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----></button>`);
			pop_element();
			$$renderer.push(` `);
			if (!desktopSidebarOpen) {
				$$renderer.push(`<!--[0--><button type="button" aria-label="Expand sidebar" class="hidden md:flex p-1.5 rounded text-stone-400 hover:text-olive-bright hover:bg-olive-drab/15 transition-colors cursor-pointer shrink-0">`);
				push_element($$renderer, "button", 111, 12);
				Panel_left_open($$renderer, { class: "w-4 h-4" });
				$$renderer.push(`<!----></button>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <a href="/" class="text-[11px] sm:text-sm font-black tracking-wide sm:tracking-wider text-olive-bright whitespace-nowrap shrink-0">`);
			push_element($$renderer, "a", 121, 10);
			$$renderer.push(`PHEONIKZ UI</a>`);
			pop_element();
			$$renderer.push(` <div class="ml-auto md:ml-0 min-w-0">`);
			push_element($$renderer, "div", 128, 10);
			ModelSelector($$renderer, {
				models: store_get($$store_subs ??= {}, "$models", models),
				providers: store_get($$store_subs ??= {}, "$providers", providers),
				activeProvider: store_get($$store_subs ??= {}, "$settings", settings).activeProvider,
				activeModel: store_get($$store_subs ??= {}, "$settings", settings).activeModel,
				onSelect: (prov, modelId) => void selectModel(prov, modelId)
			});
			$$renderer.push(`<!----></div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <nav class="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-bold tracking-wider uppercase">`);
			push_element($$renderer, "nav", 139, 8);
			$$renderer.push(`<a href="/"${attr_class(`py-1 transition-colors whitespace-nowrap shrink-0 ${page.url.pathname === "/" ? "text-cyber-cyan underline underline-offset-8 decoration-2 decoration-cyber-cyan" : "text-stone-400 hover:text-olive-bright"}`)}>`);
			push_element($$renderer, "a", 140, 10);
			$$renderer.push(`Dispatch</a>`);
			pop_element();
			$$renderer.push(` <a href="/search"${attr_class(`py-1 transition-colors whitespace-nowrap shrink-0 ${page.url.pathname === "/search" ? "text-cyber-cyan underline underline-offset-8 decoration-2 decoration-cyber-cyan" : "text-stone-400 hover:text-olive-bright"}`)}>`);
			push_element($$renderer, "a", 148, 10);
			$$renderer.push(`Web Recon</a>`);
			pop_element();
			$$renderer.push(` <a href="/live"${attr_class(`py-1 transition-colors whitespace-nowrap shrink-0 ${page.url.pathname === "/live" ? "text-cyber-cyan underline underline-offset-8 decoration-2 decoration-cyber-cyan" : "text-stone-400 hover:text-olive-bright"}`)}>`);
			push_element($$renderer, "a", 156, 10);
			$$renderer.push(`Live Comms</a>`);
			pop_element();
			$$renderer.push(` <a href="/mnemosyne"${attr_class(`py-1 transition-colors whitespace-nowrap shrink-0 ${page.url.pathname === "/mnemosyne" ? "text-cyber-cyan underline underline-offset-8 decoration-2 decoration-cyber-cyan" : "text-stone-400 hover:text-olive-bright"}`)}>`);
			push_element($$renderer, "a", 164, 10);
			$$renderer.push(`Mnemosyne OS</a>`);
			pop_element();
			$$renderer.push(` <a href="/vault"${attr_class(`py-1 transition-colors whitespace-nowrap shrink-0 ${page.url.pathname === "/vault" ? "text-cyber-cyan underline underline-offset-8 decoration-2 decoration-cyber-cyan" : "text-stone-400 hover:text-olive-bright"}`)}>`);
			push_element($$renderer, "a", 172, 10);
			$$renderer.push(`Settings</a>`);
			pop_element();
			$$renderer.push(`</nav>`);
			pop_element();
			$$renderer.push(` <div class="hidden md:block shrink-0">`);
			push_element($$renderer, "div", 182, 8);
			$$renderer.push(`<a${attr("href", page.url.pathname === "/live" ? "/" : "/live")} class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#091517] hover:border-cyber-cyan border border-[#005a63]/60 text-cyber-cyan text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0">`);
			push_element($$renderer, "a", 183, 10);
			Radio($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 188, 12);
			$$renderer.push(`${escape_html(page.url.pathname === "/live" ? "DISPATCH" : "LIVE COMMS")}</span>`);
			pop_element();
			$$renderer.push(`</a>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</header>`);
			pop_element();
			$$renderer.push(` `);
			children($$renderer);
			$$renderer.push(`<!----> <nav aria-label="Primary mobile navigation" class="md:hidden shrink-0 grid grid-cols-5 border-t border-olive-drab/35 bg-[#12140e] pb-safe z-30">`);
			push_element($$renderer, "nav", 197, 6);
			$$renderer.push(`<a href="/"${attr_class(`h-12 flex flex-col items-center justify-center gap-0.5 text-[10px] font-prose font-medium transition-colors border-t-2 ${page.url.pathname === "/" ? "text-cyber-cyan border-cyber-cyan bg-[#091517]/50" : "text-stone-400 border-transparent hover:text-olive-bright"}`)}>`);
			push_element($$renderer, "a", 201, 8);
			Message_square($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 208, 10);
			$$renderer.push(`Chat</span>`);
			pop_element();
			$$renderer.push(`</a>`);
			pop_element();
			$$renderer.push(` <a href="/search"${attr_class(`h-12 flex flex-col items-center justify-center gap-0.5 text-[10px] font-prose font-medium transition-colors border-t-2 ${page.url.pathname === "/search" ? "text-cyber-cyan border-cyber-cyan bg-[#091517]/50" : "text-stone-400 border-transparent hover:text-olive-bright"}`)}>`);
			push_element($$renderer, "a", 210, 8);
			Globe($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 217, 10);
			$$renderer.push(`Recon</span>`);
			pop_element();
			$$renderer.push(`</a>`);
			pop_element();
			$$renderer.push(` <a href="/live"${attr_class(`h-12 flex flex-col items-center justify-center gap-0.5 text-[10px] font-prose font-medium transition-colors border-t-2 ${page.url.pathname === "/live" ? "text-cyber-cyan border-cyber-cyan bg-[#091517]/50" : "text-stone-400 border-transparent hover:text-olive-bright"}`)}>`);
			push_element($$renderer, "a", 219, 8);
			Radio($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 226, 10);
			$$renderer.push(`Comms</span>`);
			pop_element();
			$$renderer.push(`</a>`);
			pop_element();
			$$renderer.push(` <a href="/mnemosyne"${attr_class(`h-12 flex flex-col items-center justify-center gap-0.5 text-[10px] font-prose font-medium transition-colors border-t-2 ${page.url.pathname === "/mnemosyne" ? "text-cyber-cyan border-cyber-cyan bg-[#091517]/50" : "text-stone-400 border-transparent hover:text-olive-bright"}`)}>`);
			push_element($$renderer, "a", 228, 8);
			Brain($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 235, 10);
			$$renderer.push(`Memory</span>`);
			pop_element();
			$$renderer.push(`</a>`);
			pop_element();
			$$renderer.push(` <a href="/vault"${attr_class(`h-12 flex flex-col items-center justify-center gap-0.5 text-[10px] font-prose font-medium transition-colors border-t-2 ${page.url.pathname === "/vault" ? "text-cyber-cyan border-cyber-cyan bg-[#091517]/50" : "text-stone-400 border-transparent hover:text-olive-bright"}`)}>`);
			push_element($$renderer, "a", 237, 8);
			Key_round($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 244, 10);
			$$renderer.push(`Vault</span>`);
			pop_element();
			$$renderer.push(`</a>`);
			pop_element();
			$$renderer.push(`</nav>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
		}
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	}, _layout);
}
_layout.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
export { _layout as default };

//# sourceMappingURL=_layout.svelte.js.map