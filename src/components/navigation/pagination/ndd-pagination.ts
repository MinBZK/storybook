/**
 * Nederlandse Digitale Dienst Pagination Component (Lit + TypeScript)
 *
 * A pagination control for navigating between pages of content.
 *
 * @element ndd-pagination
 * @attr {number} current - Currently active page (1-based)
 * @attr {number} total - Total number of pages
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} full-width - Centreert de pagination in de container
 *
 * @fires page-change - When the page changes (detail: { page: number })
 */

import { LitElement } from 'lit';
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

	@property({ type: Object })
	translations: Partial<NDDPaginationTranslations> = {};

	private _mergedTranslations = { ...nddPaginationTranslations };

	override updated(changed: Map<string, unknown>): void {
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

	_goToPage(page: number): void {
		if (this.disabled || page < 1 || page > this.total || page === this.current) {
			return;
		}

		this.current = page;
		this.dispatchEvent(
			new CustomEvent('page-change', {
				detail: { page: this.current },
				bubbles: true,
				composed: true,
			})
		);
	}

	_handleKeyDown = (e: KeyboardEvent): void => {
		const buttons = Array.from(
			this.shadowRoot!.querySelectorAll<HTMLButtonElement>('.pagination__page-button')
		);
		const target = e.composedPath()[0] as HTMLElement;
		const index = buttons.indexOf(target as HTMLButtonElement);

		if (index === -1) return;

		let next: number | undefined;

		switch (e.key) {
			case 'ArrowRight':
				next = index < buttons.length - 1 ? index + 1 : 0;
				break;
			case 'ArrowLeft':
				next = index > 0 ? index - 1 : buttons.length - 1;
				break;
			case 'Home':
				next = 0;
				break;
			case 'End':
				next = buttons.length - 1;
				break;
			default:
				return;
		}

		e.preventDefault();
		buttons[next].focus();
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('keydown', this._handleKeyDown);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('keydown', this._handleKeyDown);
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
