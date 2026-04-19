/**
 * Nederlandse Digitale Dienst Card Component (Lit + TypeScript)
 *
 * Een visueel afgebakende kaart met optionele header, body en footer secties.
 * De kaart heeft een elevated look als standaard. Padding wordt overgelaten
 * aan geneste containers.
 *
 * @element nldd-card
 *
 * @attr {string} accessible-label - Toegankelijke naam voor de kaart (aria-label)
 *
 * @slot header - Header-content (bijv. nldd-title)
 * @slot - Body-content
 * @slot footer - Footer-content (bijv. nldd-button-group) — altijd aan onderkant
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cardStyles } from './card.styles.js';
import { cardTemplate } from './card.template.js';

@customElement('nldd-card')
export class NLDDCard extends LitElement {
	static override styles = cardStyles;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel: string | undefined;

	_onSlotChange = (e: Event): void => {
		const slot = e.target as HTMLSlotElement;
		const wrapper = slot.parentElement as HTMLElement;
		wrapper.hidden = slot.assignedElements().length === 0;
	};

	override render() {
		return cardTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-card': NLDDCard;
	}
}
