/**
 * RegelRecht Toolbar Divider Component (Lit + TypeScript)
 *
 * A vertical divider line for use within toolbars to separate groups of items.
 *
 * @element rr-toolbar-divider
 * @attr {string} size - Divider size: 'sm' | 'md' (default: 'md')
 *
 * @csspart divider - The divider container
 * @csspart line - The divider line element
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'sm' | 'md';

@customElement('rr-toolbar-divider')
export class RRToolbarDivider extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-self: stretch;
    }

    :host([hidden]) {
      display: none;
    }

    .divider {
      display: flex;
      justify-content: center;
      align-self: stretch;
    }

    /* Size: S - padding 3px 0, line height 26px */
    :host([size="sm"]) .divider {
      padding: 3px 0;
    }

    :host([size="sm"]) .divider__line {
      height: 26px;
    }

    /* Size: M (default) - padding 5px 0, line height 34px */
    :host([size="md"]) .divider,
    :host(:not([size])) .divider {
      padding: 5px 0;
    }

    :host([size="md"]) .divider__line,
    :host(:not([size])) .divider__line {
      height: 34px;
    }

    .divider__line {
      width: 1px;
      background-color: var(--semantics-dividers-color);
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'md';

  override render() {
    return html`
      <div class="divider" part="divider" role="separator" aria-orientation="vertical">
        <div class="divider__line" part="line"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-toolbar-divider': RRToolbarDivider;
  }
}
