/**
 * RegelRecht Segmented Control Item Component (Lit + TypeScript)
 *
 * An individual item within a segmented control.
 * Should be used as a child of <rr-segmented-control>.
 *
 * @element rr-segmented-control-item
 * @attr {boolean} selected - Whether this item is selected
 * @attr {boolean} disabled - Disabled state
 * @attr {string} value - Value for this item
 * @attr {string} content-type - Content type: 'text' | 'icon' (default: 'text')
 *
 * @fires select - When item is selected (detail: { value: string })
 *
 * @slot - Default slot for text content
 * @slot icon - Slot for icon content (when content-type="icon")
 *
 * @csspart item - The item container
 * @csspart indicator - The selected indicator background
 * @csspart content - The content wrapper
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type ContentType = 'text' | 'icon';

@customElement('rr-segmented-control-item')
export class RRSegmentedControlItem extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      font-family: var(--rr-font-family-body);
      flex: 1;
    }

    :host([hidden]) {
      display: none;
    }

    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      cursor: pointer;
      box-sizing: border-box;
      transition: color 0.15s ease;
    }

    /* Size from parent - default to md */
    :host {
      --_item-padding: 8px 12px;
      --_item-min-height: 44px;
      --_item-font-size: 18px;
      --_indicator-radius: 6px;
      --_indicator-inset: 2px 4px;
      --_icon-size: 24px;
    }

    :host([size='sm']) {
      --_item-padding: 6px 8px;
      --_item-min-height: 32px;
      --_item-font-size: 16px;
      --_indicator-radius: 4px;
      --_indicator-inset: 1px 3px;
      --_icon-size: 20px;
    }

    /* Icon content type - hug content instead of fill */
    :host([content-type='icon']) {
      flex: 0 0 auto;
      --_item-padding: 8px;
    }

    :host([content-type='icon'][size='sm']) {
      --_item-padding: 6px 4px;
    }

    .item {
      padding: var(--_item-padding);
      min-height: var(--_item-min-height);
    }

    /* Selected indicator (background) */
    .item__indicator {
      position: absolute;
      inset: var(--_indicator-inset);
      background-color: var(--semantics-buttons-accent-filled-background-color);
      border-radius: var(--_indicator-radius);
      opacity: 0;
      transform: scale(0.95);
      transition:
        opacity 0.15s ease,
        transform 0.15s ease;
    }

    :host([selected]) .item__indicator {
      opacity: 1;
      transform: scale(1);
    }

    /* Content */
    .item__content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      z-index: 1;
      font-size: var(--_item-font-size);
      font-weight: 550;
      line-height: 1.125;
      color: var(--semantics-buttons-neutral-tinted-content-color);
    }

    :host([selected]) .item__content {
      color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
    }

    /* Icon content */
    ::slotted(svg),
    .item__icon ::slotted(*) {
      width: var(--_icon-size);
      height: var(--_icon-size);
    }

    /* Focus state */
    .item:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: -2px;
      z-index: 2;
    }

    /* Hover state */
    .item:hover:not([aria-disabled='true']) .item__content {
      color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
    }

    :host([selected]) .item:hover:not([aria-disabled='true']) .item__content {
      color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
    }

    /* Disabled state */
    :host([disabled]) .item {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .item,
      .item__indicator {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      :host([selected]) .item__indicator {
        background-color: Highlight !important;
      }

      .item:focus-visible {
        outline: 2px solid CanvasText !important;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  value = '';

  @property({ type: String, attribute: 'content-type', reflect: true })
  contentType: ContentType = 'text';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' = 'md';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'radio');
    this._updateAriaState();

    if (!this.hasAttribute('tabindex') && !this.disabled) {
      this.setAttribute('tabindex', this.selected ? '0' : '-1');
    }

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('selected') || changedProperties.has('disabled')) {
      this._updateAriaState();
    }
  }

  private _updateAriaState(): void {
    this.setAttribute('aria-checked', String(this.selected));
    this.setAttribute('aria-disabled', String(this.disabled));
    this.setAttribute('tabindex', this.selected && !this.disabled ? '0' : '-1');
  }

  private _handleClick = (): void => {
    if (this.disabled || this.selected) return;

    this.dispatchEvent(
      new CustomEvent('select', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  };

  override render() {
    return html`
      <div class="item" part="item" role="presentation" aria-disabled=${this.disabled}>
        <div class="item__indicator" part="indicator"></div>
        <div class="item__content" part="content">
          ${this.contentType === 'icon'
            ? html`<slot name="icon"></slot>`
            : html`<slot></slot>`}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-segmented-control-item': RRSegmentedControlItem;
  }
}
