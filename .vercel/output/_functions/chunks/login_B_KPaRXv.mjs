import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { S as createAstro, h as addAttribute, i as renderComponent, l as renderTemplate, m as renderHead } from "./server_BVb11Km5.mjs";
import { $ as escape_html } from "./index-server_BbGYSPwV.mjs";
import { t as createComponent } from "./astro-component_DVnojZiW.mjs";
import "./compiler_DZ2LYM6g.mjs";
import { i as ThirdParty } from "./config_IcEgQIWU.mjs";
import { n as Icon, r as Button, t as $$ThemeInit } from "./ThemeInit_D8dWN7q7.mjs";
/* empty css                 */
import { E as Input } from "./create-id_C_2gSAF4.mjs";
import { t as Label } from "./label_sWRoE167.mjs";
//#region src/components/auth/LoginForm.svelte
function LoginForm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let email = "";
		let password = "";
		let error = "";
		let fieldErrors = {};
		let loading = false;
		let googleLoading = false;
		async function handleGoogleLogin() {
			googleLoading = true;
			try {
				const authUrl = await ThirdParty.getAuthorisationURLWithQueryParamsAndSetState({
					thirdPartyId: "google",
					frontendRedirectURI: `${window.location.origin}/auth/callback/google`
				});
				window.location.href = authUrl;
			} catch (e) {
				error = "No se pudo iniciar sesión con Google. Intenta de nuevo.";
				googleLoading = false;
			}
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12"><div class="w-full max-w-sm space-y-8"><div class="space-y-2 text-center"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">`);
			Icon($$renderer, {
				icon: "lucide:scale",
				class: "h-6 w-6"
			});
			$$renderer.push(`<!----></div> <h1 class="text-2xl font-semibold tracking-tight text-foreground">Iniciar sesión</h1> <p class="text-sm text-muted-foreground">Ingresa tus credenciales para acceder al panel de LegalCore.</p></div> <div class="space-y-6">`);
			if (error) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">${escape_html(error)}</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <form class="space-y-4"><div class="space-y-2">`);
			Label($$renderer, {
				for: "email",
				class: "text-sm font-medium",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Correo electrónico`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				id: "email",
				type: "email",
				required: true,
				autocomplete: "email",
				placeholder: "tu@legalcore.dev",
				class: "h-10",
				get value() {
					return email;
				},
				set value($$value) {
					email = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (fieldErrors.email) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="text-sm text-destructive">${escape_html(fieldErrors.email)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="space-y-2"><div class="flex items-center justify-between">`);
			Label($$renderer, {
				for: "password",
				class: "text-sm font-medium",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Contraseña`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> <a href="/auth/forgot-password" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">¿Olvidaste tu contraseña?</a></div> `);
			Input($$renderer, {
				id: "password",
				type: "password",
				required: true,
				autocomplete: "current-password",
				placeholder: "••••••••",
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
			$$renderer.push(`<!--]--></div> `);
			Button($$renderer, {
				type: "submit",
				class: "w-full h-10 font-medium",
				disabled: loading,
				children: ($$renderer) => {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> ${escape_html("Ingresar")}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></form> <div class="relative flex items-center"><div class="flex-1 border-t border-border"></div> <span class="px-3 text-xs text-muted-foreground">O</span> <div class="flex-1 border-t border-border"></div></div> `);
			Button($$renderer, {
				variant: "outline",
				class: "w-full h-10 font-medium",
				disabled: googleLoading,
				onclick: handleGoogleLogin,
				children: ($$renderer) => {
					if (googleLoading) {
						$$renderer.push("<!--[0-->");
						Icon($$renderer, {
							icon: "lucide:loader-circle",
							class: "mr-2 h-4 w-4 animate-spin"
						});
					} else {
						$$renderer.push("<!--[-1-->");
						Icon($$renderer, {
							icon: "logos:google-icon",
							class: "mr-2 h-4 w-4"
						});
					}
					$$renderer.push(`<!--]--> ${escape_html(googleLoading ? "Cargando..." : "Continuar con Google")}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> <p class="text-center text-sm text-muted-foreground">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} LegalCore. Todos los derechos reservados.</p></div></div>`);
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
//#region src/pages/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Login = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Login;
	return renderTemplate`<html lang="es"><head>${renderComponent($$result, "ThemeInit", $$ThemeInit, {})}<meta charset="utf-8"><link rel="icon" href="/law.png"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>LCE | Iniciar sesión</title>${renderHead($$result)}</head><body>${renderComponent($$result, "LoginForm", LoginForm, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/components/auth/LoginForm.svelte",
		"client:component-export": "default"
	})}</body></html>`;
}, "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/login.astro", void 0);
var $$file = "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/login.astro";
var $$url = "/login";
//#endregion
//#region \0virtual:astro:page:src/pages/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
