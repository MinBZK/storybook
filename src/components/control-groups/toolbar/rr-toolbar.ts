/**
 * RegelRecht Toolbar Component (Lit + TypeScript)
 *
 * A horizontal toolbar container with three areas: start, center, and end.
 * Items in start are left-aligned, center items are centered, and end items are right-aligned.
 *
 * @element rr-toolbar
 * @attr {string} size - Toolbar size: 'sm' | 'md' (default: 'md')
 *
 * @slot start-area - Left-aligned content area
 * @slot - Center-aligned content area (default slot)
 * @slot end-area - Right-aligned content area
 *
 * @csspart toolbar - The toolbar container
 * @csspart start - The start area
 * @csspart center - The center area
 * @csspart end - The end area
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'sm' | 'md';

@customElement('rr-toolbar')
export class RRToolbar extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .toolbar {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      width: 100%;
    }

    /* Size: S */
    :host([size="sm"]) .toolbar {
      gap: var(--primitives-space-6);
    }

    /* Size: M (default) */
    :host([size="md"]) .toolbar,
    :host(:not([size])) .toolbar {
      gap: var(--primitives-space-8);
    }

    .toolbar__start-area,
    .toolbar__center-area,
    .toolbar__end-area {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex: 1 1 0%;
    }

    /* Size: S gaps */
    :host([size="sm"]) .toolbar__start-area,
    :host([size="sm"]) .toolbar__center-area,
    :host([size="sm"]) .toolbar__end-area {
      gap: var(--primitives-space-6);
    }

    /* Size: M gaps (default) */
    :host([size="md"]) .toolbar__start-area,
    :host([size="md"]) .toolbar__center-area,
    :host([size="md"]) .toolbar__end-area,
    :host(:not([size])) .toolbar__start-area,
    :host(:not([size])) .toolbar__center-area,
    :host(:not([size])) .toolbar__end-area {
      gap: var(--primitives-space-8);
    }

    .toolbar__start-area {
      justify-content: flex-start;
    }

    .toolbar__center-area {
      justify-content: center;
    }

    .toolbar__end-area {
      justify-content: flex-end;
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'md';

  override render() {
    return html`
      <div class="toolbar" part="toolbar" role="toolbar">
        <div class="toolbar__start-area" part="start">
          <slot name="start-area"></slot>
        </div>
        <div class="toolbar__center-area" part="center">
          <slot></slot>
        </div>
        <div class="toolbar__end-area" part="end">
          <slot name="end-area"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-toolbar': RRToolbar;
  }
}
