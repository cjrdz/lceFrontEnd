<script lang="ts">
	import { changePassword } from "$lib/api/users";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import Icon from "@iconify/svelte";

	let newPassword = $state("");
	let confirmPassword = $state("");
	let error = $state("");
	let success = $state(false);
	let loading = $state(false);

	async function handleSubmit(event: Event) {
		event.preventDefault();
		error = "";
		success = false;

		if (newPassword.length < 8) {
			error = "La contraseña debe tener al menos 8 caracteres.";
			return;
		}
		if (newPassword !== confirmPassword) {
			error = "Las contraseñas no coinciden.";
			return;
		}

		loading = true;
		try {
			await changePassword(newPassword);
			success = true;
			setTimeout(() => {
				window.location.href = "/dashboard";
			}, 1500);
		} catch (e) {
			error = e instanceof Error ? e.message : "Error al cambiar la contraseña.";
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
			<h1 class="text-2xl font-semibold tracking-tight text-foreground">Actualizar contraseña</h1>
			<p class="text-sm text-muted-foreground">
				Por seguridad, debes actualizar tu contraseña para continuar.
			</p>
		</div>

		<div class="space-y-6">
			{#if success}
				<div class="rounded-md border border-emerald-500/50 bg-emerald-500/10 p-3 text-sm text-emerald-700">
					Contraseña actualizada. Redirigiendo al panel…
				</div>
			{:else}
				{#if error}
					<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
						{error}
					</div>
				{/if}

				<form onsubmit={handleSubmit} class="space-y-4">
					<div class="space-y-2">
						<Label for="new_password" class="text-sm font-medium">Nueva contraseña</Label>
						<Input
							id="new_password"
							type="password"
							bind:value={newPassword}
							required
							minlength={8}
							autocomplete="new-password"
							placeholder="••••••••"
							class="h-10"
						/>
					</div>
					<div class="space-y-2">
						<Label for="confirm_password" class="text-sm font-medium">Confirmar nueva contraseña</Label>
						<Input
							id="confirm_password"
							type="password"
							bind:value={confirmPassword}
							required
							minlength={8}
							autocomplete="new-password"
							placeholder="••••••••"
							class="h-10"
						/>
					</div>
					<Button type="submit" class="w-full h-10 font-medium" disabled={loading}>
						{#if loading}
							<Icon icon="lucide:loader-circle" class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						{loading ? "Actualizando…" : "Actualizar contraseña"}
					</Button>
				</form>
			{/if}
		</div>

		<p class="text-center text-sm text-muted-foreground">
			© {new Date().getFullYear()} LegalCore. Todos los derechos reservados.
		</p>
	</div>
</div>
