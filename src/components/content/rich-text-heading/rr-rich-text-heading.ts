/**
 * RegelRecht Rich Text Heading Component (Lit + TypeScript)
 *
 * Renders a heading element (h1-h6) with the appropriate semantic title token
 * based on the container size and heading level.
 *
 * @element rr-rich-text-heading
 * @attr {number} level - Heading level 1-6 (default: 1)
 * @attr {string} container - Container size: 'sm' | 'md' | 'lg' (default: 'md')
 *
 * @slot - Default slot for heading text
 *
 * @csspart heading - The heading element
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type Container = 'sm' | 'md' | 'lg';

@customElement('rr-rich-text-heading')
export class RRRichTextHeading extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-body);
      color: var(--semantics-content-color);
    }

    :host([hidden]) {
      display: none;
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
      color: inherit;
    }

    /* Small container titles */
    :host([container='sm']) h1,
    :host([container='sm'][level='1']) h1 {
      font: var(--semantics-content-sm-title-1);
    }
    :host([container='sm']) h2,
    :host([container='sm'][level='2']) h2 {
      font: var(--semantics-content-sm-title-2);
    }
    :host([container='sm']) h3,
    :host([container='sm'][level='3']) h3 {
      font: var(--semantics-content-sm-title-3);
    }
    :host([container='sm']) h4,
    :host([container='sm'][level='4']) h4 {
      font: var(--semantics-content-sm-title-4);
    }
    :host([container='sm']) h5,
    :host([container='sm'][level='5']) h5 {
      font: var(--semantics-content-sm-title-5);
    }
    :host([container='sm']) h6,
    :host([container='sm'][level='6']) h6 {
      font: var(--semantics-content-sm-title-6);
    }

    /* Medium container titles (default) */
    :host([container='md']) h1,
    :host(:not([container])) h1 {
      font: var(--semantics-content-md-title-1);
    }
    :host([container='md']) h2,
    :host(:not([container])) h2 {
      font: var(--semantics-content-md-title-2);
    }
    :host([container='md']) h3,
    :host(:not([container])) h3 {
      font: var(--semantics-content-md-title-3);
    }
    :host([container='md']) h4,
    :host(:not([container])) h4 {
      font: var(--semantics-content-md-title-4);
    }
    :host([container='md']) h5,
    :host(:not([container])) h5 {
      font: var(--semantics-content-md-title-5);
    }
    :host([container='md']) h6,
    :host(:not([container])) h6 {
      font: var(--semantics-content-md-title-6);
    }

    /* Large container titles */
    :host([container='lg']) h1 {
      font: var(--semantics-content-lg-title-1);
    }
    :host([container='lg']) h2 {
      font: var(--semantics-content-lg-title-2);
    }
    :host([container='lg']) h3 {
      font: var(--semantics-content-lg-title-3);
    }
    :host([container='lg']) h4 {
      font: var(--semantics-content-lg-title-4);
    }
    :host([container='lg']) h5 {
      font: var(--semantics-content-lg-title-5);
    }
    :host([container='lg']) h6 {
      font: var(--semantics-content-lg-title-6);
    }
  `;

  @property({ type: Number, reflect: true })
  level: Level = 1;

  @property({ type: String, reflect: true })
  container: Container = 'md';

  override render() {
    switch (this.level) {
      case 1:
        return html`<h1 part="heading"><slot></slot></h1>`;
      case 2:
        return html`<h2 part="heading"><slot></slot></h2>`;
      case 3:
        return html`<h3 part="heading"><slot></slot></h3>`;
      case 4:
        return html`<h4 part="heading"><slot></slot></h4>`;
      case 5:
        return html`<h5 part="heading"><slot></slot></h5>`;
      case 6:
        return html`<h6 part="heading"><slot></slot></h6>`;
      default:
        return html`<h1 part="heading"><slot></slot></h1>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-rich-text-heading': RRRichTextHeading;
  }
}
