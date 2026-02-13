/**
 * RegelRecht Section Component (Lit + TypeScript)
 *
 * A flexible section component for page layouts with responsive padding.
 * Supports various layout types: simple, full-bleed, and split layouts.
 *
 * @element rr-section
 * @attr {string} container - Container size: 'sm' | 'md' | 'lg' (default: 'md')
 * @attr {string} variant - Section variant: 'simple' | 'full-bleed' | 'one-third-two-thirds' | 'two-thirds-one-third' | 'half-half' | 'lister' (default: 'simple')
 *
 * @slot - Default slot for main content
 * @slot aside - Slot for aside content (split layouts only)
 *
 * @csspart section - The section container
 * @csspart body - The section body
 * @csspart main - The main content area
 * @csspart aside - The aside content area (split layouts only)
 *
 * @cssprop --rr-section-gap - Override gap between sections
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Container = 'sm' | 'md' | 'lg';
type Variant = 'simple' | 'full-bleed' | 'one-third-two-thirds' | 'two-thirds-one-third' | 'half-half' | 'lister';

@customElement('rr-section')
export class RRSection extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .section {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
    }

    .section__body {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .section__main {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .section__aside {
      display: flex;
      flex-direction: column;
    }

    /* Container: SM */
    :host([container='sm']) .section {
      padding: 16px;
    }

    :host([container='sm']) .section__body {
      gap: var(--rr-section-gap, 16px);
    }

    /* Container: MD (default) */
    :host([container='md']) .section,
    :host(:not([container])) .section {
      padding: 24px 32px;
    }

    :host([container='md']) .section__body,
    :host(:not([container])) .section__body {
      gap: var(--rr-section-gap, 24px);
    }

    /* Container: LG */
    :host([container='lg']) .section {
      padding: 32px 48px;
    }

    :host([container='lg']) .section__body {
      gap: var(--rr-section-gap, 24px);
    }

    /* Full-bleed variant */
    :host([variant='full-bleed']) .section {
      padding-left: 0;
      padding-right: 0;
    }

    /* Split layout variants */
    :host([variant='one-third-two-thirds']) .section__body,
    :host([variant='two-thirds-one-third']) .section__body,
    :host([variant='half-half']) .section__body {
      flex-direction: row;
    }

    :host([variant='one-third-two-thirds']) .section__aside {
      flex: 1;
    }

    :host([variant='one-third-two-thirds']) .section__main {
      flex: 2;
    }

    :host([variant='two-thirds-one-third']) .section__main {
      flex: 2;
    }

    :host([variant='two-thirds-one-third']) .section__aside {
      flex: 1;
    }

    :host([variant='half-half']) .section__main,
    :host([variant='half-half']) .section__aside {
      flex: 1;
    }

    /* Lister variant - columns for card grids */
    :host([variant='lister']) .section__main {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }

    /* Hide aside for non-split variants */
    :host(:not([variant='one-third-two-thirds']):not([variant='two-thirds-one-third']):not([variant='half-half']))
      .section__aside {
      display: none;
    }

    /* Responsive: Stack split layouts on small screens */
    @media (max-width: 768px) {
      :host([variant='one-third-two-thirds']) .section__body,
      :host([variant='two-thirds-one-third']) .section__body,
      :host([variant='half-half']) .section__body {
        flex-direction: column;
      }
    }
  `;

  @property({ type: String, reflect: true })
  container: Container = 'md';

  @property({ type: String, reflect: true })
  variant: Variant = 'simple';

  private _isSplitLayout(): boolean {
    return ['one-third-two-thirds', 'two-thirds-one-third', 'half-half'].includes(this.variant);
  }

  override render() {
    return html`
      <section class="section" part="section">
        <div class="section__body" part="body">
          ${this._isSplitLayout() && this.variant.startsWith('one-third')
            ? html`
                <aside class="section__aside" part="aside">
                  <slot name="aside"></slot>
                </aside>
              `
            : nothing}
          <div class="section__main" part="main">
            <slot></slot>
          </div>
          ${this._isSplitLayout() && !this.variant.startsWith('one-third')
            ? html`
                <aside class="section__aside" part="aside">
                  <slot name="aside"></slot>
                </aside>
              `
            : nothing}
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-section': RRSection;
  }
}
