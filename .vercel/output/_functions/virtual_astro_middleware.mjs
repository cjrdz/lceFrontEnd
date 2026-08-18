import { g as sequence } from "./chunks/render_CmVaQIDU.mjs";
//#region src/middleware.ts
var onRequest$1 = async (context, next) => {
	const { request } = context;
	const url = new URL(request.url);
	if (!url.pathname.startsWith("/dashboard")) return next();
	const meUrl = `https://lcebackend-production.up.railway.app/api/v1/me`;
	let response;
	try {
		response = await fetch(meUrl, {
			method: "GET",
			headers: { cookie: request.headers.get("cookie") || "" },
			credentials: "include"
		});
	} catch {
		return context.redirect("/login");
	}
	if (!response.ok) return context.redirect("/login");
	const data = await response.json();
	context.locals.user = data.user;
	context.locals.role = data.role;
	context.locals.firm = data.firm;
	context.locals.password_expired = data.password_expired ?? false;
	if (context.locals.password_expired && url.pathname !== "/auth/change-password") return context.redirect("/auth/change-password");
	return next();
};
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
