/**
 * Nederlandse Digitale Dienst Card Component (Lit + TypeScript)
 *
 * Een visueel afgebakende kaart met optionele header, body en footer secties.
 * De kaart heeft een elevated look als standaard. Padding wordt overgelaten
 * aan geneste containers.
 *
 * Met `href` wordt de hele kaart een link (een overlay-anchor over de kaart);
 * met `button` een knop (een overlay-button die een gewone, composed `click`
 * geeft — een klik-listener of htmx-attribuut op de kaart zelf werkt dus direct,
 * en Enter/Space doen het native). `href` wint als beide gezet zijn. Geneste
 * interactieve content (bijv. footer-knoppen) moet je erboven tillen met
 * `position: relative; z-index: 1` om klikbaar te blijven.
 *
 * @element nldd-card
 *
 * @attr {'base'|'tinted'} background - Vlakkleur van de kaart: `base` (standaard) op een gewone pagina-achtergrond, `tinted` wanneer de kaart juist mag opvallen tegen een base-surface
 * @attr {string} accessible-label - Toegankelijke naam van de kaart; bij `href`/`button` benoemt deze de link of knop, anders de kaart-region
 * @attr {string} href - Maakt de hele kaart een link naar deze URL (leeg = geen link)
 * @attr {boolean} button - Maakt de hele kaart een knop; genegeerd wanneer `href` is gezet
 * @attr {string} target - Link target voor href (bijv. '_blank'); stelt rel automatisch bij en voegt bij '_blank' een "Opent in nieuw tabblad"-melding toe
 * @attr {string} rel - Link rel voor href; standaard 'noopener noreferrer' bij target='_blank'
 * @attr {object} translations - Overschrijf vertaalsleutels (bijv. de "Opent in nieuw tabblad"-melding)
 *
 * @slot header - Header-content (bijv. nldd-title)
 * @slot - Body-content
 * @slot footer - Footer-content (bijv. nldd-button-group) — altijd aan onderkant
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { cardStyles } from './card.styles.js';
import { cardTemplate } from './card.template.js';
import { withTranslations } from '../../../utilities/with-translations.js';
import { nlddCardTranslations } from './card.i18n.js';

export type CardBackground = 'base' | 'tinted';

@customElement('nldd-card')
export class NLDDCard extends withTranslations(LitElement, nlddCardTranslations) {
	static override styles = cardStyles;

	@property({ reflect: true, converter: reflectNonDefault<CardBackground>('base') })
	background: CardBackground = 'base';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel: string | undefined;

	/** When set, the whole card becomes one link to this URL via an overlay anchor.
	 *  Nested interactive content must be raised above it (position: relative;
	 *  z-index: 1) to stay clickable. */
	@property({ type: String, reflect: true })
	href = '';

	/** Makes the whole card a button via an overlay `<button>`: activation (click,
	 *  Enter, Space) surfaces as a composed `click` on the host, so a listener or
	 *  htmx attribute on the card just works. Ignored when `href` is set — a card
	 *  is one action, and a link outranks a button. */
	@property({ type: Boolean, reflect: true })
	button = false;

	@property({ type: String })
	target = '';

	@property({ type: String })
	rel = '';

	/** Resolve rel for the overlay link: add noopener noreferrer for _blank
	 *  (mirrors nldd-link), merged with any consumer-set rel. */
	_resolvedRel(): string {
		const base = this.rel ?? '';
		if (this.target !== '_blank') return base;
		const parts = new Set(base.split(/\s+/).filter(Boolean));
		parts.add('noopener');
		parts.add('noreferrer');
		return [...parts].join(' ');
	}

	private _warnedLabel = false;

	/** True while the card's own overlay control holds keyboard focus. Drives the
	 *  focus ring from JS rather than from `:has(… :focus-visible)` in CSS:
	 *  Safari does not re-evaluate a dynamic pseudo-class inside `:has()`, so the
	 *  ring stayed away there while it worked in Chromium. */
	@state()
	private _actionFocused = false;

	private _onFocusIn = (e: FocusEvent): void => {
		// composedPath()[0], not e.target: the control lives in the shadow root, so
		// the event is retargeted to the host by the time it reaches this listener.
		const focused = e.composedPath()[0] as Element | undefined;
		this._actionFocused = !!focused?.matches?.('.card__action:focus-visible');
	};

	private _onFocusOut = (): void => {
		this._actionFocused = false;
	};

	override connectedCallback() {
		super.connectedCallback();
		// Set container-type/name as inline style on the host. Doing this from
		// a `:host` rule inside the shadow DOM works in Chromium but Safari
		// does not always recognize the host as a container for slotted
		// descendants — a known engine inconsistency.
		//
		// We don't clear these on disconnect: a DOM move (disconnect →
		// reconnect) would just re-set them, and there's no scenario where the
		// styles being absent is meaningful. They are effectively part of the
		// element's identity, written once and kept.
		this.addEventListener('focusin', this._onFocusIn);
		this.addEventListener('focusout', this._onFocusOut);
		this.style.containerType = 'inline-size';
		this.style.containerName = 'layout-container';
	}

	override updated(): void {
		this.classList.toggle('is-action-focused', this._actionFocused);
		// An interactive card with no accessible name is a silent a11y failure —
		// the overlay control has no text. Warn once in dev (like nldd-image does
		// for alt); stay quiet in production.
		if (import.meta.env?.DEV) {
			const missing = (!!this.href || this.button) && !(this.accessibleLabel ?? '').trim();
			if (missing && !this._warnedLabel) {
				this._warnedLabel = true;
				console.warn('<nldd-card>: a card with `href` or `button` needs `accessible-label` so the control has an accessible name.');
			} else if (!missing) {
				this._warnedLabel = false;
			}
		}
	}

	_onSlotChange = (e: Event): void => {
		const slot = e.target as HTMLSlotElement;
		const wrapper = slot.parentElement as HTMLElement;
		wrapper.hidden = slot.assignedElements().length === 0;
	};

	override disconnectedCallback() {
		this.removeEventListener('focusin', this._onFocusIn);
		this.removeEventListener('focusout', this._onFocusOut);
		super.disconnectedCallback();
	}

	override render() {
		return cardTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-card': NLDDCard;
	}
}
