/**
 * RegelRecht Window Component (Lit + TypeScript)
 *
 * A standalone window panel with header, body, and optional footer.
 * No overlay backdrop - just a styled container.
 *
 * @element rr-window
 * @attr {string} heading - Window heading text
 * @attr {boolean} has-close-button - Whether to show a close button (default: true)
 *
 * @slot - Default slot for window body content
 * @slot footer - Slot for action buttons in the footer
 *
 * @fires close - When the close button is clicked
 *
 * @csspart window - The window container
 * @csspart header - The window header
 * @csspart body - The window body
 * @csspart footer - The window footer
 * @csspart close-button - The close button
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('rr-window')
export class RRWindow extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .window {
      background-color: var(--semantics-surfaces-background-color);
      border-radius: var(--primitives-corner-radius-xl);
      box-shadow: var(--primitives-box-shadows-level-5);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .window__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--primitives-space-16);
      padding: var(--primitives-space-16) var(--primitives-space-24);
      border-bottom: var(--semantics-dividers-thickness) solid var(--semantics-dividers-color);
    }

    .window__heading {
      margin: 0;
      font: var(--semantics-content-body-md-bold-tight);
      color: var(--semantics-content-color);
      flex: 1;
      min-width: 0;
    }

    .window__close {
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

    .window__close:hover {
      background-color: var(--primitives-color-neutral-100);
    }

    .window__close:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: 2px;
    }

    .window__close-icon {
      width: 20px;
      height: 20px;
    }

    .window__body {
      padding: var(--primitives-space-24);
      color: var(--semantics-content-color);
      font: var(--semantics-content-body-md-regular-tight);
      flex: 1;
    }

    .window__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--primitives-space-8);
      padding: var(--primitives-space-16) var(--primitives-space-24);
      border-top: var(--semantics-dividers-thickness) solid var(--semantics-dividers-color);
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .window__close {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .window {
        border: 2px solid CanvasText;
      }

      .window__close:focus-visible {
        outline: 2px solid CanvasText !important;
      }
    }
  `;

  @property({ type: String })
  heading = '';

  @property({ type: Boolean, reflect: true, attribute: 'has-close-button' })
  hasCloseButton = true;

  private _handleClose(): void {
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _renderCloseIcon() {
    return html`
      <svg class="window__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
  }

  private _handleFooterSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    const footer = slot.closest('.window__footer') as HTMLElement;
    if (footer) {
      footer.style.display = slot.assignedNodes().length > 0 ? '' : 'none';
    }
  }

  override render() {
    return html`
      <div class="window" part="window">
        <div class="window__header" part="header">
          <h2 class="window__heading">${this.heading}</h2>
          ${this.hasCloseButton
            ? html`
                <button
                  class="window__close"
                  part="close-button"
                  type="button"
                  aria-label="Close window"
                  @click=${this._handleClose}
                >
                  ${this._renderCloseIcon()}
                </button>
              `
            : ''}
        </div>

        <div class="window__body" part="body">
          <slot></slot>
        </div>

        <div class="window__footer" part="footer">
          <slot name="footer" @slotchange=${this._handleFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-window': RRWindow;
  }
}
