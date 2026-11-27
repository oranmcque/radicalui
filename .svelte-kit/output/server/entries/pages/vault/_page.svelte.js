import { A as FILENAME, d as spread_props, f as store_get, g as push_element, h as pop_element, i as derived, k as escape_html, l as sanitize_props, m as unsubscribe_stores, o as ensure_array_like, t as attr_class, u as slot, w as attr, x as prevent_snippet_stringification } from "../../../chunks/server.js";
import { c as providers, f as settings, g as updateSettings, p as storageConfig, v as Icon } from "../../../chunks/workspace.js";
import { t as Key_round } from "../../../chunks/key-round.js";
import { t as Trash_2 } from "../../../chunks/trash-2.js";
import { t as Globe } from "../../../chunks/globe.js";
// node_modules/lucide-svelte/dist/icons/circle-alert.svelte
Circle_alert[FILENAME] = "node_modules/lucide-svelte/dist/icons/circle-alert.svelte";
function Circle_alert($$renderer, $$props) {
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
			{ name: "circle-alert" },
			$$sanitized_props,
			{
				/**
				* @component @name CircleAlert
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8bGluZSB4MT0iMTIiIHgyPSIxMiIgeTE9IjgiIHkyPSIxMiIgLz4KICA8bGluZSB4MT0iMTIiIHgyPSIxMi4wMSIgeTE9IjE2IiB5Mj0iMTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/circle-alert
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["circle", {
						"cx": "12",
						"cy": "12",
						"r": "10"
					}],
					["line", {
						"x1": "12",
						"x2": "12",
						"y1": "8",
						"y2": "12"
					}],
					["line", {
						"x1": "12",
						"x2": "12.01",
						"y1": "16",
						"y2": "16"
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
	}, Circle_alert);
}
Circle_alert.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/circle-check.svelte
Circle_check[FILENAME] = "node_modules/lucide-svelte/dist/icons/circle-check.svelte";
function Circle_check($$renderer, $$props) {
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
			{ name: "circle-check" },
			$$sanitized_props,
			{
				/**
				* @component @name CircleCheck
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJtOSAxMiAyIDIgNC00IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/circle-check
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [["circle", {
					"cx": "12",
					"cy": "12",
					"r": "10"
				}], ["path", { "d": "m9 12 2 2 4-4" }]],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Circle_check);
}
Circle_check.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/cloud.svelte
Cloud[FILENAME] = "node_modules/lucide-svelte/dist/icons/cloud.svelte";
function Cloud($$renderer, $$props) {
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
			{ name: "cloud" },
			$$sanitized_props,
			{
				/**
				* @component @name Cloud
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTcuNSAxOUg5YTcgNyAwIDEgMSA2LjcxLTloMS43OWE0LjUgNC41IDAgMSAxIDAgOVoiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/cloud
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [["path", { "d": "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" }]],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Cloud);
}
Cloud.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/download.svelte
Download[FILENAME] = "node_modules/lucide-svelte/dist/icons/download.svelte";
function Download($$renderer, $$props) {
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
			{ name: "download" },
			$$sanitized_props,
			{
				/**
				* @component @name Download
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMTVWMyIgLz4KICA8cGF0aCBkPSJNMjEgMTV2NGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtNCIgLz4KICA8cGF0aCBkPSJtNyAxMCA1IDUgNS01IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/download
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M12 15V3" }],
					["path", { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
					["path", { "d": "m7 10 5 5 5-5" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Download);
}
Download.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/folder-open.svelte
Folder_open[FILENAME] = "node_modules/lucide-svelte/dist/icons/folder-open.svelte";
function Folder_open($$renderer, $$props) {
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
			{ name: "folder-open" },
			$$sanitized_props,
			{
				/**
				* @component @name FolderOpen
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtNiAxNCAxLjUtMi45QTIgMiAwIDAgMSA5LjI0IDEwSDIwYTIgMiAwIDAgMSAxLjk0IDIuNWwtMS41NCA2YTIgMiAwIDAgMS0xLjk1IDEuNUg0YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDMuOWEyIDIgMCAwIDEgMS42OS45bC44MSAxLjJhMiAyIDAgMCAwIDEuNjcuOUgxOGEyIDIgMCAwIDEgMiAydjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/folder-open
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [["path", { "d": "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" }]],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Folder_open);
}
Folder_open.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/hard-drive.svelte
Hard_drive[FILENAME] = "node_modules/lucide-svelte/dist/icons/hard-drive.svelte";
function Hard_drive($$renderer, $$props) {
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
			{ name: "hard-drive" },
			$$sanitized_props,
			{
				/**
				* @component @name HardDrive
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAgMTZoLjAxIiAvPgogIDxwYXRoIGQ9Ik0yLjIxMiAxMS41NzdhMiAyIDAgMCAwLS4yMTIuODk2VjE4YTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMnYtNS41MjdhMiAyIDAgMCAwLS4yMTItLjg5NkwxOC41NSA1LjExQTIgMiAwIDAgMCAxNi43NiA0SDcuMjRhMiAyIDAgMCAwLTEuNzkgMS4xMXoiIC8+CiAgPHBhdGggZD0iTTIxLjk0NiAxMi4wMTNIMi4wNTQiIC8+CiAgPHBhdGggZD0iTTYgMTZoLjAxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/hard-drive
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M10 16h.01" }],
					["path", { "d": "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" }],
					["path", { "d": "M21.946 12.013H2.054" }],
					["path", { "d": "M6 16h.01" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Hard_drive);
}
Hard_drive.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/radar.svelte
Radar[FILENAME] = "node_modules/lucide-svelte/dist/icons/radar.svelte";
function Radar($$renderer, $$props) {
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
			{ name: "radar" },
			$$sanitized_props,
			{
				/**
				* @component @name Radar
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTkuMDcgNC45M0ExMCAxMCAwIDAgMCA2Ljk5IDMuMzQiIC8+CiAgPHBhdGggZD0iTTQgNmguMDEiIC8+CiAgPHBhdGggZD0iTTIuMjkgOS42MkExMCAxMCAwIDEgMCAyMS4zMSA4LjM1IiAvPgogIDxwYXRoIGQ9Ik0xNi4yNCA3Ljc2QTYgNiAwIDEgMCA4LjIzIDE2LjY3IiAvPgogIDxwYXRoIGQ9Ik0xMiAxOGguMDEiIC8+CiAgPHBhdGggZD0iTTE3Ljk5IDExLjY2QTYgNiAwIDAgMSAxNS43NyAxNi42NyIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIyIiAvPgogIDxwYXRoIGQ9Im0xMy40MSAxMC41OSA1LjY2LTUuNjYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/radar
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M19.07 4.93A10 10 0 0 0 6.99 3.34" }],
					["path", { "d": "M4 6h.01" }],
					["path", { "d": "M2.29 9.62A10 10 0 1 0 21.31 8.35" }],
					["path", { "d": "M16.24 7.76A6 6 0 1 0 8.23 16.67" }],
					["path", { "d": "M12 18h.01" }],
					["path", { "d": "M17.99 11.66A6 6 0 0 1 15.77 16.67" }],
					["circle", {
						"cx": "12",
						"cy": "12",
						"r": "2"
					}],
					["path", { "d": "m13.41 10.59 5.66-5.66" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Radar);
}
Radar.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/save.svelte
Save[FILENAME] = "node_modules/lucide-svelte/dist/icons/save.svelte";
function Save($$renderer, $$props) {
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
			{ name: "save" },
			$$sanitized_props,
			{
				/**
				* @component @name Save
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUuMiAzYTIgMiAwIDAgMSAxLjQuNmwzLjggMy44YTIgMiAwIDAgMSAuNiAxLjRWMTlhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yeiIgLz4KICA8cGF0aCBkPSJNMTcgMjF2LTdhMSAxIDAgMCAwLTEtMUg4YTEgMSAwIDAgMC0xIDF2NyIgLz4KICA8cGF0aCBkPSJNNyAzdjRhMSAxIDAgMCAwIDEgMWg3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/save
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" }],
					["path", { "d": "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" }],
					["path", { "d": "M7 3v4a1 1 0 0 0 1 1h7" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Save);
}
Save.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/upload.svelte
Upload[FILENAME] = "node_modules/lucide-svelte/dist/icons/upload.svelte";
function Upload($$renderer, $$props) {
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
			{ name: "upload" },
			$$sanitized_props,
			{
				/**
				* @component @name Upload
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgM3YxMiIgLz4KICA8cGF0aCBkPSJtMTcgOC01LTUtNSA1IiAvPgogIDxwYXRoIGQ9Ik0yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/upload
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M12 3v12" }],
					["path", { "d": "m17 8-5-5-5 5" }],
					["path", { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Upload);
}
Upload.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/volume-2.svelte
Volume_2[FILENAME] = "node_modules/lucide-svelte/dist/icons/volume-2.svelte";
function Volume_2($$renderer, $$props) {
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
			{ name: "volume-2" },
			$$sanitized_props,
			{
				/**
				* @component @name Volume2
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTEgNC43MDJhLjcwNS43MDUgMCAwIDAtMS4yMDMtLjQ5OEw2LjQxMyA3LjU4N0ExLjQgMS40IDAgMCAxIDUuNDE2IDhIM2ExIDEgMCAwIDAtMSAxdjZhMSAxIDAgMCAwIDEgMWgyLjQxNmExLjQgMS40IDAgMCAxIC45OTcuNDEzbDMuMzgzIDMuMzg0QS43MDUuNzA1IDAgMCAwIDExIDE5LjI5OHoiIC8+CiAgPHBhdGggZD0iTTE2IDlhNSA1IDAgMCAxIDAgNiIgLz4KICA8cGF0aCBkPSJNMTkuMzY0IDE4LjM2NGE5IDkgMCAwIDAgMC0xMi43MjgiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/volume-2
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" }],
					["path", { "d": "M16 9a5 5 0 0 1 0 6" }],
					["path", { "d": "M19.364 18.364a9 9 0 0 0 0-12.728" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Volume_2);
}
Volume_2.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// src/routes/vault/+page.svelte
_page[FILENAME] = "src/routes/vault/+page.svelte";
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const EDITABLE_PROVIDERS = [
			{
				id: "deepgram",
				placeholder: "Paste Deepgram API key (Token)..."
			},
			{
				id: "fishaudio",
				placeholder: "Paste Fish Audio Bearer API key..."
			},
			{
				id: "nanogpt",
				placeholder: "Paste NanoGPT API key..."
			},
			{
				id: "deepseek",
				placeholder: "Paste DeepSeek API key (sk-...)..."
			},
			{
				id: "openai",
				placeholder: "Paste OpenAI API key (sk-...)..."
			},
			{
				id: "parallel",
				placeholder: "Paste Parallel API key (optional — anonymous MCP active)..."
			}
		];
		const SEARCH_PROVIDERS = [
			{
				id: "gemini-native",
				label: "Gemini Native (Google Search)",
				shortLabel: "GEMINI NATIVE",
				detail: "Native googleSearch tool & grounding citations on Gemini models (env GEMINI_API_KEY)."
			},
			{
				id: "searxng",
				label: "SearXNG (Self-Hosted)",
				shortLabel: "SEARXNG",
				detail: "Queries your local/LAN SearXNG JSON API ({SEARXNG_BASE_URL}/search?format=json)."
			},
			{
				id: "brave",
				label: "Brave Search",
				shortLabel: "BRAVE",
				detail: "Independent web search REST API using BRAVE_API_KEY."
			},
			{
				id: "tavily",
				label: "Tavily",
				shortLabel: "TAVILY",
				detail: "AI-ready search & content extraction API using TAVILY_API_KEY."
			},
			{
				id: "custom",
				label: "Custom Endpoint",
				shortLabel: "CUSTOM",
				detail: "Sends GET or POST to CUSTOM_SEARCH_URL with optional Bearer token."
			},
			{
				id: "parallel",
				label: "Parallel MCP",
				shortLabel: "PARALLEL MCP",
				detail: "Streamable HTTP MCP search via mcp.parallel.ai/mcp."
			}
		];
		const STORAGE_MODES = [
			{
				id: "local",
				label: "Local Workspace",
				subtitle: "Default ./data/aetheris-store.json on VPS disk."
			},
			{
				id: "mounted",
				label: "Mounted Local / Hetzner Box",
				subtitle: "Direct atomic writes to a mounted VPS path (e.g. /mnt/hetzner-box/pheonikz via SSHFS/CIFS)."
			},
			{
				id: "webdav",
				label: "WebDAV (Hetzner / Cloud)",
				subtitle: "HTTPS WebDAV sync (https://uXXXXXX.your-storagebox.de/...) with local cache."
			},
			{
				id: "remote-http",
				label: "External / Cloud HTTP",
				subtitle: "PUT/POST JSON sync to any external REST, R2, or S3 gateway with optional Bearer token."
			}
		];
		let storageModeDraft = store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.mode ?? "local";
		let mountedPathDraft = store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.mountedPath ?? "/mnt/hetzner-box/pheonikz";
		let remoteUrlDraft = store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.remoteUrl ?? "";
		let remoteUsernameDraft = store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.remoteUsername ?? "";
		let remotePasswordDraft = "";
		let remoteTokenDraft = "";
		let remoteMethodDraft = store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.remoteMethod ?? "PUT";
		let autoSyncRemoteDraft = store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.autoSyncRemote ?? true;
		let migrateDataDraft = true;
		let preferExistingDraft = false;
		let testingStorage = false;
		let savingStorage = false;
		let testingTts = false;
		let systemPromptDraft = store_get($$store_subs ??= {}, "$settings", settings)?.systemPrompt ?? "";
		let fishVoiceDraft = store_get($$store_subs ??= {}, "$settings", settings)?.fishVoiceId ?? "";
		let searxngUrlDraft = store_get($$store_subs ??= {}, "$settings", settings)?.searxngBaseUrl ?? "http://localhost:8888";
		let customSearchUrlDraft = store_get($$store_subs ??= {}, "$settings", settings)?.customSearchUrl ?? "";
		let customSearchMethodDraft = store_get($$store_subs ??= {}, "$settings", settings)?.customSearchMethod ?? "GET";
		let maxSearchResultsDraft = store_get($$store_subs ??= {}, "$settings", settings)?.maxSearchResults ?? 5;
		let testingRecon = false;
		let keyDrafts = {
			parallel: "",
			deepgram: "",
			fishaudio: "",
			nanogpt: "",
			deepseek: "",
			openai: "",
			brave: "",
			tavily: "",
			custom_search: ""
		};
		let savingKeyId = null;
		let geminiStatus = derived(() => store_get($$store_subs ??= {}, "$providers", providers).find((p) => p.id === "gemini"));
		let braveStatus = derived(() => store_get($$store_subs ??= {}, "$providers", providers).find((p) => p.id === "brave"));
		let tavilyStatus = derived(() => store_get($$store_subs ??= {}, "$providers", providers).find((p) => p.id === "tavily"));
		let customSearchKeyStatus = derived(() => store_get($$store_subs ??= {}, "$providers", providers).find((p) => p.id === "custom_search"));
		function formatBytes(bytes) {
			if (!bytes || bytes < 1024) return `${bytes || 0} B`;
			if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
			return `${(bytes / 1048576).toFixed(2)} MB`;
		}
		if (store_get($$store_subs ??= {}, "$settings", settings)) {
			$$renderer.push(`<!--[0--><div class="flex-1 overflow-y-auto px-2.5 sm:px-8 py-3 sm:py-6 bg-[#0a0b08] relative font-mono">`);
			push_element($$renderer, "div", 477, 2);
			$$renderer.push(`<div class="absolute inset-0 pointer-events-none crt-scanlines opacity-15">`);
			push_element($$renderer, "div", 478, 4);
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="max-w-5xl mx-auto space-y-5 sm:space-y-7 relative z-10">`);
			push_element($$renderer, "div", 480, 4);
			$$renderer.push(`<div class="pb-3 sm:pb-4 border-b border-olive-drab/40">`);
			push_element($$renderer, "div", 481, 6);
			$$renderer.push(`<h1 class="text-base sm:text-xl font-bold tracking-wider text-olive-bright uppercase">`);
			push_element($$renderer, "h1", 482, 8);
			$$renderer.push(`Settings · Storage, Recon, Keys &amp; Audio</h1>`);
			pop_element();
			$$renderer.push(` <p class="font-prose text-[13px] sm:text-xs text-stone-400 mt-1 leading-snug">`);
			push_element($$renderer, "p", 485, 8);
			$$renderer.push(`Route all Mnemosyne OS &amp; UI persistence to a mounted Hetzner Storage Box or remote
          cloud endpoint, configure Web Recon, and manage server-side credentials.</p>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <section class="rounded-lg border border-olive-bright/45 bg-[#12140e] p-3.5 sm:p-5 space-y-4 relative">`);
			push_element($$renderer, "section", 492, 6);
			$$renderer.push(`<div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-olive-bright opacity-55">`);
			push_element($$renderer, "div", 493, 8);
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">`);
			push_element($$renderer, "div", 497, 8);
			$$renderer.push(`<div>`);
			push_element($$renderer, "div", 498, 10);
			$$renderer.push(`<div class="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-olive-bright uppercase">`);
			push_element($$renderer, "div", 499, 12);
			Hard_drive($$renderer, { class: "w-4 h-4 shrink-0" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 503, 14);
			$$renderer.push(`Persistent Storage Backend</span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <p class="font-prose text-[12.5px] sm:text-xs text-stone-400 mt-1 leading-snug">`);
			push_element($$renderer, "p", 505, 12);
			$$renderer.push(`Store threads, Mnemosyne memories, Knowledge Vault docs, settings, and vault keys on
              your mounted Hetzner Storage Box (Contabo VPS) or sync remotely via WebDAV / HTTP.</p>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <button type="button"${attr("disabled", testingStorage, true)} class="w-full sm:w-auto h-8 inline-flex items-center justify-center gap-1.5 px-3 rounded border border-[#005a63]/65 bg-[#091517] hover:border-cyber-cyan disabled:opacity-50 text-[11px] font-bold text-cyber-cyan tracking-wider uppercase cursor-pointer shrink-0">`);
			push_element($$renderer, "button", 510, 10);
			$$renderer.push("<!--[-1-->");
			Radar($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 521, 14);
			$$renderer.push(`Test Storage</span>`);
			pop_element();
			$$renderer.push(`<!--]--></button>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` `);
			if (store_get($$store_subs ??= {}, "$storageConfig", storageConfig)) {
				$$renderer.push(`<!--[0--><div class="rounded border border-olive-drab/40 bg-[#0d0e0a] px-3 py-2 flex flex-wrap items-center justify-between gap-1.5 text-[10.5px]">`);
				push_element($$renderer, "div", 528, 10);
				$$renderer.push(`<div class="flex flex-wrap items-center gap-1.5 min-w-0">`);
				push_element($$renderer, "div", 531, 12);
				$$renderer.push(`<span class="px-1.5 py-0.5 rounded bg-olive-drab/30 text-olive-bright font-bold uppercase">`);
				push_element($$renderer, "span", 532, 14);
				$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$storageConfig", storageConfig).mode)}</span>`);
				pop_element();
				$$renderer.push(` <span class="text-stone-300 truncate max-w-full sm:max-w-md"${attr("title", store_get($$store_subs ??= {}, "$storageConfig", storageConfig).activeStoreFile)}>`);
				push_element($$renderer, "span", 535, 14);
				$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$storageConfig", storageConfig).activeStoreFile)}</span>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <div class="flex flex-wrap items-center gap-2.5 text-[10px] text-stone-400 uppercase tabular-nums">`);
				push_element($$renderer, "div", 539, 12);
				$$renderer.push(`<span>`);
				push_element($$renderer, "span", 540, 14);
				$$renderer.push(`${escape_html(formatBytes(store_get($$store_subs ??= {}, "$storageConfig", storageConfig).storeSizeBytes))}</span>`);
				pop_element();
				$$renderer.push(` `);
				if (store_get($$store_subs ??= {}, "$storageConfig", storageConfig).lastSyncedAt) {
					$$renderer.push(`<!--[0--><span>`);
					push_element($$renderer, "span", 542, 16);
					$$renderer.push(`SYNCED ${escape_html(new Date(store_get($$store_subs ??= {}, "$storageConfig", storageConfig).lastSyncedAt).toLocaleTimeString())}</span>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` `);
				if (store_get($$store_subs ??= {}, "$storageConfig", storageConfig).lastSyncError) {
					$$renderer.push(`<!--[0--><div class="px-3 py-2 rounded border border-amber-500/50 bg-amber-950/35 font-prose text-xs text-amber-300 flex items-center gap-2">`);
					push_element($$renderer, "div", 548, 12);
					Circle_alert($$renderer, { class: "w-4 h-4 shrink-0" });
					$$renderer.push(`<!----> <span>`);
					push_element($$renderer, "span", 550, 14);
					$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$storageConfig", storageConfig).lastSyncError)}</span>`);
					pop_element();
					$$renderer.push(`</div>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">`);
			push_element($$renderer, "div", 578, 8);
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(STORAGE_MODES);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let sm = each_array[$$index];
				const selected = storageModeDraft === sm.id;
				$$renderer.push(`<button type="button"${attr_class(`text-left p-2.5 sm:p-3 rounded border transition-colors cursor-pointer ${selected ? "border-olive-bright bg-olive-drab/25 text-olive-bright shadow-[0_0_12px_rgba(143,168,92,0.14)]" : "border-olive-drab/40 bg-[#0d0e0a] text-stone-300 hover:border-olive-bright/60"}`)}>`);
				push_element($$renderer, "button", 581, 12);
				$$renderer.push(`<div class="flex items-center justify-between gap-2">`);
				push_element($$renderer, "div", 591, 14);
				$$renderer.push(`<span class="text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5">`);
				push_element($$renderer, "span", 592, 16);
				if (sm.id === "mounted") {
					$$renderer.push("<!--[0-->");
					Folder_open($$renderer, { class: "w-3.5 h-3.5 shrink-0" });
				} else if (sm.id === "webdav" || sm.id === "remote-http") {
					$$renderer.push("<!--[1-->");
					Cloud($$renderer, { class: "w-3.5 h-3.5 shrink-0" });
				} else {
					$$renderer.push("<!--[-1-->");
					Hard_drive($$renderer, { class: "w-3.5 h-3.5 shrink-0" });
				}
				$$renderer.push(`<!--]--> <span>`);
				push_element($$renderer, "span", 600, 18);
				$$renderer.push(`${escape_html(sm.label)}</span>`);
				pop_element();
				$$renderer.push(`</span>`);
				pop_element();
				$$renderer.push(` `);
				if (selected) {
					$$renderer.push(`<!--[0--><span class="w-2 h-2 rounded-full bg-olive-bright shrink-0">`);
					push_element($$renderer, "span", 603, 18);
					$$renderer.push(`</span>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
				pop_element();
				$$renderer.push(` <p class="font-prose text-[11.5px] text-stone-400 mt-1 leading-snug">`);
				push_element($$renderer, "p", 606, 14);
				$$renderer.push(`${escape_html(sm.subtitle)}</p>`);
				pop_element();
				$$renderer.push(`</button>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(` `);
			if (storageModeDraft === "mounted") {
				$$renderer.push(`<!--[0--><div class="space-y-2.5 pt-2 border-t border-olive-drab/30">`);
				push_element($$renderer, "div", 613, 10);
				$$renderer.push(`<div class="space-y-1">`);
				push_element($$renderer, "div", 614, 12);
				$$renderer.push(`<label for="mounted-storage-path" class="block text-[10.5px] text-stone-300 uppercase">`);
				push_element($$renderer, "label", 615, 14);
				$$renderer.push(`Mounted Storage Box Path (Absolute Path on VPS)</label>`);
				pop_element();
				$$renderer.push(` <input id="mounted-storage-path" type="text"${attr("value", mountedPathDraft)} placeholder="/mnt/hetzner-box/pheonikz" class="w-full h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
				push_element($$renderer, "input", 618, 14);
				pop_element();
				$$renderer.push(` <span class="block font-prose text-[11.5px] text-stone-500 leading-snug">`);
				push_element($$renderer, "span", 625, 14);
				$$renderer.push(`Point to your mounted Hetzner Storage Box folder (SSHFS, CIFS/SMB, or rclone mount on
                Contabo). Writes atomically to <code class="font-mono text-[11px] text-olive-bright">`);
				push_element($$renderer, "code", 627, 47);
				$$renderer.push(`pheonikz-store.json</code>`);
				pop_element();
				$$renderer.push(` inside this path.</span>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
			} else if (storageModeDraft === "webdav") {
				$$renderer.push(`<!--[1--><div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-olive-drab/30">`);
				push_element($$renderer, "div", 632, 10);
				$$renderer.push(`<div class="space-y-1 md:col-span-2">`);
				push_element($$renderer, "div", 633, 12);
				$$renderer.push(`<label for="webdav-url" class="block text-[10.5px] text-stone-300 uppercase">`);
				push_element($$renderer, "label", 634, 14);
				$$renderer.push(`WebDAV Target File URL (Hetzner Storage Box / Nextcloud)</label>`);
				pop_element();
				$$renderer.push(` <input id="webdav-url" type="url"${attr("value", remoteUrlDraft)} placeholder="https://uXXXXXX.your-storagebox.de/pheonikz/pheonikz-store.json" class="w-full h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
				push_element($$renderer, "input", 637, 14);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <div class="space-y-1">`);
				push_element($$renderer, "div", 646, 12);
				$$renderer.push(`<label for="webdav-user" class="block text-[10.5px] text-stone-300 uppercase">`);
				push_element($$renderer, "label", 647, 14);
				$$renderer.push(`WebDAV Username</label>`);
				pop_element();
				$$renderer.push(` <input id="webdav-user" type="text" autocomplete="off"${attr("value", remoteUsernameDraft)} placeholder="uXXXXXX or sub-account username" class="w-full h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
				push_element($$renderer, "input", 650, 14);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <div class="space-y-1">`);
				push_element($$renderer, "div", 660, 12);
				$$renderer.push(`<div class="flex items-center justify-between gap-2">`);
				push_element($$renderer, "div", 661, 14);
				$$renderer.push(`<label for="webdav-pass" class="block text-[10.5px] text-stone-300 uppercase">`);
				push_element($$renderer, "label", 662, 16);
				$$renderer.push(`WebDAV Password (Write-Only)</label>`);
				pop_element();
				$$renderer.push(` `);
				if (store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.hasRemotePassword) {
					$$renderer.push(`<!--[0--><span class="text-[10px] text-emerald-400 font-bold">`);
					push_element($$renderer, "span", 666, 18);
					$$renderer.push(`SAVED</span>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
				pop_element();
				$$renderer.push(` <div class="flex items-center gap-1.5">`);
				push_element($$renderer, "div", 669, 14);
				$$renderer.push(`<input id="webdav-pass" type="password" autocomplete="off"${attr("value", remotePasswordDraft)}${attr("placeholder", store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.hasRemotePassword ? "•••••••••••••••• (leave blank to keep)" : "Paste Hetzner Storage Box password...")} class="flex-1 min-w-0 h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
				push_element($$renderer, "input", 670, 16);
				pop_element();
				$$renderer.push(` `);
				if (store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.hasRemotePassword) {
					$$renderer.push(`<!--[0--><button type="button"${attr("disabled", savingStorage, true)} title="Clear saved WebDAV password" aria-label="Clear saved WebDAV password" class="w-9 h-9 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0">`);
					push_element($$renderer, "button", 681, 18);
					Trash_2($$renderer, { class: "w-3.5 h-3.5" });
					$$renderer.push(`<!----></button>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <label class="md:col-span-2 inline-flex items-center gap-2 font-prose text-xs text-stone-300 cursor-pointer">`);
				push_element($$renderer, "label", 695, 12);
				$$renderer.push(`<input type="checkbox"${attr("checked", autoSyncRemoteDraft, true)} class="accent-[#8fa85c] w-3.5 h-3.5 shrink-0"/>`);
				push_element($$renderer, "input", 696, 14);
				pop_element();
				$$renderer.push(` <span>`);
				push_element($$renderer, "span", 701, 14);
				$$renderer.push(`Auto-sync to WebDAV on every write (keeps local write-through cache)</span>`);
				pop_element();
				$$renderer.push(`</label>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
			} else if (storageModeDraft === "remote-http") {
				$$renderer.push(`<!--[2--><div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-olive-drab/30">`);
				push_element($$renderer, "div", 705, 10);
				$$renderer.push(`<div class="space-y-1 md:col-span-2">`);
				push_element($$renderer, "div", 706, 12);
				$$renderer.push(`<label for="remote-http-url" class="block text-[10.5px] text-stone-300 uppercase">`);
				push_element($$renderer, "label", 707, 14);
				$$renderer.push(`External / Cloud Storage Endpoint URL</label>`);
				pop_element();
				$$renderer.push(` <div class="flex gap-2">`);
				push_element($$renderer, "div", 710, 14);
				$$renderer.select({
					"aria-label": "Remote storage HTTP write method",
					value: remoteMethodDraft,
					class: "h-9 w-24 px-2.5 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright shrink-0"
				}, ($$renderer) => {
					$$renderer.option({ value: "PUT" }, ($$renderer) => {
						push_element($$renderer, "option", 716, 18);
						$$renderer.push(`PUT`);
						pop_element();
					});
					$$renderer.option({ value: "POST" }, ($$renderer) => {
						push_element($$renderer, "option", 717, 18);
						$$renderer.push(`POST`);
						pop_element();
					});
				});
				$$renderer.push(` <input id="remote-http-url" type="url"${attr("value", remoteUrlDraft)} placeholder="https://storage-gateway.example.com/pheonikz-store.json" class="flex-1 min-w-0 h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
				push_element($$renderer, "input", 719, 16);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <div class="space-y-1 md:col-span-2">`);
				push_element($$renderer, "div", 729, 12);
				$$renderer.push(`<div class="flex items-center justify-between gap-2">`);
				push_element($$renderer, "div", 730, 14);
				$$renderer.push(`<label for="remote-http-token" class="block text-[10.5px] text-stone-300 uppercase">`);
				push_element($$renderer, "label", 731, 16);
				$$renderer.push(`Bearer Token (Optional, Write-Only)</label>`);
				pop_element();
				$$renderer.push(` `);
				if (store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.hasRemoteToken) {
					$$renderer.push(`<!--[0--><span class="text-[10px] text-emerald-400 font-bold">`);
					push_element($$renderer, "span", 735, 18);
					$$renderer.push(`SAVED</span>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
				pop_element();
				$$renderer.push(` <div class="flex items-center gap-1.5">`);
				push_element($$renderer, "div", 738, 14);
				$$renderer.push(`<input id="remote-http-token" type="password" autocomplete="off"${attr("value", remoteTokenDraft)}${attr("placeholder", store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.hasRemoteToken ? "•••••••••••••••• (leave blank to keep)" : "Optional Authorization: Bearer token...")} class="flex-1 min-w-0 h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
				push_element($$renderer, "input", 739, 16);
				pop_element();
				$$renderer.push(` `);
				if (store_get($$store_subs ??= {}, "$storageConfig", storageConfig)?.hasRemoteToken) {
					$$renderer.push(`<!--[0--><button type="button"${attr("disabled", savingStorage, true)} title="Clear saved Bearer token" aria-label="Clear saved Bearer token" class="w-9 h-9 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0">`);
					push_element($$renderer, "button", 750, 18);
					Trash_2($$renderer, { class: "w-3.5 h-3.5" });
					$$renderer.push(`<!----></button>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <label class="md:col-span-2 inline-flex items-center gap-2 font-prose text-xs text-stone-300 cursor-pointer">`);
				push_element($$renderer, "label", 764, 12);
				$$renderer.push(`<input type="checkbox"${attr("checked", autoSyncRemoteDraft, true)} class="accent-[#8fa85c] w-3.5 h-3.5 shrink-0"/>`);
				push_element($$renderer, "input", 765, 14);
				pop_element();
				$$renderer.push(` <span>`);
				push_element($$renderer, "span", 770, 14);
				$$renderer.push(`Auto-sync to external endpoint on every write (keeps local write-through cache)</span>`);
				pop_element();
				$$renderer.push(`</label>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="pt-2.5 border-t border-olive-drab/30 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">`);
			push_element($$renderer, "div", 776, 8);
			$$renderer.push(`<div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-prose text-xs text-stone-300">`);
			push_element($$renderer, "div", 777, 10);
			$$renderer.push(`<label class="inline-flex items-center gap-1.5 cursor-pointer">`);
			push_element($$renderer, "label", 778, 12);
			$$renderer.push(`<input type="checkbox"${attr("checked", migrateDataDraft, true)} class="accent-[#8fa85c] w-3.5 h-3.5"/>`);
			push_element($$renderer, "input", 779, 14);
			pop_element();
			$$renderer.push(` <span>`);
			push_element($$renderer, "span", 784, 14);
			$$renderer.push(`Migrate current data on save</span>`);
			pop_element();
			$$renderer.push(`</label>`);
			pop_element();
			$$renderer.push(` <label class="inline-flex items-center gap-1.5 cursor-pointer">`);
			push_element($$renderer, "label", 786, 12);
			$$renderer.push(`<input type="checkbox"${attr("checked", preferExistingDraft, true)} class="accent-[#8fa85c] w-3.5 h-3.5"/>`);
			push_element($$renderer, "input", 787, 14);
			pop_element();
			$$renderer.push(` <span>`);
			push_element($$renderer, "span", 792, 14);
			$$renderer.push(`Load existing store on target</span>`);
			pop_element();
			$$renderer.push(`</label>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="flex flex-wrap items-center gap-2">`);
			push_element($$renderer, "div", 796, 10);
			if (store_get($$store_subs ??= {}, "$storageConfig", storageConfig) && store_get($$store_subs ??= {}, "$storageConfig", storageConfig).mode !== "local") {
				$$renderer.push(`<!--[0--><button type="button"${attr("disabled", false, true)} class="flex-1 sm:flex-initial h-8 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] hover:border-olive-bright text-stone-200 hover:text-olive-bright text-[11px] font-bold uppercase inline-flex items-center justify-center gap-1.5 cursor-pointer">`);
				push_element($$renderer, "button", 798, 14);
				Upload($$renderer, { class: "w-3.5 h-3.5" });
				$$renderer.push(`<!----> <span>`);
				push_element($$renderer, "span", 805, 16);
				$$renderer.push(`${escape_html("Push Now")}</span>`);
				pop_element();
				$$renderer.push(`</button>`);
				pop_element();
				$$renderer.push(` <button type="button"${attr("disabled", false, true)} class="flex-1 sm:flex-initial h-8 px-3 rounded border border-[#005a63]/60 bg-[#091517] hover:border-cyber-cyan text-cyber-cyan text-[11px] font-bold uppercase inline-flex items-center justify-center gap-1.5 cursor-pointer">`);
				push_element($$renderer, "button", 807, 14);
				Download($$renderer, { class: "w-3.5 h-3.5" });
				$$renderer.push(`<!----> <span>`);
				push_element($$renderer, "span", 814, 16);
				$$renderer.push(`${escape_html("Pull")}</span>`);
				pop_element();
				$$renderer.push(`</button>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <button type="button"${attr("disabled", savingStorage, true)} class="w-full sm:w-auto h-9 px-4 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-50 border border-olive-bright/30 text-stone-100 text-xs font-bold tracking-wider uppercase cursor-pointer inline-flex items-center justify-center gap-1.5">`);
			push_element($$renderer, "button", 817, 12);
			$$renderer.push("<!--[-1-->");
			Save($$renderer, { class: "w-3.5 h-3.5 text-olive-bright" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 828, 16);
			$$renderer.push(`Apply Storage Target</span>`);
			pop_element();
			$$renderer.push(`<!--]--></button>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</section>`);
			pop_element();
			$$renderer.push(` <section class="rounded-lg border border-[#005a63]/55 bg-[#091517]/75 p-3.5 sm:p-5 space-y-4 relative">`);
			push_element($$renderer, "section", 836, 6);
			$$renderer.push(`<div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan opacity-45">`);
			push_element($$renderer, "div", 837, 8);
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">`);
			push_element($$renderer, "div", 841, 8);
			$$renderer.push(`<div>`);
			push_element($$renderer, "div", 842, 10);
			$$renderer.push(`<div class="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-cyber-cyan uppercase">`);
			push_element($$renderer, "div", 843, 12);
			Globe($$renderer, { class: "w-4 h-4 shrink-0" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 847, 14);
			$$renderer.push(`Web Search / Recon Configuration</span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <p class="font-prose text-[12.5px] sm:text-xs text-cyan-100/70 mt-1 leading-snug">`);
			push_element($$renderer, "p", 849, 12);
			$$renderer.push(`Choose the active search backend injected into Dispatch prompts and Live Comms.</p>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <button type="button"${attr("disabled", testingRecon, true)} class="w-full sm:w-auto h-8 inline-flex items-center justify-center gap-1.5 px-3.5 rounded border border-cyber-cyan/60 bg-[#061214] hover:bg-[#0d2226] disabled:opacity-50 text-[11px] font-bold text-cyber-cyan tracking-wider uppercase cursor-pointer shrink-0">`);
			push_element($$renderer, "button", 853, 10);
			$$renderer.push("<!--[-1-->");
			Radar($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 864, 14);
			$$renderer.push(`Test Connection</span>`);
			pop_element();
			$$renderer.push(`<!--]--></button>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="space-y-1.5">`);
			push_element($$renderer, "div", 899, 8);
			$$renderer.push(`<span class="block text-[10.5px] text-cyan-100/75 uppercase tracking-wider">`);
			push_element($$renderer, "span", 900, 10);
			$$renderer.push(`Active Recon Provider</span>`);
			pop_element();
			$$renderer.push(` <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">`);
			push_element($$renderer, "div", 903, 10);
			$$renderer.push(`<!--[-->`);
			const each_array_1 = ensure_array_like(SEARCH_PROVIDERS);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let sp = each_array_1[$$index_1];
				const active = store_get($$store_subs ??= {}, "$settings", settings).searchProvider === sp.id;
				$$renderer.push(`<button type="button"${attr_class(`text-left p-2.5 sm:p-3 rounded border transition-colors cursor-pointer ${active ? "border-cyber-cyan bg-[#0c2328] text-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.12)]" : "border-olive-drab/40 bg-[#10130d] text-stone-300 hover:border-olive-bright/60"}`)}>`);
				push_element($$renderer, "button", 906, 14);
				$$renderer.push(`<div class="flex items-center justify-between gap-2">`);
				push_element($$renderer, "div", 916, 16);
				$$renderer.push(`<span class="text-[11px] font-bold uppercase tracking-wide">`);
				push_element($$renderer, "span", 917, 18);
				$$renderer.push(`${escape_html(sp.label)}</span>`);
				pop_element();
				$$renderer.push(` `);
				if (active) {
					$$renderer.push(`<!--[0--><span class="w-2 h-2 rounded-full bg-cyber-cyan shrink-0">`);
					push_element($$renderer, "span", 919, 20);
					$$renderer.push(`</span>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
				pop_element();
				$$renderer.push(` <p class="font-prose text-[11.5px] text-stone-400 mt-1 leading-snug">`);
				push_element($$renderer, "p", 922, 16);
				$$renderer.push(`${escape_html(sp.detail)}</p>`);
				pop_element();
				$$renderer.push(`</button>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#005a63]/35">`);
			push_element($$renderer, "div", 929, 8);
			$$renderer.push(`<div class="space-y-1">`);
			push_element($$renderer, "div", 931, 10);
			$$renderer.push(`<label for="searxng-url" class="block text-[10.5px] text-stone-300 uppercase">`);
			push_element($$renderer, "label", 932, 12);
			$$renderer.push(`SEARXNG_BASE_URL (Self-Hosted)</label>`);
			pop_element();
			$$renderer.push(` <input id="searxng-url" type="url"${attr("value", searxngUrlDraft)} placeholder="http://localhost:8888" class="w-full h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-cyber-cyan"/>`);
			push_element($$renderer, "input", 935, 12);
			pop_element();
			$$renderer.push(` <span class="block font-prose text-[11px] text-stone-500">`);
			push_element($$renderer, "span", 942, 12);
			$$renderer.push(`Queries {SEARXNG_BASE_URL}/search?q={query}&amp;format=json server-side.</span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="space-y-1">`);
			push_element($$renderer, "div", 948, 10);
			$$renderer.push(`<label for="max-search-results" class="block text-[10.5px] text-stone-300 uppercase">`);
			push_element($$renderer, "label", 949, 12);
			$$renderer.push(`MAX_SEARCH_RESULTS (Default: 5)</label>`);
			pop_element();
			$$renderer.push(` <input id="max-search-results" type="number" min="1" max="20"${attr("value", maxSearchResultsDraft)} class="w-full h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-cyber-cyan"/>`);
			push_element($$renderer, "input", 952, 12);
			pop_element();
			$$renderer.push(` <span class="block font-prose text-[11px] text-stone-500">`);
			push_element($$renderer, "span", 960, 12);
			$$renderer.push(`Maximum sources injected into LLM context &amp; displayed as receipt chips (1–20).</span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="space-y-1 md:col-span-2">`);
			push_element($$renderer, "div", 966, 10);
			$$renderer.push(`<label for="custom-search-url" class="block text-[10.5px] text-stone-300 uppercase">`);
			push_element($$renderer, "label", 967, 12);
			$$renderer.push(`CUSTOM_SEARCH_URL &amp; HTTP Method</label>`);
			pop_element();
			$$renderer.push(` <div class="flex gap-2">`);
			push_element($$renderer, "div", 970, 12);
			$$renderer.select({
				"aria-label": "Custom search HTTP method",
				value: customSearchMethodDraft,
				class: "h-9 w-24 px-2.5 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-cyber-cyan shrink-0"
			}, ($$renderer) => {
				$$renderer.option({ value: "GET" }, ($$renderer) => {
					push_element($$renderer, "option", 976, 16);
					$$renderer.push(`GET`);
					pop_element();
				});
				$$renderer.option({ value: "POST" }, ($$renderer) => {
					push_element($$renderer, "option", 977, 16);
					$$renderer.push(`POST`);
					pop_element();
				});
			});
			$$renderer.push(` <input id="custom-search-url" type="url"${attr("value", customSearchUrlDraft)} placeholder="https://your-search-proxy.local/search?q={query} or POST JSON endpoint" class="flex-1 min-w-0 h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-cyber-cyan"/>`);
			push_element($$renderer, "input", 979, 14);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="rounded border border-olive-drab/40 bg-[#12140e] p-3 space-y-2">`);
			push_element($$renderer, "div", 990, 10);
			$$renderer.push(`<div class="flex items-center justify-between gap-2">`);
			push_element($$renderer, "div", 991, 12);
			$$renderer.push(`<span class="text-[11px] font-bold text-stone-200 uppercase">`);
			push_element($$renderer, "span", 992, 14);
			$$renderer.push(`BRAVE_API_KEY</span>`);
			pop_element();
			$$renderer.push(` <span${attr_class(`inline-flex items-center gap-1 text-[10px] font-bold ${braveStatus()?.configured ? "text-emerald-400" : "text-amber-400"}`)}>`);
			push_element($$renderer, "span", 993, 14);
			if (braveStatus()?.configured) {
				$$renderer.push("<!--[0-->");
				Circle_check($$renderer, { class: "w-3 h-3" });
				$$renderer.push(`<!----> <span>`);
				push_element($$renderer, "span", 1e3, 18);
				$$renderer.push(`${escape_html(braveStatus().source === "vault" ? "VAULT ACTIVE" : "ENV ACTIVE")}</span>`);
				pop_element();
			} else {
				$$renderer.push("<!--[-1-->");
				Circle_alert($$renderer, { class: "w-3 h-3" });
				$$renderer.push(`<!----> <span>`);
				push_element($$renderer, "span", 1003, 18);
				$$renderer.push(`UNSET</span>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="flex items-center gap-1.5">`);
			push_element($$renderer, "div", 1007, 12);
			$$renderer.push(`<input type="password" autocomplete="off"${attr("value", keyDrafts.brave)}${attr("placeholder", braveStatus()?.configured ? "•••••••••••••••• (replace key)" : "Paste Brave Search token...")} class="flex-1 min-w-0 h-8 px-2.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
			push_element($$renderer, "input", 1008, 14);
			pop_element();
			$$renderer.push(` <button type="button"${attr("disabled", !keyDrafts.brave.trim() || false, true)} class="h-8 px-2.5 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-[10.5px] font-bold border border-olive-bright/30 cursor-pointer shrink-0">`);
			push_element($$renderer, "button", 1017, 14);
			$$renderer.push(`SAVE</button>`);
			pop_element();
			$$renderer.push(` `);
			if (braveStatus()?.source === "vault") {
				$$renderer.push(`<!--[0--><button type="button"${attr("disabled", false, true)} aria-label="Clear Brave key" class="w-8 h-8 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0">`);
				push_element($$renderer, "button", 1026, 16);
				Trash_2($$renderer, { class: "w-3.5 h-3.5" });
				$$renderer.push(`<!----></button>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="rounded border border-olive-drab/40 bg-[#12140e] p-3 space-y-2">`);
			push_element($$renderer, "div", 1040, 10);
			$$renderer.push(`<div class="flex items-center justify-between gap-2">`);
			push_element($$renderer, "div", 1041, 12);
			$$renderer.push(`<span class="text-[11px] font-bold text-stone-200 uppercase">`);
			push_element($$renderer, "span", 1042, 14);
			$$renderer.push(`TAVILY_API_KEY</span>`);
			pop_element();
			$$renderer.push(` <span${attr_class(`inline-flex items-center gap-1 text-[10px] font-bold ${tavilyStatus()?.configured ? "text-emerald-400" : "text-amber-400"}`)}>`);
			push_element($$renderer, "span", 1043, 14);
			if (tavilyStatus()?.configured) {
				$$renderer.push("<!--[0-->");
				Circle_check($$renderer, { class: "w-3 h-3" });
				$$renderer.push(`<!----> <span>`);
				push_element($$renderer, "span", 1050, 18);
				$$renderer.push(`${escape_html(tavilyStatus().source === "vault" ? "VAULT ACTIVE" : "ENV ACTIVE")}</span>`);
				pop_element();
			} else {
				$$renderer.push("<!--[-1-->");
				Circle_alert($$renderer, { class: "w-3 h-3" });
				$$renderer.push(`<!----> <span>`);
				push_element($$renderer, "span", 1053, 18);
				$$renderer.push(`UNSET</span>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="flex items-center gap-1.5">`);
			push_element($$renderer, "div", 1057, 12);
			$$renderer.push(`<input type="password" autocomplete="off"${attr("value", keyDrafts.tavily)}${attr("placeholder", tavilyStatus()?.configured ? "•••••••••••••••• (replace key)" : "Paste Tavily API key (tvly-...)...")} class="flex-1 min-w-0 h-8 px-2.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
			push_element($$renderer, "input", 1058, 14);
			pop_element();
			$$renderer.push(` <button type="button"${attr("disabled", !keyDrafts.tavily.trim() || false, true)} class="h-8 px-2.5 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-[10.5px] font-bold border border-olive-bright/30 cursor-pointer shrink-0">`);
			push_element($$renderer, "button", 1067, 14);
			$$renderer.push(`SAVE</button>`);
			pop_element();
			$$renderer.push(` `);
			if (tavilyStatus()?.source === "vault") {
				$$renderer.push(`<!--[0--><button type="button"${attr("disabled", false, true)} aria-label="Clear Tavily key" class="w-8 h-8 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0">`);
				push_element($$renderer, "button", 1076, 16);
				Trash_2($$renderer, { class: "w-3.5 h-3.5" });
				$$renderer.push(`<!----></button>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="rounded border border-olive-drab/40 bg-[#12140e] p-3 space-y-2 md:col-span-2">`);
			push_element($$renderer, "div", 1090, 10);
			$$renderer.push(`<div class="flex items-center justify-between gap-2">`);
			push_element($$renderer, "div", 1091, 12);
			$$renderer.push(`<span class="text-[11px] font-bold text-stone-200 uppercase">`);
			push_element($$renderer, "span", 1092, 14);
			$$renderer.push(`CUSTOM_SEARCH_API_KEY (Bearer Token)</span>`);
			pop_element();
			$$renderer.push(` <span${attr_class(`inline-flex items-center gap-1 text-[10px] font-bold ${customSearchKeyStatus()?.configured ? "text-emerald-400" : "text-stone-400"}`)}>`);
			push_element($$renderer, "span", 1095, 14);
			if (customSearchKeyStatus()?.configured) {
				$$renderer.push("<!--[0-->");
				Circle_check($$renderer, { class: "w-3 h-3" });
				$$renderer.push(`<!----> <span>`);
				push_element($$renderer, "span", 1102, 18);
				$$renderer.push(`${escape_html(customSearchKeyStatus().source === "vault" ? "VAULT ACTIVE" : "ENV ACTIVE")}</span>`);
				pop_element();
			} else {
				$$renderer.push(`<!--[-1--><span>`);
				push_element($$renderer, "span", 1106, 18);
				$$renderer.push(`OPTIONAL</span>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="flex items-center gap-1.5">`);
			push_element($$renderer, "div", 1110, 12);
			$$renderer.push(`<input type="password" autocomplete="off"${attr("value", keyDrafts.custom_search)}${attr("placeholder", customSearchKeyStatus()?.configured ? "•••••••••••••••• (replace Bearer token)" : "Optional Bearer token for CUSTOM_SEARCH_URL...")} class="flex-1 min-w-0 h-8 px-2.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
			push_element($$renderer, "input", 1111, 14);
			pop_element();
			$$renderer.push(` <button type="button"${attr("disabled", !keyDrafts.custom_search.trim() || false, true)} class="h-8 px-2.5 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-[10.5px] font-bold border border-olive-bright/30 cursor-pointer shrink-0">`);
			push_element($$renderer, "button", 1120, 14);
			$$renderer.push(`SAVE</button>`);
			pop_element();
			$$renderer.push(` `);
			if (customSearchKeyStatus()?.source === "vault") {
				$$renderer.push(`<!--[0--><button type="button"${attr("disabled", false, true)} aria-label="Clear custom search key" class="w-8 h-8 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0">`);
				push_element($$renderer, "button", 1129, 16);
				Trash_2($$renderer, { class: "w-3.5 h-3.5" });
				$$renderer.push(`<!----></button>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="flex flex-col sm:flex-row sm:items-center justify-end gap-2 pt-1">`);
			push_element($$renderer, "div", 1143, 8);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <button type="button" class="w-full sm:w-auto h-9 px-4 rounded bg-[#3d462c] hover:bg-[#4c5836] border border-olive-bright/30 text-stone-100 text-xs font-bold tracking-wider uppercase cursor-pointer inline-flex items-center justify-center gap-1.5">`);
			push_element($$renderer, "button", 1149, 10);
			Save($$renderer, { class: "w-3.5 h-3.5 text-olive-bright" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 1155, 12);
			$$renderer.push(`Save Recon Config</span>`);
			pop_element();
			$$renderer.push(`</button>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</section>`);
			pop_element();
			$$renderer.push(` <section class="space-y-3">`);
			push_element($$renderer, "section", 1161, 6);
			$$renderer.push(`<div class="flex flex-wrap items-center justify-between gap-2">`);
			push_element($$renderer, "div", 1162, 8);
			$$renderer.push(`<div class="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-olive-bright uppercase">`);
			push_element($$renderer, "div", 1163, 10);
			Key_round($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 1167, 12);
			$$renderer.push(`Server-Side Credential Vault</span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(` <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">`);
			push_element($$renderer, "div", 1174, 8);
			if (geminiStatus()) {
				$$renderer.push(`<!--[0--><div class="rounded-lg border border-[#005a63]/50 bg-[#091517] p-3.5 space-y-1.5 relative">`);
				push_element($$renderer, "div", 1176, 12);
				$$renderer.push(`<div class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyber-cyan opacity-45">`);
				push_element($$renderer, "div", 1179, 14);
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <div class="flex items-center justify-between gap-2">`);
				push_element($$renderer, "div", 1182, 14);
				$$renderer.push(`<span class="text-xs font-bold text-cyber-cyan uppercase">`);
				push_element($$renderer, "span", 1183, 16);
				$$renderer.push(`${escape_html(geminiStatus().name)}</span>`);
				pop_element();
				$$renderer.push(` <span${attr_class(`inline-flex items-center gap-1 text-[10.5px] font-bold ${geminiStatus().configured ? "text-emerald-400" : "text-amber-400"}`)}>`);
				push_element($$renderer, "span", 1186, 16);
				if (geminiStatus().configured) {
					$$renderer.push("<!--[0-->");
					Circle_check($$renderer, { class: "w-3.5 h-3.5" });
					$$renderer.push(`<!----> <span>`);
					push_element($$renderer, "span", 1193, 20);
					$$renderer.push(`ENV ACTIVE</span>`);
					pop_element();
				} else {
					$$renderer.push("<!--[-1-->");
					Circle_alert($$renderer, { class: "w-3.5 h-3.5" });
					$$renderer.push(`<!----> <span>`);
					push_element($$renderer, "span", 1196, 20);
					$$renderer.push(`ENV UNSET</span>`);
					pop_element();
				}
				$$renderer.push(`<!--]--></span>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <p class="font-prose text-[12px] text-cyan-100/75 leading-snug">`);
				push_element($$renderer, "p", 1200, 14);
				$$renderer.push(`${escape_html(geminiStatus().note)}</p>`);
				pop_element();
				$$renderer.push(` <div class="text-[10px] text-cyber-cyan/60 pt-0.5">`);
				push_element($$renderer, "div", 1203, 14);
				$$renderer.push(`RUNTIME SECRET (${escape_html(geminiStatus().envVar)})</div>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <!--[-->`);
			const each_array_2 = ensure_array_like(EDITABLE_PROVIDERS);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let item = each_array_2[$$index_2];
				const info = store_get($$store_subs ??= {}, "$providers", providers).find((p) => p.id === item.id);
				const configured = info?.configured ?? false;
				const source = info?.source ?? "none";
				$$renderer.push(`<div class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 space-y-2">`);
				push_element($$renderer, "div", 1213, 12);
				$$renderer.push(`<div class="flex items-center justify-between gap-2">`);
				push_element($$renderer, "div", 1214, 14);
				$$renderer.push(`<span class="text-xs font-bold text-stone-200 uppercase">`);
				push_element($$renderer, "span", 1215, 16);
				$$renderer.push(`${escape_html(info?.name ?? item.id)}</span>`);
				pop_element();
				$$renderer.push(` <span${attr_class(`inline-flex items-center gap-1 text-[10.5px] font-bold ${configured ? "text-emerald-400" : item.id === "parallel" ? "text-cyber-cyan" : "text-amber-400"}`)}>`);
				push_element($$renderer, "span", 1218, 16);
				if (configured) {
					$$renderer.push("<!--[0-->");
					Circle_check($$renderer, { class: "w-3.5 h-3.5" });
					$$renderer.push(`<!----> <span>`);
					push_element($$renderer, "span", 1227, 20);
					$$renderer.push(`${escape_html(source === "vault" ? "VAULT ACTIVE" : "ENV ACTIVE")}</span>`);
					pop_element();
				} else if (item.id === "parallel") {
					$$renderer.push("<!--[1-->");
					Circle_check($$renderer, { class: "w-3.5 h-3.5" });
					$$renderer.push(`<!----> <span>`);
					push_element($$renderer, "span", 1230, 20);
					$$renderer.push(`ANONYMOUS</span>`);
					pop_element();
				} else {
					$$renderer.push("<!--[-1-->");
					Circle_alert($$renderer, { class: "w-3.5 h-3.5" });
					$$renderer.push(`<!----> <span>`);
					push_element($$renderer, "span", 1233, 20);
					$$renderer.push(`UNSET</span>`);
					pop_element();
				}
				$$renderer.push(`<!--]--></span>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <p class="font-prose text-[12px] text-stone-400 leading-snug">`);
				push_element($$renderer, "p", 1237, 14);
				$$renderer.push(`${escape_html(info?.note)}</p>`);
				pop_element();
				$$renderer.push(` <div class="flex items-center gap-1.5 pt-0.5">`);
				push_element($$renderer, "div", 1238, 14);
				$$renderer.push(`<input type="password" autocomplete="off"${attr("value", keyDrafts[item.id])}${attr("placeholder", configured ? "•••••••••••••••• (replace key)" : item.placeholder)} class="flex-1 min-w-0 h-8 px-2.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"/>`);
				push_element($$renderer, "input", 1239, 16);
				pop_element();
				$$renderer.push(` <button type="button"${attr("disabled", !keyDrafts[item.id].trim() || savingKeyId === item.id, true)} class="h-8 px-2.5 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-[10.5px] font-bold inline-flex items-center justify-center gap-1 border border-olive-bright/30 cursor-pointer shrink-0">`);
				push_element($$renderer, "button", 1248, 16);
				Save($$renderer, { class: "w-3 h-3 text-olive-bright" });
				$$renderer.push(`<!----> <span>`);
				push_element($$renderer, "span", 1255, 18);
				$$renderer.push(`SAVE</span>`);
				pop_element();
				$$renderer.push(`</button>`);
				pop_element();
				$$renderer.push(` `);
				if (source === "vault") {
					$$renderer.push(`<!--[0--><button type="button"${attr("disabled", savingKeyId === item.id, true)} title="Clear saved key from vault" aria-label="Clear saved key" class="w-8 h-8 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0">`);
					push_element($$renderer, "button", 1258, 18);
					Trash_2($$renderer, { class: "w-3.5 h-3.5" });
					$$renderer.push(`<!----></button>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(`</section>`);
			pop_element();
			$$renderer.push(` <section class="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-6">`);
			push_element($$renderer, "section", 1276, 6);
			$$renderer.push(`<div class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 sm:p-5 space-y-3.5">`);
			push_element($$renderer, "div", 1277, 8);
			$$renderer.push(`<h2 class="text-xs font-bold tracking-wider text-olive-bright uppercase">`);
			push_element($$renderer, "h2", 1278, 10);
			$$renderer.push(`Speech-to-Text (Dictation &amp; Call)</h2>`);
			pop_element();
			$$renderer.push(` <div class="space-y-1.5">`);
			push_element($$renderer, "div", 1282, 10);
			$$renderer.push(`<span class="block text-[10.5px] text-stone-400 uppercase">`);
			push_element($$renderer, "span", 1283, 12);
			$$renderer.push(`Active STT Engine</span>`);
			pop_element();
			$$renderer.push(` <div class="grid grid-cols-2 gap-2">`);
			push_element($$renderer, "div", 1284, 12);
			$$renderer.push(`<!--[-->`);
			const each_array_3 = ensure_array_like(["deepgram", "gemini"]);
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let id = each_array_3[$$index_3];
				$$renderer.push(`<button type="button"${attr_class(`h-9 px-2.5 rounded border text-[11px] font-bold transition-colors cursor-pointer ${store_get($$store_subs ??= {}, "$settings", settings).sttProvider === id ? "border-olive-bright bg-olive-drab/25 text-olive-bright" : "border-olive-drab/35 text-stone-400 hover:text-stone-200"}`)}>`);
				push_element($$renderer, "button", 1286, 16);
				$$renderer.push(`${escape_html(id === "deepgram" ? "DEEPGRAM NOVA" : "GEMINI TRANSCRIBE")}</button>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="space-y-1">`);
			push_element($$renderer, "div", 1299, 10);
			$$renderer.push(`<label for="dg-stt-model" class="block text-[10.5px] text-stone-400 uppercase">`);
			push_element($$renderer, "label", 1300, 12);
			$$renderer.push(`Deepgram Model</label>`);
			pop_element();
			$$renderer.push(` `);
			$$renderer.select({
				id: "dg-stt-model",
				value: store_get($$store_subs ??= {}, "$settings", settings).deepgramSttModel,
				onchange: (e) => void updateSettings({ deepgramSttModel: e.currentTarget.value }),
				class: "w-full h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright"
			}, ($$renderer) => {
				$$renderer.option({ value: "nova-2" }, ($$renderer) => {
					push_element($$renderer, "option", 1310, 14);
					$$renderer.push(`nova-2 (Balanced low-latency)`);
					pop_element();
				});
				$$renderer.option({ value: "nova-3" }, ($$renderer) => {
					push_element($$renderer, "option", 1311, 14);
					$$renderer.push(`nova-3 (High accuracy)`);
					pop_element();
				});
				$$renderer.option({ value: "enhanced" }, ($$renderer) => {
					push_element($$renderer, "option", 1312, 14);
					$$renderer.push(`enhanced`);
					pop_element();
				});
			});
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 sm:p-5 space-y-3.5">`);
			push_element($$renderer, "div", 1317, 8);
			$$renderer.push(`<div class="flex flex-wrap items-center justify-between gap-2">`);
			push_element($$renderer, "div", 1318, 10);
			$$renderer.push(`<h2 class="text-xs font-bold tracking-wider text-olive-bright uppercase">`);
			push_element($$renderer, "h2", 1319, 12);
			$$renderer.push(`Text-to-Speech (Reply &amp; Call)</h2>`);
			pop_element();
			$$renderer.push(` <button type="button"${attr("disabled", testingTts, true)} class="h-8 inline-flex items-center gap-1.5 px-2.5 rounded border border-[#005a63]/60 bg-[#091517] hover:border-cyber-cyan text-[10.5px] font-bold text-cyber-cyan cursor-pointer">`);
			push_element($$renderer, "button", 1322, 12);
			Volume_2($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 1329, 14);
			$$renderer.push(`${escape_html("TEST VOICE")}</span>`);
			pop_element();
			$$renderer.push(`</button>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="space-y-1.5">`);
			push_element($$renderer, "div", 1337, 10);
			$$renderer.push(`<span class="block text-[10.5px] text-stone-400 uppercase">`);
			push_element($$renderer, "span", 1338, 12);
			$$renderer.push(`Active TTS Engine</span>`);
			pop_element();
			$$renderer.push(` <div class="grid grid-cols-3 gap-1.5 sm:gap-2">`);
			push_element($$renderer, "div", 1339, 12);
			$$renderer.push(`<!--[-->`);
			const each_array_4 = ensure_array_like([
				"fishaudio",
				"deepgram",
				"gemini"
			]);
			for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
				let id = each_array_4[$$index_4];
				$$renderer.push(`<button type="button"${attr_class(`h-9 px-2 rounded border text-[10.5px] font-bold transition-colors cursor-pointer ${store_get($$store_subs ??= {}, "$settings", settings).ttsProvider === id ? "border-olive-bright bg-olive-drab/25 text-olive-bright" : "border-olive-drab/35 text-stone-400 hover:text-stone-200"}`)}>`);
				push_element($$renderer, "button", 1341, 16);
				$$renderer.push(`${escape_html(id === "fishaudio" ? "FISH AUDIO" : id === "deepgram" ? "DEEPGRAM" : "GEMINI TTS")}</button>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">`);
			push_element($$renderer, "div", 1358, 10);
			$$renderer.push(`<div class="space-y-1">`);
			push_element($$renderer, "div", 1359, 12);
			$$renderer.push(`<label for="gemini-voice" class="block text-[10.5px] text-stone-400 uppercase">`);
			push_element($$renderer, "label", 1360, 14);
			$$renderer.push(`Gemini Voice</label>`);
			pop_element();
			$$renderer.push(` `);
			$$renderer.select({
				id: "gemini-voice",
				value: store_get($$store_subs ??= {}, "$settings", settings).geminiVoice,
				onchange: (e) => void updateSettings({ geminiVoice: e.currentTarget.value }),
				class: "w-full h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200"
			}, ($$renderer) => {
				$$renderer.option({ value: "Zephyr" }, ($$renderer) => {
					push_element($$renderer, "option", 1369, 16);
					$$renderer.push(`Zephyr`);
					pop_element();
				});
				$$renderer.option({ value: "Kore" }, ($$renderer) => {
					push_element($$renderer, "option", 1370, 16);
					$$renderer.push(`Kore`);
					pop_element();
				});
				$$renderer.option({ value: "Puck" }, ($$renderer) => {
					push_element($$renderer, "option", 1371, 16);
					$$renderer.push(`Puck`);
					pop_element();
				});
				$$renderer.option({ value: "Charon" }, ($$renderer) => {
					push_element($$renderer, "option", 1372, 16);
					$$renderer.push(`Charon`);
					pop_element();
				});
				$$renderer.option({ value: "Fenrir" }, ($$renderer) => {
					push_element($$renderer, "option", 1373, 16);
					$$renderer.push(`Fenrir`);
					pop_element();
				});
			});
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="space-y-1">`);
			push_element($$renderer, "div", 1376, 12);
			$$renderer.push(`<label for="dg-tts-voice" class="block text-[10.5px] text-stone-400 uppercase">`);
			push_element($$renderer, "label", 1377, 14);
			$$renderer.push(`Deepgram Aura Voice</label>`);
			pop_element();
			$$renderer.push(` `);
			$$renderer.select({
				id: "dg-tts-voice",
				value: store_get($$store_subs ??= {}, "$settings", settings).deepgramTtsVoice,
				onchange: (e) => void updateSettings({ deepgramTtsVoice: e.currentTarget.value }),
				class: "w-full h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200"
			}, ($$renderer) => {
				$$renderer.option({ value: "aura-asteria-en" }, ($$renderer) => {
					push_element($$renderer, "option", 1387, 16);
					$$renderer.push(`aura-asteria-en`);
					pop_element();
				});
				$$renderer.option({ value: "aura-orion-en" }, ($$renderer) => {
					push_element($$renderer, "option", 1388, 16);
					$$renderer.push(`aura-orion-en`);
					pop_element();
				});
				$$renderer.option({ value: "aura-luna-en" }, ($$renderer) => {
					push_element($$renderer, "option", 1389, 16);
					$$renderer.push(`aura-luna-en`);
					pop_element();
				});
				$$renderer.option({ value: "aura-arcas-en" }, ($$renderer) => {
					push_element($$renderer, "option", 1390, 16);
					$$renderer.push(`aura-arcas-en`);
					pop_element();
				});
			});
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="space-y-1">`);
			push_element($$renderer, "div", 1395, 10);
			$$renderer.push(`<label for="fish-voice-id" class="block text-[10.5px] text-stone-400 uppercase">`);
			push_element($$renderer, "label", 1396, 12);
			$$renderer.push(`Fish Audio Reference Voice ID (Optional)</label>`);
			pop_element();
			$$renderer.push(` <input id="fish-voice-id" type="text"${attr("value", fishVoiceDraft)} placeholder="Blank for default or paste Fish Audio reference_id" class="w-full h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200"/>`);
			push_element($$renderer, "input", 1399, 12);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</section>`);
			pop_element();
			$$renderer.push(` <section class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 sm:p-5 space-y-3">`);
			push_element($$renderer, "section", 1411, 6);
			$$renderer.push(`<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">`);
			push_element($$renderer, "div", 1412, 8);
			$$renderer.push(`<div>`);
			push_element($$renderer, "div", 1413, 10);
			$$renderer.push(`<h2 class="text-xs font-bold tracking-wider text-olive-bright uppercase">`);
			push_element($$renderer, "h2", 1414, 12);
			$$renderer.push(`System Directive &amp; Consolidation</h2>`);
			pop_element();
			$$renderer.push(` <p class="font-prose text-[12px] text-stone-400 mt-0.5 leading-snug">`);
			push_element($$renderer, "p", 1417, 12);
			$$renderer.push(`Base persona injected alongside Mnemosyne OS context across all dispatches.</p>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <label class="inline-flex items-center gap-2 font-prose text-xs text-stone-300 cursor-pointer">`);
			push_element($$renderer, "label", 1421, 10);
			$$renderer.push(`<input type="checkbox"${attr("checked", store_get($$store_subs ??= {}, "$settings", settings).autoConsolidateMemory, true)} class="accent-[#8fa85c] w-3.5 h-3.5"/>`);
			push_element($$renderer, "input", 1422, 12);
			pop_element();
			$$renderer.push(` <span>`);
			push_element($$renderer, "span", 1431, 12);
			$$renderer.push(`Auto-consolidate memories</span>`);
			pop_element();
			$$renderer.push(`</label>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <textarea${attr("rows", 4)} class="w-full px-3 py-2 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright">`);
			push_element($$renderer, "textarea", 1434, 8);
			const $$body = escape_html(systemPromptDraft);
			if ($$body) $$renderer.push(`${$$body}`);
			$$renderer.push(`</textarea>`);
			pop_element();
			$$renderer.push(` <div class="flex flex-col sm:flex-row sm:items-center justify-end gap-2">`);
			push_element($$renderer, "div", 1439, 8);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <button type="button" class="w-full sm:w-auto h-9 px-4 rounded bg-[#3d462c] hover:bg-[#4c5836] border border-olive-bright/30 text-stone-100 text-xs font-bold tracking-wider cursor-pointer uppercase">`);
			push_element($$renderer, "button", 1443, 10);
			$$renderer.push(`Save Directives</button>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</section>`);
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