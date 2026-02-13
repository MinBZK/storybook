/**
 * RegelRecht Tooltip Component (Lit + TypeScript)
 *
 * A tooltip component that displays informational text with an arrow indicator.
 *
 * @element rr-tooltip
 * @attr {string} position - Tooltip position: 'top' | 'bottom' | 'left' | 'right' (default: 'top')
 * @attr {string} text - Tooltip text content
 *
 * @csspart tooltip - The tooltip container
 * @csspart text - The text content
 * @csspart arrow - The arrow element
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './rr-tooltip-arrow.ts';

type Position = 'top' | 'bottom' | 'left' | 'right';

@customElement('rr-tooltip')
export class RRTooltip extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .tooltip {
      display: inline-flex;
      align-items: center;
      flex-direction: column;
      --rr-tooltip-arrow-color: var(--primitives-color-neutral-0);
      box-shadow: var(--primitives-box-shadows-level-2);
    }

    /* Position-specific layouts */
    :host([position='top']) .tooltip,
    :host(:not([position])) .tooltip {
      flex-direction: column;
    }

    :host([position='bottom']) .tooltip {
      flex-direction: column-reverse;
    }

    :host([position='left']) .tooltip {
      flex-direction: row;
    }

    :host([position='right']) .tooltip {
      flex-direction: row-reverse;
    }

    .tooltip__body {
      background-color: var(--primitives-color-neutral-0);
      color: var(--semantics-content-color);
      font: var(--semantics-content-body-xs-regular-tight);
      padding: var(--primitives-space-4) var(--primitives-space-8);

      white-space: nowrap;
    }

    .tooltip__arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .tooltip__body {
        border: 1px solid CanvasText;
      }
    }
  `;

  @property({ type: String, reflect: true })
  position: Position = 'top';

  @property({ type: String })
  text = '';

  /**
   * Maps tooltip position to arrow direction.
   * When tooltip is on top, arrow points down toward the target.
   */
  private _getArrowDirection(): string {
    const map: Record<Position, string> = {
      top: 'down',
      bottom: 'up',
      left: 'right',
      right: 'left',
    };
    return map[this.position];
  }

  override render() {
    return html`
      <div class="tooltip" part="tooltip" role="tooltip">
        <div class="tooltip__body" part="text">${this.text}</div>
        <div class="tooltip__arrow" part="arrow">
          <rr-tooltip-arrow direction=${this._getArrowDirection()}></rr-tooltip-arrow>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-tooltip': RRTooltip;
  }
}
