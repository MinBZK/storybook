/**
 * RegelRecht Standalone Menu Item Component (Lit + TypeScript)
 *
 * A standalone menu item for use in dropdown menus and context menus.
 * Different from rr-menu-item which is used inside rr-menu-bar.
 *
 * @element rr-standalone-menu-item
 * @attr {string} variant - Item style: 'neutral' | 'danger' (default: 'neutral')
 * @attr {boolean} selected - Whether the item is selected (shows checkmark)
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} has-submenu - Whether item opens a submenu (shows chevron-right)
 *
 * @slot - Default slot for text content
 * @slot icon-start - Slot for leading icon
 * @slot icon-end - Slot for trailing icon
 *
 * @fires select - When the item is selected
 *
 * @csspart item - The menu item container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type StyleVariant = 'neutral' | 'danger';

@customElement('rr-standalone-menu-item')
export class RRStandaloneMenuItem extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .menu-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--primitives-space-8);
      padding: var(--primitives-space-8);
      min-height: var(--semantics-controls-md-min-size);
      border-radius: var(--semantics-controls-md-corner-radius);
      width: 100%;
      box-sizing: border-box;
      cursor: pointer;
      border: none;
      background: transparent;
      font: var(--primitives-font-body-md-regular-tight);
      color: var(--semantics-content-color);
      text-align: start;
      transition: background-color 0.15s ease, color 0.15s ease;
      appearance: none;
      text-decoration: none;
    }

    /* Danger variant */
    :host([variant='danger']) .menu-item {
      color: var(--primitives-color-danger-500);
    }

    /* Hover state */
    .menu-item:hover:not(:disabled) {
      background-color: var(--primitives-color-accent-700);
      color: var(--primitives-color-neutral-0);
    }

    :host([variant='danger']) .menu-item:hover:not(:disabled) {
      background-color: var(--primitives-color-accent-700);
      color: var(--primitives-color-neutral-0);
    }

    /* Focus state */
    .menu-item:focus-visible {
      box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
      outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
    }

    /* Disabled state */
    :host([disabled]) .menu-item {
      opacity: var(--primitives-opacity-disabled);
      cursor: not-allowed;
      pointer-events: none;
    }

    .menu-item__check {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-item__content {
      flex: 1;
      min-width: 0;
    }

    .menu-item__submenu-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ::slotted([slot='icon-start']),
    ::slotted([slot='icon-end']) {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .menu-item {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .menu-item:hover {
        background-color: Highlight;
        color: HighlightText;
      }

      .menu-item:focus-visible {
        outline: 2px solid CanvasText !important;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: StyleVariant = 'neutral';

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'has-submenu' })
  hasSubmenu = false;

  private _handleClick(): void {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('select', {
        detail: { selected: !this.selected },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _renderCheckmark() {
    return html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
  }

  private _renderChevronRight() {
    return html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;
  }

  override render() {
    return html`
      <button
        class="menu-item"
        part="item"
        type="button"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        ${this.selected
          ? html`<span class="menu-item__check">${this._renderCheckmark()}</span>`
          : ''}

        <slot name="icon-start"></slot>

        <span class="menu-item__content">
          <slot></slot>
        </span>

        <slot name="icon-end"></slot>

        ${this.hasSubmenu
          ? html`<span class="menu-item__submenu-icon"
              >${this._renderChevronRight()}</span
            >`
          : ''}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-standalone-menu-item': RRStandaloneMenuItem;
  }
}
