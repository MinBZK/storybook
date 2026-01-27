/**
 * RegelRecht Menu Item Component (Lit + TypeScript)
 *
 * @element rr-menu-item
 * @attr {boolean} selected - Selected state
 * @attr {string} href - Link URL
 * @attr {boolean} disabled - Disabled state
 *
 * @slot - Default slot for menu item content
 *
 * @fires select - When menu item is selected (not fired when disabled)
 *
 * @csspart link - The anchor/button element
 * @csspart indicator - The selection indicator
 *
 * @cssprop --rr-menu-item-color - Override text color
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('rr-menu-item')
export class RRMenuItem extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
      width: fit-content;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .menu-item {
      /* Reset */
      appearance: none;
      border: none;
      margin: 0;
      padding: 0;
      background: none;
      text-decoration: none;

      /* Layout */
      display: flex;
      position: relative;
      height: 44px;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      /* Typography */
      font: var(--components-menu-bar-menu-item-font);
      color: var(--rr-menu-item-color, var(--components-menu-bar-menu-item-color));
      text-align: center;

      /* Spacing - Figma: 0px vertical, 8px horizontal */
      padding: 0 var(--primitives-space-8);

      /* Animation */
      transition:
        background-color 0.15s ease,
        color 0.15s ease;
    }

    /* Hover indicator */
    .hover-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0;
      background-color: var(--components-menu-bar-menu-item-is-hovered-indicator-color);
      transition: height 0.15s ease;
      pointer-events: none;
      z-index: 0;
    }

    .menu-item:hover:not(:disabled) .hover-indicator {
      height: var(--components-menu-bar-menu-item-is-hovered-indicator-height);
    }

    /* Selection indicator */
    .selection-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0;
      background-color: var(--components-menu-bar-menu-item-is-selected-indicator-color);
      transition: height 0.15s ease;
      pointer-events: none;
      z-index: 1;
    }

    :host([selected]) .selection-indicator {
      height: var(--components-menu-bar-menu-item-is-selected-indicator-height);
    }

    /* Selected state - text color same as default for contrast */
    :host([selected]) .menu-item {
      color: var(--components-menu-bar-menu-item-color);
    }

    /* Content wrapper for z-index layering */
    .content {
      position: relative;
      z-index: 2;
    }

    /* Focus state */
    .menu-item:focus-visible {
      outline: var(--semantics-focus-ring-thickness) solid var(--semantics-focus-ring-color);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) .menu-item {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .menu-item,
      .hover-indicator,
      .selection-indicator {
        transition: none;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: String })
  href = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  override connectedCallback(): void {
    super.connectedCallback();

    // No specific role needed - internal link/button provides semantics
    // role="none" for presentation, letting internal element handle semantics
    this.setAttribute('role', 'none');

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  /**
   * Sanitize URL to prevent javascript: and other dangerous protocols
   */
  private _sanitizeUrl(url: string | null): string | null {
    if (!url) return null;
    const trimmedUrl = url.trim().toLowerCase();
    // Block javascript:, data:, and vbscript: URLs
    if (
      trimmedUrl.startsWith('javascript:') ||
      trimmedUrl.startsWith('data:') ||
      trimmedUrl.startsWith('vbscript:')
    ) {
      return null;
    }
    return url;
  }

  private _handleClick = (event: Event): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (!this.href) {
      event.preventDefault();
      this.selected = true;
      this.dispatchEvent(
        new CustomEvent('select', {
          bubbles: true,
          composed: true,
          detail: { item: this },
        })
      );
    }
  };

  private _handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) return;

    // Handle Enter and Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleClick(event);
    }
  };

  override render() {
    const safeHref = this._sanitizeUrl(this.href);
    const isLink = Boolean(safeHref);
    const tabindex = this.disabled ? '-1' : '0';

    if (isLink) {
      return html`
        <a
          class="menu-item"
          part="link"
          href=${safeHref!}
          aria-disabled=${this.disabled}
          aria-current=${this.selected ? 'page' : nothing}
          tabindex=${tabindex}
        >
          <span class="hover-indicator"></span>
          <span class="selection-indicator" part="indicator"></span>
          <span class="content">
            <slot></slot>
          </span>
        </a>
      `;
    }

    return html`
      <button
        class="menu-item"
        part="link"
        type="button"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled}
        aria-current=${this.selected ? 'page' : nothing}
        tabindex=${tabindex}
      >
        <span class="hover-indicator"></span>
        <span class="selection-indicator" part="indicator"></span>
        <span class="content">
          <slot></slot>
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-menu-item': RRMenuItem;
  }
}
