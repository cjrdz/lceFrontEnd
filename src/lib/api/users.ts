import { request } from "./client";

export interface ApiRole {
	id: number;
	name: string;
}

export interface ApiUser {
	id: number;
	full_name: string;
	email: string;
	status: string;
	created_at: string;
	role?: ApiRole;
}

export interface ListUsersResponse {
	users: ApiUser[];
	total: number;
	limit: number;
	offset: number;
}

export interface CreateUserResponse {
	user: ApiUser;
	password_setup_link: string;
}

export interface UpdateUserBody {
	email?: string;
	full_name?: string;
	role_id?: number;
}

export async function listUsers(
	status = "",
	q = "",
	limit = 50,
	offset = 0,
): Promise<ListUsersResponse> {
	const params = new URLSearchParams();
	if (status) params.set("status", status);
	if (q) params.set("q", q);
	if (limit) params.set("limit", String(limit));
	if (offset) params.set("offset", String(offset));
	const query = params.toString() ? `?${params.toString()}` : "";
	return request<ListUsersResponse>(`/api/v1/users${query}`);
}

export async function listRoles(): Promise<ApiRole[]> {
	return request<ApiRole[]>("/api/v1/roles");
}

export async function createUser(body: {
	email: string;
	full_name: string;
	role_id: number;
}): Promise<CreateUserResponse> {
	return request<CreateUserResponse>("/api/v1/users", {
		method: "POST",
		body: JSON.stringify(body),
	});
}

export async function updateUser(id: number, body: UpdateUserBody): Promise<ApiUser> {
	return request<ApiUser>(`/api/v1/users/${id}`, {
		method: "PUT",
		body: JSON.stringify(body),
	});
}

export async function approveUser(id: number, role_id: number): Promise<ApiUser> {
	return request<ApiUser>(`/api/v1/users/${id}/approve`, {
		method: "POST",
		body: JSON.stringify({ role_id }),
	});
}

export async function updateUserStatus(id: number, status: string): Promise<ApiUser> {
	return request<ApiUser>(`/api/v1/users/${id}/status`, {
		method: "PATCH",
		body: JSON.stringify({ status }),
	});
}

export async function deleteUser(id: number): Promise<void> {
	await request<{ status: string }>(`/api/v1/users/${id}`, {
		method: "DELETE",
	});
}

export async function generatePasswordResetLink(id: number): Promise<string> {
	const result = await request<{ password_reset_link: string }>(`/api/v1/users/${id}/password-reset-link`, {
		method: "POST",
	});
	return result.password_reset_link;
}

export async function syncUsers(): Promise<{ imported: number }> {
	return request<{ imported: number }>("/api/v1/users/sync", {
		method: "POST",
	});
}

export async function changePassword(new_password: string): Promise<void> {
	await request<{ status: string }>("/api/v1/users/change-password", {
		method: "POST",
		body: JSON.stringify({ new_password }),
	});
}
