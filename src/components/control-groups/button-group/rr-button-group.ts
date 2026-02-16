/**
 * RegelRecht Button Group Component (Lit + TypeScript)
 *
 * A container for grouping related buttons together, either horizontally or vertically.
 *
 * @element rr-button-group
 * @attr {string} size - Button group size: 'sm' | 'md' (default: 'md')
 * @attr {string} flow - Layout direction: 'horizontal' | 'vertical' (default: 'horizontal')
 *
 * @slot - Default slot for buttons
 *
 * @csspart group - The button group container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'sm' | 'md';
type Flow = 'horizontal' | 'vertical';

@customElement('rr-button-group')
export class RRButtonGroup extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .button-group {
      display: flex;
      justify-content: center;
    }

    /* Flow: Horizontal */
    :host([flow="horizontal"]) .button-group,
    :host(:not([flow])) .button-group {
      flex-direction: row;
      flex-wrap: wrap;
    }

    /* Flow: Vertical */
    :host([flow="vertical"]) {
      width: 100%;
    }

    :host([flow="vertical"]) .button-group {
      flex-direction: column;
      width: 100%;
    }

    /* Size: S - gap 6px */
    :host([size="sm"]) .button-group {
      gap: var(--primitives-space-6);
    }

    /* Size: M (default) - gap 8px */
    :host([size="md"]) .button-group,
    :host(:not([size])) .button-group {
      gap: var(--primitives-space-8);
    }

    /* Vertical flow makes buttons stretch to fill width */
    :host([flow="vertical"]) ::slotted(*) {
      display: block;
      width: 100%;
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'md';

  @property({ type: String, reflect: true })
  flow: Flow = 'horizontal';

  override render() {
    return html`
      <div class="button-group" part="group" role="group">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-button-group': RRButtonGroup;
  }
}
