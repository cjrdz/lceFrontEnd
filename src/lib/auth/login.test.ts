import { describe, it, expect, vi } from "vitest";
import { login, type LoginDeps, type SignInResponse } from "./login";

function makeDeps(response: SignInResponse): LoginDeps {
	return {
		signIn: vi.fn(() => Promise.resolve(response)),
		redirect: vi.fn(),
	};
}

describe("login", () => {
	it("redirects on OK", async () => {
		const deps = makeDeps({ status: "OK" });
		const result = await login("admin@example.com", "TestPassword123!", deps);
		expect(result.ok).toBe(true);
		expect(deps.redirect).toHaveBeenCalledWith("/dashboard");
	});

	it("returns wrong credentials message", async () => {
		const deps = makeDeps({ status: "WRONG_CREDENTIALS_ERROR" });
		const result = await login("admin@example.com", "wrong", deps);
		expect(result.ok).toBe(false);
		expect(result.error).toBe("Correo o contraseña incorrectos");
	});

	it("returns field errors", async () => {
		const deps = makeDeps({
			status: "FIELD_ERROR",
			formFields: [
				{ id: "email", error: "Email inválido" },
				{ id: "password", error: "Contraseña muy corta" },
			],
		});
		const result = await login("bad", "short", deps);
		expect(result.fieldErrors).toEqual({
			email: "Email inválido",
			password: "Contraseña muy corta",
		});
	});

	it("handles unexpected errors", async () => {
		const deps: LoginDeps = {
			signIn: vi.fn(() => Promise.reject(new Error("network"))),
			redirect: vi.fn(),
		};
		const result = await login("admin@example.com", "TestPassword123!", deps);
		expect(result.error).toBe("Ocurrió un error inesperado. Intenta de nuevo.");
	});
});
