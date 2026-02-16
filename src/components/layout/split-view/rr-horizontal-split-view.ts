/**
 * RegelRecht Horizontal Split View Component (Lit + TypeScript)
 *
 * A 3-pane row layout for the browser page. Renders dividers automatically
 * between panes.
 *
 * @element rr-horizontal-split-view
 *
 * @slot side - Fixed-width left pane (e.g. law list)
 * @slot main - Flex-grow center pane (e.g. article list)
 * @slot inspector - Fixed-width right pane (e.g. article detail)
 *
 * @csspart container - The outer flex container
 * @csspart divider-side - The divider between side and main panes
 * @csspart divider-inspector - The divider between main and inspector panes
 *
 * @cssprop --rr-horizontal-split-view-side-width - Width of the side pane
 * @cssprop --rr-horizontal-split-view-inspector-width - Width of the inspector pane
 */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './rr-split-view-divider.ts';

@customElement('rr-horizontal-split-view')
export class RRHorizontalSplitView extends LitElement {
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

    .horizontal-split-view {
      display: flex;
      flex-direction: row;
      flex: 1;
      min-height: 0;
      min-width: 0;
    }

    .horizontal-split-view__side {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      width: var(--rr-horizontal-split-view-side-width, auto);
      min-height: 0;
    }

    .horizontal-split-view__main {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      min-width: 0;
    }

    .horizontal-split-view__inspector {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      width: var(--rr-horizontal-split-view-inspector-width, auto);
      min-height: 0;
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
      <div class="horizontal-split-view" part="container">
        <div class="horizontal-split-view__side">
          <slot name="side"></slot>
        </div>
        <rr-split-view-divider
          orientation="vertical"
          part="divider-side"
        ></rr-split-view-divider>
        <div class="horizontal-split-view__main">
          <slot name="main"></slot>
        </div>
        <rr-split-view-divider
          orientation="vertical"
          part="divider-inspector"
        ></rr-split-view-divider>
        <div class="horizontal-split-view__inspector">
          <slot name="inspector"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-horizontal-split-view': RRHorizontalSplitView;
  }
}
