/**
 * RegelRecht Document Tab Bar Item Component (Lit + TypeScript)
 *
 * A tab item with title, subtitle, and dismiss button for document tab bars.
 *
 * @element rr-document-tab-bar-item
 * @attr {boolean} selected - Selected state
 * @attr {boolean} disabled - Disabled state
 * @attr {string} subtitle - Subtitle text
 *
 * @slot - Default slot for title text
 *
 * @fires select - When tab is selected
 * @fires dismiss - When dismiss button is clicked
 *
 * @csspart item - The tab bar item container
 * @csspart title - The title element
 * @csspart subtitle - The subtitle element
 * @csspart dismiss - The dismiss button
 */

import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const dismissIcon = svg`
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 5.586L11.293 1.293L12.707 2.707L8.414 7L12.707 11.293L11.293 12.707L7 8.414L2.707 12.707L1.293 11.293L5.586 7L1.293 2.707L2.707 1.293L7 5.586Z"/>
  </svg>
`;

@customElement('rr-document-tab-bar-item')
export class RRDocumentTabBarItem extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .document-tab-bar-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--primitives-space-6);
      padding: var(--primitives-space-6) var(--primitives-space-6) var(--primitives-space-6) var(--primitives-space-10);
      background-color: var(--primitives-color-neutral-100);
      border-radius: var(--semantics-controls-md-corner-radius);
      cursor: pointer;
      box-sizing: border-box;
      transition: background-color 0.15s ease;
    }

    .document-tab-bar-item:hover {
      background-color: var(--primitives-color-neutral-150);
    }

    :host([selected]) .document-tab-bar-item {
      background-color: var(--primitives-color-accent-750-reference);
    }

    :host([selected]) .document-tab-bar-item:hover {
      background-color: var(--primitives-color-accent-800);
    }

    .document-tab-bar-item__title-area {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .document-tab-bar-item__title {
      font: var(--components-document-tab-bar-tab-title-font);
      color: var(--primitives-color-neutral-900);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :host([selected]) .document-tab-bar-item__title {
      color: var(--primitives-color-neutral-0);
    }

    .document-tab-bar-item__subtitle {
      font: var(--primitives-font-body-xs-regular-flat);
      color: var(--primitives-color-neutral-650);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :host([selected]) .document-tab-bar-item__subtitle {
      color: var(--primitives-color-neutral-0);
    }

    .document-tab-bar-item__dismiss {
      appearance: none;
      border: none;
      background: none;
      padding: var(--primitives-space-8);
      margin: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: var(--primitives-corner-radius-sm);
      color: var(--primitives-color-neutral-600);
      flex-shrink: 0;
      transition: background-color 0.15s ease;
    }

    .document-tab-bar-item__dismiss:hover {
      background-color: var(--primitives-color-neutral-200);
    }

    :host([selected]) .document-tab-bar-item__dismiss {
      color: var(--primitives-color-neutral-0);
    }

    :host([selected]) .document-tab-bar-item__dismiss:hover {
      background-color: var(--primitives-color-accent-700);
    }

    .document-tab-bar-item__dismiss:focus-visible {
      box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
      outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
    }

    .document-tab-bar-item__dismiss svg {
      width: 14px;
      height: 14px;
    }

    /* Disabled state */
    :host([disabled]) .document-tab-bar-item {
      opacity: var(--primitives-opacity-disabled);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .document-tab-bar-item,
      .document-tab-bar-item__dismiss {
        transition: none;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  subtitle = '';

  private _handleClick = (): void => {
    if (this.disabled) return;
    this.selected = true;
    this.dispatchEvent(
      new CustomEvent('select', {
        bubbles: true,
        composed: true,
        detail: { item: this },
      })
    );
  };

  private _handleDismiss = (event: Event): void => {
    event.stopPropagation();
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('dismiss', {
        bubbles: true,
        composed: true,
        detail: { item: this },
      })
    );
  };

  override render() {
    return html`
      <div
        class="document-tab-bar-item"
        part="item"
        role="tab"
        aria-selected=${this.selected}
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${this._handleClick}
      >
        <div class="document-tab-bar-item__title-area">
          <div class="document-tab-bar-item__title" part="title">
            <slot></slot>
          </div>
          ${this.subtitle
            ? html`<div class="document-tab-bar-item__subtitle" part="subtitle">${this.subtitle}</div>`
            : ''}
        </div>
        <button
          class="document-tab-bar-item__dismiss"
          part="dismiss"
          aria-label="Sluiten"
          tabindex="-1"
          @click=${this._handleDismiss}
        >
          ${dismissIcon}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-document-tab-bar-item': RRDocumentTabBarItem;
  }
}
