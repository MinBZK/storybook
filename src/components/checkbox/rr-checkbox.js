/**
 * RegelRecht Checkbox Component
 *
 * @element rr-checkbox
 * @attr {boolean} checked - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} indeterminate - Indeterminate state
 * @attr {string} size - Checkbox size: 'xs' | 's' | 'm' (default: 'm')
 * @attr {string} value - Value for form submission
 * @attr {string} name - Name for form submission
 *
 * @fires change - When checkbox state changes
 *
 * @csspart checkbox - The checkbox container
 * @csspart input - The native input element (hidden)
 * @csspart box - The visual checkbox box
 *
 * @cssprop --rr-checkbox-background-color - Override background color
 * @cssprop --rr-checkbox-border-color - Override border color
 */

import { RRBaseComponent } from '../base/base-component.js';

export class RRCheckbox extends RRBaseComponent {
  static componentName = 'rr-checkbox';

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'checked',
      'indeterminate',
      'value',
      'name',
      'aria-label',
      'aria-labelledby',
    ];
  }

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onChange);
    this.addEventListener('keydown', this._onKeyDown);

    // Set ARIA role
    this.setAttribute('role', 'checkbox');

    // Set ARIA checked state
    if (this.indeterminate) {
      this.setAttribute('aria-checked', 'mixed');
    } else {
      this.setAttribute('aria-checked', String(this.checked));
    }

    // Set ARIA disabled state
    this.setAttribute('aria-disabled', String(this.disabled));

    // Make focusable
    if (!this.hasAttribute('tabindex') && !this.disabled) {
      this.setAttribute('tabindex', '0');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onChange);
    this.removeEventListener('keydown', this._onKeyDown);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    // Update tabindex when disabled changes
    if (name === 'disabled') {
      if (this.disabled) {
        this.removeAttribute('tabindex');
      } else {
        this.setAttribute('tabindex', '0');
      }
    }
  }

  _onChange(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Toggle checked state
    this.checked = !this.checked;

    // Clear indeterminate when user clicks
    if (this.indeterminate) {
      this.indeterminate = false;
    }

    // Dispatch change event
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  _onKeyDown(event) {
    if (this.disabled) {
      return;
    }

    // Space key toggles checkbox
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      this._onChange(event);
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
    this.setAttribute('aria-checked', String(Boolean(value)));
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
    this.setAttribute('aria-disabled', String(Boolean(value)));
  }

  get indeterminate() {
    return this.getBooleanAttribute('indeterminate');
  }

  set indeterminate(value) {
    if (value) {
      this.setAttribute('indeterminate', '');
      this.setAttribute('aria-checked', 'mixed');
    } else {
      this.removeAttribute('indeterminate');
      this.setAttribute('aria-checked', String(this.checked));
    }
  }

  get size() {
    return this.getAttribute('size') || 'm';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get value() {
    return this.getAttribute('value') || 'on';
  }

  set value(val) {
    this.setAttribute('value', val);
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(val) {
    this.setAttribute('name', val);
  }

  _getStyles() {
    return `
      :host {
        display: inline-block;
        font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        cursor: not-allowed;
      }

      .checkbox {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      /* Hidden native input for form integration and accessibility */
      .input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        pointer-events: none;
      }

      /* Visual checkbox box */
      .box {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;

        /* Use component tokens */
        background-color: var(--rr-checkbox-background-color, var(--_bg-color, var(--components-checkbox-background-color, #ffffff)));
        border: var(--components-checkbox-border-thickness, 2px) solid var(--rr-checkbox-border-color, var(--_border-color, var(--components-checkbox-border-color, #475569)));

        /* Smooth transition */
        transition: background-color 0.15s ease, border-color 0.15s ease;
      }

      /* Checkmark icon */
      .icon {
        display: none;
        width: 60%;
        height: 60%;
        color: var(--components-checkbox-is-selected-icon-color, #ffffff);
      }

      /* Size: XS (24px) */
      :host([size="xs"]) .box {
        width: var(--semantics-controls-xs-min-size, 24px);
        height: var(--semantics-controls-xs-min-size, 24px);
        border-radius: var(--semantics-controls-xs-corner-radius, 3px);
      }

      /* Size: S (32px) */
      :host([size="s"]) .box {
        width: var(--semantics-controls-s-min-size, 32px);
        height: var(--semantics-controls-s-min-size, 32px);
        border-radius: var(--semantics-controls-s-corner-radius, 5px);
      }

      /* Size: M (44px - default) */
      :host([size="m"]) .box,
      :host(:not([size])) .box {
        width: var(--semantics-controls-m-min-size, 44px);
        height: var(--semantics-controls-m-min-size, 44px);
        border-radius: var(--semantics-controls-m-corner-radius, 7px);
      }

      /* Checked state */
      :host([checked]) .box {
        --_bg-color: var(--components-checkbox-is-selected-background-color, #154273);
        --_border-color: var(--components-checkbox-is-selected-background-color, #154273);
      }

      :host([checked]) .icon {
        display: block;
      }

      /* Indeterminate state */
      :host([indeterminate]) .box {
        --_bg-color: var(--components-checkbox-is-selected-background-color, #154273);
        --_border-color: var(--components-checkbox-is-selected-background-color, #154273);
      }

      :host([indeterminate]) .icon-indeterminate {
        display: block;
      }

      :host([indeterminate]) .icon-check {
        display: none;
      }

      /* Hover state */
      :host(:hover:not([disabled])) .box {
        --_border-color: var(--primitives-color-accent-75, #4F7196);
      }

      :host([checked]:hover:not([disabled])) .box,
      :host([indeterminate]:hover:not([disabled])) .box {
        --_bg-color: var(--primitives-color-accent-75, #4F7196);
        --_border-color: var(--primitives-color-accent-75, #4F7196);
      }

      /* Focus state */
      :host(:focus-visible) {
        outline: none;
      }

      :host(:focus-visible) .box {
        outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
        outline-offset: 2px;
      }

      /* Disabled state */
      :host([disabled]) {
        opacity: calc(var(--primitives-opacity-disabled, 38) / 100);
        pointer-events: none;
      }
    `;
  }

  render() {
    const checkIcon = `
      <svg class="icon icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    const indeterminateIcon = `
      <svg class="icon icon-indeterminate" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    `;

    this.shadowRoot.innerHTML = `
      <div class="checkbox" part="checkbox">
        <input
          type="checkbox"
          class="input"
          part="input"
          ${this.checked ? 'checked' : ''}
          disabled
          ${this.indeterminate ? 'indeterminate' : ''}
          value="${this.value}"
          name="${this.name}"
          aria-hidden="true"
          tabindex="-1"
          inert
        />
        <div class="box" part="box">
          ${checkIcon}
          ${indeterminateIcon}
        </div>
      </div>
    `;
  }
}

// Register the element
customElements.define('rr-checkbox', RRCheckbox);
