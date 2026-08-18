import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { S as createAstro, h as addAttribute, i as renderComponent, l as renderTemplate, m as renderHead } from "./server_BVb11Km5.mjs";
import "./index-server_BbGYSPwV.mjs";
import { t as createComponent } from "./astro-component_DVnojZiW.mjs";
import "./compiler_DZ2LYM6g.mjs";
import "./config_IcEgQIWU.mjs";
import { n as Icon, t as $$ThemeInit } from "./ThemeInit_D8dWN7q7.mjs";
/* empty css                 */
//#region src/components/auth/GoogleCallback.svelte
function GoogleCallback($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div class="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12"><div class="w-full max-w-sm space-y-6 text-center"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">`);
		Icon($$renderer, {
			icon: "lucide:scale",
			class: "h-6 w-6"
		});
		$$renderer.push(`<!----></div> <h1 class="text-2xl font-semibold tracking-tight">Iniciando sesión con Google</h1> `);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="flex items-center justify-center gap-2 text-sm text-muted-foreground">`);
		Icon($$renderer, {
			icon: "lucide:loader-circle",
			class: "h-4 w-4 animate-spin"
		});
		$$renderer.push(`<!----> <span>Espera un momento...</span></div>`);
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
//#region src/pages/auth/callback/google.astro
var google_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Google,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Google = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Google;
	return renderTemplate`<html lang="es"><head>${renderComponent($$result, "ThemeInit", $$ThemeInit, {})}<meta charset="utf-8"><link rel="icon" href="/law.png"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>LegalCore — Google</title>${renderHead($$result)}</head><body>${renderComponent($$result, "GoogleCallback", GoogleCallback, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/components/auth/GoogleCallback.svelte",
		"client:component-export": "default"
	})}</body></html>`;
}, "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/auth/callback/google.astro", void 0);
var $$file = "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/auth/callback/google.astro";
var $$url = "/auth/callback/google";
//#endregion
//#region \0virtual:astro:page:src/pages/auth/callback/google@_@astro
var page = () => google_exports;
//#endregion
export { page };
