/**
 * Nederlandse Digitale Dienst Page Footer Component (Lit + TypeScript)
 *
 * The footer band at the bottom of a page. Hosts three optional rows in a
 * fixed order: breadcrumbs (top), consumer-defined main content (middle),
 * and a legal-bar (bottom). Dividers are drawn automatically between
 * non-empty rows. Establishes its own container query
 * (`page-footer-container`) so the responsive padding and gap react to the
 * footer's own width, not the viewport.
 *
 * The host has `id="page-footer"` so a skip-link can target it directly.
 *
 * Use the sub-components `nldd-page-footer-legal-bar` and
 * `nldd-page-footer-legal-bar-item` for the bottom row.
 *
 * @element nldd-page-footer
 *
 * @slot breadcrumbs - `nldd-breadcrumbs` for the top row.
 * @slot             - Main footer content (typically a container with a grid
 *                     of link columns).
 * @slot legal-bar   - `nldd-page-footer-legal-bar` for the bottom row.
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
	pageFooterStyles,
	pageFooterLegalBarStyles,
	pageFooterLegalBarItemStyles,
} from './page-footer.styles.js';
import {
	pageFooterTemplate,
	pageFooterLegalBarTemplate,
	pageFooterLegalBarItemTemplate,
} from './page-footer.template.js';
import { nlddPageFooterTranslations, type NLDDPageFooterTranslations } from './page-footer.i18n.js';


// # nldd-page-footer-legal-bar-item

/**
 * A single entry in an `nldd-page-footer-legal-bar`. Renders as a link
 * when `href` is set, as plain text otherwise. Uses the content color
 * (not the link color) so the legal bar reads as a subdued utility row.
 *
 * @attr {string} href - Link target. When omitted, the item renders as plain text.
 * @attr {string} text - Item label. Falls back to the default slot.
 *
 * @slot - Item label (alternative to `text`).
 */
export class NLDDPageFooterLegalBarItem extends LitElement {
	static override styles = pageFooterLegalBarItemStyles;

	@property({ type: String, reflect: true })
	href?: string;

	@property({ type: String, reflect: true })
	text = '';

	override render() {
		return pageFooterLegalBarItemTemplate.call(this);
	}
}

if (!customElements.get('nldd-page-footer-legal-bar-item')) {
	customElements.define('nldd-page-footer-legal-bar-item', NLDDPageFooterLegalBarItem);
}


// # nldd-page-footer-legal-bar

/**
 * Holds the legal links row at the bottom of a `nldd-page-footer`. Items
 * in `start` render flush-left, items in `end` flush-right, separated by
 * spacing only (no separators). On narrow containers the two groups wrap
 * to their own rows with `start` above `end`.
 *
 * @attr {string} accessible-label - Override the nav's aria-label.
 *                                   Defaults to the i18n value (NL: "Juridische links").
 * @attr {object} translations     - Override translation keys; unset keys
 *                                   fall back to the Dutch default.
 *
 * @slot start - Items rendered flush-left (e.g. © notice, version).
 * @slot end   - Items rendered flush-right (e.g. privacy, accessibility).
 */
export class NLDDPageFooterLegalBar extends LitElement {
	static override styles = pageFooterLegalBarStyles;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Object })
	translations: Partial<NLDDPageFooterTranslations> = {};

	private _mergedTranslations: NLDDPageFooterTranslations = { ...nlddPageFooterTranslations };

	override willUpdate(changed: PropertyValues): void {
		if (changed.has('translations') || changed.has('accessibleLabel')) {
			this._mergedTranslations = {
				...nlddPageFooterTranslations,
				...this.translations,
			};
			if (this.accessibleLabel) {
				this._mergedTranslations['components.page-footer.legal-bar-accessible-label'] = this.accessibleLabel;
			}
		}
	}

	_t(key: keyof NLDDPageFooterTranslations): string {
		return this._mergedTranslations[key] ?? key;
	}

	_onSlotChange = (e: Event) => {
		const slot = e.target as HTMLSlotElement;
		const wrapper = slot.parentElement as HTMLElement;
		wrapper.hidden = slot.assignedElements().length === 0;
	};

	override render() {
		return pageFooterLegalBarTemplate.call(this);
	}
}

if (!customElements.get('nldd-page-footer-legal-bar')) {
	customElements.define('nldd-page-footer-legal-bar', NLDDPageFooterLegalBar);
}


// # nldd-page-footer

@customElement('nldd-page-footer')
export class NLDDPageFooter extends LitElement {
	static override styles = pageFooterStyles;

	@state()
	_hasBreadcrumbs = false;

	@state()
	_hasMain = false;

	@state()
	_hasLegalBar = false;

	override connectedCallback(): void {
		super.connectedCallback();
		// Establish the component's own container so the responsive padding
		// and gap react to the footer's own width, not the viewport. Set
		// inline on the host: Safari doesn't reliably honour container-type
		// declared via :host in the shadow stylesheet.
		this.style.containerType = 'inline-size';
		this.style.containerName = 'page-footer-container';
	}

	_hasMeaningfulContent(slot: HTMLSlotElement | null): boolean {
		const nodes = slot?.assignedNodes({ flatten: true }) ?? [];
		return nodes.some(n =>
			n.nodeType === Node.ELEMENT_NODE
			|| (n.nodeType === Node.TEXT_NODE && (n.textContent?.trim() ?? '') !== ''),
		);
	}

	_onSlotChange = (e: Event) => {
		const slot = e.target as HTMLSlotElement;
		const wrapper = slot.parentElement as HTMLElement;
		const hasContent = this._hasMeaningfulContent(slot);
		wrapper.hidden = !hasContent;
		const name = slot.getAttribute('name') ?? '';
		if (name === 'breadcrumbs') this._hasBreadcrumbs = hasContent;
		else if (name === 'legal-bar') this._hasLegalBar = hasContent;
		else this._hasMain = hasContent;
		const visibleCount =
			(this._hasBreadcrumbs ? 1 : 0) +
			(this._hasMain ? 1 : 0) +
			(this._hasLegalBar ? 1 : 0);
		this.toggleAttribute('single-slot', visibleCount === 1);
	};

	override render() {
		return pageFooterTemplate.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-page-footer': NLDDPageFooter;
		'nldd-page-footer-legal-bar': NLDDPageFooterLegalBar;
		'nldd-page-footer-legal-bar-item': NLDDPageFooterLegalBarItem;
	}
}
