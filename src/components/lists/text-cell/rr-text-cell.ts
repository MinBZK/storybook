/**
 * RegelRecht Text Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying text content in lists with configurable
 * alignment, size and color. This is the most fundamental list cell component.
 *
 * @element rr-text-cell
 * @attr {string} size - Cell size: 'sm' | 'md' (default: 'md')
 * @attr {string} color - Text color variant: 'default' | 'secondary' (default: 'default')
 * @attr {string} horizontal-alignment - Horizontal alignment: 'left' | 'right' (default: 'left')
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' (default: 'center')
 *
 * @slot - Default slot for text content
 *
 * @csspart text - The text content container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'sm' | 'md';
type Color = 'default' | 'secondary';
type HorizontalAlignment = 'left' | 'right';
type VerticalAlignment = 'top' | 'center';

@customElement('rr-text-cell')
export class RRTextCell extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    /* Vertical alignment: center (default) */
    :host([vertical-alignment="center"]),
    :host(:not([vertical-alignment])) {
      justify-content: center;
    }

    /* Vertical alignment: top */
    :host([vertical-alignment="top"]) {
      justify-content: flex-start;
    }

    /* Horizontal alignment: left (default) */
    :host([horizontal-alignment="left"]),
    :host(:not([horizontal-alignment])) {
      align-items: flex-start;
    }

    /* Horizontal alignment: right */
    :host([horizontal-alignment="right"]) {
      align-items: flex-end;
    }

    .text-cell__text {
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-self: stretch;
      margin: 0;
    }

    .text-cell__content {
      flex: 1;
      min-width: 0;
    }

    /* Size: MD (default) */
    :host([size="md"]) .text-cell__content,
    :host(:not([size])) .text-cell__content {
      font: var(--semantics-content-body-md-regular-tight);
    }

    /* Size: SM */
    :host([size="sm"]) .text-cell__content {
      font: var(--semantics-content-body-sm-regular-tight);
    }

    /* Horizontal alignment: right text */
    :host([horizontal-alignment="right"]) .text-cell__content {
      text-align: right;
    }

    /* Color: Default */
    :host([color="default"]) .text-cell__content,
    :host(:not([color])) .text-cell__content {
      color: var(--semantics-content-color);
    }

    /* Color: Secondary */
    :host([color="secondary"]) .text-cell__content {
      color: var(--semantics-content-secondary-color);
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .text-cell__content {
        forced-color-adjust: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'md';

  @property({ type: String, reflect: true })
  color: Color = 'default';

  @property({ type: String, reflect: true, attribute: 'horizontal-alignment' })
  horizontalAlignment: HorizontalAlignment = 'left';

  @property({ type: String, reflect: true, attribute: 'vertical-alignment' })
  verticalAlignment: VerticalAlignment = 'center';

  override render() {
    return html`
      <div class="text-cell__text" part="text">
        <span class="text-cell__content">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-text-cell': RRTextCell;
  }
}
