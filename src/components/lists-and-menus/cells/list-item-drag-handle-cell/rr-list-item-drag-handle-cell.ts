/**
 * RegelRecht List Item Drag Handle Cell Component (Lit + TypeScript)
 *
 * A cell wrapper component for displaying a drag handle in lists
 * with configurable vertical alignment. Wraps rr-list-item-drag-handle.
 *
 * @element rr-list-item-drag-handle-cell
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' (default: 'center')
 *
 * @slot - Default slot for rr-list-item-drag-handle content
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type VerticalAlignment = 'top' | 'center';

@customElement('rr-list-item-drag-handle-cell')
export class RRListItemDragHandleCell extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
    }

    :host([hidden]) {
      display: none;
    }

    /* Vertical alignment: center (default) */
    :host([vertical-alignment="center"]),
    :host(:not([vertical-alignment])) {
      justify-content: center;
    }

    /* Vertical alignment: top */
    :host([vertical-alignment="top"]) {
      justify-content: flex-start;
    }

    ::slotted(*) {
      flex-shrink: 0;
    }
  `;

  @property({ type: String, reflect: true, attribute: 'vertical-alignment' })
  verticalAlignment: VerticalAlignment = 'center';

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-list-item-drag-handle-cell': RRListItemDragHandleCell;
  }
}
