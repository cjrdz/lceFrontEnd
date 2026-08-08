import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
	const { request } = context;
	const url = new URL(request.url);

	// Only protect /dashboard routes (and skip static assets).
	if (!url.pathname.startsWith("/dashboard")) {
		return next();
	}

	const apiDomain = import.meta.env.PUBLIC_API_DOMAIN || "http://localhost:8080";
	const meUrl = `${apiDomain}/api/v1/me`;

	const response = await fetch(meUrl, {
		method: "GET",
		headers: {
			cookie: request.headers.get("cookie") || "",
		},
		credentials: "include",
	});

	if (!response.ok) {
		return context.redirect("/login");
	}

	const data = await response.json();
	context.locals.user = data.user;
	context.locals.role = data.role;
	context.locals.firm = data.firm;
	context.locals.password_expired = data.password_expired ?? false;

	if (context.locals.password_expired && url.pathname !== "/auth/change-password") {
		return context.redirect("/auth/change-password");
	}

	return next();
};
