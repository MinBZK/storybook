import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './date-field.js';
import type { NLDDDateField } from './date-field.js';
import { PICKER_POPOVER_WIDTH } from './date-field.template.js';

/** The visible text input; the picker's native input is a separate element. */
function textInput(el: HTMLElement): HTMLInputElement {
	return el.shadowRoot!.querySelector('.date-field__input') as HTMLInputElement;
}

function pickerButton(el: HTMLElement): HTMLElement | null {
	return el.shadowRoot!.querySelector('.date-field__picker-button nldd-icon-button');
}

function popover(el: HTMLElement): HTMLElement | null {
	return el.shadowRoot!.querySelector('nldd-popover');
}

function picker(el: HTMLElement): HTMLElement | null {
	return el.shadowRoot!.querySelector('nldd-date-picker');
}

/** Type into the visible field and commit, the way a user would. */
async function type(el: NLDDDateField, text: string): Promise<void> {
	const input = textInput(el);
	input.value = text;
	input.dispatchEvent(new Event('input', { bubbles: true }));
	await waitForUpdate(el);
	input.dispatchEvent(new Event('change', { bubbles: true }));
	await waitForUpdate(el);
}

describe('nldd-date-field', () => {
	let el: NLDDDateField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('toont een ISO-waarde in Nederlandse notatie', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field value="2026-12-31"></nldd-date-field>');
		await waitForUpdate(el);
		expect(textInput(el).value).toBe('31-12-2026');
	});

	// Royaal accepteren, één keer normaliseren - geen masking tijdens het typen.
	it.each([
		['31-12-2026', '2026-12-31'],
		['31/12/2026', '2026-12-31'],
		['31.12.2026', '2026-12-31'],
		['1-2-2026', '2026-02-01'],
		['31122026', '2026-12-31'],
		['2026-12-31', '2026-12-31'],
	])('leest %s als %s', async (typed, iso) => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await type(el, typed);
		expect(el.value).toBe(iso);
	});

	it('normaliseert de weergave pas bij het vastleggen', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		const input = textInput(el);

		input.value = '1/2/2026';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		// Tijdens het typen blijft de tekst staan zoals ingevoerd.
		expect(input.value).toBe('1/2/2026');

		input.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(textInput(el).value).toBe('01-02-2026');
	});

	it('laat onleesbare invoer staan en houdt de waarde leeg', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await type(el, 'morgen');
		expect(el.value).toBe('');
		// Niet stilletjes wissen: de gebruiker moet zien wat er staat om het te herstellen.
		expect(textInput(el).value).toBe('morgen');
	});

	it('weigert een niet-bestaande datum', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await type(el, '31-02-2026');
		expect(el.value).toBe('');
	});

	it('maakt de waarde leeg bij een leeg veld', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field value="2026-12-31"></nldd-date-field>');
		await type(el, '');
		expect(el.value).toBe('');
	});

	it('vuurt change met de ISO-waarde', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		let detail: unknown = null;
		el.addEventListener('change', (e) => { detail = (e as CustomEvent).detail; });
		await type(el, '31-12-2026');
		expect(detail).toEqual({ value: '2026-12-31' });
	});

	it('geeft de interne input geen name - het component submit zelf één waarde', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field name="datum"></nldd-date-field>');
		await waitForUpdate(el);
		expect(textInput(el).hasAttribute('name')).toBe(false);
	});


	// De kalenderknop en de popover zitten in dezelfde doos, dus met :focus-within
	// tekende het veld een tweede ring om alles heen terwijl de knop er al een had.
	it('toont de veldring alleen voor het tekstveld', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		const box = el.shadowRoot!.querySelector('.date-field')!;

		textInput(el).focus();
		expect(box.matches('.date-field:has(.date-field__input:focus)')).toBe(true);

		textInput(el).blur();
		expect(box.matches('.date-field:has(.date-field__input:focus)')).toBe(false);
	});


	// De ruimte ernaast wordt door de fade opengehouden, dus zonder validatiestaat
	// hoort er geen leeg element in de DOM te staan.
	it('rendert geen validatiecel zonder validatiestaat', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range></nldd-date-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.date-field__validation-icon-area')).toBeNull();
	});

	// Twee bijna gelijke takken in de template liepen uit elkaar: de geldig-tak
	// miste de wrapper die de maat zet, waardoor dat icoon de hele cel vulde.
	it.each([['valid'], ['invalid']])('zet het %s-icoon in een wrapper met een vaste maat', async (state) => {
		el = await fixture<NLDDDateField>(`<nldd-date-field ${state}></nldd-date-field>`);
		await waitForUpdate(el);
		const glyph = el.shadowRoot!.querySelector('.date-field__validation-icon');
		expect(glyph).not.toBeNull();
		expect(glyph!.querySelector('nldd-icon')!.getAttribute('name')).toBe(state);
	});


	// # Periode

	function inputs(el: NLDDDateField): HTMLInputElement[] {
		return Array.from(el.shadowRoot!.querySelectorAll('.date-field__input'));
	}

	it('toont één invoerveld zonder range', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		expect(inputs(el)).toHaveLength(1);
		expect(el.shadowRoot!.querySelector('.date-field__separator')).toBeNull();
	});

	it('toont twee invoervelden met range', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range></nldd-date-field>');
		await waitForUpdate(el);
		expect(inputs(el)).toHaveLength(2);
		expect(el.shadowRoot!.querySelector('.date-field__separator')).not.toBeNull();
	});

	it('leest beide velden los van elkaar', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range></nldd-date-field>');
		await waitForUpdate(el);
		const [start, end] = inputs(el);

		start.value = '01-07-2026';
		start.dispatchEvent(new Event('change', { bubbles: true }));
		end.value = '14-07-2026';
		end.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);

		expect(el.value).toBe('2026-07-01/2026-07-14');
	});

	// Eén naam en één waarde, net als elk ander formulierveld: de ISO 8601-notatie
	// voor een interval maakt een verzonnen tweede naam overbodig.
	it('dient de periode in als één waarde onder één naam', async () => {
		const form = document.createElement('form');
		document.body.appendChild(form);
		el = document.createElement('nldd-date-field') as NLDDDateField;
		el.range = true;
		el.name = 'period';
		form.appendChild(el);
		await waitForUpdate(el);
		el.value = '2026-07-06/2026-07-20';
		await waitForUpdate(el);

		const entries = [...new FormData(form).entries()];
		expect(entries).toEqual([['period', '2026-07-06/2026-07-20']]);
		form.remove();
	});

	it('splitst de waarde in twee velden', async () => {
		el = await fixture<NLDDDateField>(
			'<nldd-date-field range value="2026-07-06/2026-07-20"></nldd-date-field>',
		);
		await waitForUpdate(el);
		expect(inputs(el).map((i) => i.value)).toEqual(['06-07-2026', '20-07-2026']);
	});

	// Een halfgevulde periode is ongeldige invoer; die hoort de ontvangende kant te
	// zien in plaats van een leeg veld waaruit niets blijkt.
	it('houdt een halfgevulde periode zichtbaar in de waarde', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range></nldd-date-field>');
		await waitForUpdate(el);
		const [start] = inputs(el);
		start.value = '06-07-2026';
		start.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.value).toBe('2026-07-06/');
	});

	// nldd-form-field zet één label en één id; het veld verdeelt dat zelf over de
	// twee invoervelden, zodat form-field niets van periodes hoeft te weten.
	it('geeft de groep één naam en elk veld een eigen', async () => {
		el = await fixture<NLDDDateField>(
			'<nldd-date-field range accessible-label="Periode"></nldd-date-field>',
		);
		await waitForUpdate(el);
		const box = el.shadowRoot!.querySelector('.date-field')!;
		expect(box.getAttribute('role')).toBe('group');
		expect(box.getAttribute('aria-label')).toBe('Periode');

		const [start, end] = inputs(el);
		expect(start.getAttribute('aria-label')).toBe('Periode, van');
		expect(end.getAttribute('aria-label')).toBe('Periode, tot en met');
	});

	it('zet het id van form-field op het eerste veld', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range input-id="veld-1"></nldd-date-field>');
		await waitForUpdate(el);
		const [start, end] = inputs(el);
		expect(start.id).toBe('veld-1');
		expect(end.id).toBe('');
	});

	it('zet de kalender in bereikmodus en geeft beide uiteinden door', async () => {
		el = await fixture<NLDDDateField>(
			'<nldd-date-field range value="2026-07-01/2026-07-14"></nldd-date-field>',
		);
		await waitForUpdate(el);
		expect(picker(el)!.hasAttribute('range')).toBe(true);
		expect(picker(el)!.getAttribute('start')).toBe('2026-07-01');
		expect(picker(el)!.getAttribute('end')).toBe('2026-07-14');
	});

	it('neemt een periode uit de kalender over', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range></nldd-date-field>');
		await waitForUpdate(el);
		picker(el)!.dispatchEvent(new CustomEvent('change', {
			detail: { start: '2026-07-01', end: '2026-07-14' }, bubbles: true, composed: true,
		}));
		await waitForUpdate(el);
		expect(el.value).toBe('2026-07-01/2026-07-14');
		expect(inputs(el)[1].value).toBe('14-07-2026');
	});

	it('vuurt change met beide waarden in bereikmodus', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range></nldd-date-field>');
		await waitForUpdate(el);
		let detail: unknown = null;
		el.addEventListener('change', (e) => { detail = (e as CustomEvent).detail; });
		picker(el)!.dispatchEvent(new CustomEvent('change', {
			detail: { start: '2026-07-01', end: '2026-07-14' }, bubbles: true, composed: true,
		}));
		await waitForUpdate(el);
		expect(detail).toEqual({ value: '2026-07-01/2026-07-14' });
	});


	// # Kalender

	it('toont de kalenderknop standaard', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		expect(pickerButton(el)).not.toBeNull();
		expect(popover(el)).not.toBeNull();
	});

	it('verbergt de kalender met no-picker', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field no-picker></nldd-date-field>');
		await waitForUpdate(el);
		expect(pickerButton(el)).toBeNull();
		expect(popover(el)).toBeNull();
	});

	it('geeft min en max door aan de kalender', async () => {
		el = await fixture<NLDDDateField>(
			'<nldd-date-field min="2026-01-01" max="2026-12-31"></nldd-date-field>',
		);
		await waitForUpdate(el);
		expect(picker(el)!.getAttribute('min')).toBe('2026-01-01');
		expect(picker(el)!.getAttribute('max')).toBe('2026-12-31');
	});

	// nldd-popover leest dit om zijn focusdoel te kiezen; zonder blijft de focus op
	// de popover zelf staan en moet je eerst het rooster in tabben.
	it('wijst de kalender aan als focusdoel van de popover', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		expect(picker(el)!.hasAttribute('autofocus')).toBe(true);
		expect(popover(el)!.querySelector('[autofocus]')).toBe(picker(el));
	});

	it('geeft de waarde door aan de kalender', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field value="2026-12-31"></nldd-date-field>');
		await waitForUpdate(el);
		expect(picker(el)!.getAttribute('value')).toBe('2026-12-31');
	});

	// Waar de native kiezer op stukliep: die kende geen sluit-tegenhanger, en in
	// Safari hing het sluiten aan de onzichtbare input zelf.
	it('opent en sluit de kalender met dezelfde knop', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		const calls: string[] = [];
		const pop = popover(el) as unknown as { show(): void; hide(): void };
		pop.show = () => calls.push('show');
		pop.hide = () => calls.push('hide');

		el._handlePickerClick();
		expect(calls).toEqual(['show']);

		// De popover meldt zijn open-staat terug via toggle; die spiegelt het veld,
		// zodat dezelfde knop de tweede keer sluit.
		popover(el)!.dispatchEvent(Object.assign(new Event('toggle'), { newState: 'open' }));
		await waitForUpdate(el);
		expect(el._pickerOpen).toBe(true);

		el._handlePickerClick();
		expect(calls).toEqual(['show', 'hide']);
	});

	// De popover herstelt naar de host, en die delegeert focus naar het tekstveld -
	// dus zonder ingrijpen springt de focus achteruit langs de knop die je net
	// gebruikte, en moet je weer vooruit tabben om opnieuw te openen.
	it('zet de focus na het kiezen terug op de kalenderknop', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		textInput(el).focus();

		picker(el)!.dispatchEvent(new CustomEvent('change', {
			detail: { value: '2026-12-31' }, bubbles: true, composed: true,
		}));
		// De popover geeft de focus terug aan het veld; dat moment wordt opgevangen.
		el.dispatchEvent(new Event('focusin'));
		await waitForUpdate(el);

		expect(el.shadowRoot!.activeElement).toBe(pickerButton(el));
	});

	// Dezelfde teruggave als na een keuze: annuleren, Escape en een klik ernaast
	// hoorden de focus ook op de knop te zetten, niet op de invoer te laten staan.
	it('zet de focus na dismiss terug op de kalenderknop', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		textInput(el).focus();
		el._handlePickerDismiss(new Event('dismiss'));
		el.dispatchEvent(new Event('focusin'));
		await waitForUpdate(el);
		expect(el.shadowRoot!.activeElement).toBe(pickerButton(el));
	});

	it('neemt een datum uit de kalender over in de weergave', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		picker(el)!.dispatchEvent(new CustomEvent('change', {
			detail: { value: '2026-12-31' }, bubbles: true, composed: true,
		}));
		await waitForUpdate(el);
		expect(el.value).toBe('2026-12-31');
		expect(textInput(el).value).toBe('31-12-2026');
	});

	it('vuurt change met de datum uit de kalender', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		let detail: unknown = null;
		el.addEventListener('change', (e) => { detail = (e as CustomEvent).detail; });
		picker(el)!.dispatchEvent(new CustomEvent('change', {
			detail: { value: '2026-12-31' }, bubbles: true, composed: true,
		}));
		await waitForUpdate(el);
		expect(detail).toEqual({ value: '2026-12-31' });
	});
});

