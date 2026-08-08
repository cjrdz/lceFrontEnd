<script lang="ts">
	import { initSuperTokens, EmailPassword, ThirdParty } from "$lib/supertokens/config";
	import { login } from "$lib/auth/login";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { onMount } from "svelte";
	import Icon from "@iconify/svelte";

	let email = $state("");
	let password = $state("");
	let error = $state("");
	let fieldErrors = $state<{ email?: string; password?: string }>({});
	let loading = $state(false);
	let googleLoading = $state(false);

	onMount(() => {
		initSuperTokens();
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		loading = true;
		const result = await login(email, password, {
			signIn: EmailPassword.signIn,
			redirect: (url) => (window.location.href = url),
		});
		error = result.error ?? "";
		fieldErrors = result.fieldErrors as { email?: string; password?: string };
		loading = false;
	}

	async function handleGoogleLogin() {
		googleLoading = true;
		try {
			const authUrl = await ThirdParty.getAuthorisationURLWithQueryParamsAndSetState({
				thirdPartyId: "google",
				frontendRedirectURI: `${window.location.origin}/auth/callback/google`,
			});
			window.location.href = authUrl;
		} catch (e) {
			error = "No se pudo iniciar sesión con Google. Intenta de nuevo.";
			googleLoading = false;
		}
	}
</script>

<div class="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12">
	<div class="w-full max-w-sm space-y-8">
		<!-- Logo + heading -->
		<div class="space-y-2 text-center">
			<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
				<Icon icon="lucide:scale" class="h-6 w-6" />
			</div>
			<h1 class="text-2xl font-semibold tracking-tight text-foreground">Iniciar sesión</h1>
			<p class="text-sm text-muted-foreground">
				Ingresa tus credenciales para acceder al panel de LegalCore.
			</p>
		</div>

		<!-- Form card -->
		<div class="space-y-6">
			{#if error}
				<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
					{error}
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="space-y-4">
				<div class="space-y-2">
					<Label for="email" class="text-sm font-medium">Correo electrónico</Label>
					<Input
						id="email"
						type="email"
						bind:value={email}
						required
						autocomplete="email"
						placeholder="tu@legalcore.dev"
						class="h-10"
					/>
					{#if fieldErrors.email}
						<p class="text-sm text-destructive">{fieldErrors.email}</p>
					{/if}
				</div>

				<div class="space-y-2">
					<div class="flex items-center justify-between">
						<Label for="password" class="text-sm font-medium">Contraseña</Label>
						<a href="/auth/forgot-password" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
							¿Olvidaste tu contraseña?
						</a>
					</div>
					<Input
						id="password"
						type="password"
						bind:value={password}
						required
						autocomplete="current-password"
						placeholder="••••••••"
						class="h-10"
					/>
					{#if fieldErrors.password}
						<p class="text-sm text-destructive">{fieldErrors.password}</p>
					{/if}
				</div>

				<Button type="submit" class="w-full h-10 font-medium" disabled={loading}>
					{#if loading}
						<Icon icon="lucide:loader-circle" class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					{loading ? "Ingresando..." : "Ingresar"}
				</Button>
			</form>

			<!-- Divider -->
			<div class="relative flex items-center">
				<div class="flex-1 border-t border-border"></div>
				<span class="px-3 text-xs text-muted-foreground">O</span>
				<div class="flex-1 border-t border-border"></div>
			</div>

			<!-- Google button -->
			<Button variant="outline" class="w-full h-10 font-medium" disabled={googleLoading} onclick={handleGoogleLogin}>
				{#if googleLoading}
					<Icon icon="lucide:loader-circle" class="mr-2 h-4 w-4 animate-spin" />
				{:else}
					<Icon icon="logos:google-icon" class="mr-2 h-4 w-4" />
				{/if}
				{googleLoading ? "Cargando..." : "Continuar con Google"}
			</Button>
		</div>

		<p class="text-center text-sm text-muted-foreground">
			© {new Date().getFullYear()} LegalCore. Todos los derechos reservados.
		</p>
	</div>
</div>
