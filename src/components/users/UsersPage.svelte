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
	import { Badge } from "$lib/components/ui/badge";
	import * as Table from "$lib/components/ui/table";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Select from "$lib/components/ui/select";
	import Icon from "@iconify/svelte";

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

	function statusVariant(status: string): Badge["variant"] {
		if (status === "active") return "secondary";
		if (status === "pending") return "default";
		return "outline";
	}

	function statusLabel(status: string) {
		if (status === "active") return "Activo";
		if (status === "pending") return "Pendiente";
		return "Inactivo";
	}
</script>

<div class="space-y-4">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<h2 class="text-2xl font-bold">Usuarios</h2>
		<div class="flex gap-2">
			<Button variant="outline" onclick={handleSync} disabled={syncing}>
				<Icon icon="lucide:refresh-cw" class={"h-4 w-4" + (syncing ? " animate-spin" : "")} />
				<span>{syncing ? "Sincronizando..." : "Sincronizar"}</span>
			</Button>
			<Button onclick={openCreate}>
				<Icon icon="lucide:plus" class="h-4 w-4" />
				<span>Nuevo usuario</span>
			</Button>
		</div>
	</div>

	{#if syncMessage}
		<div class="rounded-md border border-emerald-500/50 bg-emerald-500/10 p-3 text-sm text-emerald-700">
			{syncMessage}
		</div>
	{/if}

	<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
		<div class="flex items-center gap-2">
			<Input
				placeholder="Buscar por nombre o correo..."
				class="w-full sm:w-72"
				bind:value={search}
				onkeydown={(e: KeyboardEvent) => e.key === "Enter" && load()}
			/>
			<Button variant="outline" onclick={load}>
				<Icon icon="lucide:search" class="h-4 w-4" />
			</Button>
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
		<div class="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
			{error}
		</div>
	{/if}

	<div class="rounded-md border">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Nombre</Table.Head>
					<Table.Head>Correo</Table.Head>
					<Table.Head>Rol</Table.Head>
					<Table.Head>Estado</Table.Head>
					<Table.Head class="w-32 text-right">Acciones</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if loading}
					{#each [1, 2, 3] as _}
						<Table.Row>
							<Table.Cell colspan={5}>
								<div class="h-8 animate-pulse rounded bg-muted"></div>
							</Table.Cell>
						</Table.Row>
					{/each}
				{:else if users.length === 0}
					<Table.Row>
						<Table.Cell colspan={5} class="text-center text-muted-foreground">
							No se encontraron usuarios.
						</Table.Cell>
					</Table.Row>
				{:else}
					{#each users as user (user.id)}
						<Table.Row>
							<Table.Cell class="font-medium">{user.full_name}</Table.Cell>
							<Table.Cell>{user.email}</Table.Cell>
							<Table.Cell>{user.role?.name ?? roleLabel(user.role?.id)}</Table.Cell>
							<Table.Cell>
								<Badge variant={statusVariant(user.status)}>
									{statusLabel(user.status)}
								</Badge>
							</Table.Cell>
							<Table.Cell class="text-right">
								<div class="flex justify-end gap-1">
									{#if user.status === "pending"}
										<Button variant="ghost" size="icon" title="Aprobar" onclick={() => openApprove(user)}>
											<Icon icon="lucide:user-check" class="h-4 w-4" />
										</Button>
									{/if}
									<Button variant="ghost" size="icon" title="Editar" onclick={() => openEdit(user)}>
										<Icon icon="lucide:pencil" class="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										disabled={user.status === "pending"}
										title={user.status === "active" ? "Desactivar" : "Activar"}
										onclick={() => toggleStatus(user)}
									>
										<Icon icon={user.status === "active" ? "lucide:user-x" : "lucide:user-check"} class="h-4 w-4" />
									</Button>
									<Button variant="ghost" size="icon" title="Enlace de acceso" onclick={() => handleResetLink(user)}>
										<Icon icon="lucide:link" class="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										title="Eliminar"
										onclick={() => (deleteConfirmUser = user)}
									>
										<Icon icon="lucide:trash-2" class="h-4 w-4" />
									</Button>
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
</div>

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
