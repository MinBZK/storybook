/**
 * RegelRecht Button Cell Component (Lit + TypeScript)
 *
 * A cell wrapper component for displaying buttons in lists with configurable vertical alignment.
 * This component is a container that holds a button (typically rr-button) and controls its alignment.
 *
 * @element rr-button-cell
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' (default: 'center')
 *
 * @slot - Default slot for button content (typically rr-button)
 *
 * @csspart cell - The cell container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type VerticalAlignment = 'top' | 'center';

@customElement('rr-button-cell')
export class RRButtonCell extends LitElement {
  static override styles = css`
    :host {
      display: flex;
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

    /* Ensure slotted buttons don't stretch */
    ::slotted(*) {
      flex-shrink: 0;
    }
  `;

  @property({ type: String, reflect: true, attribute: 'vertical-alignment' })
  verticalAlignment: VerticalAlignment = 'center';

  override render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-button-cell': RRButtonCell;
  }
}
