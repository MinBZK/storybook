/**
 * RegelRecht Toolbar Component (Lit + TypeScript)
 *
 * A horizontal toolbar container with three areas: start, center, and end.
 * Items in start are left-aligned, center items are centered, and end items are right-aligned.
 *
 * @element rr-toolbar
 * @attr {string} size - Toolbar size: 's' | 'm' (default: 'm')
 *
 * @slot start - Left-aligned content area
 * @slot - Center-aligned content area (default slot)
 * @slot end - Right-aligned content area
 *
 * @csspart toolbar - The toolbar container
 * @csspart start - The start area
 * @csspart center - The center area
 * @csspart end - The end area
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 's' | 'm';

@customElement('rr-toolbar')
export class RRToolbar extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
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
    :host([size="s"]) .toolbar {
      gap: var(--primitives-space-6);
    }

    /* Size: M (default) */
    :host([size="m"]) .toolbar,
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
    :host([size="s"]) .toolbar__start-area,
    :host([size="s"]) .toolbar__center-area,
    :host([size="s"]) .toolbar__end-area {
      gap: var(--primitives-space-6);
    }

    /* Size: M gaps (default) */
    :host([size="m"]) .toolbar__start-area,
    :host([size="m"]) .toolbar__center-area,
    :host([size="m"]) .toolbar__end-area,
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
  size: Size = 'm';

  override render() {
    return html`
      <div class="toolbar" part="toolbar" role="toolbar">
        <div class="toolbar__start-area" part="start">
          <slot name="start"></slot>
        </div>
        <div class="toolbar__center-area" part="center">
          <slot></slot>
        </div>
        <div class="toolbar__end-area" part="end">
          <slot name="end"></slot>
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
