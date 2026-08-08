import SuperTokens from "supertokens-web-js";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import EmailVerification from "supertokens-web-js/recipe/emailverification";
import ThirdParty from "supertokens-web-js/recipe/thirdparty";
import Session from "supertokens-web-js/recipe/session";

// In the browser, proxy API calls through the same origin so cookies are sent reliably.
const apiDomain =
	typeof window !== "undefined"
		? window.location.origin
		: import.meta.env.PUBLIC_API_DOMAIN || "http://localhost:8080";
const websiteDomain = import.meta.env.PUBLIC_WEBSITE_DOMAIN || "http://localhost:4321";
const connectionURI = import.meta.env.PUBLIC_SUPERTOKENS_CONNECTION_URI || "";

// IMPORTANT: Do not expose the SuperTokens core API key here. The frontend SDK
// communicates with the backend API, which is the only place that needs the key.
export function initSuperTokens() {
	SuperTokens.init({
		appInfo: {
			appName: "LegalCore",
			apiDomain,
			websiteDomain,
			apiBasePath: "/api/v1/auth",
			websiteBasePath: "/auth",
		},
		supertokens: {
			connectionURI,
		},
		recipeList: [
			EmailPassword.init(),
			EmailVerification.init({
				mode: "REQUIRED",
			}),
			ThirdParty.init(),
			Session.init({
				tokenTransferMethod: "cookie",
			}),
		],
	});
}

export { EmailPassword, EmailVerification, ThirdParty, Session };
