import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { S as createAstro, h as addAttribute, i as renderComponent, l as renderTemplate, m as renderHead } from "./server_BVb11Km5.mjs";
import { $ as escape_html } from "./index-server_BbGYSPwV.mjs";
import { t as createComponent } from "./astro-component_DVnojZiW.mjs";
import "./compiler_DZ2LYM6g.mjs";
import { n as EmailVerification } from "./config_IcEgQIWU.mjs";
import { n as Icon, r as Button, t as $$ThemeInit } from "./ThemeInit_D8dWN7q7.mjs";
/* empty css                 */
//#region src/components/auth/VerifyEmail.svelte
function VerifyEmail($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let message = "Verificando tu correo...";
		let loading = true;
		let error = "";
		async function resend() {
			loading = true;
			error = "";
			try {
				const response = await EmailVerification.sendVerificationEmail();
				if (response.status === "OK") message = "Enlace enviado. Revisa tu correo (o el archivo de logs en desarrollo).";
				else if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
					message = "Tu correo ya está verificado. Redirigiendo...";
					setTimeout(() => {
						window.location.href = "/login";
					}, 1500);
				}
			} catch (e) {
				error = "No se pudo enviar el enlace. Intenta de nuevo.";
			} finally {
				loading = false;
			}
		}
		$$renderer.push(`<div class="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12"><div class="w-full max-w-sm space-y-8 text-center"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">`);
		Icon($$renderer, {
			icon: "lucide:mail-check",
			class: "h-6 w-6"
		});
		$$renderer.push(`<!----></div> <h1 class="text-2xl font-semibold tracking-tight text-foreground">Verifica tu correo</h1> `);
		if (error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">${escape_html(error)}</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<p class="text-sm text-muted-foreground">${escape_html(message)}</p>`);
		}
		$$renderer.push(`<!--]--> `);
		if (!EmailVerification.getEmailVerificationTokenFromURL()) {
			$$renderer.push("<!--[0-->");
			Button($$renderer, {
				class: "w-full",
				disabled: loading,
				onclick: resend,
				children: ($$renderer) => {
					if (loading) {
						$$renderer.push("<!--[0-->");
						Icon($$renderer, {
							icon: "lucide:loader-circle",
							class: "mr-2 h-4 w-4 animate-spin"
						});
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> ${escape_html(loading ? "Enviando..." : "Reenviar enlace")}`);
				},
				$$slots: { default: true }
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="text-center"><a href="/login" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">← Volver al inicio de sesión</a></div></div></div>`);
	});
}
//#endregion
//#region src/pages/auth/verify-email.astro
var verify_email_exports = /* @__PURE__ */ __exportAll({
	default: () => $$VerifyEmail,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$VerifyEmail = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$VerifyEmail;
	return renderTemplate`<html lang="es"><head>${renderComponent($$result, "ThemeInit", $$ThemeInit, {})}<meta charset="utf-8"><link rel="icon" href="/law.png"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>LegalCore — Verificar correo</title>${renderHead($$result)}</head><body>${renderComponent($$result, "VerifyEmail", VerifyEmail, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/components/auth/VerifyEmail.svelte",
		"client:component-export": "default"
	})}</body></html>`;
}, "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/auth/verify-email.astro", void 0);
var $$file = "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/auth/verify-email.astro";
var $$url = "/auth/verify-email";
//#endregion
//#region \0virtual:astro:page:src/pages/auth/verify-email@_@astro
var page = () => verify_email_exports;
//#endregion
export { page };
