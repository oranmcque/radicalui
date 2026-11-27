export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	app_dir: "_app",
	app_path: "_app",
	assets: new Set([]),
	mime_types: {},
	client: {start:"_app/immutable/entry/start.C1_Kd6zf.js",app:"_app/immutable/entry/app.7xAsFwtl.js",imports:["_app/immutable/entry/start.C1_Kd6zf.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/DclECHGd.js","_app/immutable/chunks/BJBCsAuX.js","_app/immutable/chunks/bP7hdenn.js","_app/immutable/chunks/BA18qEi1.js","_app/immutable/chunks/BgoTQiMm.js","_app/immutable/entry/app.7xAsFwtl.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
	
	nodes: [
		__memo(() => import('./nodes/0.js')),
		__memo(() => import('./nodes/1.js')),
		__memo(() => import('./nodes/2.js')),
		__memo(() => import('./nodes/3.js')),
		__memo(() => import('./nodes/4.js')),
		__memo(() => import('./nodes/5.js')),
		__memo(() => import('./nodes/6.js'))
	],
	remotes: {
		
	},
	routes: [
		{
			id: "/",
			pattern: /^\/$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 2 },
			endpoint: null
		},
		{
			id: "/live",
			pattern: /^\/live\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 3 },
			endpoint: null
		},
		{
			id: "/mnemosyne",
			pattern: /^\/mnemosyne\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 4 },
			endpoint: null
		},
		{
			id: "/search",
			pattern: /^\/search\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 5 },
			endpoint: null
		},
		{
			id: "/vault",
			pattern: /^\/vault\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 6 },
			endpoint: null
		}
	],
	prerendered_routes: new Set([]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
