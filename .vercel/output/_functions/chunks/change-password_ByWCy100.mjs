import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { S as createAstro, h as addAttribute, i as renderComponent, l as renderTemplate, m as renderHead } from "./server_BVb11Km5.mjs";
import { $ as escape_html } from "./index-server_BbGYSPwV.mjs";
import { t as createComponent } from "./astro-component_DVnojZiW.mjs";
import "./compiler_DZ2LYM6g.mjs";
import { n as Icon, r as Button, t as $$ThemeInit } from "./ThemeInit_D8dWN7q7.mjs";
/* empty css                 */
import { E as Input } from "./create-id_C_2gSAF4.mjs";
import { t as Label } from "./label_sWRoE167.mjs";
//#region src/components/auth/ChangePasswordForm.svelte
function ChangePasswordForm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let newPassword = "";
		let confirmPassword = "";
		let loading = false;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12"><div class="w-full max-w-sm space-y-8"><div class="space-y-2 text-center"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">`);
			Icon($$renderer, {
				icon: "lucide:scale",
				class: "h-6 w-6"
			});
			$$renderer.push(`<!----></div> <h1 class="text-2xl font-semibold tracking-tight text-foreground">Actualizar contraseña</h1> <p class="text-sm text-muted-foreground">Por seguridad, debes actualizar tu contraseña para continuar.</p></div> <div class="space-y-6">`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <form class="space-y-4"><div class="space-y-2">`);
			Label($$renderer, {
				for: "new_password",
				class: "text-sm font-medium",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Nueva contraseña`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				id: "new_password",
				type: "password",
				required: true,
				minlength: 8,
				autocomplete: "new-password",
				placeholder: "••••••••",
				class: "h-10",
				get value() {
					return newPassword;
				},
				set value($$value) {
					newPassword = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div> <div class="space-y-2">`);
			Label($$renderer, {
				for: "confirm_password",
				class: "text-sm font-medium",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Confirmar nueva contraseña`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				id: "confirm_password",
				type: "password",
				required: true,
				minlength: 8,
				autocomplete: "new-password",
				placeholder: "••••••••",
				class: "h-10",
				get value() {
					return confirmPassword;
				},
				set value($$value) {
					confirmPassword = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div> `);
			Button($$renderer, {
				type: "submit",
				class: "w-full h-10 font-medium",
				disabled: loading,
				children: ($$renderer) => {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> ${escape_html("Actualizar contraseña")}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></form>`);
			$$renderer.push(`<!--]--></div> <p class="text-center text-sm text-muted-foreground">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} LegalCore. Todos los derechos reservados.</p></div></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
//#region src/pages/auth/change-password.astro
var change_password_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ChangePassword,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$ChangePassword = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ChangePassword;
	return renderTemplate`<html lang="es"><head>${renderComponent($$result, "ThemeInit", $$ThemeInit, {})}<meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>LegalCore — Actualizar contraseña</title>${renderHead($$result)}</head><body>${renderComponent($$result, "ChangePasswordForm", ChangePasswordForm, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/components/auth/ChangePasswordForm.svelte",
		"client:component-export": "default"
	})}</body></html>`;
}, "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/auth/change-password.astro", void 0);
var $$file = "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/auth/change-password.astro";
var $$url = "/auth/change-password";
//#endregion
//#region \0virtual:astro:page:src/pages/auth/change-password@_@astro
var page = () => change_password_exports;
//#endregion
export { page };
