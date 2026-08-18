import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
//#region src/pages/api/v1/[...path].ts
var ____path__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PATCH: () => PATCH,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
async function proxy(request) {
	const backendUrl = "https://lcebackend-production.up.railway.app";
	const url = new URL(request.url);
	const target = new URL(`${url.pathname}${url.search}`, backendUrl);
	const headers = new Headers();
	for (const [key, value] of request.headers) {
		const lower = key.toLowerCase();
		if (lower === "host" || lower === "origin" || lower === "referer") continue;
		headers.append(key, value);
	}
	headers.set("host", new URL(backendUrl).host);
	let backendResponse;
	try {
		backendResponse = await fetch(target, {
			method: request.method,
			headers,
			body: request.body,
			redirect: "manual",
			duplex: "half"
		});
	} catch {
		return new Response(JSON.stringify({
			status: "error",
			message: "Backend no disponible"
		}), {
			status: 503,
			headers: { "content-type": "application/json" }
		});
	}
	const responseHeaders = new Headers();
	backendResponse.headers.forEach((value, key) => {
		const lower = key.toLowerCase();
		if (lower === "content-encoding" || lower === "content-length") return;
		responseHeaders.append(key, value);
	});
	const setCookies = backendResponse.headers.getSetCookie?.() ?? [];
	for (const cookie of setCookies) responseHeaders.append("set-cookie", cookie);
	return new Response(backendResponse.body, {
		status: backendResponse.status,
		statusText: backendResponse.statusText,
		headers: responseHeaders
	});
}
var GET = ({ request }) => proxy(request);
var POST = ({ request }) => proxy(request);
var PUT = ({ request }) => proxy(request);
var PATCH = ({ request }) => proxy(request);
var DELETE = ({ request }) => proxy(request);
//#endregion
//#region \0virtual:astro:page:src/pages/api/v1/[...path]@_@ts
var page = () => ____path__exports;
//#endregion
export { page };
