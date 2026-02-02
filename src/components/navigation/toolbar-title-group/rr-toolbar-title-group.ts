/**
 * RegelRecht Toolbar Title Group Component (Lit + TypeScript)
 *
 * A title and subtitle group for use within toolbars.
 *
 * @element rr-toolbar-title-group
 * @attr {string} size - Group size: 's' | 'm' (default: 'm')
 * @attr {string} align - Text alignment: 'left' | 'center' (default: 'left')
 * @attr {string} title - The main title text
 * @attr {string} subtitle - The optional subtitle text
 *
 * @slot title - Slot for custom title content
 * @slot subtitle - Slot for custom subtitle content
 *
 * @csspart group - The outer container
 * @csspart inner - The inner container
 * @csspart title - The title element
 * @csspart subtitle - The subtitle element
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 's' | 'm';
type Align = 'left' | 'center';

@customElement('rr-toolbar-title-group')
export class RRToolbarTitleGroup extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      flex-direction: column;
      font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .title-group {
      display: flex;
      flex-direction: column;
      align-self: stretch;
    }

    .title-group__inner {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Size: M (default) - height 44px */
    :host([size="m"]) .title-group__inner,
    :host(:not([size])) .title-group__inner {
      height: 44px;
    }

    /* Size: S - height 32px */
    :host([size="s"]) .title-group__inner {
      height: 32px;
    }

    /* Alignment: Center */
    :host([align="center"]) .title-group {
      align-items: center;
    }

    :host([align="center"]) .title-group__inner {
      align-items: center;
    }

    /* Title styles */
    .title-group__title {
      display: flex;
      flex-direction: column;
      color: var(--semantics-content-color);
      margin: 0;
    }

    /* Size: M title - 20px bold */
    :host([size="m"]) .title-group__title,
    :host(:not([size])) .title-group__title {
      font: var(--primitives-body-l-bold-flat);
      font-weight: 550;
    }

    /* Size: S title - 16px bold */
    :host([size="s"]) .title-group__title {
      font: var(--primitives-body-s-bold-flat);
      font-weight: 550;
    }

    /* Subtitle styles */
    .title-group__subtitle {
      display: flex;
      flex-direction: column;
      color: var(--semantics-content-color);
      margin: 0;
    }

    /* Size: M subtitle - 14px regular */
    :host([size="m"]) .title-group__subtitle,
    :host(:not([size])) .title-group__subtitle {
      font: var(--primitives-body-xs-regular-flat);
    }

    /* Size: S subtitle - 12px regular */
    :host([size="s"]) .title-group__subtitle {
      font-size: 12px;
      font-weight: 400;
      line-height: 1.125;
    }

    /* Text alignment */
    :host([align="center"]) .title-group__title,
    :host([align="center"]) .title-group__subtitle {
      text-align: center;
    }

    :host([align="left"]) .title-group__title,
    :host([align="left"]) .title-group__subtitle,
    :host(:not([align])) .title-group__title,
    :host(:not([align])) .title-group__subtitle {
      text-align: left;
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'm';

  @property({ type: String, reflect: true })
  align: Align = 'left';

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  override render() {
    const hasTitle = this.title || this.querySelector('[slot="title"]');
    const hasSubtitle = this.subtitle || this.querySelector('[slot="subtitle"]');

    return html`
      <div class="title-group" part="group">
        <div class="title-group__inner" part="inner">
          ${hasTitle ? html`
            <div class="title-group__title" part="title">
              <slot name="title">${this.title}</slot>
            </div>
          ` : nothing}
          ${hasSubtitle ? html`
            <div class="title-group__subtitle" part="subtitle">
              <slot name="subtitle">${this.subtitle}</slot>
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-toolbar-title-group': RRToolbarTitleGroup;
  }
}
