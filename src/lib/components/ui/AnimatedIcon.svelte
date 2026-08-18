<script lang="ts">
	import Icon from "@iconify/svelte";
	import { animate } from "animejs";
	import type { ComponentProps } from "svelte";

	interface Props extends ComponentProps<typeof Icon> {
		scale?: number;
		duration?: number;
		lift?: number;
	}

	let {
		scale = 1.12,
		duration = 200,
		lift = -2,
		class: className = "",
		...iconProps
	}: Props = $props();

	let wrapper = $state<HTMLSpanElement | null>(null);
	let reducedMotion = $state(false);

	function checkReducedMotion() {
		if (typeof window === "undefined") return;
		reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}

	function handleEnter() {
		if (reducedMotion || !wrapper) return;
		animate(wrapper, {
			scale,
			translateY: lift,
			duration,
			ease: "outBack(1.4)",
		});
	}

	function handleLeave() {
		if (reducedMotion || !wrapper) return;
		animate(wrapper, {
			scale: 1,
			translateY: 0,
			duration,
			ease: "outQuad",
		});
	}

	$effect(() => {
		checkReducedMotion();
	});
</script>

<span
	bind:this={wrapper}
	class="inline-flex items-center justify-center {className}"
	role="presentation"
	onmouseenter={handleEnter}
	onmouseleave={handleLeave}
>
	<Icon {...iconProps} class="size-full" />
</span>
