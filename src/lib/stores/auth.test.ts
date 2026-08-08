import { describe, it, expect } from "vitest";
import { authStore } from "./auth";
import { get } from "svelte/store";

const sampleContext = {
	user: { id: 1, full_name: "Admin", email: "admin@example.com", status: "active", created_at: "2026-01-01" },
	role: { id: 1, name: "Admin" },
	firm: { id: 1, name: "LegalCore Dev", tax_id: "00000000-0", status: "active" },
	password_expired: false,
};

describe("authStore", () => {
	it("starts null", () => {
		expect(get(authStore)).toBeNull();
	});

	it("sets and clears context", () => {
		authStore.set(sampleContext);
		expect(get(authStore)).toEqual(sampleContext);
		authStore.clear();
		expect(get(authStore)).toBeNull();
	});

	it("checks role", () => {
		authStore.set(sampleContext);
		expect(authStore.hasRole("Admin")).toBe(true);
		expect(authStore.hasRole("User")).toBe(false);
		authStore.clear();
	});
});
