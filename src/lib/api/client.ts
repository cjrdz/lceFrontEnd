/**
 * Shared BFF fetch client.
 *
 * All domain clients under `src/lib/api/` consume the local Astro BFF routes
 * (`/api/v1/...`). The BFF then proxies to the Go backend, forwarding cookies so
 * that SuperTokens session validation works server-side.
 */

const API_URL = "";

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
	const url = `${API_URL}${path}`;
	const response = await fetch(url, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(options.headers || {}),
		},
		...options,
	});

	if (response.status === 401 || response.status === 403) {
		if (typeof window !== "undefined") {
			window.location.href = "/login";
		}
		throw new Error("No autorizado");
	}

	if (!response.ok) {
		let message = `Error ${response.status}`;
		try {
			const body = (await response.json()) as { message?: string };
			if (body.message) message = body.message;
		} catch {
			// ignore parse error
		}
		throw new Error(message);
	}

	return (await response.json()) as T;
}
