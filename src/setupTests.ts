import "@testing-library/jest-dom/vitest";

// jsdom does not implement PointerEvent capture methods used by bits-ui selects.
// eslint-disable-next-line @typescript-eslint/no-empty-function
Element.prototype.setPointerCapture ??= () => {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
Element.prototype.releasePointerCapture ??= () => {};
Element.prototype.hasPointerCapture ??= () => false;
