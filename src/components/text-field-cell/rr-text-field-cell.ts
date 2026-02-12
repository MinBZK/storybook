/**
 * RegelRecht Text Field Cell Component (Lit + TypeScript)
 *
 * A cell wrapper for text fields with validation feedback support.
 *
 * @element rr-text-field-cell
 * @attr {string} vertical-alignment - Vertical alignment: 'center' | 'top' (default: 'center')
 * @attr {string} feedback-text - Feedback text shown when invalid
 *
 * @slot - Default slot for rr-text-field component
 *
 * @csspart container - The cell container
 * @csspart feedback - The feedback text element
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type VerticalAlignment = 'center' | 'top';

@customElement('rr-text-field-cell')
export class RRTextFieldCell extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
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

    .text-field-cell__input {
      display: block;
    }

    ::slotted(rr-text-field) {
      width: 100%;
    }

    .text-field-cell__spacer {
      height: var(--primitives-space-2);
    }

    .text-field-cell__feedback {
      display: block;
      font-weight: var(--primitives-font-weight-body-regular);
      font-size: var(--primitives-font-size-90);
      line-height: 1.25em;
      color: var(--semantics-input-fields-is-invalid-icon-color);
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .text-field-cell__feedback {
        forced-color-adjust: none;
      }
    }
  `;

  @property({ type: String, reflect: true, attribute: 'vertical-alignment' })
  verticalAlignment: VerticalAlignment = 'center';

  @property({ type: String, attribute: 'feedback-text' })
  feedbackText = '';

  override render() {
    const hasFeedback = this.feedbackText && this.feedbackText.length > 0;

    return html`
      <div class="text-field-cell__input" part="container">
        <slot></slot>
      </div>
      ${hasFeedback
        ? html`
            <div class="text-field-cell__spacer"></div>
            <span class="text-field-cell__feedback" part="feedback">${this.feedbackText}</span>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-text-field-cell': RRTextFieldCell;
  }
}
