/**
 * RegelRecht Radio Button Component
 *
 * WAI-ARIA: Radio buttons should be wrapped in a container with role="radiogroup" and aria-labelledby
 * pointing to a label element. Each radio automatically has role="radio" and aria-checked.
 *
 * @example
 * <div role="radiogroup" aria-labelledby="group-label">
 *   <span id="group-label">Choose an option</span>
 *   <rr-radio name="options" value="1">Option 1</rr-radio>
 *   <rr-radio name="options" value="2">Option 2</rr-radio>
 * </div>
 *
 * @element rr-radio
 * @attr {boolean} checked - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {string} name - Form control name (for radio groups)
 * @attr {string} value - Form control value
 * @attr {string} size - Radio button size: 'xs' | 's' | 'm' (default: 'm')
 *
 * @fires change - When checked state changes
 *
 * @csspart radio - The visual radio button element
 * @csspart input - The native input element
 *
 * @cssprop --rr-radio-background-color - Override background color
 * @cssprop --rr-radio-border-color - Override border color
 */

import { RRBaseComponent } from '../base/base-component.js';

export class RRRadio extends RRBaseComponent {
  static componentName = 'rr-radio';

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'checked',
      'name',
      'value',
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
    this.setAttribute('role', 'radio');
    this.setAttribute('aria-checked', String(this.checked));
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.addEventListener('click', this._onChange);
    this.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onChange);
    this.removeEventListener('keydown', this._onKeyDown);
  }

  _onChange(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Only allow checking (not unchecking) radio buttons via click
    if (!this.checked) {
      this.checked = true;
      this._dispatchChangeEvent();
      this._uncheckOtherRadios();
    }
  }

  _onKeyDown(event) {
    if (this.disabled) return;

    // Space or Enter to check the radio
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (!this.checked) {
        this.checked = true;
        this._dispatchChangeEvent();
        this._uncheckOtherRadios();
      }
    }

    // Arrow keys for navigation within radio group
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      this._focusNextRadio();
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this._focusPreviousRadio();
    }
  }

  _dispatchChangeEvent() {
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  _uncheckOtherRadios() {
    if (!this.name) return;

    // Find all radio buttons in the same group
    const radios = document.querySelectorAll(`rr-radio[name="${this.name}"]`);
    radios.forEach((radio) => {
      if (radio !== this && radio.checked) {
        radio.checked = false;
        radio.dispatchEvent(
          new Event('change', {
            bubbles: true,
            composed: true,
          })
        );
      }
    });
  }

  _getRadioGroup() {
    if (!this.name) return [];
    return Array.from(document.querySelectorAll(`rr-radio[name="${this.name}"]`)).filter(
      (radio) => !radio.disabled
    );
  }

  _focusNextRadio() {
    const radios = this._getRadioGroup();
    const currentIndex = radios.indexOf(this);
    const nextIndex = (currentIndex + 1) % radios.length;
    const nextRadio = radios[nextIndex];

    if (nextRadio) {
      nextRadio.focus();
      nextRadio.checked = true;
      nextRadio._dispatchChangeEvent();
      this.checked = false;
    }
  }

  _focusPreviousRadio() {
    const radios = this._getRadioGroup();
    const currentIndex = radios.indexOf(this);
    const prevIndex = currentIndex === 0 ? radios.length - 1 : currentIndex - 1;
    const prevRadio = radios[prevIndex];

    if (prevRadio) {
      prevRadio.focus();
      prevRadio.checked = true;
      prevRadio._dispatchChangeEvent();
      this.checked = false;
    }
  }

  get checked() {
    return this.getBooleanAttribute('checked');
  }

  set checked(value) {
    const isChecked = Boolean(value);
    if (isChecked) {
      this.setAttribute('checked', '');
      this.setAttribute('aria-checked', 'true');
    } else {
      this.removeAttribute('checked');
      this.setAttribute('aria-checked', 'false');
    }
  }

  get disabled() {
    return this.getBooleanAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
      this.setAttribute('aria-disabled', 'true');
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('disabled');
      this.setAttribute('aria-disabled', 'false');
      this.setAttribute('tabindex', '0');
    }
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    if (value) {
      this.setAttribute('name', value);
    } else {
      this.removeAttribute('name');
    }
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  set value(value) {
    if (value) {
      this.setAttribute('value', value);
    } else {
      this.removeAttribute('value');
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
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        cursor: not-allowed;
        opacity: calc(var(--primitives-opacity-disabled, 38) / 100);
      }

      /* The visual radio button */
      .radio {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        /* Circular shape */
        border-radius: 50%;

        /* Border */
        border: var(--components-radio-button-border-thickness, 2px) solid
                var(--rr-radio-border-color, var(--components-radio-button-border-color, #475569));

        /* Background */
        background-color: var(--rr-radio-background-color, var(--components-radio-button-background-color, #ffffff));

        /* Transition */
        transition: background-color 0.15s ease, border-color 0.15s ease;
      }

      /* Size: XS (24px) */
      :host([size="xs"]) .radio {
        width: var(--semantics-controls-xs-min-size, 24px);
        height: var(--semantics-controls-xs-min-size, 24px);
      }

      :host([size="xs"]) .radio-inner {
        width: 8px;
        height: 8px;
      }

      /* Size: S (32px) */
      :host([size="s"]) .radio {
        width: var(--semantics-controls-s-min-size, 32px);
        height: var(--semantics-controls-s-min-size, 32px);
      }

      :host([size="s"]) .radio-inner {
        width: 12px;
        height: 12px;
      }

      /* Size: M (44px - default) */
      :host([size="m"]) .radio,
      :host(:not([size])) .radio {
        width: var(--semantics-controls-m-min-size, 44px);
        height: var(--semantics-controls-m-min-size, 44px);
      }

      :host([size="m"]) .radio-inner,
      :host(:not([size])) .radio-inner {
        width: 16px;
        height: 16px;
      }

      /* Inner dot (only visible when checked) */
      .radio-inner {
        border-radius: 50%;
        background-color: var(--components-radio-button-is-selected-inner-shape-border-color, #ffffff);
        border: var(--components-radio-button-is-selected-inner-shape-border-thickness, 2px) solid
                var(--components-radio-button-is-selected-inner-shape-border-color, #ffffff);
        opacity: 0;
        transform: scale(0);
        transition: opacity 0.15s ease, transform 0.15s ease;
      }

      /* Checked state */
      :host([checked]) .radio {
        background-color: var(--components-radio-button-is-selected-background-color, #154273);
        border-color: var(--components-radio-button-is-selected-background-color, #154273);
      }

      :host([checked]) .radio-inner {
        opacity: 1;
        transform: scale(1);
      }

      /* Focus state */
      :host(:focus-visible) .radio {
        outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #000000);
        outline-offset: 2px;
      }

      /* Hover state (only when not disabled) */
      :host(:not([disabled]):hover) .radio {
        border-color: var(--primitives-color-accent-75, #4F7196);
      }

      :host(:not([disabled])[checked]:hover) .radio {
        background-color: var(--primitives-color-accent-75, #4F7196);
        border-color: var(--primitives-color-accent-75, #4F7196);
      }

      /* Hidden native input for form integration */
      .input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        pointer-events: none;
      }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="radio" part="radio">
        <div class="radio-inner"></div>
      </div>
      <input
        type="radio"
        class="input"
        part="input"
        name="${this.name}"
        value="${this.value}"
        ${this.checked ? 'checked' : ''}
        disabled
        tabindex="-1"
        aria-hidden="true"
        inert
      />
    `;
  }
}

// Register the element
customElements.define('rr-radio', RRRadio);
