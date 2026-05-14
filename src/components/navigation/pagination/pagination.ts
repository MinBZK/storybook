/**
 * Nederlandse Digitale Dienst Pagination Component (Lit + TypeScript)
 *
 * A pagination control for navigating between pages of content.
 *
 * @element nldd-pagination
 * @attr {number} current - Currently active page (1-based)
 * @attr {number} total - Total number of pages (recommended max: 200 for compact select performance)
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} centered - Centreert de pagination in de container (host fills row, items grouped in the middle)
 * @attr {string} href-pattern - URL patroon met {page} placeholder, rendert links in plaats van buttons
 *
 * @fires page-change - Bij paginawisseling (detail: { page: number, href?: string }). Alleen cancelable in href-mode: preventDefault() voorkomt navigatie (SPA).
 */

import { LitElement } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { paginationStyles } from './pagination.styles.js';
import { paginationTemplate } from './pagination.template.js';
import { nlddPaginationTranslations } from './pagination.i18n.js';
import type { NLDDPaginationTranslations } from './pagination.i18n.js';
import { isPointerMode } from '../../../utilities/input-modality.js';

@customElement('nldd-pagination')
export class NLDDPagination extends LitElement {
	static override styles = paginationStyles;

	@property({ type: Number, reflect: true })
	current = 1;

	@property({ type: Number, reflect: true })
	total = 1;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Centers the pagination in the container (host fills the row, items group in the middle). */
	@property({ type: Boolean, reflect: true })
	centered = false;

	@property({ type: String, attribute: 'href-pattern' })
	hrefPattern = '';

	@property({ type: Object })
	translations: Partial<NLDDPaginationTranslations> = {};

	private _mergedTranslations = { ...nlddPaginationTranslations };

	override willUpdate(changed: PropertyValues): void {
		if (changed.has('translations')) {
			this._mergedTranslations = { ...nlddPaginationTranslations, ...this.translations };
		}
	}

	_t(key: keyof NLDDPaginationTranslations, params?: Record<string, string | number>): string {
		let text = this._mergedTranslations[key] ?? key;
		if (params) {
			for (const [k, v] of Object.entries(params)) {
				text = text.replace(`{${k}}`, String(v));
			}
		}
		return text;
	}

	_getVisiblePages(): (number | 'ellipsis')[] {
		if (this.total <= 7) {
			return Array.from({ length: this.total }, (_, i) => i + 1);
		}

		// Always show exactly 7 slots for consistent width
		if (this.current <= 3) {
			return [1, 2, 3, 4, 'ellipsis', this.total - 1, this.total];
		}

		if (this.current === 4) {
			return [1, 2, 3, 4, 5, 'ellipsis', this.total];
		}

		if (this.current >= this.total - 3) {
			return [1, 'ellipsis', this.total - 4, this.total - 3, this.total - 2, this.total - 1, this.total];
		}

		return [1, 'ellipsis', this.current - 1, this.current, this.current + 1, 'ellipsis', this.total];
	}

	_hrefForPage(page: number): string {
		const href = this.hrefPattern.replace('{page}', String(page));
		if (/^(https?:\/\/|[^:]+$)/.test(href)) return href;
		return '';
	}

	_goToPage(page: number): void {
		if (this.disabled || page < 1 || page > this.total || page === this.current) {
			return;
		}

		const detail: { page: number; href?: string } = { page };
		if (this.hrefPattern) {
			detail.href = this._hrefForPage(page);
		}

		const cancelable = !!this.hrefPattern;
		const event = new CustomEvent('page-change', {
			detail,
			bubbles: true,
			composed: true,
			cancelable,
		});

		const proceeded = this.dispatchEvent(event);
		this.current = page;

		// In href mode, navigate unless consumer called preventDefault()
		if (this.hrefPattern && proceeded && detail.href) {
			window.location.href = detail.href;
		}
	}

	/**
	 * Suppress the native `:focus-visible` ring on the select when focus
	 * came from a pointer. We can't rely on `:focus-visible` alone for
	 * native <select> because Chrome matches it even on mouse click. The
	 * inverted "set when known-to-be-pointer" form is failure-safe — if
	 * input-modality never reports, the attribute stays off and the
	 * default focus ring shows on every focus (keyboard a11y intact).
	 */
	_handleSelectFocus = (): void => {
		this.toggleAttribute('is-pointer-focus', isPointerMode());
	};

	_handleSelectBlur = (): void => {
		this.toggleAttribute('is-pointer-focus', false);
	};

	/** Any key press while focused promotes to keyboard mode — drop the marker. */
	_handleSelectKeydown = (): void => {
		this.toggleAttribute('is-pointer-focus', false);
	};

	override render() {
		return paginationTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-pagination': NLDDPagination;
	}
}
