/**
 * RegelRecht Segmented Control Component (Lit + TypeScript)
 *
 * A horizontal group of mutually exclusive options.
 *
 * @element rr-segmented-control
 * @attr {string} value - Currently selected value
 * @attr {string} size - Control size: 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state for all items
 *
 * @fires change - When selection changes (detail: { value: string })
 *
 * @slot - Default slot for rr-segmented-control-item elements
 *
 * @csspart container - The container element
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { RRSegmentedControlItem } from './rr-segmented-control-item.ts';
import './rr-segmented-control-item.ts';

type Size = 'sm' | 'md';

@customElement('rr-segmented-control')
export class RRSegmentedControl extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--semantics-buttons-neutral-tinted-background-color);
      padding: 0 2px;
      box-sizing: border-box;
    }

    /* Size: S */
    :host([size='sm']) .container {
      border-radius: var(--semantics-controls-sm-corner-radius);
    }

    /* Size: M (default) */
    :host([size='md']) .container,
    :host(:not([size])) .container {
      border-radius: var(--semantics-controls-md-corner-radius);
    }

    /* Full width option */
    :host([full-width]) {
      display: block;
    }

    :host([full-width]) .container {
      width: 100%;
    }

    /* Disabled state */
    :host([disabled]) .container {
      opacity: var(--primitives-opacity-disabled);
      pointer-events: none;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .container {
        border: 1px solid CanvasText;
      }
    }
  `;

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  size: Size = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'radiogroup');
    this.addEventListener('select', this._handleSelect as EventListener);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('select', this._handleSelect as EventListener);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override firstUpdated(): void {
    this._updateItems();
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('value') || changedProperties.has('size') || changedProperties.has('disabled')) {
      this._updateItems();
    }
  }

  private _getItems(): RRSegmentedControlItem[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot
      .assignedElements()
      .filter((el): el is RRSegmentedControlItem => el.tagName === 'RR-SEGMENTED-CONTROL-ITEM');
  }

  private _updateItems(): void {
    const items = this._getItems();
    items.forEach((item) => {
      item.selected = item.value === this.value;
      item.size = this.size;
      item.disabled = this.disabled || item.hasAttribute('disabled');
    });
  }

  private _handleSelect = (e: CustomEvent<{ value: string }>): void => {
    e.stopPropagation();
    if (this.disabled) return;

    const newValue = e.detail.value;
    if (newValue !== this.value) {
      this.value = newValue;
      this._updateItems();

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    const items = this._getItems().filter((item) => !item.disabled);
    if (items.length === 0) return;

    const currentIndex = items.findIndex((item) => item.selected);
    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = currentIndex >= items.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex && items[nextIndex]) {
      this.value = items[nextIndex].value;
      this._updateItems();
      items[nextIndex].focus();

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private _handleSlotChange = (): void => {
    this._updateItems();
  };

  override render() {
    return html`
      <div class="container" part="container">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-segmented-control': RRSegmentedControl;
  }
}
