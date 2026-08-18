<script lang="ts">
	import { onMount } from "svelte";
	import ThemeToggle from "./ThemeToggle.svelte";

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<ThemeToggle />
{:else}
	<span class="inline-flex size-8 shrink-0" aria-hidden="true"></span>
{/if}
