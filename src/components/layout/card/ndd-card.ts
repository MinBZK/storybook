/**
 * Nederlandse Digitale Dienst Card Component (Lit + TypeScript)
 *
 * Een visueel afgebakende kaart met optionele header, body en footer secties.
 * De kaart heeft een elevated look als standaard. Padding wordt overgelaten
 * aan geneste containers.
 *
 * @element ndd-card
 *
 * @slot header - Header-content (bijv. ndd-title)
 * @slot - Body-content
 * @slot footer - Footer-content (bijv. ndd-button-group) — altijd aan onderkant
 */

import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cardStyles } from './ndd-card.styles.ts';
import { cardTemplate } from './ndd-card.template.ts';

@customElement('ndd-card')
export class NDDCard extends LitElement {
	static override styles = cardStyles;

	_onSlotChange(e: Event) {
		const slot = e.target as HTMLSlotElement;
		const wrapper = slot.parentElement as HTMLElement;
		wrapper.hidden = slot.assignedElements().length === 0;
	}

	override render() {
		return cardTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-card': NDDCard;
	}
}
