import path from "node:path";
import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
	plugins: [svelte({ compilerOptions: { dev: true } })],

	resolve: {
		alias: {
			$lib: path.resolve(import.meta.dirname, "./src/lib"),
		},
		conditions: ["browser", "default"],
	},
	test: {
		environment: "jsdom",
		globals: true,
		include: ["src/**/*.{test,spec}.{js,ts}"],
		setupFiles: ["./src/setupTests.ts"],
		ssr: false,
	},
});
