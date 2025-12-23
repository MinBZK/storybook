/**
 * RegelRecht Utility Menu Bar Component
 *
 * Utility buttons row for top navigation (Language, Search, Help, Settings, Account).
 * Used as a sub-component of rr-top-navigation-bar.
 *
 * ## Usage
 * ```html
 * <!-- Default: Language, Search, Account visible -->
 * <rr-utility-menu-bar></rr-utility-menu-bar>
 *
 * <!-- Hide default buttons -->
 * <rr-utility-menu-bar no-language-switch no-account></rr-utility-menu-bar>
 *
 * <!-- Show optional buttons -->
 * <rr-utility-menu-bar has-help has-settings></rr-utility-menu-bar>
 * ```
 *
 * @element rr-utility-menu-bar
 * @attr {string} container - Size variant: 's' | 'm' | 'l' (default: 'm')
 * @attr {boolean} no-language-switch - Hide language dropdown
 * @attr {boolean} no-search - Hide search button
 * @attr {boolean} no-account - Hide account button
 * @attr {boolean} has-help - Show help button
 * @attr {boolean} has-settings - Show settings button
 * @attr {string} language - Current language code (default: 'NL')
 * @attr {string} account-label - Account button label (default: 'Mijn')
 *
 * @fires language-click - When language button is clicked
 * @fires search-click - When search button is clicked
 * @fires help-click - When help button is clicked
 * @fires settings-click - When settings button is clicked
 * @fires account-click - When account button is clicked
 *
 * @csspart container - The main container
 * @csspart button - Individual utility buttons
 */

import { RRBaseComponent } from '../base/base-component.js';

export class RRUtilityMenuBar extends RRBaseComponent {
  static componentName = 'rr-utility-menu-bar';

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'container',
      // Hide default buttons
      'no-language-switch',
      'no-search',
      'no-account',
      // Show optional buttons
      'has-help',
      'has-settings',
      // Configuration
      'language',
      'account-label'
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
      const button = e.target.closest('button');
      if (!button) return;

      const action = button.dataset.action;
      if (action) {
        this.dispatchEvent(new CustomEvent(`${action}-click`, {
          bubbles: true,
          composed: true
        }));
      }
    });
  }

  // Getters for attributes
  get container() {
    return this.getAttribute('container') || 'm';
  }

  set container(value) {
    this.setAttribute('container', value);
  }

  // Default buttons: shown unless no-* attribute is present
  get hasLanguageSwitch() {
    return !this.hasAttribute('no-language-switch');
  }

  get hasSearch() {
    return !this.hasAttribute('no-search');
  }

  get hasAccount() {
    return !this.hasAttribute('no-account');
  }

  // Optional buttons: hidden unless has-* attribute is present
  get hasHelp() {
    return this.hasAttribute('has-help');
  }

  get hasSettings() {
    return this.hasAttribute('has-settings');
  }

  get language() {
    return this.getAttribute('language') || 'NL';
  }

  set language(value) {
    this.setAttribute('language', value);
  }

  get accountLabel() {
    return this.getAttribute('account-label') || 'Mijn';
  }

  set accountLabel(value) {
    this.setAttribute('account-label', value);
  }

  _getStyles() {
    return `
      :host {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-8, 8px);
      }

      :host([hidden]) {
        display: none;
      }

      * {
        box-sizing: border-box;
      }

      .container {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-8, 8px);
      }

      /* Utility buttons */
      .utility-button {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-8, 8px);
        padding: var(--primitives-space-8, 8px) var(--primitives-space-16, 16px);
        background: none;
        border: none;
        color: var(--primitives-color-accent-100, #154273);
        font: var(--components-menu-bar-menu-item-font, 600 18px/1.125 RijksSansVF, system-ui);
        cursor: pointer;
        border-radius: var(--semantics-controls-m-corner-radius, 7px);
        transition: background-color 0.15s ease;
        white-space: nowrap;
      }

      .utility-button:hover {
        background-color: var(--primitives-color-neutral-100, #f1f5f9);
      }

      .utility-button:focus-visible {
        outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
        outline-offset: 2px;
      }

      .utility-button svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      .utility-button .chevron {
        width: 16px;
        height: 16px;
      }

      /* Hide text on small screens */
      :host([container="s"]) .utility-button span {
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

      :host([container="s"]) .utility-button .chevron {
        display: none;
      }

      /* Size adjustments */
      :host([container="s"]) .utility-button {
        padding: var(--primitives-space-8, 8px);
      }
    `;
  }

  render() {
    // SVG icons
    const searchIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`;
    const userIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    const helpIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`;
    const settingsIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
    const chevronIcon = `<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;

    this.shadowRoot.innerHTML = `
      <style>${this._getStyles()}</style>
      <div class="container" part="container">
        ${this.hasLanguageSwitch ? `
          <button class="utility-button" part="button" data-action="language" aria-label="Taal" aria-haspopup="true">
            <span>${this.language}</span>
            ${chevronIcon}
          </button>
        ` : ''}

        ${this.hasSearch ? `
          <button class="utility-button" part="button" data-action="search" aria-label="Zoeken">
            ${searchIcon}
            <span>Zoeken</span>
          </button>
        ` : ''}

        ${this.hasHelp ? `
          <button class="utility-button" part="button" data-action="help" aria-label="Hulp">
            ${helpIcon}
            <span>Hulp</span>
          </button>
        ` : ''}

        ${this.hasSettings ? `
          <button class="utility-button" part="button" data-action="settings" aria-label="Instellingen">
            ${settingsIcon}
            <span>Instellingen</span>
          </button>
        ` : ''}

        ${this.hasAccount ? `
          <button class="utility-button" part="button" data-action="account" aria-label="Account" aria-haspopup="true">
            ${userIcon}
            <span>${this.accountLabel}</span>
            ${chevronIcon}
          </button>
        ` : ''}
      </div>
    `;

    // Re-attach event listeners after render
    this._setupEventListeners();
  }
}

customElements.define('rr-utility-menu-bar', RRUtilityMenuBar);
