<script lang="ts">
	import { initSuperTokens, ThirdParty } from "$lib/supertokens/config";
	import { Button } from "$lib/components/ui/button";
	import { onMount } from "svelte";
	import Icon from "@iconify/svelte";

	let error = $state("");
	let loading = $state(true);

	onMount(() => {
		initSuperTokens();
		handleCallback();
	});

	async function handleCallback() {
		try {
			const response = await ThirdParty.signInAndUp();
			if (response.status === "OK") {
				const me = await fetch("/api/v1/me", {
					credentials: "include",
					headers: { "Content-Type": "application/json" },
				});
				if (!me.ok) {
					window.location.href = "/login";
					return;
				}
				const data = await me.json();
				if (data.user?.status === "pending") {
					window.location.href = "/pending-approval";
				} else {
					window.location.href = "/dashboard";
				}
			} else if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
				error = "Google no compartió tu correo. Verifica los permisos e intenta de nuevo.";
				loading = false;
			} else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
				error = "No se permite iniciar sesión con esta cuenta.";
				loading = false;
			}
		} catch (e) {
			error = "Ocurrió un error al iniciar sesión con Google. Intenta de nuevo.";
			loading = false;
		}
	}
</script>

<div class="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12">
	<div class="w-full max-w-sm space-y-6 text-center">
		<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
			<Icon icon="lucide:scale" class="h-6 w-6" />
		</div>
		<h1 class="text-2xl font-semibold tracking-tight">Iniciando sesión con Google</h1>

		{#if loading}
			<div class="flex items-center justify-center gap-2 text-sm text-muted-foreground">
				<Icon icon="lucide:loader-circle" class="h-4 w-4 animate-spin" />
				<span>Espera un momento...</span>
			</div>
		{/if}

		{#if error}
			<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
				{error}
			</div>
			<Button href="/login" class="w-full">Volver al inicio de sesión</Button>
		{/if}
	</div>
</div>
