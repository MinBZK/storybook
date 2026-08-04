/**
 * NLDD Design System Time Field Component (Lit + TypeScript)
 *
 * Een tekstveld voor een tijd. De waarde is altijd 24-uurs `HH:mm`; dat is in
 * het Nederlands ook de weergave, dus anders dan bij nldd-date-field valt er
 * niets om te rekenen. Er wordt niet gemaskeerd tijdens het typen: invoer wordt
 * royaal geaccepteerd en pas bij het verlaten van het veld genormaliseerd.
 * Foutmeldingen horen bij nldd-form-field, niet hier. Dit veld reflecteert
 * alleen `invalid` / `valid`, net als nldd-text-field.
 *
 * @element nldd-time-field
 *
 * @attr {string} value - De tijd als `HH:mm` (24-uurs). Leeg wanneer er geen geldige tijd staat.
 * @attr {string} min - Vroegst toegestane tijd als `HH:mm`. Is tevens de basis waarvandaan `step` telt.
 * @attr {string} max - Laatst toegestane tijd als `HH:mm`.
 * @attr {number} step - Minutenstap (standaard 1). Bepaalt welke tijden geldig zijn, waarop wordt afgerond en hoe ver de pijltjestoetsen verspringen.
 * @attr {string} placeholder - Placeholdertekst. Zet hier geen formaat in; gebruik daarvoor de supporting-label van nldd-form-field.
 * @attr {string} input-id - Zet het id op de interne input. Wordt automatisch gezet door nldd-form-field.
 * @attr {string} size - 'md' (standaard) | 'sm'. Wordt automatisch gezet door nldd-form-field.
 * @attr {boolean} invalid - Markeert het veld als ongeldig.
 * @attr {boolean} valid - Markeert het veld als geldig.
 * @attr {boolean} disabled - Uitgeschakelde staat.
 * @attr {boolean} readonly - Alleen-lezen staat.
 * @attr {boolean} required - Verplichte staat.
 * @attr {string} name - Naam voor formulierverzending.
 * @attr {string} autocomplete - Autocomplete-hint.
 * @attr {string} accessible-label - Toegankelijk label voor de interne input. Wordt automatisch gezet door nldd-form-field.
 * @attr {string} error-message-ids - Ids voor aria-describedby. Wordt automatisch gezet door nldd-form-field.
 * @attr {string} width - Breedte. Standaard precies breed genoeg voor een tijd plus het validatie-icoon; 'full' vult de container, of geef een eigen CSS-lengte.
 * @attr {object} translations - Vertalingen; niet opgegeven sleutels vallen terug op het Nederlands.
 *
 * @fires input - Bij elke wijziging. detail: { value } met `HH:mm`, of '' zolang er geen geldige tijd staat.
 * @fires change - Wanneer de waarde is vastgelegd. detail: { value } met `HH:mm`, of ''.
 */

import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FormAssociated, type FormValue } from '../../../utilities/form-associated-mixin.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { timeFieldStyles } from './time-field.styles.js';
import { timeFieldTemplate } from './time-field.template.js';
import { nlddTimeFieldTranslations, type NLDDTimeFieldTranslations } from './time-field.i18n.js';

/** Minuten sinds middernacht van de laatste tijd op een dag. */
const LAST_MINUTE_OF_DAY = 23 * 60 + 59;

function toMinutes(time: string): number {
	const [hours, minutes] = time.split(':');
	return Number(hours) * 60 + Number(minutes);
}

