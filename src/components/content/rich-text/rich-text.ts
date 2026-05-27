/**
 * Nederlandse Digitale Dienst Rich Text Component (Lit + TypeScript)
 *
 * A container for rich text content that automatically applies responsive
 * typography. Uses no shadow DOM so styles apply to all nested elements.
 * Import nldd-rich-text.css globally in your application.
 *
 * @element nldd-rich-text
 *
 * @attr {string}  spacing  - Spacing between elements: 'flat' | 'tight' | 'snug' (default) | 'loose'
 * @attr {boolean} centered - Centers the main column inside the container; without it, content is left-aligned
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Spacing = 'flat' | 'tight' | 'snug' | 'loose';

@customElement('nldd-rich-text')
export class NLDDRichText extends LitElement {
	@property({ type: String, reflect: true })
	spacing: Spacing = 'snug';

	@property({ type: Boolean, reflect: true })
	centered = false;

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
				}
			} else if (table.getAttribute('tabindex') === '0') {
				table.removeAttribute('tabindex');
			}
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-rich-text': NLDDRichText;
	}
}
