/**
 * Nederlandse Digitale Dienst Step Indicator Component (Lit + TypeScript)
 *
 * Toont waar je staat in een proces van meerdere stappen: een rij bollen met
 * een cijfer (of een vinkje op wat af is), een label eronder en een lijn die
 * ze verbindt.
 *
 * De ouder houdt de waarheid vast: `current` (1-based) leidt de status van elk
 * kind af — ervoor `past`, daarna `future`. Een kind kan dat overschrijven met
 * een eigen `status`, voor flows die terugspringen of een stap overslaan.
 *
 * Alleen horizontaal. Wil je stappen onder elkaar, bouw dan een `nldd-list` met
 * per rij een `nldd-timeline-track-cell` en een `nldd-title-cell`: verticale
 * stappen dragen meestal meer dan een titel, en dat kan een lijstrij al.
 *
 * Onder de sm-breakpoint (container query, dus gemeten op het component zelf en
 * niet op de viewport) klapt het om naar één regel tekst plus een segmentbalk. De volledige stappenlijst blijft
 * dan in de DOM staan, alleen visueel verborgen, zodat hulpsoftware niet minder
 * te horen krijgt dan een breed scherm laat zien.
 *
 * Toegankelijkheid: een `nav` met een label, daarin een `role="list"` met per
 * stap een `role="listitem"`. De huidige stap krijgt `aria-current="step"` —
 * het enige begrip dat WAI-ARIA hiervoor kent. "Afgerond" en "nog te doen"
 * bestaan niet als ARIA-token en reizen daarom als visueel verborgen tekst mee.
 *
 * @element nldd-step-indicator
 *
 * @attr {string} accessible-label - Naam van de nav; standaard de i18n-waarde ("Voortgang")
 * @attr {object} translations - Overschrijf vertaalsleutels; niet gezette vallen terug op Nederlands
 * @attr {number} current - 1-based nummer van de huidige stap (standaard 1)
 *
 * @slot - `nldd-step-indicator-item` kinderen
 *
 * @example
 * ```html
 * <nldd-step-indicator current="2" accessible-label="Voortgang aanvraag">
 *   <nldd-step-indicator-item text="Gegevens"></nldd-step-indicator-item>
 *   <nldd-step-indicator-item text="Controle"></nldd-step-indicator-item>
 *   <nldd-step-indicator-item text="Bevestigen"></nldd-step-indicator-item>
 * </nldd-step-indicator>
 * ```
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { withTranslations } from '../../../utilities/with-translations.js';
import { nlddStepIndicatorTranslations, type NLDDStepIndicatorTranslations } from './step-indicator.i18n.js';
import { stepIndicatorStyles, stepIndicatorItemStyles } from './step-indicator.styles.js';
import { stepIndicatorTemplate, stepIndicatorItemTemplate } from './step-indicator.template.js';
import '../../content/icon/icon.js';

/** The same three names as nldd-timeline-track-cell, so one flow reads in a
 *  single vocabulary whether it runs horizontally or vertically. */
export type StepIndicatorStatus = 'past' | 'current' | 'future';


// # nldd-step-indicator-item

/**
 * Eén stap in een `nldd-step-indicator`. De ouder bepaalt de status en het
 * volgnummer; die staan hier als interne state en niet als publieke API, op
 * `status` na — dat overschrijft de afleiding uit `current`.
 *
 * @element nldd-step-indicator-item
 *
 * @attr {string} status - `past` | `current` | `future`; overschrijft wat de ouder afleidt
 * @attr {string} text   - Label onder de bol
 * @attr {string} icon   - Icoon in de bol in plaats van het cijfer of het vinkje
 * @attr {string} href   - Maakt de stap een link (bijvoorbeeld terug naar een afgeronde stap)
 * @attr {boolean} button - Maakt de stap een knop, voor flows zonder eigen URL per stap; genegeerd wanneer `href` is gezet
 *
 * @slot - Label (alternatief voor `text`)
 */
export class NLDDStepIndicatorItem extends LitElement {
	static override styles = stepIndicatorItemStyles;

