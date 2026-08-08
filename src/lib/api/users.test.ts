import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
	listUsers,
	listRoles,
	createUser,
	updateUser,
	approveUser,
	updateUserStatus,
	deleteUser,
	generatePasswordResetLink,
	changePassword,
} from "./users";

describe("users API client", () => {
	beforeEach(() => {
		vi.stubGlobal("fetch", vi.fn());
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	function mockFetch(response: { status?: number; body?: unknown; ok?: boolean }) {
		const status = response.status ?? 200;
		(fetch as any).mockResolvedValueOnce({
			ok: response.ok ?? (status >= 200 && status < 300),
			status,
			json: async () => response.body,
		});
	}

	it("lists users", async () => {
		mockFetch({
			body: {
				users: [
					{ id: 1, full_name: "Admin", email: "admin@example.com", status: "active", created_at: "" },
				],
				total: 1,
				limit: 50,
				offset: 0,
			},
		});
		const result = await listUsers("active", "admin", 50, 0);
		expect(result.users).toHaveLength(1);
		expect(result.users[0].email).toBe("admin@example.com");
		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/api/v1/users?status=active&q=admin&limit=50"),
			expect.objectContaining({ credentials: "include" }),
		);
	});

	it("lists roles", async () => {
		mockFetch({ body: [{ id: 1, name: "Admin" }] });
		const result = await listRoles();
		expect(result).toEqual([{ id: 1, name: "Admin" }]);
	});

	it("creates a user", async () => {
		mockFetch({
			status: 201,
			body: {
				user: { id: 2, full_name: "New", email: "new@example.com", status: "active", created_at: "" },
				password_setup_link: "http://setup-link",
			},
		});
		const result = await createUser({ email: "new@example.com", full_name: "New", role_id: 1 });
		expect(result.user.email).toBe("new@example.com");
		expect(result.password_setup_link).toBe("http://setup-link");
	});

	it("updates a user", async () => {
		mockFetch({
			body: { id: 2, full_name: "Updated", email: "updated@example.com", status: "active", created_at: "" },
		});
		const result = await updateUser(2, { full_name: "Updated" });
		expect(result.full_name).toBe("Updated");
	});

	it("approves a pending user", async () => {
		mockFetch({
			body: { id: 3, full_name: "Pending", email: "pending@example.com", status: "active", created_at: "" },
		});
		const result = await approveUser(3, 2);
		expect(result.status).toBe("active");
		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/api/v1/users/3/approve"),
			expect.objectContaining({ method: "POST" }),
		);
	});

	it("updates status", async () => {
		mockFetch({
			body: { id: 2, full_name: "Updated", email: "updated@example.com", status: "inactive", created_at: "" },
		});
		const result = await updateUserStatus(2, "inactive");
		expect(result.status).toBe("inactive");
	});

	it("deletes a user", async () => {
		mockFetch({ body: { status: "deleted" } });
		await expect(deleteUser(2)).resolves.toBeUndefined();
	});

	it("generates a password reset link", async () => {
		mockFetch({ body: { password_reset_link: "http://reset-link" } });
		const result = await generatePasswordResetLink(2);
		expect(result).toBe("http://reset-link");
	});

	it("changes password", async () => {
		mockFetch({ body: { status: "ok" } });
		await expect(changePassword("new-password-123")).resolves.toBeUndefined();
		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/api/v1/users/change-password"),
			expect.objectContaining({ method: "POST" }),
		);
	});

	it("throws on non-ok response", async () => {
		mockFetch({ status: 400, body: { message: "bad request" } });
		await expect(listUsers()).rejects.toThrow("bad request");
	});

	it("redirects to login on 401", async () => {
		mockFetch({ status: 401, body: {} });
		vi.stubGlobal("location", { href: "" });
		await expect(listUsers()).rejects.toThrow("No autorizado");
		expect(location.href).toBe("/login");
	});
});
