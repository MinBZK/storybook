/**
 * Nederlandse Digitale Dienst Rich Text Component (Lit + TypeScript)
 *
 * A container for rich text content that automatically applies responsive
 * typography. Uses no shadow DOM so styles apply to all nested elements.
 * Import nldd-rich-text.css globally in your application.
 *
 * ## Breedtezones
 * Kinderen worden in drie zones geplaatst: tekst (headings, paragrafen,
 * lijsten, div/section) leest op de `main`-maat; media (img, figure, video,
 * iframe, blockquote) krijgt het `wide`-accent; al het overige — tabellen,
 * codeblokken en élke component — krijgt de volledige `full`-span met
 * `justify-self: start`, zodat de ruimte beschikbaar is maar niet geforceerd
 * wordt. Per kind te overschrijven met `data-width="main" | "wide" | "full"`.
 * In de linkse layout lezen wide en full als bleed naar rechts; met
 * `centered` zijn ze symmetrisch.
 *
 * @element nldd-rich-text
 *
 * @attr {string}  spacing  - Spacing between elements: 'flat' | 'tight' | 'snug' (default) | 'loose'
 * @attr {boolean} centered - Centers the main column inside the container; without it, content is left-aligned
 * @attr {object}  translations - Override translation keys; unset keys fall back to Dutch
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nlddRichTextTranslations } from './rich-text.i18n.js';
import type { NLDDRichTextTranslations } from './rich-text.i18n.js';

type Spacing = 'flat' | 'tight' | 'snug' | 'loose';

const MANAGED_LABEL_ATTR = 'data-nldd-managed-label';

@customElement('nldd-rich-text')
export class NLDDRichText extends LitElement {
	@property({ type: String, reflect: true })
	spacing: Spacing = 'snug';

	@property({ type: Boolean, reflect: true })
	centered = false;

	@property({ type: Object })
	translations: Partial<NLDDRichTextTranslations> = {};

	public _t(key: keyof NLDDRichTextTranslations): string {
		return this.translations[key] ?? nlddRichTextTranslations[key];
	}

	private _mutationObserver?: MutationObserver;
	private _resizeObserver?: ResizeObserver;

	override createRenderRoot() {
		return this;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		/* Tables overflow horizontally on narrow viewports (overflow-x: auto
		 * below 641px). Keyboard users need them focusable to scroll —
		 * WCAG 2.1.1. Observe the host's size (catches container/viewport
		 * resizes; per-table ResizeObserver misses container-query display
		 * flips on tables) and the light-DOM subtree (catches added/removed
		 * tables). Both trigger a re-evaluation of every table's overflow. */
		this._resizeObserver = new ResizeObserver(() => this._syncTables());
		this._resizeObserver.observe(this);
		this._mutationObserver = new MutationObserver(() => this._syncTables());
		this._mutationObserver.observe(this, { childList: true, subtree: true });
		this._syncTables();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._mutationObserver?.disconnect();
		this._mutationObserver = undefined;
		this._resizeObserver?.disconnect();
		this._resizeObserver = undefined;
	}

	private _syncTables(): void {
		for (const table of this.querySelectorAll('table')) {
			if (table.scrollWidth > table.clientWidth) {
				if (table.getAttribute('tabindex') !== '0') {
					table.setAttribute('tabindex', '0');
					// Focusable region needs an accessible name. A <caption>
					// already names the table natively, so only fall back to
					// a generic translated label when neither caption nor
					// existing aria-label/labelledby is present. Mark managed
					// labels so we can clean them up later without touching
					// consumer-set ones. (aria-label takes precedence over
					// caption, so adding it when caption exists would risk
					// silent divergence if the caption updates.)
					if (
						!table.hasAttribute('aria-label')
						&& !table.hasAttribute('aria-labelledby')
						&& !table.querySelector('caption')
					) {
						table.setAttribute('aria-label', this._t('components.rich-text.table-scroll-label'));
						table.setAttribute(MANAGED_LABEL_ATTR, '');
					}
				}
			} else if (table.getAttribute('tabindex') === '0') {
				table.removeAttribute('tabindex');
				if (table.hasAttribute(MANAGED_LABEL_ATTR)) {
					table.removeAttribute('aria-label');
					table.removeAttribute(MANAGED_LABEL_ATTR);
				}
			}
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-rich-text': NLDDRichText;
	}
}
