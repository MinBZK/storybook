/**
 * RegelRecht Dialog Component (Lit + TypeScript)
 *
 * A modal dialog with overlay backdrop, icon, header, body, and footer.
 * Uses the native <dialog> element for accessibility.
 *
 * @element rr-dialog
 * @attr {boolean} open - Whether the dialog is open
 * @attr {string} heading - Dialog heading text
 *
 * @slot - Default slot for supporting/body text
 * @slot icon - Slot for an icon above the heading
 * @slot footer - Slot for action buttons in the footer
 *
 * @fires close - When the dialog is closed
 *
 * @csspart dialog - The native dialog element
 * @csspart icon - The icon area
 * @csspart header - The dialog header
 * @csspart body - The dialog body
 * @csspart footer - The dialog footer
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('rr-dialog')
export class RRDialog extends LitElement {
  static override styles = css`
    :host {
      display: contents;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .dialog {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 0;
      border: none;
      background: transparent;
      max-width: none;
      max-height: none;
      width: 100%;
      height: 100%;
    }

    .dialog::backdrop {
      background: rgba(0, 0, 0, 0.5);
    }

    .dialog__panel {
      background-color: var(--semantics-surfaces-background-color);
      border-radius: var(--primitives-corner-radius-xl);
      box-shadow: var(--primitives-box-shadows-level-5);
      padding: var(--primitives-space-24);
      max-width: 480px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--primitives-space-16);
      max-height: 90vh;
    }

    .dialog__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      align-self: center;
    }

    /* Hide icon slot wrapper when empty */
    .dialog__icon:empty {
      display: none;
    }

    .dialog__header {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dialog__heading {
      margin: 0;
      font: var(--semantics-content-body-md-bold-tight);
      color: var(--semantics-content-color);
      text-align: center;
    }

    .dialog__body {
      overflow-y: auto;
      color: var(--semantics-content-color);
      font: var(--semantics-content-body-sm-regular-tight);
      text-align: center;
    }

    .dialog__footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--primitives-space-8);
      padding-top: var(--primitives-space-12);
    }

    /* Hide footer slot wrapper when empty */
    .dialog__footer:empty {
      display: none;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .dialog__panel {
        border: 2px solid CanvasText;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  heading = '';

  @query('.dialog')
  private _dialog!: HTMLDialogElement;

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._dialog?.showModal();
      } else {
        this._dialog?.close();
      }
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

  private _handleDialogClose(): void {
    // Native dialog close event (e.g., Escape key)
    if (this.open) {
      this._handleClose();
    }
  }

  private _handleBackdropClick(e: MouseEvent): void {
    // Close when clicking on the backdrop (the dialog element itself, not the panel)
    if (e.target === this._dialog) {
      this._handleClose();
    }
  }

  override render() {
    return html`
      <dialog
        class="dialog"
        part="dialog"
        @close=${this._handleDialogClose}
        @click=${this._handleBackdropClick}
      >
        <div class="dialog__panel">
          <div class="dialog__icon" part="icon">
            <slot name="icon"></slot>
          </div>

          <div class="dialog__header" part="header">
            <h2 class="dialog__heading">${this.heading}</h2>
          </div>

          <div class="dialog__body" part="body">
            <slot></slot>
          </div>

          <div class="dialog__footer" part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-dialog': RRDialog;
  }
}
