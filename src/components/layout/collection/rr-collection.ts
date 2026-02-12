/**
 * RegelRecht Collection Component (Lit + TypeScript)
 *
 * A container for displaying collections of items with a title header.
 * Supports grid, list, and horizontal scroll layouts.
 *
 * @element rr-collection
 * @attr {string} layout - Layout mode: 'grid' | 'list' | 'horizontal-scroll' (default: 'grid')
 * @attr {string} title - Collection title
 * @attr {boolean} show-load-more - Whether to show load more button (default: false)
 * @attr {string} load-more-label - Label for load more button (default: 'Load more')
 *
 * @slot - Default slot for collection items
 * @slot header - Slot for custom header content
 * @slot footer - Slot for custom footer content
 *
 * @fires load-more - When load more button is clicked
 *
 * @csspart collection - The collection container
 * @csspart header - The header section
 * @csspart items - The items container
 * @csspart footer - The footer section
 *
 * @cssprop --rr-collection-gap - Gap between items (default: 16px)
 * @cssprop --rr-collection-item-min-width - Minimum item width for grid (default: 280px)
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../title-bar-title-group/rr-title-bar-title-group.js';
import '../../actions/button/rr-button.js';

type Layout = 'grid' | 'list' | 'horizontal-scroll';

@customElement('rr-collection')
export class RRCollection extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 16px;
      font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .collection__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
    }

    .collection__items {
      display: flex;
      width: 100%;
      gap: var(--rr-collection-gap, 16px);
    }

    /* Grid layout */
    :host([layout='grid']) .collection__items,
    :host(:not([layout])) .collection__items {
      flex-direction: row;
      flex-wrap: wrap;
    }

    :host([layout='grid']) .collection__items ::slotted(*),
    :host(:not([layout])) .collection__items ::slotted(*) {
      flex: 1 1 var(--rr-collection-item-min-width, 280px);
      min-width: var(--rr-collection-item-min-width, 280px);
    }

    /* List layout */
    :host([layout='list']) .collection__items {
      flex-direction: column;
    }

    :host([layout='list']) .collection__items ::slotted(*) {
      width: 100%;
    }

    /* Horizontal scroll layout */
    :host([layout='horizontal-scroll']) .collection__items {
      flex-direction: row;
      flex-wrap: nowrap;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
    }

    :host([layout='horizontal-scroll']) .collection__items ::slotted(*) {
      flex: 0 0 var(--rr-collection-item-min-width, 280px);
      scroll-snap-align: start;
    }

    .collection__footer {
      display: flex;
      width: 100%;
    }

    /* Grid/List: Load more button full width */
    :host([layout='grid']) .collection__footer,
    :host([layout='list']) .collection__footer,
    :host(:not([layout])) .collection__footer {
      justify-content: stretch;
    }

    :host([layout='grid']) .collection__footer ::slotted(*),
    :host([layout='list']) .collection__footer ::slotted(*),
    :host(:not([layout])) .collection__footer ::slotted(*),
    :host([layout='grid']) .collection__footer rr-button,
    :host([layout='list']) .collection__footer rr-button,
    :host(:not([layout])) .collection__footer rr-button {
      width: 100%;
    }

    /* Horizontal scroll: Navigation on right */
    :host([layout='horizontal-scroll']) .collection__footer {
      justify-content: flex-end;
    }
  `;

  @property({ type: String, reflect: true })
  layout: Layout = 'grid';

  @property({ type: String })
  title = '';

  @property({ type: Boolean, reflect: true, attribute: 'show-load-more' })
  showLoadMore = false;

  @property({ type: String, attribute: 'load-more-label' })
  loadMoreLabel = 'Load more';

  private _handleLoadMore(): void {
    this.dispatchEvent(
      new CustomEvent('load-more', {
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <header class="collection__header" part="header">
        <slot name="header">
          ${this.title ? html`<rr-title-bar-title-group size="sm">${this.title}</rr-title-bar-title-group>` : nothing}
        </slot>
      </header>
      <div class="collection__items" part="items">
        <slot></slot>
      </div>
      <footer class="collection__footer" part="footer">
        <slot name="footer">
          ${this.showLoadMore
            ? html`
                <rr-button variant="neutral-tinted" @click=${this._handleLoadMore}> ${this.loadMoreLabel} </rr-button>
              `
            : nothing}
        </slot>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-collection': RRCollection;
  }
}
