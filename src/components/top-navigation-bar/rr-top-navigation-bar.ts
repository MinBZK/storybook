/**
 * RegelRecht Top Navigation Bar Component (Lit + TypeScript)
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

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Import sub-components to ensure they're registered
import './rr-nav-logo.ts';
import '../menu-bar/rr-menu-bar.ts';
import '../menu-bar/rr-menu-item.ts';
import './rr-utility-menu-bar.ts';
import './rr-back-button.ts';

type ContainerSize = 's' | 'm' | 'l';

@customElement('rr-top-navigation-bar')
export class RRTopNavigationBar extends LitElement {
  static override styles = css`
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
      outline: var(--semantics-focus-ring-thickness, 2px) solid
        var(--semantics-focus-ring-color, #0f172a);
      outline-offset: 2px;
    }

    .container {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 auto;
      background-color: #ffffff;
      border-bottom: var(--semantics-divider-thickness, 2px) solid
        var(--semantics-divider-color, #e2e8f0);
    }

    /* Container fills available width - no max-width constraints */
    :host([container='s']) .container {
      min-width: var(--primitives-breakpoint-s-min, 320px);
    }

    :host([container='m']) .container,
    :host(:not([container])) .container {
      min-width: var(--primitives-breakpoint-m-min, 641px);
    }

    :host([container='l']) .container {
      min-width: var(--primitives-breakpoint-l-min, 1008px);
    }

    /* Logo bar - white background with centered logo */
    .logo-bar {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
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
    :host([container='s']) .nav-bar,
    :host([container='s']) .logo-bar {
      padding-left: var(--semantics-sections-s-margin-inline, 20px);
      padding-right: var(--semantics-sections-s-margin-inline, 20px);
    }

    :host([container='m']) .nav-bar,
    :host([container='m']) .logo-bar,
    :host(:not([container])) .nav-bar,
    :host(:not([container])) .logo-bar {
      padding-left: var(--semantics-sections-m-margin-inline, 32px);
      padding-right: var(--semantics-sections-m-margin-inline, 32px);
    }

    :host([container='l']) .nav-bar,
    :host([container='l']) .logo-bar {
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
      color: var(--primitives-color-neutral-900, #0f172a);
      /* Match Figma title-item padding: 0px 8px - title item right padding creates gap to menu */
      padding-right: var(--primitives-space-8, 8px);
      white-space: nowrap;
    }

    :host([container='s']) .nav-title {
      font: var(--components-menu-bar-title-item-s-font, 550 18px/1.125 RijksSansVF, system-ui);
    }

    :host([container='l']) .nav-title {
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
    :host([container='s']) .global-menu {
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

  @property({ type: String, reflect: true })
  container: ContainerSize = 'm';

  @property({ type: String })
  override title = 'Titel';

  @property({ type: String, attribute: 'skip-link-target' })
  skipLinkTarget = '#main-content';

  // Hide default features (shown by default, add attribute to hide)
  @property({ type: Boolean, attribute: 'no-logo', reflect: true })
  noLogo = false;

  @property({ type: Boolean, attribute: 'no-title', reflect: true })
  noTitle = false;

  @property({ type: Boolean, attribute: 'no-menu', reflect: true })
  noMenu = false;

  @property({ type: Boolean, attribute: 'no-utility-bar', reflect: true })
  noUtilityBar = false;

  // Show optional features (hidden by default, add attribute to show)
  @property({ type: Boolean, attribute: 'has-back-button', reflect: true })
  hasBackButton = false;

  // Logo pass-through
  @property({ type: Boolean, attribute: 'logo-has-wordmark' })
  logoHasWordmark = false;

  @property({ type: String, attribute: 'logo-title' })
  logoTitle = '';

  @property({ type: String, attribute: 'logo-subtitle' })
  logoSubtitle = '';

  @property({ type: String, attribute: 'logo-supporting-text-1' })
  logoSupportingText1 = '';

  @property({ type: String, attribute: 'logo-supporting-text-2' })
  logoSupportingText2 = '';

  // Utility menu bar pass-through - Hide default buttons
  @property({ type: Boolean, attribute: 'utility-no-language-switch' })
  utilityNoLanguageSwitch = false;

  @property({ type: Boolean, attribute: 'utility-no-search' })
  utilityNoSearch = false;

  @property({ type: Boolean, attribute: 'utility-no-account' })
  utilityNoAccount = false;

  // Utility menu bar pass-through - Show optional buttons
  @property({ type: Boolean, attribute: 'utility-has-help' })
  utilityHasHelp = false;

  @property({ type: Boolean, attribute: 'utility-has-settings' })
  utilityHasSettings = false;

  @property({ type: String, attribute: 'utility-language' })
  utilityLanguage = 'NL';

  @property({ type: String, attribute: 'utility-account-label' })
  utilityAccountLabel = '';

  // Back button pass-through
  @property({ type: String, attribute: 'back-href' })
  backHref = '';

  @property({ type: String, attribute: 'back-label' })
  backLabel = 'Terug';

  private get _accountLabel(): string {
    return this.utilityAccountLabel || `Mijn ${this.title}`;
  }

  override render() {
    return html`
      <a href="${this.skipLinkTarget}" class="skip-link">Ga naar hoofdinhoud</a>
      <div class="container" part="container">
        <!-- Logo bar with centered Rijksoverheid coat of arms -->
        <div class="logo-bar" part="logo-bar">
          <rr-nav-logo
            container="${this.container}"
            ?has-wordmark="${this.logoHasWordmark}"
            title="${this.logoTitle}"
            subtitle="${this.logoSubtitle}"
            supporting-text-1="${this.logoSupportingText1}"
            supporting-text-2="${this.logoSupportingText2}"
          ></rr-nav-logo>
        </div>

        <!-- Navigation bar: Back | Title | Menu items | Utility buttons -->
        <nav class="nav-bar" part="nav-bar" aria-label="Hoofdnavigatie">
          <!-- Left: Back button, Title, Global Menu -->
          <div class="nav-left">
            <rr-back-button
              container="${this.container}"
              href="${this.backHref}"
              label="${this.backLabel}"
            ></rr-back-button>
            <span class="nav-title">${this.title}</span>
            <div class="global-menu">
              <rr-menu-bar size="${this.container}" has-overflow-menu overflow-label="Meer">
                <slot name="menu"></slot>
              </rr-menu-bar>
            </div>
          </div>

          <!-- Right: Utility buttons -->
          <div class="nav-right">
            <rr-utility-menu-bar
              container="${this.container}"
              ?no-language-switch="${this.utilityNoLanguageSwitch}"
              ?no-search="${this.utilityNoSearch}"
              ?no-account="${this.utilityNoAccount}"
              ?has-help="${this.utilityHasHelp}"
              ?has-settings="${this.utilityHasSettings}"
              language="${this.utilityLanguage}"
              account-label="${this._accountLabel}"
            ></rr-utility-menu-bar>
          </div>
        </nav>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-top-navigation-bar': RRTopNavigationBar;
  }
}
