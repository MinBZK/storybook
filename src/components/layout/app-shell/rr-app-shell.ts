/**
 * RegelRecht App Shell Component (Lit + TypeScript)
 *
 * A developer utility component that provides a viewport-filling layout
 * with header, main content, and footer slots.
 *
 * @element rr-app-shell
 *
 * @slot header - Slot for header/navigation content
 * @slot - Default slot for main content (scrollable)
 * @slot footer - Slot for footer/bottom bar content
 *
 * @csspart shell - The shell container
 * @csspart header - The header section
 * @csspart main - The main content section
 * @csspart footer - The footer section
 */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('rr-app-shell')
export class RRAppShell extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100dvh;
      overflow: hidden;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .app-shell__header {
      flex-shrink: 0;
    }

    .app-shell__main {
      flex: 1;
      min-height: 0;
      overflow: auto;
    }

    .app-shell__footer {
      flex-shrink: 0;
    }
  `;

  private static _globalStylesInjected = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this._injectGlobalStyles();
  }

  private _injectGlobalStyles(): void {
    if (RRAppShell._globalStylesInjected) return;
    RRAppShell._globalStylesInjected = true;

    const style = document.createElement('style');
    style.textContent = `html, body { margin: 0; height: 100%; }`;
    document.head.appendChild(style);
  }

  override render() {
    return html`
      <div class="app-shell__header" part="header">
        <slot name="header"></slot>
      </div>
      <div class="app-shell__main" part="main">
        <slot></slot>
      </div>
      <div class="app-shell__footer" part="footer">
        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-app-shell': RRAppShell;
  }
}