describe('nldd-date-field met een eigen kalender in de slot', () => {
	let el: NLDDDateField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	function slottedPicker(host: NLDDDateField): HTMLElement | null {
		return host.querySelector('nldd-date-picker');
	}

	// Zonder dit staan er twee kalenders in de popover, want de standaardkalender
	// wordt alleen weggelaten als het veld doorheeft dat de slot gevuld is.
	it('vervangt de standaardkalender in plaats van er een toe te voegen', async () => {
		el = await fixture<NLDDDateField>(`
			<nldd-date-field>
				<nldd-date-picker slot="picker" week-numbers></nldd-date-picker>
			</nldd-date-field>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-date-picker')).toBeNull();
		expect(slottedPicker(el)).not.toBeNull();
	});

	it('laat de standaardkalender staan zolang de slot leeg is', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-date-picker')).not.toBeNull();
	});

	// Het veld is de eigenaar van de formulierwaarde; een consument die die op de
	// kalender zelf zet, zou twee bronnen van waarheid maken.
	it('schrijft waarde en grenzen op de gesloten kalender', async () => {
		el = await fixture<NLDDDateField>(`
			<nldd-date-field value="2026-07-14" min="2026-07-01" max="2026-07-31">
				<nldd-date-picker slot="picker"></nldd-date-picker>
			</nldd-date-field>
		`);
		await waitForUpdate(el);
		const p = slottedPicker(el) as HTMLElement & { value: string; min: string; max: string; range: boolean };
		expect(p.value).toBe('2026-07-14');
		expect(p.min).toBe('2026-07-01');
		expect(p.max).toBe('2026-07-31');
		expect(p.range).toBe(false);
	});

	it('geeft een periode door als start en eind', async () => {
		el = await fixture<NLDDDateField>(`
			<nldd-date-field range value="2026-07-06/2026-07-20">
				<nldd-date-picker slot="picker"></nldd-date-picker>
			</nldd-date-field>
		`);
		await waitForUpdate(el);
		const p = slottedPicker(el) as HTMLElement & { start: string; end: string; range: boolean };
		expect(p.range).toBe(true);
		expect(p.start).toBe('2026-07-06');
		expect(p.end).toBe('2026-07-20');
	});

	// De keuze komt uit de light DOM en moet door de slot heen het veld bereiken.
	it('neemt een keuze uit de gesloten kalender over', async () => {
		el = await fixture<NLDDDateField>(`
			<nldd-date-field>
				<nldd-date-picker slot="picker"></nldd-date-picker>
			</nldd-date-field>
		`);
		await waitForUpdate(el);
		slottedPicker(el)!.dispatchEvent(new CustomEvent('change', {
			detail: { value: '2026-07-14' },
			bubbles: true,
			composed: true,
		}));
		await waitForUpdate(el);
		expect(el.value).toBe('2026-07-14');
	});

	it('laat eigenschappen die alleen de kalender kent met rust', async () => {
		el = await fixture<NLDDDateField>(`
			<nldd-date-field>
				<nldd-date-picker slot="picker" week-numbers first-day-of-week="0"></nldd-date-picker>
			</nldd-date-field>
		`);
		await waitForUpdate(el);
		const p = slottedPicker(el) as HTMLElement & { weekNumbers: boolean; firstDayOfWeek: number };
		expect(p.weekNumbers).toBe(true);
		expect(p.firstDayOfWeek).toBe(0);
	});
});

describe('nldd-date-field grenzen, separators en range-toggle', () => {
	let el: NLDDDateField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	// min/max gingen naar de kalender, die out-of-range dagen blokkeert, maar
	// getypte invoer werd nooit tegen de grenzen gehouden.
	it('legt een getypte datum buiten max niet vast', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field max="2026-07-31"></nldd-date-field>');
		await waitForUpdate(el);
		await type(el, '15-08-2026');
		expect(el.value).toBe('');
		expect(textInput(el).value).toBe('15-08-2026');
	});

	it('legt een getypte datum vóór min niet vast', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field min="2026-07-01"></nldd-date-field>');
		await waitForUpdate(el);
		await type(el, '20-06-2026');
		expect(el.value).toBe('');
	});

	it('legt een datum binnen de grenzen wel vast', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field min="2026-07-01" max="2026-07-31"></nldd-date-field>');
		await waitForUpdate(el);
		await type(el, '15-07-2026');
		expect(el.value).toBe('2026-07-15');
	});

	// \D accepteerde elke niet-cijfer als scheidingsteken, ook een letter.
	it('weigert een letter als scheidingsteken', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		await type(el, '2026x01x01');
		expect(el.value).toBe('');
	});

	it('accepteert punt en schuine streep als scheidingsteken', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		await type(el, '01.02.2026');
		expect(el.value).toBe('2026-02-01');
		await type(el, '03/04/2026');
		expect(el.value).toBe('2026-04-03');
	});

	// value houdt één vorm per modus: altijd een interval met range, altijd een
	// kale datum zonder.
	it('maakt een kale datum een interval bij inschakelen van range', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field value="2026-07-06"></nldd-date-field>');
		await waitForUpdate(el);
		el.range = true;
		await waitForUpdate(el);
		expect(el.value).toBe('2026-07-06/');
		expect(el._startValue).toBe('2026-07-06');
		expect(el._endValue).toBe('');
	});

	it('collapseert een interval naar de startdatum bij uitschakelen van range', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range value="2026-07-06/2026-07-20"></nldd-date-field>');
		await waitForUpdate(el);
		el.range = false;
		await waitForUpdate(el);
		expect(el.value).toBe('2026-07-06');
	});
});

describe('nldd-date-field popoverbreedte loopt niet vast', () => {
	let el: NLDDDateField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	// De breedte werd extern op de popover gezet; lit maakte dat op een latere
	// render niet ongedaan, dus na het meten van een brede gesloten kalender bleef
	// de popover te breed, ook nadat die kalender weg was.
	it('valt terug op de standaardbreedte als de gesloten kalender verdwijnt', async () => {
		el = await fixture<NLDDDateField>(`
			<nldd-date-field>
				<nldd-date-picker slot="picker" week-numbers></nldd-date-picker>
			</nldd-date-field>
		`);
		await waitForUpdate(el);
		// Alsof de gesloten kalender gemeten en breed bevonden is.
		el._pickerPopoverWidth = 'calc(500px + var(--primitives-space-16) * 2)';
		await waitForUpdate(el);
		// Kalender weg, dan opent de popover opnieuw.
		el.querySelector('nldd-date-picker')!.remove();
		el._handlePickerSlotChange();
		await waitForUpdate(el);
		const openEvent = Object.assign(new Event('toggle'), { newState: 'open' });
		el._handlePopoverToggle(openEvent as ToggleEvent);
		await waitForUpdate(el);
		expect(el._pickerPopoverWidth).toBe(PICKER_POPOVER_WIDTH);
	});
});

describe('nldd-date-field is nooit een naamloze control', () => {
	let el: NLDDDateField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	// Zonder accessible-label en zonder nldd-form-field kreeg de invoer geen naam:
	// geen label, geen aria-label. Nu valt hij terug op een neutrale naam.
	it('geeft de invoer een terugval-naam zonder accessible-label', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field></nldd-date-field>');
		await waitForUpdate(el);
		expect(textInput(el).getAttribute('aria-label')).toBe('Datum');
	});

	it('laat accessible-label voorgaan op de terugval', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field accessible-label="Geboortedatum"></nldd-date-field>');
		await waitForUpdate(el);
		expect(textInput(el).getAttribute('aria-label')).toBe('Geboortedatum');
	});

	it('benoemt in range-modus de groep en beide invoervelden', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range></nldd-date-field>');
		await waitForUpdate(el);
		const inputs = el.shadowRoot!.querySelectorAll('.date-field__input');
		expect(el.shadowRoot!.querySelector('.date-field')!.getAttribute('aria-label')).toBe('Periode');
		expect(inputs[0].getAttribute('aria-label')).toBe('Periode, van');
		expect(inputs[1].getAttribute('aria-label')).toBe('Periode, tot en met');
	});
});

describe('nldd-date-field sorteert een omgekeerd getypte periode op blur', () => {
	let el: NLDDDateField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	function fieldBlur(host: NLDDDateField, relatedTarget: Node | null = null) {
		host.shadowRoot!.querySelector('.date-field')!
			.dispatchEvent(new FocusEvent('focusout', { relatedTarget, bubbles: true }));
	}

	// De kalender sorteert een gesleepte periode altijd; typen deed dat niet, dus
	// "van 2027 t/m 2026" bleef achterstevoren staan.
	it('zet de vroegste datum voorop als de focus het veld verlaat', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range value="2027-06-09/2026-06-26"></nldd-date-field>');
		await waitForUpdate(el);
		fieldBlur(el);
		await waitForUpdate(el);
		expect(el.value).toBe('2026-06-26/2027-06-09');
	});

	it('laat een periode die al goed staat met rust', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range value="2026-06-09/2026-06-26"></nldd-date-field>');
		await waitForUpdate(el);
		fieldBlur(el);
		await waitForUpdate(el);
		expect(el.value).toBe('2026-06-09/2026-06-26');
	});

	// Tussen de twee invoervelden wisselen mag niet sorteren, anders springt een
	// net getypte waarde naar het andere veld terwijl je nog bezig bent.
	it('sorteert niet als de focus binnen het veld blijft', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field range value="2027-06-09/2026-06-26"></nldd-date-field>');
		await waitForUpdate(el);
		const tweede = el.shadowRoot!.querySelectorAll('.date-field__input')[1];
		fieldBlur(el, tweede);
		await waitForUpdate(el);
		expect(el.value).toBe('2027-06-09/2026-06-26');
	});

	it('doet niets zonder range', async () => {
		el = await fixture<NLDDDateField>('<nldd-date-field value="2026-06-09"></nldd-date-field>');
		await waitForUpdate(el);
		fieldBlur(el);
		await waitForUpdate(el);
		expect(el.value).toBe('2026-06-09');
	});
});
