import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { b as unescapeHTML, l as renderTemplate, p as maybeRenderHead } from "./server_BVb11Km5.mjs";
import { t as createComponent } from "./astro-component_DVnojZiW.mjs";
//#region src/pages/README.md
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
var html = () => "<h1 id=\"pages-directory\">pages directory</h1>\n<p>Existing pages:</p>\n<ul>\n<li>index.astro, login.astro, pending-approval.astro.</li>\n<li>auth/ callbacks.</li>\n<li>dashboard.astro, dashboard/usuarios.astro.</li>\n<li>api/v1/[…path].ts BFF proxy.</li>\n</ul>\n<p>Future pages by domain:</p>\n<ul>\n<li>dashboard/clientes/</li>\n<li>dashboard/casos/</li>\n<li>dashboard/etapas/</li>\n<li>dashboard/conciliaciones/</li>\n<li>dashboard/edictos/</li>\n<li>dashboard/curadores/</li>\n<li>dashboard/sentencias/</li>\n<li>dashboard/diligencias/</li>\n<li>dashboard/gastos/</li>\n<li>dashboard/catalogo/</li>\n<li>dashboard/facturas/</li>\n<li>dashboard/estimados/</li>\n<li>dashboard/pagos/</li>\n<li>dashboard/expedientes/</li>\n<li>dashboard/alertas/</li>\n<li>dashboard/reportes/</li>\n<li>dashboard/configuracion/</li>\n</ul>\n";
var frontmatter = {};
var file = "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/README.md";
var url = "/README";
function rawContent() {
	return "# pages directory\n\nExisting pages:\n- index.astro, login.astro, pending-approval.astro.\n- auth/ callbacks.\n- dashboard.astro, dashboard/usuarios.astro.\n- api/v1/[...path].ts BFF proxy.\n\nFuture pages by domain:\n- dashboard/clientes/\n- dashboard/casos/\n- dashboard/etapas/\n- dashboard/conciliaciones/\n- dashboard/edictos/\n- dashboard/curadores/\n- dashboard/sentencias/\n- dashboard/diligencias/\n- dashboard/gastos/\n- dashboard/catalogo/\n- dashboard/facturas/\n- dashboard/estimados/\n- dashboard/pagos/\n- dashboard/expedientes/\n- dashboard/alertas/\n- dashboard/reportes/\n- dashboard/configuracion/\n";
}
async function compiledContent() {
	return await html();
}
function getHeadings() {
	return [{
		"depth": 1,
		"slug": "pages-directory",
		"text": "pages directory"
	}];
}
var Content = createComponent((result, _props, slots) => {
	const { layout, ...content } = frontmatter;
	content.file = file;
	content.url = url;
	return renderTemplate`<meta charset="utf-8">${maybeRenderHead()}${unescapeHTML(html())}`;
});
//#endregion
//#region \0virtual:astro:page:src/pages/README@_@md
var page = () => README_exports;
//#endregion
export { page };
