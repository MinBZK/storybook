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
 * @attr {boolean} no-seo           - Opt out of the BreadcrumbList JSON-LD
 *                                    script that is otherwise injected for SEO.
 * @attr {object}  translations     - Override translation keys; unset keys
 *                                    fall back to the Dutch default.
 *
 * @slot - `nldd-breadcrumbs-item` children.
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { breadcrumbsStyles, breadcrumbsItemStyles } from './breadcrumbs.styles.js';
import {
	breadcrumbsTemplate,
	breadcrumbsItemTemplate,
	renderBreadcrumbsJsonLd,
} from './breadcrumbs.template.js';
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
		// The parent .breadcrumbs__list is role="list" (a <div>, not <ol>, to
		// keep lit-a11y/list happy since custom elements aren't <li>); each
		// item gets the matching listitem role so screen readers still
		// announce a proper list with N items.
		if (!this.hasAttribute('role')) {
			this.setAttribute('role', 'listitem');
		}
	}

	override render() {
		return breadcrumbsItemTemplate.call(this);
	}
}

if (!customElements.get('nldd-breadcrumbs-item')) {
	customElements.define('nldd-breadcrumbs-item', NLDDBreadcrumbsItem);
}


// # nldd-breadcrumbs

@customElement('nldd-breadcrumbs')
export class NLDDBreadcrumbs extends LitElement {
	static override styles = breadcrumbsStyles;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Boolean, reflect: true, attribute: 'no-seo' })
	noSeo = false;

	@property({ type: Object })
	translations: Partial<NLDDBreadcrumbsTranslations> = {};

	/** True when there is a non-current parent item — drives the sm fallback. */
	@state()
	private _hasParent = false;

	private _mergedTranslations: NLDDBreadcrumbsTranslations = { ...nlddBreadcrumbsTranslations };

	override connectedCallback(): void {
		super.connectedCallback();
		// Establish the component's own container so the sm-viewport fallback
		// reacts to the breadcrumbs' own width, not the viewport. Set inline
		// on the host: Safari doesn't reliably honour container-type declared
		// via :host in the shadow stylesheet.
		this.style.containerType = 'inline-size';
		this.style.containerName = 'breadcrumbs-container';
	}

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

	/** All slotted nldd-breadcrumbs-item children, in DOM order. */
	_items(): NLDDBreadcrumbsItem[] {
		return Array.from(this.querySelectorAll(':scope > nldd-breadcrumbs-item'));
	}

	/**
	 * The parent (one-level-up) item: the last non-current item. Used by the
	 * sm-viewport "‹ {parent}" fallback when the full trail is hidden.
	 */
	_parentItem(): NLDDBreadcrumbsItem | null {
		const items = this._items();
		for (let i = items.length - 1; i >= 0; i--) {
			if (!items[i].current) return items[i];
		}
		return null;
	}

	_onSlotChange = () => {
		this._hasParent = !!this._parentItem();
		this.toggleAttribute('has-parent', this._hasParent);
	};

	_renderJsonLd() {
		return renderBreadcrumbsJsonLd.call(this);
	}

	override render() {
		return breadcrumbsTemplate.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-breadcrumbs': NLDDBreadcrumbs;
		'nldd-breadcrumbs-item': NLDDBreadcrumbsItem;
	}
}
