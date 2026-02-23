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
      font-family: var(--rr-font-family-body);
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
      box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
      outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
      z-index: 1;
    }

    .pagination__button:disabled {
      opacity: var(--primitives-opacity-disabled);
      cursor: not-allowed;
    }

    .pagination__button--active {
      color: var(--primitives-color-neutral-0);
    }

    .pagination__button--active::before {
      content: '';
      position: absolute;
      inset: 4px;
      background-color: var(--primitives-color-accent-750-reference);
      border-radius: var(--primitives-corner-radius-sm);
    }

    .pagination__button-label {
      position: relative;
      z-index: 1;
    }

    .pagination__button--nav {
      padding: 0 var(--primitives-space-8);
      min-width: auto;
    }

    .pagination__divider {
      width: 1px;
      height: 28px;
      background-color: var(--primitives-color-neutral-250);
      flex-shrink: 0;
    }

    .pagination__button--ellipsis {
      cursor: default;
      pointer-events: none;
    }

    .pagination__icon {
      width: 24px;
      height: 24px;
      display: block;
    }

    /* Disabled state for entire component */
    :host([disabled]) .pagination {
      opacity: var(--primitives-opacity-disabled);
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
        color: HighlightText;
      }

      .pagination__button--active::before {
        background-color: Highlight;
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

    // Always show exactly 7 slots for consistent width
    if (current <= 3) {
      // Near start: first 4 + ellipsis + last 2
      return [1, 2, 3, 4, 'ellipsis', total - 1, total];
    }

    if (current === 4) {
      // Transition from start: first 5 + ellipsis + last 1
      return [1, 2, 3, 4, 5, 'ellipsis', total];
    }

    if (current >= total - 3) {
      // Near end: first 1 + ellipsis + last 5
      return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total];
    }

    // Middle: first 1 + ellipsis + 3 around current + ellipsis + last 1
    return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];
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
      <nav class="pagination" part="container" role="navigation" aria-label="Paginering">
        <button
          class="pagination__button pagination__button--nav"
          part="button"
          type="button"
          ?disabled=${atFirst}
          aria-label="Vorige pagina"
          @click=${() => this._goToPage(this.currentPage - 1)}
        >
          ${this._renderChevronLeft()}
        </button>

        <div class="pagination__divider" aria-hidden="true"></div>

        ${pages.map((page) =>
          page === 'ellipsis'
            ? html`<span class="pagination__button pagination__button--ellipsis" aria-hidden="true">
                <span class="pagination__button-label">...</span>
              </span>`
            : html`
                <button
                  class="pagination__button ${page === this.currentPage ? 'pagination__button--active' : ''}"
                  part=${page === this.currentPage ? 'button-active' : 'button'}
                  type="button"
                  aria-label="Pagina ${page}"
                  aria-current=${page === this.currentPage ? 'page' : nothing}
                  @click=${() => this._goToPage(page as number)}
                >
                  <span class="pagination__button-label">${page}</span>
                </button>
              `
        )}

        <div class="pagination__divider" aria-hidden="true"></div>

        <button
          class="pagination__button pagination__button--nav"
          part="button"
          type="button"
          ?disabled=${atLast}
          aria-label="Volgende pagina"
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
