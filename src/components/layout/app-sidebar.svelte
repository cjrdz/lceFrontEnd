<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "@iconify/svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AnimatedSidebarTrigger from "./AnimatedSidebarTrigger.svelte";
	import type { UserContext } from "$lib/stores/auth";

	interface NavItem {
		title: string;
		url: string;
		icon: string;
		requiredRole?: string;
	}

	interface NavGroup {
		label: string;
		items: NavItem[];
	}

	interface Props {
		userContext: UserContext;
		onLogout: () => void;
	}

	let { userContext, onLogout }: Props = $props();

	const navGroups: NavGroup[] = [
		{
			label: "",
			items: [{ title: "Inicio", url: "/dashboard", icon: "lucide:home" }],
		},
		{
			label: "Gestión",
			items: [
				{ title: "Categorías", url: "#", icon: "lucide:tag" },
				{ title: "Casos", url: "#", icon: "lucide:briefcase" },
				{ title: "Clientes", url: "#", icon: "lucide:users" },
				{ title: "Expediente", url: "#", icon: "lucide:folder-open" },
				{ title: "Embargos", url: "#", icon: "lucide:gavel" },
				{ title: "Catálogo", url: "#", icon: "lucide:book-open" },
				{ title: "Edictos", url: "#", icon: "lucide:scroll-text" },
			],
		},
		{
			label: "Analítica",
			items: [
				{ title: "Analíticas", url: "#", icon: "lucide:bar-chart-3" },
				{ title: "Reportes", url: "#", icon: "lucide:file-bar-chart" },
				{ title: "Alertas", url: "#", icon: "lucide:bell" },
				{ title: "Historial", url: "#", icon: "lucide:clock" },
			],
		},
		{
			label: "Finanzas",
			items: [
				{ title: "Pagos", url: "#", icon: "lucide:credit-card" },
				{ title: "Facturas", url: "#", icon: "lucide:file-text" },
				{ title: "Costos", url: "#", icon: "lucide:coins" },
			],
		},
		{
			label: "Administración",
			items: [
				{ title: "Usuarios", url: "/dashboard/usuarios", icon: "lucide:shield", requiredRole: "Admin" },
				{ title: "Despacho", url: "#", icon: "lucide:building-2" },
				{ title: "Configuración", url: "#", icon: "lucide:settings" },
			],
		},
	];

	let currentPath = $state("/dashboard");

	onMount(() => {
		currentPath = window.location.pathname;
	});

	const visibleGroups = $derived.by(() => {
		const visible: NavGroup[] = [];
		for (const group of navGroups) {
			const items = group.items.filter(
				(item) => !item.requiredRole || item.requiredRole === userContext.role?.name
			);
			if (items.length > 0) {
				visible.push({ ...group, items });
			}
		}
		return visible;
	});

	function isActive(item: NavItem) {
		return item.url !== "#" && currentPath === item.url;
	}
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Header class="h-14 px-2">
		<div class="flex h-full items-center gap-2 group-data-[collapsible=icon]:justify-center">
			<div class="flex min-w-0 flex-1 flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
				<span class="text-sm font-bold leading-tight">LegalCore</span>
				<span class="truncate text-[11px] leading-tight text-sidebar-foreground/60">
					{userContext.firm.name}
				</span>
			</div>
			<AnimatedSidebarTrigger class="shrink-0 max-md:hidden" />
		</div>
	</Sidebar.Header>

	<Sidebar.Content class="gap-0.5 p-1.5">
		{#each visibleGroups as group (group.label)}
			<Sidebar.Group class="p-0">
				{#if group.label}
					<Sidebar.GroupLabel class="text-[11px] uppercase tracking-wider">
						{group.label}
					</Sidebar.GroupLabel>
				{/if}
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={isActive(item)} tooltipContent={item.title}>
									{#snippet child({ props })}
										<a {...props} href={item.url} aria-label={item.title} title={item.title}>
											<Icon
												icon={item.icon}
												class="size-4 shrink-0 transition-transform duration-200 ease-out group-hover/menu-button:scale-110 group-hover/menu-button:-translate-y-0.5"
											/>
											<span class="truncate group-data-[collapsible=icon]:hidden">
												{item.title}
											</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>

	<Sidebar.Footer class="border-t border-sidebar-border p-1.5 pt-2">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					tooltipContent="Cerrar sesión"
					onclick={onLogout}
					class="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
					aria-label="Cerrar sesión"
					title="Cerrar sesión"
				>
					<Icon
						icon="lucide:log-out"
						class="size-4 shrink-0 transition-transform duration-200 ease-out group-hover/menu-button:scale-110 group-hover/menu-button:-translate-y-0.5"
					/>
					<span class="truncate group-data-[collapsible=icon]:hidden">Cerrar sesión</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>

	<Sidebar.Rail />
</Sidebar.Root>
