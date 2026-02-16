/**
 * RegelRecht Tab Bar Item Component (Lit + TypeScript)
 *
 * @element rr-tab-bar-item
 * @attr {string} content-type - Content type: 'text' | 'icon' | 'icon-with-title'
 * @attr {boolean} selected - Selected state
 * @attr {boolean} disabled - Disabled state
 * @attr {string} href - Optional link URL
 *
 * @slot - Default slot for text content
 * @slot icon - Slot for icon content
 *
 * @fires select - When tab bar item is selected
 *
 * @csspart item - The tab bar item element
 * @csspart indicator - The selection indicator
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type ContentType = 'text' | 'icon' | 'icon-with-title';

@customElement('rr-tab-bar-item')
export class RRTabBarItem extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .tab-bar-item {
      /* Reset */
      appearance: none;
      border: none;
      margin: 0;
      padding: 0;
      background: none;
      text-decoration: none;
      cursor: pointer;
      box-sizing: border-box;

      /* Layout */
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      /* Typography */
      font: var(--semantics-buttons-md-font);
      color: var(--primitives-color-neutral-900);

      /* Animation */
      transition: color 0.15s ease;
    }

    /* Content type: text */
    :host([content-type="text"]) .tab-bar-item,
    :host(:not([content-type])) .tab-bar-item {
      flex-direction: row;
      padding: var(--primitives-space-8) var(--primitives-space-12);
      height: 44px;
    }

    /* Content type: icon */
    :host([content-type="icon"]) .tab-bar-item {
      flex-direction: row;
      padding: var(--primitives-space-8);
      height: 44px;
    }

    /* Content type: icon-with-title */
    :host([content-type="icon-with-title"]) .tab-bar-item {
      flex-direction: column;
      gap: 1px;
      padding: var(--primitives-space-8);
      height: 56px;
    }

    :host([content-type="icon-with-title"]) .tab-bar-item__label {
      font: var(--semantics-content-body-xxs-bold-flat);
    }

    /* Selection indicator */
    .tab-bar-item__indicator {
      position: absolute;
      inset: 4px 2px;
      border-radius: var(--primitives-corner-radius-sm);
      background-color: transparent;
      transition: background-color 0.15s ease;
      z-index: 0;
      pointer-events: none;
    }

    :host([selected]) .tab-bar-item__indicator {
      background-color: var(--primitives-color-accent-750-reference);
    }

    :host([selected]) .tab-bar-item {
      color: var(--primitives-color-neutral-0);
    }

    /* Content wrapper */
    .tab-bar-item__content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--primitives-space-8);
    }

    :host([content-type="icon-with-title"]) .tab-bar-item__content {
      flex-direction: column;
      gap: 1px;
    }

    /* Icon slot */
    ::slotted([slot="icon"]) {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    /* Hover state */
    .tab-bar-item:hover:not(:disabled) .tab-bar-item__indicator {
      background-color: var(--primitives-color-neutral-100);
    }

    :host([selected]) .tab-bar-item:hover:not(:disabled) .tab-bar-item__indicator {
      background-color: var(--primitives-color-accent-800);
    }

    /* Focus state */
    .tab-bar-item:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) .tab-bar-item {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .tab-bar-item,
      .tab-bar-item__indicator {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .tab-bar-item:focus-visible {
        outline: 2px solid CanvasText !important;
      }

      :host([selected]) .tab-bar-item__indicator {
        background-color: Highlight !important;
      }
    }
  `;

  @property({ type: String, reflect: true, attribute: 'content-type' })
  contentType: ContentType = 'text';

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  href = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'none');
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

  private _sanitizeUrl(url: string | null): string | null {
    if (!url) return null;
    const trimmedUrl = url.trim().toLowerCase();
    if (
      trimmedUrl.startsWith('javascript:') ||
      trimmedUrl.startsWith('data:') ||
      trimmedUrl.startsWith('vbscript:')
    ) {
      return null;
    }
    return url;
  }

  private _renderContent() {
    if (this.contentType === 'icon') {
      return html`
        <span class="tab-bar-item__content">
          <slot name="icon"></slot>
        </span>
      `;
    }

    if (this.contentType === 'icon-with-title') {
      return html`
        <span class="tab-bar-item__content">
          <slot name="icon"></slot>
          <span class="tab-bar-item__label"><slot></slot></span>
        </span>
      `;
    }

    return html`
      <span class="tab-bar-item__content">
        <slot></slot>
      </span>
    `;
  }

  override render() {
    const safeHref = this._sanitizeUrl(this.href);
    const isLink = Boolean(safeHref);
    const tabindex = this.disabled ? '-1' : '0';

    if (isLink) {
      return html`
        <a
          class="tab-bar-item"
          part="item"
          href=${safeHref!}
          role="tab"
          aria-selected=${this.selected}
          aria-disabled=${this.disabled}
          tabindex=${tabindex}
          @click=${this._handleClick}
        >
          <span class="tab-bar-item__indicator" part="indicator"></span>
          ${this._renderContent()}
        </a>
      `;
    }

    return html`
      <button
        class="tab-bar-item"
        part="item"
        type="button"
        role="tab"
        aria-selected=${this.selected}
        ?disabled=${this.disabled}
        tabindex=${tabindex}
        @click=${this._handleClick}
      >
        <span class="tab-bar-item__indicator" part="indicator"></span>
        ${this._renderContent()}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-tab-bar-item': RRTabBarItem;
  }
}
