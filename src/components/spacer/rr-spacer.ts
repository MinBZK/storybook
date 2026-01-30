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
      width: var(--primitives-space-2);
      height: var(--primitives-space-2);
    }

    :host([size='4']) {
      width: var(--primitives-space-4);
      height: var(--primitives-space-4);
    }

    :host([size='6']) {
      width: var(--primitives-space-6);
      height: var(--primitives-space-6);
    }

    :host([size='8']),
    :host(:not([size])) {
      width: var(--primitives-space-8);
      height: var(--primitives-space-8);
    }

    :host([size='10']) {
      width: var(--primitives-space-10);
      height: var(--primitives-space-10);
    }

    :host([size='12']) {
      width: var(--primitives-space-12);
      height: var(--primitives-space-12);
    }

    :host([size='16']) {
      width: var(--primitives-space-16);
      height: var(--primitives-space-16);
    }

    :host([size='20']) {
      width: var(--primitives-space-20);
      height: var(--primitives-space-20);
    }

    :host([size='24']) {
      width: var(--primitives-space-24);
      height: var(--primitives-space-24);
    }

    :host([size='28']) {
      width: var(--primitives-space-28);
      height: var(--primitives-space-28);
    }

    :host([size='32']) {
      width: var(--primitives-space-32);
      height: var(--primitives-space-32);
    }

    :host([size='40']) {
      width: var(--primitives-space-40);
      height: var(--primitives-space-40);
    }

    :host([size='44']) {
      width: var(--primitives-space-44);
      height: var(--primitives-space-44);
    }

    :host([size='48']) {
      width: var(--primitives-space-48);
      height: var(--primitives-space-48);
    }

    :host([size='56']) {
      width: var(--primitives-space-56);
      height: var(--primitives-space-56);
    }

    :host([size='64']) {
      width: var(--primitives-space-64);
      height: var(--primitives-space-64);
    }

    :host([size='80']) {
      width: var(--primitives-space-80);
      height: var(--primitives-space-80);
    }

    :host([size='96']) {
      width: var(--primitives-space-96);
      height: var(--primitives-space-96);
    }

    /* Container-responsive 'm' size */
    :host([size='m']),
    :host([size='m'][container='s']),
    :host([size='m'][container='all']) {
      width: var(--primitives-space-16);
      height: var(--primitives-space-16);
    }

    :host([size='m'][container='m']),
    :host([size='m'][container='l']) {
      width: var(--primitives-space-24);
      height: var(--primitives-space-24);
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
