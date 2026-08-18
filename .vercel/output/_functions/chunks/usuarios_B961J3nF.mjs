import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { S as createAstro, h as addAttribute, i as renderComponent, l as renderTemplate, m as renderHead } from "./server_BVb11Km5.mjs";
import { $ as escape_html, Q as clsx, a as attr_class, c as derived, d as props_id, m as stringify, o as attributes, p as spread_props, s as bind_props, u as ensure_array_like } from "./index-server_BbGYSPwV.mjs";
import { t as createComponent } from "./astro-component_DVnojZiW.mjs";
import "./compiler_DZ2LYM6g.mjs";
import { i as cn, n as Icon, r as Button, t as $$ThemeInit } from "./ThemeInit_D8dWN7q7.mjs";
/* empty css                 */
import { $ as Previous, A as prev, C as getFloatingContentCSSVars, D as forward, E as backward, F as ARROW_DOWN, G as PAGE_DOWN, J as DOMContext, K as PAGE_UP, M as noop$1, N as PresenceManager, O as getNextMatch, P as isIOS, R as ARROW_UP, S as Floating_layer, T as boxAutoReset, U as HOME, X as afterSleep, Y as afterTick, _ as Dialog_title, a as Dropdown_menu_item, at as generatePasswordResetLink, b as Popper_layer, c as Skeleton, ct as syncUsers, d as Tooltip_provider, et as watch, f as Tooltip_content, g as Dialog_footer, h as Dialog_header, i as Dropdown_menu_separator, it as deleteUser, j as Portal, k as next, l as Tooltip, lt as updateUser, m as Dialog_content, n as Dropdown_menu, nt as approveUser, o as Dropdown_menu_content, ot as listRoles, p as Dialog_description, r as Dropdown_menu_trigger, rt as createUser, st as listUsers, t as DashboardLayout, tt as Context, u as Tooltip_trigger, ut as updateUserStatus, v as Dialog, w as DOMTypeahead, x as Floating_layer_anchor, y as Popper_layer_force_mount } from "./DashboardLayout_B25K0t6c.mjs";
import { E as Input, a as boolToTrueOrUndef, c as getDataTransitionAttrs, d as mergeProps, f as styleToString, i as boolToStrTrueOrUndef, l as attachRef, n as boolToEmptyStrOrUndef, o as createBitsAttrs, r as boolToStr, s as getDataOpenClosed, t as createId, u as on, y as boxWith } from "./create-id_C_2gSAF4.mjs";
import { t as Label } from "./label_sWRoE167.mjs";
import "animejs";
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_svelte@5.56.8/node_modules/svelte-toolbelt/dist/utils/sr-only-styles.js
var srOnlyStyles = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0",
	transform: "translateX(-100%)"
};
styleToString(srOnlyStyles);
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/avatar/avatar.svelte.js
var avatarAttrs = createBitsAttrs({
	component: "avatar",
	parts: [
		"root",
		"image",
		"fallback"
	]
});
var AvatarRootContext = new Context("Avatar.Root");
var AvatarRootState = class AvatarRootState {
	static create(opts) {
		return AvatarRootContext.set(new AvatarRootState(opts));
	}
	opts;
	domContext;
	attachment;
	constructor(opts) {
		this.opts = opts;
		this.domContext = new DOMContext(this.opts.ref);
		this.loadImage = this.loadImage.bind(this);
		this.attachment = attachRef(this.opts.ref);
	}
	loadImage(src, crossorigin, referrerPolicy) {
		if (this.opts.loadingStatus.current === "loaded") return;
		let imageTimerId;
		const image = new Image();
		image.src = src;
		if (crossorigin !== void 0) image.crossOrigin = crossorigin;
		if (referrerPolicy) image.referrerPolicy = referrerPolicy;
		this.opts.loadingStatus.current = "loading";
		image.onload = () => {
			imageTimerId = this.domContext.setTimeout(() => {
				this.opts.loadingStatus.current = "loaded";
			}, this.opts.delayMs.current);
		};
		image.onerror = () => {
			this.opts.loadingStatus.current = "error";
		};
		return () => {
			if (!imageTimerId) return;
			this.domContext.clearTimeout(imageTimerId);
		};
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[avatarAttrs.root]: "",
		"data-status": this.opts.loadingStatus.current,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var AvatarFallbackState = class AvatarFallbackState {
	static create(opts) {
		return new AvatarFallbackState(opts, AvatarRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#style = derived(() => this.root.opts.loadingStatus.current === "loaded" ? { display: "none" } : void 0);
	get style() {
		return this.#style();
	}
	set style($$value) {
		return this.#style($$value);
	}
	#props = derived(() => ({
		style: this.style,
		"data-status": this.root.opts.loadingStatus.current,
		[avatarAttrs.fallback]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/avatar/components/avatar.svelte
function Avatar$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { delayMs = 0, loadingStatus = "loading", onLoadingStatusChange, child, children, id = createId(uid), ref = null, $$slots, $$events, ...restProps } = $$props;
		const rootState = AvatarRootState.create({
			delayMs: boxWith(() => delayMs),
			loadingStatus: boxWith(() => loadingStatus, (v) => {
				if (loadingStatus !== v) {
					loadingStatus = v;
					onLoadingStatusChange?.(v);
				}
			}),
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, rootState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, {
			loadingStatus,
			ref
		});
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/avatar/components/avatar-fallback.svelte
function Avatar_fallback$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, id = createId(uid), ref = null, $$slots, $$events, ...restProps } = $$props;
		const fallbackState = AvatarFallbackState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, fallbackState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<span${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></span>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/utilities/hidden-input.svelte
function Hidden_input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = void 0, $$slots, $$events, ...restProps } = $$props;
		const mergedProps = derived(() => mergeProps(restProps, {
			"aria-hidden": "true",
			tabindex: -1,
			style: {
				...srOnlyStyles,
				position: "absolute",
				top: "0",
				left: "0"
			}
		}));
		if (mergedProps().type === "checkbox") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<input${attributes({
				...mergedProps(),
				value
			}, void 0, void 0, void 0, 4)}/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<input${attributes({
				value,
				...mergedProps()
			}, void 0, void 0, void 0, 4)}/>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/internal/data-typeahead.svelte.js
var DataTypeahead = class {
	#opts;
	#candidateValues = derived(() => this.#opts.candidateValues());
	#search;
	constructor(opts) {
		this.#opts = opts;
		this.#search = boxAutoReset("", {
			afterMs: 1e3,
			getWindow: this.#opts.getWindow
		});
		this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this);
		this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(key) {
		if (!this.#opts.enabled() || !this.#candidateValues().length) return;
		this.#search.current = this.#search.current + key;
		const currentItem = this.#opts.getCurrentItem();
		const currentMatch = this.#candidateValues().find((item) => item === currentItem) ?? "";
		const values = this.#candidateValues().map((item) => item ?? "");
		const nextMatch = getNextMatch(values, this.#search.current, currentMatch);
		const newItem = this.#candidateValues().find((item) => item === nextMatch);
		if (newItem) this.#opts.onMatch(newItem);
		return newItem;
	}
	resetTypeahead() {
		this.#search.current = "";
	}
};
var FIRST_KEYS = [
	ARROW_DOWN,
	PAGE_UP,
	HOME
];
var LAST_KEYS = [
	ARROW_UP,
	PAGE_DOWN,
	"End"
];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var selectAttrs = createBitsAttrs({
	component: "select",
	parts: [
		"trigger",
		"content",
		"item",
		"viewport",
		"scroll-up-button",
		"scroll-down-button",
		"group",
		"group-label",
		"separator",
		"arrow",
		"input",
		"content-wrapper",
		"item-text",
		"value"
	]
});
var SelectRootContext = new Context("Select.Root | Combobox.Root");
var SelectGroupContext = new Context("Select.Group | Combobox.Group");
var SelectContentContext = new Context("Select.Content | Combobox.Content");
var SelectBaseRootState = class {
	opts;
	touchedInput = false;
	inputNode = null;
	contentNode = null;
	contentPresence;
	viewportNode = null;
	triggerNode = null;
	valueNode = null;
	valueId = "";
	highlightedNode = null;
	#highlightedValue = derived(() => {
		if (!this.highlightedNode) return null;
		return this.highlightedNode.getAttribute("data-value");
	});
	get highlightedValue() {
		return this.#highlightedValue();
	}
	set highlightedValue($$value) {
		return this.#highlightedValue($$value);
	}
	#highlightedId = derived(() => {
		if (!this.highlightedNode) return void 0;
		return this.highlightedNode.id;
	});
	get highlightedId() {
		return this.#highlightedId();
	}
	set highlightedId($$value) {
		return this.#highlightedId($$value);
	}
	#highlightedLabel = derived(() => {
		if (!this.highlightedNode) return null;
		return this.highlightedNode.getAttribute("data-label");
	});
	get highlightedLabel() {
		return this.#highlightedLabel();
	}
	set highlightedLabel($$value) {
		return this.#highlightedLabel($$value);
	}
	contentIsPositioned = false;
	isUsingKeyboard = false;
	isCombobox = false;
	domContext = new DOMContext(() => null);
	constructor(opts) {
		this.opts = opts;
		this.isCombobox = opts.isCombobox;
		this.contentPresence = new PresenceManager({
			ref: boxWith(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		});
	}
	setHighlightedNode(node, initial = false) {
		this.highlightedNode = node;
		if (node && (this.isUsingKeyboard || initial)) this.scrollHighlightedNodeIntoView(node);
	}
	scrollHighlightedNodeIntoView(node) {
		if (!this.viewportNode || !this.contentIsPositioned) return;
		node.scrollIntoView({ block: this.opts.scrollAlignment.current });
	}
	getCandidateNodes() {
		const node = this.contentNode;
		if (!node) return [];
		return Array.from(node.querySelectorAll(`[${this.getBitsAttr("item")}]:not([data-disabled])`));
	}
	setHighlightedToFirstCandidate(initial = false) {
		this.setHighlightedNode(null);
		let nodes = this.getCandidateNodes();
		if (!nodes.length) return;
		if (this.viewportNode) {
			const viewportRect = this.viewportNode.getBoundingClientRect();
			nodes = nodes.filter((node) => {
				if (!this.viewportNode) return false;
				const nodeRect = node.getBoundingClientRect();
				return nodeRect.right <= viewportRect.right && nodeRect.left >= viewportRect.left && nodeRect.bottom <= viewportRect.bottom && nodeRect.top >= viewportRect.top;
			});
		}
		this.setHighlightedNode(nodes[0], initial);
	}
	getNodeByValue(value) {
		return this.getCandidateNodes().find((node) => node.dataset.value === value) ?? null;
	}
	/**
	* Resolves the display label for a value: `items` entry when present, otherwise the
	* mounted item's `data-label` or its text content.
	*/
	getLabelForValue(value) {
		if (value === "") return "";
		const fromItems = this.opts.items.current.find((item) => item.value === value)?.label;
		if (fromItems !== void 0) return fromItems;
		const node = this.getNodeByValue(value);
		if (node) {
			const dataLabel = node.getAttribute("data-label");
			if (dataLabel !== null && dataLabel !== "") return dataLabel;
			return node.textContent?.trim() ?? value;
		}
		return value;
	}
	setOpen(open) {
		this.opts.open.current = open;
	}
	toggleOpen() {
		this.opts.open.current = !this.opts.open.current;
	}
	handleOpen() {
		this.setOpen(true);
	}
	handleClose() {
		this.setHighlightedNode(null);
		this.setOpen(false);
	}
	toggleMenu() {
		this.toggleOpen();
	}
	getBitsAttr = (part) => {
		return selectAttrs.getAttr(part, this.isCombobox ? "combobox" : void 0);
	};
};
var SelectSingleRootState = class extends SelectBaseRootState {
	opts;
	isMulti = false;
	#hasValue = derived(() => this.opts.value.current !== "");
	get hasValue() {
		return this.#hasValue();
	}
	set hasValue($$value) {
		return this.#hasValue($$value);
	}
	#currentLabel = derived(() => {
		if (!this.opts.items.current.length) return "";
		return this.opts.items.current.find((item) => item.value === this.opts.value.current)?.label ?? "";
	});
	get currentLabel() {
		return this.#currentLabel();
	}
	set currentLabel($$value) {
		return this.#currentLabel($$value);
	}
	#candidateLabels = derived(() => {
		if (!this.opts.items.current.length) return [];
		return this.opts.items.current.filter((item) => !item.disabled).map((item) => item.label);
	});
	get candidateLabels() {
		return this.#candidateLabels();
	}
	set candidateLabels($$value) {
		return this.#candidateLabels($$value);
	}
	#dataTypeaheadEnabled = derived(() => {
		if (this.isMulti) return false;
		if (this.opts.items.current.length === 0) return false;
		return true;
	});
	get dataTypeaheadEnabled() {
		return this.#dataTypeaheadEnabled();
	}
	set dataTypeaheadEnabled($$value) {
		return this.#dataTypeaheadEnabled($$value);
	}
	constructor(opts) {
		super(opts);
		this.opts = opts;
		watch(() => this.opts.open.current, () => {
			if (!this.opts.open.current) return;
			this.setInitialHighlightedNode();
		});
	}
	includesItem(itemValue) {
		return this.opts.value.current === itemValue;
	}
	toggleItem(itemValue, itemLabel = itemValue) {
		const newValue = this.includesItem(itemValue) ? "" : itemValue;
		this.opts.value.current = newValue;
		if (newValue !== "") this.opts.inputValue.current = itemLabel;
	}
	setInitialHighlightedNode() {
		afterTick(() => {
			if (this.highlightedNode && this.domContext.getDocument().contains(this.highlightedNode)) return;
			if (this.opts.value.current !== "") {
				const node = this.getNodeByValue(this.opts.value.current);
				if (node) {
					this.setHighlightedNode(node, true);
					return;
				}
			}
			this.setHighlightedToFirstCandidate(true);
		});
	}
};
var SelectMultipleRootState = class extends SelectBaseRootState {
	opts;
	isMulti = true;
	#hasValue = derived(() => this.opts.value.current.length > 0);
	get hasValue() {
		return this.#hasValue();
	}
	set hasValue($$value) {
		return this.#hasValue($$value);
	}
	constructor(opts) {
		super(opts);
		this.opts = opts;
		watch(() => this.opts.open.current, () => {
			if (!this.opts.open.current) return;
			this.setInitialHighlightedNode();
		});
	}
	includesItem(itemValue) {
		return this.opts.value.current.includes(itemValue);
	}
	toggleItem(itemValue, itemLabel = itemValue) {
		if (this.includesItem(itemValue)) this.opts.value.current = this.opts.value.current.filter((v) => v !== itemValue);
		else this.opts.value.current = [...this.opts.value.current, itemValue];
		this.opts.inputValue.current = itemLabel;
	}
	setInitialHighlightedNode() {
		afterTick(() => {
			if (!this.domContext) return;
			if (this.highlightedNode && this.domContext.getDocument().contains(this.highlightedNode)) return;
			if (this.opts.value.current.length && this.opts.value.current[0] !== "") {
				const node = this.getNodeByValue(this.opts.value.current[0]);
				if (node) {
					this.setHighlightedNode(node, true);
					return;
				}
			}
			this.setHighlightedToFirstCandidate(true);
		});
	}
};
var SelectRootState = class {
	static create(props) {
		const { type, ...rest } = props;
		const rootState = type === "single" ? new SelectSingleRootState(rest) : new SelectMultipleRootState(rest);
		return SelectRootContext.set(rootState);
	}
};
var SelectTriggerState = class SelectTriggerState {
	static create(opts) {
		return new SelectTriggerState(opts, SelectRootContext.get());
	}
	opts;
	root;
	attachment;
	#domTypeahead;
	#dataTypeahead;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(opts.ref, (v) => this.root.triggerNode = v);
		this.root.domContext = new DOMContext(opts.ref);
		this.#domTypeahead = new DOMTypeahead({
			getCurrentItem: () => this.root.highlightedNode,
			onMatch: (node) => {
				this.root.setHighlightedNode(node);
			},
			getActiveElement: () => this.root.domContext.getActiveElement(),
			getWindow: () => this.root.domContext.getWindow()
		});
		this.#dataTypeahead = new DataTypeahead({
			getCurrentItem: () => {
				if (this.root.isMulti) return "";
				return this.root.currentLabel;
			},
			onMatch: (label) => {
				if (this.root.isMulti) return;
				if (!this.root.opts.items.current) return;
				const matchedItem = this.root.opts.items.current.find((item) => item.label === label);
				if (!matchedItem) return;
				this.root.opts.value.current = matchedItem.value;
			},
			enabled: () => !this.root.isMulti && this.root.dataTypeaheadEnabled,
			candidateValues: () => this.root.isMulti ? [] : this.root.candidateLabels,
			getWindow: () => this.root.domContext.getWindow()
		});
		this.onkeydown = this.onkeydown.bind(this);
		this.onpointerdown = this.onpointerdown.bind(this);
		this.onpointerup = this.onpointerup.bind(this);
		this.onclick = this.onclick.bind(this);
	}
	#handleOpen() {
		this.root.opts.open.current = true;
		this.#dataTypeahead.resetTypeahead();
		this.#domTypeahead.resetTypeahead();
	}
	#handlePointerOpen(_) {
		this.#handleOpen();
	}
	/**
	* Logic used to handle keyboard selection/deselection.
	*
	* If it returns true, it means the item was selected and whatever is calling
	* this function should return early
	*
	*/
	#handleKeyboardSelection() {
		const isCurrentSelectedValue = this.root.highlightedValue === this.root.opts.value.current;
		if (!this.root.opts.allowDeselect.current && isCurrentSelectedValue && !this.root.isMulti) {
			this.root.handleClose();
			return true;
		}
		if (this.root.highlightedValue !== null) this.root.toggleItem(this.root.highlightedValue, this.root.highlightedLabel ?? void 0);
		if (!this.root.isMulti && !isCurrentSelectedValue) {
			this.root.handleClose();
			return true;
		}
		return false;
	}
	onkeydown(e) {
		this.root.isUsingKeyboard = true;
		if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
		if (!this.root.opts.open.current) {
			if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				this.root.handleOpen();
			} else if (!this.root.isMulti && this.root.dataTypeaheadEnabled) {
				this.#dataTypeahead.handleTypeaheadSearch(e.key);
				return;
			}
			if (this.root.hasValue) return;
			const candidateNodes = this.root.getCandidateNodes();
			if (!candidateNodes.length) return;
			if (e.key === "ArrowDown") {
				const firstCandidate = candidateNodes[0];
				this.root.setHighlightedNode(firstCandidate);
			} else if (e.key === "ArrowUp") {
				const lastCandidate = candidateNodes[candidateNodes.length - 1];
				this.root.setHighlightedNode(lastCandidate);
			}
			return;
		}
		if (e.key === "Tab") {
			this.root.handleClose();
			return;
		}
		if ((e.key === "Enter" || e.key === " " && this.#domTypeahead.search === "") && !e.isComposing) {
			e.preventDefault();
			if (this.#handleKeyboardSelection()) return;
		}
		if (e.key === "ArrowUp" && e.altKey) this.root.handleClose();
		if (FIRST_LAST_KEYS.includes(e.key)) {
			e.preventDefault();
			const candidateNodes = this.root.getCandidateNodes();
			const currHighlightedNode = this.root.highlightedNode;
			const currIndex = currHighlightedNode ? candidateNodes.indexOf(currHighlightedNode) : -1;
			const loop = this.root.opts.loop.current;
			let nextItem;
			if (e.key === "ArrowDown") nextItem = next(candidateNodes, currIndex, loop);
			else if (e.key === "ArrowUp") nextItem = prev(candidateNodes, currIndex, loop);
			else if (e.key === "PageDown") nextItem = forward(candidateNodes, currIndex, 10, loop);
			else if (e.key === "PageUp") nextItem = backward(candidateNodes, currIndex, 10, loop);
			else if (e.key === "Home") nextItem = candidateNodes[0];
			else if (e.key === "End") nextItem = candidateNodes[candidateNodes.length - 1];
			if (!nextItem) return;
			this.root.setHighlightedNode(nextItem);
			return;
		}
		const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
		const isCharacterKey = e.key.length === 1;
		const isSpaceKey = e.key === " ";
		const candidateNodes = this.root.getCandidateNodes();
		if (e.key === "Tab") return;
		if (!isModifierKey && (isCharacterKey || isSpaceKey)) {
			if (!this.#domTypeahead.handleTypeaheadSearch(e.key, candidateNodes) && isSpaceKey) {
				e.preventDefault();
				this.#handleKeyboardSelection();
			}
			return;
		}
		if (!this.root.highlightedNode) this.root.setHighlightedToFirstCandidate();
	}
	onclick(e) {
		e.currentTarget.focus();
	}
	onpointerdown(e) {
		if (this.root.opts.disabled.current) return;
		if (e.pointerType === "touch") return e.preventDefault();
		const target = e.target;
		if (target?.hasPointerCapture(e.pointerId)) target?.releasePointerCapture(e.pointerId);
		if (e.button === 0 && e.ctrlKey === false) if (this.root.opts.open.current === false) this.#handlePointerOpen(e);
		else this.root.handleClose();
	}
	onpointerup(e) {
		if (this.root.opts.disabled.current) return;
		e.preventDefault();
		if (e.pointerType === "touch") if (this.root.opts.open.current === false) this.#handlePointerOpen(e);
		else this.root.handleClose();
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		disabled: this.root.opts.disabled.current ? true : void 0,
		"aria-haspopup": "listbox",
		"aria-expanded": boolToStr(this.root.opts.open.current),
		"aria-activedescendant": this.root.highlightedId,
		"data-state": getDataOpenClosed(this.root.opts.open.current),
		"data-disabled": boolToEmptyStrOrUndef(this.root.opts.disabled.current),
		"data-placeholder": this.root.hasValue ? void 0 : "",
		[this.root.getBitsAttr("trigger")]: "",
		onpointerdown: this.onpointerdown,
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		onpointerup: this.onpointerup,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var SelectContentState = class SelectContentState {
	static create(opts) {
		return SelectContentContext.set(new SelectContentState(opts, SelectRootContext.get()));
	}
	opts;
	root;
	attachment;
	isPositioned = false;
	domContext;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(opts.ref, (v) => this.root.contentNode = v);
		this.domContext = new DOMContext(this.opts.ref);
		if (this.root.domContext === null) this.root.domContext = this.domContext;
		watch(() => this.root.opts.open.current, () => {
			if (this.root.opts.open.current) return;
			this.root.contentIsPositioned = false;
			this.isPositioned = false;
		});
		watch([() => this.isPositioned, () => this.root.highlightedNode], () => {
			if (!this.isPositioned || !this.root.highlightedNode) return;
			this.root.scrollHighlightedNodeIntoView(this.root.highlightedNode);
		});
		this.onpointermove = this.onpointermove.bind(this);
	}
	onpointermove(_) {
		this.root.isUsingKeyboard = false;
	}
	#styles = derived(() => {
		return getFloatingContentCSSVars(this.root.isCombobox ? "combobox" : "select");
	});
	onInteractOutside = (e) => {
		if (e.target === this.root.triggerNode || e.target === this.root.inputNode) {
			e.preventDefault();
			return;
		}
		this.opts.onInteractOutside.current(e);
		if (e.defaultPrevented) return;
		this.root.handleClose();
	};
	onEscapeKeydown = (e) => {
		this.opts.onEscapeKeydown.current(e);
		if (e.defaultPrevented) return;
		this.root.handleClose();
	};
	onOpenAutoFocus = (e) => {
		e.preventDefault();
	};
	onCloseAutoFocus = (e) => {
		e.preventDefault();
	};
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
	#snippetProps = derived(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-multiselectable": this.root.isMulti ? "true" : void 0,
		"data-state": getDataOpenClosed(this.root.opts.open.current),
		...getDataTransitionAttrs(this.root.contentPresence.transitionStatus),
		[this.root.getBitsAttr("content")]: "",
		style: {
			display: "flex",
			flexDirection: "column",
			outline: "none",
			boxSizing: "border-box",
			pointerEvents: "auto",
			...this.#styles()
		},
		onpointermove: this.onpointermove,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus,
		trapFocus: false,
		loop: false,
		onPlaced: () => {
			if (this.root.opts.open.current) {
				this.root.contentIsPositioned = true;
				this.isPositioned = true;
			}
		}
	};
};
var SelectItemState = class SelectItemState {
	static create(opts) {
		return new SelectItemState(opts, SelectRootContext.get());
	}
	opts;
	root;
	attachment;
	#isSelected = derived(() => this.root.includesItem(this.opts.value.current));
	get isSelected() {
		return this.#isSelected();
	}
	set isSelected($$value) {
		return this.#isSelected($$value);
	}
	#isHighlighted = derived(() => this.root.highlightedValue === this.opts.value.current);
	get isHighlighted() {
		return this.#isHighlighted();
	}
	set isHighlighted($$value) {
		return this.#isHighlighted($$value);
	}
	prevHighlighted = new Previous(() => this.isHighlighted);
	mounted = false;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(opts.ref);
		watch([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
			if (this.isHighlighted) this.opts.onHighlight.current();
			else if (this.prevHighlighted.current) this.opts.onUnhighlight.current();
		});
		watch(() => this.mounted, () => {
			if (!this.mounted) return;
			this.root.setInitialHighlightedNode();
		});
		this.onpointerdown = this.onpointerdown.bind(this);
		this.onpointerup = this.onpointerup.bind(this);
		this.onpointermove = this.onpointermove.bind(this);
	}
	handleSelect() {
		if (this.opts.disabled.current) return;
		const isCurrentSelectedValue = this.opts.value.current === this.root.opts.value.current;
		if (!this.root.opts.allowDeselect.current && isCurrentSelectedValue && !this.root.isMulti) {
			this.root.handleClose();
			return;
		}
		this.root.toggleItem(this.opts.value.current, this.opts.label.current);
		if (!this.root.isMulti && !isCurrentSelectedValue) this.root.handleClose();
	}
	#snippetProps = derived(() => ({
		selected: this.isSelected,
		highlighted: this.isHighlighted
	}));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	onpointerdown(e) {
		e.preventDefault();
	}
	/**
	* Using `pointerup` instead of `click` allows power users to pointerdown
	* the trigger, then release pointerup on an item to select it vs having to do
	* multiple clicks.
	*/
	onpointerup(e) {
		if (e.defaultPrevented || !this.opts.ref.current) return;
		/**
		* For one reason or another, when it's a touch pointer and _not_ on IOS,
		* we need to listen for the immediate click event to handle the selection,
		* otherwise a click event will fire on the element _behind_ the item.
		*/
		if (e.pointerType === "touch" && !isIOS) {
			on(this.opts.ref.current, "click", () => {
				this.handleSelect();
				this.root.setHighlightedNode(this.opts.ref.current);
			}, { once: true });
			return;
		}
		e.preventDefault();
		this.handleSelect();
		if (e.pointerType === "touch") this.root.setHighlightedNode(this.opts.ref.current);
	}
	onpointermove(e) {
		/**
		* We don't want to highlight items on touch devices when scrolling,
		* as this is confusing behavior, so we return here and instead handle
		* the highlighting on the `pointerup` (or following `click`) event for
		* touch devices only.
		*/
		if (e.pointerType === "touch") return;
		if (this.root.highlightedNode !== this.opts.ref.current) this.root.setHighlightedNode(this.opts.ref.current);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "option",
		"aria-selected": this.root.includesItem(this.opts.value.current) ? "true" : void 0,
		"data-value": this.opts.value.current,
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		"data-highlighted": this.root.highlightedValue === this.opts.value.current && !this.opts.disabled.current ? "" : void 0,
		"data-selected": this.root.includesItem(this.opts.value.current) ? "" : void 0,
		"data-label": this.opts.label.current,
		[this.root.getBitsAttr("item")]: "",
		onpointermove: this.onpointermove,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var SelectGroupState = class SelectGroupState {
	static create(opts) {
		return SelectGroupContext.set(new SelectGroupState(opts, SelectRootContext.get()));
	}
	opts;
	root;
	labelNode = null;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "group",
		[this.root.getBitsAttr("group")]: "",
		"aria-labelledby": this.labelNode?.id ?? void 0,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var SelectHiddenInputState = class SelectHiddenInputState {
	static create(opts) {
		return new SelectHiddenInputState(opts, SelectRootContext.get());
	}
	opts;
	root;
	#shouldRender = derived(() => this.root.opts.name.current !== "");
	get shouldRender() {
		return this.#shouldRender();
	}
	set shouldRender($$value) {
		return this.#shouldRender($$value);
	}
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		e.preventDefault();
		if (!this.root.isCombobox) this.root.triggerNode?.focus();
		else this.root.inputNode?.focus();
	}
	#props = derived(() => ({
		disabled: boolToTrueOrUndef(this.root.opts.disabled.current),
		required: boolToTrueOrUndef(this.root.opts.required.current),
		name: this.root.opts.name.current,
		value: this.opts.value.current,
		onfocus: this.onfocus
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var SelectViewportState = class SelectViewportState {
	static create(opts) {
		return new SelectViewportState(opts, SelectContentContext.get());
	}
	opts;
	content;
	root;
	attachment;
	prevScrollTop = 0;
	constructor(opts, content) {
		this.opts = opts;
		this.content = content;
		this.root = content.root;
		this.attachment = attachRef(opts.ref, (v) => {
			this.root.viewportNode = v;
		});
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "presentation",
		[this.root.getBitsAttr("viewport")]: "",
		style: {
			position: "relative",
			flex: 1,
			overflow: "auto"
		},
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var SelectScrollButtonImplState = class {
	opts;
	content;
	root;
	attachment;
	autoScrollTimer = null;
	userScrollTimer = -1;
	isUserScrolling = false;
	onAutoScroll = noop$1;
	mounted = false;
	constructor(opts, content) {
		this.opts = opts;
		this.content = content;
		this.root = content.root;
		this.attachment = attachRef(opts.ref);
		watch([() => this.mounted], () => {
			if (!this.mounted) {
				this.isUserScrolling = false;
				return;
			}
			if (this.isUserScrolling) return;
		});
		this.onpointerdown = this.onpointerdown.bind(this);
		this.onpointermove = this.onpointermove.bind(this);
		this.onpointerleave = this.onpointerleave.bind(this);
	}
	handleUserScroll() {
		this.content.domContext.clearTimeout(this.userScrollTimer);
		this.isUserScrolling = true;
		this.userScrollTimer = this.content.domContext.setTimeout(() => {
			this.isUserScrolling = false;
		}, 200);
	}
	clearAutoScrollInterval() {
		if (this.autoScrollTimer === null) return;
		this.content.domContext.clearTimeout(this.autoScrollTimer);
		this.autoScrollTimer = null;
	}
	onpointerdown(_) {
		if (this.autoScrollTimer !== null) return;
		const autoScroll = (tick) => {
			this.onAutoScroll();
			this.autoScrollTimer = this.content.domContext.setTimeout(() => autoScroll(tick + 1), this.opts.delay.current(tick));
		};
		this.autoScrollTimer = this.content.domContext.setTimeout(() => autoScroll(1), this.opts.delay.current(0));
	}
	onpointermove(e) {
		this.onpointerdown(e);
	}
	onpointerleave(_) {
		this.clearAutoScrollInterval();
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"aria-hidden": boolToStrTrueOrUndef(true),
		style: { flexShrink: 0 },
		onpointerdown: this.onpointerdown,
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var SelectScrollDownButtonState = class SelectScrollDownButtonState {
	static create(opts) {
		return new SelectScrollDownButtonState(new SelectScrollButtonImplState(opts, SelectContentContext.get()));
	}
	scrollButtonState;
	content;
	root;
	canScrollDown = false;
	scrollIntoViewTimer = null;
	constructor(scrollButtonState) {
		this.scrollButtonState = scrollButtonState;
		this.content = scrollButtonState.content;
		this.root = scrollButtonState.root;
		this.scrollButtonState.onAutoScroll = this.handleAutoScroll;
		watch([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!this.root.viewportNode || !this.content.isPositioned) return;
			this.handleScroll(true);
			return on(this.root.viewportNode, "scroll", () => this.handleScroll());
		});
		/**
		* If the input value changes, this means that the filtered items may have changed,
		* so we need to re-evaluate the scroll-ability of the list.
		*/
		watch([
			() => this.root.opts.inputValue.current,
			() => this.root.viewportNode,
			() => this.content.isPositioned
		], () => {
			if (!this.root.viewportNode || !this.content.isPositioned) return;
			this.handleScroll(true);
		});
		watch(() => this.scrollButtonState.mounted, () => {
			if (!this.scrollButtonState.mounted) return;
			if (this.scrollIntoViewTimer) clearTimeout(this.scrollIntoViewTimer);
			this.scrollIntoViewTimer = afterSleep(5, () => {
				const activeItem = this.root.highlightedNode;
				if (!activeItem) return;
				this.root.scrollHighlightedNodeIntoView(activeItem);
			});
		});
	}
	/**
	* @param manual - if true, it means the function was invoked manually outside of an event
	* listener, so we don't call `handleUserScroll` to prevent the auto scroll from kicking in.
	*/
	handleScroll = (manual = false) => {
		if (!manual) this.scrollButtonState.handleUserScroll();
		if (!this.root.viewportNode) return;
		const maxScroll = this.root.viewportNode.scrollHeight - this.root.viewportNode.clientHeight;
		const paddingTop = Number.parseInt(getComputedStyle(this.root.viewportNode).paddingTop, 10);
		this.canScrollDown = Math.ceil(this.root.viewportNode.scrollTop) < maxScroll - paddingTop;
	};
	handleAutoScroll = () => {
		const viewport = this.root.viewportNode;
		const selectedItem = this.root.highlightedNode;
		if (!viewport || !selectedItem) return;
		viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
	};
	#props = derived(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-down-button")]: ""
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var SelectScrollUpButtonState = class SelectScrollUpButtonState {
	static create(opts) {
		return new SelectScrollUpButtonState(new SelectScrollButtonImplState(opts, SelectContentContext.get()));
	}
	scrollButtonState;
	content;
	root;
	canScrollUp = false;
	constructor(scrollButtonState) {
		this.scrollButtonState = scrollButtonState;
		this.content = scrollButtonState.content;
		this.root = scrollButtonState.root;
		this.scrollButtonState.onAutoScroll = this.handleAutoScroll;
		watch([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!this.root.viewportNode || !this.content.isPositioned) return;
			this.handleScroll(true);
			return on(this.root.viewportNode, "scroll", () => this.handleScroll());
		});
	}
	/**
	* @param manual - if true, it means the function was invoked manually outside of an event
	* listener, so we don't call `handleUserScroll` to prevent the auto scroll from kicking in.
	*/
	handleScroll = (manual = false) => {
		if (!manual) this.scrollButtonState.handleUserScroll();
		if (!this.root.viewportNode) return;
		const paddingTop = Number.parseInt(getComputedStyle(this.root.viewportNode).paddingTop, 10);
		this.canScrollUp = this.root.viewportNode.scrollTop - paddingTop > .1;
	};
	handleAutoScroll = () => {
		if (!this.root.viewportNode || !this.root.highlightedNode) return;
		this.root.viewportNode.scrollTop = this.root.viewportNode.scrollTop - this.root.highlightedNode.offsetHeight;
	};
	#props = derived(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-up-button")]: ""
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/select/components/select-hidden-input.svelte
function Select_hidden_input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = void 0, autocomplete } = $$props;
		const hiddenInputState = SelectHiddenInputState.create({ value: boxWith(() => value) });
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (hiddenInputState.shouldRender) {
				$$renderer.push("<!--[0-->");
				Hidden_input($$renderer, spread_props([hiddenInputState.props, {
					autocomplete,
					get value() {
						return value;
					},
					set value($$value) {
						value = $$value;
						$$settled = false;
					}
				}]));
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { value });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/select/components/select-content.svelte
function Select_content$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, forceMount = false, side = "bottom", onInteractOutside = noop$1, onEscapeKeydown = noop$1, children, child, preventScroll = false, style, $$slots, $$events, ...restProps } = $$props;
		const contentState = SelectContentState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			onInteractOutside: boxWith(() => onInteractOutside),
			onEscapeKeydown: boxWith(() => onEscapeKeydown)
		});
		const mergedProps = derived(() => mergeProps(restProps, contentState.props));
		if (forceMount) {
			$$renderer.push("<!--[0-->");
			{
				function popper($$renderer, { props, wrapperProps }) {
					const finalProps = mergeProps(props, { style: contentState.props.style }, { style });
					if (child) {
						$$renderer.push("<!--[0-->");
						child($$renderer, {
							props: finalProps,
							wrapperProps,
							...contentState.snippetProps
						});
						$$renderer.push(`<!---->`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
						children?.($$renderer);
						$$renderer.push(`<!----></div></div>`);
					}
					$$renderer.push(`<!--]-->`);
				}
				Popper_layer_force_mount($$renderer, spread_props([
					mergedProps(),
					contentState.popperProps,
					{
						ref: contentState.opts.ref,
						side,
						enabled: contentState.root.opts.open.current,
						id,
						preventScroll,
						forceMount: true,
						shouldRender: contentState.shouldRender,
						popper,
						$$slots: { popper: true }
					}
				]));
			}
		} else if (!forceMount) {
			$$renderer.push("<!--[1-->");
			{
				function popper($$renderer, { props, wrapperProps }) {
					const finalProps = mergeProps(props, { style: contentState.props.style }, { style });
					if (child) {
						$$renderer.push("<!--[0-->");
						child($$renderer, {
							props: finalProps,
							wrapperProps,
							...contentState.snippetProps
						});
						$$renderer.push(`<!---->`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
						children?.($$renderer);
						$$renderer.push(`<!----></div></div>`);
					}
					$$renderer.push(`<!--]-->`);
				}
				Popper_layer($$renderer, spread_props([
					mergedProps(),
					contentState.popperProps,
					{
						ref: contentState.opts.ref,
						side,
						open: contentState.root.opts.open.current,
						id,
						preventScroll,
						forceMount: false,
						shouldRender: contentState.shouldRender,
						popper,
						$$slots: { popper: true }
					}
				]));
			}
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/utilities/mounted.svelte
function Mounted($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { mounted = false, onMountedChange = noop$1 } = $$props;
		bind_props($$props, { mounted });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/select/components/select-item.svelte
function Select_item$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, value, label = value, disabled = false, children, child, onHighlight = noop$1, onUnhighlight = noop$1, $$slots, $$events, ...restProps } = $$props;
		const itemState = SelectItemState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			value: boxWith(() => value),
			disabled: boxWith(() => disabled),
			label: boxWith(() => label),
			onHighlight: boxWith(() => onHighlight),
			onUnhighlight: boxWith(() => onUnhighlight)
		});
		const mergedProps = derived(() => mergeProps(restProps, itemState.props));
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (child) {
				$$renderer.push("<!--[0-->");
				child($$renderer, {
					props: mergedProps(),
					...itemState.snippetProps
				});
				$$renderer.push(`<!---->`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
				children?.($$renderer, itemState.snippetProps);
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--> `);
			Mounted($$renderer, {
				get mounted() {
					return itemState.mounted;
				},
				set mounted($$value) {
					itemState.mounted = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!---->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/select/components/select-group.svelte
function Select_group$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, children, child, $$slots, $$events, ...restProps } = $$props;
		const groupState = SelectGroupState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, groupState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/select/components/select-viewport.svelte
function Select_viewport($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, children, child, $$slots, $$events, ...restProps } = $$props;
		const viewportState = SelectViewportState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, viewportState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/select/components/select-scroll-down-button.svelte
function Select_scroll_down_button$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, delay = () => 50, child, children, $$slots, $$events, ...restProps } = $$props;
		const scrollButtonState = SelectScrollDownButtonState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			delay: boxWith(() => delay)
		});
		const mergedProps = derived(() => mergeProps(restProps, scrollButtonState.props));
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (scrollButtonState.canScrollDown) {
				$$renderer.push("<!--[0-->");
				Mounted($$renderer, {
					get mounted() {
						return scrollButtonState.scrollButtonState.mounted;
					},
					set mounted($$value) {
						scrollButtonState.scrollButtonState.mounted = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				if (child) {
					$$renderer.push("<!--[0-->");
					child($$renderer, { props: restProps });
					$$renderer.push(`<!---->`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
					children?.($$renderer);
					$$renderer.push(`<!----></div>`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/select/components/select-scroll-up-button.svelte
function Select_scroll_up_button$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, delay = () => 50, child, children, $$slots, $$events, ...restProps } = $$props;
		const scrollButtonState = SelectScrollUpButtonState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			delay: boxWith(() => delay)
		});
		const mergedProps = derived(() => mergeProps(restProps, scrollButtonState.props));
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (scrollButtonState.canScrollUp) {
				$$renderer.push("<!--[0-->");
				Mounted($$renderer, {
					get mounted() {
						return scrollButtonState.scrollButtonState.mounted;
					},
					set mounted($$value) {
						scrollButtonState.scrollButtonState.mounted = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				if (child) {
					$$renderer.push("<!--[0-->");
					child($$renderer, { props: restProps });
					$$renderer.push(`<!---->`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
					children?.($$renderer);
					$$renderer.push(`<!----></div>`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/select/components/select.svelte
function Select$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = void 0, onValueChange = noop$1, name = "", disabled = false, type, open = false, onOpenChange = noop$1, onOpenChangeComplete = noop$1, loop = false, scrollAlignment = "nearest", required = false, items = [], allowDeselect = false, autocomplete, children } = $$props;
		function handleDefaultValue() {
			if (value !== void 0) return;
			value = type === "single" ? "" : [];
		}
		handleDefaultValue();
		watch.pre(() => value, () => {
			handleDefaultValue();
		});
		let inputValue = "";
		const rootState = SelectRootState.create({
			type,
			value: boxWith(() => value, (v) => {
				value = v;
				onValueChange(v);
			}),
			disabled: boxWith(() => disabled),
			required: boxWith(() => required),
			open: boxWith(() => open, (v) => {
				open = v;
				onOpenChange(v);
			}),
			loop: boxWith(() => loop),
			scrollAlignment: boxWith(() => scrollAlignment),
			name: boxWith(() => name),
			isCombobox: false,
			items: boxWith(() => items),
			allowDeselect: boxWith(() => allowDeselect),
			inputValue: boxWith(() => inputValue, (v) => inputValue = v),
			onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			Floating_layer($$renderer, {
				children: ($$renderer) => {
					children?.($$renderer);
					$$renderer.push(`<!---->`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			if (Array.isArray(rootState.opts.value.current)) {
				$$renderer.push("<!--[0-->");
				if (rootState.opts.value.current.length === 0) {
					$$renderer.push("<!--[0-->");
					Select_hidden_input($$renderer, { autocomplete });
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--[-->`);
					const each_array = ensure_array_like(rootState.opts.value.current);
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let item = each_array[$$index];
						Select_hidden_input($$renderer, {
							value: item,
							autocomplete
						});
					}
					$$renderer.push(`<!--]-->`);
				}
				$$renderer.push(`<!--]-->`);
			} else {
				$$renderer.push("<!--[-1-->");
				Select_hidden_input($$renderer, {
					autocomplete,
					get value() {
						return rootState.opts.value.current;
					},
					set value($$value) {
						rootState.opts.value.current = $$value;
						$$settled = false;
					}
				});
			}
			$$renderer.push(`<!--]-->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, {
			value,
			open
		});
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.3_svelte@5.56.8/node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte
function Select_trigger$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, child, children, type = "button", $$slots, $$events, ...restProps } = $$props;
		const triggerState = SelectTriggerState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, triggerState.props, { type }));
		if (Floating_layer_anchor) {
			$$renderer.push("<!--[-->");
			Floating_layer_anchor($$renderer, {
				id,
				ref: triggerState.opts.ref,
				children: ($$renderer) => {
					if (child) {
						$$renderer.push("<!--[0-->");
						child($$renderer, { props: mergedProps() });
						$$renderer.push(`<!---->`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<button${attributes({ ...mergedProps() })}>`);
						children?.($$renderer);
						$$renderer.push(`<!----></button>`);
					}
					$$renderer.push(`<!--]-->`);
				},
				$$slots: { default: true }
			});
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/table/table.svelte
function Table($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div data-slot="table-container" class="relative w-full overflow-x-auto"><table${attributes({
			"data-slot": "table",
			class: clsx(cn("w-full caption-bottom text-sm", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></table></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/table/table-body.svelte
function Table_body($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<tbody${attributes({
			"data-slot": "table-body",
			class: clsx(cn("[&_tr:last-child]:border-0", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></tbody>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/table/table-cell.svelte
function Table_cell($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<td${attributes({
			"data-slot": "table-cell",
			class: clsx(cn("bg-clip-padding p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></td>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/table/table-head.svelte
function Table_head($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<th${attributes({
			"data-slot": "table-head",
			class: clsx(cn("text-foreground h-10 bg-clip-padding px-2 text-start align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pe-0", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></th>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/table/table-header.svelte
function Table_header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<thead${attributes({
			"data-slot": "table-header",
			class: clsx(cn("[&_tr]:border-b", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></thead>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/table/table-row.svelte
function Table_row($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<tr${attributes({
			"data-slot": "table-row",
			class: clsx(cn("hover:[&,&>svelte-css-wrapper]:[&>th,td]:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></tr>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/select/select.svelte
function Select($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, value = void 0, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Select$1) {
				$$renderer.push("<!--[-->");
				Select$1($$renderer, spread_props([restProps, {
					get open() {
						return open;
					},
					set open($$value) {
						open = $$value;
						$$settled = false;
					},
					get value() {
						return value;
					},
					set value($$value) {
						value = $$value;
						$$settled = false;
					}
				}]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, {
			open,
			value
		});
	});
}
//#endregion
//#region src/lib/components/ui/select/select-group.svelte
function Select_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Select_group$1) {
				$$renderer.push("<!--[-->");
				Select_group$1($$renderer, spread_props([
					{ "data-slot": "select-group" },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/select/select-item.svelte
function Select_item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, value, label, children: childrenProp, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			{
				function children($$renderer, { selected, highlighted }) {
					$$renderer.push(`<span class="absolute end-2 flex size-3.5 items-center justify-center">`);
					if (selected) {
						$$renderer.push("<!--[0-->");
						Icon($$renderer, {
							icon: "lucide:check",
							class: "size-4"
						});
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></span> `);
					if (childrenProp) {
						$$renderer.push("<!--[0-->");
						childrenProp($$renderer, {
							selected,
							highlighted
						});
						$$renderer.push(`<!---->`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`${escape_html(label || value)}`);
					}
					$$renderer.push(`<!--]-->`);
				}
				if (Select_item$1) {
					$$renderer.push("<!--[-->");
					Select_item$1($$renderer, spread_props([
						{
							value,
							"data-slot": "select-item",
							class: cn("data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 ps-2 pe-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className)
						},
						restProps,
						{
							get ref() {
								return ref;
							},
							set ref($$value) {
								ref = $$value;
								$$settled = false;
							},
							children,
							$$slots: { default: true }
						}
					]));
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/select/select-portal.svelte
function Select_portal($$renderer, $$props) {
	let { $$slots, $$events, ...restProps } = $$props;
	if (Portal) {
		$$renderer.push("<!--[-->");
		Portal($$renderer, spread_props([restProps]));
		$$renderer.push("<!--]-->");
	} else {
		$$renderer.push("<!--[!-->");
		$$renderer.push("<!--]-->");
	}
}
//#endregion
//#region src/lib/components/ui/select/select-scroll-up-button.svelte
function Select_scroll_up_button($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Select_scroll_up_button$1) {
				$$renderer.push("<!--[-->");
				Select_scroll_up_button$1($$renderer, spread_props([
					{
						"data-slot": "select-scroll-up-button",
						class: cn("flex cursor-default items-center justify-center py-1", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						},
						children: ($$renderer) => {
							Icon($$renderer, {
								icon: "lucide:chevron-up",
								class: "size-4"
							});
						},
						$$slots: { default: true }
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/select/select-scroll-down-button.svelte
function Select_scroll_down_button($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Select_scroll_down_button$1) {
				$$renderer.push("<!--[-->");
				Select_scroll_down_button$1($$renderer, spread_props([
					{
						"data-slot": "select-scroll-down-button",
						class: cn("flex cursor-default items-center justify-center py-1", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						},
						children: ($$renderer) => {
							Icon($$renderer, {
								icon: "lucide:chevron-down",
								class: "size-4"
							});
						},
						$$slots: { default: true }
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/select/select-content.svelte
function Select_content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, sideOffset = 4, portalProps, children, preventScroll = true, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			Select_portal($$renderer, spread_props([portalProps, {
				children: ($$renderer) => {
					if (Select_content$1) {
						$$renderer.push("<!--[-->");
						Select_content$1($$renderer, spread_props([
							{
								sideOffset,
								preventScroll,
								"data-slot": "select-content",
								class: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--bits-select-content-available-height) min-w-[8rem] origin-(--bits-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className)
							},
							restProps,
							{
								get ref() {
									return ref;
								},
								set ref($$value) {
									ref = $$value;
									$$settled = false;
								},
								children: ($$renderer) => {
									Select_scroll_up_button($$renderer, {});
									$$renderer.push(`<!----> `);
									if (Select_viewport) {
										$$renderer.push("<!--[-->");
										Select_viewport($$renderer, {
											class: cn("h-(--bits-select-anchor-height) w-full min-w-(--bits-select-anchor-width) scroll-my-1 p-1"),
											children: ($$renderer) => {
												children?.($$renderer);
												$$renderer.push(`<!---->`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(` `);
									Select_scroll_down_button($$renderer, {});
									$$renderer.push(`<!---->`);
								},
								$$slots: { default: true }
							}
						]));
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				},
				$$slots: { default: true }
			}]));
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/select/select-trigger.svelte
function Select_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, size = "default", $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Select_trigger$1) {
				$$renderer.push("<!--[-->");
				Select_trigger$1($$renderer, spread_props([
					{
						"data-slot": "select-trigger",
						"data-size": size,
						class: cn("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none select-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						},
						children: ($$renderer) => {
							children?.($$renderer);
							$$renderer.push(`<!----> `);
							Icon($$renderer, {
								icon: "lucide:chevron-down",
								class: "size-4 shrink-0 opacity-50"
							});
							$$renderer.push(`<!---->`);
						},
						$$slots: { default: true }
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/avatar/avatar-fallback.svelte
function Avatar_fallback($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Avatar_fallback$1) {
				$$renderer.push("<!--[-->");
				Avatar_fallback$1($$renderer, spread_props([
					{
						"data-slot": "avatar-fallback",
						class: cn("rounded-full bg-muted text-muted-foreground flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/avatar/avatar.svelte
function Avatar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, loadingStatus = "loading", size = "default", class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Avatar$1) {
				$$renderer.push("<!--[-->");
				Avatar$1($$renderer, spread_props([
					{
						"data-slot": "avatar",
						"data-size": size,
						class: cn("size-8 rounded-full after:rounded-full data-[size=lg]:size-10 data-[size=sm]:size-6 group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						},
						get loadingStatus() {
							return loadingStatus;
						},
						set loadingStatus($$value) {
							loadingStatus = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, {
			ref,
			loadingStatus
		});
	});
}
//#endregion
//#region src/lib/components/ui/AnimatedIcon.svelte
function AnimatedIcon($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { scale = 1.12, duration = 200, lift = -2, class: className = "", $$slots, $$events, ...iconProps } = $$props;
		$$renderer.push(`<span${attr_class(`inline-flex items-center justify-center ${stringify(className)}`)} role="presentation">`);
		Icon($$renderer, spread_props([iconProps, { class: "size-full" }]));
		$$renderer.push(`<!----></span>`);
	});
}
//#endregion
//#region src/components/users/UsersPage.svelte
function UsersPage($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let users = [];
		let roles = [];
		let loading = true;
		let error = null;
		let statusFilter = "all";
		let search = "";
		let dialogOpen = false;
		let editingUser = null;
		let formEmail = "";
		let formFullName = "";
		let formRoleId = "";
		let saving = false;
		let formError = null;
		let approveDialogOpen = false;
		let approvalUser = null;
		let approveRoleId = "";
		let approveSaving = false;
		let approveError = null;
		let linkResult = null;
		let deleteConfirmUser = null;
		let syncing = false;
		let syncMessage = null;
		async function load() {
			loading = true;
			error = null;
			try {
				const status = statusFilter === "all" ? "" : statusFilter;
				const [usersResp, rolesResp] = await Promise.all([listUsers(status, search), listRoles()]);
				users = usersResp.users;
				roles = rolesResp;
			} catch (e) {
				error = e instanceof Error ? e.message : "Error al cargar usuarios";
			} finally {
				loading = false;
			}
		}
		function openCreate() {
			editingUser = null;
			formEmail = "";
			formFullName = "";
			formRoleId = roles[0]?.id ? String(roles[0].id) : "";
			formError = null;
			dialogOpen = true;
		}
		function openEdit(user) {
			editingUser = user;
			formEmail = user.email;
			formFullName = user.full_name;
			formRoleId = user.role?.id ? String(user.role.id) : "";
			formError = null;
			dialogOpen = true;
		}
		function closeDialog() {
			dialogOpen = false;
			editingUser = null;
		}
		function openApprove(user) {
			approvalUser = user;
			approveRoleId = user.role?.id ? String(user.role.id) : "";
			approveError = null;
			approveDialogOpen = true;
		}
		function closeApproveDialog() {
			approveDialogOpen = false;
			approvalUser = null;
			approveRoleId = "";
		}
		async function handleSave() {
			saving = true;
			formError = null;
			try {
				const roleId = Number(formRoleId);
				if (!formEmail || !formFullName || !editingUser && !roleId) {
					formError = "Completa todos los campos";
					return;
				}
				if (editingUser) await updateUser(editingUser.id, {
					email: formEmail,
					full_name: formFullName,
					role_id: roleId
				});
				else linkResult = (await createUser({
					email: formEmail,
					full_name: formFullName,
					role_id: roleId
				})).password_setup_link;
				closeDialog();
				await load();
			} catch (e) {
				formError = e instanceof Error ? e.message : "Error al guardar";
			} finally {
				saving = false;
			}
		}
		async function handleApprove() {
			if (!approvalUser || approvalUser.status !== "pending") return;
			const roleId = Number(approveRoleId);
			if (!roleId) {
				approveError = "Selecciona un rol antes de aprobar";
				return;
			}
			approveSaving = true;
			approveError = null;
			try {
				await approveUser(approvalUser.id, roleId);
				closeApproveDialog();
				await load();
			} catch (e) {
				approveError = e instanceof Error ? e.message : "Error al aprobar";
			} finally {
				approveSaving = false;
			}
		}
		async function toggleStatus(user) {
			const next = user.status === "active" ? "inactive" : "active";
			try {
				await updateUserStatus(user.id, next);
				await load();
			} catch (e) {
				error = e instanceof Error ? e.message : "Error al cambiar estado";
			}
		}
		async function handleDelete() {
			if (!deleteConfirmUser) return;
			try {
				await deleteUser(deleteConfirmUser.id);
				deleteConfirmUser = null;
				await load();
			} catch (e) {
				error = e instanceof Error ? e.message : "Error al eliminar";
			}
		}
		async function handleResetLink(user) {
			try {
				linkResult = await generatePasswordResetLink(user.id);
			} catch (e) {
				error = e instanceof Error ? e.message : "Error al generar enlace";
			}
		}
		async function handleSync() {
			syncing = true;
			syncMessage = null;
			try {
				syncMessage = `Sincronización completada: ${(await syncUsers()).imported} usuario(s) importado(s).`;
				await load();
			} catch (e) {
				error = e instanceof Error ? e.message : "Error al sincronizar usuarios";
			} finally {
				syncing = false;
			}
		}
		function roleLabel(id) {
			if (!id) return "—";
			return roles.find((r) => r.id === id)?.name ?? "—";
		}
		function statusLabel(status) {
			if (status === "active") return "Activo";
			if (status === "pending") return "Pendiente";
			return "Inactivo";
		}
		function statusClasses(status) {
			if (status === "active") return "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20";
			if (status === "pending") return "bg-amber-500/10 text-amber-700 ring-amber-600/20";
			return "bg-zinc-500/10 text-zinc-600 ring-zinc-600/20";
		}
		function statusDotClass(status) {
			if (status === "active") return "bg-emerald-500";
			if (status === "pending") return "bg-amber-500";
			return "bg-zinc-400";
		}
		function initials(name) {
			return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
		}
		const avatarColors = [
			"bg-sky-100 text-sky-700",
			"bg-violet-100 text-violet-700",
			"bg-rose-100 text-rose-700",
			"bg-emerald-100 text-emerald-700",
			"bg-amber-100 text-amber-700",
			"bg-teal-100 text-teal-700"
		];
		function avatarColor(id) {
			return avatarColors[id % avatarColors.length];
		}
		function rowActions(user) {
			return [
				user.status === "pending" && {
					key: "approve",
					label: "Aprobar",
					icon: "lucide:user-check",
					onClick: () => openApprove(user)
				},
				{
					key: "edit",
					label: "Editar",
					icon: "lucide:pencil",
					onClick: () => openEdit(user)
				},
				{
					key: "toggle",
					label: user.status === "active" ? "Desactivar" : "Activar",
					icon: user.status === "active" ? "lucide:user-x" : "lucide:user-check",
					disabled: user.status === "pending",
					onClick: () => toggleStatus(user)
				},
				{
					key: "link",
					label: "Enlace de acceso",
					icon: "lucide:link",
					onClick: () => handleResetLink(user)
				},
				{
					key: "delete",
					label: "Eliminar",
					icon: "lucide:trash-2",
					destructive: true,
					onClick: () => deleteConfirmUser = user
				}
			].filter(Boolean);
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Tooltip_provider) {
				$$renderer.push("<!--[-->");
				Tooltip_provider($$renderer, {
					children: ($$renderer) => {
						$$renderer.push(`<div class="space-y-4"><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 class="text-2xl font-bold">Usuarios</h2> <p class="mt-1 text-sm text-muted-foreground">Administra los usuarios del despacho, sus roles y su estado de acceso.</p></div> <div class="flex gap-2">`);
						Button($$renderer, {
							variant: "outline",
							onclick: handleSync,
							disabled: syncing,
							children: ($$renderer) => {
								Icon($$renderer, {
									icon: "lucide:refresh-cw",
									class: "h-4 w-4" + (syncing ? " animate-spin" : "")
								});
								$$renderer.push(`<!----> <span>${escape_html(syncing ? "Sincronizando..." : "Sincronizar")}</span>`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> `);
						Button($$renderer, {
							onclick: openCreate,
							children: ($$renderer) => {
								AnimatedIcon($$renderer, {
									icon: "lucide:plus",
									class: "h-4 w-4"
								});
								$$renderer.push(`<!----> <span>Nuevo usuario</span>`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----></div></div> `);
						if (syncMessage) {
							$$renderer.push("<!--[0-->");
							$$renderer.push(`<div class="flex items-start gap-2 rounded-md border border-emerald-500/50 bg-emerald-500/10 p-3 text-sm text-emerald-700">`);
							Icon($$renderer, {
								icon: "lucide:check-circle-2",
								class: "mt-0.5 h-4 w-4 shrink-0"
							});
							$$renderer.push(`<!----> <span>${escape_html(syncMessage)}</span></div>`);
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--> <div class="overflow-hidden rounded-xl border bg-card shadow-sm"><div class="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center"><div class="relative w-full sm:w-72">`);
						Icon($$renderer, {
							icon: "lucide:search",
							class: "pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
						});
						$$renderer.push(`<!----> `);
						Input($$renderer, {
							placeholder: "Buscar por nombre o correo...",
							class: "w-full pl-9",
							onkeydown: (e) => e.key === "Enter" && load(),
							get value() {
								return search;
							},
							set value($$value) {
								search = $$value;
								$$settled = false;
							}
						});
						$$renderer.push(`<!----></div> `);
						if (Select) {
							$$renderer.push("<!--[-->");
							Select($$renderer, {
								type: "single",
								value: statusFilter,
								onValueChange: (v) => {
									statusFilter = v;
									load();
								},
								children: ($$renderer) => {
									if (Select_trigger) {
										$$renderer.push("<!--[-->");
										Select_trigger($$renderer, {
											class: "w-full sm:w-40",
											children: ($$renderer) => {
												$$renderer.push(`<span>${escape_html(statusFilter === "all" ? "Todos" : statusFilter === "active" ? "Activos" : statusFilter === "pending" ? "Pendientes" : "Inactivos")}</span>`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(` `);
									if (Select_content) {
										$$renderer.push("<!--[-->");
										Select_content($$renderer, {
											children: ($$renderer) => {
												if (Select_group) {
													$$renderer.push("<!--[-->");
													Select_group($$renderer, {
														children: ($$renderer) => {
															if (Select_item) {
																$$renderer.push("<!--[-->");
																Select_item($$renderer, {
																	value: "all",
																	label: "Todos",
																	children: ($$renderer) => {
																		$$renderer.push(`<!---->Todos`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
															$$renderer.push(` `);
															if (Select_item) {
																$$renderer.push("<!--[-->");
																Select_item($$renderer, {
																	value: "active",
																	label: "Activos",
																	children: ($$renderer) => {
																		$$renderer.push(`<!---->Activos`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
															$$renderer.push(` `);
															if (Select_item) {
																$$renderer.push("<!--[-->");
																Select_item($$renderer, {
																	value: "inactive",
																	label: "Inactivos",
																	children: ($$renderer) => {
																		$$renderer.push(`<!---->Inactivos`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
															$$renderer.push(` `);
															if (Select_item) {
																$$renderer.push("<!--[-->");
																Select_item($$renderer, {
																	value: "pending",
																	label: "Pendientes",
																	children: ($$renderer) => {
																		$$renderer.push(`<!---->Pendientes`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
						$$renderer.push(`</div> `);
						if (error) {
							$$renderer.push("<!--[0-->");
							$$renderer.push(`<div class="flex items-start gap-2 border-b border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">`);
							Icon($$renderer, {
								icon: "lucide:alert-circle",
								class: "mt-0.5 h-4 w-4 shrink-0"
							});
							$$renderer.push(`<!----> <span>${escape_html(error)}</span></div>`);
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--> `);
						if (Table) {
							$$renderer.push("<!--[-->");
							Table($$renderer, {
								children: ($$renderer) => {
									if (Table_header) {
										$$renderer.push("<!--[-->");
										Table_header($$renderer, {
											children: ($$renderer) => {
												if (Table_row) {
													$$renderer.push("<!--[-->");
													Table_row($$renderer, {
														class: "bg-muted/40",
														children: ($$renderer) => {
															if (Table_head) {
																$$renderer.push("<!--[-->");
																Table_head($$renderer, {
																	class: "px-4 text-xs font-medium uppercase tracking-wide text-muted-foreground",
																	children: ($$renderer) => {
																		$$renderer.push(`<!---->Usuario`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
															$$renderer.push(` `);
															if (Table_head) {
																$$renderer.push("<!--[-->");
																Table_head($$renderer, {
																	class: "px-4 text-xs font-medium uppercase tracking-wide text-muted-foreground",
																	children: ($$renderer) => {
																		$$renderer.push(`<!---->Rol`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
															$$renderer.push(` `);
															if (Table_head) {
																$$renderer.push("<!--[-->");
																Table_head($$renderer, {
																	class: "px-4 text-xs font-medium uppercase tracking-wide text-muted-foreground",
																	children: ($$renderer) => {
																		$$renderer.push(`<!---->Estado`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
															$$renderer.push(` `);
															if (Table_head) {
																$$renderer.push("<!--[-->");
																Table_head($$renderer, {
																	class: "w-12 px-4 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground",
																	children: ($$renderer) => {
																		$$renderer.push(`<!---->Acciones`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(` `);
									if (Table_body) {
										$$renderer.push("<!--[-->");
										Table_body($$renderer, {
											children: ($$renderer) => {
												if (loading) {
													$$renderer.push("<!--[0-->");
													$$renderer.push(`<!--[-->`);
													const each_array = ensure_array_like([
														1,
														2,
														3
													]);
													for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
														each_array[$$index];
														if (Table_row) {
															$$renderer.push("<!--[-->");
															Table_row($$renderer, {
																children: ($$renderer) => {
																	if (Table_cell) {
																		$$renderer.push("<!--[-->");
																		Table_cell($$renderer, {
																			class: "px-4",
																			children: ($$renderer) => {
																				$$renderer.push(`<div class="flex items-center gap-3">`);
																				Skeleton($$renderer, { class: "size-9 rounded-full" });
																				$$renderer.push(`<!----> <div class="space-y-2">`);
																				Skeleton($$renderer, { class: "h-4 w-40" });
																				$$renderer.push(`<!----> `);
																				Skeleton($$renderer, { class: "h-3 w-56" });
																				$$renderer.push(`<!----></div></div>`);
																			},
																			$$slots: { default: true }
																		});
																		$$renderer.push("<!--]-->");
																	} else {
																		$$renderer.push("<!--[!-->");
																		$$renderer.push("<!--]-->");
																	}
																	$$renderer.push(` `);
																	if (Table_cell) {
																		$$renderer.push("<!--[-->");
																		Table_cell($$renderer, {
																			class: "px-4",
																			children: ($$renderer) => {
																				Skeleton($$renderer, { class: "h-4 w-20" });
																			},
																			$$slots: { default: true }
																		});
																		$$renderer.push("<!--]-->");
																	} else {
																		$$renderer.push("<!--[!-->");
																		$$renderer.push("<!--]-->");
																	}
																	$$renderer.push(` `);
																	if (Table_cell) {
																		$$renderer.push("<!--[-->");
																		Table_cell($$renderer, {
																			class: "px-4",
																			children: ($$renderer) => {
																				Skeleton($$renderer, { class: "h-5 w-20 rounded-full" });
																			},
																			$$slots: { default: true }
																		});
																		$$renderer.push("<!--]-->");
																	} else {
																		$$renderer.push("<!--[!-->");
																		$$renderer.push("<!--]-->");
																	}
																	$$renderer.push(` `);
																	if (Table_cell) {
																		$$renderer.push("<!--[-->");
																		Table_cell($$renderer, {
																			class: "px-4 text-right",
																			children: ($$renderer) => {
																				Skeleton($$renderer, { class: "ml-auto h-8 w-8 rounded-md" });
																			},
																			$$slots: { default: true }
																		});
																		$$renderer.push("<!--]-->");
																	} else {
																		$$renderer.push("<!--[!-->");
																		$$renderer.push("<!--]-->");
																	}
																},
																$$slots: { default: true }
															});
															$$renderer.push("<!--]-->");
														} else {
															$$renderer.push("<!--[!-->");
															$$renderer.push("<!--]-->");
														}
													}
													$$renderer.push(`<!--]-->`);
												} else if (users.length === 0) {
													$$renderer.push("<!--[1-->");
													if (Table_row) {
														$$renderer.push("<!--[-->");
														Table_row($$renderer, {
															children: ($$renderer) => {
																if (Table_cell) {
																	$$renderer.push("<!--[-->");
																	Table_cell($$renderer, {
																		colspan: 4,
																		class: "px-4",
																		children: ($$renderer) => {
																			$$renderer.push(`<div class="flex flex-col items-center justify-center gap-2 py-12 text-center">`);
																			Icon($$renderer, {
																				icon: "lucide:users",
																				class: "h-10 w-10 text-muted-foreground opacity-40"
																			});
																			$$renderer.push(`<!----> <p class="text-sm font-medium text-foreground">No se encontraron usuarios</p> <p class="text-xs text-muted-foreground">Ajusta los filtros de búsqueda o crea un nuevo usuario.</p></div>`);
																		},
																		$$slots: { default: true }
																	});
																	$$renderer.push("<!--]-->");
																} else {
																	$$renderer.push("<!--[!-->");
																	$$renderer.push("<!--]-->");
																}
															},
															$$slots: { default: true }
														});
														$$renderer.push("<!--]-->");
													} else {
														$$renderer.push("<!--[!-->");
														$$renderer.push("<!--]-->");
													}
												} else {
													$$renderer.push("<!--[-1-->");
													$$renderer.push(`<!--[-->`);
													const each_array_1 = ensure_array_like(users);
													for (let $$index_3 = 0, $$length = each_array_1.length; $$index_3 < $$length; $$index_3++) {
														let user = each_array_1[$$index_3];
														if (Table_row) {
															$$renderer.push("<!--[-->");
															Table_row($$renderer, {
																children: ($$renderer) => {
																	if (Table_cell) {
																		$$renderer.push("<!--[-->");
																		Table_cell($$renderer, {
																			class: "px-4",
																			children: ($$renderer) => {
																				$$renderer.push(`<div class="flex items-center gap-3">`);
																				if (Avatar) {
																					$$renderer.push("<!--[-->");
																					Avatar($$renderer, {
																						class: "size-9",
																						children: ($$renderer) => {
																							if (Avatar_fallback) {
																								$$renderer.push("<!--[-->");
																								Avatar_fallback($$renderer, {
																									class: avatarColor(user.id),
																									children: ($$renderer) => {
																										$$renderer.push(`<!---->${escape_html(initials(user.full_name))}`);
																									},
																									$$slots: { default: true }
																								});
																								$$renderer.push("<!--]-->");
																							} else {
																								$$renderer.push("<!--[!-->");
																								$$renderer.push("<!--]-->");
																							}
																						},
																						$$slots: { default: true }
																					});
																					$$renderer.push("<!--]-->");
																				} else {
																					$$renderer.push("<!--[!-->");
																					$$renderer.push("<!--]-->");
																				}
																				$$renderer.push(` <div class="min-w-0"><p class="truncate text-sm font-medium">${escape_html(user.full_name)}</p> <p class="truncate text-xs text-muted-foreground">${escape_html(user.email)}</p></div></div>`);
																			},
																			$$slots: { default: true }
																		});
																		$$renderer.push("<!--]-->");
																	} else {
																		$$renderer.push("<!--[!-->");
																		$$renderer.push("<!--]-->");
																	}
																	$$renderer.push(` `);
																	if (Table_cell) {
																		$$renderer.push("<!--[-->");
																		Table_cell($$renderer, {
																			class: "px-4 text-sm",
																			children: ($$renderer) => {
																				$$renderer.push(`<!---->${escape_html(user.role?.name ?? roleLabel(user.role?.id))}`);
																			},
																			$$slots: { default: true }
																		});
																		$$renderer.push("<!--]-->");
																	} else {
																		$$renderer.push("<!--[!-->");
																		$$renderer.push("<!--]-->");
																	}
																	$$renderer.push(` `);
																	if (Table_cell) {
																		$$renderer.push("<!--[-->");
																		Table_cell($$renderer, {
																			class: "px-4",
																			children: ($$renderer) => {
																				$$renderer.push(`<span${attr_class(clsx(cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset", statusClasses(user.status))))}><span${attr_class(clsx(cn("h-1.5 w-1.5 rounded-full", statusDotClass(user.status))))}></span> ${escape_html(statusLabel(user.status))}</span>`);
																			},
																			$$slots: { default: true }
																		});
																		$$renderer.push("<!--]-->");
																	} else {
																		$$renderer.push("<!--[!-->");
																		$$renderer.push("<!--]-->");
																	}
																	$$renderer.push(` `);
																	if (Table_cell) {
																		$$renderer.push("<!--[-->");
																		Table_cell($$renderer, {
																			class: "px-4 text-right",
																			children: ($$renderer) => {
																				$$renderer.push(`<div class="hidden items-center justify-end gap-1 md:flex"><!--[-->`);
																				const each_array_2 = ensure_array_like(rowActions(user));
																				for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
																					let action = each_array_2[$$index_1];
																					if (Tooltip) {
																						$$renderer.push("<!--[-->");
																						Tooltip($$renderer, {
																							children: ($$renderer) => {
																								{
																									function child($$renderer, { props }) {
																										Button($$renderer, spread_props([props, {
																											variant: "ghost",
																											size: "icon",
																											class: "h-8 w-8" + (action.destructive ? " text-destructive hover:text-destructive" : ""),
																											disabled: action.disabled,
																											onclick: action.onClick,
																											children: ($$renderer) => {
																												AnimatedIcon($$renderer, {
																													icon: action.icon,
																													class: "h-4 w-4"
																												});
																												$$renderer.push(`<!----> <span class="sr-only">${escape_html(action.label)}</span>`);
																											},
																											$$slots: { default: true }
																										}]));
																									}
																									if (Tooltip_trigger) {
																										$$renderer.push("<!--[-->");
																										Tooltip_trigger($$renderer, {
																											child,
																											$$slots: { child: true }
																										});
																										$$renderer.push("<!--]-->");
																									} else {
																										$$renderer.push("<!--[!-->");
																										$$renderer.push("<!--]-->");
																									}
																								}
																								$$renderer.push(` `);
																								if (Tooltip_content) {
																									$$renderer.push("<!--[-->");
																									Tooltip_content($$renderer, {
																										children: ($$renderer) => {
																											$$renderer.push(`<!---->${escape_html(action.label)}`);
																										},
																										$$slots: { default: true }
																									});
																									$$renderer.push("<!--]-->");
																								} else {
																									$$renderer.push("<!--[!-->");
																									$$renderer.push("<!--]-->");
																								}
																							},
																							$$slots: { default: true }
																						});
																						$$renderer.push("<!--]-->");
																					} else {
																						$$renderer.push("<!--[!-->");
																						$$renderer.push("<!--]-->");
																					}
																				}
																				$$renderer.push(`<!--]--></div> <div class="flex justify-end md:hidden">`);
																				if (Dropdown_menu) {
																					$$renderer.push("<!--[-->");
																					Dropdown_menu($$renderer, {
																						children: ($$renderer) => {
																							{
																								function child($$renderer, { props }) {
																									Button($$renderer, spread_props([props, {
																										variant: "ghost",
																										size: "icon",
																										class: "h-8 w-8",
																										children: ($$renderer) => {
																											Icon($$renderer, {
																												icon: "lucide:more-horizontal",
																												class: "h-4 w-4"
																											});
																											$$renderer.push(`<!----> <span class="sr-only">Abrir menú</span>`);
																										},
																										$$slots: { default: true }
																									}]));
																								}
																								if (Dropdown_menu_trigger) {
																									$$renderer.push("<!--[-->");
																									Dropdown_menu_trigger($$renderer, {
																										child,
																										$$slots: { child: true }
																									});
																									$$renderer.push("<!--]-->");
																								} else {
																									$$renderer.push("<!--[!-->");
																									$$renderer.push("<!--]-->");
																								}
																							}
																							$$renderer.push(` `);
																							if (Dropdown_menu_content) {
																								$$renderer.push("<!--[-->");
																								Dropdown_menu_content($$renderer, {
																									align: "end",
																									class: "w-44",
																									children: ($$renderer) => {
																										$$renderer.push(`<!--[-->`);
																										const each_array_3 = ensure_array_like(rowActions(user));
																										for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
																											let action = each_array_3[i];
																											if (action.destructive && i > 0) {
																												$$renderer.push("<!--[0-->");
																												if (Dropdown_menu_separator) {
																													$$renderer.push("<!--[-->");
																													Dropdown_menu_separator($$renderer, {});
																													$$renderer.push("<!--]-->");
																												} else {
																													$$renderer.push("<!--[!-->");
																													$$renderer.push("<!--]-->");
																												}
																											} else $$renderer.push("<!--[-1-->");
																											$$renderer.push(`<!--]--> `);
																											if (Dropdown_menu_item) {
																												$$renderer.push("<!--[-->");
																												Dropdown_menu_item($$renderer, {
																													disabled: action.disabled,
																													onclick: action.onClick,
																													class: action.destructive ? "text-destructive focus:bg-destructive/10 focus:text-destructive" : "",
																													children: ($$renderer) => {
																														Icon($$renderer, {
																															icon: action.icon,
																															class: "mr-2 h-4 w-4"
																														});
																														$$renderer.push(`<!----> ${escape_html(action.label)}`);
																													},
																													$$slots: { default: true }
																												});
																												$$renderer.push("<!--]-->");
																											} else {
																												$$renderer.push("<!--[!-->");
																												$$renderer.push("<!--]-->");
																											}
																										}
																										$$renderer.push(`<!--]-->`);
																									},
																									$$slots: { default: true }
																								});
																								$$renderer.push("<!--]-->");
																							} else {
																								$$renderer.push("<!--[!-->");
																								$$renderer.push("<!--]-->");
																							}
																						},
																						$$slots: { default: true }
																					});
																					$$renderer.push("<!--]-->");
																				} else {
																					$$renderer.push("<!--[!-->");
																					$$renderer.push("<!--]-->");
																				}
																				$$renderer.push(`</div>`);
																			},
																			$$slots: { default: true }
																		});
																		$$renderer.push("<!--]-->");
																	} else {
																		$$renderer.push("<!--[!-->");
																		$$renderer.push("<!--]-->");
																	}
																},
																$$slots: { default: true }
															});
															$$renderer.push("<!--]-->");
														} else {
															$$renderer.push("<!--[!-->");
															$$renderer.push("<!--]-->");
														}
													}
													$$renderer.push(`<!--]-->`);
												}
												$$renderer.push(`<!--]-->`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
						$$renderer.push(`</div></div>`);
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` `);
			if (Dialog) {
				$$renderer.push("<!--[-->");
				Dialog($$renderer, {
					get open() {
						return dialogOpen;
					},
					set open($$value) {
						dialogOpen = $$value;
						$$settled = false;
					},
					children: ($$renderer) => {
						if (Dialog_content) {
							$$renderer.push("<!--[-->");
							Dialog_content($$renderer, {
								class: "sm:max-w-md",
								children: ($$renderer) => {
									$$renderer.push(`<div class="flex flex-col items-center text-center space-y-3 py-2"><div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">`);
									Icon($$renderer, {
										icon: editingUser ? "lucide:user-cog" : "lucide:user-plus",
										class: "h-6 w-6"
									});
									$$renderer.push(`<!----></div> `);
									if (Dialog_title) {
										$$renderer.push("<!--[-->");
										Dialog_title($$renderer, {
											class: "text-2xl font-semibold tracking-tight",
											children: ($$renderer) => {
												$$renderer.push(`<!---->${escape_html(editingUser ? "Editar usuario" : "Nuevo usuario")}`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(` `);
									if (Dialog_description) {
										$$renderer.push("<!--[-->");
										Dialog_description($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->${escape_html(editingUser ? "Actualiza los datos del usuario." : "Crea un usuario nuevo. Se generará un enlace de configuración de contraseña.")}`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(`</div> `);
									if (formError) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<div class="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">${escape_html(formError)}</div>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> <div class="space-y-4 py-2"><div class="space-y-2">`);
									Label($$renderer, {
										for: "email",
										class: "text-sm font-medium",
										children: ($$renderer) => {
											$$renderer.push(`<!---->Correo electrónico`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----> `);
									Input($$renderer, {
										id: "email",
										type: "email",
										autocomplete: "off",
										"data-1p-ignore": true,
										"data-lpignore": "true",
										class: "h-10",
										get value() {
											return formEmail;
										},
										set value($$value) {
											formEmail = $$value;
											$$settled = false;
										}
									});
									$$renderer.push(`<!----></div> <div class="space-y-2">`);
									Label($$renderer, {
										for: "full_name",
										class: "text-sm font-medium",
										children: ($$renderer) => {
											$$renderer.push(`<!---->Nombre completo`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----> `);
									Input($$renderer, {
										id: "full_name",
										autocomplete: "off",
										"data-1p-ignore": true,
										"data-lpignore": "true",
										class: "h-10",
										get value() {
											return formFullName;
										},
										set value($$value) {
											formFullName = $$value;
											$$settled = false;
										}
									});
									$$renderer.push(`<!----></div> <div class="space-y-2">`);
									Label($$renderer, {
										for: "role",
										class: "text-sm font-medium",
										children: ($$renderer) => {
											$$renderer.push(`<!---->Rol`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----> `);
									if (Select) {
										$$renderer.push("<!--[-->");
										Select($$renderer, {
											type: "single",
											value: formRoleId,
											onValueChange: (v) => formRoleId = v,
											children: ($$renderer) => {
												if (Select_trigger) {
													$$renderer.push("<!--[-->");
													Select_trigger($$renderer, {
														id: "role",
														class: "w-full h-10",
														children: ($$renderer) => {
															$$renderer.push(`<span>${escape_html(formRoleId ? roleLabel(Number(formRoleId)) : "Seleccionar rol")}</span>`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Select_content) {
													$$renderer.push("<!--[-->");
													Select_content($$renderer, {
														children: ($$renderer) => {
															if (Select_group) {
																$$renderer.push("<!--[-->");
																Select_group($$renderer, {
																	children: ($$renderer) => {
																		$$renderer.push(`<!--[-->`);
																		const each_array_4 = ensure_array_like(roles);
																		for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
																			let role = each_array_4[$$index_4];
																			if (Select_item) {
																				$$renderer.push("<!--[-->");
																				Select_item($$renderer, {
																					value: String(role.id),
																					label: role.name,
																					children: ($$renderer) => {
																						$$renderer.push(`<!---->${escape_html(role.name)}`);
																					},
																					$$slots: { default: true }
																				});
																				$$renderer.push("<!--]-->");
																			} else {
																				$$renderer.push("<!--[!-->");
																				$$renderer.push("<!--]-->");
																			}
																		}
																		$$renderer.push(`<!--]-->`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(`</div></div> `);
									if (Dialog_footer) {
										$$renderer.push("<!--[-->");
										Dialog_footer($$renderer, {
											class: "flex flex-col-reverse sm:flex-row gap-2 pt-2",
											children: ($$renderer) => {
												Button($$renderer, {
													variant: "outline",
													onclick: closeDialog,
													children: ($$renderer) => {
														$$renderer.push(`<!---->Cancelar`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!----> `);
												if (editingUser) {
													$$renderer.push("<!--[0-->");
													Button($$renderer, {
														variant: "secondary",
														onclick: () => editingUser && handleResetLink(editingUser),
														disabled: saving,
														children: ($$renderer) => {
															Icon($$renderer, {
																icon: "lucide:link",
																class: "mr-2 h-4 w-4"
															});
															$$renderer.push(`<!----> Restablecer contraseña`);
														},
														$$slots: { default: true }
													});
												} else $$renderer.push("<!--[-1-->");
												$$renderer.push(`<!--]--> `);
												Button($$renderer, {
													onclick: handleSave,
													disabled: saving,
													children: ($$renderer) => {
														$$renderer.push(`<!---->${escape_html(saving ? "Guardando..." : "Guardar")}`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!---->`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` `);
			if (Dialog) {
				$$renderer.push("<!--[-->");
				Dialog($$renderer, {
					get open() {
						return approveDialogOpen;
					},
					set open($$value) {
						approveDialogOpen = $$value;
						$$settled = false;
					},
					children: ($$renderer) => {
						if (Dialog_content) {
							$$renderer.push("<!--[-->");
							Dialog_content($$renderer, {
								class: "sm:max-w-md",
								children: ($$renderer) => {
									$$renderer.push(`<div class="flex flex-col items-center text-center space-y-3 py-2"><div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">`);
									Icon($$renderer, {
										icon: "lucide:user-check",
										class: "h-6 w-6"
									});
									$$renderer.push(`<!----></div> `);
									if (Dialog_title) {
										$$renderer.push("<!--[-->");
										Dialog_title($$renderer, {
											class: "text-2xl font-semibold tracking-tight",
											children: ($$renderer) => {
												$$renderer.push(`<!---->Aprobar acceso`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(` `);
									if (Dialog_description) {
										$$renderer.push("<!--[-->");
										Dialog_description($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->Asigna un rol para activar la cuenta de <strong>${escape_html(approvalUser?.email)}</strong>.`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(`</div> `);
									if (approveError) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<div class="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">${escape_html(approveError)}</div>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> <div class="space-y-4 py-2"><div class="space-y-2">`);
									Label($$renderer, {
										class: "text-sm font-medium",
										children: ($$renderer) => {
											$$renderer.push(`<!---->Correo electrónico`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----> `);
									Input($$renderer, {
										value: approvalUser?.email ?? "",
										disabled: true,
										class: "h-10 bg-muted"
									});
									$$renderer.push(`<!----></div> <div class="space-y-2">`);
									Label($$renderer, {
										class: "text-sm font-medium",
										children: ($$renderer) => {
											$$renderer.push(`<!---->Nombre completo`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----> `);
									Input($$renderer, {
										value: approvalUser?.full_name ?? "",
										disabled: true,
										class: "h-10 bg-muted"
									});
									$$renderer.push(`<!----></div> <div class="space-y-2">`);
									Label($$renderer, {
										for: "approve-role",
										class: "text-sm font-medium",
										children: ($$renderer) => {
											$$renderer.push(`<!---->Rol`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----> `);
									if (Select) {
										$$renderer.push("<!--[-->");
										Select($$renderer, {
											type: "single",
											value: approveRoleId,
											onValueChange: (v) => approveRoleId = v,
											children: ($$renderer) => {
												if (Select_trigger) {
													$$renderer.push("<!--[-->");
													Select_trigger($$renderer, {
														id: "approve-role",
														class: "w-full h-10",
														children: ($$renderer) => {
															$$renderer.push(`<span>${escape_html(approveRoleId ? roleLabel(Number(approveRoleId)) : "Seleccionar rol")}</span>`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Select_content) {
													$$renderer.push("<!--[-->");
													Select_content($$renderer, {
														children: ($$renderer) => {
															if (Select_group) {
																$$renderer.push("<!--[-->");
																Select_group($$renderer, {
																	children: ($$renderer) => {
																		$$renderer.push(`<!--[-->`);
																		const each_array_5 = ensure_array_like(roles);
																		for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
																			let role = each_array_5[$$index_5];
																			if (Select_item) {
																				$$renderer.push("<!--[-->");
																				Select_item($$renderer, {
																					value: String(role.id),
																					label: role.name,
																					children: ($$renderer) => {
																						$$renderer.push(`<!---->${escape_html(role.name)}`);
																					},
																					$$slots: { default: true }
																				});
																				$$renderer.push("<!--]-->");
																			} else {
																				$$renderer.push("<!--[!-->");
																				$$renderer.push("<!--]-->");
																			}
																		}
																		$$renderer.push(`<!--]-->`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(`</div></div> `);
									if (Dialog_footer) {
										$$renderer.push("<!--[-->");
										Dialog_footer($$renderer, {
											class: "flex flex-col-reverse sm:flex-row gap-2 pt-2",
											children: ($$renderer) => {
												Button($$renderer, {
													variant: "outline",
													onclick: closeApproveDialog,
													children: ($$renderer) => {
														$$renderer.push(`<!---->Cancelar`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!----> `);
												Button($$renderer, {
													onclick: handleApprove,
													disabled: approveSaving,
													children: ($$renderer) => {
														if (approveSaving) {
															$$renderer.push("<!--[0-->");
															Icon($$renderer, {
																icon: "lucide:loader-circle",
																class: "mr-2 h-4 w-4 animate-spin"
															});
														} else $$renderer.push("<!--[-1-->");
														$$renderer.push(`<!--]--> ${escape_html(approveSaving ? "Aprobando..." : "Aprobar")}`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!---->`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` `);
			if (Dialog) {
				$$renderer.push("<!--[-->");
				Dialog($$renderer, {
					open: !!linkResult,
					onOpenChange: (open) => {
						if (!open) linkResult = null;
					},
					children: ($$renderer) => {
						if (Dialog_content) {
							$$renderer.push("<!--[-->");
							Dialog_content($$renderer, {
								children: ($$renderer) => {
									if (Dialog_header) {
										$$renderer.push("<!--[-->");
										Dialog_header($$renderer, {
											children: ($$renderer) => {
												if (Dialog_title) {
													$$renderer.push("<!--[-->");
													Dialog_title($$renderer, {
														children: ($$renderer) => {
															$$renderer.push(`<!---->Enlace de configuración`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Dialog_description) {
													$$renderer.push("<!--[-->");
													Dialog_description($$renderer, {
														children: ($$renderer) => {
															$$renderer.push(`<!---->Comparte este enlace una sola vez para que el usuario configure su contraseña.`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(` <div class="py-4">`);
									Input($$renderer, {
										value: linkResult ?? "",
										readonly: true,
										class: "font-mono text-xs"
									});
									$$renderer.push(`<!----></div> `);
									if (Dialog_footer) {
										$$renderer.push("<!--[-->");
										Dialog_footer($$renderer, {
											children: ($$renderer) => {
												Button($$renderer, {
													onclick: () => {
														if (linkResult) navigator.clipboard.writeText(linkResult);
													},
													children: ($$renderer) => {
														$$renderer.push(`<!---->Copiar`);
													},
													$$slots: { default: true }
												});
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` `);
			if (Dialog) {
				$$renderer.push("<!--[-->");
				Dialog($$renderer, {
					open: !!deleteConfirmUser,
					onOpenChange: (open) => {
						if (!open) deleteConfirmUser = null;
					},
					children: ($$renderer) => {
						if (Dialog_content) {
							$$renderer.push("<!--[-->");
							Dialog_content($$renderer, {
								children: ($$renderer) => {
									if (Dialog_header) {
										$$renderer.push("<!--[-->");
										Dialog_header($$renderer, {
											children: ($$renderer) => {
												if (Dialog_title) {
													$$renderer.push("<!--[-->");
													Dialog_title($$renderer, {
														children: ($$renderer) => {
															$$renderer.push(`<!---->Confirmar eliminación`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Dialog_description) {
													$$renderer.push("<!--[-->");
													Dialog_description($$renderer, {
														children: ($$renderer) => {
															$$renderer.push(`<!---->¿Eliminar permanentemente a ${escape_html(deleteConfirmUser?.full_name)}? El usuario debe estar inactivo.`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(` `);
									if (Dialog_footer) {
										$$renderer.push("<!--[-->");
										Dialog_footer($$renderer, {
											children: ($$renderer) => {
												Button($$renderer, {
													variant: "outline",
													onclick: () => deleteConfirmUser = null,
													children: ($$renderer) => {
														$$renderer.push(`<!---->Cancelar`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!----> `);
												Button($$renderer, {
													variant: "destructive",
													onclick: handleDelete,
													children: ($$renderer) => {
														$$renderer.push(`<!---->Eliminar`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!---->`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
//#region src/pages/dashboard/usuarios.astro
var usuarios_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Usuarios,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Usuarios = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Usuarios;
	const userContext = {
		user: Astro.locals.user,
		role: Astro.locals.role ?? null,
		firm: Astro.locals.firm,
		password_expired: Astro.locals.password_expired ?? false
	};
	return renderTemplate`<html lang="es"><head>${renderComponent($$result, "ThemeInit", $$ThemeInit, {})}<meta charset="utf-8"><link rel="icon" href="/law.png"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>LCE | Usuarios</title>${renderHead($$result)}</head><body>${renderComponent($$result, "DashboardLayout", DashboardLayout, {
		"userContext": userContext,
		"title": "Usuarios",
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/components/layout/DashboardLayout.svelte",
		"client:component-export": "default"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "UsersPage", UsersPage, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/components/users/UsersPage.svelte",
		"client:component-export": "default"
	})}` })}</body></html>`;
}, "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/dashboard/usuarios.astro", void 0);
var $$file = "/home/jrdz/Dev/fullStack/legalCoreEngine/lceFrontEnd/src/pages/dashboard/usuarios.astro";
var $$url = "/dashboard/usuarios";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/usuarios@_@astro
var page = () => usuarios_exports;
//#endregion
export { page };
