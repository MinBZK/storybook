/**
 * Nederlandse Digitale Dienst Breadcrumbs Component (Lit + TypeScript)
 *
 * A trail of `nldd-breadcrumbs-item`s separated by `›`, rendered as a
 * `<nav>` landmark wrapping a `<div role="list">` (with each item carrying
 * `role="listitem"`). Explicit ARIA roles travel reliably across the slot
 * boundary where the implicit `<ol>`/`<li>` mapping is inconsistent across
 * AT + browser combos. The host itself is its own container-query scope so
 * the sm-viewport "‹ {parent}" fallback reacts to the breadcrumbs' own
 * width, not the viewport.
 *
 * @element nldd-breadcrumbs
 *
 * @attr {string}  accessible-label - Override the nav's aria-label.
 *                                    Defaults to the i18n value (NL: "Kruimelpad").
 * @attr {object}  translations     - Override translation keys; unset keys
 *                                    fall back to the Dutch default.
 *
 * @slot - `nldd-breadcrumbs-item` children.
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { breadcrumbsStyles, breadcrumbsItemStyles } from './breadcrumbs.styles.js';
import { breadcrumbsTemplate, breadcrumbsItemTemplate } from './breadcrumbs.template.js';
import { nlddBreadcrumbsTranslations, type NLDDBreadcrumbsTranslations } from './breadcrumbs.i18n.js';


// # nldd-breadcrumbs-item

/**
 * A single entry in an `nldd-breadcrumbs` list. Renders as a link when
 * `href` is set, as plain text marked `aria-current="page"` when `current`
 * is set, and as plain text otherwise. Each item renders its own trailing
 * `›` separator; the last item in the list hides it via `:host(:last-of-type)`.
 *
 * @attr {string} href - Link target. Ignored when `current` is set.
 * @attr {boolean} current - Marks this item as the current page (renders as
 *                           plain text + `aria-current="page"`). Typical use
 *                           is on the last item.
 * @attr {string} text - Item label. Falls back to the default slot.
 *
 * @slot - Item label (alternative to `text`).
 */
export class NLDDBreadcrumbsItem extends LitElement {
	static override styles = breadcrumbsItemStyles;

	@property({ type: String, reflect: true })
	href?: string;

	@property({ type: Boolean, reflect: true })
	current = false;

	@property({ type: String, reflect: true })
	text = '';

	override connectedCallback(): void {
		super.connectedCallback();
		// The parent .breadcrumbs__items is a div role="list"; each item
		// gets the matching listitem role so screen readers announce a
		// proper list with N items. Explicit ARIA is what AT actually
		// reads across the slot boundary — the implicit <ol>/<li>
		// mapping doesn't traverse it reliably.
		if (!this.hasAttribute('role')) {
			this.setAttribute('role', 'listitem');
		}
	}

	override updated(changed: PropertyValues): void {
		// Reflect aria-current on the host (the semantic listitem) rather
		// than on an inner span — the listitem is the element screen readers
		// announce, so the current-page hint should live there.
		if (changed.has('current')) {
			if (this.current) {
				this.setAttribute('aria-current', 'page');
			} else {
				this.removeAttribute('aria-current');
			}
		}
	}

	override render() {
		return breadcrumbsItemTemplate(this);
	}
}

// Sub-component of nldd-breadcrumbs. Exported as a public class for type
// imports. The guard registration (matches nldd-menu's nldd-menu-item /
// nldd-menu-divider) is for de-dupe safety: @customElement throws if the
// same tag is defined twice during HMR or test re-imports, the guard keeps
// the first registration authoritative.
if (!customElements.get('nldd-breadcrumbs-item')) {
	customElements.define('nldd-breadcrumbs-item', NLDDBreadcrumbsItem);
}


// # nldd-breadcrumbs

@customElement('nldd-breadcrumbs')
export class NLDDBreadcrumbs extends LitElement {
	static override styles = breadcrumbsStyles;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Object })
	translations: Partial<NLDDBreadcrumbsTranslations> = {};

	private _mergedTranslations: NLDDBreadcrumbsTranslations = { ...nlddBreadcrumbsTranslations };

	override willUpdate(changed: PropertyValues): void {
		if (changed.has('translations') || changed.has('accessibleLabel')) {
			this._mergedTranslations = {
				...nlddBreadcrumbsTranslations,
				...this.translations,
			};
			if (this.accessibleLabel) {
				this._mergedTranslations['components.breadcrumbs.accessible-label'] = this.accessibleLabel;
			}
		}
	}

	_t(key: keyof NLDDBreadcrumbsTranslations): string {
		// Return '' (not the key) for missing translations so callers can do
		// `value || nothing` to suppress aria-label / text rather than
		// announcing the raw key string. Warn in DEV.
		const value = this._mergedTranslations[key];
		if (value === undefined && import.meta.env?.DEV) {
			console.warn(`<nldd-breadcrumbs>: missing translation for "${key}"`);
		}
		return value ?? '';
	}

	/**
	 * All slotted nldd-breadcrumbs-item children, in DOM order. Items MUST
	 * be direct children of nldd-breadcrumbs — wrapping them in another
	 * element (e.g. `<ul><nldd-breadcrumbs-item>`) is unsupported and will
	 * make them invisible to this component (separator handling, sm-viewport
	 * fallback, etc. all key off this set).
	 */
	_items(): NLDDBreadcrumbsItem[] {
		return Array.from(this.querySelectorAll(':scope > nldd-breadcrumbs-item'));
	}

	/**
	 * The parent (one-level-up) item: the last non-current item with an
	 * `href` — the level-up link needs somewhere to navigate. Returns null
	 * when no eligible parent exists; the level-up element is not rendered
	 * in that case (so it can't appear in the link list of any AT).
	 */
	_parentItem(): NLDDBreadcrumbsItem | null {
		const items = this._items();
		for (let i = items.length - 1; i >= 0; i--) {
			if (!items[i].current && items[i].href) return items[i];
		}
		return null;
	}

	_onSlotChange = () => {
		// CSS reads `[has-parent]` directly; no need for @state. Toggling
		// the attribute is enough.
		this.toggleAttribute('has-parent', !!this._parentItem());
		this._observeItemAttrs();
		this.requestUpdate();
	};

	// MutationObserver covers the case where a consumer mutates `href` or
	// `current` on an already-slotted item — slotchange doesn't fire for
	// attribute changes, so has-parent + the level-up template would
	// otherwise desync from the actual state.
	private _itemObserver?: MutationObserver;

	private _observeItemAttrs(): void {
		this._itemObserver?.disconnect();
		this._itemObserver = new MutationObserver(() => {
			this.toggleAttribute('has-parent', !!this._parentItem());
			this.requestUpdate();
		});
		for (const item of this._items()) {
			this._itemObserver.observe(item, {
				attributes: true,
				attributeFilter: ['href', 'current'],
			});
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._itemObserver?.disconnect();
		this._itemObserver = undefined;
	}

	override render() {
		return breadcrumbsTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-breadcrumbs': NLDDBreadcrumbs;
		'nldd-breadcrumbs-item': NLDDBreadcrumbsItem;
	}
}
