/**
 * RegelRecht Top Navigation Bar Component
 *
 * Full navigation header following Figma top-navigation-bar design.
 * Composes sub-components: rr-nav-logo, rr-menu-bar, rr-utility-menu-bar, rr-back-button.
 *
 * ## Usage
 * ```html
 * <!-- Default: all features visible -->
 * <rr-top-navigation-bar title="DigID">
 *   <rr-menu-item slot="menu" selected>Home</rr-menu-item>
 *   <rr-menu-item slot="menu">Aanvragen</rr-menu-item>
 * </rr-top-navigation-bar>
 *
 * <!-- Minimal: hide features with no-* attributes -->
 * <rr-top-navigation-bar no-title no-menu no-utility-bar></rr-top-navigation-bar>
 *
 * <!-- Add optional features with has-* attributes -->
 * <rr-top-navigation-bar has-back-button back-href="/">
 * </rr-top-navigation-bar>
 * ```
 *
 * @element rr-top-navigation-bar
 * @attr {string} container - Size variant: 's' | 'm' | 'l' (default: 'm')
 * @attr {string} title - Title text (default: 'Titel')
 *
 * Hide default features (clean boolean pattern):
 * @attr {boolean} no-logo - Hide logo section
 * @attr {boolean} no-title - Hide title text
 * @attr {boolean} no-menu - Hide global menu
 * @attr {boolean} no-utility-bar - Hide utility buttons
 *
 * Show optional features:
 * @attr {boolean} has-back-button - Show back button (default: false)
 * @attr {boolean} logo-has-wordmark - Show wordmark beside logo (default: false)
 * @attr {boolean} utility-has-help - Show help button (default: false)
 * @attr {boolean} utility-has-settings - Show settings button (default: false)
 *
 * Hide utility buttons individually:
 * @attr {boolean} utility-no-language-switch - Hide language button
 * @attr {boolean} utility-no-search - Hide search button
 * @attr {boolean} utility-no-account - Hide account button
 *
 * Configuration:
 * @attr {string} logo-title - Logo wordmark title
 * @attr {string} logo-subtitle - Logo wordmark subtitle
 * @attr {string} utility-language - Language code (default: 'NL')
 * @attr {string} utility-account-label - Account button label
 * @attr {string} back-href - Back button link destination
 * @attr {string} back-label - Back button text (default: 'Terug')
 *
 * @slot menu - Menu items (rr-menu-item components) for global menu bar
 *
 * @csspart container - The main container
 * @csspart logo-bar - The logo section
 * @csspart nav-bar - The navigation bar section
 */

import { RRBaseComponent } from '../base/base-component.js';

// Import sub-components to ensure they're registered
import './rr-nav-logo.js';
import '../menu-bar/rr-menu-bar.ts';
import '../menu-bar/rr-menu-item.ts';
import './rr-utility-menu-bar.ts';
import './rr-back-button.js';

export class RRTopNavigationBar extends RRBaseComponent {
  static componentName = 'rr-top-navigation-bar';

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'container',
      'title',
      'skip-link-target',
      // Hide default features (shown by default, add no-* to hide)
      'no-logo',
      'no-title',
      'no-menu',
      'no-utility-bar',
      // Show optional features (hidden by default, add has-* to show)
      'has-back-button',
      // Logo pass-through
      'logo-has-wordmark',
      'logo-title',
      'logo-subtitle',
      'logo-supporting-text-1',
      'logo-supporting-text-2',
      // Utility menu bar pass-through
      'utility-no-language-switch',
      'utility-no-search',
      'utility-no-account',
      'utility-has-help',
      'utility-has-settings',
      'utility-language',
      'utility-account-label',
      // Back button pass-through
      'back-href',
      'back-label',
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

  // Default features: shown unless no-* attribute is present
  get hasLogo() {
    return !this.hasAttribute('no-logo');
  }

  get hasTitle() {
    return !this.hasAttribute('no-title');
  }

  get hasGlobalMenu() {
    return !this.hasAttribute('no-menu');
  }

  get hasUtilityMenuBar() {
    return !this.hasAttribute('no-utility-bar');
  }

  // Optional features: hidden unless has-* attribute is present
  get hasBackButton() {
    return this.hasAttribute('has-back-button');
  }

  get titleText() {
    return this.getAttribute('title') || 'Titel';
  }

  get skipLinkTarget() {
    return this.getAttribute('skip-link-target') || '#main-content';
  }

  // Logo pass-through getters
  get logoHasWordmark() {
    return this.getBooleanAttribute('logo-has-wordmark');
  }

  get logoTitle() {
    return this.getAttribute('logo-title') || '';
  }

