/**
 * RegelRecht Split View Divider Component (Lit + TypeScript)
 *
 * A 1px line between split view panes with optional drag handle.
 *
 * @element rr-split-view-divider
 * @attr {string} orientation - Divider orientation: 'vertical' | 'horizontal'
 * @attr {boolean} has-drag-handle - Whether to show a drag handle
 *
 * @csspart divider - The divider container
 * @csspart line - The divider line element
 * @csspart drag-handle - The drag handle element
 *
 * @cssprop --rr-split-view-divider-color - Override divider color
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Orientation = 'vertical' | 'horizontal';

@customElement('rr-split-view-divider')
export class RRSplitViewDivider extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
    }

    :host([hidden]) {
      display: none;
    }

    .split-view-divider {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .split-view-divider__line {
      background-color: var(
        --rr-split-view-divider-color,
        var(--semantics-dividers-color)
      );
    }

    .split-view-divider__drag-handle {
      background-color: var(--semantics-content-secondary-color);
      border-radius: 9999px;
      position: absolute;
    }

    /* Vertical orientation (between horizontal panes) */
    :host([orientation='vertical']) {
      align-self: stretch;
    }

    :host([orientation='vertical']) .split-view-divider {
      width: var(--semantics-dividers-thickness);
      height: 100%;
    }

    :host([orientation='vertical']) .split-view-divider__line {
      width: var(--semantics-dividers-thickness);
      height: 100%;
    }

    :host([orientation='vertical']) .split-view-divider__drag-handle {
      width: 4px;
      height: 40px;
    }

    /* Horizontal orientation (between stacked panes) */
    :host([orientation='horizontal']) .split-view-divider,
    :host(:not([orientation])) .split-view-divider {
      width: 100%;
      height: var(--semantics-dividers-thickness);
    }

    :host([orientation='horizontal']) .split-view-divider__line,
    :host(:not([orientation])) .split-view-divider__line {
      width: 100%;
      height: var(--semantics-dividers-thickness);
    }

    :host([orientation='horizontal']) .split-view-divider__drag-handle,
    :host(:not([orientation])) .split-view-divider__drag-handle {
      width: 40px;
      height: 4px;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .split-view-divider__line {
        background-color: CanvasText;
      }
    }
  `;

  @property({ type: String, reflect: true })
  orientation: Orientation = 'vertical';

  @property({ type: Boolean, reflect: true, attribute: 'has-drag-handle' })
  hasDragHandle = false;

  override render() {
    return html`
      <div
        class="split-view-divider"
        part="divider"
        role="separator"
        aria-orientation=${this.orientation}
      >
        <div class="split-view-divider__line" part="line"></div>
        ${this.hasDragHandle
          ? html`<div
              class="split-view-divider__drag-handle"
              part="drag-handle"
            ></div>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-split-view-divider': RRSplitViewDivider;
  }
}
