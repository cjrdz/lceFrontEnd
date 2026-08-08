import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/svelte";
import ResetPasswordForm from "./ResetPasswordForm.svelte";

vi.mock("$lib/supertokens/config", () => ({
	initSuperTokens: vi.fn(),
	EmailPassword: {
		getResetPasswordTokenFromURL: vi.fn(() => "test-token"),
		submitNewPassword: vi.fn(),
	},
}));

import { EmailPassword } from "$lib/supertokens/config";

describe("ResetPasswordForm", () => {
	beforeEach(() => {
		vi.mocked(EmailPassword.getResetPasswordTokenFromURL).mockReturnValue("test-token");
		vi.mocked(EmailPassword.submitNewPassword).mockReset();
		window.location.href = "http://localhost:4321/auth/reset-password";
	});

	it("renders the reset password form", () => {
		render(ResetPasswordForm);
		expect(screen.getByRole("heading", { name: "Restablecer contraseña" })).toBeInTheDocument();
		expect(screen.getByLabelText("Nueva contraseña")).toBeInTheDocument();
		expect(screen.getByLabelText("Confirmar contraseña")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Guardar contraseña" })).toBeInTheDocument();
	});

	it("shows an error when the token is missing", () => {
		vi.mocked(EmailPassword.getResetPasswordTokenFromURL).mockReturnValue("");
		render(ResetPasswordForm);
		expect(screen.getByText("El enlace no es válido o ha expirado. Solicita uno nuevo.")).toBeInTheDocument();
	});

	it("enables the submit button even when the token is missing", () => {
		vi.mocked(EmailPassword.getResetPasswordTokenFromURL).mockReturnValue("");
		render(ResetPasswordForm);
		const button = screen.getByRole("button", { name: "Guardar contraseña" });
		expect(button).not.toBeDisabled();
	});

	it("validates that passwords match", async () => {
		render(ResetPasswordForm);
		const password = screen.getByLabelText("Nueva contraseña");
		const confirm = screen.getByLabelText("Confirmar contraseña");
		const button = screen.getByRole("button", { name: "Guardar contraseña" });

		await fireEvent.input(password, { target: { value: "password123" } });
		await fireEvent.input(confirm, { target: { value: "different123" } });
		await fireEvent.click(button);

		expect(screen.getByText("Las contraseñas no coinciden.")).toBeInTheDocument();
		expect(EmailPassword.submitNewPassword).not.toHaveBeenCalled();
	});

	it("submits the new password when valid", async () => {
		vi.mocked(EmailPassword.submitNewPassword).mockResolvedValue({ status: "OK" });
		render(ResetPasswordForm);
		const password = screen.getByLabelText("Nueva contraseña");
		const confirm = screen.getByLabelText("Confirmar contraseña");
		const button = screen.getByRole("button", { name: "Guardar contraseña" });

		await fireEvent.input(password, { target: { value: "NewPassword123!" } });
		await fireEvent.input(confirm, { target: { value: "NewPassword123!" } });
		await fireEvent.click(button);

		await waitFor(() => {
			expect(EmailPassword.submitNewPassword).toHaveBeenCalledWith({
				formFields: [{ id: "password", value: "NewPassword123!" }],
			});
		});
		expect(screen.getByText("Contraseña actualizada correctamente. Redirigiendo al inicio de sesión…")).toBeInTheDocument();
	});

	it("shows an error for invalid token response", async () => {
		vi.mocked(EmailPassword.submitNewPassword).mockResolvedValue({ status: "RESET_PASSWORD_INVALID_TOKEN_ERROR" });
		render(ResetPasswordForm);
		const password = screen.getByLabelText("Nueva contraseña");
		const confirm = screen.getByLabelText("Confirmar contraseña");
		const button = screen.getByRole("button", { name: "Guardar contraseña" });

		await fireEvent.input(password, { target: { value: "NewPassword123!" } });
		await fireEvent.input(confirm, { target: { value: "NewPassword123!" } });
		await fireEvent.click(button);

		await waitFor(() => {
			expect(screen.getByText("El enlace no es válido o ha expirado. Solicita uno nuevo.")).toBeInTheDocument();
		});
	});
});