  get logoSubtitle() {
    return this.getAttribute('logo-subtitle') || '';
  }

  get logoSupportingText1() {
    return this.getAttribute('logo-supporting-text-1') || '';
  }

  get logoSupportingText2() {
    return this.getAttribute('logo-supporting-text-2') || '';
  }

  // Utility menu bar pass-through getters
  // Default buttons: shown unless utility-no-* attribute is present
  get utilityHasLanguageSwitch() {
    return !this.hasAttribute('utility-no-language-switch');
  }

  get utilityHasSearch() {
    return !this.hasAttribute('utility-no-search');
  }

  get utilityHasAccount() {
    return !this.hasAttribute('utility-no-account');
  }

  // Optional buttons: hidden unless utility-has-* attribute is present
  get utilityHasHelp() {
    return this.hasAttribute('utility-has-help');
  }

  get utilityHasSettings() {
    return this.hasAttribute('utility-has-settings');
  }

  get utilityLanguage() {
    return this.getAttribute('utility-language') || 'NL';
  }

  get utilityAccountLabel() {
    // Default to "Mijn {title}" if not specified
    return this.getAttribute('utility-account-label') || `Mijn ${this.titleText}`;
  }

  // Back button pass-through getters
  get backHref() {
    return this.getAttribute('back-href') || '';
  }

  get backLabel() {
    return this.getAttribute('back-label') || 'Terug';
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

      .skip-link {
        position: absolute;
        top: -100%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        background-color: var(--primitives-color-accent-100, #154273);
        color: #ffffff;
        padding: var(--primitives-space-8, 8px) var(--primitives-space-16, 16px);
        font: var(--components-menu-bar-menu-item-font, 550 18px/1.125 RijksSansVF, system-ui);
        text-decoration: none;
        border-radius: var(--semantics-controls-m-corner-radius, 7px);
      }

      .skip-link:focus {
        top: var(--primitives-space-8, 8px);
        outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
        outline-offset: 2px;
      }

      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0 auto;
        background-color: #ffffff;
        border-bottom: var(--semantics-divider-thickness, 2px) solid var(--semantics-divider-color, #e2e8f0);
      }

      /* Container fills available width - no max-width constraints */
      :host([container="s"]) .container {
        min-width: var(--primitives-breakpoint-s-min, 320px);
      }

      :host([container="m"]) .container,
      :host(:not([container])) .container {
        min-width: var(--primitives-breakpoint-m-min, 641px);
      }

      :host([container="l"]) .container {
        min-width: var(--primitives-breakpoint-l-min, 1008px);
      }

      /* Logo bar - white background with centered logo */
      .logo-bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: var(--primitives-space-8, 8px);
        padding-bottom: var(--primitives-space-4, 4px);
        background-color: #ffffff;
      }

      :host([container="s"]) .logo-bar {
        padding-top: var(--primitives-space-4, 4px);
        padding-bottom: var(--primitives-space-4, 4px);
      }

      /* Navigation bar */
      .nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 44px;
        background-color: #ffffff;
      }

      /* Responsive padding */
      :host([container="s"]) .nav-bar,
      :host([container="s"]) .logo-bar {
        padding-left: var(--semantics-sections-s-margin-inline, 20px);
        padding-right: var(--semantics-sections-s-margin-inline, 20px);
      }

      :host([container="m"]) .nav-bar,
      :host([container="m"]) .logo-bar,
      :host(:not([container])) .nav-bar,
      :host(:not([container])) .logo-bar {
        padding-left: var(--semantics-sections-m-margin-inline, 32px);
        padding-right: var(--semantics-sections-m-margin-inline, 32px);
      }

      :host([container="l"]) .nav-bar,
      :host([container="l"]) .logo-bar {
        padding-left: var(--semantics-sections-l-margin-inline, 48px);
        padding-right: var(--semantics-sections-l-margin-inline, 48px);
      }

      .nav-left {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0; /* Allow flex item to shrink below content size */
      }

      .nav-right {
        display: flex;
        align-items: center;
        flex-shrink: 0; /* Prevent utility bar from shrinking */
      }

      .global-menu {
        flex: 1;
        min-width: 0;
        overflow: visible; /* Allow dropdown menu to extend beyond bounds */
      }

