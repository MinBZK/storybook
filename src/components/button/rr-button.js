/**
 * RegelRecht Button Component
 *
 * @element rr-button
 * @attr {string} variant - Button variant: 'accent-filled' | 'accent-outlined' | 'accent-tinted' | 'neutral-tinted' | 'accent-transparent'
 * @attr {string} size - Button size: 'xs' | 's' | 'm' (default: 'm')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset'
 * @attr {boolean} has-leading-icon - Whether the button has a leading icon
 * @attr {boolean} has-trailing-icon - Whether the button has a trailing icon
 * @attr {boolean} has-menu - Whether the button has a dropdown menu icon
 *
 * @slot - Default slot for button content
 * @slot icon-start - Slot for icon before text
 * @slot icon-end - Slot for icon after text
 *
 * @fires click - When button is clicked (not fired when disabled)
 *
 * @csspart button - The native button element
 * @csspart content - The content wrapper
 *
 * @cssprop --rr-button-background-color - Override background color
 * @cssprop --rr-button-color - Override text color
 * @cssprop --rr-button-border-color - Override border color
 */

import { RRBaseComponent } from '../base/base-component.js';

export class RRButton extends RRBaseComponent {
  static componentName = 'rr-button';

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'variant',
      'type',
      'has-leading-icon',
      'has-trailing-icon',
      'has-menu',
    ];
  }

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);
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

  get hasLeadingIcon() {
    return this.getBooleanAttribute('has-leading-icon');
  }

  set hasLeadingIcon(value) {
    if (value) {
      this.setAttribute('has-leading-icon', '');
    } else {
      this.removeAttribute('has-leading-icon');
    }
  }

  get hasTrailingIcon() {
    return this.getBooleanAttribute('has-trailing-icon');
  }

  set hasTrailingIcon(value) {
    if (value) {
      this.setAttribute('has-trailing-icon', '');
    } else {
      this.removeAttribute('has-trailing-icon');
    }
  }

  get hasMenu() {
    return this.getBooleanAttribute('has-menu');
  }

  set hasMenu(value) {
    if (value) {
      this.setAttribute('has-menu', '');
    } else {
      this.removeAttribute('has-menu');
    }
  }

  _getStyles() {
    return `
      :host {
        display: inline-block;
        font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
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
        transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;

        /* Allow custom overrides */
        background-color: var(--rr-button-background-color, var(--_bg-color));
        color: var(--rr-button-color, var(--_text-color));
        border: var(--_border-width, 0) solid var(--rr-button-border-color, var(--_border-color, transparent));
      }

      .button:active:not(:disabled) {
        transform: scale(0.98);
      }

      /* Size: XS */
      :host([size="xs"]) .button {
        min-height: var(--semantics-controls-xs-min-size, 24px);
        /* Figma: padding 4px 6px (top/bottom 4, left/right 6) */
        padding: var(--primitives-space-4, 4px) var(--primitives-space-6, 6px);
        font: var(--components-button-xs-font, 600 14px/1.125 system-ui);
        border-radius: var(--semantics-controls-xs-corner-radius, 4px);
        gap: var(--primitives-space-2, 2px);
      }

      /* Size: S */
      :host([size="s"]) .button {
        min-height: var(--semantics-controls-s-min-size, 32px);
        /* Figma: padding 6px 8px (top/bottom 6, left/right 8) */
        padding: var(--primitives-space-6, 6px) var(--primitives-space-8, 8px);
        font: var(--components-button-s-font, 600 16px/1.125 system-ui);
        border-radius: var(--semantics-controls-s-corner-radius, 6px);
        gap: var(--primitives-space-2, 2px);
      }

      /* Size: M (default) */
      :host([size="m"]) .button,
      :host(:not([size])) .button {
        min-height: var(--semantics-controls-m-min-size, 44px);
        padding: var(--primitives-space-12, 12px);
        font: var(--components-button-m-font, 600 18px/1.125 system-ui);
        border-radius: var(--semantics-controls-m-corner-radius, 7px);
        gap: var(--primitives-space-4, 4px);
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

      /* Slots */
      ::slotted([slot="icon-start"]),
      ::slotted([slot="icon-end"]) {
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
    const showLeadingIcon = this.hasLeadingIcon || this.hasMenu;
    const showTrailingIcon = this.hasTrailingIcon;

    this.shadowRoot.innerHTML = `
      <button
        class="button"
        part="button"
        type="${this.type}"
        ${this.disabled ? 'disabled' : ''}
        aria-disabled="${this.disabled}"
      >
        <span class="content" part="content">
          ${showLeadingIcon ? '<slot name="icon-start"></slot>' : ''}
          <slot></slot>
          ${showTrailingIcon ? '<slot name="icon-end"></slot>' : ''}
        </span>
      </button>
    `;
  }
}

// Register the element
customElements.define('rr-button', RRButton);
