/**
 * RegelRecht Container Component (Lit + TypeScript)
 *
 * Een generieke container met instelbare padding.
 * Padding kan worden ingesteld voor alle zijden tegelijk, per as (inline/block),
 * of per individuele zijde (top, right, bottom, left).
 * Specifiekere instellingen hebben voorrang: zijden > as > alle zijden.
 *
 * @element rr-container
 *
 * @attr {string} padding - Padding voor alle zijden
 * @attr {string} padding-inline - Padding voor links en rechts
 * @attr {string} padding-block - Padding voor boven en onder
 * @attr {string} padding-top - Padding voor boven
 * @attr {string} padding-right - Padding voor rechts
 * @attr {string} padding-bottom - Padding voor onder
 * @attr {string} padding-left - Padding voor links
 *
 * @slot - Inhoud van de container
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { containerStyles } from './rr-container.styles.ts';
import { containerTemplate } from './rr-container.template.ts';

type PaddingSize =
	| 'none'
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

@customElement('rr-container')
export class RRContainer extends LitElement {
	static override styles = containerStyles;

	@property({ type: String, reflect: true })
	padding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-inline' })
	paddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-block' })
	paddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-top' })
	paddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-right' })
	paddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-bottom' })
	paddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-left' })
	paddingLeft: PaddingSize | undefined = undefined;

	override render() {
		return containerTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-container': RRContainer;
	}
}
