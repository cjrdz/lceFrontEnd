import { $ as escape_html, Q as clsx, Z as attr, a as attr_class, l as element, m as stringify, o as attributes, u as ensure_array_like } from "./index-server_BbGYSPwV.mjs";
import { s as MorphIcon } from "./DashboardLayout_B25K0t6c.mjs";
import { Briefcase, BriefcaseBusiness, CreditCard, FileCheck, FileText, Folder, FolderOpen, Shield, ShieldCheck, UserCheck, Users, Wallet } from "lucide";
import "animejs";
//#region src/components/dashboard/HomeCard.svelte
function HomeCard($$renderer, $$props) {
	let { href, title, description, icon, hoverIcon, class: className = "", $$slots, $$events, ...rest } = $$props;
	$$renderer.push(`<a${attributes({
		href,
		class: `group/card relative rounded-xl border bg-card p-4 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:bg-muted/40 hover:shadow-md ${stringify(className)}`,
		"aria-label": title,
		...rest
	})}><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors duration-300 group-hover/card:bg-primary/10">`);
	MorphIcon($$renderer, {
		icon,
		size: 20,
		class: "text-muted-foreground transition-colors duration-300 group-hover/card:text-primary",
		spring: "snappy",
		reducedMotion: "user"
	});
	$$renderer.push(`<!----></div> <p class="mt-3 text-sm font-medium transition-colors duration-300 group-hover/card:text-foreground">${escape_html(title)}</p> <p class="mt-1 text-xs text-muted-foreground">${escape_html(description)}</p></a>`);
}
//#endregion
//#region src/lib/components/ui/TypewriterText.svelte
function TypewriterText($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { text, class: className = "", as: Tag = "span", speed = 35, delay = 0, onComplete } = $$props;
		let displayText = "";
		element($$renderer, Tag, () => {
			$$renderer.push(`${attr_class(clsx(className))}${attr("aria-label", text)}`);
		}, () => {
			$$renderer.push(`${escape_html(displayText)}`);
			if (displayText !== text) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="animate-pulse text-primary" aria-hidden="true">|</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		});
	});
}
//#endregion
//#region src/components/dashboard/HomePage.svelte
function HomePage($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { userContext } = $$props;
		let greeting = "";
		let dateLabel = "";
		let showDate = false;
		const quickAccess = [
			{
				href: "/dashboard/casos",
				title: "Casos",
				description: "Consulta y da seguimiento a los casos activos.",
				icon: Briefcase,
				hoverIcon: BriefcaseBusiness
			},
			{
				href: "/dashboard/clientes",
				title: "Clientes",
				description: "Administra los datos de contacto de tus clientes.",
				icon: Users,
				hoverIcon: UserCheck
			},
			{
				href: "/dashboard/expedientes",
				title: "Expediente",
				description: "Accede a los documentos y expedientes digitales.",
				icon: FolderOpen,
				hoverIcon: Folder
			},
			{
				href: "/dashboard/pagos",
				title: "Pagos",
				description: "Registra y da seguimiento a los pagos recibidos.",
				icon: CreditCard,
				hoverIcon: Wallet
			},
			{
				href: "/dashboard/facturas",
				title: "Facturas",
				description: "Emite y controla las facturas del despacho.",
				icon: FileText,
				hoverIcon: FileCheck
			},
			{
				href: "/dashboard/usuarios",
				title: "Usuarios",
				description: "Gestiona el acceso y los roles del equipo.",
				icon: Shield,
				hoverIcon: ShieldCheck
			}
		];
		$$renderer.push(`<div class="space-y-6"><div>`);
		TypewriterText($$renderer, {
			text: greeting,
			as: "h2",
			class: "text-2xl font-bold",
			speed: 30,
			onComplete: () => showDate = true
		});
		$$renderer.push(`<!----> `);
		if (showDate) {
			$$renderer.push("<!--[0-->");
			TypewriterText($$renderer, {
				text: dateLabel,
				as: "p",
				class: "mt-1 text-sm text-muted-foreground",
				speed: 20,
				delay: 150
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <section><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
		const each_array = ensure_array_like(quickAccess);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			HomeCard($$renderer, {
				href: item.href,
				title: item.title,
				description: item.description,
				icon: item.icon,
				hoverIcon: item.hoverIcon
			});
		}
		$$renderer.push(`<!--]--></div></section></div>`);
	});
}
//#endregion
export { HomePage as t };
