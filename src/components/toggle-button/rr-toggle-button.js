/**
 * RegelRecht Toggle Button Component
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

import { RRBaseComponent } from '../base/base-component.js';

export class RRToggleButton extends RRBaseComponent {
  static componentName = 'rr-toggle-button';

  static get observedAttributes() {
    return [...super.observedAttributes, 'selected'];
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
    this.toggle();
  }

  _onKeyDown(event) {
    if (this.disabled) return;

    // Toggle on Enter or Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  get size() {
    return this.getAttribute('size') || 'm';
  }

  set size(value) {
    this.setAttribute('size', value);
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

  toggle() {
    if (this.disabled) return;

    this.selected = !this.selected;

    // Dispatch toggle event
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { selected: this.selected },
        bubbles: true,
        composed: true,
      })
    );
  }

  _getStyles() {
    return `
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
        font-weight: var(--semantics-buttons-font-weight, 600);
        text-decoration: none;

        /* Animation */
        transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;

        /* Default state - using component tokens */
        background-color: var(--rr-toggle-button-background-color, var(--components-toggle-button-background-color, #e2e8f0));
        color: var(--rr-toggle-button-content-color, var(--components-toggle-button-content-color, #0f172a));
      }

      .button:active:not(:disabled) {
        transform: scale(0.98);
      }

      /* Size: XS */
      :host([size="xs"]) .button {
        min-height: var(--semantics-controls-xs-min-size, 24px);
        padding: 4px 12px;
        font: var(--components-button-xs-font, 600 14px/1.125 system-ui);
        border-radius: var(--semantics-controls-xs-corner-radius, 3px);
        gap: var(--primitives-space-2, 2px);
      }

      /* Size: S */
      :host([size="s"]) .button {
        min-height: var(--semantics-controls-s-min-size, 32px);
        padding: 6px 16px;
        font: var(--components-button-s-font, 600 16px/1.125 system-ui);
        border-radius: var(--semantics-controls-s-corner-radius, 5px);
        gap: var(--primitives-space-2, 2px);
      }

      /* Size: M (default) */
      :host([size="m"]) .button,
      :host(:not([size])) .button {
        min-height: var(--semantics-controls-m-min-size, 44px);
        padding: 10px 20px;
        font: var(--components-button-m-font, 600 18px/1.125 system-ui);
        border-radius: var(--semantics-controls-m-corner-radius, 7px);
        gap: var(--primitives-space-4, 4px);
      }

      /* Hover state */
      .button:hover:not(:disabled) {
        background-color: var(--components-toggle-button-is-hovered-background-color, #cbd5e1);
        color: var(--components-toggle-button-is-hovered-content-color, #0f172a);
      }

      /* Selected state */
      :host([selected]) .button {
        background-color: var(--components-toggle-button-is-selected-background-color, #154273);
        color: var(--components-toggle-button-is-selected-content-color, #ffffff);
      }

      /* Selected hover state - stays selected color on hover */
      :host([selected]) .button:hover:not(:disabled) {
        background-color: var(--primitives-color-accent-75, #4F7196);
        color: var(--components-toggle-button-is-selected-content-color, #ffffff);
      }

      /* Focus state */
      .button:focus-visible {
        outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
        outline-offset: 2px;
      }

      /* Disabled state */
      :host([disabled]) .button {
        opacity: calc(var(--primitives-opacity-disabled, 38) / 100);
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
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <button
        class="button"
        part="button"
        type="button"
        role="button"
        aria-pressed="${this.selected}"
        ${this.disabled ? 'disabled' : ''}
        aria-disabled="${this.disabled}"
        tabindex="${this.disabled ? '-1' : '0'}"
      >
        <span class="content" part="content">
          <slot name="icon"></slot>
          <slot></slot>
        </span>
      </button>
    `;
  }
}

// Register the element
customElements.define('rr-toggle-button', RRToggleButton);
