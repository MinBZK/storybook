/**
 * RegelRecht Description Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying a title-description pair in lists.
 * The title is displayed in a smaller, secondary color font, with the
 * description below it in the default content style.
 *
 * @element rr-description-cell
 * @attr {string} label - The title/label text displayed above the description
 *
 * @slot - Default slot for description content
 *
 * @csspart title - The title text container
 * @csspart description - The description content container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('rr-description-cell')
export class RRDescriptionCell extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .description-cell__title {
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-self: stretch;
    }

    .description-cell__title-text {
      flex: 1;
      min-width: 0;
      font: var(--semantics-content-body-sm-regular-flat);
      color: var(--semantics-content-secondary-color);
      margin: 0;
    }

    .description-cell__description {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      font: var(--semantics-content-body-md-regular-tight);
      color: var(--semantics-content-color);
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .description-cell__title-text,
      .description-cell__description {
        forced-color-adjust: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  label = '';

  override render() {
    return html`
      <div class="description-cell__title" part="title">
        <span class="description-cell__title-text">${this.label}</span>
      </div>
      <div class="description-cell__description" part="description">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-description-cell': RRDescriptionCell;
  }
}