function fromMinutes(total: number): string {
	const hours = Math.floor(total / 60);
	const minutes = total % 60;
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function toTime(hours: number, minutes: number): string | null {
	if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
	return fromMinutes(hours * 60 + minutes);
}

/**
 * Lees een getypte tijd royaal. Bewust geen masker: per toetsaanslag
 * herformatteren verplaatst de caret, breekt backspace midden in de waarde en
 * verwart screenreaders, dus we accepteren wat mensen typen en normaliseren één
 * keer bij commit.
 *
 * Accepteert 9, 09, 9:30, 9.30, 9,30, 9u30, 930 en 0930. Na een letter mogen de
 * minuten ontbreken ("9u" is een afgeronde gedachte), na een leesteken niet:
 * "9:" is halverwege het typen en hoort nog geen waarde op te leveren.
 */
export function parseTime(raw: string): string | null {
	const trimmed = raw.trim();
	if (trimmed === '') return null;
	const withLetter = /^(\d{1,2})\s*[uh]\s*(\d{1,2})?$/i.exec(trimmed);
	if (withLetter) return toTime(Number(withLetter[1]), Number(withLetter[2] ?? 0));
	const withPunctuation = /^(\d{1,2})\s*[:.,]\s*(\d{1,2})$/.exec(trimmed);
	if (withPunctuation) return toTime(Number(withPunctuation[1]), Number(withPunctuation[2]));
	const bare = /^\d{1,4}$/.exec(trimmed);
	if (bare) {
		const digits = bare[0];
		if (digits.length <= 2) return toTime(Number(digits), 0);
		const split = digits.length === 3 ? 1 : 2;
		return toTime(Number(digits.slice(0, split)), Number(digits.slice(split)));
	}
	return null;
}

/**
 * De dichtstbijzijnde tijd die op de stap valt, geteld vanaf `base`. Ligt de
 * invoer er precies tussenin, dan naar boven.
 *
 * Nooit doorrollen over de dagrand: zou naar boven voorbij 23:59 gaan, dan een
 * stap terug. Doorrollen naar 00:00 verschuift stilzwijgend de dag, en een
 * consument die dit veld naast een datumveld zet heeft dan een fout die niemand
 * ziet aankomen.
 */
export function roundToStep(time: string, step: number, base = '00:00'): string {
	if (step <= 1) return time;
	const baseMinutes = toMinutes(base);
	const steps = Math.floor((toMinutes(time) - baseMinutes) / step + 0.5);
	let rounded = baseMinutes + steps * step;
	while (rounded > LAST_MINUTE_OF_DAY) rounded -= step;
	while (rounded < 0) rounded += step;
	return fromMinutes(rounded);
}

@customElement('nldd-time-field')
export class NLDDTimeField extends FormAssociated(LitElement) {

	static override shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	static override styles = timeFieldStyles;

	private _initialValue = '';

	@property({ reflect: true, converter: reflectNonDefault<'md' | 'sm'>('md') })
	size: 'md' | 'sm' = 'md';

	@property({ type: String })
	value = '';

	@property({ type: String })
	min = '';

	@property({ type: String })
	max = '';

	@property({ type: Number })
	step = 1;

	@property({ type: String, attribute: 'input-id' })
	inputId = '';

	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	placeholder = '';

	@property({ type: Boolean, reflect: true })
	invalid = false;

	@property({ type: Boolean, reflect: true })
	valid = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true })
	readonly = false;

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: String, reflect: true })
	name = '';

	@property({ type: String })
	autocomplete = '';

	/** Toegankelijk label voor de interne input. Wordt automatisch gezet door nldd-form-field. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: String, attribute: 'error-message-ids' })
	errorMessageIds = '';

	/** Optionele vaste breedte. Zonder waarde is het veld precies breed genoeg. */
	@property({ type: String, reflect: true })
	width = '';

	/** Overschrijf een of meer vertaalsleutels. Niet opgegeven sleutels vallen terug op het Nederlands. */
	@property({ type: Object })
	translations: Partial<NLDDTimeFieldTranslations> = {};

	/** Wat de gebruiker ziet en typt. Losgehouden van `value`, dat alleen een
	 *  geldige tijd draagt of niets. */
	@state()
	private _display = '';

	public _t(key: keyof NLDDTimeFieldTranslations): string {
		return this.translations[key] ?? nlddTimeFieldTranslations[key];
	}

	public get _fieldLabel(): string {
		return this.accessibleLabel || this._t('components.time-field.default-label');
	}

	public get _displayValue(): string {
		return this._display;
	}

	/** De basis waarvandaan de stap telt. `min` wanneer die er is, zodat een reeks
	 *  die op :07 begint ook met stap 15 kan; anders middernacht. Ontleend aan
	 *  `<input type="time">`, dat `min` op dezelfde manier gebruikt. */
	private get _stepBase(): string {
		return parseTime(this.min) ?? '00:00';
	}

	private _withinBounds(time: string): boolean {
		const min = parseTime(this.min);
		const max = parseTime(this.max);
		// `HH:mm` vergelijkt lexicaal in dezelfde volgorde als op de klok.
		if (min && time < min) return false;
		if (max && time > max) return false;
		return true;
	}

	/** De geparste tijd, of '' wanneer die onleesbaar is of buiten de grenzen valt.
	 *  In beide gevallen blijft de ruwe tekst staan, zodat de gebruiker ziet en kan
	 *  herstellen wat hij schreef. */
	private _commit(parsed: string | null): string {
		return parsed && this._withinBounds(parsed) ? parsed : '';
	}

	/** Afronden gebeurt bij commit, niet bij input: anders springt "09:1" naar
	 *  09:00 voordat iemand de 5 heeft kunnen intikken. */
	private _rounded(parsed: string | null): string | null {
		return parsed === null ? null : roundToStep(parsed, this.step, this._stepBase);
	}

	public _handleInput(e: Event): void {
		e.stopPropagation();
		const text = (e.target as HTMLInputElement).value;
		this._display = text;
		this.value = this._commit(parseTime(text));
		this._emit('input');
	}

	public _handleChange(e: Event): void {
		e.stopPropagation();
		const input = e.target as HTMLInputElement;
		const committed = this._commit(this._rounded(parseTime(input.value)));
		// Normaliseren bij commit: 9u30 komt te staan als 09:30. Tekst die niet
		// leesbaar is of buiten de grenzen valt blijft staan om te herstellen.
		const shown = committed || input.value;
		this._display = shown;
		// De input schrijven we zelf. Lit slaat een DOM-write over zodra de nieuwe
		// tekst gelijk is aan wat het laatst gerenderd stond, en dat is precies het
		// geval wanneer iemand een al genormaliseerde waarde anders overtypt: 09:30
		// wordt 930, en dat rondt terug naar 09:30. Zonder deze regel bleef 930
		// staan terwijl `value` allang 09:30 was.
		input.value = shown;
		this.value = committed;
		this._emit('change');
	}

	/**
	 * Pijl omhoog en omlaag verspringen met `step`. Staat er nog niets, dan is de
	 * eerste druk de huidige tijd afgerond op de stap, of `min` wanneer die er is.
	 * Beginnen op middernacht zou vanuit elk realistisch doel een lange klim zijn,
	 * en de kalender doet hetzelfde: die opent op vandaag zolang er geen datum is.
	 */
	public _handleInputKeydown(e: KeyboardEvent): void {
		if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
		if (this.disabled || this.readonly) return;
		e.preventDefault();
		const current = this.value || parseTime(this._display);
		const next = current
			? this._shift(current, e.key === 'ArrowUp' ? 1 : -1)
			: this._startingPoint();
		this._display = next;
		this.value = this._withinBounds(next) ? next : '';
		this._emit('input');
		this._emit('change');
	}

	private _startingPoint(): string {
		const min = parseTime(this.min);
		if (min) return min;
		const now = new Date();
		return roundToStep(fromMinutes(now.getHours() * 60 + now.getMinutes()), this.step, '00:00');
	}

	private _shift(from: string, direction: 1 | -1): string {
		const step = Math.max(1, Math.round(this.step));
		const base = toMinutes(this._stepBase);
		// Vanaf een tijd die niet op de stap valt eerst naar het raster, zodat een
		// tweede druk niet weer tussen twee geldige waarden landt.
		const aligned = toMinutes(roundToStep(from, step, this._stepBase));
		const moved = aligned === toMinutes(from) || step === 1
			? aligned + direction * step
			: aligned;
		const clamped = Math.min(Math.max(moved, base % step), LAST_MINUTE_OF_DAY);
		const minMinutes = parseTime(this.min) ? toMinutes(parseTime(this.min) as string) : 0;
		const maxMinutes = parseTime(this.max) ? toMinutes(parseTime(this.max) as string) : LAST_MINUTE_OF_DAY;
		return fromMinutes(Math.min(Math.max(clamped, minMinutes), maxMinutes));
	}

	override formValue(): FormValue {
		return this.value;
	}

	formResetCallback(): void {
		this.value = this._initialValue;
		this._display = this._initialValue;
		this.commitFormValue();
	}

	formStateRestoreCallback(state: File | string | FormData | null): void {
		if (typeof state === 'string') {
			this.value = state;
			this._display = state;
		}
	}

	private _emit(type: 'input' | 'change'): void {
		this.commitFormValue();
		this.dispatchEvent(new CustomEvent(type, {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	override firstUpdated(): void {
		this._initialValue = this.value;
		if (this.value) this._display = this.value;
		this.commitFormValue();
	}

	override willUpdate(changed: PropertyValues): void {
		// Een waarde die van buiten wordt gezet (property, reset, formulier) moet in
		// het veld verschijnen. Tijdens typen niet: dan is `_display` de bron en zou
		// dit de half getypte tekst overschrijven.
		if (changed.has('value') && (parseTime(this._display) ?? '') !== this.value) {
			this._display = this.value;
		}
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('width')) {
			const w = this.width;
			// Anders dan een tekstveld is de standaard hier een eigen breedte die een
			// tijd plus het icoon past, dus 'full' moet 100% expliciet zeggen in
			// plaats van op die standaard terug te vallen.
			if (w === 'full') {
				this.style.setProperty('--_width', '100%');
			} else if (w && CSS.supports('width', w)) {
				this.style.setProperty('--_width', w);
			} else {
				this.style.removeProperty('--_width');
			}
		}
	}

	override render() {
		return timeFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-time-field': NLDDTimeField;
	}
}
