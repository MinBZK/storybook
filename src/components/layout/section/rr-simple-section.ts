/**
 * RegelRecht Simple Section Component (Lit + TypeScript)
 *
 * A basic section with responsive container padding.
 *
 * @element rr-simple-section
 * @attr {string} container - Container size: 'sm' | 'md' | 'lg' (default: 'md')
 *
 * @slot - Default slot for content
 *
 * @csspart section - The section container
 * @csspart body - The section body
 * @csspart main - The main content area
 *
 * @cssprop --rr-section-gap - Override gap between sections
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sectionSharedStyles } from './section-shared-styles.js';

type Container = 'sm' | 'md' | 'lg';

@customElement('rr-simple-section')
export class RRSimpleSection extends LitElement {
  static override styles = [sectionSharedStyles];

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
    'rr-simple-section': RRSimpleSection;
  }
}
