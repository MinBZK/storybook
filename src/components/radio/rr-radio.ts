/**
 * RegelRecht Radio Button Component (Lit + TypeScript)
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
 *
 * @cssprop --rr-radio-background-color - Override background color
 * @cssprop --rr-radio-border-color - Override border color
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'xs' | 's' | 'm';

@customElement('rr-radio')
export class RRRadio extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
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

    /* The visual radio button */
    .radio {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-sizing: border-box;

      /* Circular shape */
      border-radius: 50%;

      /* Use outline for centered stroke (Figma: stroke inside/centered) */
      background-color: var(
        --rr-radio-background-color,
        var(--_bg-color, var(--components-radio-button-background-color))
      );
      outline: var(--components-radio-button-border-thickness) solid
        var(--rr-radio-border-color, var(--_border-color, var(--components-radio-button-border-color)));
      outline-offset: calc(var(--components-radio-button-border-thickness) * -1);

      /* Transition */
      transition:
        background-color 0.15s ease,
        outline-color 0.15s ease;
    }

    /* Size: XS (24px) */
    :host([size='xs']) .radio {
      width: var(--semantics-controls-xs-min-size);
      height: var(--semantics-controls-xs-min-size);
    }

    :host([size='xs']) .radio__inner {
      /* Inner ring tuned to match Figma */
      width: 15px;
      height: 15px;
    }

    /* Size: S (32px) */
    :host([size='s']) .radio {
      width: var(--semantics-controls-s-min-size);
      height: var(--semantics-controls-s-min-size);
    }

    :host([size='s']) .radio__inner {
      /* Inner ring proportional */
      width: 20px;
      height: 20px;
    }

    /* Size: M (44px - default) */
    :host([size='m']) .radio,
    :host(:not([size])) .radio {
      width: var(--semantics-controls-m-min-size);
      height: var(--semantics-controls-m-min-size);
    }

    :host([size='m']) .radio__inner,
    :host(:not([size])) .radio__inner {
      /* Inner ring proportional */
      width: 28px;
      height: 28px;
    }

    /* Inner ring (only visible when checked) */
    .radio__inner {
      border-radius: 50%;
      background-color: transparent;
      border: 2px solid var(--components-radio-button-is-selected-inner-shape-border-color);
      opacity: 0;
      transform: scale(0);
      transition:
        opacity 0.15s ease,
        transform 0.15s ease;
    }

    /* Checked state */
    :host([checked]) .radio {
      --_bg-color: var(--components-radio-button-is-selected-background-color);
      --_border-color: var(--components-radio-button-is-selected-background-color);
    }

    :host([checked]) .radio__inner {
      opacity: 1;
      transform: scale(1);
    }

    /* Hover state (only when not disabled) */
    :host(:hover:not([disabled])) .radio {
      --_border-color: var(--primitives-color-accent-75);
    }

    :host([checked]:hover:not([disabled])) .radio {
      --_bg-color: var(--primitives-color-accent-75);
      --_border-color: var(--primitives-color-accent-75);
    }

    /* Focus state */
    :host(:focus-visible) {
      outline: none;
    }

    :host(:focus-visible) .radio {
      outline: var(--semantics-focus-ring-thickness) solid var(--semantics-focus-ring-color);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      pointer-events: none;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .radio,
      .radio__inner {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .radio {
        outline: 2px solid CanvasText !important;
      }

      :host([checked]) .radio {
        background-color: Highlight !important;
      }

      :host(:focus-visible) .radio {
        outline: 2px solid CanvasText !important;
        outline-offset: 2px !important;
      }

      :host([disabled]) {
        opacity: 0.5 !important;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  size: Size = 'm';

  @property({ type: String })
  name = '';

  @property({ type: String })
  value = '';

  override connectedCallback(): void {
    super.connectedCallback();

    // Set ARIA role
    this.setAttribute('role', 'radio');
    this._updateAriaState();

    // Make focusable
    if (!this.hasAttribute('tabindex') && !this.disabled) {
      this.setAttribute('tabindex', '0');
    }

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('checked')) {
      this._updateAriaState();
    }

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
      if (this.disabled) {
        this.removeAttribute('tabindex');
      } else {
        this.setAttribute('tabindex', '0');
      }
    }
  }

  private _updateAriaState(): void {
    this.setAttribute('aria-checked', String(this.checked));
  }

  private _handleClick = (event: Event): void => {
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
  };

  private _handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) {
      return;
    }

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
  };

  private _dispatchChangeEvent(): void {
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _uncheckOtherRadios(): void {
    if (!this.name) return;

    // Find all radio buttons in the same group
    const radios = document.querySelectorAll<RRRadio>(`rr-radio[name="${this.name}"]`);
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

  private _getRadioGroup(): RRRadio[] {
    if (!this.name) return [];
    return Array.from(document.querySelectorAll<RRRadio>(`rr-radio[name="${this.name}"]`)).filter(
      (radio) => !radio.disabled
    );
  }

  private _focusNextRadio(): void {
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

  private _focusPreviousRadio(): void {
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

  override render() {
    return html`
      <div class="radio" part="radio">
        <div class="radio__inner"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-radio': RRRadio;
  }
}
