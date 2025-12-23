/**
 * RegelRecht Menu Item Component
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

import { RRBaseComponent } from '../base/base-component.js';

export class RRMenuItem extends RRBaseComponent {
  static componentName = 'rr-menu-item';

  static get observedAttributes() {
    return [...super.observedAttributes, 'selected', 'href', 'disabled'];
  }

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);
    this.addEventListener('keydown', this._onKeyDown);

    // Set role for accessibility
    this.setAttribute('role', 'none');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onClick);
    this.removeEventListener('keydown', this._onKeyDown);
  }

  _onClick(event) {
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
  }

  _onKeyDown(event) {
    if (this.disabled) return;

    // Handle Enter and Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._onClick(event);
    }
  }

  get selected() {
    return this.getBooleanAttribute('selected');
  }

  set selected(value) {
    if (value) {
      this.setAttribute('selected', '');
    } else {
      this.removeAttribute('selected');
    }
  }

  get href() {
    return this.getAttribute('href');
  }

  set href(value) {
    if (value) {
      this.setAttribute('href', value);
    } else {
      this.removeAttribute('href');
    }
  }

  get disabled() {
    return this.getBooleanAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  _getStyles() {
    return `
      :host {
        display: block;
        position: relative;
        font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
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
        display: block;
        position: relative;
        width: 100%;
        cursor: pointer;

        /* Typography */
        font: var(--components-menu-bar-menu-item-font, 600 18px/1.125 RijksSansVF, system-ui);
        color: var(--rr-menu-item-color, var(--components-menu-bar-menu-item-color, #154273));
        text-align: left;

        /* Spacing */
        padding: var(--primitives-space-8, 8px) var(--primitives-space-16, 16px);

        /* Animation */
        transition: background-color 0.15s ease, color 0.15s ease;
      }

      /* Hover indicator */
      .hover-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0;
        background-color: var(--components-menu-bar-menu-item-is-hovered-indicator-color, #e2e8f0);
        transition: height 0.15s ease;
        pointer-events: none;
        z-index: 0;
      }

      .menu-item:hover:not(:disabled) .hover-indicator {
        height: var(--components-menu-bar-menu-item-is-hovered-indicator-height, 32px);
      }

      /* Selection indicator */
      .selection-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0;
        background-color: var(--components-menu-bar-menu-item-is-selected-indicator-color, #154273);
        transition: height 0.15s ease;
        pointer-events: none;
        z-index: 1;
      }

      :host([selected]) .selection-indicator {
        height: var(--components-menu-bar-menu-item-is-selected-indicator-height, 4px);
      }

      /* Content wrapper for z-index layering */
      .content {
        position: relative;
        z-index: 2;
      }

      /* Focus state */
      .menu-item:focus-visible {
        outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
        outline-offset: 2px;
      }

      /* Disabled state */
      :host([disabled]) .menu-item {
        opacity: calc(var(--primitives-opacity-disabled, 38) / 100);
        cursor: not-allowed;
        pointer-events: none;
      }
    `;
  }

  render() {
    const element = this.href ? 'a' : 'button';
    const role = this.href ? 'menuitem' : 'menuitem';
    const tabindex = this.disabled ? '-1' : '0';

    this.shadowRoot.innerHTML = `
      <${element}
        class="menu-item"
        part="link"
        role="${role}"
        ${this.href ? `href="${this.href}"` : 'type="button"'}
        ${this.disabled ? 'disabled' : ''}
        aria-disabled="${this.disabled}"
        aria-current="${this.selected ? 'page' : 'false'}"
        tabindex="${tabindex}"
      >
        <span class="hover-indicator"></span>
        <span class="selection-indicator" part="indicator"></span>
        <span class="content">
          <slot></slot>
        </span>
      </${element}>
    `;
  }
}

customElements.define('rr-menu-item', RRMenuItem);
