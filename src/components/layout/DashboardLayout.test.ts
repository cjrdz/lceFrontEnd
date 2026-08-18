import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/svelte";
import DashboardLayout from "./DashboardLayout.svelte";

vi.mock("$lib/supertokens/config", () => ({
	initSuperTokens: vi.fn(),
	Session: { signOut: vi.fn() },
}));

const userContext = {
	user: {
		id: 1,
		full_name: "Admin User",
		email: "admin@example.com",
		status: "active",
		created_at: "2026-08-05T04:08:57Z",
	},
	role: { id: 1, name: "Admin" },
	firm: { id: 1, name: "LegalCore Dev", tax_id: "00000000-0", status: "active" },
	password_expired: false,
};

describe("DashboardLayout", () => {
	it("renders the firm name, page title, and navigation links", () => {
		render(DashboardLayout, { props: { userContext, title: "Inicio" } });

		expect(screen.getByText("LegalCore Dev")).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Inicio" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Inicio" })).toBeInTheDocument();
		expect(screen.getByText("Admin User")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Usuarios" })).toBeInTheDocument();
	});

	it("hides the users link for non-admin roles", () => {
		render(DashboardLayout, {
			props: { userContext: { ...userContext, role: { id: 2, name: "Employee" } }, title: "Inicio" },
		});

		expect(screen.queryByText("Usuarios")).not.toBeInTheDocument();
	});
});
