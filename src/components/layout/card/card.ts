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

	override connectedCallback() {
		super.connectedCallback();
		// Set container-type/name as inline style on the host. Doing this from
		// a `:host` rule inside the shadow DOM works in Chromium but Safari
		// does not always recognise the host as a container for slotted
		// descendants — a known engine inconsistency.
		//
		// We don't clear these on disconnect: a DOM move (disconnect →
		// reconnect) would just re-set them, and there's no scenario where the
		// styles being absent is meaningful. They are effectively part of the
		// element's identity, written once and kept.
		this.style.containerType = 'inline-size';
		this.style.containerName = 'layout-area';
	}

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
