/**
 * RegelRecht Drop Down Field Cell Component (Lit + TypeScript)
 *
 * A cell wrapper for drop-down fields with vertical alignment options.
 *
 * @element rr-drop-down-field-cell
 * @attr {string} vertical-alignment - Vertical alignment: 'center' | 'top' (default: 'center')
 *
 * @slot - Default slot for rr-drop-down-field component
 *
 * @csspart container - The cell container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type VerticalAlignment = 'center' | 'top';

@customElement('rr-drop-down-field-cell')
export class RRDropDownFieldCell extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
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

    .drop-down-field-cell__input {
      display: block;
    }

    ::slotted(rr-drop-down-field) {
      width: 100%;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      /* No special handling needed */
    }
  `;

  @property({ type: String, reflect: true, attribute: 'vertical-alignment' })
  verticalAlignment: VerticalAlignment = 'center';

  override render() {
    return html`
      <div class="drop-down-field-cell__input" part="container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-drop-down-field-cell': RRDropDownFieldCell;
  }
}
