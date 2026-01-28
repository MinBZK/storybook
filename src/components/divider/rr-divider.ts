/**
 * RegelRecht Divider Component (Lit + TypeScript)
 *
 * A visual separator for content sections.
 *
 * @element rr-divider
 * @attr {string} orientation - Divider orientation: 'horizontal' | 'vertical'
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Orientation = 'horizontal' | 'vertical';

@customElement('rr-divider')
export class RRDivider extends LitElement {
  static override styles = css`
    :host {
      display: block;
      flex-shrink: 0;
    }

    :host([hidden]) {
      display: none;
    }

    .divider {
      background-color: var(--semantics-divider-color, #d8dee7);
    }

    /* Horizontal orientation (default) */
    /* Note: Figma shows 1px thickness, token incorrectly says 2px */
    :host([orientation='horizontal']) .divider,
    :host(:not([orientation])) .divider {
      width: 100%;
      height: 1px;
    }

    /* Vertical orientation */
    :host([orientation='vertical']) .divider {
      width: 1px;
      height: 100%;
    }

    :host([orientation='vertical']) {
      display: inline-block;
      height: 100%;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .divider {
        background-color: CanvasText;
      }
    }
  `;

  @property({ type: String, reflect: true })
  orientation: Orientation = 'horizontal';

  override render() {
    return html`
      <div
        class="divider"
        role="separator"
        aria-orientation=${this.orientation}
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-divider': RRDivider;
  }
}
