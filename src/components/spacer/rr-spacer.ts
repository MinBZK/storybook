/**
 * RegelRecht Spacer Component (Lit + TypeScript)
 *
 * @element rr-spacer
 * @attr {string} size - Spacer size: fixed values (2-96), 'm' (responsive), or 'flexible'
 * @attr {string} container - Container size for responsive 'm' size: 's' | 'm' | 'l' | 'all'
 * @attr {string} direction - Direction: 'horizontal' | 'vertical' | 'both'
 */

import { LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type FixedSize =
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
  | '96';
type SpacerSize = FixedSize | 'm' | 'flexible';
type ContainerSize = 's' | 'm' | 'l' | 'all';
type Direction = 'horizontal' | 'vertical' | 'both';

@customElement('rr-spacer')
export class RRSpacer extends LitElement {
  static override styles = css`
    :host {
      display: block;
      flex-shrink: 0;
    }

    :host([hidden]) {
      display: none;
    }

    /* Flexible size - fills available space */
    :host([size='flexible']) {
      flex: 1;
      min-width: 0;
      min-height: 0;
    }

    /* Fixed sizes using primitives tokens */
    :host([size='2']) {
      width: var(--primitives-space-2, 2px);
      height: var(--primitives-space-2, 2px);
    }

    :host([size='4']) {
      width: var(--primitives-space-4, 4px);
      height: var(--primitives-space-4, 4px);
    }

    :host([size='6']) {
      width: var(--primitives-space-6, 6px);
      height: var(--primitives-space-6, 6px);
    }

    :host([size='8']),
    :host(:not([size])) {
      width: var(--primitives-space-8, 8px);
      height: var(--primitives-space-8, 8px);
    }

    :host([size='10']) {
      width: var(--primitives-space-10, 10px);
      height: var(--primitives-space-10, 10px);
    }

    :host([size='12']) {
      width: var(--primitives-space-12, 12px);
      height: var(--primitives-space-12, 12px);
    }

    :host([size='16']) {
      width: var(--primitives-space-16, 16px);
      height: var(--primitives-space-16, 16px);
    }

    :host([size='20']) {
      width: var(--primitives-space-20, 20px);
      height: var(--primitives-space-20, 20px);
    }

    :host([size='24']) {
      width: var(--primitives-space-24, 24px);
      height: var(--primitives-space-24, 24px);
    }

    :host([size='28']) {
      width: var(--primitives-space-28, 28px);
      height: var(--primitives-space-28, 28px);
    }

    :host([size='32']) {
      width: var(--primitives-space-32, 32px);
      height: var(--primitives-space-32, 32px);
    }

    :host([size='40']) {
      width: var(--primitives-space-40, 40px);
      height: var(--primitives-space-40, 40px);
    }

    :host([size='44']) {
      width: var(--primitives-space-44, 44px);
      height: var(--primitives-space-44, 44px);
    }

    :host([size='48']) {
      width: var(--primitives-space-48, 48px);
      height: var(--primitives-space-48, 48px);
    }

    :host([size='56']) {
      width: var(--primitives-space-56, 56px);
      height: var(--primitives-space-56, 56px);
    }

    :host([size='64']) {
      width: var(--primitives-space-64, 64px);
      height: var(--primitives-space-64, 64px);
    }

    :host([size='80']) {
      width: var(--primitives-space-80, 80px);
      height: var(--primitives-space-80, 80px);
    }

    :host([size='96']) {
      width: var(--primitives-space-96, 96px);
      height: var(--primitives-space-96, 96px);
    }

    /* Container-responsive 'm' size */
    :host([size='m']),
    :host([size='m'][container='s']),
    :host([size='m'][container='all']) {
      width: var(--primitives-space-16, 16px);
      height: var(--primitives-space-16, 16px);
    }

    :host([size='m'][container='m']),
    :host([size='m'][container='l']) {
      width: var(--primitives-space-24, 24px);
      height: var(--primitives-space-24, 24px);
    }

    /* Direction modifiers */
    :host([direction='horizontal']) {
      height: auto;
    }

    :host([direction='vertical']) {
      width: auto;
    }

    /* Flexible with direction */
    :host([size='flexible'][direction='horizontal']) {
      height: auto;
      min-height: auto;
    }

    :host([size='flexible'][direction='vertical']) {
      width: auto;
      min-width: auto;
    }
  `;

  @property({ type: String, reflect: true })
  size: SpacerSize = '8';

  @property({ type: String, reflect: true })
  container: ContainerSize = 'all';

  @property({ type: String, reflect: true })
  direction: Direction = 'both';
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-spacer': RRSpacer;
  }
}
