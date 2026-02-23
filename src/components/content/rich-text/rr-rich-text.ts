/**
 * RegelRecht Rich Text Component (Lit + TypeScript)
 *
 * A container for rich text content (paragraphs, headings) that automatically
 * applies responsive typography via CSS container queries.
 *
 * Breakpoints:
 *   - < 600px  → sm tokens (body-sm, sm-title-*)
 *   - ≥ 600px  → md tokens (body-md, md-title-*)
 *   - ≥ 1024px → lg tokens (body-lg, lg-title-*)
 *
 * @element rr-rich-text
 *
 * @slot - Default slot for content (p, h1–h6, strong, etc.)
 *
 * @csspart content - The content wrapper
 *
 * @cssprop --rr-rich-text-gap - Override gap between content elements
 */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('rr-rich-text')
export class RRRichText extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-body);
      color: var(--semantics-content-color);
      container-type: inline-size;
    }

    :host([hidden]) {
      display: none;
    }

    .rich-text {
      display: flex;
      flex-direction: column;
      gap: var(--rr-rich-text-gap, 27px);
    }

    /* ── Default: sm tokens (< 600px) ────────────────────────── */

    ::slotted(p) {
      margin: 0;
      font: var(--primitives-font-body-sm-regular-snug);
      color: var(--semantics-content-color);
    }

    ::slotted(h1) {
      margin: 0;
      font: var(--primitives-font-display-1-sm);
      color: var(--semantics-content-color);
    }
    ::slotted(h2) {
      margin: 0;
      font: var(--primitives-font-display-2-sm);
      color: var(--semantics-content-color);
    }
    ::slotted(h3) {
      margin: 0;
      font: var(--primitives-font-display-3-sm);
      color: var(--semantics-content-color);
    }
    ::slotted(h4) {
      margin: 0;
      font: var(--primitives-font-display-4-sm);
      color: var(--semantics-content-color);
    }
    ::slotted(h5) {
      margin: 0;
      font: var(--primitives-font-display-5-sm);
      color: var(--semantics-content-color);
    }
    ::slotted(h6) {
      margin: 0;
      font: var(--primitives-font-display-6-sm);
      color: var(--semantics-content-color);
    }

    /* ── md tokens (≥ 600px) ─────────────────────────────────── */

    @container (min-width: 600px) {
      ::slotted(p) {
        font: var(--primitives-font-body-md-regular-snug);
      }
      ::slotted(h1) {
        font: var(--primitives-font-display-1-md);
      }
      ::slotted(h2) {
        font: var(--primitives-font-display-2-md);
      }
      ::slotted(h3) {
        font: var(--primitives-font-display-3-md);
      }
      ::slotted(h4) {
        font: var(--primitives-font-display-4-md);
      }
      ::slotted(h5) {
        font: var(--primitives-font-display-5-md);
      }
      ::slotted(h6) {
        font: var(--primitives-font-display-6-md);
      }
    }

    /* ── lg tokens (≥ 1024px) ────────────────────────────────── */

    @container (min-width: 1024px) {
      ::slotted(p) {
        font: var(--primitives-font-body-lg-regular-snug);
      }
      ::slotted(h1) {
        font: var(--primitives-font-display-1-lg);
      }
      ::slotted(h2) {
        font: var(--primitives-font-display-2-lg);
      }
      ::slotted(h3) {
        font: var(--primitives-font-display-3-lg);
      }
      ::slotted(h4) {
        font: var(--primitives-font-display-4-lg);
      }
      ::slotted(h5) {
        font: var(--primitives-font-display-5-lg);
      }
      ::slotted(h6) {
        font: var(--primitives-font-display-6-lg);
      }
    }
  `;

  override render() {
    return html`<div class="rich-text" part="content"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-rich-text': RRRichText;
  }
}
