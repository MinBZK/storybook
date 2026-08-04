/**
 * NLDD Design System Time Picker Component (Lit + TypeScript)
 *
 * Twee kolommen, uren en minuten, waarin een tijd wordt gekozen. Het component
 * is zelfstandig bruikbaar (inline op een pagina, in een filterpaneel) en zit
 * ook in de popover van nldd-time-field. Waarden zijn altijd 24-uurs `HH:mm`.
 *
 * Elke kolom is een eigen listbox met een eigen naam, want twee naamloze
 * lijsten naast elkaar zijn niet uit elkaar te houden. Selectie volgt de focus:
 * met een pijltoets ergens landen ís kiezen, zoals in een native select. Dat
 * scheelt een bevestigingsstap in een control waar elke waarde even geldig is.
 *
 * @element nldd-time-picker
 *
 * @attr {string} value - De gekozen tijd als `HH:mm` (24-uurs).
 * @attr {string} min - Vroegst toegestane tijd als `HH:mm`. Is tevens de basis waarvandaan `step` telt.
 * @attr {string} max - Laatst toegestane tijd als `HH:mm`.
 * @attr {number} step - Minutenstap (standaard 1). Bepaalt welke minuten in de kolom staan.
 * @attr {string} variant - Weergave: 'list' (standaard) of 'wheel', een wiel dat de gekozen waarde in het midden houdt.
 * @attr {string} width - Breedte: `full` vult de container, of geef een eigen CSS-lengte.
 * @attr {string} accessible-label - Toegankelijke naam van de picker.
 * @attr {object} translations - Vertalingen; niet opgegeven sleutels vallen terug op het Nederlands.
 *
 * @fires change - Wanneer een tijd is gekozen. detail: { value } met `HH:mm`.
 */

import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { timePickerStyles } from './time-picker.styles.js';
import { timePickerTemplate } from './time-picker.template.js';
import { nlddTimePickerTranslations, type NLDDTimePickerTranslations } from './time-picker.i18n.js';

const LAST_MINUTE_OF_DAY = 23 * 60 + 59;

export function toMinutes(time: string): number {
	const [hours, minutes] = time.split(':');
	return Number(hours) * 60 + Number(minutes);
}

