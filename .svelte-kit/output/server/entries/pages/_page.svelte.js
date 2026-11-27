import { A as FILENAME, d as spread_props, f as store_get, g as push_element, h as pop_element, i as derived, k as escape_html, l as sanitize_props, m as unsubscribe_stores, o as ensure_array_like, p as stringify, t as attr_class, u as slot, v as html, w as attr, x as prevent_snippet_stringification } from "../../chunks/server.js";
import { t as Brain } from "../../chunks/brain.js";
import { t as Chevron_down } from "../../chunks/chevron-down.js";
import { a as isStreaming, f as settings, m as streamingMessage, t as activeThread, v as Icon } from "../../chunks/workspace.js";
import { n as External_link, t as File_text } from "../../chunks/file-text.js";
import { t as Globe } from "../../chunks/globe.js";
import { t as Radio } from "../../chunks/radio.js";
import { t as Send_horizontal } from "../../chunks/send-horizontal.js";
import { t as X } from "../../chunks/x.js";
import { marked } from "marked";
import DOMPurify from "dompurify";
// node_modules/lucide-svelte/dist/icons/chevron-right.svelte
Chevron_right[FILENAME] = "node_modules/lucide-svelte/dist/icons/chevron-right.svelte";
function Chevron_right($$renderer, $$props) {
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
			{ name: "chevron-right" },
			$$sanitized_props,
			{
				/**
				* @component @name ChevronRight
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtOSAxOCA2LTYtNi02IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/chevron-right
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [["path", { "d": "m9 18 6-6-6-6" }]],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Chevron_right);
}
Chevron_right.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/image.svelte
Image[FILENAME] = "node_modules/lucide-svelte/dist/icons/image.svelte";
function Image($$renderer, $$props) {
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
			{ name: "image" },
			$$sanitized_props,
			{
				/**
				* @component @name Image
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIgLz4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMiIgLz4KICA8cGF0aCBkPSJtMjEgMTUtMy4wODYtMy4wODZhMiAyIDAgMCAwLTIuODI4IDBMNiAyMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/image
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
						"rx": "2",
						"ry": "2"
					}],
					["circle", {
						"cx": "9",
						"cy": "9",
						"r": "2"
					}],
					["path", { "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
				],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Image);
}
Image.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/mic.svelte
Mic[FILENAME] = "node_modules/lucide-svelte/dist/icons/mic.svelte";
function Mic($$renderer, $$props) {
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
			{ name: "mic" },
			$$sanitized_props,
			{
				/**
				* @component @name Mic
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMTl2MyIgLz4KICA8cGF0aCBkPSJNMTkgMTB2MmE3IDcgMCAwIDEtMTQgMHYtMiIgLz4KICA8cmVjdCB4PSI5IiB5PSIyIiB3aWR0aD0iNiIgaGVpZ2h0PSIxMyIgcng9IjMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/mic
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M12 19v3" }],
					["path", { "d": "M19 10v2a7 7 0 0 1-14 0v-2" }],
					["rect", {
						"x": "9",
						"y": "2",
						"width": "6",
						"height": "13",
						"rx": "3"
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
	}, Mic);
}
Mic.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/paperclip.svelte
Paperclip[FILENAME] = "node_modules/lucide-svelte/dist/icons/paperclip.svelte";
function Paperclip($$renderer, $$props) {
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
			{ name: "paperclip" },
			$$sanitized_props,
			{
				/**
				* @component @name Paperclip
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTYgNi04LjQxNCA4LjU4NmEyIDIgMCAwIDAgMi44MjkgMi44MjlsOC40MTQtOC41ODZhNCA0IDAgMSAwLTUuNjU3LTUuNjU3bC04LjM3OSA4LjU1MWE2IDYgMCAxIDAgOC40ODUgOC40ODVsOC4zNzktOC41NTEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/paperclip
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [["path", { "d": "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" }]],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Paperclip);
}
Paperclip.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/square.svelte
Square[FILENAME] = "node_modules/lucide-svelte/dist/icons/square.svelte";
function Square($$renderer, $$props) {
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
			{ name: "square" },
			$$sanitized_props,
			{
				/**
				* @component @name Square
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/square
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [["rect", {
					"width": "18",
					"height": "18",
					"x": "3",
					"y": "3",
					"rx": "2"
				}]],
				children: prevent_snippet_stringification(($$renderer) => {
					$$renderer.push(`<!--[-->`);
					slot($$renderer, $$props, "default", {}, null);
					$$renderer.push(`<!--]-->`);
				}),
				$$slots: { default: true }
			}
		]));
	}, Square);
}
Square.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/lucide-svelte/dist/icons/volume-x.svelte
Volume_x[FILENAME] = "node_modules/lucide-svelte/dist/icons/volume-x.svelte";
function Volume_x($$renderer, $$props) {
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
			{ name: "volume-x" },
			$$sanitized_props,
			{
				/**
				* @component @name VolumeX
				* @description Lucide SVG icon component, renders SVG Element with children.
				*
				* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTEgNC43MDJhLjcwNS43MDUgMCAwIDAtMS4yMDMtLjQ5OEw2LjQxMyA3LjU4N0ExLjQgMS40IDAgMCAxIDUuNDE2IDhIM2ExIDEgMCAwIDAtMSAxdjZhMSAxIDAgMCAwIDEgMWgyLjQxNmExLjQgMS40IDAgMCAxIC45OTcuNDEzbDMuMzgzIDMuMzg0QS43MDUuNzA1IDAgMCAwIDExIDE5LjI5OHoiIC8+CiAgPGxpbmUgeDE9IjIyIiB4Mj0iMTYiIHkxPSI5IiB5Mj0iMTUiIC8+CiAgPGxpbmUgeDE9IjE2IiB4Mj0iMjIiIHkxPSI5IiB5Mj0iMTUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/volume-x
				* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
				*
				* @param {Object} props - Lucide icons props and any valid SVG attribute
				* @returns {FunctionalComponent} Svelte component
				*
				*/
				iconNode: [
					["path", { "d": "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" }],
					["line", {
						"x1": "22",
						"x2": "16",
						"y1": "9",
						"y2": "15"
					}],
					["line", {
						"x1": "16",
						"x2": "22",
						"y1": "9",
						"y2": "15"
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
	}, Volume_x);
}
Volume_x.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// src/lib/components/MarkdownRenderer.svelte
MarkdownRenderer[FILENAME] = "src/lib/components/MarkdownRenderer.svelte";
function MarkdownRenderer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { content } = $$props;
		let html$1 = derived(() => {
			const raw = marked.parse(content || "", {
				gfm: true,
				breaks: true
			});
			return DOMPurify.sanitize(raw);
		});
		$$renderer.push(`<div class="chat-markdown text-cyan-100 break-words svelte-1fegv8i">`);
		push_element($$renderer, "div", 17, 0);
		$$renderer.push(`${html(html$1())}</div>`);
		pop_element();
	}, MarkdownRenderer);
}
MarkdownRenderer.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// src/routes/+page.svelte
_page[FILENAME] = "src/routes/+page.svelte";
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const STARTER_PROMPTS = [
			{
				title: "MODULAR WEB RECON",
				prompt: "Search the web for the latest AI engineering breakthroughs and model releases this week, with source citations."
			},
			{
				title: "MNEMOSYNE MEMORY SYNC",
				prompt: "Review active directives in Mnemosyne OS and propose a modular architecture for a self-hosted voice terminal."
			},
			{
				title: "MULTIMODAL RECON",
				prompt: "Attach a system diagram, screenshot, or source file for a line-by-line tactical code and security audit."
			}
		];
		const SEARCH_PROVIDER_LABELS = {
			"gemini-native": "GEMINI NATIVE",
			searxng: "SEARXNG",
			brave: "BRAVE",
			tavily: "TAVILY",
			custom: "CUSTOM",
			parallel: "PARALLEL"
		};
		let input = "";
		let attachments = [];
		let playingMessageId = null;
		let copiedId = null;
		let expandedRecalls = {};
		let expandedWebSources = {};
		let expandedReasoning = {};
		let messages = derived(() => store_get($$store_subs ??= {}, "$activeThread", activeThread)?.messages ?? []);
		let activeReconLabel = derived(() => store_get($$store_subs ??= {}, "$settings", settings) ? SEARCH_PROVIDER_LABELS[store_get($$store_subs ??= {}, "$settings", settings).searchProvider ?? "gemini-native"] ?? "GEMINI NATIVE" : "OFF");
		function safeExternalUrl(raw) {
			try {
				const parsed = new URL(raw);
				return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : null;
			} catch {
				return null;
			}
		}
		function extractHostLabel(raw) {
			try {
				return new URL(raw).hostname.replace(/^www\./, "");
			} catch {
				return "source";
			}
		}
		function formatProviderBadge(p) {
			if (!p) return "WEB RECON";
			return SEARCH_PROVIDER_LABELS[p] ?? p.toUpperCase().replace(/-/g, " ");
		}
		if (store_get($$store_subs ??= {}, "$settings", settings)) {
			$$renderer.push(`<!--[0--><main class="flex-1 flex flex-col min-h-0 bg-[#0a0b08] relative font-mono">`);
			push_element($$renderer, "main", 317, 2);
			$$renderer.push(`<div class="absolute inset-0 pointer-events-none crt-scanlines opacity-15 z-0">`);
			push_element($$renderer, "div", 325, 4);
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="flex-1 overflow-y-auto px-2.5 sm:px-6 py-3 sm:py-6 relative z-10">`);
			push_element($$renderer, "div", 328, 4);
			$$renderer.push(`<div class="max-w-4xl mx-auto space-y-3.5 sm:space-y-6">`);
			push_element($$renderer, "div", 329, 6);
			if (messages().length === 0 && !store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage)) {
				$$renderer.push(`<!--[0--><div class="py-2 sm:py-12 space-y-3.5 sm:space-y-7">`);
				push_element($$renderer, "div", 331, 10);
				$$renderer.push(`<div class="bg-[#091517] border border-[#005a63]/50 rounded-lg p-3.5 sm:p-6 relative shadow-[inset_0_0_20px_rgba(0,240,255,0.03)]">`);
				push_element($$renderer, "div", 332, 12);
				$$renderer.push(`<div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan opacity-45">`);
				push_element($$renderer, "div", 335, 14);
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <div class="text-[10px] tracking-wide sm:tracking-widest text-cyber-cyan/75 uppercase mb-1.5">`);
				push_element($$renderer, "div", 338, 14);
				$$renderer.push(`Pheonikz UI · Mnemosyne OS + Recon (${escape_html(activeReconLabel())})</div>`);
				pop_element();
				$$renderer.push(` <h1 class="text-base sm:text-2xl font-bold tracking-tight sm:tracking-wide text-cyber-cyan leading-snug">`);
				push_element($$renderer, "h1", 341, 14);
				$$renderer.push(`Self-hosted multimodal dispatch, web recon &amp; memory.</h1>`);
				pop_element();
				$$renderer.push(` <p class="font-prose text-[13px] sm:text-sm text-cyan-100/75 mt-1.5 leading-relaxed max-w-2xl">`);
				push_element($$renderer, "p", 344, 14);
				$$renderer.push(`Switch seamlessly across Gemini, NanoGPT, DeepSeek, or OpenAI with live search
                grounding, persistent Mnemosyne memory, and real-time voice comms.</p>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
				$$renderer.push(` <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4">`);
				push_element($$renderer, "div", 350, 12);
				$$renderer.push(`<!--[-->`);
				const each_array = ensure_array_like(STARTER_PROMPTS);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let item = each_array[$$index];
					$$renderer.push(`<button type="button" class="text-left p-3 sm:p-4 rounded-lg border border-olive-drab/45 bg-[#12140e] hover:border-olive-bright/70 hover:bg-[#171a12] transition-colors cursor-pointer flex flex-col justify-between gap-1.5">`);
					push_element($$renderer, "button", 352, 16);
					$$renderer.push(`<span class="text-[10.5px] font-bold tracking-wider text-olive-bright uppercase">`);
					push_element($$renderer, "span", 360, 18);
					$$renderer.push(`${escape_html(item.title)}</span>`);
					pop_element();
					$$renderer.push(` <span class="font-prose text-[12.5px] sm:text-xs text-stone-400 leading-snug">`);
					push_element($$renderer, "span", 363, 18);
					$$renderer.push(`${escape_html(item.prompt)}</span>`);
					pop_element();
					$$renderer.push(`</button>`);
					pop_element();
				}
				$$renderer.push(`<!--]--></div>`);
				pop_element();
				$$renderer.push(`</div>`);
				pop_element();
			} else {
				$$renderer.push(`<!--[-1--><!--[-->`);
				const each_array_1 = ensure_array_like(messages());
				for (let idx = 0, $$length = each_array_1.length; idx < $$length; idx++) {
					let msg = each_array_1[idx];
					const isUser = msg.role === "user";
					const recalledCount = (msg.recalled?.memories.length ?? 0) + (msg.recalled?.vaultChunks.length ?? 0);
					const webCount = msg.webSources?.length ?? 0;
					const consolidatedCount = msg.consolidatedMemories?.length ?? 0;
					const recallOpen = expandedRecalls[msg.id] ?? false;
					const webOpen = expandedWebSources[msg.id] ?? false;
					const reasonOpen = expandedReasoning[msg.id] ?? false;
					const isLastAssistant = !isUser && idx === messages().length - 1;
					$$renderer.push(`<div${attr_class(`flex flex-col space-y-1 ${isUser ? "items-end" : "items-start"}`)}>`);
					push_element($$renderer, "div", 382, 12);
					$$renderer.push(`<span class="text-[10px] tracking-wide sm:tracking-widest text-stone-500 uppercase px-1">`);
					push_element($$renderer, "span", 383, 14);
					$$renderer.push(`${escape_html(isUser ? "Operator" : `Dispatch · ${msg.model || store_get($$store_subs ??= {}, "$settings", settings).activeModel}`)}</span>`);
					pop_element();
					$$renderer.push(` `);
					if (isUser) {
						$$renderer.push(`<!--[0--><div class="max-w-[92%] sm:max-w-2xl bg-olive-drab/15 border border-olive-drab/45 text-stone-200 rounded-lg px-3 py-2 sm:p-3.5 font-prose text-[14.5px] sm:text-sm leading-relaxed whitespace-pre-wrap break-words">`);
						push_element($$renderer, "div", 388, 16);
						if (msg.attachments && msg.attachments.length > 0) {
							$$renderer.push(`<!--[0--><div class="flex flex-wrap gap-1.5 mb-2">`);
							push_element($$renderer, "div", 392, 20);
							$$renderer.push(`<!--[-->`);
							const each_array_2 = ensure_array_like(msg.attachments);
							for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
								let att = each_array_2[$$index_1];
								$$renderer.push(`<div class="rounded overflow-hidden border border-olive-drab/50 bg-[#0d0e0a]">`);
								push_element($$renderer, "div", 394, 24);
								if (att.previewUrl || att.mimeType.startsWith("image/") && att.dataBase64) {
									$$renderer.push(`<!--[0--><img${attr("src", att.previewUrl || `data:${att.mimeType};base64,${att.dataBase64}`)}${attr("alt", att.name)} referrerpolicy="no-referrer" class="max-h-44 max-w-full sm:max-w-[240px] object-cover"/>`);
									push_element($$renderer, "img", 396, 28);
									pop_element();
								} else {
									$$renderer.push(`<!--[-1--><div class="px-2 py-1 text-[11px] font-mono flex items-center gap-1.5 text-olive-bright">`);
									push_element($$renderer, "div", 403, 28);
									File_text($$renderer, { class: "w-3 h-3" });
									$$renderer.push(`<!----> <span class="truncate max-w-[150px]">`);
									push_element($$renderer, "span", 405, 30);
									$$renderer.push(`${escape_html(att.name)}</span>`);
									pop_element();
									$$renderer.push(`</div>`);
									pop_element();
								}
								$$renderer.push(`<!--]--></div>`);
								pop_element();
							}
							$$renderer.push(`<!--]--></div>`);
							pop_element();
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--> <div>`);
						push_element($$renderer, "div", 412, 18);
						$$renderer.push(`${escape_html(msg.content)}</div>`);
						pop_element();
						$$renderer.push(`</div>`);
						pop_element();
					} else {
						$$renderer.push(`<!--[-1--><div class="max-w-full sm:max-w-3xl w-full bg-[#091517] border border-[#005a63]/50 rounded-lg p-3 sm:p-5 relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,240,255,0.03),0_0_15px_rgba(0,240,255,0.02)]">`);
						push_element($$renderer, "div", 415, 16);
						$$renderer.push(`<div class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyber-cyan opacity-45">`);
						push_element($$renderer, "div", 418, 18);
						$$renderer.push(`</div>`);
						pop_element();
						$$renderer.push(` `);
						if (recalledCount > 0 || consolidatedCount > 0) {
							$$renderer.push(`<!--[0--><div class="flex flex-wrap items-center gap-2.5 mb-2.5 text-[10.5px]">`);
							push_element($$renderer, "div", 423, 20);
							if (recalledCount > 0) {
								$$renderer.push(`<!--[0--><button type="button" class="h-6 inline-flex items-center gap-1 text-cyber-cyan/80 hover:text-cyber-cyan cursor-pointer">`);
								push_element($$renderer, "button", 425, 24);
								Brain($$renderer, { class: "w-3 h-3" });
								$$renderer.push(`<!----> <span>`);
								push_element($$renderer, "span", 432, 26);
								$$renderer.push(`MNEMOSYNE (${escape_html(recalledCount)})</span>`);
								pop_element();
								$$renderer.push(` `);
								if (recallOpen) {
									$$renderer.push("<!--[0-->");
									Chevron_down($$renderer, { class: "w-3 h-3" });
								} else {
									$$renderer.push("<!--[-1-->");
									Chevron_right($$renderer, { class: "w-3 h-3" });
								}
								$$renderer.push(`<!--]--></button>`);
								pop_element();
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--> `);
							if (consolidatedCount > 0) {
								$$renderer.push(`<!--[0--><span class="text-olive-bright">`);
								push_element($$renderer, "span", 441, 24);
								$$renderer.push(`+${escape_html(consolidatedCount)} SAVED</span>`);
								pop_element();
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--></div>`);
							pop_element();
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--> `);
						if (recallOpen && msg.recalled) {
							$$renderer.push(`<!--[0--><div class="mb-2.5 rounded border border-[#005a63]/50 bg-[#060f11] p-2.5 font-prose text-xs space-y-1.5">`);
							push_element($$renderer, "div", 449, 20);
							$$renderer.push(`<!--[-->`);
							const each_array_3 = ensure_array_like(msg.recalled.memories);
							for (let $$index_2 = 0, $$length = each_array_3.length; $$index_2 < $$length; $$index_2++) {
								let m = each_array_3[$$index_2];
								$$renderer.push(`<div class="text-cyan-100/80">`);
								push_element($$renderer, "div", 451, 24);
								$$renderer.push(`<span class="font-mono text-[10px] text-olive-bright uppercase mr-1.5">`);
								push_element($$renderer, "span", 452, 26);
								$$renderer.push(`[${escape_html(m.tier)}]</span>`);
								pop_element();
								$$renderer.push(` <span>`);
								push_element($$renderer, "span", 453, 26);
								$$renderer.push(`${escape_html(m.content)}</span>`);
								pop_element();
								$$renderer.push(`</div>`);
								pop_element();
							}
							$$renderer.push(`<!--]--> <!--[-->`);
							const each_array_4 = ensure_array_like(msg.recalled.vaultChunks);
							for (let $$index_3 = 0, $$length = each_array_4.length; $$index_3 < $$length; $$index_3++) {
								let c = each_array_4[$$index_3];
								$$renderer.push(`<div class="text-cyan-200/65">`);
								push_element($$renderer, "div", 457, 24);
								$$renderer.push(`<span class="font-mono text-[10px] text-cyber-cyan mr-1.5">`);
								push_element($$renderer, "span", 458, 26);
								$$renderer.push(`[${escape_html(c.docTitle)} #${escape_html(c.index + 1)}]</span>`);
								pop_element();
								$$renderer.push(` <span class="line-clamp-2">`);
								push_element($$renderer, "span", 459, 26);
								$$renderer.push(`${escape_html(c.text)}</span>`);
								pop_element();
								$$renderer.push(`</div>`);
								pop_element();
							}
							$$renderer.push(`<!--]--></div>`);
							pop_element();
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--> `);
						if (msg.reasoning) {
							$$renderer.push(`<!--[0--><div class="mb-2.5 rounded border border-[#005a63]/40 bg-[#060e10]">`);
							push_element($$renderer, "div", 466, 20);
							$$renderer.push(`<button type="button" class="w-full h-8 px-2.5 flex items-center justify-between text-[10.5px] text-cyber-cyan/75 cursor-pointer">`);
							push_element($$renderer, "button", 467, 22);
							$$renderer.push(`<span>`);
							push_element($$renderer, "span", 473, 24);
							$$renderer.push(`REASONING TRACE</span>`);
							pop_element();
							$$renderer.push(` `);
							if (reasonOpen) {
								$$renderer.push("<!--[0-->");
								Chevron_down($$renderer, { class: "w-3.5 h-3.5" });
							} else {
								$$renderer.push("<!--[-1-->");
								Chevron_right($$renderer, { class: "w-3.5 h-3.5" });
							}
							$$renderer.push(`<!--]--></button>`);
							pop_element();
							$$renderer.push(` `);
							if (reasonOpen) {
								$$renderer.push(`<!--[0--><div class="px-2.5 pb-2.5 pt-2 border-t border-[#005a63]/30 font-prose text-xs text-cyan-200/75 whitespace-pre-wrap leading-relaxed">`);
								push_element($$renderer, "div", 481, 24);
								$$renderer.push(`${escape_html(msg.reasoning)}</div>`);
								pop_element();
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--></div>`);
							pop_element();
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--> `);
						MarkdownRenderer($$renderer, { content: msg.content });
						$$renderer.push(`<!----> `);
						if (webCount > 0 && msg.webSources) {
							$$renderer.push(`<!--[0--><div class="mt-3 pt-2.5 border-t border-[#005a63]/30 space-y-1.5">`);
							push_element($$renderer, "div", 494, 20);
							$$renderer.push(`<button type="button" class="h-6 inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-wide text-cyber-cyan/90 hover:text-cyber-cyan cursor-pointer uppercase">`);
							push_element($$renderer, "button", 495, 22);
							Globe($$renderer, { class: "w-3 h-3" });
							$$renderer.push(`<!----> <span>`);
							push_element($$renderer, "span", 502, 24);
							$$renderer.push(`SOURCES (${escape_html(webCount)}) · ${escape_html(formatProviderBadge(msg.webSearchProvider || msg.webSources[0]?.provider))}</span>`);
							pop_element();
							$$renderer.push(` `);
							if (webOpen) {
								$$renderer.push("<!--[0-->");
								Chevron_down($$renderer, { class: "w-3 h-3" });
							} else {
								$$renderer.push("<!--[-1-->");
								Chevron_right($$renderer, { class: "w-3 h-3" });
							}
							$$renderer.push(`<!--]--></button>`);
							pop_element();
							$$renderer.push(` <div class="flex flex-wrap gap-1">`);
							push_element($$renderer, "div", 515, 22);
							$$renderer.push(`<!--[-->`);
							const each_array_5 = ensure_array_like(msg.webSources);
							for (let sIdx = 0, $$length = each_array_5.length; sIdx < $$length; sIdx++) {
								let src = each_array_5[sIdx];
								const href = safeExternalUrl(src.url);
								if (href) {
									$$renderer.push(`<!--[0--><a${attr("href", href)} target="_blank" rel="noopener noreferrer"${attr("title", src.title)} class="inline-flex items-center gap-1 max-w-[180px] sm:max-w-[230px] px-2 py-0.5 rounded border border-[#005a63]/60 bg-[#061114] hover:border-cyber-cyan text-[10px] text-cyan-100/90 hover:text-cyber-cyan transition-colors">`);
									push_element($$renderer, "a", 519, 28);
									$$renderer.push(`<span class="text-olive-bright font-bold shrink-0">`);
									push_element($$renderer, "span", 526, 30);
									$$renderer.push(`[${escape_html(sIdx + 1)}]</span>`);
									pop_element();
									$$renderer.push(` <span class="truncate">`);
									push_element($$renderer, "span", 527, 30);
									$$renderer.push(`${escape_html(extractHostLabel(src.url))}</span>`);
									pop_element();
									$$renderer.push(` `);
									External_link($$renderer, { class: "w-2.5 h-2.5 shrink-0 opacity-70" });
									$$renderer.push(`<!----></a>`);
									pop_element();
								} else $$renderer.push("<!--[-1-->");
								$$renderer.push(`<!--]-->`);
							}
							$$renderer.push(`<!--]--></div>`);
							pop_element();
							$$renderer.push(` `);
							if (webOpen) {
								$$renderer.push(`<!--[0--><div class="rounded border border-[#005a63]/55 bg-[#060f11] p-2.5 text-xs space-y-2">`);
								push_element($$renderer, "div", 536, 24);
								$$renderer.push(`<!--[-->`);
								const each_array_6 = ensure_array_like(msg.webSources);
								for (let sIdx = 0, $$length = each_array_6.length; sIdx < $$length; sIdx++) {
									let src = each_array_6[sIdx];
									const href = safeExternalUrl(src.url);
									$$renderer.push(`<div class="border-b border-[#005a63]/25 last:border-b-0 pb-2 last:pb-0">`);
									push_element($$renderer, "div", 539, 28);
									$$renderer.push(`<div class="flex items-start justify-between gap-2">`);
									push_element($$renderer, "div", 540, 30);
									if (href) {
										$$renderer.push(`<!--[0--><a${attr("href", href)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 font-prose font-semibold text-xs text-cyber-cyan hover:underline break-words">`);
										push_element($$renderer, "a", 542, 34);
										$$renderer.push(`<span class="font-mono text-[10.5px] text-olive-bright">`);
										push_element($$renderer, "span", 548, 36);
										$$renderer.push(`[${escape_html(sIdx + 1)}]</span>`);
										pop_element();
										$$renderer.push(` <span>`);
										push_element($$renderer, "span", 549, 36);
										$$renderer.push(`${escape_html(src.title)}</span>`);
										pop_element();
										$$renderer.push(` `);
										External_link($$renderer, { class: "w-3 h-3 shrink-0" });
										$$renderer.push(`<!----></a>`);
										pop_element();
									} else {
										$$renderer.push(`<!--[-1--><div class="font-prose font-semibold text-xs text-cyber-cyan">`);
										push_element($$renderer, "div", 553, 34);
										$$renderer.push(`[${escape_html(sIdx + 1)}] ${escape_html(src.title)}</div>`);
										pop_element();
									}
									$$renderer.push(`<!--]--> `);
									if (src.publishDate) {
										$$renderer.push(`<!--[0--><span class="text-[10px] text-stone-500 tabular-nums shrink-0">`);
										push_element($$renderer, "span", 558, 34);
										$$renderer.push(`${escape_html(src.publishDate)}</span>`);
										pop_element();
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--></div>`);
									pop_element();
									$$renderer.push(` `);
									if (src.excerpt) {
										$$renderer.push(`<!--[0--><p class="font-prose text-[11.5px] text-cyan-100/70 line-clamp-2 mt-1 leading-snug">`);
										push_element($$renderer, "p", 564, 32);
										$$renderer.push(`${escape_html(src.excerpt)}</p>`);
										pop_element();
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--></div>`);
									pop_element();
								}
								$$renderer.push(`<!--]--></div>`);
								pop_element();
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--></div>`);
							pop_element();
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--> <div class="mt-3 pt-2 border-t border-[#005a63]/25 flex items-center justify-between gap-2 text-[10px] text-cyber-cyan/55">`);
						push_element($$renderer, "div", 575, 18);
						$$renderer.push(`<span class="uppercase tracking-wide truncate min-w-0">`);
						push_element($$renderer, "span", 578, 20);
						$$renderer.push(`${escape_html(msg.provider || store_get($$store_subs ??= {}, "$settings", settings).activeProvider)} // ${escape_html(msg.model || store_get($$store_subs ??= {}, "$settings", settings).activeModel)}</span>`);
						pop_element();
						$$renderer.push(` <div class="flex items-center gap-1 shrink-0">`);
						push_element($$renderer, "div", 581, 20);
						$$renderer.push(`<button type="button"${attr_class(`h-7 px-2 rounded hover:text-cyber-cyan hover:bg-[#005a63]/20 transition-colors cursor-pointer uppercase ${playingMessageId === msg.id ? "text-cyber-cyan font-bold" : ""}`)}>`);
						push_element($$renderer, "button", 582, 22);
						$$renderer.push(`${escape_html(playingMessageId === msg.id ? "STOP" : "SPEAK")}</button>`);
						pop_element();
						$$renderer.push(` <button type="button" class="h-7 px-2 rounded hover:text-cyber-cyan hover:bg-[#005a63]/20 transition-colors cursor-pointer uppercase">`);
						push_element($$renderer, "button", 591, 22);
						$$renderer.push(`${escape_html(copiedId === msg.id ? "COPIED" : "COPY")}</button>`);
						pop_element();
						$$renderer.push(` `);
						if (isLastAssistant && !store_get($$store_subs ??= {}, "$isStreaming", isStreaming)) {
							$$renderer.push(`<!--[0--><button type="button" class="h-7 px-2 rounded hover:text-cyber-cyan hover:bg-[#005a63]/20 transition-colors cursor-pointer uppercase">`);
							push_element($$renderer, "button", 599, 24);
							$$renderer.push(`REGEN</button>`);
							pop_element();
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--></div>`);
						pop_element();
						$$renderer.push(`</div>`);
						pop_element();
						$$renderer.push(`</div>`);
						pop_element();
					}
					$$renderer.push(`<!--]--></div>`);
					pop_element();
				}
				$$renderer.push(`<!--]--> `);
				if (store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage)) {
					$$renderer.push(`<!--[0--><div class="flex flex-col space-y-1 items-start">`);
					push_element($$renderer, "div", 615, 12);
					$$renderer.push(`<span class="text-[10px] tracking-wide sm:tracking-widest text-cyber-cyan/70 uppercase px-1">`);
					push_element($$renderer, "span", 616, 14);
					$$renderer.push(`Dispatch · Streaming (${escape_html(store_get($$store_subs ??= {}, "$settings", settings).activeModel)})</span>`);
					pop_element();
					$$renderer.push(` <div class="max-w-full sm:max-w-3xl w-full bg-[#091517] border border-[#005a63]/60 rounded-lg p-3 sm:p-5 relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,240,255,0.04)]">`);
					push_element($$renderer, "div", 619, 14);
					$$renderer.push(`<div class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyber-cyan opacity-60">`);
					push_element($$renderer, "div", 622, 16);
					$$renderer.push(`</div>`);
					pop_element();
					$$renderer.push(` <div class="flex flex-wrap items-center gap-2.5 mb-2 text-[10.5px] text-cyber-cyan/80">`);
					push_element($$renderer, "div", 625, 16);
					if (store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).webSearching) {
						$$renderer.push(`<!--[0--><span class="inline-flex items-center gap-1.5 text-cyber-cyan animate-pulse">`);
						push_element($$renderer, "span", 627, 20);
						Globe($$renderer, { class: "w-3 h-3" });
						$$renderer.push(`<!----> <span>`);
						push_element($$renderer, "span", 629, 22);
						$$renderer.push(`RECON VIA ${escape_html(formatProviderBadge(store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).webSearchProvider))}...</span>`);
						pop_element();
						$$renderer.push(`</span>`);
						pop_element();
					} else if (store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).webSources && store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).webSources.length > 0) {
						$$renderer.push(`<!--[1--><span class="inline-flex items-center gap-1.5 text-cyber-cyan">`);
						push_element($$renderer, "span", 634, 20);
						Globe($$renderer, { class: "w-3 h-3" });
						$$renderer.push(`<!----> <span>`);
						push_element($$renderer, "span", 636, 22);
						$$renderer.push(`RECON (${escape_html(store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).webSources.length)}) · ${escape_html(formatProviderBadge(store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).webSearchProvider))}</span>`);
						pop_element();
						$$renderer.push(`</span>`);
						pop_element();
					} else if (store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).webSearchError) {
						$$renderer.push(`<!--[2--><span class="inline-flex items-center gap-1.5 text-amber-400">`);
						push_element($$renderer, "span", 643, 20);
						Globe($$renderer, { class: "w-3 h-3" });
						$$renderer.push(`<!----> <span>`);
						push_element($$renderer, "span", 645, 22);
						$$renderer.push(`RECON SKIPPED: ${escape_html(store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).webSearchError)}</span>`);
						pop_element();
						$$renderer.push(`</span>`);
						pop_element();
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> `);
					if (store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).recalled && store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).recalled.memories.length + store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).recalled.vaultChunks.length > 0) {
						$$renderer.push(`<!--[0--><span class="inline-flex items-center gap-1">`);
						push_element($$renderer, "span", 649, 20);
						Brain($$renderer, { class: "w-3 h-3" });
						$$renderer.push(`<!----> <span>`);
						push_element($$renderer, "span", 651, 22);
						$$renderer.push(`MNEMOSYNE (${escape_html(store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).recalled.memories.length + store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).recalled.vaultChunks.length)})</span>`);
						pop_element();
						$$renderer.push(`</span>`);
						pop_element();
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div>`);
					pop_element();
					$$renderer.push(` `);
					if (store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).reasoning) {
						$$renderer.push(`<!--[0--><div class="mb-2.5 rounded border border-[#005a63]/40 bg-[#060e10] p-2.5 font-prose text-xs text-cyan-200/75 whitespace-pre-wrap">`);
						push_element($$renderer, "div", 659, 18);
						$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).reasoning)}</div>`);
						pop_element();
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> `);
					MarkdownRenderer($$renderer, { content: store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).content || (store_get($$store_subs ??= {}, "$streamingMessage", streamingMessage).webSearching ? "Acquiring live web intelligence..." : "Awaiting stream packets...") });
					$$renderer.push(`<!----></div>`);
					pop_element();
					$$renderer.push(`</div>`);
					pop_element();
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--> <div>`);
			push_element($$renderer, "div", 675, 8);
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="max-w-4xl mx-auto w-full px-2 sm:px-6 pb-1.5 sm:pb-3 pt-1 relative z-10">`);
			push_element($$renderer, "div", 697, 4);
			$$renderer.push(`<form class="relative bg-[#141710] border border-olive-drab/55 focus-within:border-olive-bright rounded-lg transition-all shadow-[0_0_15px_rgba(76,88,54,0.1)] overflow-hidden">`);
			push_element($$renderer, "form", 698, 6);
			if (attachments.length > 0) {
				$$renderer.push(`<!--[0--><div class="flex flex-wrap gap-1.5 px-2.5 pt-2">`);
				push_element($$renderer, "div", 706, 10);
				$$renderer.push(`<!--[-->`);
				const each_array_7 = ensure_array_like(attachments);
				for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
					let att = each_array_7[$$index_7];
					$$renderer.push(`<div class="flex items-center gap-1.5 px-2 py-0.5 rounded border border-olive-drab/50 bg-[#0d0e0a] text-[11px]">`);
					push_element($$renderer, "div", 708, 14);
					if (att.previewUrl) {
						$$renderer.push("<!--[0-->");
						Image($$renderer, { class: "w-3 h-3 text-cyber-cyan shrink-0" });
					} else {
						$$renderer.push("<!--[-1-->");
						File_text($$renderer, { class: "w-3 h-3 text-olive-bright shrink-0" });
					}
					$$renderer.push(`<!--]--> <span class="truncate max-w-[130px] text-stone-300 font-prose">`);
					push_element($$renderer, "span", 716, 16);
					$$renderer.push(`${escape_html(att.name)}</span>`);
					pop_element();
					$$renderer.push(` <button type="button" aria-label="Remove attachment" class="w-5 h-5 flex items-center justify-center text-stone-500 hover:text-red-400 cursor-pointer">`);
					push_element($$renderer, "button", 717, 16);
					X($$renderer, { class: "w-3 h-3" });
					$$renderer.push(`<!----></button>`);
					pop_element();
					$$renderer.push(`</div>`);
					pop_element();
				}
				$$renderer.push(`<!--]--></div>`);
				pop_element();
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <textarea${attr("rows", 2)}${attr("placeholder", store_get($$store_subs ??= {}, "$settings", settings).useWebSearchInChat ? `Message Pheonikz (Recon: ${activeReconLabel()})...` : "Message Pheonikz...")} class="block w-full bg-transparent border-0 outline-none focus:ring-0 px-3 pt-2 pb-1.5 min-h-[54px] max-h-[168px] text-[15px] sm:text-sm leading-snug text-stone-100 placeholder:text-stone-500 font-prose resize-none">`);
			push_element($$renderer, "textarea", 731, 8);
			const $$body = escape_html(input);
			if ($$body) $$renderer.push(`${$$body}`);
			$$renderer.push(`</textarea>`);
			pop_element();
			$$renderer.push(` <div class="flex items-center justify-between gap-1.5 px-1.5 sm:px-2 py-1 border-t border-olive-drab/25 bg-[#10130d]/70">`);
			push_element($$renderer, "div", 751, 8);
			$$renderer.push(`<div class="flex items-center gap-0.5 sm:gap-1 min-w-0">`);
			push_element($$renderer, "div", 754, 10);
			$$renderer.push(`<input type="file" multiple="" accept="image/*,audio/*,application/pdf,.txt,.md,.json,.csv,.ts,.tsx,.js,.py,.svelte" class="hidden"/>`);
			push_element($$renderer, "input", 755, 12);
			pop_element();
			$$renderer.push(` <button type="button" class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-stone-400 hover:text-olive-bright hover:bg-olive-drab/15 rounded transition-colors cursor-pointer shrink-0" title="Attach Files" aria-label="Attach files">`);
			push_element($$renderer, "button", 767, 12);
			Paperclip($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!----></button>`);
			pop_element();
			$$renderer.push(` <button type="button"${attr_class(`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded transition-colors cursor-pointer shrink-0 text-stone-400 hover:text-olive-bright hover:bg-olive-drab/15`)}${attr("title", `Voice Dictation (${stringify(store_get($$store_subs ??= {}, "$settings", settings).sttProvider)})`)} aria-label="Toggle voice dictation">`);
			push_element($$renderer, "button", 776, 12);
			$$renderer.push("<!--[-1-->");
			Mic($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!--]--></button>`);
			pop_element();
			$$renderer.push(` <button type="button"${attr("title", `Toggle Web Recon (${stringify(activeReconLabel())})`)} aria-label="Toggle Web Recon"${attr("aria-pressed", store_get($$store_subs ??= {}, "$settings", settings).useWebSearchInChat)}${attr_class(`h-7 px-2 flex items-center gap-1 rounded border text-[10px] font-bold tracking-wide uppercase transition-colors cursor-pointer shrink-0 ${store_get($$store_subs ??= {}, "$settings", settings).useWebSearchInChat ? "border-cyber-cyan/55 text-cyber-cyan bg-[#091517]" : "border-olive-drab/35 text-stone-500 hover:text-stone-300 bg-transparent"}`)}>`);
			push_element($$renderer, "button", 791, 12);
			$$renderer.push(`<span${attr_class(`w-1.5 h-1.5 rounded-full ${store_get($$store_subs ??= {}, "$settings", settings).useWebSearchInChat ? "bg-cyber-cyan animate-pulse" : "bg-stone-600"}`)}>`);
			push_element($$renderer, "span", 802, 14);
			$$renderer.push(`</span>`);
			pop_element();
			$$renderer.push(` `);
			Globe($$renderer, { class: "w-3 h-3" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 808, 14);
			$$renderer.push(`RECON</span>`);
			pop_element();
			$$renderer.push(`</button>`);
			pop_element();
			$$renderer.push(` <button type="button" title="Toggle Mnemosyne OS memory" aria-label="Toggle Mnemosyne OS memory"${attr_class(`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded transition-colors cursor-pointer shrink-0 ${store_get($$store_subs ??= {}, "$settings", settings).useMnemosyneInChat ? "text-olive-bright bg-olive-drab/20" : "text-stone-500 hover:text-stone-300"}`)}>`);
			push_element($$renderer, "button", 810, 12);
			Brain($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!----></button>`);
			pop_element();
			$$renderer.push(` <button type="button" title="Auto-Speak Replies" aria-label="Toggle auto-speak replies"${attr_class(`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded transition-colors cursor-pointer shrink-0 text-stone-500 hover:text-stone-300`)}>`);
			push_element($$renderer, "button", 822, 12);
			$$renderer.push("<!--[-1-->");
			Volume_x($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!--]--></button>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(` <div class="flex items-center gap-1.5 shrink-0">`);
			push_element($$renderer, "div", 839, 10);
			$$renderer.push(`<a href="/live" title="Open Live Voice Comms" class="hidden sm:inline-flex items-center gap-1 h-7 px-2.5 rounded border border-[#005a63]/50 bg-[#091517] hover:border-cyber-cyan/70 text-cyber-cyan text-[10px] font-bold tracking-wider">`);
			push_element($$renderer, "a", 840, 12);
			Radio($$renderer, { class: "w-3 h-3" });
			$$renderer.push(`<!----> <span>`);
			push_element($$renderer, "span", 846, 14);
			$$renderer.push(`COMMS</span>`);
			pop_element();
			$$renderer.push(`</a>`);
			pop_element();
			$$renderer.push(` `);
			if (store_get($$store_subs ??= {}, "$isStreaming", isStreaming)) {
				$$renderer.push(`<!--[0--><button type="button" class="h-7 sm:h-8 bg-red-900/50 hover:bg-red-800/70 text-red-200 px-2.5 sm:px-3.5 rounded text-[10.5px] font-bold tracking-wider flex items-center gap-1 border border-red-500/40 cursor-pointer">`);
				push_element($$renderer, "button", 850, 14);
				Square($$renderer, { class: "w-3 h-3" });
				$$renderer.push(`<!----> <span>`);
				push_element($$renderer, "span", 856, 16);
				$$renderer.push(`ABORT</span>`);
				pop_element();
				$$renderer.push(`</button>`);
				pop_element();
			} else {
				$$renderer.push(`<!--[-1--><button type="submit"${attr("disabled", (input.trim(), attachments.length === 0), true)} class="h-7 sm:h-8 bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 px-2.5 sm:px-3.5 rounded text-[10.5px] font-bold tracking-wider flex items-center gap-1.5 border border-olive-bright/35 transition-all cursor-pointer">`);
				push_element($$renderer, "button", 859, 14);
				$$renderer.push(`<span>`);
				push_element($$renderer, "span", 864, 16);
				$$renderer.push(`SEND</span>`);
				pop_element();
				$$renderer.push(` `);
				Send_horizontal($$renderer, { class: "w-3 h-3 text-olive-bright" });
				$$renderer.push(`<!----></button>`);
				pop_element();
			}
			$$renderer.push(`<!--]--></div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</form>`);
			pop_element();
			$$renderer.push(` <div class="flex items-center justify-between gap-2 text-[9.5px] sm:text-[10px] text-stone-500 px-1 mt-1 font-mono tracking-wide uppercase">`);
			push_element($$renderer, "div", 872, 6);
			$$renderer.push(`<span class="hidden sm:inline">`);
			push_element($$renderer, "span", 875, 8);
			$$renderer.push(`STT: ${escape_html(store_get($$store_subs ??= {}, "$settings", settings).sttProvider)} · TTS: ${escape_html(store_get($$store_subs ??= {}, "$settings", settings).ttsProvider)}</span>`);
			pop_element();
			$$renderer.push(` <div class="flex items-center gap-2 ml-auto sm:ml-0">`);
			push_element($$renderer, "div", 878, 8);
			$$renderer.push(`<a href="/vault"${attr_class(`hover:underline ${store_get($$store_subs ??= {}, "$settings", settings).useWebSearchInChat ? "text-cyber-cyan font-semibold" : "text-stone-500"}`)}>`);
			push_element($$renderer, "a", 879, 10);
			$$renderer.push(`RECON: ${escape_html(store_get($$store_subs ??= {}, "$settings", settings).useWebSearchInChat ? activeReconLabel() : "OFF")}</a>`);
			pop_element();
			$$renderer.push(` <span class="text-stone-700">`);
			push_element($$renderer, "span", 887, 10);
			$$renderer.push(`·</span>`);
			pop_element();
			$$renderer.push(` <span>`);
			push_element($$renderer, "span", 888, 10);
			$$renderer.push(`MEM: ${escape_html(store_get($$store_subs ??= {}, "$settings", settings).useMnemosyneInChat ? "ON" : "OFF")}</span>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</div>`);
			pop_element();
			$$renderer.push(`</main>`);
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