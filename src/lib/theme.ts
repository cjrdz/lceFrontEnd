export const LIGHT_THEME = "light" as const;
export const DARK_THEME = "dark" as const;

export type ThemeMode = typeof LIGHT_THEME | typeof DARK_THEME;

export const LCE_THEME_STORAGE_KEY = "lce-theme" as const;

/**
 * Returns the theme that should be applied on first paint.
 * Order of precedence:
 * 1. Value previously saved in localStorage.
 * 2. OS-level `prefers-color-scheme: dark`.
 * 3. Light theme as the safe default.
 *
 * This function is safe to run in an inline browser script; it guards
 * against environments where localStorage is unavailable or blocked.
 */
export function getInitialTheme(): ThemeMode {
	if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
		try {
			const savedTheme = window.localStorage.getItem(LCE_THEME_STORAGE_KEY);
			if (savedTheme === LIGHT_THEME || savedTheme === DARK_THEME) {
				return savedTheme;
			}
		} catch {
			// localStorage may be blocked or unavailable.
		}
	}

	if (
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		return DARK_THEME;
	}

	return LIGHT_THEME;
}

/**
 * Applies the theme to the document element by adding or removing the `.dark`
 * class. This keeps the project aligned with Tailwind v4's default dark-mode
 * convention (`@custom-variant dark (&:is(.dark *));`).
 */
export function applyTheme(theme: ThemeMode): void {
	if (typeof document === "undefined") return;

	const root = document.documentElement;
	if (theme === DARK_THEME) {
		root.classList.add(DARK_THEME);
	} else {
		root.classList.remove(DARK_THEME);
	}
	root.setAttribute("data-theme", theme);
}

/**
 * Persists the theme choice and applies it. Also dispatches a `themechange`
 * event so other islands/widgets can react if needed.
 */
export function persistTheme(theme: ThemeMode): void {
	applyTheme(theme);

	if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
		try {
			window.localStorage.setItem(LCE_THEME_STORAGE_KEY, theme);
		} catch {
			// localStorage may be blocked or unavailable.
		}
	}

	if (typeof window !== "undefined") {
		window.dispatchEvent(new Event("themechange"));
	}
}
