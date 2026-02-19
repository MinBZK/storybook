/**
 * RegelRecht Icon Button Component (Lit + TypeScript)
 *
 * @element rr-icon-button
 * @attr {string} variant - Button variant: 'accent-filled' | 'accent-outlined' | 'neutral-tinted' | 'accent-transparent'
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset'
 * @attr {string} label - Accessible label for the icon button (required for accessibility)
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

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'xs' | 'sm' | 'md' | 'lg';
type Variant = 'accent-filled' | 'accent-outlined' | 'neutral-tinted' | 'accent-transparent' | 'neutral-transparent' | 'danger-tinted';
type ButtonType = 'button' | 'submit' | 'reset';

@customElement('rr-icon-button')
export class RRIconButton extends LitElement {
  static override styles = css`
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
      transition:
        background-color 0.15s ease,
        color 0.15s ease,
        border-color 0.15s ease,
        transform 0.1s ease;

      /* Allow custom overrides */
      background-color: var(--rr-icon-button-background-color, var(--_bg-color));
      color: var(--rr-icon-button-color, var(--_text-color));
      border: var(--_border-width, 0) solid var(--rr-icon-button-border-color, var(--_border-color, transparent));
    }

    .button:active:not(:disabled) {
      transform: scale(0.98);
    }

    /* Size: XS - Square 24x24, Figma: 4px border-radius */
    :host([size='xs']) .button {
      width: var(--semantics-controls-xs-min-size);
      height: var(--semantics-controls-xs-min-size);
      min-width: var(--semantics-controls-xs-min-size);
      min-height: var(--semantics-controls-xs-min-size);
      border-radius: var(--semantics-controls-xs-corner-radius);
    }

    /* Size: SM - Square 32x32, Figma: 6px border-radius */
    :host([size='sm']) .button {
      width: var(--semantics-controls-sm-min-size);
      height: var(--semantics-controls-sm-min-size);
      min-width: var(--semantics-controls-sm-min-size);
      min-height: var(--semantics-controls-sm-min-size);
      border-radius: var(--semantics-controls-sm-corner-radius);
    }

    /* Size: MD - Square 44x44 (default), Figma: 8px border-radius */
    :host([size='md']) .button,
    :host(:not([size])) .button {
      width: var(--semantics-controls-md-min-size);
      height: var(--semantics-controls-md-min-size);
      min-width: var(--semantics-controls-md-min-size);
      min-height: var(--semantics-controls-md-min-size);
      border-radius: var(--semantics-controls-md-corner-radius);
    }

    /* Size: LG - Larger icon button, Figma: 9px border-radius */
    :host([size='lg']) .button {
      width: var(--semantics-controls-lg-min-size);
      height: auto;
      min-width: var(--semantics-controls-lg-min-size);
      min-height: var(--semantics-controls-lg-min-size);
      border-radius: var(--semantics-controls-lg-corner-radius);
      flex-direction: column;
      gap: 1px;
      padding: 8px 10px;
    }

    /* LG with title - wider button to fit text on one line */
    :host([size='lg'][has-title]) .button {
      width: auto;
      padding: 8px 8px;
    }

    .button__title {
      display: none;
      font: var(--semantics-buttons-xs-font);
      font-size: 12px;
      font-weight: 550;
      line-height: 1.125;
      text-align: center;
      color: inherit;
      white-space: nowrap;
    }

    :host([size='lg'][has-title]) .button__title {
      display: block;
    }

    /* Variant: accent-filled (default) */
    :host([variant='accent-filled']) .button,
    :host(:not([variant])) .button {
      --_bg-color: var(--semantics-buttons-accent-filled-background-color);
      --_text-color: var(--semantics-buttons-accent-filled-content-color);
    }

    :host([variant='accent-filled']) .button:hover:not(:disabled),
    :host(:not([variant])) .button:hover:not(:disabled) {
      --_bg-color: var(--primitives-color-accent-75);
    }

    /* Variant: accent-outlined */
    :host([variant='accent-outlined']) .button {
      --_bg-color: transparent;
      --_text-color: var(--semantics-buttons-accent-outlined-content-color);
      --_border-color: var(--semantics-buttons-accent-outlined-border-color);
      --_border-width: var(--semantics-buttons-accent-outlined-border-thickness);
    }

    :host([variant='accent-outlined']) .button:hover:not(:disabled) {
      --_bg-color: var(--primitives-color-accent-150);
    }

    /* Variant: neutral-tinted */
    :host([variant='neutral-tinted']) .button {
      --_bg-color: var(--semantics-buttons-neutral-tinted-background-color);
      --_text-color: var(--semantics-buttons-neutral-tinted-content-color);
    }

    :host([variant='neutral-tinted']) .button:hover:not(:disabled) {
      --_bg-color: var(--primitives-color-neutral-300);
    }

    /* Variant: accent-transparent */
    :host([variant='accent-transparent']) .button {
      --_bg-color: transparent;
      --_text-color: var(--semantics-buttons-accent-transparent-content-color);
    }

    :host([variant='accent-transparent']) .button:hover:not(:disabled) {
      --_bg-color: var(--primitives-color-accent-150);
    }

    /* Variant: neutral-transparent */
    :host([variant='neutral-transparent']) .button {
      --_bg-color: transparent;
      --_text-color: var(--primitives-color-neutral-900);
    }

    :host([variant='neutral-transparent']) .button:hover:not(:disabled) {
      --_bg-color: var(--primitives-color-neutral-200);
    }

    /* Variant: danger-tinted (destructive) */
    :host([variant='danger-tinted']) .button {
      --_bg-color: var(--semantics-buttons-danger-tinted-background-color);
      --_text-color: var(--semantics-buttons-danger-tinted-content-color);
    }

    :host([variant='danger-tinted']) .button:hover:not(:disabled) {
      --_bg-color: var(--primitives-color-danger-300);
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

    /* XS: 24px button -> 12px icon (~50%) */
    :host([size='xs']) {
      --_icon-size: 12px;
    }

    /* SM: 32px button -> 16px icon (~50%) */
    :host([size='sm']) {
      --_icon-size: 16px;
    }

    /* MD: 44px button -> 24px icon (matches Figma) */
    :host([size='md']),
    :host(:not([size])) {
      --_icon-size: 24px;
    }

    /* LG: larger button -> 24px icon (per Figma specs) */
    :host([size='lg']) {
      --_icon-size: 24px;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .button {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .button {
        border: 2px solid CanvasText !important;
      }

      :host([disabled]) .button {
        opacity: 0.5 !important;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: Variant = 'accent-filled';

  @property({ type: String, reflect: true })
  size: Size = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  type: ButtonType = 'button';

  @property({ type: String })
  label = '';

  @property({ type: Boolean, reflect: true, attribute: 'has-title' })
  hasTitle = false;

  @property({ type: String })
  title = 'Icon Button';

  private _handleClick = (event: Event): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._handleClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  override render() {
    return html`
      <button
        class="button"
        part="button"
        type=${this.type}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled}
        aria-label=${this.label}
      >
        <slot></slot>
        <span class="button__title" part="title">${this.title}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-icon-button': RRIconButton;
  }
}
