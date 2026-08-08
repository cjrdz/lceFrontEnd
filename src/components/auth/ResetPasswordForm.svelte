<script lang="ts">
	import { initSuperTokens, EmailPassword } from "$lib/supertokens/config";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { onMount } from "svelte";
	import Icon from "@iconify/svelte";

	function goToLogin() {
		window.location.href = "/login";
	}

	let password = $state("");
	let confirmPassword = $state("");
	let token = $state("");
	let error = $state("");
	let fieldErrors = $state<Record<string, string>>({});
	let success = $state(false);
	let loading = $state(false);

	$effect(() => {
		if (success) {
			const t = setTimeout(goToLogin, 2000);
			return () => clearTimeout(t);
		}
	});

	onMount(() => {
		initSuperTokens();
		const t = EmailPassword.getResetPasswordTokenFromURL();
		if (!t) {
			error = "El enlace no es válido o ha expirado. Solicita uno nuevo.";
		}
		token = t;
	});

	function validate(): boolean {
		error = "";
		fieldErrors = {};

		if (!token) {
			error = "El enlace no es válido o ha expirado.";
			return false;
		}

		if (!password) {
			fieldErrors.password = "La contraseña es obligatoria.";
			return false;
		}

		if (password.length < 8) {
			fieldErrors.password = "La contraseña debe tener al menos 8 caracteres.";
			return false;
		}

		if (password !== confirmPassword) {
			fieldErrors.confirmPassword = "Las contraseñas no coinciden.";
			return false;
		}

		return true;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (!validate()) return;

		loading = true;
		try {
			const response = await EmailPassword.submitNewPassword({
				formFields: [{ id: "password", value: password }],
			});

			if (response.status === "OK") {
				success = true;
			} else if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
				error = "El enlace no es válido o ha expirado. Solicita uno nuevo.";
			} else if (response.status === "FIELD_ERROR") {
				for (const field of response.formFields) {
					fieldErrors[field.id] = field.error;
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
				Crea una contraseña segura para acceder al panel de LegalCore.
			</p>
		</div>

		<div class="space-y-6">
			{#if success}
				<div class="rounded-md border border-emerald-500/50 bg-emerald-500/10 p-3 text-sm text-emerald-700">
					Contraseña actualizada correctamente. Redirigiendo al inicio de sesión…
				</div>
				<Button class="w-full" onclick={goToLogin}>Ir al inicio de sesión</Button>
			{:else}
				{#if error}
					<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
						{error}
					</div>
				{/if}

				<form onsubmit={handleSubmit} class="space-y-4">
					<div class="space-y-2">
						<Label for="password" class="text-sm font-medium">Nueva contraseña</Label>
						<Input
							id="password"
							type="password"
							bind:value={password}
							required
							minlength={8}
							autocomplete="new-password"
							placeholder="Mínimo 8 caracteres"
							class="h-10"
						/>
						{#if fieldErrors.password}
							<p class="text-sm text-destructive">{fieldErrors.password}</p>
						{/if}
					</div>

					<div class="space-y-2">
						<Label for="confirmPassword" class="text-sm font-medium">Confirmar contraseña</Label>
						<Input
							id="confirmPassword"
							type="password"
							bind:value={confirmPassword}
							required
							minlength={8}
							autocomplete="new-password"
							placeholder="Repite la contraseña"
							class="h-10"
						/>
						{#if fieldErrors.confirmPassword}
							<p class="text-sm text-destructive">{fieldErrors.confirmPassword}</p>
						{/if}
					</div>

					<Button type="submit" class="w-full h-10 font-medium" disabled={loading}>
						{#if loading}
							<Icon icon="lucide:loader-circle" class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						{loading ? "Guardando..." : "Guardar contraseña"}
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
