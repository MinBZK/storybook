/**
 * RegelRecht Stacked Split View Component (Lit + TypeScript)
 *
 * A 2-pane column layout. Equal flex distribution with an automatically
 * rendered horizontal divider between panes.
 *
 * @element rr-stacked-split-view
 *
 * @slot top - Top pane
 * @slot bottom - Bottom pane
 *
 * @csspart container - The outer flex container
 * @csspart divider - The divider between panes
 */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './rr-split-view-divider.ts';

@customElement('rr-stacked-split-view')
export class RRStackedSplitView extends LitElement {
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

    .stacked-split-view {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      min-width: 0;
    }

    .stacked-split-view__pane {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
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
      <div class="stacked-split-view" part="container">
        <div class="stacked-split-view__pane">
          <slot name="top"></slot>
        </div>
        <rr-split-view-divider
          orientation="horizontal"
          part="divider"
        ></rr-split-view-divider>
        <div class="stacked-split-view__pane">
          <slot name="bottom"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-stacked-split-view': RRStackedSplitView;
  }
}
