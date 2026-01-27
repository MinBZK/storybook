/**
 * RegelRecht Box Component (Lit + TypeScript)
 *
 * @element rr-box
 * @attr {string} padding - Override padding value (e.g., "24px", "1rem")
 * @attr {string} radius - Override border-radius value (e.g., "8px", "0.5rem")
 *
 * @slot - Default slot for box content
 *
 * @csspart container - The main container element
 *
 * @cssprop --rr-box-background-color - Override background color
 * @cssprop --rr-box-corner-radius - Override border radius
 * @cssprop --rr-box-padding - Override padding
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('rr-box')
export class RRBox extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .container {
      /* Use component tokens with custom property overrides */
      background-color: var(--rr-box-background-color, var(--components-box-background-color, #f1f5f9));
      border-radius: var(--rr-box-corner-radius, var(--_border-radius, var(--components-box-corner-radius, 11px)));
      padding: var(--rr-box-padding, var(--_padding, var(--components-box-padding, 16px)));

      /* Allow content to flow naturally */
      box-sizing: border-box;
    }
  `;

  @property({ type: String })
  padding: string | null = null;

  @property({ type: String })
  radius: string | null = null;

  override render() {
    const styles: Record<string, string> = {};

    if (this.padding) {
      styles['--_padding'] = this.padding;
    }
    if (this.radius) {
      styles['--_border-radius'] = this.radius;
    }

    return html`
      <div class="container" part="container" style=${styleMap(styles)}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-box': RRBox;
  }
}
