/**
 * RegelRecht Top Title Bar Component (Lit + TypeScript)
 *
 * A title bar component for page headers with optional toolbar.
 * Supports compact and non-compact modes with responsive sizing.
 *
 * @element rr-top-title-bar
 * @attr {string} container - Container size: 'sm' | 'md' | 'lg' (default: 'md')
 * @attr {boolean} compact - Whether to use compact mode with title in toolbar
 * @attr {string} toolbar - Toolbar mode: 'default' | 'custom' | 'none' (default: 'default')
 * @attr {string} title - The title text
 * @attr {string} dismiss-label - Label for the dismiss button (default: 'Sluit')
 *
 * @slot toolbar-start - Slot for toolbar start area content (custom toolbar mode)
 * @slot toolbar-end - Slot for toolbar end area content (custom toolbar mode)
 *
 * @fires dismiss - When the dismiss button is clicked
 *
 * @csspart title-bar - The title bar container
 * @csspart toolbar - The toolbar section
 * @csspart title - The title section
 *
 * @cssprop --rr-top-title-bar-title-color - Override title color
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../actions/button/rr-button.js';

type Container = 'sm' | 'md' | 'lg';
type Toolbar = 'default' | 'custom' | 'none';

@customElement('rr-top-title-bar')
export class RRTopTitleBar extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .title-bar {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .title-bar__toolbar {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .toolbar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      min-height: 44px;
      box-sizing: border-box;
    }

    /* Toolbar padding per container (matches title area horizontal padding) */
    :host([container='sm']) .toolbar,
    :host(:not([container])) .toolbar {
      padding: 0 16px;
    }

    :host([container='md']) .toolbar {
      padding: 0 32px;
    }

    :host([container='lg']) .toolbar {
      padding: 0 48px;
    }

    .toolbar__start-area {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }

    .toolbar__end-area {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
    }

    /* Compact mode: title in toolbar */
    :host([compact]) .toolbar {
      justify-content: space-between;
    }

    :host([compact]) .toolbar__start-area {
      flex: 1;
    }

    .toolbar__title-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 12px;
    }

    .toolbar__title {
      font-weight: 550;
      font-size: 20px;
      line-height: 1.125;
      color: var(--rr-top-title-bar-title-color, #333A45);
      margin: 0;
    }

    /* Title section (non-compact mode) */
    .title-bar__title {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .title {
      font-weight: 550;
      line-height: 1.125;
      color: var(--rr-top-title-bar-title-color, #333A45);
      margin: 0;
    }

    /* Container: SM - padding 16px 16px 0 */
    :host([container='sm']) .title-bar__title,
    :host(:not([container])) .title-bar__title {
      padding: 16px 16px 0;
    }

    :host([container='sm']) .title,
    :host(:not([container])) .title {
      font-size: 29px;
    }

    /* Container: MD - padding 16px 32px 0 */
    :host([container='md']) .title-bar__title {
      padding: 16px 32px 0;
    }

    :host([container='md']) .title {
      font-size: 32px;
    }

    /* Container: LG - padding 16px 48px 0 */
    :host([container='lg']) .title-bar__title {
      padding: 16px 48px 0;
    }

    :host([container='lg']) .title {
      font-size: 41px;
    }

    /* Hide title section in compact mode */
    :host([compact]) .title-bar__title {
      display: none;
    }

    /* Hide compact title in non-compact mode */
    :host(:not([compact])) .toolbar__title-group {
      display: none;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .title,
      .toolbar__title {
        color: CanvasText;
      }
    }
  `;

  @property({ type: String, reflect: true })
  container: Container = 'sm';

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: String, reflect: true })
  toolbar: Toolbar = 'default';

  @property({ type: String })
  title = 'Title';

  @property({ type: String, attribute: 'dismiss-label' })
  dismissLabel = 'Sluit';

  private _handleDismiss(): void {
    this.dispatchEvent(
      new CustomEvent('dismiss', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _renderToolbar() {
    if (this.toolbar === 'none' && !this.compact) {
      return nothing;
    }

    if (this.toolbar === 'custom') {
      return html`
        <div class="title-bar__toolbar">
          <div class="toolbar">
            <div class="toolbar__start-area">
              <slot name="toolbar-start"></slot>
            </div>
            <div class="toolbar__end-area">
              <slot name="toolbar-end"></slot>
            </div>
          </div>
        </div>
      `;
    }

    // Default or compact with no toolbar
    return html`
      <div class="title-bar__toolbar">
        <div class="toolbar">
          <div class="toolbar__start-area">
            ${this.compact
              ? html`
                  <div class="toolbar__title-group">
                    <h1 class="toolbar__title">${this.title}</h1>
                  </div>
                `
              : nothing}
          </div>
          <div class="toolbar__end-area">
            ${this.toolbar === 'default'
              ? html`
                  <rr-button variant="accent-transparent" @click=${this._handleDismiss}> ${this.dismissLabel} </rr-button>
                `
              : nothing}
          </div>
        </div>
      </div>
    `;
  }

  override render() {
    return html`
      <div class="title-bar" part="title-bar">
        ${this._renderToolbar()}
        <div class="title-bar__title" part="title">
          <h1 class="title">${this.title}</h1>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-top-title-bar': RRTopTitleBar;
  }
}
