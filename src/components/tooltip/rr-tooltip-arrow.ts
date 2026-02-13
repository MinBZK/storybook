/**
 * RegelRecht Tooltip Arrow Component (Lit + TypeScript)
 *
 * A small triangular arrow used as part of the tooltip component.
 * Renders a CSS triangle that points in the specified direction.
 *
 * @element rr-tooltip-arrow
 * @attr {string} direction - Arrow direction: 'up' | 'down' | 'left' | 'right' (default: 'up')
 *
 * @csspart arrow - The arrow element
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Direction = 'up' | 'down' | 'left' | 'right';

@customElement('rr-tooltip-arrow')
export class RRTooltipArrow extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      line-height: 0;
    }

    :host([hidden]) {
      display: none;
    }

    .tooltip-arrow {
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
    }

    /* Arrow pointing up: 12px wide x 6px tall */
    :host([direction='up']) .tooltip-arrow,
    :host(:not([direction])) .tooltip-arrow {
      border-width: 0 6px 6px 6px;
      border-color: transparent transparent var(--rr-tooltip-arrow-color, var(--primitives-color-neutral-900)) transparent;
    }

    /* Arrow pointing down: 12px wide x 6px tall */
    :host([direction='down']) .tooltip-arrow {
      border-width: 6px 6px 0 6px;
      border-color: var(--rr-tooltip-arrow-color, var(--primitives-color-neutral-900)) transparent transparent transparent;
    }

    /* Arrow pointing left: 6px wide x 12px tall */
    :host([direction='left']) .tooltip-arrow {
      border-width: 6px 6px 6px 0;
      border-color: transparent var(--rr-tooltip-arrow-color, var(--primitives-color-neutral-900)) transparent transparent;
    }

    /* Arrow pointing right: 6px wide x 12px tall */
    :host([direction='right']) .tooltip-arrow {
      border-width: 6px 0 6px 6px;
      border-color: transparent transparent transparent var(--rr-tooltip-arrow-color, var(--primitives-color-neutral-900));
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .tooltip-arrow {
        forced-color-adjust: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  direction: Direction = 'up';

  override render() {
    return html`<span class="tooltip-arrow" part="arrow"></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-tooltip-arrow': RRTooltipArrow;
  }
}
