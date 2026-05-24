/**
 * Nederlandse Digitale Dienst Breadcrumbs Component (Lit + TypeScript)
 *
 * A trail of `nldd-breadcrumbs-item`s separated by `›`, rendered as a
 * `<nav>` landmark with an `<ol>`. Establishes its own container query
 * (`breadcrumbs-container`) so the sm-viewport "‹ {parent}" fallback
 * reacts to the breadcrumbs' own width, not the viewport.
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
		// The parent .breadcrumbs__list is <ol>; each item gets the matching
		// listitem role so screen readers announce a proper list with N items
		// (the projected custom elements aren't <li>, so the implicit ARIA
		// mapping doesn't kick in).
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

// Internal sub-component: register via the guard pattern (matches
// nldd-menu's nldd-menu-item / nldd-menu-divider). Using @customElement
// here would throw on re-registration in tests / HMR; the guard keeps the
// first registration authoritative.
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
		return this._mergedTranslations[key] ?? key;
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
	 * when no eligible parent exists; the level-up element stays hidden in
	 * that case.
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
	};

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
