<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { initSuperTokens, Session } from "$lib/supertokens/config";
	import { onMount } from "svelte";
	import Icon from "@iconify/svelte";

	onMount(() => {
		initSuperTokens();
	});

	async function signOut() {
		await Session.signOut();
		window.location.href = "/login";
	}
</script>

<div class="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12">
	<div class="w-full max-w-sm space-y-8 text-center">
		<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
			<Icon icon="lucide:clock" class="h-6 w-6" />
		</div>
		<h1 class="text-2xl font-semibold tracking-tight text-foreground">Cuenta pendiente de aprobación</h1>
		<p class="text-sm text-muted-foreground">
			Tu cuenta de Google fue creada, pero aún no tiene acceso al panel. Un administrador debe asignarte un rol y activar tu cuenta.
		</p>
		<div class="rounded-md border border-amber-500/50 bg-amber-500/10 p-3 text-sm text-amber-700">
			Te notificaremos cuando tu acceso esté listo.
		</div>
		<Button variant="outline" class="w-full" onclick={signOut}>Cerrar sesión</Button>
	</div>
</div>
