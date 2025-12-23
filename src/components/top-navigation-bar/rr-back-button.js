/**
 * RegelRecht Back Button Component
 *
 * Navigation back button with arrow icon.
 * Used in top navigation bar for back navigation.
 *
 * @element rr-back-button
 * @attr {string} href - Link destination URL
 * @attr {string} label - Button text (default: 'Terug')
 * @attr {string} container - Size variant: 's' | 'm' | 'l' (default: 'm')
 *
 * @fires back-click - When button is clicked (for SPA navigation)
 *
 * @csspart button - The button/link element
 * @csspart icon - The arrow icon
 * @csspart label - The text label
 */

import { RRBaseComponent } from '../base/base-component.js';

export class RRBackButton extends RRBaseComponent {
  static componentName = 'rr-back-button';

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'href',
      'label',
      'container'
    ];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupEventListeners();
  }

  _setupEventListeners() {
    this.shadowRoot.addEventListener('click', (e) => {
      // If no href, dispatch event for SPA navigation
      if (!this.href) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('back-click', {
          bubbles: true,
          composed: true
        }));
      }
    });
  }

  // Getters for attributes
  get href() {
    return this.getAttribute('href') || '';
  }

  set href(value) {
    this.setAttribute('href', value);
  }

  get label() {
    return this.getAttribute('label') || 'Terug';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get container() {
    return this.getAttribute('container') || 'm';
  }

  set container(value) {
    this.setAttribute('container', value);
  }

  _getStyles() {
    return `
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
        gap: var(--primitives-space-8, 8px);
        padding: var(--primitives-space-8, 8px) var(--primitives-space-16, 16px);
        background: none;
        border: none;
        color: var(--primitives-color-accent-100, #154273);
        font: var(--components-menu-bar-menu-item-font, 600 18px/1.125 RijksSansVF, system-ui);
        text-decoration: none;
        cursor: pointer;
        border-radius: var(--semantics-controls-m-corner-radius, 7px);
        transition: background-color 0.15s ease;
        white-space: nowrap;
      }

      .back-button:hover {
        background-color: var(--primitives-color-neutral-100, #f1f5f9);
      }

      .back-button:focus-visible {
        outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
        outline-offset: 2px;
      }

      .icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      /* Size variants */
      :host([container="s"]) .back-button {
        padding: var(--primitives-space-8, 8px);
        font-size: 16px;
      }

      :host([container="s"]) .label {
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

      :host([container="l"]) .back-button {
        font-size: 20px;
      }

      :host([container="l"]) .icon {
        width: 24px;
        height: 24px;
      }
    `;
  }

  render() {
    // Arrow left icon
    const arrowIcon = `<svg class="icon" part="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`;

    const tag = this.href ? 'a' : 'button';
    const hrefAttr = this.href ? `href="${this.href}"` : '';

    this.shadowRoot.innerHTML = `
      <style>${this._getStyles()}</style>
      <${tag} class="back-button" part="button" ${hrefAttr} aria-label="${this.label}">
        ${arrowIcon}
        <span class="label" part="label">${this.label}</span>
      </${tag}>
    `;

    // Re-attach event listeners after render
    this._setupEventListeners();
  }
}

customElements.define('rr-back-button', RRBackButton);
