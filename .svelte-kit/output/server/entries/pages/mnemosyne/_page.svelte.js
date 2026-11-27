import { A as FILENAME, d as spread_props, f as store_get, g as push_element, h as pop_element, i as derived, k as escape_html, l as sanitize_props, m as unsubscribe_stores, o as ensure_array_like, t as attr_class, u as slot, w as attr, x as prevent_snippet_stringification } from "../../../chunks/server.js";
import { t as Brain } from "../../../chunks/brain.js";
import { t as Database } from "../../../chunks/database.js";
import { _ as vaultDocs, o as memories, v as Icon } from "../../../chunks/workspace.js";
import { t as Plus } from "../../../chunks/plus.js";
import { t as Search } from "../../../chunks/search.js";
import { t as Trash_2 } from "../../../chunks/trash-2.js";
import { t as X } from "../../../chunks/x.js";
// node_modules/lucide-svelte/dist/icons/check.svelte
Check[FILENAME] = "node_modules/lucide-svelte/dist/icons/check.svelte";
function Check($$renderer, $$props) {
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
			{ name: "check" },
			$$sanitized_props,
			{
				/**
				* @component @name Check
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgNiA5IDE3bC01LTUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/check
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [["path", { "d": "M20 6 9 17l-5-5" }]],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Check);
}
Check.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/pencil.svelte
Pencil[FILENAME] = "node_modules/lucide-svelte/dist/icons/pencil.svelte";
function Pencil($$renderer, $$props) {
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
			{ name: "pencil" },
			$$sanitized_props,
			{
				/**
				* @component @name Pencil
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEuMTc0IDYuODEyYTEgMSAwIDAgMC0zLjk4Ni0zLjk4N0wzLjg0MiAxNi4xNzRhMiAyIDAgMCAwLS41LjgzbC0xLjMyMSA0LjM1MmEuNS41IDAgMCAwIC42MjMuNjIybDQuMzUzLTEuMzJhMiAyIDAgMCAwIC44My0uNDk3eiIgLz4KICA8cGF0aCBkPSJtMTUgNSA0IDQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/pencil
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [["path", { "d": "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" }], ["path", { "d": "m15 5 4 4" }]],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Pencil);
}
Pencil.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/pin-off.svelte
Pin_off[FILENAME] = "node_modules/lucide-svelte/dist/icons/pin-off.svelte";
function Pin_off($$renderer, $$props) {
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
			{ name: "pin-off" },
			$$sanitized_props,
			{
				/**
				* @component @name PinOff
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMTd2NSIgLz4KICA8cGF0aCBkPSJNMTUgOS4zNFY3YTEgMSAwIDAgMSAxLTEgMiAyIDAgMCAwIDAtNEg3Ljg5IiAvPgogIDxwYXRoIGQ9Im0yIDIgMjAgMjAiIC8+CiAgPHBhdGggZD0iTTkgOXYxLjc2YTIgMiAwIDAgMS0xLjExIDEuNzlsLTEuNzguOUEyIDIgMCAwIDAgNSAxNS4yNFYxNmExIDEgMCAwIDAgMSAxaDExIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/pin-off
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M12 17v5" }],
					["path", { "d": "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" }],
					["path", { "d": "m2 2 20 20" }],
					["path", { "d": "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Pin_off);
}
Pin_off.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/pin.svelte
Pin[FILENAME] = "node_modules/lucide-svelte/dist/icons/pin.svelte";
function Pin($$renderer, $$props) {
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
			{ name: "pin" },
			$$sanitized_props,
			{
				/**
				* @component @name Pin
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMTd2NSIgLz4KICA8cGF0aCBkPSJNOSAxMC43NmEyIDIgMCAwIDEtMS4xMSAxLjc5bC0xLjc4LjlBMiAyIDAgMCAwIDUgMTUuMjRWMTZhMSAxIDAgMCAwIDEgMWgxMmExIDEgMCAwIDAgMS0xdi0uNzZhMiAyIDAgMCAwLTEuMTEtMS43OWwtMS43OC0uOUEyIDIgMCAwIDEgMTUgMTAuNzZWN2ExIDEgMCAwIDEgMS0xIDIgMiAwIDAgMCAwLTRIOGEyIDIgMCAwIDAgMCA0IDEgMSAwIDAgMSAxIDF6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/pin
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [["path", { "d": "M12 17v5" }], ["path", { "d": "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" }]],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Pin);
}
Pin.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// src/routes/mnemosyne/+page.svelte
_page[FILENAME] = "src/routes/mnemosyne/+page.svelte";
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const TIERS = [
			{
				id: "all",
				label: "ALL TIERS"
			},
			{
				id: "core",
				label: "CORE"
			},
			{
				id: "episodic",
				label: "EPISODIC"
			},
			{
				id: "semantic",
				label: "SEMANTIC"
			},
			{
				id: "procedural",
				label: "PROCEDURAL"
			}
		];
		let tierFilter = "all";
		let search = "";
		let newTier = "episodic";
		let newContent = "";
		let newPinned = false;
		let editingId = null;
		let editContent = "";
		let editTier = "episodic";
		let filteredMemories = derived(() => store_get($$store_subs ??= {}, "$memories", memories).filter((m) => {
			return !search.trim();
		}));
		let tierCounts = derived(() => ({
			core: store_get($$store_subs ??= {}, "$memories", memories).filter((m) => m.tier === "core").length,
			episodic: store_get($$store_subs ??= {}, "$memories", memories).filter((m) => m.tier === "episodic").length,
			semantic: store_get($$store_subs ??= {}, "$memories", memories).filter((m) => m.tier === "semantic").length,
			procedural: store_get($$store_subs ??= {}, "$memories", memories).filter((m) => m.tier === "procedural").length
		}));
		$$renderer.push(`<div class="flex-1 overflow-y-auto px-2.5 sm:px-8 py-3 sm:py-6 bg-[#0a0b08] relative font-mono">`);
		push_element($$renderer, "div", 169, 0);
		$$renderer.push(`<div class="absolute inset-0 pointer-events-none crt-scanlines opacity-15">`);
		push_element($$renderer, "div", 170, 2);
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <div class="max-w-5xl mx-auto space-y-4 sm:space-y-6 relative z-10">`);
		push_element($$renderer, "div", 172, 2);
		$$renderer.push(`<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 pb-3 sm:pb-4 border-b border-olive-drab/40">`);
		push_element($$renderer, "div", 173, 4);
		$$renderer.push(`<div>`);
		push_element($$renderer, "div", 176, 6);
		$$renderer.push(`<h1 class="text-base sm:text-xl font-bold tracking-wider text-olive-bright uppercase">`);
		push_element($$renderer, "h1", 177, 8);
		$$renderer.push(`Mnemosyne OS</h1>`);
		pop_element();
		$$renderer.push(` <p class="font-prose text-[13px] sm:text-xs text-stone-400 mt-0.5 leading-snug">`);
		push_element($$renderer, "p", 180, 8);
		$$renderer.push(`Persistent cognitive memory graph and chunked Knowledge Vault across all models.</p>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <div class="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 rounded border border-olive-drab/45 bg-[#12140e] w-full sm:w-auto">`);
		push_element($$renderer, "div", 185, 6);
		$$renderer.push(`<button type="button"${attr_class(`h-8 sm:h-auto px-3 py-1 rounded text-[11px] font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap bg-[#3d462c] text-olive-bright border border-olive-bright/30`)}>`);
		push_element($$renderer, "button", 188, 8);
		Brain($$renderer, { class: "w-3.5 h-3.5" });
		$$renderer.push(`<!----> <span>`);
		push_element($$renderer, "span", 196, 10);
		$$renderer.push(`MEMORY (${escape_html(store_get($$store_subs ??= {}, "$memories", memories).length)})</span>`);
		pop_element();
		$$renderer.push(`</button>`);
		pop_element();
		$$renderer.push(` <button type="button"${attr_class(`h-8 sm:h-auto px-3 py-1 rounded text-[11px] font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap text-stone-400 hover:text-stone-200`)}>`);
		push_element($$renderer, "button", 198, 8);
		Database($$renderer, { class: "w-3.5 h-3.5" });
		$$renderer.push(`<!----> <span>`);
		push_element($$renderer, "span", 206, 10);
		$$renderer.push(`VAULT (${escape_html(store_get($$store_subs ??= {}, "$vaultDocs", vaultDocs).length)})</span>`);
		pop_element();
		$$renderer.push(`</button>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(`</div>`);
		pop_element();
		$$renderer.push(` <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">`);
		push_element($$renderer, "div", 211, 4);
		$$renderer.push(`<!--[-->`);
		const each_array = ensure_array_like([
			"core",
			"episodic",
			"semantic",
			"procedural"
		]);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let tier = each_array[$$index];
			$$renderer.push(`<div class="rounded-lg border border-olive-drab/40 bg-[#12140e] px-3 sm:px-4 py-2.5 sm:py-3">`);
			push_element($$renderer, "div", 213, 8);
			$$renderer.push(`<div class="text-[10px] tracking-wider uppercase text-stone-400">`);
			push_element($$renderer, "div", 214, 10);
			$$renderer.push(`${escape_html(tier)} Tier</div>`);
			pop_element();
			$$renderer.push(` <div class="text-lg sm:text-2xl font-bold text-cyber-cyan tabular-nums mt-0.5">`);
			push_element($$renderer, "div", 217, 10);
			$$renderer.push(`${escape_html(tierCounts()[tier])}</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
		}
		$$renderer.push(`<!--]--></div>`);
		pop_element();
		$$renderer.push(` `);
		{
			$$renderer.push(`<!--[0--><div class="space-y-4 sm:space-y-6">`);
			push_element($$renderer, "div", 225, 6);
			$$renderer.push(`<form class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3 sm:p-4 space-y-2.5">`);
			push_element($$renderer, "form", 226, 8);
			$$renderer.push(`<div class="text-[11px] font-bold tracking-wider text-olive-bright uppercase">`);
			push_element($$renderer, "div", 230, 10);
			$$renderer.push(`Commit New Memory Node</div>`);
			pop_element();
			$$renderer.push(` <div class="flex flex-col sm:flex-row gap-2">`);
			push_element($$renderer, "div", 233, 10);
			$$renderer.select({
				value: newTier,
				class: "h-9 px-2.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright"
			}, ($$renderer) => {
				$$renderer.option({ value: "core" }, ($$renderer) => {
					push_element($$renderer, "option", 238, 14);
					$$renderer.push(`CORE DIRECTIVE`);
					pop_element();
				});
				$$renderer.option({ value: "episodic" }, ($$renderer) => {
					push_element($$renderer, "option", 239, 14);
					$$renderer.push(`EPISODIC EVENT`);
					pop_element();
				});
				$$renderer.option({ value: "semantic" }, ($$renderer) => {
					push_element($$renderer, "option", 240, 14);
					$$renderer.push(`SEMANTIC FACT`);
					pop_element();
				});
				$$renderer.option({ value: "procedural" }, ($$renderer) => {
					push_element($$renderer, "option", 241, 14);
					$$renderer.push(`PROCEDURAL RULE`);
					pop_element();
				});
			});
			$$renderer.push(` <input type="text"${attr("value", newContent)} placeholder="Enter standalone memory directive or preference..." class="flex-1 h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
			push_element($$renderer, "input", 243, 12);
			pop_element();
			$$renderer.push(` <div class="flex items-center justify-between sm:justify-start gap-2.5">`);
			push_element($$renderer, "div", 249, 12);
			$$renderer.push(`<label class="h-9 inline-flex items-center gap-1.5 px-2 text-xs text-stone-300 cursor-pointer select-none">`);
			push_element($$renderer, "label", 250, 14);
			$$renderer.push(`<input type="checkbox"${attr("checked", newPinned, true)} class="accent-[#8fa85c] w-3.5 h-3.5"/>`);
			push_element($$renderer, "input", 251, 16);
			pop_element();
			$$renderer.push(` <span>`);
			push_element($$renderer, "span", 252, 16);
			$$renderer.push(`PIN</span>`);
			pop_element();
			$$renderer.push(`</label>`);
			pop_element();
			$$renderer.push(` <button type="submit"${attr("disabled", !newContent.trim(), true)} class="flex-1 sm:flex-initial h-9 px-4 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-xs font-bold inline-flex items-center justify-center gap-1.5 border border-olive-bright/30 cursor-pointer whitespace-nowrap uppercase">`);
			push_element($$renderer, "button", 254, 14);
			Plus($$renderer, { class: "w-3.5 h-3.5 text-olive-bright" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 260, 16);
			$$renderer.push(`Commit</span>`);
			pop_element();
			$$renderer.push(`</button>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</form>`);
			pop_element();
			$$renderer.push(` <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">`);
			push_element($$renderer, "div", 266, 8);
			$$renderer.push(`<div class="flex items-center gap-1 p-1 rounded border border-olive-drab/40 bg-[#12140e] overflow-x-auto no-scrollbar max-w-full">`);
			push_element($$renderer, "div", 267, 10);
			$$renderer.push(`<!--[-->`);
			const each_array_1 = ensure_array_like(TIERS);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let t = each_array_1[$$index_1];
				$$renderer.push(`<button type="button"${attr_class(`h-7 px-2.5 rounded text-[10.5px] font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${tierFilter === t.id ? "bg-[#3d462c] text-olive-bright" : "text-stone-400 hover:text-stone-200"}`)}>`);
				push_element($$renderer, "button", 269, 14);
				$$renderer.push(`${escape_html(t.label)}</button>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(` <div class="relative w-full sm:w-64">`);
			push_element($$renderer, "div", 281, 10);
			Search($$renderer, { class: "w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2" });
			$$renderer.push(`<!----> <input type="text"${attr("value", search)} placeholder="Filter memories..." class="w-full h-9 pl-8 pr-3 rounded border border-olive-drab/45 bg-[#12140e] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
			push_element($$renderer, "input", 283, 12);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` `);
			if (filteredMemories().length === 0) {
				$$renderer.push(`<!--[0--><div class="rounded-lg border border-olive-drab/40 bg-[#12140e] p-6 sm:p-10 text-center space-y-1.5">`);
				push_element($$renderer, "div", 293, 10);
				$$renderer.push(`<div class="text-xs font-bold text-stone-300 uppercase">`);
				push_element($$renderer, "div", 294, 12);
				$$renderer.push(`No memories match filter</div>`);
				pop_element();
				$$renderer.push(` <p class="font-prose text-xs text-stone-500">`);
				push_element($$renderer, "p", 297, 12);
				$$renderer.push(`Run dispatches with Mnemosyne engaged or commit a memory above.</p>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
			} else {
				$$renderer.push(`<!--[-1--><div class="divide-y divide-olive-drab/25 rounded-lg border border-[#005a63]/50 bg-[#091517]">`);
				push_element($$renderer, "div", 302, 10);
				$$renderer.push(`<!--[-->`);
				const each_array_2 = ensure_array_like(filteredMemories());
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let mem = each_array_2[$$index_2];
					const isEditing = editingId === mem.id;
					$$renderer.push(`<div class="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">`);
					push_element($$renderer, "div", 305, 14);
					$$renderer.push(`<div class="flex-1 min-w-0 space-y-1">`);
					push_element($$renderer, "div", 306, 16);
					$$renderer.push(`<div class="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] text-stone-400">`);
					push_element($$renderer, "div", 307, 18);
					$$renderer.push(`<span class="font-bold uppercase text-olive-bright">`);
					push_element($$renderer, "span", 308, 20);
					$$renderer.push(`${escape_html(mem.tier)}</span>`);
					pop_element();
					$$renderer.push(` <span aria-hidden="true">`);
					push_element($$renderer, "span", 309, 20);
					$$renderer.push(`·</span>`);
					pop_element();
					$$renderer.push(` <span>`);
					push_element($$renderer, "span", 310, 20);
					$$renderer.push(`${escape_html(mem.sourceType.toUpperCase())}</span>`);
					pop_element();
					$$renderer.push(` <span aria-hidden="true">`);
					push_element($$renderer, "span", 311, 20);
					$$renderer.push(`·</span>`);
					pop_element();
					$$renderer.push(` <span class="tabular-nums text-cyber-cyan/80">`);
					push_element($$renderer, "span", 312, 20);
					$$renderer.push(`${escape_html(Math.round(mem.salience * 100))}%</span>`);
					pop_element();
					$$renderer.push(` `);
					if (mem.pinned) {
						$$renderer.push(`<!--[0--><span aria-hidden="true">`);
						push_element($$renderer, "span", 316, 22);
						$$renderer.push(`·</span>`);
						pop_element();
						$$renderer.push(` <span class="text-amber-400 font-bold">`);
						push_element($$renderer, "span", 317, 22);
						$$renderer.push(`PINNED</span>`);
						pop_element();
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> <span aria-hidden="true">`);
					push_element($$renderer, "span", 319, 20);
					$$renderer.push(`·</span>`);
					pop_element();
					$$renderer.push(` <span class="tabular-nums">`);
					push_element($$renderer, "span", 320, 20);
					$$renderer.push(`${escape_html(new Date(mem.updatedAt).toLocaleDateString())}</span>`);
					pop_element();
					$$renderer.push(`</div>`);
					pop_element();
					$$renderer.push(` `);
					if (isEditing) {
						$$renderer.push(`<!--[0--><div class="flex flex-col sm:flex-row gap-2 pt-1">`);
						push_element($$renderer, "div", 326, 20);
						$$renderer.select({
							value: editTier,
							class: "h-9 px-2.5 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200"
						}, ($$renderer) => {
							$$renderer.option({ value: "core" }, ($$renderer) => {
								push_element($$renderer, "option", 331, 24);
								$$renderer.push(`CORE`);
								pop_element();
							});
							$$renderer.option({ value: "episodic" }, ($$renderer) => {
								push_element($$renderer, "option", 332, 24);
								$$renderer.push(`EPISODIC`);
								pop_element();
							});
							$$renderer.option({ value: "semantic" }, ($$renderer) => {
								push_element($$renderer, "option", 333, 24);
								$$renderer.push(`SEMANTIC`);
								pop_element();
							});
							$$renderer.option({ value: "procedural" }, ($$renderer) => {
								push_element($$renderer, "option", 334, 24);
								$$renderer.push(`PROCEDURAL`);
								pop_element();
							});
						});
						$$renderer.push(` <input type="text"${attr("value", editContent)} class="flex-1 h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200"/>`);
						push_element($$renderer, "input", 336, 22);
						pop_element();
						$$renderer.push(` <div class="flex items-center gap-1.5">`);
						push_element($$renderer, "div", 341, 22);
						$$renderer.push(`<button type="button" aria-label="Save edit" class="w-8 h-8 flex items-center justify-center rounded bg-[#3d462c] text-olive-bright cursor-pointer">`);
						push_element($$renderer, "button", 342, 24);
						Check($$renderer, { class: "w-4 h-4" });
						$$renderer.push(`<!----></button>`);
						pop_element();
						$$renderer.push(` <button type="button" aria-label="Cancel edit" class="w-8 h-8 flex items-center justify-center rounded bg-stone-800 text-stone-300 cursor-pointer">`);
						push_element($$renderer, "button", 350, 24);
						X($$renderer, { class: "w-4 h-4" });
						$$renderer.push(`<!----></button>`);
						pop_element();
						$$renderer.push(`</div>`);
						pop_element();
						$$renderer.push(`</div>`);
						pop_element();
					} else {
						$$renderer.push(`<!--[-1--><p class="font-prose text-[13.5px] sm:text-[13px] text-cyan-100 leading-relaxed break-words">`);
						push_element($$renderer, "p", 361, 20);
						$$renderer.push(`${escape_html(mem.content)}</p>`);
						pop_element();
					}
					$$renderer.push(`<!--]--></div>`);
					pop_element();
					$$renderer.push(` `);
					if (!isEditing) {
						$$renderer.push(`<!--[0--><div class="flex items-center justify-end gap-1 shrink-0">`);
						push_element($$renderer, "div", 366, 18);
						$$renderer.push(`<button type="button"${attr("title", mem.pinned ? "Unpin" : "Pin always")}${attr("aria-label", mem.pinned ? "Unpin memory" : "Pin memory")}${attr_class(`w-8 h-8 flex items-center justify-center rounded transition-colors cursor-pointer ${mem.pinned ? "text-amber-400 hover:bg-amber-950/40" : "text-stone-400 hover:text-olive-bright"}`)}>`);
						push_element($$renderer, "button", 367, 20);
						if (mem.pinned) {
							$$renderer.push("<!--[0-->");
							Pin_off($$renderer, { class: "w-3.5 h-3.5" });
						} else {
							$$renderer.push("<!--[-1-->");
							Pin($$renderer, { class: "w-3.5 h-3.5" });
						}
						$$renderer.push(`<!--]--></button>`);
						pop_element();
						$$renderer.push(` <button type="button" title="Edit" aria-label="Edit memory" class="w-8 h-8 flex items-center justify-center rounded text-stone-400 hover:text-cyber-cyan cursor-pointer">`);
						push_element($$renderer, "button", 382, 20);
						Pencil($$renderer, { class: "w-3.5 h-3.5" });
						$$renderer.push(`<!----></button>`);
						pop_element();
						$$renderer.push(` <button type="button" title="Purge" aria-label="Purge memory" class="w-8 h-8 flex items-center justify-center rounded text-stone-400 hover:text-red-400 cursor-pointer">`);
						push_element($$renderer, "button", 395, 20);
						Trash_2($$renderer, { class: "w-3.5 h-3.5" });
						$$renderer.push(`<!----></button>`);
						pop_element();
						$$renderer.push(`</div>`);
						pop_element();
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div>`);
					pop_element();
				}
				$$renderer.push(`<!--]--></div>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></div>`);
			pop_element();
		}
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