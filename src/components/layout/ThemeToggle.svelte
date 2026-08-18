<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { MorphIcon } from "morphicons/svelte";
	import { Moon, Sun } from "lucide";
	import { animate } from "animejs";
	import {
		DARK_THEME,
		LIGHT_THEME,
		persistTheme,
		type ThemeMode,
	} from "$lib/theme";

	function getInitialThemeFromDom(): ThemeMode {
		if (typeof document === "undefined") return LIGHT_THEME;
		return document.documentElement.classList.contains(DARK_THEME)
			? DARK_THEME
			: LIGHT_THEME;
	}

	let theme = $state<ThemeMode>(getInitialThemeFromDom());
	let button = $state<HTMLButtonElement | null>(null);
	let reducedMotion = $state(false);

	function checkReducedMotion() {
		if (typeof window === "undefined") return;
		reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}

	function toggleTheme() {
		theme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
		persistTheme(theme);

		if (button && !reducedMotion) {
			animate(button, {
				rotate: "+=180",
				scale: [1, 0.85, 1],
				duration: 450,
				ease: "outBack(1.7)",
			});
		}
	}

	$effect(() => {
		checkReducedMotion();
	});
</script>

<Button
	bind:ref={button}
	variant="ghost"
	size="icon"
	type="button"
	class="shrink-0"
	onclick={toggleTheme}
	aria-label={theme === LIGHT_THEME ? "Cambiar a tema oscuro" : "Cambiar a tema claro"}
>
	<MorphIcon
		icon={theme === LIGHT_THEME ? Sun : Moon}
		class="size-5"
		spring="bouncy"
		reducedMotion="user"
	/>
</Button>
