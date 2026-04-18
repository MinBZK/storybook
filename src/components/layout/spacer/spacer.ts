/**
 * Nederlandse Digitale Dienst Spacer Component (Lit + TypeScript)
 *
 * @element nldd-spacer
 *
 * @attr {string} size - Spacer size: 'flexible' | 'md' | fixed values (2–96)
 * @attr {string} direction - Direction: 'horizontal' | 'vertical' | 'both'
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { spacerStyles } from './spacer.styles.ts';

type SpacerSize =
	| 'flexible'
	| 'md'
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
type Direction = 'horizontal' | 'vertical' | 'both';

@customElement('nldd-spacer')
export class NLDDSpacer extends LitElement {
	static override styles = spacerStyles;

	@property({ type: String, reflect: true })
	size: SpacerSize = '16';

	@property({ type: String, reflect: true })
	direction: Direction = 'both';
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-spacer': NLDDSpacer;
	}
}
