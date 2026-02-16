/**
 * RegelRecht One Half One Half Section Component (Lit + TypeScript)
 *
 * A split layout section with two equal-width columns.
 * Stacks vertically on small screens.
 *
 * @element rr-one-half-one-half-section
 * @attr {string} container - Container size: 'sm' | 'md' | 'lg' (default: 'md')
 *
 * @slot - Default slot for main content (left column)
 * @slot aside - Slot for aside content (right column)
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
import { sectionSharedStyles } from './section-shared-styles.js';

type Container = 'sm' | 'md' | 'lg';

@customElement('rr-one-half-one-half-section')
export class RROneHalfOneHalfSection extends LitElement {
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
        flex: 1;
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
          <div class="section__main" part="main">
            <slot></slot>
          </div>
          <aside class="section__aside" part="aside">
            <slot name="aside"></slot>
          </aside>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-one-half-one-half-section': RROneHalfOneHalfSection;
  }
}
