<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { useSidebar } from "$lib/components/ui/sidebar/index.js";
	import { MorphIcon } from "morphicons/svelte";
	import { PanelLeft, PanelRight } from "lucide";
	import { animate } from "animejs";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	interface Props extends Omit<ComponentProps<typeof Button>, "onclick"> {
		class?: string;
	}

	let { class: className = "", ...restProps }: Props = $props();

	const sidebar = useSidebar();
	let button = $state<HTMLButtonElement | null>(null);
	let reducedMotion = $state(false);

	function checkReducedMotion() {
		if (typeof window === "undefined") return;
		reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}

	function handleToggle() {
		sidebar.toggle();

		if (button && !reducedMotion) {
			animate(button, {
				rotate: "+=180",
				scale: [1, 0.9, 1],
				duration: 350,
				ease: "outBack(1.5)",
			});
		}
	}

	$effect(() => {
		checkReducedMotion();
	});
</script>

<Button
	bind:ref={button}
	data-sidebar="trigger"
	data-slot="sidebar-trigger"
	variant="ghost"
	size="icon-sm"
	type="button"
	aria-label={sidebar.open ? "Contraer barra lateral" : "Expandir barra lateral"}
	class={cn("shrink-0", className)}
	onclick={handleToggle}
	{...restProps}
>
	<MorphIcon
		icon={sidebar.open ? PanelRight : PanelLeft}
		class="size-4"
		spring="snappy"
		reducedMotion="user"
	/>
	<span class="sr-only">Alternar barra lateral</span>
</Button>
