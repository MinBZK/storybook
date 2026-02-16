/**
 * RegelRecht List Item Drag Handle Component (Lit + TypeScript)
 *
 * A visual drag handle indicator for list items, displaying a grid of dots
 * on a rounded background. Used to indicate that a list item can be reordered.
 *
 * @element rr-list-item-drag-handle
 * @attr {string} size - Handle size: 'sm' | 'md' (default: 'md')
 *
 * @csspart handle - The drag handle container
 */

import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'sm' | 'md';

@customElement('rr-list-item-drag-handle')
export class RRListItemDragHandle extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      cursor: grab;
    }

    :host([hidden]) {
      display: none;
    }

    :host(:active) {
      cursor: grabbing;
    }

    .drag-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--components-grab-handle-background-color);
      border-radius: 6px;
    }

    /* Size: MD (default) - 32x44 */
    :host([size="md"]) .drag-handle,
    :host(:not([size])) .drag-handle {
      width: 32px;
      height: 44px;
    }

    /* Size: SM - 24x32 */
    :host([size="sm"]) .drag-handle {
      width: 24px;
      height: 32px;
    }

    .drag-handle__dots {
      display: block;
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'md';

  private _renderDots() {
    if (this.size === 'sm') {
      // SM: 2x3 grid, 10x16px viewBox
      return svg`
        <svg class="drag-handle__dots" width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="2" fill="var(--components-grab-handle-color)"/>
          <circle cx="8" cy="2" r="2" fill="var(--components-grab-handle-color)"/>
          <circle cx="2" cy="8" r="2" fill="var(--components-grab-handle-color)"/>
          <circle cx="8" cy="8" r="2" fill="var(--components-grab-handle-color)"/>
          <circle cx="2" cy="14" r="2" fill="var(--components-grab-handle-color)"/>
          <circle cx="8" cy="14" r="2" fill="var(--components-grab-handle-color)"/>
        </svg>
      `;
    }
    // MD: 2x4 grid, 10x22px viewBox
    return svg`
      <svg class="drag-handle__dots" width="10" height="22" viewBox="0 0 10 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="2" fill="var(--components-grab-handle-color)"/>
        <circle cx="8" cy="2" r="2" fill="var(--components-grab-handle-color)"/>
        <circle cx="2" cy="8" r="2" fill="var(--components-grab-handle-color)"/>
        <circle cx="8" cy="8" r="2" fill="var(--components-grab-handle-color)"/>
        <circle cx="2" cy="14" r="2" fill="var(--components-grab-handle-color)"/>
        <circle cx="8" cy="14" r="2" fill="var(--components-grab-handle-color)"/>
        <circle cx="2" cy="20" r="2" fill="var(--components-grab-handle-color)"/>
        <circle cx="8" cy="20" r="2" fill="var(--components-grab-handle-color)"/>
      </svg>
    `;
  }

  override render() {
    return html`
      <div class="drag-handle" part="handle" role="img" aria-label="Drag handle">
        ${this._renderDots()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-list-item-drag-handle': RRListItemDragHandle;
  }
}
