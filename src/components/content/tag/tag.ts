/**
 * Nederlandse Digitale Dienst Tag Component (Lit + TypeScript)
 *
 * Een compacte label voor categorieën, statussen of metadata. Niet interactief.
 * Voor interactieve chips (filter, dismiss) gebruik je <nldd-token>.
 *
 * @element nldd-tag
 * @attr {string} variant - Visuele variant: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' (default: 'neutral')
 * @attr {string} size - Tag grootte: 'sm' | 'md' (default: 'md')
 * @attr {string} text - Tag tekst (alternatief voor default slot)
 * @attr {string} icon - Icoon voor de tekst
 * @attr {string} accessible-label - Toegankelijk label voor screenreaders. Gebruik dit bij icon-only tags zonder zichtbare tekst.
 *
 * @slot - Tag tekst
 * @slot icon - Custom icoon voor de tekst
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tagStyles } from './tag.styles.js';
import { template } from './tag.template.js';
import './../icon/icon.js';

type Variant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md';

@customElement('nldd-tag')
export class NLDDTag extends LitElement {
	static override styles = tagStyles;

	@property({ type: String, reflect: true })
	variant: Variant = 'neutral';

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: String })
	text = '';

	@property({ type: String })
	icon = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-tag': NLDDTag;
	}
}
