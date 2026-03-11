/**
 * RegelRecht Split View Pane Component (Lit + TypeScript)
 *
 * Container for one pane in a split view. A simple flex-column wrapper
 * that fills available height. Typically holds an <rr-page>.
 *
 * @element rr-split-view-pane
 *
 * @slot - Default slot for pane content
 *
 * @csspart pane - The pane container
 */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('rr-split-view-pane')
export class RRSplitViewPane extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 0;
      min-width: 0;
    }

    :host([hidden]) {
      display: none;
    }

    .split-view-pane {
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
  `;

  override render() {
    return html`
      <div class="split-view-pane" part="pane">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-split-view-pane': RRSplitViewPane;
  }
}
