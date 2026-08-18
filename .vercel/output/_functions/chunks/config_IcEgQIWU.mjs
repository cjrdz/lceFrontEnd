import SuperTokens from "supertokens-web-js";
import EmailPassword from "supertokens-web-js/recipe/emailpassword/index.js";
import EmailVerification from "supertokens-web-js/recipe/emailverification/index.js";
import ThirdParty from "supertokens-web-js/recipe/thirdparty/index.js";
import Session from "supertokens-web-js/recipe/session/index.js";
//#region src/lib/supertokens/config.ts
var apiDomain = typeof window !== "undefined" ? window.location.origin : "https://lcebackend-production.up.railway.app";
var websiteDomain = "http://localhost:4321";
var connectionURI = "https://your-supertokens-core.aws.supertokens.io";
function initSuperTokens() {
	SuperTokens.init({
		appInfo: {
			appName: "LegalCore",
			apiDomain,
			websiteDomain,
			apiBasePath: "/api/v1/auth",
			websiteBasePath: "/auth"
		},
		supertokens: { connectionURI },
		recipeList: [
			EmailPassword.init(),
			EmailVerification.init({ mode: "REQUIRED" }),
			ThirdParty.init(),
			Session.init({ tokenTransferMethod: "cookie" })
		]
	});
}
//#endregion
export { initSuperTokens as a, ThirdParty as i, EmailVerification as n, Session as r, EmailPassword as t };
