/**
 * RegelRecht Icon Button Component
 *
 * @element rr-icon-button
 * @attr {string} variant - Button variant: 'accent-filled' | 'accent-outlined' | 'accent-tinted' | 'neutral-tinted' | 'accent-transparent'
 * @attr {string} size - Button size: 'xs' | 's' | 'm' (default: 'm')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset'
 * @attr {string} aria-label - Accessible label for the icon button (required for accessibility)
 *
 * @slot - Default slot for icon content
 *
 * @fires click - When button is clicked (not fired when disabled)
 *
 * @csspart button - The native button element
 *
 * @cssprop --rr-icon-button-background-color - Override background color
 * @cssprop --rr-icon-button-color - Override icon color
 * @cssprop --rr-icon-button-border-color - Override border color
 */

import { RRBaseComponent } from '../base/base-component.js';

export class RRIconButton extends RRBaseComponent {
  static componentName = 'rr-icon-button';

  static get observedAttributes() {
    return [...super.observedAttributes, 'variant', 'type', 'aria-label'];
  }

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);

    // Move aria-label from host to internal button (host shouldn't have ARIA without role)
    if (this.hasAttribute('aria-label')) {
      this._ariaLabel = this.getAttribute('aria-label');
      this.removeAttribute('aria-label');
      this.render();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onClick);
  }

  _onClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  get variant() {
    return this.getAttribute('variant') || 'accent-filled';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get size() {
    return this.getAttribute('size') || 'm';
  }

  set size(value) {
    this.setAttribute('size', value);
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

  get type() {
    return this.getAttribute('type') || 'button';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  get ariaLabel() {
    return this._ariaLabel || this.getAttribute('aria-label') || '';
  }

  set ariaLabel(value) {
    this._ariaLabel = value;
    this.render();
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

        /* Layout - Square aspect ratio */
        display: inline-flex;
        align-items: center;
        justify-content: center;

        /* Typography */
        font: var(--components-icon-button-font, 600 14px/1.125 RijksSansVF, system-ui);

        /* Animation */
        transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;

        /* Allow custom overrides */
        background-color: var(--rr-icon-button-background-color, var(--_bg-color));
        color: var(--rr-icon-button-color, var(--_text-color));
        border: var(--_border-width, 0) solid var(--rr-icon-button-border-color, var(--_border-color, transparent));
      }

      .button:active:not(:disabled) {
        transform: scale(0.98);
      }

      /* Size: XS - Square 24x24 */
      :host([size="xs"]) .button {
        width: var(--semantics-controls-xs-min-size, 24px);
        height: var(--semantics-controls-xs-min-size, 24px);
        min-width: var(--semantics-controls-xs-min-size, 24px);
        min-height: var(--semantics-controls-xs-min-size, 24px);
        border-radius: var(--semantics-controls-xs-corner-radius, 3px);
      }

      /* Size: S - Square 32x32 */
      :host([size="s"]) .button {
        width: var(--semantics-controls-s-min-size, 32px);
        height: var(--semantics-controls-s-min-size, 32px);
        min-width: var(--semantics-controls-s-min-size, 32px);
        min-height: var(--semantics-controls-s-min-size, 32px);
        border-radius: var(--semantics-controls-s-corner-radius, 5px);
      }

      /* Size: M - Square 44x44 (default) */
      :host([size="m"]) .button,
      :host(:not([size])) .button {
        width: var(--semantics-controls-m-min-size, 44px);
        height: var(--semantics-controls-m-min-size, 44px);
        min-width: var(--semantics-controls-m-min-size, 44px);
        min-height: var(--semantics-controls-m-min-size, 44px);
        border-radius: var(--semantics-controls-m-corner-radius, 7px);
      }

      /* Variant: accent-filled (default) */
      :host([variant="accent-filled"]) .button,
      :host(:not([variant])) .button {
        --_bg-color: var(--semantics-buttons-accent-filled-background-color, #154273);
        --_text-color: var(--semantics-buttons-accent-filled-color, #ffffff);
      }

      :host([variant="accent-filled"]) .button:hover,
      :host(:not([variant])) .button:hover {
        --_bg-color: var(--primitives-color-accent-75, #4F7196);
      }

      /* Variant: accent-outlined */
      :host([variant="accent-outlined"]) .button {
        --_bg-color: transparent;
        --_text-color: var(--semantics-buttons-accent-outlined-color, #154273);
        --_border-color: var(--semantics-buttons-accent-outlined-border-color, #154273);
        --_border-width: var(--semantics-buttons-accent-outlined-border-thickness, 2px);
      }

      :host([variant="accent-outlined"]) .button:hover {
        --_bg-color: var(--primitives-color-accent-15, #DCE3EA);
      }

      /* Variant: accent-tinted */
      :host([variant="accent-tinted"]) .button {
        --_bg-color: var(--semantics-buttons-accent-tinted-background-color, #dce3ea);
        --_text-color: var(--semantics-buttons-accent-tinted-color, #154273);
      }

      :host([variant="accent-tinted"]) .button:hover {
        --_bg-color: var(--primitives-color-accent-30, #B9C7D5);
      }

      /* Variant: neutral-tinted */
      :host([variant="neutral-tinted"]) .button {
        --_bg-color: var(--semantics-buttons-neutral-tinted-background-color, #e2e8f0);
        --_text-color: var(--semantics-buttons-neutral-tinted-color, #0f172a);
      }

      :host([variant="neutral-tinted"]) .button:hover {
        --_bg-color: var(--primitives-color-neutral-300, #cbd5e1);
      }

      /* Variant: accent-transparent */
      :host([variant="accent-transparent"]) .button {
        --_bg-color: transparent;
        --_text-color: var(--semantics-buttons-accent-transparent-color, #154273);
      }

      :host([variant="accent-transparent"]) .button:hover {
        --_bg-color: var(--primitives-color-accent-15, #DCE3EA);
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

      /* Icon sizing */
      ::slotted(*) {
        width: 1em;
        height: 1em;
        flex-shrink: 0;
        display: block;
      }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <button
        class="button"
        part="button"
        type="${this.type}"
        ${this.disabled ? 'disabled' : ''}
        aria-disabled="${this.disabled}"
        aria-label="${this.ariaLabel}"
      >
        <slot></slot>
      </button>
    `;
  }
}

// Register the element
customElements.define('rr-icon-button', RRIconButton);
