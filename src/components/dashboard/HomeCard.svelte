<script lang="ts">
	import { MorphIcon, type MorphHandle } from "morphicons/svelte";
	import type { IconInput } from "morphicons/svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLAnchorElement> {
		href: string;
		title: string;
		description: string;
		icon: IconInput;
		hoverIcon: IconInput;
	}

	let { href, title, description, icon, hoverIcon, class: className = "", ...rest }: Props = $props();

	let morph = $state<MorphHandle>();

	function handleEnter() {
		morph?.morphTo(hoverIcon);
	}

	function handleLeave() {
		morph?.morphTo(icon);
	}
</script>

<a
	{href}
	class="group/card relative rounded-xl border bg-card p-4 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:bg-muted/40 hover:shadow-md {className}"
	aria-label={title}
	onmouseenter={handleEnter}
	onmouseleave={handleLeave}
	{...rest}
>
	<div
		class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors duration-300 group-hover/card:bg-primary/10"
	>
		<MorphIcon
			bind:this={morph}
			{icon}
			size={20}
			class="text-muted-foreground transition-colors duration-300 group-hover/card:text-primary"
			spring="snappy"
			reducedMotion="user"
		/>
	</div>
	<p class="mt-3 text-sm font-medium transition-colors duration-300 group-hover/card:text-foreground">
		{title}
	</p>
	<p class="mt-1 text-xs text-muted-foreground">{description}</p>
</a>
