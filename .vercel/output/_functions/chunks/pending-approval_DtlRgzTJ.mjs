import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { S as createAstro, h as addAttribute, i as renderComponent, l as renderTemplate, m as renderHead } from "./server_BVb11Km5.mjs";
import "./index-server_BbGYSPwV.mjs";
import { t as createComponent } from "./astro-component_DVnojZiW.mjs";
import "./compiler_DZ2LYM6g.mjs";
import { r as Session } from "./config_IcEgQIWU.mjs";
import { n as Icon, r as Button, t as $$ThemeInit } from "./ThemeInit_D8dWN7q7.mjs";
/* empty css                 */
//#region src/components/auth/PendingApproval.svelte
function PendingApproval($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		async function signOut() {
			await Session.signOut();
			window.location.href = "/login";
		}
		$$renderer.push(`<div class="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12"><div class="w-full max-w-sm space-y-8 text-center"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">`);
		Icon($$renderer, {
			icon: "lucide:clock",
			class: "h-6 w-6"
		});
		$$renderer.push(`<!----></div> <h1 class="text-2xl font-semibold tracking-tight text-foreground">Cuenta pendiente de aprobación</h1> <p class="text-sm text-muted-foreground">Tu cuenta de Google fue creada, pero aún no tiene acceso al panel. Un administrador debe asignarte un rol y activar tu cuenta.</p> <div class="rounded-md border border-amber-500/50 bg-amber-500/10 p-3 text-sm text-amber-700">Te notificaremos cuando tu acceso esté listo.</div> `);
		Button($$renderer, {
			variant: "outline",
			class: "w-full",
			onclick: signOut,
			children: ($$renderer) => {
				$$renderer.push(`<!---->Cerrar sesión`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></div>`);
	});
}
//#endregion
//#region src/pages/pending-approval.astro
var pending_approval_exports = /* @__PURE__ */ __exportAll({
	default: () => $$PendingApproval,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$PendingApproval = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PendingApproval;
	return renderTemplate`<html lang="es"><head>${renderComponent($$result, "ThemeInit", $$ThemeInit, {})}<meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>LegalCore — Cuenta pendiente</title>${renderHead($$result)}</head><body>${renderComponent($$result, "PendingApproval", PendingApproval, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/components/auth/PendingApproval.svelte",
		"client:component-export": "default"
	})}</body></html>`;
}, "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/pending-approval.astro", void 0);
var $$file = "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/pending-approval.astro";
var $$url = "/pending-approval";
//#endregion
//#region \0virtual:astro:page:src/pages/pending-approval@_@astro
var page = () => pending_approval_exports;
//#endregion
export { page };
