<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import { authStore, type UserContext } from "$lib/stores/auth";
	import { initSuperTokens, Session } from "$lib/supertokens/config";
	import { generatePasswordResetLink } from "$lib/api/users";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "./app-sidebar.svelte";
	import UserMenu from "./user-menu.svelte";
	import MobileSidebarTrigger from "./mobile-sidebar-trigger.svelte";
	import ThemeToggleLoader from "./ThemeToggleLoader.svelte";

	interface Props {
		userContext: UserContext;
		title?: string;
		children?: Snippet;
	}

	let { userContext, title = "Dashboard", children }: Props = $props();
	let selfServiceLink = $state<string | null>(null);
	let selfServiceLoading = $state(false);
	let selfServiceError = $state<string | null>(null);

	onMount(() => {
		initSuperTokens();
		authStore.set(userContext);
	});

	async function handleLogout() {
		try {
			await Session.signOut();
		} catch {
			// ignore; session may already be cleared
		}
		authStore.clear();
		window.location.href = "/login";
	}

	async function handleSelfServiceReset() {
		selfServiceLoading = true;
		selfServiceError = null;
		try {
			selfServiceLink = await generatePasswordResetLink(userContext.user.id);
		} catch (e) {
			selfServiceError = e instanceof Error ? e.message : "Error al generar el enlace";
		} finally {
			selfServiceLoading = false;
		}
	}

	function closeSelfServiceDialog(open: boolean) {
		if (!open) {
			selfServiceLink = null;
			selfServiceError = null;
		}
	}
</script>

<Sidebar.Provider>
	<AppSidebar userContext={userContext} onLogout={handleLogout} />

	<div class="flex flex-1 flex-col min-w-0">
		<header class="flex h-14 items-center justify-between border-b bg-background px-4">
			<div class="flex items-center gap-3">
				<div class="md:hidden">
					<MobileSidebarTrigger />
				</div>
				<h1 class="text-lg font-semibold">{title}</h1>
			</div>
			<div class="flex items-center gap-2">
				<ThemeToggleLoader />
				<UserMenu
					fullName={userContext.user?.full_name ?? ""}
					email={userContext.user?.email ?? ""}
					roleName={userContext.role?.name ?? null}
					firmName={userContext.firm?.name ?? ""}
					selfServiceLoading={selfServiceLoading}
					onLogout={handleLogout}
					onSelfService={handleSelfServiceReset}
				/>
			</div>
		</header>
		<main class="flex-1 overflow-auto p-6">
			<Dialog.Root open={!!selfServiceLink || !!selfServiceError} onOpenChange={closeSelfServiceDialog}>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Enlace de configuración</Dialog.Title>
						<Dialog.Description>
							Comparte este enlace una sola vez para configurar tu contraseña.
						</Dialog.Description>
					</Dialog.Header>
					{#if selfServiceError}
						<div class="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
							{selfServiceError}
						</div>
					{:else}
						<div class="py-4">
							<Input value={selfServiceLink ?? ""} readonly class="font-mono text-xs" />
						</div>
					{/if}
					<Dialog.Footer>
						{#if selfServiceLink}
							<Button
								onclick={() => {
									if (selfServiceLink) navigator.clipboard.writeText(selfServiceLink);
								}}
							>
								Copiar
							</Button>
						{/if}
						<Button variant="outline" onclick={() => closeSelfServiceDialog(false)}>Cerrar</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
			{@render children?.()}
		</main>
	</div>
</Sidebar.Provider>
