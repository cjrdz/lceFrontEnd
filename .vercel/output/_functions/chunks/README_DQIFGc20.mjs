import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { b as unescapeHTML, l as renderTemplate, p as maybeRenderHead } from "./server_BVb11Km5.mjs";
import { t as createComponent } from "./astro-component_DVnojZiW.mjs";
//#region src/pages/api/v1/README.md
var README_exports = /* @__PURE__ */ __exportAll({
	Content: () => Content,
	compiledContent: () => compiledContent,
	default: () => Content,
	file: () => file,
	frontmatter: () => frontmatter,
	getHeadings: () => getHeadings,
	rawContent: () => rawContent,
	url: () => url
});
var html = () => "<h1 id=\"bff-routes-srcpagesapiv1\">BFF routes (<code>src/pages/api/v1/</code>)</h1>\n<p>Esta carpeta contiene las rutas Astro que actúan como <strong>Backend for Frontend</strong>.</p>\n<ul>\n<li><code>[...path].ts</code> (catch-all) reenvía cualquier request a <code>/api/v1/*</code> hacia el backend Go,\npreservando cookies, headers relevantes y método HTTP.</li>\n<li>Cada dominio puede añadir rutas propias (<code>index.ts</code>, <code>[...path].ts</code>, <code>[id].ts</code>) para:\n<ul>\n<li>Validar input antes de enviar al backend.</li>\n<li>Transformar/enriquecer la respuesta para la UI.</li>\n<li>Aplicar caché o rate-limit.</li>\n<li>Manejar subidas de archivos o webhooks.</li>\n</ul>\n</li>\n<li>Los clientes en <code>src/lib/api/</code> siempre apuntan a rutas locales (<code>/api/v1/...</code>), nunca al backend directamente.</li>\n</ul>\n<h2 id=\"convenciones\">Convenciones</h2>\n<ul>\n<li>Una carpeta por dominio, nombrado igual que el paquete backend.</li>\n<li>Cada archivo exporta <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code> según corresponda.</li>\n<li>Las rutas BFF deben mantener el mismo path y verbo que el backend Go, salvo transformación justificada.</li>\n<li>Errores del backend se propagan al cliente con el mismo status code y body.</li>\n</ul>\n";
var frontmatter = {};
var file = "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/api/v1/README.md";
var url = "/api/v1/README";
function rawContent() {
	return "# BFF routes (`src/pages/api/v1/`)\n\nEsta carpeta contiene las rutas Astro que actúan como **Backend for Frontend**.\n\n- `[...path].ts` (catch-all) reenvía cualquier request a `/api/v1/*` hacia el backend Go,\n  preservando cookies, headers relevantes y método HTTP.\n- Cada dominio puede añadir rutas propias (`index.ts`, `[...path].ts`, `[id].ts`) para:\n  - Validar input antes de enviar al backend.\n  - Transformar/enriquecer la respuesta para la UI.\n  - Aplicar caché o rate-limit.\n  - Manejar subidas de archivos o webhooks.\n- Los clientes en `src/lib/api/` siempre apuntan a rutas locales (`/api/v1/...`), nunca al backend directamente.\n\n## Convenciones\n\n- Una carpeta por dominio, nombrado igual que el paquete backend.\n- Cada archivo exporta `GET`, `POST`, `PUT`, `PATCH`, `DELETE` según corresponda.\n- Las rutas BFF deben mantener el mismo path y verbo que el backend Go, salvo transformación justificada.\n- Errores del backend se propagan al cliente con el mismo status code y body.\n";
}
async function compiledContent() {
	return await html();
}
function getHeadings() {
	return [{
		"depth": 1,
		"slug": "bff-routes-srcpagesapiv1",
		"text": "BFF routes (src/pages/api/v1/)"
	}, {
		"depth": 2,
		"slug": "convenciones",
		"text": "Convenciones"
	}];
}
var Content = createComponent((result, _props, slots) => {
	const { layout, ...content } = frontmatter;
	content.file = file;
	content.url = url;
	return renderTemplate`<meta charset="utf-8">${maybeRenderHead()}${unescapeHTML(html())}`;
});
//#endregion
//#region \0virtual:astro:page:src/pages/api/v1/README@_@md
var page = () => README_exports;
//#endregion
export { page };
