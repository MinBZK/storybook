/**
 * RegelRecht Page Component (Lit + TypeScript)
 *
 * A page layout component with optional sticky header and footer areas.
 * Provides a scrollable main content area with gradient fades for sticky sections.
 *
 * @element rr-page
 * @attr {boolean} header-sticky - Whether the header should be sticky
 * @attr {boolean} footer-sticky - Whether the footer should be sticky
 * @attr {boolean} tinted - Whether to use tinted (gray) background instead of white
 *
 * @slot header - Slot for header content
 * @slot - Default slot for main content
 * @slot footer - Slot for footer content
 *
 * @csspart page - The page container
 * @csspart scroll - The scrollable area
 * @csspart header - The header section
 * @csspart main - The main content section
 * @csspart footer - The footer section
 *
 * @cssprop --rr-page-background-color - Override page background color
 * @cssprop --rr-page-header-height - Height of sticky header area (default: auto)
 * @cssprop --rr-page-footer-height - Height of sticky footer area (default: auto)
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './page-sticky-area-background/rr-page-sticky-area-background.js';

@customElement('rr-page')
export class RRPage extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .page {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      position: relative;
    }

    /* Default background color */
    :host(:not([tinted])) .page,
    :host([tinted='false']) .page {
      background-color: var(--rr-page-background-color, var(--semantics-surfaces-background-color));
    }

    /* Tinted background color */
    :host([tinted]) .page,
    :host([tinted='true']) .page {
      background-color: var(--rr-page-background-color, var(--semantics-surfaces-tinted-background-color));
    }

    /* Scrollable area */
    .page__scroll {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
    }

    /* Header section */
    .page__header {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      position: relative;
    }

    /* Sticky header */
    :host([header-sticky]) .page__header {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .page__header-content {
      position: relative;
      z-index: 1;
    }

    .page__header-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: -16px;
      z-index: 0;
      pointer-events: none;
    }

    /* Main content section */
    .page__main {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    /* Footer section */
    .page__footer {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      position: relative;
    }

    /* Sticky footer */
    :host([footer-sticky]) .page__footer {
      position: sticky;
      bottom: 0;
      z-index: 10;
    }

    .page__footer-content {
      position: relative;
      z-index: 1;
    }

    .page__footer-background {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: -16px;
      z-index: 0;
      pointer-events: none;
    }

    /* Hide sticky backgrounds when not sticky */
    :host(:not([header-sticky])) .page__header-background {
      display: none;
    }

    :host(:not([footer-sticky])) .page__footer-background {
      display: none;
    }

    /* Slots */
    ::slotted(*) {
      width: 100%;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .page {
        background-color: Canvas;
      }
    }
  `;

  @property({ type: Boolean, reflect: true, attribute: 'header-sticky' })
  headerSticky = false;

  @property({ type: Boolean, reflect: true, attribute: 'footer-sticky' })
  footerSticky = false;

  @property({ type: Boolean, reflect: true })
  tinted = false;

  override render() {
    return html`
      <div class="page" part="page">
        <div class="page__scroll" part="scroll">
          <header class="page__header" part="header">
            ${this.headerSticky
              ? html`
                  <rr-page-sticky-area-background
                    class="page__header-background"
                    position="top"
                    ?tinted=${this.tinted}
                    style="--rr-page-sticky-area-height: 100%;"
                  ></rr-page-sticky-area-background>
                `
              : ''}
            <div class="page__header-content">
              <slot name="header"></slot>
            </div>
          </header>
          <main class="page__main" part="main">
            <slot></slot>
          </main>
          <footer class="page__footer" part="footer">
            ${this.footerSticky
              ? html`
                  <rr-page-sticky-area-background
                    class="page__footer-background"
                    position="bottom"
                    ?tinted=${this.tinted}
                    style="--rr-page-sticky-area-height: 100%;"
                  ></rr-page-sticky-area-background>
                `
              : ''}
            <div class="page__footer-content">
              <slot name="footer"></slot>
            </div>
          </footer>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-page': RRPage;
  }
}
