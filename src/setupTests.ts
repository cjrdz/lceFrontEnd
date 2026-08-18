import "@testing-library/jest-dom/vitest";

// jsdom does not implement PointerEvent capture methods used by bits-ui selects.
// eslint-disable-next-line @typescript-eslint/no-empty-function
Element.prototype.setPointerCapture ??= () => {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
Element.prototype.releasePointerCapture ??= () => {};
Element.prototype.hasPointerCapture ??= () => false;

// jsdom does not implement matchMedia, which svelte/reactivity MediaQuery relies on.
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: () => {},
		removeEventListener: () => {},
		addListener: () => {},
		removeListener: () => {},
		dispatchEvent: () => false,
	}),
});