	@property({ type: String, reflect: true })
	status?: StepIndicatorStatus;

	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	text = '';

	@property({ type: String })
	icon = '';

	@property({ type: String, reflect: true })
	href = '';

	/** For flows without a URL per step (a wizard inside one window). Ignored
	 *  once `href` is set: one step is one action, and a link outranks a button
	 *  -- the same rule as nldd-card and nldd-avatar. */
	@property({ type: Boolean, reflect: true })
	button = false;

	/** Set by the parent: the derived status when the item has none of its own,
	 *  the position number, and the status text for assistive tech. */
	@state()
	_derivedStatus: StepIndicatorStatus = 'future';

	@state()
	_index = 1;

	@state()
	_statusText = '';

	/** The status that counts: the item's own wins over the derived one. */
	get resolvedStatus(): StepIndicatorStatus {
		return this.status ?? this._derivedStatus;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		// Explicit ARIA, like nldd-breadcrumbs: the implicit <li> mapping does not
		// travel reliably across the slot boundary.
		if (!this.hasAttribute('role')) this.setAttribute('role', 'listitem');
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('status') || changed.has('_derivedStatus')) {
			// On the host (the listitem), because that is what assistive tech announces.
			if (this.resolvedStatus === 'current') this.setAttribute('aria-current', 'step');
			else this.removeAttribute('aria-current');
		}
	}

	override render() {
		return stepIndicatorItemTemplate(this);
	}
}

// Sub-component of nldd-step-indicator. The guard registration (like
// nldd-breadcrumbs-item's) keeps the first registration authoritative across HMR
// and test re-imports.
if (!customElements.get('nldd-step-indicator-item')) {
	customElements.define('nldd-step-indicator-item', NLDDStepIndicatorItem);
}


// # nldd-step-indicator

@customElement('nldd-step-indicator')
export class NLDDStepIndicator extends withTranslations<NLDDStepIndicatorTranslations>(
	LitElement,
	nlddStepIndicatorTranslations,
) {
	static override styles = stepIndicatorStyles;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Number, reflect: true })
	current = 1;

	/** The steps, tracked so the compact view (text + bar) is driven by the same
	 *  source as the row of markers. */
	@state()
	_items: NLDDStepIndicatorItem[] = [];

	get total(): number {
		return this._items.length;
	}

	/** The current step, clamped to the number of steps: an out-of-range
	 *  `current` would otherwise mark every step past (or none at all). */
	get resolvedCurrent(): number {
		if (this.total === 0) return this.current;
		return Math.min(Math.max(this.current, 1), this.total);
	}

	get currentItem(): NLDDStepIndicatorItem | undefined {
		return this._items.find(item => item.resolvedStatus === 'current')
			?? this._items[this.resolvedCurrent - 1];
	}

	_onSlotChange = (e: Event): void => {
		const slot = e.target as HTMLSlotElement;
		this._items = slot.assignedElements({ flatten: true })
			.filter((el): el is NLDDStepIndicatorItem => el.localName === 'nldd-step-indicator-item');
	};

	/** Before render, not after: the compact view reads the current item back out
	 *  of the children, so their statuses have to be fresh by the time this
	 *  element renders. */
	override willUpdate(changed: PropertyValues): void {
		if (changed.has('current') || changed.has('_items')) this._syncItems();
	}

	/** Push position, derived status and status text down to the children. Push
	 *  rather than pull: a child reading its own parent has no way of knowing
	 *  when `current` changes. */
	private _syncItems(): void {
		const current = this.resolvedCurrent;
		this._items.forEach((item, index) => {
			const position = index + 1;
			item._index = position;
			item._derivedStatus = position < current ? 'past' : position === current ? 'current' : 'future';
			item._statusText = this._t(`components.step-indicator.status-${item.resolvedStatus}-label`);
		});
	}

	override render() {
		return stepIndicatorTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-step-indicator': NLDDStepIndicator;
		'nldd-step-indicator-item': NLDDStepIndicatorItem;
	}
}
