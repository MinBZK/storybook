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

// Official Rijkswapen (coat of arms) - loaded from /assets/rijkswapen.svg
// This is fetched once and cached for all instances
let cachedRijkswapen = null;

export class RRTopNavigationBar extends RRBaseComponent {
  static componentName = 'rr-top-navigation-bar';

  // Configurable asset path (can be overridden per-project)
  static assetBasePath = '/assets';

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

  connectedCallback() {
    super.connectedCallback();
    // Load official Rijkswapen asynchronously
    this._loadRijkswapen();
  }

  /**
   * Loads the official Rijkswapen SVG and injects it into the component.
   */
  async _loadRijkswapen() {
    // Use cached version if available
    if (cachedRijkswapen) {
      this._injectLogo(cachedRijkswapen);
      return;
    }

    try {
      const url = `${RRTopNavigationBar.assetBasePath}/rijkswapen.svg`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to load logo: ${response.status}`);
      }

      const svgText = await response.text();
      cachedRijkswapen = svgText;
      this._injectLogo(svgText);
    } catch (error) {
      console.error('Failed to load Rijkswapen:', error.message);
    }
  }

  /**
   * Injects the loaded SVG into the logo container
   */
  _injectLogo(svgContent) {
    const logoContainer = this.shadowRoot?.querySelector('.logo');
    if (logoContainer) {
      logoContainer.innerHTML = svgContent;
    }
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
        margin: 0 auto;
        background-color: #ffffff;
        border-bottom: var(--semantics-divider-thickness, 2px) solid var(--semantics-divider-color, #e2e8f0);
      }

      /* Container size constraints per Figma breakpoints */
      :host([container="s"]) .container {
        min-width: var(--primitives-breakpoint-s-min, 320px);
        max-width: var(--primitives-breakpoint-s-max, 640px);
      }

      :host([container="m"]) .container,
      :host(:not([container])) .container {
        min-width: var(--primitives-breakpoint-m-min, 641px);
        max-width: var(--primitives-breakpoint-m-max, 1007px);
      }

      :host([container="l"]) .container {
        min-width: var(--primitives-breakpoint-l-min, 1008px);
        max-width: none;
      }

      /* Logo bar - white background with centered logo */
      /* Figma specs: container S = ~62px, container M = 88px, container L = 98px */
      .logo-bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: var(--primitives-space-8, 8px);
        padding-bottom: var(--primitives-space-4, 4px);
        background-color: #ffffff;
      }

      /* Container S: smaller logo for 62px logo-bar height */
      :host([container="s"]) .logo-bar {
        padding-top: var(--primitives-space-4, 4px);
        padding-bottom: var(--primitives-space-4, 4px);
      }

      /* Container L: larger logo for 98px logo-bar height */
      :host([container="l"]) .logo-bar {
        padding-top: var(--primitives-space-8, 8px);
        padding-bottom: var(--primitives-space-4, 4px);
      }

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 88px; /* Figma M: 44×88px */
        color: var(--primitives-color-accent-100, #154273);
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
      }

      /* Responsive logo heights per Figma specs */
      :host([container="s"]) .logo {
        height: 80px; /* Figma S: 40×80px */
      }

      :host([container="l"]) .logo {
        height: 96px; /* Figma L: 48×96px */
      }

      /* SVG styling - let height drive sizing, auto width */
      .logo svg {
        height: 100%;
        width: auto;
        max-width: 100%;
      }

      .title-text {
        font: var(--components-menu-bar-title-item-m-font, 600 20px/1.125 RijksSansVF, system-ui);
        color: var(--primitives-color-neutral-900, #0f172a);
        margin: var(--primitives-space-4, 4px) 0 0 0;
        text-align: center;
      }

      /* Responsive title font sizes per Figma tokens */
      :host([container="s"]) .title-text {
        font: var(--components-menu-bar-title-item-s-font, 600 18px/1.125 RijksSansVF, system-ui);
        margin: var(--primitives-space-2, 2px) 0 0 0;
      }

      :host([container="l"]) .title-text {
        font: var(--components-menu-bar-title-item-l-font, 600 23px/1.125 RijksSansVF, system-ui);
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
      :host([container="s"]) .menu-bar,
      :host([container="s"]) .logo-bar {
        padding-left: var(--semantics-sections-s-margin-inline, 20px);
        padding-right: var(--semantics-sections-s-margin-inline, 20px);
      }

      :host([container="m"]) .nav-bar,
      :host([container="m"]) .menu-bar,
      :host([container="m"]) .logo-bar,
      :host(:not([container])) .nav-bar,
      :host(:not([container])) .menu-bar,
      :host(:not([container])) .logo-bar {
        padding-left: var(--semantics-sections-m-margin-inline, 32px);
        padding-right: var(--semantics-sections-m-margin-inline, 32px);
      }

      :host([container="l"]) .nav-bar,
      :host([container="l"]) .menu-bar,
      :host([container="l"]) .logo-bar {
        padding-left: var(--semantics-sections-l-margin-inline, 48px);
        padding-right: var(--semantics-sections-l-margin-inline, 48px);
      }

      /* Responsive text hiding on small screens */
      :host([container="s"]) .nav-button span {
        display: none;
      }

      :host([container="s"]) .nav-button .chevron {
        display: none;
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
            <!-- Rijkswapen loaded asynchronously -->
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
