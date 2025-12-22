/**
 * RegelRecht Top Navigation Bar Component
 *
 * Full navigation header following Figma top-navigation-bar design.
 * Includes logo, global menu, utility menu, and optional title/back button.
 *
 * @element rr-top-navigation-bar
 * @attr {string} container - Size variant: 's' | 'm' | 'l' (default: 'm')
 * @attr {boolean} has-logo - Show logo section (default: true)
 * @attr {boolean} has-menu-bar - Show global menu bar (default: true)
 * @attr {boolean} has-title - Show title section (default: false)
 * @attr {boolean} has-back-button - Show back button (default: false)
 * @attr {boolean} has-global-menu - Show global menu in ribbon (default: true)
 * @attr {boolean} has-utility-menu-bar - Show utility icons (default: true)
 * @attr {string} title - Title text for title bar
 * @attr {string} logo-text - Text for logo (default: 'DigiD')
 *
 * @slot global-menu - Slot for global menu items (rr-menu-item components)
 * @slot utility-menu - Slot for utility menu items
 * @slot title - Slot for custom title content
 *
 * @csspart container - The main container
 * @csspart ribbon - The blue header ribbon
 * @csspart logo - The logo section
 * @csspart global-menu - The global menu section
 * @csspart utility-menu - The utility menu section
 * @csspart title-bar - The title bar section
 */

import { RRBaseComponent } from '../base/base-component.js';

