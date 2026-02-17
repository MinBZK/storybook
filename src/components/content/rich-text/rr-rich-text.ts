/**
 * RegelRecht Rich Text Component (Lit + TypeScript)
 *
 * A container for rich text content (paragraphs, headings) that applies
 * container-responsive body text styles via ::slotted selectors.
 *
 * @element rr-rich-text
 * @attr {string} container - Container size: 'sm' | 'md' | 'lg' (default: 'md')
 *
 * @slot - Default slot for content (p, rr-rich-text-heading, etc.)
 *
 * @csspart content - The content wrapper
 *
 * @cssprop --rr-rich-text-gap - Override gap between content elements
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Container = 'sm' | 'md' | 'lg';

@customElement('rr-rich-text')
export class RRRichText extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--rr-rich-text-gap, 27px);
      font-family: var(--rr-font-family-body);
      color: var(--semantics-content-color);
    }

    :host([hidden]) {
      display: none;
    }

    /* Small container */
    :host([container='sm']) ::slotted(p) {
      margin: 0;
      font: var(--semantics-content-body-sm-regular-snug);
      color: var(--semantics-content-color);
    }

    :host([container='sm']) ::slotted(strong),
    :host([container='sm']) ::slotted(b) {
      font-weight: 550;
    }

    /* Medium container (default) */
    :host([container='md']) ::slotted(p),
    :host(:not([container])) ::slotted(p) {
      margin: 0;
      font: var(--semantics-content-body-md-regular-snug);
      color: var(--semantics-content-color);
    }

    /* Large container */
    :host([container='lg']) ::slotted(p) {
      margin: 0;
      font: var(--semantics-content-body-lg-regular-snug);
      color: var(--semantics-content-color);
    }
  `;

  @property({ type: String, reflect: true })
  container: Container = 'md';

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-rich-text': RRRichText;
  }
}
