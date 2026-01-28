/**
 * RegelRecht Title Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying titles in lists with configurable alignment and size.
 *
 * @element rr-title-cell
 * @attr {string} size - Cell size: 'sm' | 'md' (default: 'md')
 * @attr {string} color - Text color variant: 'default' | 'white' (default: 'default')
 * @attr {string} horizontal-alignment - Horizontal alignment: 'left' | 'right' (default: 'left')
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' (default: 'center')
 *
 * @slot - Default slot for title text content
 *
 * @csspart title - The title text container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'sm' | 'md';
type Color = 'default' | 'white';
type HorizontalAlignment = 'left' | 'right';
type VerticalAlignment = 'top' | 'center';

@customElement('rr-title-cell')
export class RRTitleCell extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    /* Vertical alignment */
    :host([vertical-alignment="center"]),
    :host(:not([vertical-alignment])) {
      justify-content: center;
    }

    :host([vertical-alignment="top"]) {
      justify-content: flex-start;
    }

    /* Horizontal alignment */
    :host([horizontal-alignment="left"]),
    :host(:not([horizontal-alignment])) {
      align-items: flex-start;
    }

    :host([horizontal-alignment="right"]) {
      align-items: flex-end;
    }

    .title-cell__title {
      display: flex;
      flex-direction: row;
      gap: 8px;
      width: 100%;
    }

    /* Text alignment based on horizontal-alignment */
    :host([horizontal-alignment="right"]) .title-cell__title {
      justify-content: flex-end;
    }

    .title-cell__text {
      margin: 0;
      font-weight: var(--primitives-font-weight-body-medium, 550);
      line-height: 1.25;
    }

    /* Size: MD (default) - 18px font */
    :host([size="md"]) .title-cell__text,
    :host(:not([size])) .title-cell__text {
      font-size: var(--primitives-font-size-body-m, 18px);
    }

    /* Size: SM - 16px font */
    :host([size="sm"]) .title-cell__text {
      font-size: var(--primitives-font-size-body-s, 16px);
    }

    /* Color: Default */
    :host([color="default"]) .title-cell__text,
    :host(:not([color])) .title-cell__text {
      color: var(--semantics-content-color, #333a45);
    }

    /* Color: White */
    :host([color="white"]) .title-cell__text {
      color: var(--semantics-content-white-color, #ffffff);
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .title-cell__text {
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
      <div class="title-cell__title" part="title">
        <span class="title-cell__text">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-title-cell': RRTitleCell;
  }
}
