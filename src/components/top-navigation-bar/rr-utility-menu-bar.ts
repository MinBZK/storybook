/**
 * RegelRecht Utility Menu Bar Component (Lit + TypeScript)
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
 *
 * <!-- Programmatically toggle dropdown state -->
 * <script>
 *   const utilityBar = document.querySelector('rr-utility-menu-bar');
 *   utilityBar.toggleDropdown('language', true);  // Open language dropdown
 *   utilityBar.toggleDropdown('language', false); // Close language dropdown
 *   utilityBar.closeAllDropdowns();               // Close all dropdowns
 * </script>
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
 * @method toggleDropdown - Toggle aria-expanded state for dropdown buttons (language, account)
 * @method closeAllDropdowns - Close all dropdown menus
 *
 * @csspart container - The main container
 * @csspart button - Individual utility buttons
 */

import { LitElement, html, css, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type ContainerSize = 's' | 'm' | 'l';

// Icons from the icon set
const searchIcon = svg`
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 10C2 14.4 5.6 18 10 18C11.85 18 13.55 17.3529 14.8994 16.3L20.6 22L22 20.6L16.3 14.9C17.35 13.55 18 11.8491 18 10C18 5.6 14.4 2 10 2C5.6 2 2 5.6 2 10ZM4 10C4 6.7 6.7 4 10 4C13.3 4 16 6.7 16 10C16 13.3 13.3 16 10 16C6.7 16 4 13.3 4 10Z"/>
  </svg>
`;

const userIcon = svg`
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7ZM9 16C7.34315 16 6 17.3431 6 19V22H4L4 19C4 16.2386 6.23858 14 9 14H15C17.7614 14 20 16.2386 20 19L19.9677 22H17.9677L18 19C18 17.3431 16.6569 16 15 16H9Z"/>
  </svg>
`;

const helpIcon = svg`
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.6953 14.4707C12.0713 14.4707 12.3586 14.5793 12.5566 14.7969C12.7645 15.0048 12.8691 15.3071 12.8691 15.7031C12.8691 16.0695 12.7646 16.3613 12.5566 16.5791C12.3586 16.7969 12.0716 16.9062 11.6953 16.9062C11.3095 16.9062 11.0125 16.8024 10.8047 16.5947C10.6067 16.3769 10.5078 16.0794 10.5078 15.7031C10.5078 15.327 10.6068 15.0303 10.8047 14.8125C11.0126 14.5848 11.3093 14.4708 11.6953 14.4707Z"/>
    <path d="M12.2451 7C13.1362 7 13.8339 7.20824 14.3389 7.62402C14.8438 8.02998 15.0967 8.57462 15.0967 9.25781C15.0966 9.86165 14.9626 10.3571 14.6953 10.7432C14.4379 11.1191 14.0373 11.4361 13.4932 11.6934L12.7646 12.0645C12.5471 12.1733 12.389 12.2971 12.29 12.4355C12.201 12.5642 12.1563 12.7079 12.1562 12.8662C12.1562 13.0048 12.1763 13.1484 12.2158 13.2969C12.2554 13.4355 12.3096 13.5695 12.3789 13.6982L10.8936 13.7725C10.755 13.6438 10.6409 13.4802 10.5518 13.2822C10.4627 13.0744 10.418 12.8613 10.418 12.6436C10.418 12.2971 10.5026 11.9947 10.6709 11.7373C10.8392 11.4701 11.1313 11.2227 11.5469 10.9951L12.334 10.5498C12.6408 10.3815 12.8538 10.2179 12.9727 10.0596C13.0915 9.90115 13.1514 9.71295 13.1514 9.49512C13.1514 9.2377 13.042 9.03998 12.8242 8.90137C12.6163 8.75285 12.2646 8.67871 11.7695 8.67871C11.4232 8.67874 11.0768 8.71773 10.7305 8.79688C10.3839 8.86618 10.037 8.96503 9.69043 9.09375V7.47559C10.1062 7.30731 10.5123 7.18846 10.9082 7.11914C11.3141 7.03993 11.76 7 12.2451 7Z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"/>
  </svg>
`;

const settingsIcon = svg`
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0003 8C14.2093 8.00017 16.0003 9.79097 16.0003 12C16.0003 14.209 14.2093 15.9998 12.0003 16C9.79118 16 8.00032 14.2091 8.00032 12C8.00032 9.79086 9.79118 8 12.0003 8ZM12.0003 10C10.8957 10 10.0003 10.8954 10.0003 12C10.0003 13.1046 10.8957 14 12.0003 14C13.1047 13.9998 14.0003 13.1045 14.0003 12C14.0003 10.8955 13.1047 10.0002 12.0003 10Z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1907 2C14.2177 2.00047 15.0786 2.77885 15.181 3.80078L15.2708 4.69922C15.7724 4.92425 16.2345 5.20818 16.6868 5.51758L17.5111 5.14648C18.4474 4.72437 19.5521 5.08014 20.0657 5.96973L21.2562 8.03027C21.7694 8.91974 21.5252 10.0545 20.6917 10.6543L19.9583 11.1807C20.0128 11.7165 20.014 12.2705 19.9583 12.8184L20.6917 13.3457C21.5253 13.9455 21.7695 15.0802 21.2562 15.9697L19.9622 18.1904C19.4508 18.9099 18.5231 19.2092 17.6878 18.9238L16.6868 18.4814C16.2466 18.8003 15.7721 19.0748 15.2708 19.2998L15.1527 20.3877C14.9824 21.2536 14.2597 21.9076 13.3812 21.9912H10.6195C9.67814 21.9018 8.91653 21.1575 8.82063 20.1992L8.72981 19.2998C8.22851 19.0748 7.75397 18.8003 7.31379 18.4814L6.31282 18.9238C5.47752 19.2094 4.54995 18.9099 4.0384 18.1904L2.74543 15.9697C2.26376 15.1354 2.44795 14.0859 3.16047 13.4639L4.04231 12.8184C3.98713 12.2753 3.98709 11.7235 4.04231 11.1807L3.30989 10.6543C2.52818 10.092 2.26441 9.06004 2.65754 8.2002L3.93586 5.96973C4.44972 5.08018 5.55414 4.72389 6.49055 5.14648L7.31379 5.51758C7.75395 5.19883 8.22855 4.92415 8.72981 4.69922L8.82063 3.80078C8.91664 2.84261 9.67822 2.09824 10.6195 2.00879L13.1907 2ZM10.8099 4.00195L10.6029 6.05078L9.54817 6.52344C9.17125 6.69258 8.81577 6.89933 8.48664 7.1377L7.54817 7.81738L5.66829 6.96973L4.47688 9.03027L6.14875 10.2314C6.08901 10.8184 6.00129 11.4089 6.00129 12C6.00129 12.5901 6.08901 13.1796 6.14875 13.7656L4.47786 14.9688L4.47688 14.9697L5.66731 17.0303L7.54719 16.1807L8.48664 16.8613C8.73348 17.0401 8.99521 17.2013 9.26985 17.3418L10.6029 17.9482L10.8099 19.998V20H13.1907L13.3958 17.9492L14.4515 17.4746C14.8283 17.3055 15.1837 17.0998 15.513 16.8613L16.4525 16.1816L18.3333 17.0303L19.5238 14.9697L17.8509 13.7666C17.9106 13.1809 18.0013 12.5899 18.0013 12C18.0013 11.4095 17.9106 10.8178 17.8509 10.2314L19.5238 9.03027L18.3333 6.96973H18.3314L16.4515 7.81641L15.513 7.1377C15.1835 6.89913 14.828 6.69333 14.4515 6.52441L13.3958 6.0498L13.1907 4H10.8099V4.00195Z"/>
  </svg>
`;

const chevronIcon = svg`
  <svg class="chevron" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9995 15.1715L3.4 6.59998L2 7.99998L11.9995 18L22 7.99998L20.6 6.59998L11.9995 15.1715Z"/>
  </svg>
`;

@customElement('rr-utility-menu-bar')
export class RRUtilityMenuBar extends LitElement {
  static override styles = css`
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
      gap: var(--primitives-space-4, 4px);
      padding: 0 var(--primitives-space-8, 8px);
      height: 44px;
      background: none;
      border: none;
      color: var(--components-menu-bar-menu-item-color, #c0ccd8);
      font: var(--components-menu-bar-menu-item-font, 550 18px/1.125 RijksSansVF, system-ui);
      cursor: pointer;
      border-radius: 0;
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
    :host([container='s']) .utility-button span {
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

    :host([container='s']) .utility-button .chevron {
      display: none;
    }

    /* Size adjustments */
    :host([container='s']) .utility-button {
      padding: var(--primitives-space-8, 8px);
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .utility-button {
        transition: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  container: ContainerSize = 'm';

  // Default buttons: shown unless no-* attribute is present
  @property({ type: Boolean, reflect: true, attribute: 'no-language-switch' })
  noLanguageSwitch = false;

  @property({ type: Boolean, reflect: true, attribute: 'no-search' })
  noSearch = false;

  @property({ type: Boolean, reflect: true, attribute: 'no-account' })
  noAccount = false;

  // Optional buttons: hidden unless has-* attribute is present
  @property({ type: Boolean, reflect: true, attribute: 'has-help' })
  hasHelp = false;

  @property({ type: Boolean, reflect: true, attribute: 'has-settings' })
  hasSettings = false;

  // Configuration
  @property({ type: String })
  language = 'NL';

  @property({ type: String, attribute: 'account-label' })
  accountLabel = 'Mijn';

  private _expandedButton: string | null = null;

  /**
   * Toggle aria-expanded state for dropdown buttons
   * @param action - The button action ('language' or 'account')
   * @param expanded - Whether the dropdown is expanded
   */
  toggleDropdown(action: string, expanded: boolean): void {
    const button = this.shadowRoot?.querySelector(`button[data-action="${action}"]`);
    if (button && button.hasAttribute('aria-haspopup')) {
      button.setAttribute('aria-expanded', String(expanded));
      this._expandedButton = expanded ? action : null;
    }
  }

  /**
   * Close all dropdowns
   */
  closeAllDropdowns(): void {
    const dropdownButtons = this.shadowRoot?.querySelectorAll('button[aria-haspopup="true"]');
    dropdownButtons?.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
    });
    this._expandedButton = null;
  }

  private _handleClick = (e: Event): void => {
    const button = (e.target as HTMLElement).closest('button');
    if (!button) return;

    const action = button.dataset.action;
    if (action) {
      this.dispatchEvent(
        new CustomEvent(`${action}-click`, {
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  /**
   * Escape HTML to prevent XSS
   */
  private _escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  override render() {
    const safeLanguage = this._escapeHtml(this.language);
    const safeAccountLabel = this._escapeHtml(this.accountLabel);

    return html`
      <div class="container" part="container" @click="${this._handleClick}">
        ${!this.noLanguageSwitch
          ? html`
              <button
                class="utility-button"
                part="button"
                data-action="language"
                aria-label="${safeLanguage} - Taal selecteren"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>${safeLanguage}</span>
                ${chevronIcon}
              </button>
            `
          : nothing}
        ${!this.noSearch
          ? html`
              <button class="utility-button" part="button" data-action="search" aria-label="Zoeken">
                ${searchIcon}
                <span>Zoeken</span>
              </button>
            `
          : nothing}
        ${this.hasHelp
          ? html`
              <button class="utility-button" part="button" data-action="help" aria-label="Hulp">
                ${helpIcon}
                <span>Hulp</span>
              </button>
            `
          : nothing}
        ${this.hasSettings
          ? html`
              <button class="utility-button" part="button" data-action="settings" aria-label="Instellingen">
                ${settingsIcon}
                <span>Instellingen</span>
              </button>
            `
          : nothing}
        ${!this.noAccount
          ? html`
              <button
                class="utility-button"
                part="button"
                data-action="account"
                aria-label="${safeAccountLabel} - Account menu"
                aria-haspopup="true"
                aria-expanded="false"
              >
                ${userIcon}
                <span>${safeAccountLabel}</span>
                ${chevronIcon}
              </button>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-utility-menu-bar': RRUtilityMenuBar;
  }
}