export class RRTopNavigationBar extends RRBaseComponent {
  static componentName = 'rr-top-navigation-bar';

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'container',
      'has-logo',
      'has-menu-bar',
      'has-title',
      'has-back-button',
      'has-global-menu',
      'has-utility-menu-bar',
      'title',
      'logo-text'
    ];
  }

  constructor() {
    super();
  }

  // Getters for attributes
  get container() {
    return this.getAttribute('container') || 'm';
  }

  set container(value) {
    this.setAttribute('container', value);
  }

  get hasLogo() {
    return this.getAttribute('has-logo') !== 'false';
  }

  get hasMenuBar() {
    return this.getAttribute('has-menu-bar') !== 'false';
  }

  get hasTitle() {
    return this.getBooleanAttribute('has-title');
  }

  get hasBackButton() {
    return this.getBooleanAttribute('has-back-button');
  }

  get hasGlobalMenu() {
    return this.getAttribute('has-global-menu') !== 'false';
  }

  get hasUtilityMenuBar() {
    return this.getAttribute('has-utility-menu-bar') !== 'false';
  }

  get titleText() {
    return this.getAttribute('title') || '';
  }

  get logoText() {
    return this.getAttribute('logo-text') || 'DigiD';
  }

  _getStyles() {
    return `
      :host {
        display: block;
        font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
        width: 100%;
      }

      :host([hidden]) {
        display: none;
      }

      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        border-bottom: var(--semantics-divider-thickness, 2px) solid var(--semantics-divider-color, #e2e8f0);
      }

      /* Size variants - responsive padding */
      :host([container="s"]) .ribbon {
        padding-left: var(--semantics-sections-s-margin-inline, 20px);
        padding-right: var(--semantics-sections-s-margin-inline, 20px);
      }

      :host([container="m"]) .ribbon,
      :host(:not([container])) .ribbon {
        padding-left: var(--semantics-sections-m-margin-inline, 32px);
        padding-right: var(--semantics-sections-m-margin-inline, 32px);
      }

      :host([container="l"]) .ribbon {
        padding-left: var(--semantics-sections-l-margin-inline, 48px);
        padding-right: var(--semantics-sections-l-margin-inline, 48px);
      }

      /* Blue ribbon header - 88px height per Figma */
      .ribbon {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--primitives-color-accent-100, #154273);
        color: #ffffff;
        min-height: 88px;
        padding-top: 0;
        padding-bottom: 0;
      }

      /* Left section: Logo */
      .ribbon-left {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-8, 8px);
        flex-shrink: 0;
      }

      /* Logo */
      .logo {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-8, 8px);
      }

      .logo-icon {
        width: 40px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .logo-icon svg {
        width: 24px;
        height: 24px;
        color: #ffffff;
      }

      .logo-text {
        font-weight: 700;
        font-size: 20px;
        color: #ffffff;
        letter-spacing: -0.01em;
      }

      /* Center section: Global menu items IN the ribbon */
      .ribbon-center {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-4, 4px);
        flex: 1;
        justify-content: flex-start;
        margin-left: var(--primitives-space-32, 32px);
      }

      /* Menu items in ribbon - white text on blue */
      ::slotted([slot="ribbon-menu"]) {
        color: #ffffff !important;
        background: transparent !important;
      }

      /* Right section: Utility icons */
      .ribbon-right {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-4, 4px);
        flex-shrink: 0;
      }

      .utility-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        background: none;
        border: none;
        color: #ffffff;
        cursor: pointer;
        border-radius: var(--semantics-controls-m-corner-radius, 7px);
        transition: background-color 0.15s ease;
      }

      .utility-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .utility-button svg {
        width: 24px;
        height: 24px;
      }

      /* Menu bar below ribbon - 44px height per Figma */
      .menu-bar {
        display: flex;
        align-items: center;
        background-color: #ffffff;
        min-height: 44px;
        border-bottom: var(--semantics-divider-thickness, 2px) solid var(--semantics-divider-color, #e2e8f0);
      }

      :host([container="s"]) .menu-bar {
        padding-left: var(--semantics-sections-s-margin-inline, 20px);
        padding-right: var(--semantics-sections-s-margin-inline, 20px);
      }

      :host([container="m"]) .menu-bar,
      :host(:not([container])) .menu-bar {
        padding-left: var(--semantics-sections-m-margin-inline, 32px);
        padding-right: var(--semantics-sections-m-margin-inline, 32px);
      }

      :host([container="l"]) .menu-bar {
        padding-left: var(--semantics-sections-l-margin-inline, 48px);
        padding-right: var(--semantics-sections-l-margin-inline, 48px);
      }

      /* Title bar */
      .title-bar {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-16, 16px);
        padding: var(--primitives-space-16, 16px);
        background-color: #ffffff;
      }

      :host([container="s"]) .title-bar {
        padding-left: var(--semantics-sections-s-margin-inline, 20px);
        padding-right: var(--semantics-sections-s-margin-inline, 20px);
      }

      :host([container="m"]) .title-bar,
      :host(:not([container])) .title-bar {
        padding-left: var(--semantics-sections-m-margin-inline, 32px);
        padding-right: var(--semantics-sections-m-margin-inline, 32px);
      }

      :host([container="l"]) .title-bar {
        padding-left: var(--semantics-sections-l-margin-inline, 48px);
        padding-right: var(--semantics-sections-l-margin-inline, 48px);
      }

      .back-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        background: none;
        border: none;
        color: var(--primitives-color-accent-100, #154273);
        cursor: pointer;
        border-radius: var(--semantics-controls-m-corner-radius, 7px);
        transition: background-color 0.15s ease;
      }

      .back-button:hover {
        background-color: var(--primitives-color-accent-15, #dce3ea);
      }

      .back-button svg {
        width: 24px;
        height: 24px;
      }

      .title-text {
        font: var(--components-menu-bar-title-item-m-font, 600 20px/1.125 RijksSansVF, system-ui);
        color: var(--primitives-color-neutral-900, #0f172a);
        margin: 0;
      }

      /* Focus states */
      .utility-button:focus-visible,
      .back-button:focus-visible {
        outline: 2px solid var(--semantics-focus-ring-color, #0f172a);
        outline-offset: 2px;
      }

      /* Hide sections based on attributes */
      :host([has-logo="false"]) .logo {
        display: none;
      }

      :host([has-menu-bar="false"]) .menu-bar {
        display: none;
      }

      :host(:not([has-title])) .title-bar {
        display: none;
      }

      :host(:not([has-back-button])) .back-button {
        display: none;
      }

      :host([has-global-menu="false"]) .ribbon-center {
        display: none;
      }

      :host([has-utility-menu-bar="false"]) .ribbon-right {
        display: none;
      }
    `;
  }

  render() {
    // SVG icons
    const searchIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`;
    const settingsIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    const userIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    const backIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;
    const logoIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>`;

    this.shadowRoot.innerHTML = `
      <div class="container" part="container">
        <!-- Blue Ribbon Header (88px) -->
        <div class="ribbon" part="ribbon">
          <!-- Left: Logo -->
          <div class="ribbon-left">
            <div class="logo" part="logo">
              <div class="logo-icon">${logoIcon}</div>
              <span class="logo-text">${this.logoText}</span>
            </div>
          </div>

          <!-- Center: Global Menu Items IN the ribbon -->
          <div class="ribbon-center" part="ribbon-menu">
            <slot name="ribbon-menu"></slot>
          </div>

          <!-- Right: Utility Icons -->
          <div class="ribbon-right" part="utility-menu">
            <slot name="utility-menu">
              <button class="utility-button" aria-label="Zoeken" title="Zoeken">
                ${searchIcon}
              </button>
              <button class="utility-button" aria-label="Instellingen" title="Instellingen">
                ${settingsIcon}
              </button>
              <button class="utility-button" aria-label="Account" title="Account">
                ${userIcon}
              </button>
            </slot>
          </div>
        </div>

        <!-- Menu Bar below ribbon (44px) - optional secondary menu -->
        <nav class="menu-bar" part="menu-bar">
          <slot name="menu-bar"></slot>
        </nav>

        <!-- Title Bar (optional) -->
        <div class="title-bar" part="title-bar">
          <button class="back-button" aria-label="Terug">
            ${backIcon}
          </button>
          <h1 class="title-text">
            <slot name="title">${this.titleText}</slot>
          </h1>
        </div>
      </div>
    `;
  }
}

customElements.define('rr-top-navigation-bar', RRTopNavigationBar);
