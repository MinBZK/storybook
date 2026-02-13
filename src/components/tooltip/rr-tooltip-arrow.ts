/**
 * RegelRecht Tooltip Arrow Component (Lit + TypeScript)
 *
 * A small triangular arrow used as part of the tooltip component.
 * Renders an SVG triangle that points in the specified direction.
 *
 * @element rr-tooltip-arrow
 * @attr {string} direction - Arrow direction: 'up' | 'down' | 'left' | 'right' (default: 'up')
 *
 * @csspart arrow - The arrow element
 */

import { LitElement, html, svg, css } from 'lit';
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
      fill: var(--rr-tooltip-arrow-color, var(--primitives-color-neutral-0));
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

  private _getArrowPath(): string {
    switch (this.direction) {
      case 'up':
        return 'M0 6 L6 0 L12 6Z';
      case 'down':
        return 'M0 0 L12 0 L6 6Z';
      case 'left':
        return 'M6 0 L0 6 L6 12Z';
      case 'right':
        return 'M0 0 L6 6 L0 12Z';
    }
  }

  private _getViewBox(): string {
    if (this.direction === 'up' || this.direction === 'down') {
      return '0 0 12 6';
    }
    return '0 0 6 12';
  }

  private _getWidth(): number {
    return this.direction === 'up' || this.direction === 'down' ? 12 : 6;
  }

  private _getHeight(): number {
    return this.direction === 'up' || this.direction === 'down' ? 6 : 12;
  }

  override render() {
    return svg`
      <svg
        class="tooltip-arrow"
        part="arrow"
        width="${this._getWidth()}"
        height="${this._getHeight()}"
        viewBox="${this._getViewBox()}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="${this._getArrowPath()}" />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-tooltip-arrow': RRTooltipArrow;
  }
}
