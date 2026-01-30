/**
 * RegelRecht Checkbox Component (Lit + TypeScript)
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
 * @csspart box - The visual checkbox box
 *
 * @cssprop --rr-checkbox-background-color - Override background color
 * @cssprop --rr-checkbox-border-color - Override border color
 */

import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'xs' | 's' | 'm';

@customElement('rr-checkbox')
export class RRCheckbox extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
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

    .checkbox {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .box {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      /* Use outline for centered stroke (Figma: stroke inside/centered) */
      background-color: var(
        --rr-checkbox-background-color,
        var(--_bg-color, var(--components-checkbox-background-color))
      );
      outline: var(--components-checkbox-border-thickness) solid
        var(--rr-checkbox-border-color, var(--_border-color, var(--components-checkbox-border-color)));
      outline-offset: calc(var(--components-checkbox-border-thickness) * -1);

      transition:
        background-color 0.15s ease,
        outline-color 0.15s ease;
    }

    /* Checkmark icon */
    .icon {
      display: none;
      color: var(--components-checkbox-is-selected-icon-color);
    }

    /* Size: XS (24px) */
    :host([size='xs']) .box {
      width: var(--semantics-controls-xs-min-size);
      height: var(--semantics-controls-xs-min-size);
      border-radius: var(--semantics-controls-xs-corner-radius);
    }

    :host([size='xs']) .icon {
      width: 12px;
      height: 12px;
    }

    /* Size: S (32px) */
    :host([size='s']) .box {
      width: var(--semantics-controls-s-min-size);
      height: var(--semantics-controls-s-min-size);
      border-radius: var(--semantics-controls-s-corner-radius);
    }

    :host([size='s']) .icon {
      width: 16px;
      height: 16px;
    }

    /* Size: M (44px - default) */
    :host([size='m']) .box,
    :host(:not([size])) .box {
      width: var(--semantics-controls-m-min-size);
      height: var(--semantics-controls-m-min-size);
      border-radius: var(--semantics-controls-m-corner-radius);
    }

    :host([size='m']) .icon,
    :host(:not([size])) .icon {
      width: 22px;
      height: 22px;
    }

    /* Checked state */
    :host([checked]) .box {
      --_bg-color: var(--components-checkbox-is-selected-background-color);
      --_border-color: var(--components-checkbox-is-selected-background-color);
    }

    :host([checked]) .icon--check {
      display: block;
    }

    /* Indeterminate state - takes precedence over checked */
    :host([indeterminate]) .box {
      --_bg-color: var(--components-checkbox-is-selected-background-color);
      --_border-color: var(--components-checkbox-is-selected-background-color);
    }

    :host([indeterminate]) .icon--indeterminate {
      display: block;
    }

    :host([indeterminate]) .icon--check {
      display: none;
    }

    /* Hover state */
    :host(:hover:not([disabled])) .box {
      --_border-color: var(--primitives-color-accent-75);
    }

    :host([checked]:hover:not([disabled])) .box,
    :host([indeterminate]:hover:not([disabled])) .box {
      --_bg-color: var(--primitives-color-accent-75);
      --_border-color: var(--primitives-color-accent-75);
    }

    /* Focus state */
    :host(:focus-visible) {
      outline: none;
    }

    :host(:focus-visible) .box {
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
      .box {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .box {
        outline: 2px solid CanvasText !important;
      }

      :host([checked]) .box,
      :host([indeterminate]) .box {
        background-color: Highlight !important;
      }

      :host(:focus-visible) .box {
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

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property({ type: String, reflect: true })
  size: Size = 'm';

  @property({ type: String })
  value = 'on';

  @property({ type: String })
  name = '';

  override connectedCallback(): void {
    super.connectedCallback();

    // Set ARIA role
    this.setAttribute('role', 'checkbox');
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
    if (changedProperties.has('checked') || changedProperties.has('indeterminate')) {
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
    if (this.indeterminate) {
      this.setAttribute('aria-checked', 'mixed');
    } else {
      this.setAttribute('aria-checked', String(this.checked));
    }
  }

  private _handleClick = (event: Event): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.checked = !this.checked;

    if (this.indeterminate) {
      this.indeterminate = false;
    }

    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  };

  private _handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) {
      return;
    }

    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      this._handleClick(event);
    }
  };

  private _renderCheckIcon() {
    return svg`
      <svg class="icon icon--check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
  }

  private _renderIndeterminateIcon() {
    return svg`
      <svg class="icon icon--indeterminate" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="6" y1="12" x2="18" y2="12"></line>
      </svg>
    `;
  }

  override render() {
    return html`
      <div class="checkbox" part="checkbox">
        <div class="box" part="box">${this._renderCheckIcon()} ${this._renderIndeterminateIcon()}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-checkbox': RRCheckbox;
  }
}
