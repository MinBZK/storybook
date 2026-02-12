/**
 * RegelRecht Input Field Button Component (Lit + TypeScript)
 *
 * A button designed to be used inside input fields (e.g., decrease/increase in number-field).
 * Wraps rr-icon-button (type=icon) or rr-button (type=text) with neutral-tinted styling.
 *
 * Matches Figma component "input-field-button" (node 272:353).
 *
 * @element rr-input-field-button
 * @attr {string} type - Button type: 'icon' | 'text'
 * @attr {boolean} disabled - Disabled state
 * @attr {string} label - Accessible label
 *
 * @slot - Default slot for icon content (type=icon) or text content (type=text)
 *
 * @fires click - When button is clicked
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../actions/button/rr-button.ts';
import '../../actions/icon-button/rr-icon-button.ts';

type InputFieldButtonType = 'icon' | 'text';

@customElement('rr-input-field-button')
export class RRInputFieldButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: var(--semantics-controls-md-min-size);
    }

    :host([hidden]) {
      display: none;
    }

    /*
     * Token compat: components use old s/m naming, tokens define sm/md.
     * Both button types: sm height (32px), sm corner-radius (6px).
     * Icon button uses size=s, text button uses size=xs (with sm height override).
     */
    rr-icon-button {
      --semantics-controls-sm-min-size: var(--semantics-controls-sm-min-size);
      --semantics-controls-sm-corner-radius: var(--semantics-controls-sm-corner-radius);
    }

    rr-button {
      --semantics-controls-xs-min-size: var(--semantics-controls-sm-min-size);
      --semantics-controls-xs-corner-radius: var(--semantics-controls-sm-corner-radius);
    }
  `;

  @property({ type: String, reflect: true })
  type: InputFieldButtonType = 'icon';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  label = '';

  override render() {
    if (this.type === 'text') {
      return html`
        <rr-button
          variant="neutral-tinted"
          size="xs"
          ?disabled=${this.disabled}
        >
          <slot>Button</slot>
        </rr-button>
      `;
    }

    return html`
      <rr-icon-button
        variant="neutral-tinted"
        size="s"
        label=${this.label || 'input-field-button'}
        ?disabled=${this.disabled}
      >
        <slot></slot>
      </rr-icon-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-input-field-button': RRInputFieldButton;
  }
}
