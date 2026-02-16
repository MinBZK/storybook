/**
 * RegelRecht Title Bar Title Group Component (Lit + TypeScript)
 *
 * A title component for use in title bars and page headers.
 * Displays a title with responsive sizing based on container breakpoints.
 *
 * @element rr-title-bar-title-group
 * @attr {string} size - Title size: 'sm' | 'md' | 'lg' (default: 'md')
 *
 * @slot - Default slot for title text
 *
 * @csspart title - The title text element
 *
 * @cssprop --rr-title-bar-title-color - Override title color
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'sm' | 'md' | 'lg';

@customElement('rr-title-bar-title-group')
export class RRTitleBarTitleGroup extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .title-group {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 8px;
      width: 100%;
    }

    .title {
      flex: 1;
      margin: 0;
      padding: 0;
      color: var(--rr-title-bar-title-color, var(--semantics-content-color));
      font-weight: 550;
      line-height: 1.125;
      text-align: left;
    }

    /* Size: SM */
    :host([size='sm']) .title {
      font-size: 23px;
    }

    /* Size: MD (default) */
    :host([size='md']) .title,
    :host(:not([size])) .title {
      font-size: 23px;
    }

    /* Size: LG */
    :host([size='lg']) .title {
      font-size: 26px;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .title {
        color: CanvasText;
      }
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'md';

  override render() {
    return html`
      <div class="title-group">
        <h1 class="title" part="title">
          <slot></slot>
        </h1>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-title-bar-title-group': RRTitleBarTitleGroup;
  }
}
