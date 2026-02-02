/**
 * RegelRecht Toggle Button Component (Lit + TypeScript)
 *
 * @element rr-toggle-button
 * @attr {string} size - Button size: 'xs' | 's' | 'm' (default: 'm')
 * @attr {boolean} selected - Selected state
 * @attr {boolean} disabled - Disabled state
 *
 * @slot - Default slot for button content
 * @slot icon - Slot for icon
 *
 * @fires toggle - When button is toggled (detail: { selected: boolean })
 *
 * @csspart button - The native button element
 * @csspart content - The content wrapper
 *
 * @cssprop --rr-toggle-button-background-color - Override background color
 * @cssprop --rr-toggle-button-content-color - Override content color
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'xs' | 's' | 'm';

@customElement('rr-toggle-button')
export class RRToggleButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
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

      /* Layout */
      display: inline-flex;
      align-items: center;
      justify-content: center;

      /* Typography */
      /* font-weight is included in font shorthand token */
      text-decoration: none;
      white-space: nowrap;

      /* Animation */
      transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;

      /* Default state - using component tokens */
      background-color: var(--rr-toggle-button-background-color, var(--semantics-buttons-neutral-tinted-background-color));
      color: var(--rr-toggle-button-content-color, var(--semantics-buttons-neutral-tinted-content-color));
    }

    .button:active:not(:disabled) {
      transform: scale(0.98);
    }

    /* Size: XS */
    :host([size="xs"]) .button {
      min-height: var(--semantics-controls-xs-min-size);
      /* Horizontal padding includes compensation for Figma's spacer gaps (2px × 2) */
      padding: var(--primitives-space-4) var(--primitives-space-14);
      font: var(--semantics-buttons-xs-font);
      border-radius: var(--semantics-controls-xs-corner-radius);
      gap: var(--primitives-space-2);
    }

    /* Size: S */
    :host([size="s"]) .button {
      min-height: var(--semantics-controls-sm-min-size);
      /* Horizontal padding includes compensation for Figma's spacer gaps (2px × 2) */
      padding: var(--primitives-space-6) var(--primitives-space-8);
      font: var(--semantics-buttons-sm-font);
      border-radius: var(--semantics-controls-sm-corner-radius);
      gap: var(--primitives-space-2);
    }

    /* Size: M (default) */
    :host([size="m"]) .button,
    :host(:not([size])) .button {
      min-height: var(--semantics-controls-md-min-size);
      /* Horizontal padding includes compensation for Figma's spacer gaps (4px × 2) */
      padding: var(--primitives-space-8) var(--primitives-space-14);
      font: var(--semantics-buttons-md-font);
      border-radius: var(--semantics-controls-md-corner-radius);
      gap: var(--primitives-space-4);
    }

    /* Hover state */
    .button:hover:not(:disabled) {
      background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
      color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
    }

    /* Selected state */
    :host([selected]) .button {
      background-color: var(--semantics-buttons-neutral-tinted-is-selected-backround-color);
      color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
    }

    /* Selected hover state - stays selected color on hover */
    :host([selected]) .button:hover:not(:disabled) {
      background-color: var(--primitives-color-accent-75);
      color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
    }

    /* Focus state */
    .button:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) .button {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Icon slot */
    ::slotted([slot="icon"]) {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }

    .content {
      display: inline-flex;
      align-items: center;
      gap: inherit;
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

      :host([selected]) .button {
        forced-color-adjust: none;
        background-color: Highlight !important;
        color: HighlightText !important;
      }

      :host([disabled]) .button {
        opacity: 0.5 !important;
      }
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'm';

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _handleClick(e: MouseEvent): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this._toggle();
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggle();
    }
  }

  private _toggle(): void {
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { selected: this.selected },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Public method to toggle programmatically
   */
  toggle(): void {
    if (this.disabled) return;
    this._toggle();
  }

  override render() {
    return html`
      <button
        class="button"
        part="button"
        type="button"
        aria-pressed=${this.selected}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled}
        tabindex=${this.disabled ? -1 : 0}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <span class="content" part="content">
          <slot name="icon"></slot>
          <slot></slot>
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-toggle-button': RRToggleButton;
  }
}
