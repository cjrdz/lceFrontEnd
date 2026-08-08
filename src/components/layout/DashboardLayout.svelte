<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import { authStore, type UserContext } from "$lib/stores/auth";
	import { initSuperTokens, Session } from "$lib/supertokens/config";
	import { generatePasswordResetLink } from "$lib/api/users";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import Icon from "@iconify/svelte";

	interface Props {
		userContext: UserContext;
		title?: string;
		children?: Snippet;
	}

	let { userContext, title = "Dashboard", children }: Props = $props();
	let collapsed = $state(false);
	let mobileOpen = $state(false);
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

	const menuItems = [
		{ label: "Inicio", href: "/dashboard", icon: "lucide:home" },
		{ label: "Categorías", href: "#", icon: "lucide:tag" },
		{ label: "Casos", href: "#", icon: "lucide:briefcase" },
		{ label: "Clientes", href: "#", icon: "lucide:users" },
		{ label: "Expediente", href: "#", icon: "lucide:folder-open" },
		{ label: "Analíticas", href: "#", icon: "lucide:bar-chart-3" },
		{ label: "Usuarios", href: "/dashboard/usuarios", icon: "lucide:shield", requiredRole: "Admin" },
		{ label: "Pagos", href: "#", icon: "lucide:credit-card" },
		{ label: "Historial", href: "#", icon: "lucide:clock" },
		{ label: "Embargos", href: "#", icon: "lucide:gavel" },
		{ label: "Catálogo", href: "#", icon: "lucide:book-open" },
		{ label: "Despacho", href: "#", icon: "lucide:building-2" },
		{ label: "Edictos", href: "#", icon: "lucide:scroll-text" },
		{ label: "Facturas", href: "#", icon: "lucide:file-text" },
		{ label: "Costos", href: "#", icon: "lucide:coins" },
		{ label: "Reportes", href: "#", icon: "lucide:file-bar-chart" },
		{ label: "Alertas", href: "#", icon: "lucide:bell" },
		{ label: "Configuración", href: "#", icon: "lucide:settings" },
	];

	const visibleMenuItems = $derived(
		menuItems.filter((item) => !item.requiredRole || item.requiredRole === userContext.role?.name)
	);

	const sidebarWidth = $derived(collapsed ? "w-16" : "w-64");
</script>

{#if mobileOpen}
	<button
		class="fixed inset-0 z-40 bg-black/50 md:hidden"
		aria-label="Cerrar menú"
		onclick={() => (mobileOpen = false)}
	></button>
{/if}

<div class="min-h-screen flex">
	<aside
		class="{sidebarWidth} bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-200 ease-in-out
			{mobileOpen ? 'fixed inset-y-0 left-0 z-50 flex' : 'hidden md:flex'}"
	>
		<div class="flex h-14 items-center justify-between border-b border-sidebar-border px-3">
			{#if !collapsed}
				<div class="flex flex-col">
					<h2 class="text-lg font-bold leading-tight">LegalCore</h2>
					<p class="text-[10px] text-sidebar-foreground/70 leading-tight">{userContext.firm.name}</p>
				</div>
			{:else}
				<span class="sr-only">LegalCore</span>
				<Icon icon="lucide:briefcase" class="h-6 w-6" />
			{/if}
			<button
				onclick={() => {
					collapsed = !collapsed;
					mobileOpen = false;
				}}
				class="hidden md:flex items-center justify-center rounded-md p-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
				aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
			>
				<Icon icon={collapsed ? "lucide:chevron-right" : "lucide:chevron-left"} class="h-5 w-5" />
			</button>
		</div>
		<nav class="flex-1 overflow-y-auto p-2 space-y-1">
			{#each visibleMenuItems as item}
				<a
					href={item.href}
					class="group flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
						{item.href === '#' ? 'opacity-50 pointer-events-none' : ''}"
					onclick={() => (mobileOpen = false)}
				>
					<Icon icon={item.icon} class="h-5 w-5 flex-shrink-0" />
					{#if !collapsed}
						<span class="truncate">{item.label}</span>
					{:else}
						<span class="sr-only">{item.label}</span>
					{/if}
				</a>
			{/each}
		</nav>
		<div class="border-t border-sidebar-border p-2">
			<button
				onclick={handleLogout}
				class="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
			>
				<Icon icon="lucide:log-out" class="h-5 w-5 flex-shrink-0" />
				{#if !collapsed}
					<span class="truncate">Cerrar sesión</span>
				{:else}
					<span class="sr-only">Cerrar sesión</span>
				{/if}
			</button>
		</div>
	</aside>

	<div class="flex-1 flex flex-col min-w-0">
		<header class="h-14 border-b bg-background flex items-center justify-between px-4">
			<div class="flex items-center gap-3">
				<button
					onclick={() => (mobileOpen = !mobileOpen)}
					class="md:hidden rounded-md p-1 hover:bg-accent"
					aria-label="Abrir menú"
				>
					<Icon icon="lucide:menu" class="h-5 w-5" />
				</button>
			<h1 class="text-lg font-semibold">{title}</h1>
		</div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="flex items-center gap-2 text-sm text-right hover:bg-accent rounded-md px-2 py-1 transition-colors">
				<div class="hidden sm:block">
					<p class="font-medium">{userContext.user?.full_name}</p>
					<p class="text-xs text-muted-foreground">{userContext.role ? userContext.role.name : "Pendiente"}</p>
				</div>
				<Icon icon="lucide:chevron-down" class="h-4 w-4 text-muted-foreground" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>Mi cuenta</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item onclick={handleSelfServiceReset} disabled={selfServiceLoading}>
					<Icon icon="lucide:key" class="mr-2 h-4 w-4" />
					Restablecer mi contraseña
				</DropdownMenu.Item>
				<DropdownMenu.Item onclick={handleLogout}>
					<Icon icon="lucide:log-out" class="mr-2 h-4 w-4" />
					Cerrar sesión
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</header>
	<main class="flex-1 p-6 overflow-auto">
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
						<Button onclick={() => { if (selfServiceLink) navigator.clipboard.writeText(selfServiceLink); }}>
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
</div>
