/**
 * RegelRecht List Component (Lit + TypeScript)
 *
 * A container component for displaying list items with optional styling.
 *
 * @element rr-list
 * @attr {string} variant - List style variant: 'simple' | 'box' | 'box-on-tint' (default: 'simple')
 *
 * @slot - Default slot for list items (rr-list-item)
 *
 * @csspart list - The list container
 * @csspart main - The main content area
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Variant = 'simple' | 'box' | 'box-on-tint';

@customElement('rr-list')
export class RRList extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }

    :host([hidden]) {
      display: none;
    }

    .list__main {
      display: flex;
      flex-direction: column;
    }

    /* Variant: simple (default) - just a vertical stack with top border */
    :host([variant="simple"]) .list__main,
    :host(:not([variant])) .list__main {
      border-top: 1px solid var(--semantics-divider-color, #d9dee4);
    }

    /* Variant: box - rounded background with padding */
    :host([variant="box"]) .list__main {
      background-color: var(--semantics-views-tinted-background-color, #f5f6f9);
      border-radius: 12px;
      gap: 8px;
    }

    /* Variant: box-on-tint - white background on tinted surface */
    :host([variant="box-on-tint"]) .list__main {
      background-color: var(--semantics-views-background-color, #ffffff);
      border-radius: 12px;
      gap: 8px;
    }

    /* Hide first item's divider in box variants */
    :host([variant="box"]) ::slotted(rr-list-item:first-child),
    :host([variant="box-on-tint"]) ::slotted(rr-list-item:first-child) {
      --_list-item-divider-display: none;
    }
  `;

  @property({ type: String, reflect: true })
  variant: Variant = 'simple';

  override render() {
    return html`
      <div class="list__main" part="main" role="list">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-list': RRList;
  }
}
