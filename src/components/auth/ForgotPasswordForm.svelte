<script lang="ts">
	import { initSuperTokens, EmailPassword } from "$lib/supertokens/config";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { onMount } from "svelte";
	import Icon from "@iconify/svelte";

	let email = $state("");
	let error = $state("");
	let success = $state(false);
	let loading = $state(false);

	onMount(() => {
		initSuperTokens();
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		error = "";
		success = false;

		if (!email) {
			error = "Ingresa tu correo electrónico.";
			return;
		}

		loading = true;
		try {
			const response = await EmailPassword.sendPasswordResetEmail({
				formFields: [{ id: "email", value: email }],
			});

			if (response.status === "OK") {
				success = true;
				email = "";
			} else if (response.status === "FIELD_ERROR") {
				for (const field of response.formFields) {
					if (field.id === "email") {
						error = field.error;
					}
				}
			}
		} catch (e) {
			error = "Ocurrió un error inesperado. Intenta de nuevo.";
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12">
	<div class="w-full max-w-sm space-y-8">
		<div class="space-y-2 text-center">
			<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
				<Icon icon="lucide:scale" class="h-6 w-6" />
			</div>
			<h1 class="text-2xl font-semibold tracking-tight text-foreground">Restablecer contraseña</h1>
			<p class="text-sm text-muted-foreground">
				Ingresa tu correo y te enviaremos un enlace para configurar una nueva contraseña.
			</p>
		</div>

		<div class="space-y-6">
			{#if success}
				<div class="rounded-md border border-emerald-500/50 bg-emerald-500/10 p-3 text-sm text-emerald-700">
					Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.
				</div>
			{:else}
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
					</div>

					<Button type="submit" class="w-full h-10 font-medium" disabled={loading}>
						{#if loading}
							<Icon icon="lucide:loader-circle" class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						{loading ? "Enviando..." : "Enviar enlace"}
					</Button>
				</form>
			{/if}

			<div class="text-center">
				<a href="/login" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
					← Volver al inicio de sesión
				</a>
			</div>
		</div>

		<p class="text-center text-sm text-muted-foreground">
			© {new Date().getFullYear()} LegalCore. Todos los derechos reservados.
		</p>
	</div>
</div>
