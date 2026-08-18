<script lang="ts">
	import Icon from "@iconify/svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

	interface Props {
		fullName: string;
		email: string;
		roleName: string | null;
		firmName: string;
		selfServiceLoading?: boolean;
		onLogout: () => void;
		onSelfService: () => void;
	}

	let {
		fullName,
		email,
		roleName,
		firmName,
		selfServiceLoading = false,
		onLogout,
		onSelfService,
	}: Props = $props();

	const initials = $derived(
		fullName
			.trim()
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((word) => word[0] ?? "")
			.join("")
			.toUpperCase()
	);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="group flex items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors hover:bg-accent"
	>
		<span
			class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium transition-colors group-hover:bg-accent-foreground/10"
		>
			{initials}
		</span>
		<span class="hidden text-left sm:block">
			<span class="block font-medium leading-tight">{fullName}</span>
			<span class="block text-xs leading-tight text-muted-foreground">{roleName ?? "Pendiente"}</span>
		</span>
		<Icon
			icon="lucide:chevron-down"
			class="size-4 text-muted-foreground transition-transform duration-200 group-aria-expanded:rotate-180"
		/>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content align="end" class="w-64">
		<div class="flex items-start gap-3 p-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium"
			>
				{initials}
			</span>
			<div class="min-w-0 flex-1">
				<p class="truncate text-sm font-medium">{fullName}</p>
				<p class="truncate text-xs text-muted-foreground">{email}</p>
				<div class="mt-1.5 flex flex-wrap items-center gap-1.5">
					<span class="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
						{roleName ?? "Pendiente"}
					</span>
					<span class="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
						{firmName}
					</span>
				</div>
			</div>
		</div>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={onSelfService} disabled={selfServiceLoading}>
			<Icon icon="lucide:key" class="mr-2 size-4" />
			Restablecer mi contraseña
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={onLogout} class="text-destructive focus:bg-destructive/10 focus:text-destructive">
			<Icon icon="lucide:log-out" class="mr-2 size-4" />
			Cerrar sesión
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
