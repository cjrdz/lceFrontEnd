<script lang="ts">
	import { onMount } from "svelte";
	import {
		listUsers,
		listRoles,
		createUser,
		updateUser,
		approveUser,
		updateUserStatus,
		deleteUser,
		generatePasswordResetLink,
		syncUsers,
		type ApiUser,
		type ApiRole,
	} from "$lib/api/users";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Table from "$lib/components/ui/table";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Select from "$lib/components/ui/select";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { cn } from "$lib/utils.js";
	import Icon from "@iconify/svelte";
	import AnimatedIcon from "$lib/components/ui/AnimatedIcon.svelte";

	let users = $state<ApiUser[]>([]);
	let roles = $state<ApiRole[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let statusFilter = $state<string>("all");
	let search = $state("");

	let dialogOpen = $state(false);
	let editingUser = $state<ApiUser | null>(null);
	let formEmail = $state("");
	let formFullName = $state("");
	let formRoleId = $state<string>("");
	let saving = $state(false);
	let formError = $state<string | null>(null);

	let approveDialogOpen = $state(false);
	let approvalUser = $state<ApiUser | null>(null);
	let approveRoleId = $state<string>("");
	let approveSaving = $state(false);
	let approveError = $state<string | null>(null);

	let linkResult = $state<string | null>(null);
	let deleteConfirmUser = $state<ApiUser | null>(null);
	let syncing = $state(false);
	let syncMessage = $state<string | null>(null);

	async function load() {
		loading = true;
		error = null;
		try {
			const status = statusFilter === "all" ? "" : statusFilter;
			const [usersResp, rolesResp] = await Promise.all([
				listUsers(status, search),
				listRoles(),
			]);
			users = usersResp.users;
			roles = rolesResp;
		} catch (e) {
			error = e instanceof Error ? e.message : "Error al cargar usuarios";
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		load();
	});

	function openCreate() {
		editingUser = null;
		formEmail = "";
		formFullName = "";
		formRoleId = roles[0]?.id ? String(roles[0].id) : "";
		formError = null;
		dialogOpen = true;
	}

	function openEdit(user: ApiUser) {
		editingUser = user;
		formEmail = user.email;
		formFullName = user.full_name;
		formRoleId = user.role?.id ? String(user.role.id) : "";
		formError = null;
		dialogOpen = true;
	}

	function closeDialog() {
		dialogOpen = false;
		editingUser = null;
	}

	function openApprove(user: ApiUser) {
		approvalUser = user;
		approveRoleId = user.role?.id ? String(user.role.id) : "";
		approveError = null;
		approveDialogOpen = true;
	}

	function closeApproveDialog() {
		approveDialogOpen = false;
		approvalUser = null;
		approveRoleId = "";
	}

	async function handleSave() {
		saving = true;
		formError = null;
		try {
			const roleId = Number(formRoleId);
			if (!formEmail || !formFullName || (!editingUser && !roleId)) {
				formError = "Completa todos los campos";
				return;
			}
			if (editingUser) {
				await updateUser(editingUser.id, {
					email: formEmail,
					full_name: formFullName,
					role_id: roleId,
				});
			} else {
				const result = await createUser({
					email: formEmail,
					full_name: formFullName,
					role_id: roleId,
				});
				linkResult = result.password_setup_link;
			}
			closeDialog();
			await load();
		} catch (e) {
			formError = e instanceof Error ? e.message : "Error al guardar";
		} finally {
			saving = false;
		}
	}

	async function handleApprove() {
		if (!approvalUser || approvalUser.status !== "pending") return;
		const roleId = Number(approveRoleId);
		if (!roleId) {
			approveError = "Selecciona un rol antes de aprobar";
			return;
		}
		approveSaving = true;
		approveError = null;
		try {
			await approveUser(approvalUser.id, roleId);
			closeApproveDialog();
			await load();
		} catch (e) {
			approveError = e instanceof Error ? e.message : "Error al aprobar";
		} finally {
			approveSaving = false;
		}
	}

	async function toggleStatus(user: ApiUser) {
		const next = user.status === "active" ? "inactive" : "active";
		try {
			await updateUserStatus(user.id, next);
			await load();
		} catch (e) {
			error = e instanceof Error ? e.message : "Error al cambiar estado";
		}
	}

	async function handleDelete() {
		if (!deleteConfirmUser) return;
		try {
			await deleteUser(deleteConfirmUser.id);
			deleteConfirmUser = null;
			await load();
		} catch (e) {
			error = e instanceof Error ? e.message : "Error al eliminar";
		}
	}

	async function handleResetLink(user: ApiUser) {
		try {
			linkResult = await generatePasswordResetLink(user.id);
		} catch (e) {
			error = e instanceof Error ? e.message : "Error al generar enlace";
		}
	}

	async function handleSync() {
		syncing = true;
		syncMessage = null;
		try {
			const result = await syncUsers();
			syncMessage = `Sincronización completada: ${result.imported} usuario(s) importado(s).`;
			await load();
		} catch (e) {
			error = e instanceof Error ? e.message : "Error al sincronizar usuarios";
		} finally {
			syncing = false;
		}
	}

	function roleLabel(id?: number) {
		if (!id) return "—";
		return roles.find((r) => r.id === id)?.name ?? "—";
	}

	function statusLabel(status: string) {
		if (status === "active") return "Activo";
		if (status === "pending") return "Pendiente";
		return "Inactivo";
	}

	function statusClasses(status: string) {
		if (status === "active") return "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20";
		if (status === "pending") return "bg-amber-500/10 text-amber-700 ring-amber-600/20";
		return "bg-zinc-500/10 text-zinc-600 ring-zinc-600/20";
	}

	function statusDotClass(status: string) {
		if (status === "active") return "bg-emerald-500";
		if (status === "pending") return "bg-amber-500";
		return "bg-zinc-400";
	}

	function initials(name: string) {
		return name
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0]?.toUpperCase() ?? "")
			.join("");
	}

	const avatarColors = [
		"bg-sky-100 text-sky-700",
		"bg-violet-100 text-violet-700",
		"bg-rose-100 text-rose-700",
		"bg-emerald-100 text-emerald-700",
		"bg-amber-100 text-amber-700",
		"bg-teal-100 text-teal-700",
	];

	function avatarColor(id: number) {
		return avatarColors[id % avatarColors.length];
	}

	type RowAction = {
		key: string;
		label: string;
		icon: string;
		disabled?: boolean;
		destructive?: boolean;
		onClick: () => void;
	};

	function rowActions(user: ApiUser): RowAction[] {
		return [
			user.status === "pending" && {
				key: "approve",
				label: "Aprobar",
				icon: "lucide:user-check",
				onClick: () => openApprove(user),
			},
			{
				key: "edit",
				label: "Editar",
				icon: "lucide:pencil",
				onClick: () => openEdit(user),
			},
			{
				key: "toggle",
				label: user.status === "active" ? "Desactivar" : "Activar",
				icon: user.status === "active" ? "lucide:user-x" : "lucide:user-check",
				disabled: user.status === "pending",
				onClick: () => toggleStatus(user),
			},
			{
				key: "link",
				label: "Enlace de acceso",
				icon: "lucide:link",
				onClick: () => handleResetLink(user),
			},
			{
				key: "delete",
				label: "Eliminar",
				icon: "lucide:trash-2",
				destructive: true,
				onClick: () => (deleteConfirmUser = user),
			},
		].filter(Boolean) as RowAction[];
	}
