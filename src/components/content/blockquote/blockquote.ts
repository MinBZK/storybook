/**
 * Nederlandse Digitale Dienst Blockquote Component (Lit + TypeScript)
 *
 * Toont een citaat met optionele bron-attributie.
 *
 * @element nldd-blockquote
 * @attr {string} cite - URL van de bron (wordt doorgegeven aan het <blockquote> element)
 *
 * @slot - De citaat-tekst
 * @slot attribution - Optionele bronvermelding (auteur, titel, etc.)
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { blockquoteStyles } from './blockquote.styles.js';
import { template } from './blockquote.template.js';

@customElement('nldd-blockquote')
export class NLDDBlockquote extends LitElement {
	static override styles = blockquoteStyles;

	@property({ type: String })
	cite: string | undefined = undefined;

	@state()
	_hasAttribution = false;

	/** @internal */
	_handleAttributionSlotChange = (e: Event): void => {
		const slot = e.target as HTMLSlotElement;
		this._hasAttribution = slot.assignedNodes({ flatten: true }).some(n => {
			if (n.nodeType === Node.ELEMENT_NODE) return true;
			return (n.textContent ?? '').trim().length > 0;
		});
	};

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-blockquote': NLDDBlockquote;
	}
}
