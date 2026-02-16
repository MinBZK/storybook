/**
 * RegelRecht Button Bar Component (Lit + TypeScript)
 *
 * A horizontal container for grouping buttons with a neutral background.
 * Similar to button-group but with a visible background and border radius.
 *
 * @element rr-button-bar
 * @attr {string} size - Bar size: 'sm' | 'md' (default: 'md')
 *
 * @slot - Default slot for buttons and dividers
 *
 * @csspart bar - The button bar container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'sm' | 'md';

@customElement('rr-button-bar')
export class RRButtonBar extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .button-bar {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: var(--semantics-dividers-color);
      border-radius: var(--semantics-controls-md-corner-radius);
    }

    /* Size: S - height 32px */
    :host([size="sm"]) .button-bar {
      height: 32px;
    }

    /* Size: M (default) - height 44px */
    :host([size="md"]) .button-bar,
    :host(:not([size])) .button-bar {
      height: 44px;
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'md';

  override render() {
    return html`
      <div class="button-bar" part="bar" role="group">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-button-bar': RRButtonBar;
  }
}
