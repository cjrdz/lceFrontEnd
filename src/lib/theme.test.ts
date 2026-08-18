import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	DARK_THEME,
	LIGHT_THEME,
	LCE_THEME_STORAGE_KEY,
	applyTheme,
	getInitialTheme,
	persistTheme,
} from "./theme";

describe("theme utilities", () => {
	let storage: Record<string, string> = {};
	let matchMediaMatches = false;

	beforeEach(() => {
		storage = {};
		matchMediaMatches = false;

		vi.stubGlobal("localStorage", {
			getItem: vi.fn((key: string) => storage[key] ?? null),
			setItem: vi.fn((key: string, value: string) => {
				storage[key] = value;
			}),
			removeItem: vi.fn((key: string) => {
				delete storage[key];
			}),
		});

		vi.stubGlobal(
			"matchMedia",
			vi.fn((query: string) => ({
				matches: query === "(prefers-color-scheme: dark)" ? matchMediaMatches : false,
				media: query,
				onchange: null,
				addEventListener: () => {},
				removeEventListener: () => {},
				addListener: () => {},
				removeListener: () => {},
				dispatchEvent: () => false,
			}))
		);

		document.documentElement.classList.remove(DARK_THEME);
		document.documentElement.removeAttribute("data-theme");
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	describe("getInitialTheme", () => {
		it("returns light theme by default", () => {
			expect(getInitialTheme()).toBe(LIGHT_THEME);
		});

		it("returns dark theme when localStorage has dark", () => {
			storage[LCE_THEME_STORAGE_KEY] = DARK_THEME;
			expect(getInitialTheme()).toBe(DARK_THEME);
		});

		it("returns light theme when localStorage has light", () => {
			storage[LCE_THEME_STORAGE_KEY] = LIGHT_THEME;
			expect(getInitialTheme()).toBe(LIGHT_THEME);
		});

		it("ignores invalid localStorage values", () => {
			storage[LCE_THEME_STORAGE_KEY] = "invalid";
			expect(getInitialTheme()).toBe(LIGHT_THEME);
		});

		it("falls back to system preference when localStorage is empty", () => {
			matchMediaMatches = true;
			expect(getInitialTheme()).toBe(DARK_THEME);
		});

		it("prefers saved theme over system preference", () => {
			storage[LCE_THEME_STORAGE_KEY] = LIGHT_THEME;
			matchMediaMatches = true;
			expect(getInitialTheme()).toBe(LIGHT_THEME);
		});
	});

	describe("applyTheme", () => {
		it("adds dark class and data-theme attribute for dark theme", () => {
			applyTheme(DARK_THEME);
			expect(document.documentElement.classList.contains(DARK_THEME)).toBe(true);
			expect(document.documentElement.getAttribute("data-theme")).toBe(DARK_THEME);
		});

		it("removes dark class and sets data-theme to light for light theme", () => {
			document.documentElement.classList.add(DARK_THEME);
			applyTheme(LIGHT_THEME);
			expect(document.documentElement.classList.contains(DARK_THEME)).toBe(false);
			expect(document.documentElement.getAttribute("data-theme")).toBe(LIGHT_THEME);
		});
	});

	describe("persistTheme", () => {
		it("applies theme, saves to localStorage, and dispatches themechange", () => {
			const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");

			persistTheme(DARK_THEME);

			expect(document.documentElement.classList.contains(DARK_THEME)).toBe(true);
			expect(storage[LCE_THEME_STORAGE_KEY]).toBe(DARK_THEME);
			expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
			expect(dispatchEventSpy.mock.calls[0]?.[0]?.type).toBe("themechange");
		});

		it("does not throw when localStorage is unavailable", () => {
			vi.stubGlobal("localStorage", undefined as unknown as Storage);
			expect(() => persistTheme(DARK_THEME)).not.toThrow();
			expect(document.documentElement.classList.contains(DARK_THEME)).toBe(true);
		});
	});
});
