/**
 * RegelRecht Alert Component (Lit + TypeScript)
 *
 * An alert banner for displaying important messages with variant-specific styling.
 *
 * @element rr-alert
 * @attr {string} variant - Alert variant: 'info' | 'success' | 'warning' | 'danger'
 * @attr {string} heading - Alert heading text
 * @attr {boolean} dismissible - Whether the alert can be dismissed
 *
 * @slot - Default slot for alert body content
 *
 * @fires dismiss - When the alert is dismissed
 *
 * @csspart alert - The alert container
 * @csspart icon - The variant icon area
 * @csspart content - The content area
 * @csspart heading - The heading text
 * @csspart dismiss - The dismiss button
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Variant = 'info' | 'success' | 'warning' | 'danger';

@customElement('rr-alert')
export class RRAlert extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .alert {
      display: flex;
      align-items: flex-start;
      gap: var(--primitives-space-12);
      padding: var(--primitives-space-16);
      border-radius: var(--primitives-corner-radius-lg);
      box-sizing: border-box;
    }

    /* Variant backgrounds */
    :host([variant='info']) .alert,
    :host(:not([variant])) .alert {
      background-color: var(--primitives-color-accent-50);
    }

    :host([variant='success']) .alert {
      background-color: var(--primitives-color-success-25);
    }

    :host([variant='warning']) .alert {
      background-color: var(--primitives-color-warning-25);
    }

    :host([variant='danger']) .alert {
      background-color: var(--primitives-color-danger-25);
    }

    /* Icon colors */
    .alert__icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host([variant='info']) .alert__icon,
    :host(:not([variant])) .alert__icon {
      color: var(--primitives-color-accent-700);
    }

    :host([variant='success']) .alert__icon {
      color: var(--primitives-color-success-500);
    }

    :host([variant='warning']) .alert__icon {
      color: var(--primitives-color-warning-500);
    }

    :host([variant='danger']) .alert__icon {
      color: var(--primitives-color-danger-500);
    }

    .alert__icon svg {
      width: 24px;
      height: 24px;
    }

    .alert__content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--primitives-space-4);
    }

    .alert__heading {
      margin: 0;
      font: var(--semantics-content-body-md-bold-tight);
      color: var(--semantics-content-color);
    }

    .alert__body {
      font: var(--semantics-content-body-md-regular-tight);
      color: var(--semantics-content-color);
    }

    .alert__dismiss {
      appearance: none;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: var(--semantics-controls-sm-corner-radius);
      color: var(--semantics-content-secondary-color);
      flex-shrink: 0;
      transition: background-color 0.15s ease;
    }

    .alert__dismiss:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .alert__dismiss:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: 2px;
    }

    .alert__dismiss-icon {
      width: 20px;
      height: 20px;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .alert__dismiss {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .alert {
        border: 1px solid CanvasText;
      }

      .alert__dismiss:focus-visible {
        outline: 2px solid CanvasText !important;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: Variant = 'info';

  @property({ type: String })
  heading = '';

  @property({ type: Boolean, reflect: true })
  dismissible = false;

  private _handleDismiss(): void {
    this.dispatchEvent(
      new CustomEvent('dismiss', {
        bubbles: true,
        composed: true,
      })
    );
    this.hidden = true;
  }

  /** Info circle icon (i) */
  private _renderInfoIcon() {
    return html`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `;
  }

  /** Check circle icon */
  private _renderSuccessIcon() {
    return html`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  }

  /** Warning triangle icon */
  private _renderWarningIcon() {
    return html`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    `;
  }

  /** Exclamation circle icon */
  private _renderDangerIcon() {
    return html`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    `;
  }

  private _renderCloseIcon() {
    return html`
      <svg class="alert__dismiss-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
  }

  private _renderVariantIcon() {
    switch (this.variant) {
      case 'success':
        return this._renderSuccessIcon();
      case 'warning':
        return this._renderWarningIcon();
      case 'danger':
        return this._renderDangerIcon();
      case 'info':
      default:
        return this._renderInfoIcon();
    }
  }

  override render() {
    return html`
      <div class="alert" part="alert" role="alert">
        <div class="alert__icon" part="icon">
          ${this._renderVariantIcon()}
        </div>

        <div class="alert__content" part="content">
          ${this.heading
            ? html`<h3 class="alert__heading" part="heading">${this.heading}</h3>`
            : ''}
          <div class="alert__body">
            <slot></slot>
          </div>
        </div>

        ${this.dismissible
          ? html`
              <button
                class="alert__dismiss"
                part="dismiss"
                type="button"
                aria-label="Dismiss alert"
                @click=${this._handleDismiss}
              >
                ${this._renderCloseIcon()}
              </button>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-alert': RRAlert;
  }
}
