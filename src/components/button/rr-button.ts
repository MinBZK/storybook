/**
 * RegelRecht Button Component (Lit + TypeScript)
 *
 * @element rr-button
 * @attr {string} variant - Button variant: 'accent-filled' | 'accent-outlined' | 'accent-tinted' | 'neutral-tinted' | 'accent-transparent' | 'neutral-transparent' | 'danger-tinted'
 * @attr {string} size - Button size: 'xs' | 's' | 'm' (default: 'm')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset'
 * @attr {boolean} has-leading-icon - Whether the button has a leading icon
 * @attr {boolean} has-trailing-icon - Whether the button has a trailing icon
 * @attr {boolean} has-menu - Whether the button has a dropdown menu icon
 *
 * @slot - Default slot for button content
 * @slot icon-start - Slot for icon before text
 * @slot icon-end - Slot for icon after text
 *
 * @fires click - When button is clicked (not fired when disabled)
 *
 * @csspart button - The native button element
 * @csspart content - The content wrapper
 *
 * @cssprop --rr-button-background-color - Override background color
 * @cssprop --rr-button-color - Override text color
 * @cssprop --rr-button-border-color - Override border color
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Variant = 'accent-filled' | 'accent-outlined' | 'accent-tinted' | 'neutral-tinted' | 'accent-transparent' | 'neutral-transparent' | 'danger-tinted';
type Size = 'xs' | 's' | 'm';
type ButtonType = 'button' | 'submit' | 'reset';

@customElement('rr-button')
export class RRButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .button {
      /* Reset */
      appearance: none;
      border: none;
      margin: 0;
      padding: 0;
      background: none;
      font: inherit;
      cursor: pointer;
      box-sizing: border-box;

      /* Layout */
      display: inline-flex;
      align-items: center;
      justify-content: center;

      /* Typography */
      font-weight: var(--semantics-buttons-font-weight, 600);
      text-decoration: none;

      /* Animation */
      transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;

      /* Allow custom overrides */
      background-color: var(--rr-button-background-color, var(--_bg-color));
      color: var(--rr-button-color, var(--_text-color));
      border: var(--_border-width, 0) solid var(--rr-button-border-color, var(--_border-color, transparent));
    }

    .button:active:not(:disabled) {
      transform: scale(0.98);
    }

    /* Size: XS */
    :host([size="xs"]) .button {
      min-height: var(--semantics-controls-xs-min-size, 24px);
      /* Figma: padding 4px 6px (top/bottom 4, left/right 6) */
      padding: var(--primitives-space-4, 4px) var(--primitives-space-6, 6px);
      font: var(--components-button-xs-font, 550 14px/1 'RijksSansVF', system-ui);
      border-radius: var(--semantics-controls-xs-corner-radius, 4px);
      gap: var(--primitives-space-2, 2px);
    }

    /* Size: S */
    :host([size="s"]) .button {
      min-height: var(--semantics-controls-s-min-size, 32px);
      /* Figma: padding 6px 8px (top/bottom 6, left/right 8) */
      padding: var(--primitives-space-6, 6px) var(--primitives-space-8, 8px);
      font: var(--components-button-s-font, 550 16px/1 'RijksSansVF', system-ui);
      border-radius: var(--semantics-controls-s-corner-radius, 6px);
      gap: var(--primitives-space-2, 2px);
    }

    /* Size: M (default) */
    :host([size="m"]) .button,
    :host(:not([size])) .button {
      min-height: var(--semantics-controls-m-min-size, 44px);
      padding: var(--primitives-space-12, 12px);
      font: var(--components-button-m-font, 550 18px/1 'RijksSansVF', system-ui);
      border-radius: var(--semantics-controls-m-corner-radius, 8px);
      gap: var(--primitives-space-4, 4px);
    }

    /* Variant: accent-filled (default) */
    :host([variant="accent-filled"]) .button,
    :host(:not([variant])) .button {
      --_bg-color: var(--semantics-buttons-accent-filled-background-color, #154273);
      --_text-color: var(--semantics-buttons-accent-filled-color, #ffffff);
    }

    :host([variant="accent-filled"]) .button:hover,
    :host(:not([variant])) .button:hover {
      --_bg-color: var(--primitives-color-accent-75, #4F7196);
    }

    /* Variant: accent-outlined - uses outline instead of border to avoid layout impact */
    :host([variant="accent-outlined"]) .button {
      --_bg-color: transparent;
      --_text-color: var(--semantics-buttons-accent-outlined-color, #154273);
      /* Don't use border variables - use outline instead */
      --_border-color: transparent;
      --_border-width: 0;
      outline: var(--semantics-buttons-accent-outlined-border-thickness, 2px) solid var(--semantics-buttons-accent-outlined-border-color, #154273);
      /* -1px offset = stroke centered on boundary (1px in, 1px out) matching Figma */
      outline-offset: -1px;
    }

    :host([variant="accent-outlined"]) .button:hover {
      --_bg-color: var(--primitives-color-accent-15, #DCE3EA);
    }

    :host([variant="accent-outlined"]) .button:focus-visible {
      outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
      outline-offset: 2px;
    }

    /* Variant: accent-tinted */
    :host([variant="accent-tinted"]) .button {
      --_bg-color: var(--semantics-buttons-accent-tinted-background-color, #dce3ea);
      --_text-color: var(--semantics-buttons-accent-tinted-color, #154273);
    }

    :host([variant="accent-tinted"]) .button:hover {
      --_bg-color: var(--primitives-color-accent-30, #B9C7D5);
    }

    /* Variant: neutral-tinted */
    :host([variant="neutral-tinted"]) .button {
      --_bg-color: var(--semantics-buttons-neutral-tinted-background-color, #e2e8f0);
      --_text-color: var(--semantics-buttons-neutral-tinted-color, #0f172a);
    }

    :host([variant="neutral-tinted"]) .button:hover {
      --_bg-color: var(--primitives-color-neutral-300, #cbd5e1);
    }

    /* Variant: accent-transparent */
    :host([variant="accent-transparent"]) .button {
      --_bg-color: transparent;
      --_text-color: var(--semantics-buttons-accent-transparent-color, #154273);
    }

    :host([variant="accent-transparent"]) .button:hover {
      --_bg-color: var(--primitives-color-accent-15, #DCE3EA);
    }

    /* Variant: neutral-transparent */
    :host([variant="neutral-transparent"]) .button {
      --_bg-color: transparent;
      --_text-color: var(--semantics-buttons-neutral-transparent-color, #131920);
    }

    :host([variant="neutral-transparent"]) .button:hover {
      --_bg-color: var(--primitives-color-neutral-200, #e2e8f0);
    }

    /* Variant: danger-tinted */
    :host([variant="danger-tinted"]) .button {
      --_bg-color: var(--semantics-buttons-danger-tinted-background-color, #F9D7D4);
      --_text-color: var(--semantics-buttons-danger-tinted-color, #B22419);
    }

    :host([variant="danger-tinted"]) .button:hover {
      --_bg-color: var(--primitives-color-danger-30, #f2bfbb);
    }

    /* Focus state */
    .button:focus-visible {
      outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) .button {
      opacity: calc(var(--primitives-opacity-disabled, 38) / 100);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Slots */
    ::slotted([slot="icon-start"]),
    ::slotted([slot="icon-end"]) {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }

    .content {
      /* Use display: contents to remove wrapper from layout flow */
      /* This ensures text aligns directly with button's flex alignment */
      display: contents;
    }


    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .button {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .button:focus-visible {
        outline: 2px solid CanvasText !important;
        outline-offset: 2px !important;
      }

      :host([disabled]) .button {
        opacity: 0.5 !important;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: Variant = 'accent-filled';

  @property({ type: String, reflect: true })
  size: Size = 'm';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  type: ButtonType = 'button';

  @property({ type: Boolean, reflect: true, attribute: 'has-leading-icon' })
  hasLeadingIcon = false;

  @property({ type: Boolean, reflect: true, attribute: 'has-trailing-icon' })
  hasTrailingIcon = false;

  @property({ type: Boolean, reflect: true, attribute: 'has-menu' })
  hasMenu = false;

  private _handleClick(e: MouseEvent): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private _shouldShowLeadingIcon(): boolean {
    return this.hasLeadingIcon || this.hasMenu;
  }

  private _shouldShowTrailingIcon(): boolean {
    return this.hasTrailingIcon;
  }

  override render() {
    return html`
      <button
        class="button"
        part="button"
        type=${this.type}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <span class="content" part="content">
          ${this._shouldShowLeadingIcon() ? html`<slot name="icon-start"></slot>` : ''}
          <slot></slot>
          ${this._shouldShowTrailingIcon() ? html`<slot name="icon-end"></slot>` : ''}
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-button': RRButton;
  }
}
