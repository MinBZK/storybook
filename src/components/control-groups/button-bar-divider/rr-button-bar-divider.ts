/**
 * RegelRecht Button Bar Divider Component (Lit + TypeScript)
 *
 * A vertical divider line for use within button bars to separate groups of buttons.
 *
 * @element rr-button-bar-divider
 * @attr {string} size - Divider size: 's' | 'm' (default: 'm')
 *
 * @csspart divider - The divider container
 * @csspart line - The divider line element
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 's' | 'm';

@customElement('rr-button-bar-divider')
export class RRButtonBarDivider extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }

    :host([hidden]) {
      display: none;
    }

    .divider {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    /* Size: S - height 32px, line 20px */
    :host([size="s"]) .divider {
      height: 32px;
    }

    :host([size="s"]) .divider__line {
      height: var(--semantics-buttons-sm-divider-length);
    }

    /* Size: M (default) - height 44px, line 28px */
    :host([size="m"]) .divider,
    :host(:not([size])) .divider {
      height: 44px;
    }

    :host([size="m"]) .divider__line,
    :host(:not([size])) .divider__line {
      height: var(--semantics-buttons-md-divider-length);
    }

    .divider__line {
      width: 1px;
      background-color: var(--semantics-buttons-neutral-tinted-divider-color);
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'm';

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
    'rr-button-bar-divider': RRButtonBarDivider;
  }
}