export function fromMinutes(total: number): string {
	return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function isTime(value: string): boolean {
	return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

@customElement('nldd-time-picker')
export class NLDDTimePicker extends LitElement {

	static override styles = timePickerStyles;

	@property({ type: String })
	value = '';

	@property({ type: String })
	min = '';

	@property({ type: String })
	max = '';

	@property({ type: Number })
	step = 1;

	@property({ reflect: true, converter: reflectNonDefault<'list' | 'wheel'>('list') })
	variant: 'list' | 'wheel' = 'list';

	@property({ type: String, reflect: true })
	width = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Object })
	translations: Partial<NLDDTimePickerTranslations> = {};

	/** Waar de focus staat, per kolom. Losgehouden van `value`: je kunt met de
	 *  pijltoetsen door een kolom lopen zonder dat de andere kolom meebeweegt. */
	@state()
	private _activeColumn: 'hours' | 'minutes' = 'hours';

	public _t(key: keyof NLDDTimePickerTranslations): string {
		return this.translations[key] ?? nlddTimePickerTranslations[key];
	}

	public get _label(): string {
		return this.accessibleLabel || this._t('components.time-picker.default-label');
	}

	private get _minMinutes(): number {
		return isTime(this.min) ? toMinutes(this.min) : 0;
	}

	private get _maxMinutes(): number {
		return isTime(this.max) ? toMinutes(this.max) : LAST_MINUTE_OF_DAY;
	}

	private get _stepMinutes(): number {
		return Math.max(1, Math.round(this.step));
	}

	/** Alle geldige tijden: vanaf `min` (of middernacht) met stappen van `step`,
	 *  tot en met `max`. Eén lijst, want de twee kolommen zijn er projecties van;
	 *  zo kan een uur nooit in de kolom staan zonder een geldige minuut erbij. */
	private get _slots(): number[] {
		const out: number[] = [];
		for (let m = this._minMinutes; m <= this._maxMinutes; m += this._stepMinutes) out.push(m);
		return out;
	}

	/** De uren waarvoor minstens één geldige minuut bestaat. */
	public get _hours(): number[] {
		return [...new Set(this._slots.map((m) => Math.floor(m / 60)))];
	}

	/** De minuten binnen het gekozen uur. Zonder gekozen uur die van het eerste
	 *  uur, zodat de kolom nooit leeg oogt voordat er iets gekozen is. */
	public get _minutes(): number[] {
		const hour = this._selected === null ? this._hours[0] : Math.floor(this._selected / 60);
		return this._slots.filter((m) => Math.floor(m / 60) === hour).map((m) => m % 60);
	}

	/** De gekozen tijd in minuten, of null zolang er geen geldige waarde staat. */
	private get _selected(): number | null {
		if (!isTime(this.value)) return null;
		const minutes = toMinutes(this.value);
		return minutes >= this._minMinutes && minutes <= this._maxMinutes ? minutes : null;
	}

	public get _selectedHour(): number | null {
		return this._selected === null ? null : Math.floor(this._selected / 60);
	}

	public get _selectedMinute(): number | null {
		return this._selected === null ? null : this._selected % 60;
	}

	public _isActiveColumn(column: 'hours' | 'minutes'): boolean {
		return this._activeColumn === column;
	}

	/**
	 * Kies een uur of een minuut. Het uur houdt de gekozen minuut vast wanneer
	 * die er binnen past; zo blijf je bij het verschuiven van het uur op dezelfde
	 * minuut staan in plaats van telkens naar het begin te springen. Past hij
	 * niet (door `min`, `max` of een stap die niet uitkomt), dan de eerst
	 * mogelijke minuut in dat uur.
	 */
	public _select(column: 'hours' | 'minutes', number: number): void {
		this._activeColumn = column;
		const slots = this._slots;
		if (slots.length === 0) return;
		let next: number;
		if (column === 'hours') {
			const wanted = this._selected === null ? null : this._selected % 60;
			const inHour = slots.filter((m) => Math.floor(m / 60) === number);
			if (inHour.length === 0) return;
			next = wanted !== null && inHour.includes(number * 60 + wanted)
				? number * 60 + wanted
				: inHour[0];
		} else {
			const hour = this._selected === null ? this._hours[0] : Math.floor(this._selected / 60);
			next = hour * 60 + number;
			if (!slots.includes(next)) return;
		}
		if (fromMinutes(next) === this.value) return;
		this.value = fromMinutes(next);
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	/**
	 * Pijltoetsen binnen een kolom, plus Home en End. De kolom is één tab-stop
	 * (roving tabindex), dus Tab brengt je naar de volgende kolom in plaats van
	 * naar de volgende waarde.
	 */
	public _handleKeydown(e: KeyboardEvent, column: 'hours' | 'minutes'): void {
		const numbers = column === 'hours' ? this._hours : this._minutes;
		if (numbers.length === 0) return;
		const current = column === 'hours' ? this._selectedHour : this._selectedMinute;
		const index = current === null ? -1 : numbers.indexOf(current);
		let next: number | null = null;
		switch (e.key) {
			case 'ArrowDown':
			case 'ArrowRight':
				next = numbers[Math.min(index + 1, numbers.length - 1)];
				break;
			case 'ArrowUp':
			case 'ArrowLeft':
				next = numbers[index <= 0 ? 0 : index - 1];
				break;
			case 'Home':
				next = numbers[0];
				break;
			case 'End':
				next = numbers[numbers.length - 1];
				break;
			default:
				return;
		}
		e.preventDefault();
		if (next !== null) this._select(column, next);
	}

	public _handleFocus(column: 'hours' | 'minutes'): void {
		this._activeColumn = column;
	}

	/**
	 * Terwijl wij zelf scrollen (bij openen, of na een keuze) mag het scrollen
	 * niet opnieuw iets kiezen: dat zou de keuze die net gemaakt is overschrijven
	 * met wat er toevallig langskomt.
	 */
	private _scrollingSelf = false;
	private _scrollTimers: Record<'hours' | 'minutes', number> = { hours: 0, minutes: 0 };

	/**
	 * In wiel-modus ís scrollen kiezen: wat in het midden tot stilstand komt, is de
	 * waarde. Er bestaat een `scrollend`-event, maar niet overal, dus dit wacht tot
	 * het scrollen 120ms stil is. Kort genoeg om direct te voelen, lang genoeg om
	 * niet halverwege een veeg al te kiezen.
	 */
	public _handleScroll(e: Event, column: 'hours' | 'minutes'): void {
		if (this.variant !== 'wheel' || this._scrollingSelf) return;
		const el = e.currentTarget as HTMLElement;
		clearTimeout(this._scrollTimers[column]);
		this._scrollTimers[column] = window.setTimeout(() => this._selectCentred(column, el), 120);
	}

	/** De waarde die het dichtst bij het midden van de kolom staat. */
	private _selectCentred(column: 'hours' | 'minutes', el: HTMLElement): void {
		const centre = el.scrollTop + el.clientHeight / 2;
		let best: HTMLElement | null = null;
		let bestDistance = Infinity;
		for (const option of el.querySelectorAll<HTMLElement>('[role="option"]')) {
			const distance = Math.abs(option.offsetTop + option.offsetHeight / 2 - centre);
			if (distance < bestDistance) {
				bestDistance = distance;
				best = option;
			}
		}
		if (best) this._select(column, Number(best.textContent));
	}

	/**
	 * Zet de gekozen waarde midden in beeld. De kolom is zeven waarden hoog, dus
	 * `center` zet hem op de vierde rij met drie erboven en drie eronder.
	 *
	 * Publiek omdat een verborgen element niet te scrollen is: staat de picker in
	 * een popover, dan heeft hij bij het zetten van de waarde nog geen afmetingen
	 * en doet scrollIntoView niets. Het veld roept dit daarom aan zodra de popover
	 * opengaat.
	 */
	public scrollSelectedIntoView(): void {
		this._scrollingSelf = true;
		for (const column of ['hours', 'minutes'] as const) {
			const option = this.shadowRoot?.querySelector(`[data-column="${column}"] [aria-selected="true"]`);
			option?.scrollIntoView({ block: 'center' });
		}
		// Iets langer dan de debounce hierboven, zodat de scroll-events van deze
		// beweging allemaal genegeerd zijn voordat we weer luisteren.
		window.setTimeout(() => { this._scrollingSelf = false; }, 200);
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('width')) {
			const w = this.width;
			if (w === 'full') this.style.setProperty('--_width', '100%');
			else if (w && CSS.supports('width', w)) this.style.setProperty('--_width', w);
			else this.style.removeProperty('--_width');
		}
		if (changed.has('value') || changed.has('min') || changed.has('max') || changed.has('step')) {
			this.scrollSelectedIntoView();
		}
	}

	override render() {
		return timePickerTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-time-picker': NLDDTimePicker;
	}
}
