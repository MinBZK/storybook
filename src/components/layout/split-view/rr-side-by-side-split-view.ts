/**
 * RegelRecht Side-by-Side Split View Component (Lit + TypeScript)
 *
 * A 2-pane row layout for the editor page. Equal flex distribution
 * with an automatically rendered divider between panes.
 *
 * @element rr-side-by-side-split-view
 *
 * @slot start - Left pane (e.g. text editor)
 * @slot end - Right pane (e.g. machine editor)
 *
 * @csspart container - The outer flex container
 * @csspart divider - The divider between panes
 */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './rr-split-view-divider.ts';

@customElement('rr-side-by-side-split-view')
export class RRSideBySideSplitView extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
    }

    :host([hidden]) {
      display: none;
    }

    .side-by-side-split-view {
      display: flex;
      flex-direction: row;
      flex: 1;
      min-height: 0;
      min-width: 0;
    }

    .side-by-side-split-view__pane {
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
      <div class="side-by-side-split-view" part="container">
        <div class="side-by-side-split-view__pane">
          <slot name="start"></slot>
        </div>
        <rr-split-view-divider
          orientation="vertical"
          part="divider"
        ></rr-split-view-divider>
        <div class="side-by-side-split-view__pane">
          <slot name="end"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-side-by-side-split-view': RRSideBySideSplitView;
  }
}
