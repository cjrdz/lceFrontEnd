export interface LoginDeps {
	signIn: (input: { formFields: { id: string; value: string }[] }) => Promise<SignInResponse>;
	redirect: (url: string) => void;
}

export type SignInResponse =
	| { status: "OK" }
	| { status: "WRONG_CREDENTIALS_ERROR" }
	| { status: "FIELD_ERROR"; formFields: { id: string; error: string }[] }
	| { status: "EMAIL_VERIFICATION_ERROR"; message: string };

export interface LoginResult {
	ok: boolean;
	fieldErrors: Record<string, string>;
	error?: string;
}

export async function login(email: string, password: string, deps: LoginDeps): Promise<LoginResult> {
	const result: LoginResult = { ok: false, fieldErrors: {} };

	try {
		const response = await deps.signIn({
			formFields: [
				{ id: "email", value: email },
				{ id: "password", value: password },
			],
		});

		if (response.status === "OK") {
			deps.redirect("/dashboard");
			result.ok = true;
		} else if (response.status === "EMAIL_VERIFICATION_ERROR") {
			deps.redirect("/auth/verify-email");
			result.ok = true;
		} else if (response.status === "WRONG_CREDENTIALS_ERROR") {
			result.error = "Correo o contraseña incorrectos";
		} else if (response.status === "FIELD_ERROR") {
			for (const field of response.formFields) {
				result.fieldErrors[field.id] = field.error;
			}
		}
	} catch (e) {
		result.error = "Ocurrió un error inesperado. Intenta de nuevo.";
	}

	return result;
}
