/**
 * RegelRecht Lister Section Component (Lit + TypeScript)
 *
 * A section with a CSS grid layout for displaying card collections.
 *
 * @element rr-lister-section
 * @attr {string} container - Container size: 'sm' | 'md' | 'lg' (default: 'md')
 *
 * @slot - Default slot for grid items
 *
 * @csspart section - The section container
 * @csspart body - The section body
 * @csspart main - The main content area (grid)
 *
 * @cssprop --rr-section-gap - Override gap between sections
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sectionSharedStyles } from './section-shared-styles.js';

type Container = 'sm' | 'md' | 'lg';

@customElement('rr-lister-section')
export class RRListerSection extends LitElement {
  static override styles = [
    sectionSharedStyles,
    css`
      .section__main {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-lister-section': RRListerSection;
  }
}
