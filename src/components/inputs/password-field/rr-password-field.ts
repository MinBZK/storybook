/**
 * RegelRecht Password Field Component (Lit + TypeScript)
 *
 * A password input field with visibility toggle and validation states.
 *
 * @element rr-password-field
 * @attr {string} value - Input value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {string} validation - Validation state: 'neutral' | 'valid' | 'invalid'
 * @attr {boolean} masked - Whether the password is masked (default: true)
 * @attr {string} name - Form field name
 *
 * @fires input - When the input value changes
 * @fires change - When the input value is committed
 *
 * @csspart field - The field container
 * @csspart input - The native input element
 * @csspart toggle - The visibility toggle button
 */

import { LitElement, html, css, svg } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

type Validation = 'neutral' | 'valid' | 'invalid';

@customElement('rr-password-field')
export class RRPasswordField extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    :host(.focus) {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: 2px;
    }

    .password-field {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 44px;
      background-color: var(--semantics-input-fields-background-color);
      border: var(--semantics-input-fields-border-thickness) solid
        var(--_border-color, var(--semantics-input-fields-border-color));
      border-radius: var(--semantics-controls-md-corner-radius);
      box-sizing: border-box;
      overflow: hidden;
      transition: border-color 0.15s ease;
    }

    /* Validation states */
    :host([validation='valid']) .password-field {
      --_border-color: var(--semantics-input-fields-is-valid-border-color);
    }

    :host([validation='invalid']) .password-field {
      --_border-color: var(--semantics-input-fields-is-invalid-border-color);
    }

    .password-field__input {
      flex: 1;
      height: 100%;
      border: none;
      background: transparent;
      padding: 0 var(--primitives-space-12);
      font: var(--semantics-input-fields-md-text);
      color: var(--semantics-content-color);
      outline: none;
      min-width: 0;
    }

    .password-field__input::placeholder {
      color: var(--semantics-input-fields-placeholder-color);
    }

    .password-field__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      margin-left: var(--primitives-space-8);
    }

    .password-field__icon--valid {
      color: var(--semantics-input-fields-is-valid-border-color);
    }

    .password-field__icon--invalid {
      color: var(--semantics-input-fields-is-invalid-border-color);
    }

    .password-field__toggle {
      appearance: none;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 100%;
      color: var(--semantics-content-secondary-color);
      flex-shrink: 0;
      transition: color 0.15s ease;
    }

    .password-field__toggle:hover {
      color: var(--semantics-content-color);
    }

    .password-field__toggle:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: -2px;
    }

    .password-field__toggle-icon {
      width: 24px;
      height: 24px;
    }

    /* Disabled state */
    :host([disabled]) .password-field {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      pointer-events: none;
    }

    :host([disabled]) .password-field__input {
      cursor: not-allowed;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .password-field,
      .password-field__toggle {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .password-field {
        border: 1px solid CanvasText;
      }

      :host(.focus) {
        outline: 2px solid CanvasText !important;
      }
    }
  `;

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = 'Password field';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  validation: Validation = 'neutral';

  @property({ type: Boolean, reflect: true })
  masked = true;

  @property({ type: String })
  name = '';

  @query('.password-field__input')
  private _input!: HTMLInputElement;

  private _handleInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.value = input.value;

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleChange(): void {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleFocusIn(): void {
    this.classList.add('focus');
  }

  private _handleFocusOut(): void {
    this.classList.remove('focus');
  }

  private _toggleVisibility(): void {
    this.masked = !this.masked;
    // Refocus the input after toggling
    this.updateComplete.then(() => {
      this._input?.focus();
    });
  }

  private _renderEyeIcon() {
    return svg`
      <svg class="password-field__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    `;
  }

  private _renderEyeSlashIcon() {
    return svg`
      <svg class="password-field__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    `;
  }

  private _renderCheckCircle() {
    return svg`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  }

  private _renderExclamationCircle() {
    return svg`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    `;
  }

  override render() {
    return html`
      <div class="password-field" part="field">
        <input
          class="password-field__input"
          part="input"
          type=${this.masked ? 'password' : 'text'}
          .value=${this.value}
          placeholder=${this.placeholder}
          name=${this.name}
          ?disabled=${this.disabled}
          aria-invalid=${this.validation === 'invalid'}
          @input=${this._handleInput}
          @change=${this._handleChange}
          @focusin=${this._handleFocusIn}
          @focusout=${this._handleFocusOut}
        />

        ${this.validation === 'valid'
          ? html`<span class="password-field__icon password-field__icon--valid"
              >${this._renderCheckCircle()}</span
            >`
          : ''}
        ${this.validation === 'invalid'
          ? html`<span class="password-field__icon password-field__icon--invalid"
              >${this._renderExclamationCircle()}</span
            >`
          : ''}

        <button
          class="password-field__toggle"
          part="toggle"
          type="button"
          aria-label=${this.masked ? 'Show password' : 'Hide password'}
          @click=${this._toggleVisibility}
          ?disabled=${this.disabled}
        >
          ${this.masked ? this._renderEyeIcon() : this._renderEyeSlashIcon()}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-password-field': RRPasswordField;
  }
}
