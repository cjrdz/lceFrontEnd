<script lang="ts">
	import Icon from "@iconify/svelte";
	import { useSidebar } from "$lib/components/ui/sidebar/index.js";

	const sidebar = useSidebar();
</script>

<button
	type="button"
	aria-label="Abrir menú"
	onclick={() => sidebar.setOpenMobile(true)}
	class="inline-flex size-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-muted"
>
	<Icon icon="lucide:menu" class="size-4" />
</button>
