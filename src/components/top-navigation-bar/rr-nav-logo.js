/**
 * RegelRecht Navigation Logo Component
 *
 * Rijksoverheid coat of arms (Rijkswapen) with optional wordmark.
 * Can display title, subtitle, and supporting text beside the logo.
 *
 * @element rr-nav-logo
 * @attr {string} container - Size variant: 's' | 'm' | 'l' (default: 'm')
 * @attr {boolean} has-wordmark - Show text beside logo (default: false)
 * @attr {string} title - Main title text
 * @attr {string} subtitle - Subtitle text
 * @attr {string} supporting-text-1 - First supporting text line
 * @attr {string} supporting-text-2 - Second supporting text line
 *
 * @csspart logo - The logo container
 * @csspart wordmark - The wordmark text container
 */

import { RRBaseComponent } from '../base/base-component.js';

// Official Rijkswapen (coat of arms) - loaded from /assets/rijkswapen.svg
// Shared cache across all rr-nav-logo instances
let cachedRijkswapen = null;

export class RRNavLogo extends RRBaseComponent {
  static componentName = 'rr-nav-logo';

  // Configurable asset path (can be overridden per-project)
  static assetBasePath = '/assets';

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'container',
      'has-wordmark',
      'title',
      'subtitle',
      'supporting-text-1',
      'supporting-text-2',
    ];
  }

  constructor() {
    super();
    this._logoLoaded = false;
  }

  async connectedCallback() {
    await super.connectedCallback();
    // Only load once - prevents infinite loop when cache exists
    if (!this._logoLoaded) {
      this._logoLoaded = true;
      await this._loadRijkswapen();
    }
  }

  /**
   * Loads the official Rijkswapen SVG and caches it.
   */
  async _loadRijkswapen() {
    // If already cached, no need to fetch or re-render
    // (base class connectedCallback already called render())
    if (cachedRijkswapen) {
      return;
    }

    try {
      const url = `${RRNavLogo.assetBasePath}/rijkswapen.svg`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to load logo: ${response.status}`);
      }

      const svgText = await response.text();
      cachedRijkswapen = svgText;
      // Re-render now that we have the SVG
      this.render();
    } catch (error) {
      console.error('Failed to load Rijkswapen:', error.message);
    }
  }

  // Getters for attributes
  get container() {
    return this.getAttribute('container') || 'm';
  }

  set container(value) {
    this.setAttribute('container', value);
  }

  get hasWordmark() {
    return this.getBooleanAttribute('has-wordmark');
  }

  set hasWordmark(value) {
    if (value) {
      this.setAttribute('has-wordmark', '');
    } else {
      this.removeAttribute('has-wordmark');
    }
  }

  get titleText() {
    return this.getAttribute('title') || '';
  }

  set titleText(value) {
    this.setAttribute('title', value);
  }

  get subtitle() {
    return this.getAttribute('subtitle') || '';
  }

  set subtitle(value) {
    this.setAttribute('subtitle', value);
  }

  get supportingText1() {
    return this.getAttribute('supporting-text-1') || '';
  }

  set supportingText1(value) {
    this.setAttribute('supporting-text-1', value);
  }

  get supportingText2() {
    return this.getAttribute('supporting-text-2') || '';
  }

  set supportingText2(value) {
    this.setAttribute('supporting-text-2', value);
  }

  _getStyles() {
    return `
      :host {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-16, 16px);
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: var(--primitives-space-16, 16px);
      }

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--primitives-color-accent-100, #154273);
      }

      /* Logo sizes per container */
      :host([container="s"]) .logo,
      :host(:not([container])) .logo {
        width: 40px;
        height: 80px;
      }

      :host([container="m"]) .logo {
        width: 44px;
        height: 88px;
      }

      :host([container="l"]) .logo {
        width: 48px;
        height: 96px;
      }

      .logo :global(svg) {
        width: 100%;
        height: 100%;
      }

      /* Wordmark styles */
      .wordmark {
        display: flex;
        flex-direction: column;
        gap: var(--primitives-space-2, 2px);
      }

      :host(:not([has-wordmark])) .wordmark {
        display: none;
      }

      .title {
        font: var(--components-menu-bar-title-item-m-font, 550 20px/1.125 RijksSansVF, system-ui);
        color: var(--primitives-color-neutral-900, #0f172a);
        margin: 0;
      }

      :host([container="s"]) .title {
        font: var(--components-menu-bar-title-item-s-font, 550 18px/1.125 RijksSansVF, system-ui);
      }

      :host([container="l"]) .title {
        font: var(--components-menu-bar-title-item-l-font, 550 23px/1.125 RijksSansVF, system-ui);
      }

      .subtitle {
        font: 400 16px/1.25 var(--rr-font-family-sans, RijksSansVF, system-ui);
        color: var(--primitives-color-neutral-700, #334155);
        margin: 0;
      }

      :host([container="s"]) .subtitle {
        font-size: 14px;
      }

      :host([container="l"]) .subtitle {
        font-size: 18px;
      }

      .supporting-text {
        font: 400 14px/1.25 var(--rr-font-family-sans, RijksSansVF, system-ui);
        color: var(--primitives-color-accent-100, #154273);
        margin: 0;
      }

      :host([container="s"]) .supporting-text {
        font-size: 12px;
      }

      :host([container="l"]) .supporting-text {
        font-size: 16px;
      }
    `;
  }

  render() {
    const showWordmark = this.hasWordmark;
    // Escape all user-provided content to prevent XSS
    const title = this.escapeHtml(this.titleText);
    const subtitle = this.escapeHtml(this.subtitle);
    const supportingText1 = this.escapeHtml(this.supportingText1);
    const supportingText2 = this.escapeHtml(this.supportingText2);

    this.shadowRoot.innerHTML = `
      <style>${this._getStyles()}</style>
      <div class="logo-container" part="container">
        <div class="logo" part="logo" role="img" aria-label="Rijkswapen - Rijksoverheid">
          ${cachedRijkswapen || ''}
        </div>
        ${
          showWordmark
            ? `
          <div class="wordmark" part="wordmark">
            ${title ? `<p class="title">${title}</p>` : ''}
            ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
            ${supportingText1 ? `<p class="supporting-text">${supportingText1}</p>` : ''}
            ${supportingText2 ? `<p class="supporting-text">${supportingText2}</p>` : ''}
          </div>
        `
            : ''
        }
      </div>
    `;
  }
}

customElements.define('rr-nav-logo', RRNavLogo);
