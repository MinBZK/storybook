/**
 * RegelRecht Sheet Component (Lit + TypeScript)
 *
 * A slide-in panel from the bottom or right of the screen with overlay backdrop.
 *
 * @element rr-sheet
 * @attr {boolean} open - Whether the sheet is open
 * @attr {string} position - Sheet position: 'bottom' | 'right' (default: 'bottom')
 * @attr {string} heading - Sheet heading text
 *
 * @slot - Default slot for sheet body content
 *
 * @fires close - When the sheet is closed
 *
 * @csspart backdrop - The overlay backdrop
 * @csspart sheet - The sheet panel
 * @csspart header - The sheet header
 * @csspart body - The sheet body
 * @csspart close-button - The close button
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Position = 'bottom' | 'right';

@customElement('rr-sheet')
export class RRSheet extends LitElement {
  static override styles = css`
    :host {
      display: contents;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .sheet-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: none;
    }

    :host([open]) .sheet-overlay {
      display: flex;
    }

    .sheet-overlay__backdrop {
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .sheet-overlay__panel {
      position: absolute;
      background-color: var(--semantics-surfaces-background-color);
      box-shadow: var(--primitives-box-shadows-level-5);
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      z-index: 1001;
      transition: transform 0.3s ease;
    }

    /* Bottom sheet */
    :host([position='bottom']) .sheet-overlay__panel,
    :host(:not([position])) .sheet-overlay__panel {
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 80vh;
      border-radius: var(--primitives-corner-radius-xl) var(--primitives-corner-radius-xl) 0 0;
    }

    :host([position='bottom']) .sheet-overlay,
    :host(:not([position])) .sheet-overlay {
      align-items: flex-end;
    }

    /* Right sheet */
    :host([position='right']) .sheet-overlay__panel {
      top: 0;
      right: 0;
      bottom: 0;
      width: 480px;
      max-width: 90vw;
    }

    .sheet__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--primitives-space-16);
      padding: var(--primitives-space-16) var(--primitives-space-24);
      flex-shrink: 0;
    }

    .sheet__heading {
      margin: 0;
      font: var(--semantics-content-body-md-bold-tight);
      color: var(--semantics-content-color);
      flex: 1;
      min-width: 0;
    }

    .sheet__close {
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
      color: var(--semantics-content-color);
      flex-shrink: 0;
      transition: background-color 0.15s ease;
    }

    .sheet__close:hover {
      background-color: var(--primitives-color-neutral-100);
    }

    .sheet__close:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: 2px;
    }

    .sheet__close-icon {
      width: 20px;
      height: 20px;
    }

    .sheet__body {
      flex: 1;
      overflow-y: auto;
      padding: 0 var(--primitives-space-24) var(--primitives-space-24);
      color: var(--semantics-content-color);
      font: var(--semantics-content-body-md-regular-tight);
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .sheet-overlay__panel,
      .sheet__close {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .sheet-overlay__panel {
        border: 2px solid CanvasText;
      }

      .sheet__close:focus-visible {
        outline: 2px solid CanvasText !important;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, reflect: true })
  position: Position = 'bottom';

  @property({ type: String })
  heading = '';

  private _boundKeyDown = this._handleKeyDown.bind(this);

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._boundKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._boundKeyDown);
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.open) {
      this._handleClose();
    }
  }

  private _handleClose(): void {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleBackdropClick(): void {
    this._handleClose();
  }

  private _renderCloseIcon() {
    return html`
      <svg class="sheet__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
  }

  override render() {
    return html`
      <div class="sheet-overlay" role="dialog" aria-modal="true" aria-label=${this.heading}>
        <div
          class="sheet-overlay__backdrop"
          part="backdrop"
          @click=${this._handleBackdropClick}
        ></div>

        <div class="sheet-overlay__panel" part="sheet">
          <div class="sheet__header" part="header">
            <h2 class="sheet__heading">${this.heading}</h2>
            <button
              class="sheet__close"
              part="close-button"
              type="button"
              aria-label="Close sheet"
              @click=${this._handleClose}
            >
              ${this._renderCloseIcon()}
            </button>
          </div>

          <div class="sheet__body" part="body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-sheet': RRSheet;
  }
}
