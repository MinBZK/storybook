/**
 * RegelRecht Navigation Logo Component (Lit + TypeScript)
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

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type ContainerSize = 's' | 'm' | 'l';

// Shared cache across all rr-nav-logo instances
let cachedRijkswapen: string | null = null;

@customElement('rr-nav-logo')
export class RRNavLogo extends LitElement {
  // Configurable asset path (can be overridden per-project)
  static assetBasePath = '/assets';

  static override styles = css`
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
    :host([container='s']) .logo,
    :host(:not([container])) .logo {
      width: 40px;
      height: 80px;
    }

    :host([container='m']) .logo {
      width: 44px;
      height: 88px;
    }

    :host([container='l']) .logo {
      width: 48px;
      height: 96px;
    }

    .logo svg {
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

    :host([container='s']) .title {
      font: var(--components-menu-bar-title-item-s-font, 550 18px/1.125 RijksSansVF, system-ui);
    }

    :host([container='l']) .title {
      font: var(--components-menu-bar-title-item-l-font, 550 23px/1.125 RijksSansVF, system-ui);
    }

    .subtitle {
      font: 400 16px/1.25 var(--rr-font-family-sans, RijksSansVF, system-ui);
      color: var(--primitives-color-neutral-700, #334155);
      margin: 0;
    }

    :host([container='s']) .subtitle {
      font-size: 14px;
    }

    :host([container='l']) .subtitle {
      font-size: 18px;
    }

    .supporting-text {
      font: 400 14px/1.25 var(--rr-font-family-sans, RijksSansVF, system-ui);
      color: var(--primitives-color-accent-100, #154273);
      margin: 0;
    }

    :host([container='s']) .supporting-text {
      font-size: 12px;
    }

    :host([container='l']) .supporting-text {
      font-size: 16px;
    }
  `;

  @property({ type: String, reflect: true })
  container: ContainerSize = 'm';

  @property({ type: Boolean, attribute: 'has-wordmark', reflect: true })
  hasWordmark = false;

  @property({ type: String })
  override title = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: String, attribute: 'supporting-text-1' })
  supportingText1 = '';

  @property({ type: String, attribute: 'supporting-text-2' })
  supportingText2 = '';

  @state()
  private _logoSvg: string | null = null;

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this._loadRijkswapen();
  }

  /**
   * Loads the official Rijkswapen SVG and caches it.
   */
  private async _loadRijkswapen(): Promise<void> {
    // If already cached, use it
    if (cachedRijkswapen) {
      this._logoSvg = cachedRijkswapen;
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
      this._logoSvg = svgText;
    } catch (error) {
      console.error('Failed to load Rijkswapen:', (error as Error).message);
    }
  }

  override render() {
    return html`
      <div class="logo-container" part="container">
        <div class="logo" part="logo" role="img" aria-label="Rijkswapen - Rijksoverheid">
          ${this._logoSvg ? unsafeHTML(this._logoSvg) : nothing}
        </div>
        ${this.hasWordmark
          ? html`
              <div class="wordmark" part="wordmark">
                ${this.title ? html`<p class="title">${this.title}</p>` : nothing}
                ${this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : nothing}
                ${this.supportingText1
                  ? html`<p class="supporting-text">${this.supportingText1}</p>`
                  : nothing}
                ${this.supportingText2
                  ? html`<p class="supporting-text">${this.supportingText2}</p>`
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-nav-logo': RRNavLogo;
  }
}
