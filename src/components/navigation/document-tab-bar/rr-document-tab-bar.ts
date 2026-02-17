/**
 * RegelRecht Document Tab Bar Component (Lit + TypeScript)
 *
 * A tab bar for document tabs with a divider between items and
 * an end slot for action buttons (e.g., more, new).
 *
 * @element rr-document-tab-bar
 *
 * @slot - Default slot for rr-document-tab-bar-item children
 * @slot end - Slot for action buttons (more, new)
 *
 * @fires tabchange - When a tab is selected
 * @fires tabdismiss - When a tab dismiss button is clicked
 *
 * @csspart container - The tab bar container
 * @csspart items - The items wrapper
 * @csspart divider - The divider between items and end slot
 * @csspart end - The end slot wrapper
 */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../document-tab-bar-item/rr-document-tab-bar-item.ts';

@customElement('rr-document-tab-bar')
export class RRDocumentTabBar extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .document-tab-bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--primitives-space-8);
      padding: var(--primitives-space-8) var(--primitives-space-16);
      overflow-x: auto;
    }

    .document-tab-bar__items {
      display: contents;
    }

    .document-tab-bar__divider {
      width: 1px;
      height: 28px;
      background-color: var(--primitives-color-neutral-300);
      flex-shrink: 0;
    }

    .document-tab-bar__end {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--primitives-space-8);
      flex-shrink: 0;
    }

    /* Scrollbar styles */
    .document-tab-bar {
      scrollbar-width: none;
    }

    .document-tab-bar::-webkit-scrollbar {
      display: none;
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'tablist');
    this.addEventListener('select', this._handleItemSelect as EventListener);
    this.addEventListener('dismiss', this._handleItemDismiss as EventListener);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('select', this._handleItemSelect as EventListener);
    this.removeEventListener('dismiss', this._handleItemDismiss as EventListener);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  private _handleItemSelect = (event: CustomEvent): void => {
    const items = this.querySelectorAll('rr-document-tab-bar-item');
    items.forEach((item) => {
      if (item !== event.detail.item) {
        (item as HTMLElement).removeAttribute('selected');
      }
    });

    this.dispatchEvent(
      new CustomEvent('tabchange', {
        bubbles: true,
        composed: true,
        detail: event.detail,
      })
    );
  };

  private _handleItemDismiss = (event: CustomEvent): void => {
    this.dispatchEvent(
      new CustomEvent('tabdismiss', {
        bubbles: true,
        composed: true,
        detail: event.detail,
      })
    );
  };

  private _handleKeyDown = (event: KeyboardEvent): void => {
    const items = Array.from(
      this.querySelectorAll('rr-document-tab-bar-item:not([disabled])')
    );
    if (items.length === 0) return;

    const currentIndex = items.findIndex(
      (item) => item === event.target || item.contains(event.target as Node)
    );
    let newIndex = -1;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    if (newIndex >= 0 && newIndex < items.length) {
      (items[newIndex] as HTMLElement).focus();
    }
  };

  override render() {
    return html`
      <div class="document-tab-bar" part="container">
        <div class="document-tab-bar__items" part="items">
          <slot></slot>
        </div>
        <div class="document-tab-bar__divider" part="divider"></div>
        <div class="document-tab-bar__end" part="end">
          <slot name="end"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-document-tab-bar': RRDocumentTabBar;
  }
}
