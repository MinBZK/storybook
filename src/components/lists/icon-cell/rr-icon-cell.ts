/**
 * RegelRecht Icon Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying icons in lists with configurable
 * alignment and size. Accepts an icon via the default slot.
 *
 * @element rr-icon-cell
 * @attr {string} size - Icon size: '16' | '20' | '24' | '32' (default: '24')
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' (default: 'center')
 *
 * @slot - Default slot for icon content (SVG or img)
 *
 * @csspart icon - The icon container
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type IconSize = '16' | '20' | '24' | '32';
type VerticalAlignment = 'top' | 'center';

@customElement('rr-icon-cell')
export class RRIconCell extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--semantics-content-color);
    }

    :host([hidden]) {
      display: none;
    }

    /* Vertical alignment: center (default) */
    :host([vertical-alignment="center"]),
    :host(:not([vertical-alignment])) {
      justify-content: center;
    }

    /* Vertical alignment: top */
    :host([vertical-alignment="top"]) {
      justify-content: flex-start;
    }

    /* Icon sizing via slotted content */
    ::slotted(*) {
      display: block;
      flex-shrink: 0;
    }

    /* Size: 16 */
    :host([size="16"]) ::slotted(*) {
      width: 16px;
      height: 16px;
    }

    /* Size: 20 */
    :host([size="20"]) ::slotted(*) {
      width: 20px;
      height: 20px;
    }

    /* Size: 24 (default) */
    :host([size="24"]) ::slotted(*),
    :host(:not([size])) ::slotted(*) {
      width: 24px;
      height: 24px;
    }

    /* Size: 32 */
    :host([size="32"]) ::slotted(*) {
      width: 32px;
      height: 32px;
    }
  `;

  @property({ type: String, reflect: true })
  size: IconSize = '24';

  @property({ type: String, reflect: true, attribute: 'vertical-alignment' })
  verticalAlignment: VerticalAlignment = 'center';

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-icon-cell': RRIconCell;
  }
}
