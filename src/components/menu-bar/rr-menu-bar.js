/**
 * RegelRecht Menu Bar Component
 *
 * @element rr-menu-bar
 * @attr {string} size - Title size: 's' | 'm' | 'l' (only affects title slot)
 *
 * @slot - Default slot for menu items (rr-menu-item components)
 * @slot title - Slot for optional menu bar title
 *
 * @fires itemselect - When a menu item is selected
 *
 * @csspart container - The menu bar container
 * @csspart title - The title element
 * @csspart menu - The menu items container
 */

import { RRBaseComponent } from '../base/base-component.js';
import './rr-menu-item.js';

export class RRMenuBar extends RRBaseComponent {
  static componentName = 'rr-menu-bar';

  static get observedAttributes() {
    return [...super.observedAttributes, 'size'];
  }

  constructor() {
    super();
    this._onItemSelect = this._onItemSelect.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('select', this._onItemSelect);
    this.addEventListener('keydown', this._onKeyDown);

    // Set ARIA role
    this.setAttribute('role', 'menubar');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('select', this._onItemSelect);
    this.removeEventListener('keydown', this._onKeyDown);
  }

  _onItemSelect(event) {
    // Deselect all items except the selected one
    const items = this.querySelectorAll('rr-menu-item');
    items.forEach(item => {
      if (item !== event.detail.item) {
        item.selected = false;
      }
    });

    // Dispatch event to parent
    this.dispatchEvent(new CustomEvent('itemselect', {
      bubbles: true,
      composed: true,
      detail: event.detail
    }));
  }

  _onKeyDown(event) {
    const items = Array.from(this.querySelectorAll('rr-menu-item:not([disabled])'));
    if (items.length === 0) return;

    const currentIndex = items.findIndex(item => item === event.target || item.contains(event.target));
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
      items[newIndex].focus();
    }
  }

  get size() {
    return this.getAttribute('size') || 'm';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  _getStyles() {
    return `
      :host {
        display: block;
        font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
      }

      :host([hidden]) {
        display: none;
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .title {
        padding: var(--primitives-space-8, 8px) var(--primitives-space-16, 16px);
        margin: 0;
      }

      /* Title size variants */
      :host([size="s"]) .title {
        font: var(--components-menu-bar-title-item-s-font, 600 18px/1.125 RijksSansVF, system-ui);
      }

      :host([size="m"]) .title,
      :host(:not([size])) .title {
        font: var(--components-menu-bar-title-item-m-font, 600 20px/1.125 RijksSansVF, system-ui);
      }

      :host([size="l"]) .title {
        font: var(--components-menu-bar-title-item-l-font, 600 23px/1.125 RijksSansVF, system-ui);
      }

      .menu {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        gap: 0;
      }

      ::slotted(rr-menu-item) {
        flex: 0 0 auto;
      }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="container" part="container">
        <slot name="title"></slot>
        <nav class="menu" part="menu" role="none">
          <slot></slot>
        </nav>
      </div>
    `;
  }
}

customElements.define('rr-menu-bar', RRMenuBar);
