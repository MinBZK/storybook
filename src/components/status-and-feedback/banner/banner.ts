/**
 * Nederlandse Digitale Dienst Banner Component (Lit + TypeScript)
 *
 * An inline notification with a tinted background per variant. Use for
 * persistent, page-level feedback (e.g. an error summary at the top of
 * a form). Banner is more visually present than nldd-inline-dialog —
 * the tinted colour catches the eye. If you need a quieter component,
 * pick a different one rather than overriding the banner's ARIA.
 *
 * Layout: icon left, text + supporting text + optional rich content +
 * actions in the centre, optional dismiss button right. Buttons wrap
 * to a second row on narrow viewports via nldd-button-group's flex
 * wrapping.
 *
 * ## ARIA
 * role and aria-live are set automatically from the variant:
 * - critical → role="alert" (interrupts screen reader)
 * - others   → role="status" aria-live="polite"
 * Not overridable — if you need a less prominent component, use one.
 *
 * @element nldd-banner
 *
 * @attr {'neutral'|'accent'|'success'|'warning'|'critical'} variant - Colour and default icon (default: 'neutral')
 * @attr {string}  icon            - Icon override. Default per variant: neutral/accent → info-circle, success → check-mark-circle, warning → exclamation-triangle-filled, critical → exclamation-circle
 * @attr {string}  text            - Main text (heading or paragraph, depending on heading-level)
 * @attr {string}  supporting-text - Supporting text below the heading
 * @attr {1|2|3|4|5|6} heading-level - Renders text as h1–h6; absent renders a p
 * @attr {boolean} dismissible     - Show a close button in the top-right; emits `dismiss` when clicked
 * @attr {object}  translations    - Override translation keys; unset keys fall back to Dutch
 *
 * @slot         - Optional rich content between text and actions (e.g. nldd-rich-text)
 * @slot actions - nldd-button elements, wrapped in a horizontal nldd-button-group
 *
 * @fires dismiss - Fired when the dismiss button is clicked. The consumer is responsible for removing/hiding the banner.
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { bannerStyles } from './banner.styles.js';
import { bannerTemplate } from './banner.template.js';
import { nlddBannerTranslations } from './banner.i18n.js';
import type { NLDDBannerTranslations } from './banner.i18n.js';
import '../../content/icon/icon.js';
import '../../actions/button-group/button-group.js';
import '../../actions/icon-button/icon-button.js';

export type BannerVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'critical';

const DEFAULT_ICONS: Record<BannerVariant, string> = {
	neutral: 'info-circle',
	accent: 'info-circle',
	success: 'check-mark-circle',
	warning: 'exclamation-triangle-filled',
	critical: 'exclamation-circle',
};

@customElement('nldd-banner')
export class NLDDBanner extends LitElement {
	static override styles = bannerStyles;

	@property({ type: String, reflect: true })
	variant: BannerVariant = 'neutral';

	@property({ type: String, reflect: true })
	icon = '';

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: String, reflect: true, attribute: 'supporting-text' })
	supportingText = '';

	@property({ type: Number, reflect: true, attribute: 'heading-level' })
	headingLevel: 1 | 2 | 3 | 4 | 5 | 6 | null = null;

	@property({ type: Boolean, reflect: true })
	dismissible = false;

	/** Override one or more translation keys. Unspecified keys fall back to Dutch. */
	@property({ type: Object })
	translations: Partial<NLDDBannerTranslations> = {};

	@state()
	_hasContent = false;

	@state()
	_hasActions = false;

	public _t(key: keyof NLDDBannerTranslations): string {
		return this.translations[key] ?? nlddBannerTranslations[key];
	}

	get _resolvedIcon(): string {
		return this.icon || DEFAULT_ICONS[this.variant];
	}

	/* The host gets role+aria-live based on variant. Critical interrupts
	 * (assertive); other variants are polite announcements. Not exposed
	 * for override — consumers who need quieter semantics should pick a
	 * different component. */
	override connectedCallback(): void {
		super.connectedCallback();
		this._syncAriaSemantics();
	}

	override updated(changed: Map<string, unknown>): void {
		if (changed.has('variant')) this._syncAriaSemantics();
	}

	private _syncAriaSemantics(): void {
		if (this.variant === 'critical') {
			this.setAttribute('role', 'alert');
			this.removeAttribute('aria-live');
		} else {
			this.setAttribute('role', 'status');
			this.setAttribute('aria-live', 'polite');
		}
	}

	override firstUpdated(): void {
		const contentSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		const actionsSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="actions"]');
		const hasMeaningfulContent = (slot: HTMLSlotElement | undefined | null): boolean => {
			const nodes = slot?.assignedNodes({ flatten: true }) ?? [];
			return nodes.some((n) =>
				n.nodeType === Node.ELEMENT_NODE
				|| (n.nodeType === Node.TEXT_NODE && (n.textContent?.trim() ?? '') !== ''),
			);
		};
		const syncContent = () => { this._hasContent = hasMeaningfulContent(contentSlot); };
		const syncActions = () => { this._hasActions = hasMeaningfulContent(actionsSlot); };
		contentSlot?.addEventListener('slotchange', syncContent);
		actionsSlot?.addEventListener('slotchange', syncActions);
		syncContent();
		syncActions();
	}

	public _onDismissClick(): void {
		this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
	}

	override render() {
		return bannerTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-banner': NLDDBanner;
	}
}
