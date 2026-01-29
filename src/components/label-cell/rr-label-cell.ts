/**
 * RegelRecht Label Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying labels in lists with configurable alignment and color.
 *
 * @element rr-label-cell
 * @attr {string} color - Text color variant: 'default' | 'white' (default: 'default')
 * @attr {string} horizontal-alignment - Horizontal alignment: 'left' | 'right' (default: 'left')
 *
 * @slot - Default slot for label text content
 *
 * @csspart label - The label text container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Color = 'default' | 'white';
type HorizontalAlignment = 'left' | 'right';

@customElement('rr-label-cell')
export class RRLabelCell extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .label-cell__text {
      display: block;
      margin: 0;
      padding: 0;
      font-weight: var(--primitives-font-weight-body-regular, 400);
      font-size: var(--primitives-font-size-body-m, 18px);
      line-height: 1.25; /* Figma: 1.25em = 22.5px */
    }

    /* Horizontal alignment: left (default) */
    :host([horizontal-alignment="left"]) .label-cell__text,
    :host(:not([horizontal-alignment])) .label-cell__text {
      text-align: left;
    }

    /* Horizontal alignment: right */
    :host([horizontal-alignment="right"]) .label-cell__text {
      text-align: right;
    }

    /* Color: Default (#333A45 per Figma) */
    :host([color="default"]) .label-cell__text,
    :host(:not([color])) .label-cell__text {
      color: var(--components-label-cell-default-color, #333a45);
    }

    /* Color: White (#FFFFFF per Figma) */
    :host([color="white"]) .label-cell__text {
      color: var(--components-label-cell-white-color, #ffffff);
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .label-cell__text {
        forced-color-adjust: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  color: Color = 'default';

  @property({ type: String, reflect: true, attribute: 'horizontal-alignment' })
  horizontalAlignment: HorizontalAlignment = 'left';

  override render() {
    return html`<span class="label-cell__text" part="label"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-label-cell': RRLabelCell;
  }
}
