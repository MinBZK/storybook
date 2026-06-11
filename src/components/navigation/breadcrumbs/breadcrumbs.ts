/**
 * Nederlandse Digitale Dienst Breadcrumbs Component (Lit + TypeScript)
 *
 * A trail of `nldd-breadcrumbs-item`s separated by `›`, rendered as a
 * `<nav>` landmark wrapping a `<div role="list">` (with each item carrying
 * `role="listitem"`). Explicit ARIA roles travel reliably across the slot
 * boundary where the implicit `<ol>`/`<li>` mapping is inconsistent across
 * AT + browser combos. The trail wraps onto multiple lines when it doesn't
 * fit, so it adapts to any width.
 *
 * Vanaf vier niveaus klapt het pad standaard in tot
 * `Home › … › {bovenliggende pagina} › {huidige pagina}`. De ellipsis is een
 * knop die bij activeren de verborgen niveaus op hun plek toont (eenmalig;
 * de focus verplaatst naar het eerste onthulde niveau). De verborgen items
 * blijven in de DOM, zodat zoekmachines en agents het volledige pad zien.
 * Zet `no-collapse` om het pad altijd volledig te tonen.
 *
 * @element nldd-breadcrumbs
 *
 * @attr {string}  accessible-label - Override the nav's aria-label.
 *                                    Defaults to the i18n value (NL: "Kruimelpad").
 * @attr {boolean} no-collapse      - Toon altijd alle niveaus; schakelt het
 *                                    inklappen vanaf vier niveaus uit.
 * @attr {object}  translations     - Override translation keys; unset keys
 *                                    fall back to the Dutch default.
 *
 * @slot - `nldd-breadcrumbs-item` children.
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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

	/**
	 * Delegates focus to the inner link, so the parent can move focus to a
	 * revealed item after expanding the collapsed trail. Non-link items
	 * (plain text, current page) have nothing focusable and stay a no-op.
	 */
	override focus(options?: FocusOptions): void {
		this.shadowRoot?.querySelector<HTMLElement>('.breadcrumbs__item-link')?.focus(options);
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

	@property({ type: Boolean, reflect: true, attribute: 'no-collapse' })
	noCollapse = false;

	@property({ type: Object })
	translations: Partial<NLDDBreadcrumbsTranslations> = {};

	@state()
	_collapsed = false;

	/** One-shot: once the user expands the trail it stays expanded. */
	private _expanded = false;

	private _mergedTranslations: NLDDBreadcrumbsTranslations = { ...nlddBreadcrumbsTranslations };

	private _items(): NLDDBreadcrumbsItem[] {
		return Array.from(this.children).filter(
			(child): child is NLDDBreadcrumbsItem => child instanceof NLDDBreadcrumbsItem,
		);
	}

	/** Defers the slotchange-driven sync to a microtask: _syncCollapse moves
	 *  an item between slots, which fires another slotchange — running it
	 *  inline could mutate the DOM while Lit is mid-render. The direct calls
	 *  from updated() and _expand() stay synchronous. */
	_onSlotChange = (): void => {
		void Promise.resolve().then(() => this._syncCollapse());
	};

	/**
	 * Applies the collapsed state to the light-DOM items. While collapsed the
	 * first item moves to the "first" slot (so the shadow ellipsis can sit
	 * between it and the tail) and the middle items get a marker attribute
	 * that hides them via the item's own styles. The consumer's `hidden`
	 * attribute is deliberately left alone. Re-runs are idempotent, so the
	 * slotchange this triggers settles immediately.
	 */
	_syncCollapse = (): void => {
		const items = this._items();
		const collapsed = !this.noCollapse && !this._expanded && items.length >= 4;
		items.forEach((item, index) => {
			if (collapsed && index === 0) {
				item.setAttribute('slot', 'first');
			} else if (item.getAttribute('slot') === 'first') {
				item.removeAttribute('slot');
			}
			item.toggleAttribute('data-nldd-collapsed', collapsed && index >= 1 && index <= items.length - 3);
		});
		this._collapsed = collapsed;
	};

	/** @internal Expands the trail and moves focus to a revealed item.
	 *  Prefers the first revealed link; falls back to the first revealed item
	 *  so focus is never silently dropped (WCAG 2.4.3). */
	_expand = (): void => {
		const revealed = this._items().filter((item) => item.hasAttribute('data-nldd-collapsed'));
		this._expanded = true;
		this._syncCollapse();
		(revealed.find((item) => item.href && !item.current) ?? revealed[0])?.focus();
	};

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

	override updated(changed: PropertyValues): void {
		if (changed.has('noCollapse')) this._syncCollapse();
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
