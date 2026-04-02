/**
 * Nederlandse Digitale Dienst Pagination Component (Lit + TypeScript)
 *
 * A pagination control for navigating between pages of content.
 *
 * @element ndd-pagination
 * @attr {number} current - Currently active page (1-based)
 * @attr {number} total - Total number of pages (recommended max: 200 for compact select performance)
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} full-width - Centreert de pagination in de container
 * @attr {string} href-pattern - URL patroon met {page} placeholder, rendert links in plaats van buttons
 *
 * @fires page-change - When the page changes (detail: { page: number, href?: string }). In href mode, call event.preventDefault() to handle navigation yourself (SPA).
 */

import { LitElement } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { paginationStyles } from './ndd-pagination.styles.ts';
import { paginationTemplate } from './ndd-pagination.template.ts';
import { nddPaginationTranslations } from './ndd-pagination.i18n.ts';
import type { NDDPaginationTranslations } from './ndd-pagination.i18n.ts';

@customElement('ndd-pagination')
export class NDDPagination extends LitElement {
	static override styles = paginationStyles;

	@property({ type: Number, reflect: true })
	current = 1;

	@property({ type: Number, reflect: true })
	total = 1;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false;

	@property({ type: String, attribute: 'href-pattern' })
	hrefPattern = '';

	@property({ type: Object })
	translations: Partial<NDDPaginationTranslations> = {};

	private _mergedTranslations = { ...nddPaginationTranslations };

	override willUpdate(changed: PropertyValues): void {
		if (changed.has('translations')) {
			this._mergedTranslations = { ...nddPaginationTranslations, ...this.translations };
		}
	}

	_t(key: keyof NDDPaginationTranslations, params?: Record<string, string | number>): string {
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

		this.current = page;

		const detail: { page: number; href?: string } = { page: this.current };
		if (this.hrefPattern) {
			detail.href = this._hrefForPage(this.current);
		}

		const event = new CustomEvent('page-change', {
			detail,
			bubbles: true,
			composed: true,
			cancelable: true,
		});

		const proceeded = this.dispatchEvent(event);

		// In href mode, navigate unless consumer called preventDefault()
		if (this.hrefPattern && proceeded && detail.href) {
			window.location.href = detail.href;
		}
	}

	override render() {
		return paginationTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-pagination': NDDPagination;
	}
}
