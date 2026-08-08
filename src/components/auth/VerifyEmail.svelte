<script lang="ts">
	import { initSuperTokens, EmailVerification } from "$lib/supertokens/config";
	import { Button } from "$lib/components/ui/button";
	import { onMount } from "svelte";
	import Icon from "@iconify/svelte";

	let message = $state("Verificando tu correo...");
	let loading = $state(true);
	let error = $state("");

	onMount(() => {
		initSuperTokens();
		verify();
	});

	async function verify() {
		try {
			const token = EmailVerification.getEmailVerificationTokenFromURL();
			if (token) {
				const response = await EmailVerification.verifyEmail({});
				if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
					error = "El enlace de verificación no es válido o ha expirado.";
				} else if (response.status === "OK") {
					message = "Correo verificado correctamente. Redirigiendo...";
					setTimeout(() => {
						window.location.href = "/login";
					}, 1500);
					return;
				}
			} else {
				message = "Te enviaremos un enlace de verificación.";
			}
		} catch (e) {
			error = "Ocurrió un error al verificar tu correo.";
		} finally {
			loading = false;
		}
	}

	async function resend() {
		loading = true;
		error = "";
		try {
			const response = await EmailVerification.sendVerificationEmail();
			if (response.status === "OK") {
				message = "Enlace enviado. Revisa tu correo (o el archivo de logs en desarrollo).";
			} else if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
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
</script>

<div class="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12">
	<div class="w-full max-w-sm space-y-8 text-center">
		<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
			<Icon icon="lucide:mail-check" class="h-6 w-6" />
		</div>
		<h1 class="text-2xl font-semibold tracking-tight text-foreground">Verifica tu correo</h1>

		{#if error}
			<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
				{error}
			</div>
		{:else}
			<p class="text-sm text-muted-foreground">{message}</p>
		{/if}

		{#if !EmailVerification.getEmailVerificationTokenFromURL()}
			<Button class="w-full" disabled={loading} onclick={resend}>
				{#if loading}
					<Icon icon="lucide:loader-circle" class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{loading ? "Enviando..." : "Reenviar enlace"}
			</Button>
		{/if}

		<div class="text-center">
			<a href="/login" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
				← Volver al inicio de sesión
			</a>
		</div>
	</div>
</div>
