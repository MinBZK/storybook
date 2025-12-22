/**
 * RegelRecht Top Navigation Bar Component
 *
 * Full navigation header following Figma top-navigation-bar design.
 * White background with centered Rijksoverheid logo and navigation buttons.
 *
 * @element rr-top-navigation-bar
 * @attr {string} container - Size variant: 's' | 'm' | 'l' (default: 'm')
 * @attr {boolean} has-logo - Show logo section (default: true)
 * @attr {boolean} has-menu-bar - Show global menu bar (default: true)
 * @attr {boolean} has-title - Show title section (default: false)
 * @attr {boolean} has-back-button - Show back button (default: false)
 * @attr {boolean} has-global-menu - Show global menu items (default: true)
 * @attr {boolean} has-utility-menu-bar - Show utility buttons (default: true)
 * @attr {string} title - Title text below logo (default: 'Titel')
 *
 * @csspart container - The main container
 * @csspart logo-bar - The logo section with coat of arms
 * @csspart nav-bar - The navigation bar section
 * @csspart menu-bar - The optional menu bar section
 */

import { RRBaseComponent } from '../base/base-component.js';

// Rijksoverheid coat of arms SVG (simplified representation)
const rijksoverheidLogo = `<svg viewBox="0 0 80 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <!-- Shield shape -->
  <path d="M4 4h72v60c0 20-36 32-36 32S4 84 4 64V4z" fill="#154273" stroke="#154273" stroke-width="2"/>
  <!-- Crown at top -->
  <path d="M20 8h40v8H20z" fill="#c8102e"/>
  <circle cx="25" cy="6" r="3" fill="#ffd700"/>
  <circle cx="40" cy="4" r="4" fill="#ffd700"/>
  <circle cx="55" cy="6" r="3" fill="#ffd700"/>
  <!-- Lion left -->
  <g transform="translate(12, 24) scale(0.4)">
    <path d="M30 10c5 0 10 5 10 10v30c0 5-2 8-5 10l-5-5v-10l-10 10-10-10v10l-5 5c-3-2-5-5-5-10V20c0-5 5-10 10-10h20z" fill="#ffd700"/>
    <circle cx="18" cy="25" r="2" fill="#154273"/>
    <circle cx="32" cy="25" r="2" fill="#154273"/>
    <path d="M20 35h10v5H20z" fill="#c8102e"/>
  </g>
  <!-- Lion right -->
  <g transform="translate(44, 24) scale(0.4)">
    <path d="M30 10c5 0 10 5 10 10v30c0 5-2 8-5 10l-5-5v-10l-10 10-10-10v10l-5 5c-3-2-5-5-5-10V20c0-5 5-10 10-10h20z" fill="#ffd700"/>
    <circle cx="18" cy="25" r="2" fill="#154273"/>
    <circle cx="32" cy="25" r="2" fill="#154273"/>
    <path d="M20 35h10v5H20z" fill="#c8102e"/>
  </g>
</svg>`;

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
      'title'
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
    return this.getAttribute('has-title') !== 'false';
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
    return this.getAttribute('title') || 'Titel';
  }

  _getStyles() {
    return `
      :host {
        display: block;
        font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
        width: 100%;
      }

      :host([hidden]) {
        display: none;
      }

      * {
        box-sizing: border-box;
      }

      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #ffffff;
        border-bottom: var(--semantics-divider-thickness, 2px) solid var(--semantics-divider-color, #e2e8f0);
      }

      /* Logo bar - white background with centered logo */
      .logo-bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: var(--primitives-space-16, 16px);
        padding-bottom: var(--primitives-space-8, 8px);
        background-color: #ffffff;
      }

      .logo {
        width: 60px;
        height: 75px;
        color: var(--primitives-color-accent-100, #154273);
      }

      .logo svg {
        width: 100%;
        height: 100%;
      }

      .title-text {
        font: var(--components-menu-bar-title-item-m-font, 600 20px/1.125 RijksSansVF, system-ui);
        color: var(--primitives-color-neutral-900, #0f172a);
        margin: var(--primitives-space-8, 8px) 0 0 0;
        text-align: center;
      }

      /* Navigation bar with menu/search/account */
      .nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 44px;
        background-color: #ffffff;
        border-top: 1px solid var(--semantics-divider-color, #e2e8f0);
      }

      /* Size variants - responsive padding */
      :host([container="s"]) .nav-bar,
      :host([container="s"]) .menu-bar {
        padding-left: var(--semantics-sections-s-margin-inline, 20px);
        padding-right: var(--semantics-sections-s-margin-inline, 20px);
      }

      :host([container="m"]) .nav-bar,
      :host([container="m"]) .menu-bar,
      :host(:not([container])) .nav-bar,
      :host(:not([container])) .menu-bar {
        padding-left: var(--semantics-sections-m-margin-inline, 32px);
        padding-right: var(--semantics-sections-m-margin-inline, 32px);
      }

      :host([container="l"]) .nav-bar,
      :host([container="l"]) .menu-bar {
        padding-left: var(--semantics-sections-l-margin-inline, 48px);
        padding-right: var(--semantics-sections-l-margin-inline, 48px);
      }

      .nav-left {
        display: flex;
        align-items: center;
      }

      .nav-right {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-8, 8px);
      }

      /* Navigation buttons */
      .nav-button {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-8, 8px);
        padding: var(--primitives-space-8, 8px) var(--primitives-space-12, 12px);
        background: none;
        border: none;
        color: var(--primitives-color-accent-100, #154273);
        font: var(--components-menu-bar-menu-item-font, 600 18px/1.125 RijksSansVF, system-ui);
        cursor: pointer;
        border-radius: var(--semantics-controls-m-corner-radius, 7px);
        transition: background-color 0.15s ease;
      }

      .nav-button:hover {
        background-color: var(--primitives-color-neutral-100, #f1f5f9);
      }

      .nav-button svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      .nav-button .chevron {
        width: 16px;
        height: 16px;
      }

      /* Menu bar (optional global menu items) */
      .menu-bar {
        display: flex;
        align-items: center;
        background-color: #ffffff;
        min-height: 44px;
        border-top: 1px solid var(--semantics-divider-color, #e2e8f0);
        gap: var(--primitives-space-4, 4px);
      }

      /* Focus states */
      .nav-button:focus-visible {
        outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
        outline-offset: 2px;
      }

      /* Hide sections based on attributes */
      :host([has-logo="false"]) .logo-bar {
        display: none;
      }

      :host([has-title="false"]) .title-text {
        display: none;
      }

      :host([has-menu-bar="false"]) .menu-bar {
        display: none;
      }

      :host([has-global-menu="false"]) .nav-left {
        display: none;
      }

      :host([has-utility-menu-bar="false"]) .nav-right {
        display: none;
      }
    `;
  }

  render() {
    // SVG icons matching Figma
    const hamburgerIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    const searchIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`;
    const userIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    const chevronIcon = `<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;

    this.shadowRoot.innerHTML = `
      <div class="container" part="container">
        <!-- Logo bar with centered Rijksoverheid coat of arms -->
        <div class="logo-bar" part="logo-bar">
          <div class="logo" part="logo">
            ${rijksoverheidLogo}
          </div>
          <h1 class="title-text">${this.titleText}</h1>
        </div>

        <!-- Navigation bar: Menu | Zoeken | Account -->
        <nav class="nav-bar" part="nav-bar">
          <div class="nav-left">
            <button class="nav-button" aria-label="Menu" aria-haspopup="true">
              ${hamburgerIcon}
              <span>Menu</span>
            </button>
          </div>

          <div class="nav-right">
            <button class="nav-button" aria-label="Zoeken">
              ${searchIcon}
              <span>Zoeken</span>
            </button>
            <button class="nav-button" aria-label="Account" aria-haspopup="true">
              ${userIcon}
              <span>Account</span>
              ${chevronIcon}
            </button>
          </div>
        </nav>

        <!-- Optional menu bar for global navigation items -->
        <div class="menu-bar" part="menu-bar">
          <slot name="menu-bar"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('rr-top-navigation-bar', RRTopNavigationBar);
