/**
 * RegelRecht Vertical Split View Component (Lit + TypeScript)
 *
 * A 3-pane column layout for the browser page. Renders horizontal dividers
 * automatically between panes.
 *
 * @element rr-vertical-split-view
 *
 * @slot top - Fixed-height top pane (e.g. toolbar, header)
 * @slot main - Flex-grow center pane (e.g. content area)
 * @slot bottom - Fixed-height bottom pane (e.g. footer, status bar)
 *
 * @csspart container - The outer flex container
 * @csspart divider-top - The divider between top and main panes
 * @csspart divider-bottom - The divider between main and bottom panes
 *
 * @cssprop --rr-vertical-split-view-top-height - Height of the top pane
 * @cssprop --rr-vertical-split-view-bottom-height - Height of the bottom pane
 */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './rr-split-view-divider.ts';

@customElement('rr-vertical-split-view')
export class RRVerticalSplitView extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }

    :host([hidden]) {
      display: none;
    }

    .vertical-split-view {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      min-width: 0;
    }

    .vertical-split-view__top {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: var(--rr-vertical-split-view-top-height, auto);
      min-width: 0;
    }

    .vertical-split-view__main {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      min-width: 0;
    }

    .vertical-split-view__bottom {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: var(--rr-vertical-split-view-bottom-height, auto);
      min-width: 0;
    }

    ::slotted(*) {
      flex: 1;
      min-height: 0;
    }

    rr-split-view-divider {
      align-self: stretch;
    }
  `;

  override render() {
    return html`
      <div class="vertical-split-view" part="container">
        <div class="vertical-split-view__top">
          <slot name="top"></slot>
        </div>
        <rr-split-view-divider
          orientation="horizontal"
          part="divider-top"
        ></rr-split-view-divider>
        <div class="vertical-split-view__main">
          <slot name="main"></slot>
        </div>
        <rr-split-view-divider
          orientation="horizontal"
          part="divider-bottom"
        ></rr-split-view-divider>
        <div class="vertical-split-view__bottom">
          <slot name="bottom"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-vertical-split-view': RRVerticalSplitView;
  }
}
