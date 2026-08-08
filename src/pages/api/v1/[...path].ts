import type { APIRoute } from "astro";

export const prerender = false;

async function proxy(request: Request) {
	const backendUrl = import.meta.env.PUBLIC_API_DOMAIN || "http://localhost:8080";
	const url = new URL(request.url);
	const target = new URL(`${url.pathname}${url.search}`, backendUrl);

	const headers = new Headers();
	for (const [key, value] of request.headers) {
		const lower = key.toLowerCase();
		if (lower === "host" || lower === "origin" || lower === "referer") continue;
		headers.append(key, value);
	}
	headers.set("host", new URL(backendUrl).host);

	const backendResponse = await fetch(target, {
		method: request.method,
		headers,
		body: request.body,
		redirect: "manual",
		// @ts-expect-error streaming body support
		duplex: "half",
	});

	const responseHeaders = new Headers();
	backendResponse.headers.forEach((value, key) => {
		const lower = key.toLowerCase();
		if (lower === "content-encoding" || lower === "content-length") return;
		responseHeaders.append(key, value);
	});

	const setCookies = backendResponse.headers.getSetCookie?.() ?? [];
	for (const cookie of setCookies) {
		responseHeaders.append("set-cookie", cookie);
	}

	return new Response(backendResponse.body, {
		status: backendResponse.status,
		statusText: backendResponse.statusText,
		headers: responseHeaders,
	});
}

export const GET: APIRoute = ({ request }) => proxy(request);
export const POST: APIRoute = ({ request }) => proxy(request);
export const PUT: APIRoute = ({ request }) => proxy(request);
export const PATCH: APIRoute = ({ request }) => proxy(request);
export const DELETE: APIRoute = ({ request }) => proxy(request);
