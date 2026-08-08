import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import type { MiddlewareHandler } from "astro";

interface RedirectContext {
	request: Request;
	url: URL;
	redirect: (url: string) => Response;
	locals: Record<string, unknown>;
}

async function runMiddleware(
	pathname: string,
	cookie: string,
	fetchResponse: Response
): Promise<{ status: number; redirect?: string; locals?: Record<string, unknown> }> {
	vi.stubEnv("PUBLIC_API_DOMAIN", "http://localhost:8080");
	vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(fetchResponse)));

	const request = new Request(`http://localhost:4321${pathname}`, {
		headers: cookie ? { cookie } : {},
	});

	const redirectCalls: string[] = [];
	const context: RedirectContext = {
		request,
		url: new URL(request.url),
		redirect: (url: string) => {
			redirectCalls.push(url);
			return new Response(null, { status: 302, headers: { location: url } });
		},
		locals: {},
	};

	const next = vi.fn(() => new Response("next"));

	const { onRequest } = await import("./middleware");
	const result = await onRequest(context as unknown as Parameters<MiddlewareHandler>[0], next as unknown as Parameters<MiddlewareHandler>[1]);

	if (redirectCalls.length > 0) {
		return { status: 302, redirect: redirectCalls[0] };
	}
	return {
		status: (result as Response).status,
		locals: context.locals,
	};
}

describe("middleware", () => {
	beforeEach(() => {
		vi.unstubAllEnvs();
		vi.unstubAllGlobals();
		vi.clearAllMocks();
		vi.resetModules();
	});

	it("allows unprotected routes", async () => {
		const result = await runMiddleware("/login", "", new Response("ok", { status: 200 }));
		expect(result.status).toBe(200);
		expect(global.fetch as unknown as Mock).not.toHaveBeenCalled();
	});

	it("redirects to login when /api/v1/me returns 401", async () => {
		const result = await runMiddleware("/dashboard", "", new Response("unauthorized", { status: 401 }));
		expect(result.status).toBe(302);
		expect(result.redirect).toBe("/login");
	});

	it("populates locals when /api/v1/me succeeds", async () => {
		const payload = {
			user: { id: 1, full_name: "Admin", email: "admin@example.com", status: "active", created_at: "2026-01-01" },
			role: { id: 1, name: "Admin" },
			firm: { id: 1, name: "LegalCore Dev", tax_id: "00000000-0", status: "active" },
			password_expired: false,
		};
		const result = await runMiddleware(
			"/dashboard",
			"sAccessToken=abc",
			new Response(JSON.stringify(payload), { status: 200, headers: { "Content-Type": "application/json" } })
		);
		expect(result.status).toBe(200);
		expect(result.locals?.user).toEqual(payload.user);
		expect(result.locals?.role).toEqual(payload.role);
		expect(result.locals?.firm).toEqual(payload.firm);
		expect(result.locals?.password_expired).toBe(false);
	});

	it("redirects to change-password when password_expired is true", async () => {
		const payload = {
			user: { id: 1, full_name: "Admin", email: "admin@example.com", status: "active", created_at: "2026-01-01" },
			role: { id: 1, name: "Admin" },
			firm: { id: 1, name: "LegalCore Dev", tax_id: "00000000-0", status: "active" },
			password_expired: true,
		};
		const result = await runMiddleware(
			"/dashboard/usuarios",
			"sAccessToken=abc",
			new Response(JSON.stringify(payload), { status: 200, headers: { "Content-Type": "application/json" } })
		);
		expect(result.status).toBe(302);
		expect(result.redirect).toBe("/auth/change-password");
	});

	it("does not redirect from the change-password page itself", async () => {
		const payload = {
			user: { id: 1, full_name: "Admin", email: "admin@example.com", status: "active", created_at: "2026-01-01" },
			role: { id: 1, name: "Admin" },
			firm: { id: 1, name: "LegalCore Dev", tax_id: "00000000-0", status: "active" },
			password_expired: true,
		};
		const result = await runMiddleware(
			"/auth/change-password",
			"sAccessToken=abc",
			new Response(JSON.stringify(payload), { status: 200, headers: { "Content-Type": "application/json" } })
		);
		expect(result.status).toBe(200);
	});
});
