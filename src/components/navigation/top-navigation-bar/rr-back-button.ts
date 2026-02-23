/**
 * RegelRecht Back Button Component (Lit + TypeScript)
 *
 * Navigation back button with arrow icon.
 * Used in top navigation bar for back navigation.
 *
 * @element rr-back-button
 * @attr {string} href - Link destination URL
 * @attr {string} label - Button text (default: 'Terug')
 * @attr {string} container - Size variant: 'sm' | 'md' | 'lg' (default: 'md')
 *
 * @fires back-click - When button is clicked (for SPA navigation)
 *
 * @csspart button - The button/link element
 * @csspart icon - The arrow icon
 * @csspart label - The text label
 */

import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type ContainerSize = 'sm' | 'md' | 'lg';

// Arrow left icon
const arrowLeftIcon = svg`
  <svg class="icon" part="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m12 19-7-7 7-7"/>
    <path d="M19 12H5"/>
  </svg>
`;

@customElement('rr-back-button')
export class RRBackButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
    }

    :host([hidden]) {
      display: none;
    }

    * {
      box-sizing: border-box;
    }

    .back-button {
      display: inline-flex;
      align-items: center;
      gap: var(--primitives-space-8);
      padding: var(--primitives-space-8) var(--primitives-space-16);
      background: none;
      border: none;
      color: var(--primitives-color-accent-100);
      font: var(--components-menu-bar-menu-item-font);
      text-decoration: none;
      cursor: pointer;
      border-radius: var(--semantics-controls-md-corner-radius);
      transition: background-color 0.15s ease;
      white-space: nowrap;
    }

    .back-button:hover {
      background-color: var(--primitives-color-neutral-100);
    }

    .back-button:focus-visible {
      box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
      outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
    }

    .icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    /* Size variants */
    :host([container='sm']) .back-button {
      padding: var(--primitives-space-8);
      font-size: 16px;
    }

    :host([container='sm']) .label {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    :host([container='lg']) .back-button {
      font-size: 20px;
    }

    :host([container='lg']) .icon {
      width: 24px;
      height: 24px;
    }
  `;

  @property({ type: String })
  href = '';

  @property({ type: String })
  label = 'Terug';

  @property({ type: String, reflect: true })
  container: ContainerSize = 'md';

  private _handleClick(e: Event): void {
    // If no href, dispatch event for SPA navigation
    if (!this.href) {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('back-click', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  override render() {
    if (this.href) {
      return html`
        <a
          class="back-button"
          part="button"
          href="${this.href}"
          aria-label="${this.label}"
          @click="${this._handleClick}"
        >
          ${arrowLeftIcon}
          <span class="label" part="label">${this.label}</span>
        </a>
      `;
    }

    return html`
      <button
        class="back-button"
        part="button"
        aria-label="${this.label}"
        @click="${this._handleClick}"
      >
        ${arrowLeftIcon}
        <span class="label" part="label">${this.label}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-back-button': RRBackButton;
  }
}
