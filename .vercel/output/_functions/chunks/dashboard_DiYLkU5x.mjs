import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { S as createAstro, h as addAttribute, i as renderComponent, l as renderTemplate, m as renderHead } from "./server_BVb11Km5.mjs";
import { t as createComponent } from "./astro-component_DVnojZiW.mjs";
import "./compiler_DZ2LYM6g.mjs";
import { t as $$ThemeInit } from "./ThemeInit_D8dWN7q7.mjs";
/* empty css                 */
import { t as DashboardLayout } from "./DashboardLayout_B25K0t6c.mjs";
import { t as HomePage } from "./HomePage_DZ1Hqla9.mjs";
//#region src/pages/dashboard.astro
var dashboard_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Dashboard,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Dashboard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Dashboard;
	const userContext = {
		user: Astro.locals.user,
		role: Astro.locals.role ?? null,
		firm: Astro.locals.firm,
		password_expired: Astro.locals.password_expired ?? false
	};
	return renderTemplate`<html lang="es"><head>${renderComponent($$result, "ThemeInit", $$ThemeInit, {})}<meta charset="utf-8"><link rel="icon" href="/law.png"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>LCE | Dashboard</title>${renderHead($$result)}</head><body>${renderComponent($$result, "DashboardLayout", DashboardLayout, {
		"userContext": userContext,
		"title": "Inicio",
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/components/layout/DashboardLayout.svelte",
		"client:component-export": "default"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HomePage", HomePage, {
		"userContext": userContext,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/components/dashboard/HomePage.svelte",
		"client:component-export": "default"
	})}` })}</body></html>`;
}, "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/dashboard.astro", void 0);
var $$file = "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/dashboard.astro";
var $$url = "/dashboard";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard@_@astro
var page = () => dashboard_exports;
//#endregion
export { page };
