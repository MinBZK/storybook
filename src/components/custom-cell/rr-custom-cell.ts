/**
 * RegelRecht Custom Cell Component (Lit + TypeScript)
 *
 * A flexible cell component for displaying custom content in lists.
 * Use this when you need to place arbitrary content that doesn't fit other cell types.
 *
 * @element rr-custom-cell
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' (default: 'center')
 *
 * @slot - Default slot for custom content
 *
 * @csspart cell - The cell container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type VerticalAlignment = 'top' | 'center';

@customElement('rr-custom-cell')
export class RRCustomCell extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: stretch;
    }

    :host([hidden]) {
      display: none;
    }

    .custom-cell {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    /* Vertical alignment: center (default) */
    :host([vertical-alignment="center"]) .custom-cell,
    :host(:not([vertical-alignment])) .custom-cell {
      justify-content: center;
    }

    /* Vertical alignment: top */
    :host([vertical-alignment="top"]) .custom-cell {
      justify-content: flex-start;
    }
  `;

  @property({ type: String, reflect: true, attribute: 'vertical-alignment' })
  verticalAlignment: VerticalAlignment = 'center';

  override render() {
    return html`
      <div class="custom-cell" part="cell">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-custom-cell': RRCustomCell;
  }
}
