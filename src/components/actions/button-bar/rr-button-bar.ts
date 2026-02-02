/**
 * RegelRecht Button Bar Component (Lit + TypeScript)
 *
 * A horizontal container for grouping buttons with a neutral background.
 * Similar to button-group but with a visible background and border radius.
 *
 * @element rr-button-bar
 * @attr {string} size - Bar size: 's' | 'm' (default: 'm')
 *
 * @slot - Default slot for buttons and dividers
 *
 * @csspart bar - The button bar container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 's' | 'm';

@customElement('rr-button-bar')
export class RRButtonBar extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .button-bar {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: var(--semantics-divider-color);
      /* Figma uses 9px for all sizes; closest token is primitives-corner-radius-m (8px) */
      border-radius: var(--primitives-corner-radius-m);
    }

    /* Size: S - height 32px */
    :host([size="s"]) .button-bar {
      height: 32px;
      /* Keep same radius as md per Figma design (9px uniform) */
    }

    /* Size: M (default) - height 44px */
    :host([size="m"]) .button-bar,
    :host(:not([size])) .button-bar {
      height: 44px;
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'm';

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
