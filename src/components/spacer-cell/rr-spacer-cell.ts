/**
 * RegelRecht Spacer Cell Component (Lit + TypeScript)
 *
 * A wrapper cell component that contains a spacer, used within list items
 * to provide consistent spacing in start/end areas.
 *
 * @element rr-spacer-cell
 * @attr {string} size - Spacer size passed through to inner rr-spacer
 * @attr {string} container - Container size passed through to inner rr-spacer
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../spacer/rr-spacer.ts';

type SpacerSize =
  | '2'
  | '4'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '40'
  | '44'
  | '48'
  | '56'
  | '64'
  | '80'
  | '96'
  | 'm'
  | 'flexible';
type ContainerSize = 's' | 'm' | 'l' | 'all';

@customElement('rr-spacer-cell')
export class RRSpacerCell extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }

    :host([hidden]) {
      display: none;
    }
  `;

  @property({ type: String, reflect: true })
  size: SpacerSize = '16';

  @property({ type: String, reflect: true })
  container: ContainerSize = 'all';

  override render() {
    return html`<rr-spacer
      size=${this.size}
      container=${this.container}
    ></rr-spacer>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-spacer-cell': RRSpacerCell;
  }
}
