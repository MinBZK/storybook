/**
 * RegelRecht Icon Button Component
 *
 * @element rr-icon-button
 * @attr {string} variant - Button variant: 'accent-filled' | 'accent-outlined' | 'accent-tinted' | 'neutral-tinted' | 'accent-transparent'
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
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
    return this.getAttribute('size') || 'md';
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
        font-family: var(--rr-font-family-body);
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

        /* Typography - icon buttons have no text, font inherited for sizing context */
        font: var(--semantics-buttons-md-font);

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
        width: var(--semantics-controls-xs-min-size);
        height: var(--semantics-controls-xs-min-size);
        min-width: var(--semantics-controls-xs-min-size);
        min-height: var(--semantics-controls-xs-min-size);
        border-radius: var(--semantics-controls-xs-corner-radius);
      }

      /* Size: S - Square 32x32 */
      :host([size="sm"]) .button {
        width: var(--semantics-controls-sm-min-size);
        height: var(--semantics-controls-sm-min-size);
        min-width: var(--semantics-controls-sm-min-size);
        min-height: var(--semantics-controls-sm-min-size);
        border-radius: var(--semantics-controls-sm-corner-radius);
      }

      /* Size: M - Square 44x44 (default) */
      :host([size="md"]) .button,
      :host(:not([size])) .button {
        width: var(--semantics-controls-md-min-size);
        height: var(--semantics-controls-md-min-size);
        min-width: var(--semantics-controls-md-min-size);
        min-height: var(--semantics-controls-md-min-size);
        border-radius: var(--semantics-controls-md-corner-radius);
      }

      /* Variant: accent-filled (default) */
      :host([variant="accent-filled"]) .button,
      :host(:not([variant])) .button {
        --_bg-color: var(--semantics-buttons-accent-filled-background-color);
        --_text-color: var(--semantics-buttons-accent-filled-content-color);
      }

      :host([variant="accent-filled"]) .button:hover,
      :host(:not([variant])) .button:hover {
        --_bg-color: var(--primitives-color-accent-75);
      }

      /* Variant: accent-outlined */
      :host([variant="accent-outlined"]) .button {
        --_bg-color: transparent;
        --_text-color: var(--semantics-buttons-accent-outlined-content-color);
        --_border-color: var(--semantics-buttons-accent-outlined-border-color);
        --_border-width: var(--semantics-buttons-accent-outlined-border-thickness);
      }

      :host([variant="accent-outlined"]) .button:hover {
        --_bg-color: var(--primitives-color-accent-150);
      }

      /* Variant: accent-tinted */
      :host([variant="accent-tinted"]) .button {
        --_bg-color: var(--semantics-buttons-accent-tinted-background-color);
        --_text-color: var(--semantics-buttons-accent-tinted-content-color);
      }

      :host([variant="accent-tinted"]) .button:hover {
        --_bg-color: var(--primitives-color-accent-300);
      }

      /* Variant: neutral-tinted */
      :host([variant="neutral-tinted"]) .button {
        --_bg-color: var(--semantics-buttons-neutral-tinted-background-color);
        --_text-color: var(--semantics-buttons-neutral-tinted-content-color);
      }

      :host([variant="neutral-tinted"]) .button:hover {
        --_bg-color: var(--primitives-color-neutral-300);
      }

      /* Variant: accent-transparent */
      :host([variant="accent-transparent"]) .button {
        --_bg-color: transparent;
        --_text-color: var(--semantics-buttons-accent-transparent-content-color);
      }

      :host([variant="accent-transparent"]) .button:hover {
        --_bg-color: var(--primitives-color-accent-150);
      }

      /* Focus state */
      .button:focus-visible {
        outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
        outline-offset: 2px;
      }

      /* Disabled state */
      :host([disabled]) .button {
        opacity: var(--primitives-opacity-disabled);
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Icon sizing - size-specific dimensions */
      ::slotted(*) {
        width: var(--_icon-size);
        height: var(--_icon-size);
        flex-shrink: 0;
        display: block;
      }

      /* XS: 24px button → 12px icon (~50%) */
      :host([size="xs"]) {
        --_icon-size: 12px;
      }

      /* S: 32px button → 16px icon (~50%) */
      :host([size="sm"]) {
        --_icon-size: 16px;
      }

      /* M: 44px button → 20px icon (~45%) */
      :host([size="md"]),
      :host(:not([size])) {
        --_icon-size: 20px;
      }
    `;
  }

  render() {
    // Escape user-provided content
    const safeAriaLabel = this.escapeHtml(this.ariaLabel);
    // Validate type to prevent injection
    const validTypes = ['button', 'submit', 'reset'];
    const safeType = validTypes.includes(this.type) ? this.type : 'button';

    this.shadowRoot.innerHTML = `
      <button
        class="button"
        part="button"
        type="${safeType}"
        ${this.disabled ? 'disabled' : ''}
        aria-disabled="${this.disabled}"
        aria-label="${safeAriaLabel}"
      >
        <slot></slot>
      </button>
    `;
  }
}

// Register the element
customElements.define('rr-icon-button', RRIconButton);
