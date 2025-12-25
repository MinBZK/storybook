/**
 * RegelRecht Switch Component
 *
 * @element rr-switch
 * @attr {boolean} checked - Whether the switch is on/off
 * @attr {boolean} disabled - Disabled state
 * @attr {string} size - Switch size: 'xs' | 's' | 'm' (default: 'm')
 *
 * @fires change - When the switch state changes
 *
 * @csspart switch - The switch container element
 * @csspart thumb - The draggable thumb element
 * @csspart input - The hidden checkbox input
 *
 * @cssprop --rr-switch-background-color - Override background color
 * @cssprop --rr-switch-thumb-color - Override thumb color
 */

import { RRBaseComponent } from '../base/base-component.js';

export class RRSwitch extends RRBaseComponent {
  static componentName = 'rr-switch';

  static get observedAttributes() {
    return [...super.observedAttributes, 'checked', 'aria-label', 'aria-labelledby'];
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

    // Set ARIA role
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'switch');
    }

    // Set tabindex if not disabled
    if (!this.disabled && !this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
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
    if (this.disabled) {
      return;
    }

    // Space or Enter toggles the switch
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  get checked() {
    return this.getBooleanAttribute('checked');
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
    this.setAttribute('aria-checked', value ? 'true' : 'false');

    // Sync hidden input
    const input = this.shadowRoot?.querySelector('.input');
    if (input) {
      input.checked = value;
    }
  }

  get disabled() {
    return this.getBooleanAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
      this.removeAttribute('tabindex');
    } else {
      this.removeAttribute('disabled');
      this.setAttribute('tabindex', '0');
    }
    this.setAttribute('aria-disabled', value ? 'true' : 'false');
  }

  get size() {
    return this.getAttribute('size') || 'm';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  toggle() {
    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;

    // Dispatch change event
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked },
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
        outline: none;
        cursor: pointer;
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        cursor: not-allowed;
        opacity: calc(var(--primitives-opacity-disabled, 38) / 100);
      }

      .switch-container {
        position: relative;
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
      }

      /* Hidden checkbox for form integration */
      .input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        pointer-events: none;
      }

      .switch {
        position: relative;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        background-color: var(--rr-switch-background-color, var(--components-switch-background-color, #ffffff));
        border: var(--components-switch-border-thickness, 2px) solid var(--components-switch-border-color, #475569);
        transition: background-color 0.2s ease, border-color 0.2s ease;
        cursor: inherit;
      }

      .thumb {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        background-color: var(--rr-switch-thumb-color, var(--components-switch-thumb-background-color, #ffffff));
        border: var(--components-switch-thumb-border-thickness, 2px) solid var(--components-switch-thumb-border-color, #475569);
        transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
        will-change: transform;
      }

      /* Size: XS */
      :host([size="xs"]) .switch {
        width: calc(var(--semantics-controls-xs-min-size, 24px) * 1.6);
        height: calc(var(--semantics-controls-xs-min-size, 24px) * 0.833);
        border-radius: calc(var(--semantics-controls-xs-min-size, 24px) * 0.5);
        padding: 2px;
      }

      :host([size="xs"]) .thumb {
        width: calc(var(--semantics-controls-xs-min-size, 24px) * 0.5);
        height: calc(var(--semantics-controls-xs-min-size, 24px) * 0.5);
        border-radius: 50%; /* Circular thumb per Figma */
      }

      :host([size="xs"][checked]) .thumb {
        transform: translateX(calc(var(--semantics-controls-xs-min-size, 24px) * 0.5));
      }

      /* Size: S - Figma specs: 44x24px */
      :host([size="s"]) .switch {
        width: calc(var(--semantics-controls-xs-min-size, 24px) * 1.833);
        height: var(--semantics-controls-xs-min-size, 24px);
        border-radius: calc(var(--semantics-controls-xs-min-size, 24px) / 2);
        padding: 2px;
      }

      :host([size="s"]) .thumb {
        width: calc(var(--semantics-controls-xs-min-size, 24px) - 8px);
        height: calc(var(--semantics-controls-xs-min-size, 24px) - 8px);
        border-radius: 50%; /* Circular thumb per Figma */
      }

      :host([size="s"][checked]) .thumb {
        transform: translateX(calc((var(--semantics-controls-xs-min-size, 24px) * 1.833) - var(--semantics-controls-xs-min-size, 24px)));
      }

      /* Size: M (default) - Figma specs: 56x32px */
      :host([size="m"]) .switch,
      :host(:not([size])) .switch {
        width: calc(var(--semantics-controls-s-min-size, 32px) * 1.75);
        height: var(--semantics-controls-s-min-size, 32px);
        border-radius: calc(var(--semantics-controls-s-min-size, 32px) / 2);
        padding: 2px;
      }

      :host([size="m"]) .thumb,
      :host(:not([size])) .thumb {
        width: calc(var(--semantics-controls-s-min-size, 32px) - 8px);
        height: calc(var(--semantics-controls-s-min-size, 32px) - 8px);
        border-radius: 50%; /* Circular thumb per Figma */
      }

      :host([size="m"][checked]) .thumb,
      :host(:not([size])[checked]) .thumb {
        transform: translateX(calc((var(--semantics-controls-s-min-size, 32px) * 1.75) - var(--semantics-controls-s-min-size, 32px)));
      }

      /* Checked state */
      :host([checked]) .switch {
        background-color: var(--components-switch-is-selected-background-color, #154273);
        border-color: var(--components-switch-is-selected-background-color, #154273);
      }

      :host([checked]) .thumb {
        background-color: var(--components-switch-is-selected-thumb-background-color, #ffffff);
        border-color: var(--components-switch-is-selected-background-color, #154273);
      }

      /* Focus state */
      :host(:focus-visible) .switch {
        outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
        outline-offset: 2px;
      }

      /* Hover state (only when not disabled) */
      :host(:not([disabled]):hover) .switch {
        filter: brightness(0.95);
      }

      /* Active state (only when not disabled) */
      :host(:not([disabled]):active) .switch {
        filter: brightness(0.9);
      }

      /* Disabled state handled by host opacity */
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="switch-container">
        <input
          type="checkbox"
          class="input"
          part="input"
          ${this.checked ? 'checked' : ''}
          disabled
          aria-hidden="true"
          tabindex="-1"
          inert
        />
        <div class="switch" part="switch">
          <div class="thumb" part="thumb"></div>
        </div>
      </div>
    `;

    // Update ARIA attributes
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }
}

// Register the element
customElements.define('rr-switch', RRSwitch);
