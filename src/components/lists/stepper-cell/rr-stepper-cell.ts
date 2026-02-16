/**
 * RegelRecht Stepper Cell Component (Lit + TypeScript)
 *
 * A cell wrapper component for displaying a stepper control in lists
 * with configurable vertical alignment. Wraps the existing rr-stepper component.
 *
 * @element rr-stepper-cell
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' (default: 'center')
 *
 * @slot - Default slot for rr-stepper content
 *
 * @csspart cell - The cell container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type VerticalAlignment = 'top' | 'center';

@customElement('rr-stepper-cell')
export class RRStepperCell extends LitElement {
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
    'rr-stepper-cell': RRStepperCell;
  }
}