</script>

<Tooltip.Provider>
<div class="space-y-4">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h2 class="text-2xl font-bold">Usuarios</h2>
			<p class="mt-1 text-sm text-muted-foreground">
				Administra los usuarios del despacho, sus roles y su estado de acceso.
			</p>
		</div>
		<div class="flex gap-2">
			<Button variant="outline" onclick={handleSync} disabled={syncing}>
				<Icon icon="lucide:refresh-cw" class={"h-4 w-4" + (syncing ? " animate-spin" : "")} />
				<span>{syncing ? "Sincronizando..." : "Sincronizar"}</span>
			</Button>
			<Button onclick={openCreate}>
				<AnimatedIcon icon="lucide:plus" class="h-4 w-4" />
				<span>Nuevo usuario</span>
			</Button>
		</div>
	</div>

	{#if syncMessage}
		<div class="flex items-start gap-2 rounded-md border border-emerald-500/50 bg-emerald-500/10 p-3 text-sm text-emerald-700">
			<Icon icon="lucide:check-circle-2" class="mt-0.5 h-4 w-4 shrink-0" />
			<span>{syncMessage}</span>
		</div>
	{/if}

	<div class="overflow-hidden rounded-xl border bg-card shadow-sm">
		<div class="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
			<div class="relative w-full sm:w-72">
				<Icon
					icon="lucide:search"
					class="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
				/>
				<Input
					placeholder="Buscar por nombre o correo..."
					class="w-full pl-9"
					bind:value={search}
					onkeydown={(e: KeyboardEvent) => e.key === "Enter" && load()}
				/>
			</div>
		<Select.Root
			type="single"
			value={statusFilter}
			onValueChange={(v: string) => {
				statusFilter = v;
				load();
			}}
		>
			<Select.Trigger class="w-full sm:w-40">
					<span>
						{statusFilter === "all" ? "Todos" : statusFilter === "active" ? "Activos" : statusFilter === "pending" ? "Pendientes" : "Inactivos"}
					</span>
			</Select.Trigger>
			<Select.Content>
						<Select.Group>
							<Select.Item value="all" label="Todos">Todos</Select.Item>
							<Select.Item value="active" label="Activos">Activos</Select.Item>
							<Select.Item value="inactive" label="Inactivos">Inactivos</Select.Item>
							<Select.Item value="pending" label="Pendientes">Pendientes</Select.Item>
						</Select.Group>
			</Select.Content>
		</Select.Root>
		</div>

		{#if error}
			<div class="flex items-start gap-2 border-b border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
				<Icon icon="lucide:alert-circle" class="mt-0.5 h-4 w-4 shrink-0" />
				<span>{error}</span>
			</div>
		{/if}

		<Table.Root>
			<Table.Header>
				<Table.Row class="bg-muted/40">
					<Table.Head class="px-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">Usuario</Table.Head>
					<Table.Head class="px-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">Rol</Table.Head>
					<Table.Head class="px-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">Estado</Table.Head>
					<Table.Head class="w-12 px-4 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">Acciones</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if loading}
					{#each [1, 2, 3] as _}
						<Table.Row>
							<Table.Cell class="px-4">
								<div class="flex items-center gap-3">
									<Skeleton class="size-9 rounded-full" />
									<div class="space-y-2">
										<Skeleton class="h-4 w-40" />
										<Skeleton class="h-3 w-56" />
									</div>
								</div>
							</Table.Cell>
							<Table.Cell class="px-4"><Skeleton class="h-4 w-20" /></Table.Cell>
							<Table.Cell class="px-4"><Skeleton class="h-5 w-20 rounded-full" /></Table.Cell>
							<Table.Cell class="px-4 text-right"><Skeleton class="ml-auto h-8 w-8 rounded-md" /></Table.Cell>
						</Table.Row>
					{/each}
				{:else if users.length === 0}
					<Table.Row>
						<Table.Cell colspan={4} class="px-4">
							<div class="flex flex-col items-center justify-center gap-2 py-12 text-center">
								<Icon icon="lucide:users" class="h-10 w-10 text-muted-foreground opacity-40" />
								<p class="text-sm font-medium text-foreground">No se encontraron usuarios</p>
								<p class="text-xs text-muted-foreground">Ajusta los filtros de búsqueda o crea un nuevo usuario.</p>
							</div>
						</Table.Cell>
					</Table.Row>
				{:else}
					{#each users as user (user.id)}
						<Table.Row>
							<Table.Cell class="px-4">
								<div class="flex items-center gap-3">
									<Avatar.Root class="size-9">
										<Avatar.Fallback class={avatarColor(user.id)}>
											{initials(user.full_name)}
										</Avatar.Fallback>
									</Avatar.Root>
									<div class="min-w-0">
										<p class="truncate text-sm font-medium">{user.full_name}</p>
										<p class="truncate text-xs text-muted-foreground">{user.email}</p>
									</div>
								</div>
							</Table.Cell>
							<Table.Cell class="px-4 text-sm">{user.role?.name ?? roleLabel(user.role?.id)}</Table.Cell>
							<Table.Cell class="px-4">
								<span
									class={cn(
										"inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
										statusClasses(user.status)
									)}
								>
									<span class={cn("h-1.5 w-1.5 rounded-full", statusDotClass(user.status))}></span>
									{statusLabel(user.status)}
								</span>
							</Table.Cell>
							<Table.Cell class="px-4 text-right">
								<div class="hidden items-center justify-end gap-1 md:flex">
									{#each rowActions(user) as action (action.key)}
										<Tooltip.Root>
											<Tooltip.Trigger>
												{#snippet child({ props })}
										<Button
											{...props}
											variant="ghost"
											size="icon"
											class={
												"h-8 w-8" +
												(action.destructive ? " text-destructive hover:text-destructive" : "")
											}
											disabled={action.disabled}
											onclick={action.onClick}
										>
											<AnimatedIcon icon={action.icon} class="h-4 w-4" />
											<span class="sr-only">{action.label}</span>
										</Button>
												{/snippet}
											</Tooltip.Trigger>
											<Tooltip.Content>{action.label}</Tooltip.Content>
										</Tooltip.Root>
									{/each}
								</div>
								<div class="flex justify-end md:hidden">
									<DropdownMenu.Root>
										<DropdownMenu.Trigger>
											{#snippet child({ props })}
												<Button {...props} variant="ghost" size="icon" class="h-8 w-8">
													<Icon icon="lucide:more-horizontal" class="h-4 w-4" />
													<span class="sr-only">Abrir menú</span>
												</Button>
											{/snippet}
										</DropdownMenu.Trigger>
										<DropdownMenu.Content align="end" class="w-44">
											{#each rowActions(user) as action, i (action.key)}
												{#if action.destructive && i > 0}
													<DropdownMenu.Separator />
												{/if}
												<DropdownMenu.Item
													disabled={action.disabled}
													onclick={action.onClick}
													class={action.destructive ? "text-destructive focus:bg-destructive/10 focus:text-destructive" : ""}
												>
													<Icon icon={action.icon} class="mr-2 h-4 w-4" />
													{action.label}
												</DropdownMenu.Item>
											{/each}
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
</div>
</Tooltip.Provider>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="sm:max-w-md">
		<div class="flex flex-col items-center text-center space-y-3 py-2">
			<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
				<Icon icon={editingUser ? "lucide:user-cog" : "lucide:user-plus"} class="h-6 w-6" />
			</div>
			<Dialog.Title class="text-2xl font-semibold tracking-tight">
				{editingUser ? "Editar usuario" : "Nuevo usuario"}
			</Dialog.Title>
			<Dialog.Description>
				{editingUser
					? "Actualiza los datos del usuario."
					: "Crea un usuario nuevo. Se generará un enlace de configuración de contraseña."}
			</Dialog.Description>
		</div>

		{#if formError}
			<div class="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
				{formError}
			</div>
		{/if}

		<div class="space-y-4 py-2">
			<div class="space-y-2">
				<Label for="email" class="text-sm font-medium">Correo electrónico</Label>
				<Input id="email" type="email" bind:value={formEmail} autocomplete="off" data-1p-ignore data-lpignore="true" class="h-10" />
			</div>
			<div class="space-y-2">
				<Label for="full_name" class="text-sm font-medium">Nombre completo</Label>
				<Input id="full_name" bind:value={formFullName} autocomplete="off" data-1p-ignore data-lpignore="true" class="h-10" />
			</div>
			<div class="space-y-2">
				<Label for="role" class="text-sm font-medium">Rol</Label>
				<Select.Root
					type="single"
					value={formRoleId}
					onValueChange={(v: string) => (formRoleId = v)}
				>
					<Select.Trigger id="role" class="w-full h-10">
						<span>{formRoleId ? roleLabel(Number(formRoleId)) : "Seleccionar rol"}</span>
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each roles as role (role.id)}
								<Select.Item value={String(role.id)} label={role.name}>
									{role.name}
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<Dialog.Footer class="flex flex-col-reverse sm:flex-row gap-2 pt-2">
			<Button variant="outline" onclick={closeDialog}>Cancelar</Button>
			{#if editingUser}
				<Button variant="secondary" onclick={() => editingUser && handleResetLink(editingUser)} disabled={saving}>
					<Icon icon="lucide:link" class="mr-2 h-4 w-4" />
					Restablecer contraseña
				</Button>
			{/if}
			<Button onclick={handleSave} disabled={saving}>
				{saving ? "Guardando..." : "Guardar"}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={approveDialogOpen}>
	<Dialog.Content class="sm:max-w-md">
		<div class="flex flex-col items-center text-center space-y-3 py-2">
			<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
				<Icon icon="lucide:user-check" class="h-6 w-6" />
			</div>
			<Dialog.Title class="text-2xl font-semibold tracking-tight">Aprobar acceso</Dialog.Title>
			<Dialog.Description>
				Asigna un rol para activar la cuenta de <strong>{approvalUser?.email}</strong>.
			</Dialog.Description>
		</div>

		{#if approveError}
			<div class="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
				{approveError}
			</div>
		{/if}

		<div class="space-y-4 py-2">
			<div class="space-y-2">
				<Label class="text-sm font-medium">Correo electrónico</Label>
				<Input value={approvalUser?.email ?? ""} disabled class="h-10 bg-muted" />
			</div>
			<div class="space-y-2">
				<Label class="text-sm font-medium">Nombre completo</Label>
				<Input value={approvalUser?.full_name ?? ""} disabled class="h-10 bg-muted" />
			</div>
			<div class="space-y-2">
				<Label for="approve-role" class="text-sm font-medium">Rol</Label>
				<Select.Root
					type="single"
					value={approveRoleId}
					onValueChange={(v: string) => (approveRoleId = v)}
				>
					<Select.Trigger id="approve-role" class="w-full h-10">
						<span>{approveRoleId ? roleLabel(Number(approveRoleId)) : "Seleccionar rol"}</span>
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each roles as role (role.id)}
								<Select.Item value={String(role.id)} label={role.name}>
									{role.name}
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<Dialog.Footer class="flex flex-col-reverse sm:flex-row gap-2 pt-2">
			<Button variant="outline" onclick={closeApproveDialog}>Cancelar</Button>
			<Button onclick={handleApprove} disabled={approveSaving}>
				{#if approveSaving}
					<Icon icon="lucide:loader-circle" class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{approveSaving ? "Aprobando..." : "Aprobar"}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root open={!!linkResult} onOpenChange={(open: boolean) => { if (!open) linkResult = null; }}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Enlace de configuración</Dialog.Title>
			<Dialog.Description>
				Comparte este enlace una sola vez para que el usuario configure su contraseña.
			</Dialog.Description>
		</Dialog.Header>
		<div class="py-4">
			<Input value={linkResult ?? ""} readonly class="font-mono text-xs" />
		</div>
		<Dialog.Footer>
			<Button onclick={() => { if (linkResult) navigator.clipboard.writeText(linkResult); }}>
				Copiar
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root open={!!deleteConfirmUser} onOpenChange={(open: boolean) => { if (!open) deleteConfirmUser = null; }}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Confirmar eliminación</Dialog.Title>
			<Dialog.Description>
				¿Eliminar permanentemente a {deleteConfirmUser?.full_name}? El usuario debe estar inactivo.
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button variant="outline" onclick={() => (deleteConfirmUser = null)}>Cancelar</Button>
			<Button variant="destructive" onclick={handleDelete}>
				Eliminar
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
