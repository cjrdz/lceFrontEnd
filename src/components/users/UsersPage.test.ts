import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import * as usersApi from "$lib/api/users";
import UsersPage from "./UsersPage.svelte";

vi.mock("@iconify/svelte", () => ({
	default: vi.fn(() => null as unknown as HTMLElement),
}));

vi.mock("$lib/api/users", () => ({
	listUsers: vi.fn(),
	listRoles: vi.fn(),
	createUser: vi.fn(),
	updateUser: vi.fn(),
	approveUser: vi.fn(),
	updateUserStatus: vi.fn(),
	deleteUser: vi.fn(),
	generatePasswordResetLink: vi.fn(),
	syncUsers: vi.fn(),
}));

const mockListUsers = vi.mocked(usersApi.listUsers);
const mockListRoles = vi.mocked(usersApi.listRoles);
const mockUpdateUser = vi.mocked(usersApi.updateUser);
const mockApproveUser = vi.mocked(usersApi.approveUser);
const mockUpdateUserStatus = vi.mocked(usersApi.updateUserStatus);

describe("UsersPage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockListRoles.mockResolvedValue([
			{ id: 1, name: "Admin" },
			{ id: 2, name: "Employee" },
		]);
	});

	it("renders the user list after loading", async () => {
		mockListUsers.mockResolvedValue({
			users: [
				{
					id: 2,
					full_name: "Test Employee",
					email: "employee@legalcore.dev",
					status: "active",
					created_at: "",
					role: { id: 2, name: "Employee" },
				},
			],
			total: 1,
			limit: 50,
			offset: 0,
		});

		render(UsersPage);

		expect(screen.getByText("Nuevo usuario")).toBeInTheDocument();
		await waitFor(() => expect(screen.getByText("Test Employee")).toBeInTheDocument());
		expect(screen.getByText("employee@legalcore.dev")).toBeInTheDocument();
		expect(screen.getByText("Employee")).toBeInTheDocument();
	});

	it("shows an empty message when no users are found", async () => {
		mockListUsers.mockResolvedValue({ users: [], total: 0, limit: 50, offset: 0 });

		render(UsersPage);

		await waitFor(() =>
			expect(screen.getByText("No se encontraron usuarios")).toBeInTheDocument(),
		);
	});

	it("approves a pending user after selecting a role", async () => {
		mockListUsers.mockResolvedValue({
			users: [
				{
					id: 3,
					full_name: "Pending User",
					email: "pending@legalcore.dev",
					status: "pending",
					created_at: "",
					role: null,
				},
			],
			total: 1,
			limit: 50,
			offset: 0,
		});

		mockApproveUser.mockResolvedValue({
			id: 3,
			full_name: "Pending User",
			email: "pending@legalcore.dev",
			status: "active",
			created_at: "",
			role: { id: 2, name: "Employee" },
		});

		render(UsersPage);

		await waitFor(() => expect(screen.getByText("Pending User")).toBeInTheDocument());

		await fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
		await waitFor(() =>
			expect(screen.getByRole("menuitem", { name: "Aprobar" })).toBeInTheDocument(),
		);
		await fireEvent.click(screen.getByRole("menuitem", { name: "Aprobar" }));
		await waitFor(() => expect(screen.getByText("Aprobar acceso")).toBeInTheDocument());

		const dialog = screen.getByRole("dialog");
		const dialogApproveButton = within(dialog).getByRole("button", { name: "Aprobar" });

		await fireEvent.click(dialogApproveButton);
		await waitFor(() =>
			expect(screen.getByText("Selecciona un rol antes de aprobar")).toBeInTheDocument(),
		);

		await fireEvent.pointerDown(within(dialog).getByRole("button", { name: "Rol" }));
		await waitFor(() => expect(screen.getByRole("option", { name: "Employee" })).toBeInTheDocument());
		await fireEvent.pointerUp(screen.getByRole("option", { name: "Employee" }));

		await fireEvent.click(dialogApproveButton);

		await waitFor(() => {
			expect(mockApproveUser).toHaveBeenCalledWith(3, 2);
		});
	});
});
