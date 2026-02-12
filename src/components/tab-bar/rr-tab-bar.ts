/**
 * RegelRecht Tab Bar Component (Lit + TypeScript)
 *
 * @element rr-tab-bar
 *
 * @slot - Default slot for tab bar items (rr-tab-bar-item components)
 *
 * @fires tabchange - When a tab is selected
 *
 * @csspart container - The tab bar container
 * @csspart items - The items wrapper
 */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './rr-tab-bar-item.ts';

@customElement('rr-tab-bar')
export class RRTabBar extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .tab-bar {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .tab-bar__items {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 0 var(--primitives-space-2);
      background-color: var(--primitives-color-neutral-100);
      border-radius: var(--semantics-controls-md-corner-radius);
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'tablist');
    this.addEventListener('select', this._handleItemSelect as EventListener);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('select', this._handleItemSelect as EventListener);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  private _handleItemSelect = (event: CustomEvent): void => {
    const items = this.querySelectorAll('rr-tab-bar-item');
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

  private _handleKeyDown = (event: KeyboardEvent): void => {
    const items = Array.from(this.querySelectorAll('rr-tab-bar-item:not([disabled])'));
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
      <div class="tab-bar" part="container">
        <div class="tab-bar__items" part="items">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-tab-bar': RRTabBar;
  }
}
