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
      font: var(--semantics-content-body-sm-regular-snug);
      color: var(--semantics-content-color);
    }

    ::slotted(h1) {
      margin: 0;
      font: var(--semantics-content-sm-title-1);
      color: var(--semantics-content-color);
    }
    ::slotted(h2) {
      margin: 0;
      font: var(--semantics-content-sm-title-2);
      color: var(--semantics-content-color);
    }
    ::slotted(h3) {
      margin: 0;
      font: var(--semantics-content-sm-title-3);
      color: var(--semantics-content-color);
    }
    ::slotted(h4) {
      margin: 0;
      font: var(--semantics-content-sm-title-4);
      color: var(--semantics-content-color);
    }
    ::slotted(h5) {
      margin: 0;
      font: var(--semantics-content-sm-title-5);
      color: var(--semantics-content-color);
    }
    ::slotted(h6) {
      margin: 0;
      font: var(--semantics-content-sm-title-6);
      color: var(--semantics-content-color);
    }

    /* ── md tokens (≥ 600px) ─────────────────────────────────── */

    @container (min-width: 600px) {
      ::slotted(p) {
        font: var(--semantics-content-body-md-regular-snug);
      }
      ::slotted(h1) {
        font: var(--semantics-content-md-title-1);
      }
      ::slotted(h2) {
        font: var(--semantics-content-md-title-2);
      }
      ::slotted(h3) {
        font: var(--semantics-content-md-title-3);
      }
      ::slotted(h4) {
        font: var(--semantics-content-md-title-4);
      }
      ::slotted(h5) {
        font: var(--semantics-content-md-title-5);
      }
      ::slotted(h6) {
        font: var(--semantics-content-md-title-6);
      }
    }

    /* ── lg tokens (≥ 1024px) ────────────────────────────────── */

    @container (min-width: 1024px) {
      ::slotted(p) {
        font: var(--semantics-content-body-lg-regular-snug);
      }
      ::slotted(h1) {
        font: var(--semantics-content-lg-title-1);
      }
      ::slotted(h2) {
        font: var(--semantics-content-lg-title-2);
      }
      ::slotted(h3) {
        font: var(--semantics-content-lg-title-3);
      }
      ::slotted(h4) {
        font: var(--semantics-content-lg-title-4);
      }
      ::slotted(h5) {
        font: var(--semantics-content-lg-title-5);
      }
      ::slotted(h6) {
        font: var(--semantics-content-lg-title-6);
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
