/**
 * RegelRecht One Third Two Thirds Section Component (Lit + TypeScript)
 *
 * A split layout section with a 1/3 aside on the left and 2/3 main content on the right.
 * Stacks vertically on small screens.
 *
 * @element rr-one-third-two-thirds-section
 * @attr {string} container - Container size: 'sm' | 'md' | 'lg' (default: 'md')
 *
 * @slot - Default slot for main content
 * @slot aside - Slot for aside content (left column)
 *
 * @csspart section - The section container
 * @csspart body - The section body
 * @csspart main - The main content area
 * @csspart aside - The aside content area
 *
 * @cssprop --rr-section-gap - Override gap between sections
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sectionSharedStyles } from '../section-shared-styles.js';

type Container = 'sm' | 'md' | 'lg';

@customElement('rr-one-third-two-thirds-section')
export class RROneThirdTwoThirdsSection extends LitElement {
  static override styles = [
    sectionSharedStyles,
    css`
      .section__body {
        flex-direction: row;
      }

      .section__aside {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .section__main {
        flex: 2;
      }

      @media (max-width: 768px) {
        .section__body {
          flex-direction: column;
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  container: Container = 'md';

  override render() {
    return html`
      <section class="section" part="section">
        <div class="section__body" part="body">
          <aside class="section__aside" part="aside">
            <slot name="aside"></slot>
          </aside>
          <div class="section__main" part="main">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-one-third-two-thirds-section': RROneThirdTwoThirdsSection;
  }
}
