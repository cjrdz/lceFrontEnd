<script lang="ts">
	import { animate } from "animejs";

	interface Props {
		text: string;
		class?: string;
		as?: "h1" | "h2" | "h3" | "p" | "span";
		speed?: number;
		delay?: number;
		onComplete?: () => void;
	}

	let {
		text,
		class: className = "",
		as: Tag = "span",
		speed = 35,
		delay = 0,
		onComplete,
	}: Props = $props();

	let displayText = $state("");

	function type(newText: string) {
		if (!newText) {
			displayText = "";
			return;
		}

		displayText = "";
		const progress = { value: 0 };

		animate(progress, {
			value: newText.length,
			duration: newText.length * speed,
			delay,
			ease: "linear",
			onUpdate: () => {
				displayText = newText.slice(0, Math.max(0, Math.round(progress.value)));
			},
			onComplete: () => {
				displayText = newText;
				onComplete?.();
			},
		});
	}

	$effect(() => {
		type(text);
	});
</script>

<svelte:element this={Tag} class={className} aria-label={text}>
	{displayText}{#if displayText !== text}<span class="animate-pulse text-primary" aria-hidden="true">|</span>{/if}
</svelte:element>
