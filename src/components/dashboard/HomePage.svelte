<script lang="ts">
	import { onMount } from "svelte";
	import type { UserContext } from "$lib/stores/auth";
	import {
		Briefcase,
		BriefcaseBusiness,
		CreditCard,
		FileCheck,
		FileText,
		Folder,
		FolderOpen,
		Shield,
		ShieldCheck,
		UserCheck,
		Users,
		Wallet,
	} from "lucide";
	import HomeCard from "./HomeCard.svelte";
	import TypewriterText from "$lib/components/ui/TypewriterText.svelte";

	let { userContext }: { userContext: UserContext } = $props();

	let greeting = $state("");
	let firstName = $state("");
	let dateLabel = $state("");
	let showDate = $state(false);

	function capitalizeFirst(value: string): string {
		if (!value) return value;
		return value.charAt(0).toUpperCase() + value.slice(1);
	}

	const quickAccess = [
		{
			href: "/dashboard/casos",
			title: "Casos",
			description: "Consulta y da seguimiento a los casos activos.",
			icon: Briefcase,
			hoverIcon: BriefcaseBusiness,
		},
		{
			href: "/dashboard/clientes",
			title: "Clientes",
			description: "Administra los datos de contacto de tus clientes.",
			icon: Users,
			hoverIcon: UserCheck,
		},
		{
			href: "/dashboard/expedientes",
			title: "Expediente",
			description: "Accede a los documentos y expedientes digitales.",
			icon: FolderOpen,
			hoverIcon: Folder,
		},
		{
			href: "/dashboard/pagos",
			title: "Pagos",
			description: "Registra y da seguimiento a los pagos recibidos.",
			icon: CreditCard,
			hoverIcon: Wallet,
		},
		{
			href: "/dashboard/facturas",
			title: "Facturas",
			description: "Emite y controla las facturas del despacho.",
			icon: FileText,
			hoverIcon: FileCheck,
		},
		{
			href: "/dashboard/usuarios",
			title: "Usuarios",
			description: "Gestiona el acceso y los roles del equipo.",
			icon: Shield,
			hoverIcon: ShieldCheck,
		},
	];

	onMount(() => {
		const now = new Date();
		const hour = now.getHours();
		greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
		firstName = userContext.user.full_name.split(" ")[0] ?? "";
		dateLabel = capitalizeFirst(
			new Intl.DateTimeFormat("es-SV", {
				weekday: "long",
				day: "numeric",
				month: "long",
				year: "numeric",
			}).format(now)
		);
	});
</script>

<div class="space-y-6">
	<div>
		<TypewriterText
			text={greeting && firstName ? `${greeting}, ${firstName}` : greeting}
			as="h2"
			class="text-2xl font-bold"
			speed={30}
			onComplete={() => (showDate = true)}
		/>
		{#if showDate}
			<TypewriterText
				text={dateLabel}
				as="p"
				class="mt-1 text-sm text-muted-foreground"
				speed={20}
				delay={150}
			/>
		{/if}
	</div>

	<section>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
			{#each quickAccess as item (item.href)}
				<HomeCard
					href={item.href}
					title={item.title}
					description={item.description}
					icon={item.icon}
					hoverIcon={item.hoverIcon}
				/>
			{/each}
		</div>
	</section>
</div>
