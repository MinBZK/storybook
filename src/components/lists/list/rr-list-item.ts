/**
 * RegelRecht List Item Component (Lit + TypeScript)
 *
 * An item component for use within rr-list, with optional selection state.
 *
 * @element rr-list-item
 * @attr {string} size - Item size: 'sm' | 'md' (default: 'md')
 * @attr {boolean} selected - Whether the item is selected
 *
 * @slot - Default slot for main content (cells)
 * @slot start - Slot for content at the start of the item
 * @slot end - Slot for content at the end of the item
 *
 * @csspart item - The list item container
 * @csspart start-area - The start slot area
 * @csspart main-area - The main content area
 * @csspart end-area - The end slot area
 * @csspart indicator - The selection indicator
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'sm' | 'md';

@customElement('rr-list-item')
export class RRListItem extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      --_list-item-divider-display: block;
    }

    :host([hidden]) {
      display: none;
    }

    /* Selection indicator */
    .list-item__indicator {
      display: none;
      position: absolute;
      left: -10px;
      right: -10px;
      top: 50%;
      transform: translateY(-50%);
      height: 48px; /* MD size */
      background-color: var(--semantics-buttons-accent-filled-background-color);
      border-radius: 8px;
      z-index: 0;
    }

    :host([selected]) .list-item__indicator {
      display: block;
    }

    /* SM size indicator height */
    :host([size="sm"]) .list-item__indicator {
      height: 40px;
    }

    /* Areas */
    .list-item__start-area,
    .list-item__end-area {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-self: stretch;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .list-item__main-area {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-self: stretch;
      flex: 1;
      min-width: 0;
      position: relative;
      z-index: 1;
    }

    /* Size: MD (default) - 12px vertical padding */
    :host([size="md"]) .list-item__start-area,
    :host([size="md"]) .list-item__end-area,
    :host(:not([size])) .list-item__start-area,
    :host(:not([size])) .list-item__end-area {
      padding: 12px 0;
    }

    :host([size="md"]) .list-item__main-area,
    :host(:not([size])) .list-item__main-area {
      padding: 12px 0;
    }

    /* Size: SM - 8px vertical padding */
    :host([size="sm"]) .list-item__start-area,
    :host([size="sm"]) .list-item__end-area {
      padding: 8px 0;
    }

    :host([size="sm"]) .list-item__main-area {
      padding: 8px 0;
    }

    /* Divider - appears at bottom of main area */
    .list-item__divider {
      display: var(--_list-item-divider-display);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: var(--semantics-dividers-color);
    }

    /* Hide divider when selected */
    :host([selected]) .list-item__divider {
      display: none;
    }

    /* Spacer sizing - 16px default */
    .list-item__spacer {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    /* Slotted content colors when selected */
    :host([selected]) {
      --semantics-content-color: var(--primitives-color-neutral-0);
      color: var(--primitives-color-neutral-0);
    }

    /* Accessibility: focus state */
    :host(:focus-visible) {
      box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
      outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'md';

  @property({ type: Boolean, reflect: true })
  selected = false;

  override render() {
    return html`
      <div class="list-item__indicator" part="indicator"></div>
      <div class="list-item__start-area" part="start-area">
        <slot name="start">
          <div class="list-item__spacer"></div>
        </slot>
      </div>
      <div class="list-item__main-area" part="main-area">
        <slot></slot>
        <div class="list-item__divider"></div>
      </div>
      <div class="list-item__end-area" part="end-area">
        <slot name="end">
          <div class="list-item__spacer"></div>
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-list-item': RRListItem;
  }
}
