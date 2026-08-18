import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { S as createAstro, h as addAttribute, i as renderComponent, l as renderTemplate, m as renderHead } from "./server_BVb11Km5.mjs";
import { $ as escape_html } from "./index-server_BbGYSPwV.mjs";
import { t as createComponent } from "./astro-component_DVnojZiW.mjs";
import "./compiler_DZ2LYM6g.mjs";
import "./config_IcEgQIWU.mjs";
import { n as Icon, r as Button, t as $$ThemeInit } from "./ThemeInit_D8dWN7q7.mjs";
/* empty css                 */
import { E as Input } from "./create-id_C_2gSAF4.mjs";
import { t as Label } from "./label_sWRoE167.mjs";
//#region src/components/auth/ResetPasswordForm.svelte
function ResetPasswordForm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let password = "";
		let confirmPassword = "";
		let fieldErrors = {};
		let loading = false;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12"><div class="w-full max-w-sm space-y-8"><div class="space-y-2 text-center"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">`);
			Icon($$renderer, {
				icon: "lucide:scale",
				class: "h-6 w-6"
			});
			$$renderer.push(`<!----></div> <h1 class="text-2xl font-semibold tracking-tight text-foreground">Restablecer contraseña</h1> <p class="text-sm text-muted-foreground">Crea una contraseña segura para acceder al panel de LegalCore.</p></div> <div class="space-y-6">`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <form class="space-y-4"><div class="space-y-2">`);
			Label($$renderer, {
				for: "password",
				class: "text-sm font-medium",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Nueva contraseña`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				id: "password",
				type: "password",
				required: true,
				minlength: 8,
				autocomplete: "new-password",
				placeholder: "Mínimo 8 caracteres",
				class: "h-10",
				get value() {
					return password;
				},
				set value($$value) {
					password = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (fieldErrors.password) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="text-sm text-destructive">${escape_html(fieldErrors.password)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="space-y-2">`);
			Label($$renderer, {
				for: "confirmPassword",
				class: "text-sm font-medium",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Confirmar contraseña`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				id: "confirmPassword",
				type: "password",
				required: true,
				minlength: 8,
				autocomplete: "new-password",
				placeholder: "Repite la contraseña",
				class: "h-10",
				get value() {
					return confirmPassword;
				},
				set value($$value) {
					confirmPassword = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (fieldErrors.confirmPassword) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="text-sm text-destructive">${escape_html(fieldErrors.confirmPassword)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			Button($$renderer, {
				type: "submit",
				class: "w-full h-10 font-medium",
				disabled: loading,
				children: ($$renderer) => {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> ${escape_html("Guardar contraseña")}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></form>`);
			$$renderer.push(`<!--]--> <div class="text-center"><a href="/login" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">← Volver al inicio de sesión</a></div></div> <p class="text-center text-sm text-muted-foreground">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} LegalCore. Todos los derechos reservados.</p></div></div>`);
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
//#region src/pages/auth/reset-password.astro
var reset_password_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ResetPassword,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$ResetPassword = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ResetPassword;
	return renderTemplate`<html lang="es"><head>${renderComponent($$result, "ThemeInit", $$ThemeInit, {})}<meta charset="utf-8"><link rel="icon" href="/law.png"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>LegalCore — Restablecer contraseña</title>${renderHead($$result)}</head><body>${renderComponent($$result, "ResetPasswordForm", ResetPasswordForm, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/components/auth/ResetPasswordForm.svelte",
		"client:component-export": "default"
	})}</body></html>`;
}, "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/auth/reset-password.astro", void 0);
var $$file = "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/auth/reset-password.astro";
var $$url = "/auth/reset-password";
//#endregion
//#region \0virtual:astro:page:src/pages/auth/reset-password@_@astro
var page = () => reset_password_exports;
//#endregion
export { page };
