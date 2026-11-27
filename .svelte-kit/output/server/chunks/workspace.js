import { A as FILENAME, C as subscribe_to_store, D as noop, E as fallback, O as run_all, S as validate_dynamic_element_tag, T as clsx, a as element, c as rest_props, g as push_element, h as pop_element, l as sanitize_props, n as attributes, o as ensure_array_like, r as bind_props, u as slot } from "./server.js";
// node_modules/svelte/src/internal/client/reactivity/equality.js
/**
* @param {unknown} a
* @param {unknown} b
* @returns {boolean}
*/
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
// node_modules/lucide-svelte/dist/defaultAttributes.js
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
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
// node_modules/lucide-svelte/dist/utils/hasA11yProp.js
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
/**
* Check if a component has an accessibility prop
*
* @param {object} props
* @returns {boolean} Whether the component has an accessibility prop
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
// node_modules/lucide-svelte/dist/utils/mergeClasses.js
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
/**
* Merges classes into a single string
*
* @param {array} classes
* @returns {string} A string of classes
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
// node_modules/lucide-svelte/dist/Icon.svelte
Icon[FILENAME] = "node_modules/lucide-svelte/dist/Icon.svelte";
function Icon($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	const $$restProps = rest_props($$sanitized_props, [
		"name",
		"color",
		"size",
		"strokeWidth",
		"absoluteStrokeWidth",
		"iconNode"
	]);
	$$renderer.component(($$renderer) => {
		let name = fallback($$props["name"], void 0);
		let color = fallback($$props["color"], "currentColor");
		let size = fallback($$props["size"], 24);
		let strokeWidth = fallback($$props["strokeWidth"], 2);
		let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
		let iconNode = fallback($$props["iconNode"], () => [], true);
		$$renderer.push(`<svg${attributes({
			...defaultAttributes,
			...!hasA11yProp($$restProps) ? { "aria-hidden": "true" } : void 0,
			...$$restProps,
			width: size,
			height: size,
			stroke: color,
			"stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
			class: clsx(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class))
		}, void 0, void 0, void 0, 3)}>`);
		push_element($$renderer, "svg", 12, 0);
		$$renderer.push(`<!--[-->`);
		const each_array = ensure_array_like(iconNode);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let [tag, attrs] = each_array[$$index];
			validate_dynamic_element_tag(() => tag);
			push_element($$renderer, tag, 34, 4);
			element($$renderer, tag, () => {
				$$renderer.push(`${attributes({ ...attrs }, void 0, void 0, void 0, 3)}`);
			});
			pop_element();
		}
		$$renderer.push(`<!--]--><!--[-->`);
		slot($$renderer, $$props, "default", {}, null);
		$$renderer.push(`<!--]--></svg>`);
		pop_element();
		bind_props($$props, {
			name,
			color,
			size,
			strokeWidth,
			absoluteStrokeWidth,
			iconNode
		});
	}, Icon);
}
Icon.render = function() {
	throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
// node_modules/svelte/src/store/shared/index.js
/** @import { Readable, StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from '../public.js' */
/** @import { Stores, StoresValues, SubscribeInvalidateTuple } from '../private.js' */
/**
* @type {Array<SubscribeInvalidateTuple<any> | any>}
*/
var subscriber_queue = [];
/**
* Creates a `Readable` store that allows reading by subscription.
*
* @template T
* @param {T} [value] initial value
* @param {StartStopNotifier<T>} [start]
* @returns {Readable<T>}
*/
function readable(value, start) {
	return { subscribe: writable(value, start).subscribe };
}
/**
* Create a `Writable` store that allows both updating and reading by subscription.
*
* @template T
* @param {T} [value] initial value
* @param {StartStopNotifier<T>} [start]
* @returns {Writable<T>}
*/
function writable(value, start = noop) {
	/** @type {Unsubscriber | null} */
	let stop = null;
	/** @type {Set<SubscribeInvalidateTuple<T>>} */
	const subscribers = /* @__PURE__ */ new Set();
	/**
	* @param {T} new_value
	* @returns {void}
	*/
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) subscriber_queue[i][0](subscriber_queue[i + 1]);
					subscriber_queue.length = 0;
				}
			}
		}
	}
	/**
	* @param {Updater<T>} fn
	* @returns {void}
	*/
	function update(fn) {
		set(fn(value));
	}
	/**
	* @param {Subscriber<T>} run
	* @param {() => void} [invalidate]
	* @returns {Unsubscriber}
	*/
	function subscribe(run, invalidate = noop) {
		/** @type {SubscribeInvalidateTuple<T>} */
		const subscriber = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) stop = start(set, update) || noop;
		run(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return {
		set,
		update,
		subscribe
	};
}
/**
* Derived value store by synchronizing one or more readable stores and
* applying an aggregation function over its input values.
*
* @template {Stores} S
* @template T
* @overload
* @param {S} stores
* @param {(values: StoresValues<S>, set: (value: T) => void, update: (fn: Updater<T>) => void) => Unsubscriber | void} fn
* @param {T} [initial_value]
* @returns {Readable<T>}
*/
/**
* Derived value store by synchronizing one or more readable stores and
* applying an aggregation function over its input values.
*
* @template {Stores} S
* @template T
* @overload
* @param {S} stores
* @param {(values: StoresValues<S>) => T} fn
* @param {T} [initial_value]
* @returns {Readable<T>}
*/
/**
* @template {Stores} S
* @template T
* @param {S} stores
* @param {Function} fn
* @param {T} [initial_value]
* @returns {Readable<T>}
*/
function derived(stores, fn, initial_value) {
	const single = !Array.isArray(stores);
	/** @type {Array<Readable<any>>} */
	const stores_array = single ? [stores] : stores;
	if (!stores_array.every(Boolean)) throw new Error("derived() expects stores as input, got a falsy value");
	const auto = fn.length < 2;
	return readable(initial_value, (set, update) => {
		let started = false;
		/** @type {T[]} */
		const values = [];
		let pending = 0;
		let cleanup = noop;
		const sync = () => {
			if (pending) return;
			cleanup();
			const result = fn(single ? values[0] : values, set, update);
			if (auto) set(result);
			else cleanup = typeof result === "function" ? result : noop;
		};
		const unsubscribers = stores_array.map((store, i) => subscribe_to_store(store, (value) => {
			values[i] = value;
			pending &= ~(1 << i);
			if (started) sync();
		}, () => {
			pending |= 1 << i;
		}));
		started = true;
		sync();
		return function stop() {
			run_all(unsubscribers);
			cleanup();
			started = false;
		};
	});
}
/**
* Get the current value from a store by subscribing and immediately unsubscribing.
*
* @template T
* @param {Readable<T>} store
* @returns {T}
*/
function get(store) {
	let value;
	subscribe_to_store(store, (_) => value = _)();
	return value;
}
// src/lib/stores/workspace.ts
var threads = writable([]);
var activeThreadId = writable(null);
var memories = writable([]);
var vaultDocs = writable([]);
var settings = writable(null);
var storageConfig = writable(null);
var providers = writable([]);
var models = writable([]);
var serverOnline = writable(true);
var isStreaming = writable(false);
var streamingMessage = writable(null);
var activeThread = derived([threads, activeThreadId], ([$threads, $activeThreadId]) => $threads.find((t) => t.id === $activeThreadId) ?? null);
async function refreshWorkspace() {
	try {
		const [stateRes, provRes, storageRes] = await Promise.all([
			fetch("/api/state"),
			fetch("/api/providers/status"),
			fetch("/api/storage/config")
		]);
		if (stateRes.ok) {
			const stateData = await stateRes.json();
			threads.set(stateData.threads);
			memories.set(stateData.memories);
			vaultDocs.set(stateData.vaultDocs);
			settings.set(stateData.settings);
			const currentId = get(activeThreadId);
			if (currentId && stateData.threads.some((t) => t.id === currentId)) activeThreadId.set(currentId);
			else activeThreadId.set(stateData.threads[0]?.id ?? null);
		}
		if (provRes.ok) {
			const provData = await provRes.json();
			providers.set(provData.providers);
			models.set(provData.models);
		}
		if (storageRes.ok) {
			const stData = await storageRes.json();
			storageConfig.set(stData);
		}
		serverOnline.set(stateRes.ok && provRes.ok);
	} catch {
		serverOnline.set(false);
	}
}
async function updateSettings(updates) {
	settings.update((prev) => prev ? {
		...prev,
		...updates
	} : prev);
	const res = await fetch("/api/settings", {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updates)
	});
	if (res.ok) {
		const saved = await res.json();
		settings.set(saved);
	}
}
async function selectModel(provider, modelId) {
	await updateSettings({
		activeProvider: provider,
		activeModel: modelId
	});
	const tid = get(activeThreadId);
	if (tid) {
		await fetch(`/api/threads/${tid}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				provider,
				model: modelId
			})
		});
		threads.update((prev) => prev.map((t) => t.id === tid ? {
			...t,
			provider,
			model: modelId
		} : t));
	}
}
async function createNewThread() {
	const s = get(settings);
	const provider = s?.activeProvider || "gemini";
	const model = s?.activeModel || "gemini-4-hydrogen";
	const res = await fetch("/api/threads", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			provider,
			model
		})
	});
	if (!res.ok) return null;
	const created = await res.json();
	threads.update((prev) => [created, ...prev]);
	activeThreadId.set(created.id);
	return created;
}
async function deleteThreadById(id) {
	await fetch(`/api/threads/${id}`, { method: "DELETE" });
	const currentActive = get(activeThreadId);
	threads.update((prev) => {
		const remaining = prev.filter((t) => t.id !== id);
		if (currentActive === id) activeThreadId.set(remaining[0]?.id ?? null);
		return remaining;
	});
}
export { vaultDocs as _, isStreaming as a, providers as c, serverOnline as d, settings as f, updateSettings as g, threads as h, deleteThreadById as i, refreshWorkspace as l, streamingMessage as m, activeThreadId as n, memories as o, storageConfig as p, createNewThread as r, models as s, activeThread as t, selectModel as u, Icon as v };

//# sourceMappingURL=workspace.js.map