      /* Navigation title */
      .nav-title {
        font: var(--components-menu-bar-title-item-m-font, 550 20px/1.125 RijksSansVF, system-ui);
        color: var(--primitives-color-neutral-900, #1f252d);
        margin-right: var(--primitives-space-16, 16px);
        white-space: nowrap;
      }

      :host([container="s"]) .nav-title {
        font: var(--components-menu-bar-title-item-s-font, 550 18px/1.125 RijksSansVF, system-ui);
      }

      :host([container="l"]) .nav-title {
        font: var(--components-menu-bar-title-item-l-font, 550 23px/1.125 RijksSansVF, system-ui);
      }

      /* Menu bar integration - remove its own border as nav-bar provides structure */
      rr-menu-bar {
        --_menu-bar-border: none;
      }

      rr-menu-bar::part(menu) {
        border-bottom: none;
      }

      /* Hide on small screens */
      :host([container="s"]) .global-menu {
        display: none;
      }

      /* Hide sections based on no-* attributes */
      :host([no-logo]) .logo-bar {
        display: none;
      }

      :host([no-title]) .nav-title {
        display: none;
      }

      :host([no-menu]) .global-menu {
        display: none;
      }

      :host([no-utility-bar]) .nav-right {
        display: none;
      }

      :host(:not([has-back-button])) rr-back-button {
        display: none;
      }

      :host([has-back-button]) rr-back-button {
        display: inline-flex;
        margin-right: var(--primitives-space-8, 8px);
      }
    `;
  }

  render() {
    // Escape all user-provided content to prevent XSS
    const safeTitle = this.escapeHtml(this.titleText);
    const safeLogoTitle = this.escapeHtml(this.logoTitle);
    const safeLogoSubtitle = this.escapeHtml(this.logoSubtitle);
    const safeLogoSupporting1 = this.escapeHtml(this.logoSupportingText1);
    const safeLogoSupporting2 = this.escapeHtml(this.logoSupportingText2);
    const safeLanguage = this.escapeHtml(this.utilityLanguage);
    const safeAccountLabel = this.escapeHtml(this.utilityAccountLabel);
    const safeBackLabel = this.escapeHtml(this.backLabel);
    const safeBackHref = this.sanitizeUrl(this.backHref);
    const safeSkipTarget = this.sanitizeUrl(this.skipLinkTarget);

    // Build logo attributes
    const logoAttrs = [
      `container="${this.container}"`,
      this.logoHasWordmark ? 'has-wordmark' : '',
      safeLogoTitle ? `title="${safeLogoTitle}"` : '',
      safeLogoSubtitle ? `subtitle="${safeLogoSubtitle}"` : '',
      safeLogoSupporting1 ? `supporting-text-1="${safeLogoSupporting1}"` : '',
      safeLogoSupporting2 ? `supporting-text-2="${safeLogoSupporting2}"` : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Build utility menu bar attributes (using clean no-* pattern)
    const utilityAttrs = [
      `container="${this.container}"`,
      this.utilityHasLanguageSwitch ? '' : 'no-language-switch',
      this.utilityHasSearch ? '' : 'no-search',
      this.utilityHasHelp ? 'has-help' : '',
      this.utilityHasSettings ? 'has-settings' : '',
      this.utilityHasAccount ? '' : 'no-account',
      `language="${safeLanguage}"`,
      `account-label="${safeAccountLabel}"`,
    ]
      .filter(Boolean)
      .join(' ');

    // Build back button attributes
    const backAttrs = [
      `container="${this.container}"`,
      safeBackHref ? `href="${safeBackHref}"` : '',
      `label="${safeBackLabel}"`,
    ]
      .filter(Boolean)
      .join(' ');

    this.shadowRoot.innerHTML = `
      <style>${this._getStyles()}</style>
      <a href="${safeSkipTarget}" class="skip-link">Ga naar hoofdinhoud</a>
      <div class="container" part="container">
        <!-- Logo bar with centered Rijksoverheid coat of arms -->
        <div class="logo-bar" part="logo-bar">
          <rr-nav-logo ${logoAttrs}></rr-nav-logo>
        </div>

        <!-- Navigation bar: Back | Title | Menu items | Utility buttons -->
        <nav class="nav-bar" part="nav-bar" aria-label="Hoofdnavigatie">
          <!-- Left: Back button, Title, Global Menu -->
          <div class="nav-left">
            <rr-back-button ${backAttrs}></rr-back-button>
            <span class="nav-title">${safeTitle}</span>
            <div class="global-menu">
              <rr-menu-bar size="${this.container}" has-overflow-menu overflow-label="Meer">
                <slot name="menu"></slot>
              </rr-menu-bar>
            </div>
          </div>

          <!-- Right: Utility buttons -->
          <div class="nav-right">
            <rr-utility-menu-bar ${utilityAttrs}></rr-utility-menu-bar>
          </div>
        </nav>
      </div>
    `;
  }
}

customElements.define('rr-top-navigation-bar', RRTopNavigationBar);
