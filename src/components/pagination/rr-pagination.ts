/**
 * RegelRecht Pagination Component (Lit + TypeScript)
 *
 * A pagination control for navigating between pages of content.
 *
 * @element rr-pagination
 * @attr {number} current-page - Currently active page (1-based)
 * @attr {number} total-pages - Total number of pages
 * @attr {boolean} disabled - Disabled state
 *
 * @fires page-change - When the page changes (detail: { page: number })
 *
 * @csspart container - The pagination container
 * @csspart button - Individual page buttons
 * @csspart button-active - The active page button
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('rr-pagination')
export class RRPagination extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .pagination {
      display: inline-flex;
      align-items: center;
      background-color: var(--primitives-color-neutral-100);
      border-radius: var(--semantics-controls-md-corner-radius);
      overflow: hidden;
    }

    .pagination__button {
      appearance: none;
      border: none;
      background: transparent;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      padding: var(--primitives-space-8) var(--primitives-space-12);
      font: var(--semantics-buttons-md-font);
      color: var(--primitives-color-neutral-900);
      box-sizing: border-box;
      position: relative;
      min-width: 44px;
      transition: background-color 0.15s ease;
    }

    .pagination__button:hover:not(:disabled):not(.pagination__button--active) {
      background-color: var(--primitives-color-neutral-200);
    }

    .pagination__button:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: -2px;
      z-index: 1;
    }

    .pagination__button:disabled {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      cursor: not-allowed;
    }

    .pagination__button--active {
      background-color: var(--primitives-color-accent-750-reference);
      color: var(--primitives-color-neutral-0);
      border-radius: var(--primitives-corner-radius-sm);
    }

    .pagination__button--nav {
      padding: 0 var(--primitives-space-8);
    }

    .pagination__divider {
      width: 1px;
      height: 28px;
      background-color: var(--primitives-color-neutral-250);
      flex-shrink: 0;
    }

    .pagination__ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      padding: 0 var(--primitives-space-4);
      font: var(--semantics-buttons-md-font);
      color: var(--primitives-color-neutral-900);
      user-select: none;
    }

    .pagination__icon {
      width: 24px;
      height: 24px;
      display: block;
    }

    /* Disabled state for entire component */
    :host([disabled]) .pagination {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      pointer-events: none;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .pagination__button {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .pagination {
        border: 1px solid CanvasText;
      }

      .pagination__button--active {
        background-color: Highlight;
        color: HighlightText;
      }

      .pagination__button:focus-visible {
        outline: 2px solid CanvasText !important;
      }
    }
  `;

  @property({ type: Number, reflect: true, attribute: 'current-page' })
  currentPage = 1;

  @property({ type: Number, reflect: true, attribute: 'total-pages' })
  totalPages = 1;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _getVisiblePages(): (number | 'ellipsis')[] {
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];

    // Always show first page
    pages.push(1);

    if (current > 3) {
      pages.push('ellipsis');
    }

    // Show pages around current
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('ellipsis');
    }

    // Always show last page
    if (total > 1) {
      pages.push(total);
    }

    return pages;
  }

  private _goToPage(page: number): void {
    if (this.disabled || page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: { page: this.currentPage },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _renderChevronLeft() {
    return html`
      <svg class="pagination__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    `;
  }

  private _renderChevronRight() {
    return html`
      <svg class="pagination__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;
  }

  override render() {
    const pages = this._getVisiblePages();
    const atFirst = this.currentPage <= 1;
    const atLast = this.currentPage >= this.totalPages;

    return html`
      <nav class="pagination" part="container" role="navigation" aria-label="Pagination">
        <button
          class="pagination__button pagination__button--nav"
          part="button"
          type="button"
          ?disabled=${atFirst}
          aria-label="Previous page"
          @click=${() => this._goToPage(this.currentPage - 1)}
        >
          ${this._renderChevronLeft()}
        </button>

        <div class="pagination__divider" aria-hidden="true"></div>

        ${pages.map((page) =>
          page === 'ellipsis'
            ? html`<span class="pagination__ellipsis" aria-hidden="true">...</span>`
            : html`
                <button
                  class="pagination__button ${page === this.currentPage ? 'pagination__button--active' : ''}"
                  part=${page === this.currentPage ? 'button-active' : 'button'}
                  type="button"
                  aria-label="Page ${page}"
                  aria-current=${page === this.currentPage ? 'page' : nothing}
                  @click=${() => this._goToPage(page as number)}
                >
                  ${page}
                </button>
              `
        )}

        <div class="pagination__divider" aria-hidden="true"></div>

        <button
          class="pagination__button pagination__button--nav"
          part="button"
          type="button"
          ?disabled=${atLast}
          aria-label="Next page"
          @click=${() => this._goToPage(this.currentPage + 1)}
        >
          ${this._renderChevronRight()}
        </button>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-pagination': RRPagination;
  }
}
