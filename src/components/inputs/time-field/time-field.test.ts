import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import { parseTime, roundToStep, type NLDDTimeField } from './time-field.js';
import './time-field.js';

async function typeInto(el: NLDDTimeField, text: string, commit = false) {
	const input = el.shadowRoot!.querySelector('input')!;
	input.value = text;
	input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
	if (commit) input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
	await waitForUpdate(el);
	return input;
}


/* ============================================================
   Parsen
   ============================================================ */

describe('parseTime', () => {
	it.each([
		['9', '09:00'],
		['09', '09:00'],
		['14', '14:00'],
		['0', '00:00'],
		['23', '23:00'],
		['9:5', '09:05'],
		['9:30', '09:30'],
		['09:30', '09:30'],
		['9.30', '09:30'],
		['9,30', '09:30'],
		['9u30', '09:30'],
		['9U30', '09:30'],
		['9h30', '09:30'],
		['9u', '09:00'],
		['930', '09:30'],
		['0930', '09:30'],
		['1430', '14:30'],
		['  9:30  ', '09:30'],
	])('leest %s als %s', (raw, expected) => {
		expect(parseTime(raw)).toBe(expected);
	});

	it.each([
		[''],
		['   '],
		['abc'],
		['25:00'],
		['9:60'],
		['24:00'],
		['12345'],
		// Halverwege het typen: een leesteken zonder minuten is nog geen waarde.
		['9:'],
		['9.'],
		[':30'],
		['-1'],
	])('wijst %s af', (raw) => {
		expect(parseTime(raw)).toBeNull();
	});
});


/* ============================================================
   Afronden
   ============================================================ */

describe('roundToStep', () => {
	it('rondt af naar de dichtstbijzijnde stap', () => {
		expect(roundToStep('09:07', 15)).toBe('09:00');
		expect(roundToStep('09:08', 15)).toBe('09:15');
	});

	it('rondt een gelijkstand naar boven af', () => {
		expect(roundToStep('09:05', 10)).toBe('09:10');
	});

	it('telt de stap vanaf de basis', () => {
		expect(roundToStep('09:07', 15, '09:07')).toBe('09:07');
		expect(roundToStep('09:20', 15, '09:07')).toBe('09:22');
	});

	it('rondt niets af bij stap 1', () => {
		expect(roundToStep('09:07', 1)).toBe('09:07');
	});

	it('rolt niet door over de dagrand', () => {
		expect(roundToStep('23:53', 15)).toBe('23:45');
		expect(roundToStep('23:59', 30)).toBe('23:30');
	});
});


/* ============================================================
   Smoke
   ============================================================ */

describe('nldd-time-field', () => {
	let el: NLDDTimeField;

	afterEach(() => { if (el) cleanup(el); vi.restoreAllMocks(); });

	it('rendert zonder fouten', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field></nldd-time-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('toont een waarde uit het attribuut in de input', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field value="09:30"></nldd-time-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.value).toBe('09:30');
	});
});


/* ============================================================
   Waarde en normaliseren
   ============================================================ */

describe('nldd-time-field – waarde', () => {
	let el: NLDDTimeField;

	afterEach(() => { if (el) cleanup(el); });

	it('zet value tijdens typen zodra er iets leesbaars staat', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field></nldd-time-field>');
		await typeInto(el, '9u30');
		expect(el.value).toBe('09:30');
	});

	it('normaliseert de weergave bij commit', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field></nldd-time-field>');
		const input = await typeInto(el, '9u30', true);
		expect(input.value).toBe('09:30');
		expect(el.value).toBe('09:30');
	});

	it('laat onleesbare tekst staan en houdt value leeg', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field></nldd-time-field>');
		const input = await typeInto(el, 'morgenvroeg', true);
		expect(input.value).toBe('morgenvroeg');
		expect(el.value).toBe('');
	});

	it('rondt bij commit af op de stap', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field step="15"></nldd-time-field>');
		const input = await typeInto(el, '09:08', true);
		expect(el.value).toBe('09:15');
		expect(input.value).toBe('09:15');
	});

	// Lit slaat een DOM-write over zodra de nieuwe tekst gelijk is aan wat het
	// laatst gerenderd stond. Precies wat er gebeurt als je een genormaliseerde
	// waarde anders overtypt: 09:30 wordt 930 en rondt terug naar 09:30.
	it('normaliseert ook wanneer de nieuwe tekst gelijk is aan de vorige waarde', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field value="09:30"></nldd-time-field>');
		await waitForUpdate(el);
		const input = await typeInto(el, '930', true);
		expect(input.value).toBe('09:30');
		expect(el.value).toBe('09:30');
	});

	it('rondt niet af tijdens typen', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field step="15"></nldd-time-field>');
		await typeInto(el, '09:08');
		expect(el.value).toBe('09:08');
	});
});


/* ============================================================
   Grenzen
   ============================================================ */

describe('nldd-time-field – grenzen', () => {
	let el: NLDDTimeField;

	afterEach(() => { if (el) cleanup(el); });

	it('weigert een tijd voor min en laat de tekst staan', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field min="09:00"></nldd-time-field>');
		const input = await typeInto(el, '08:00', true);
		expect(el.value).toBe('');
		expect(input.value).toBe('08:00');
	});

	it('weigert een tijd na max', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field max="17:00"></nldd-time-field>');
		await typeInto(el, '17:01', true);
		expect(el.value).toBe('');
	});

	it('accepteert de grenzen zelf', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field min="09:00" max="17:00"></nldd-time-field>');
		await typeInto(el, '09:00', true);
		expect(el.value).toBe('09:00');
		await typeInto(el, '17:00', true);
		expect(el.value).toBe('17:00');
	});

	it('telt de stap vanaf min', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field min="09:07" step="15"></nldd-time-field>');
		await typeInto(el, '09:20', true);
		expect(el.value).toBe('09:22');
	});
});


/* ============================================================
   Events
   ============================================================ */

describe('nldd-time-field – events', () => {
	let el: NLDDTimeField;

	afterEach(() => { if (el) cleanup(el); });

	it('vuurt één input-event per toetsaanslag, nooit ook het native event', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field></nldd-time-field>');
		const details: unknown[] = [];
		el.addEventListener('input', ((e: CustomEvent) => { details.push(e.detail); }) as EventListener);
		await typeInto(el, '09:30');
		expect(details).toEqual([{ value: '09:30' }]);
	});

	it('vuurt één change-event per commit', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field></nldd-time-field>');
		const details: unknown[] = [];
		el.addEventListener('change', ((e: CustomEvent) => { details.push(e.detail); }) as EventListener);
		const input = el.shadowRoot!.querySelector('input')!;
		input.value = '9u30';
		input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(details).toEqual([{ value: '09:30' }]);
	});

	it('geeft een lege waarde door zodra de invoer onleesbaar wordt', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field value="09:30"></nldd-time-field>');
		await waitForUpdate(el);
		const seen: string[] = [];
		el.addEventListener('input', ((e: CustomEvent) => { seen.push(e.detail.value); }) as EventListener);
		await typeInto(el, 'x');
		expect(seen).toEqual(['']);
	});
});


/* ============================================================
   Pijltjestoetsen
   ============================================================ */

describe('nldd-time-field – pijltjestoetsen', () => {
	let el: NLDDTimeField;

	afterEach(() => { if (el) cleanup(el); });

	async function arrow(field: NLDDTimeField, key: 'ArrowUp' | 'ArrowDown') {
		const input = field.shadowRoot!.querySelector('input')!;
		input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true, cancelable: true }));
		await waitForUpdate(field);
		return input;
	}

	it('verspringt met de stap vanaf een bestaande waarde', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field value="09:00" step="15"></nldd-time-field>');
		await waitForUpdate(el);
		await arrow(el, 'ArrowUp');
		expect(el.value).toBe('09:15');
		await arrow(el, 'ArrowDown');
		expect(el.value).toBe('09:00');
	});

	it('begint op min wanneer het veld leeg is', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field min="09:00" step="15"></nldd-time-field>');
		await waitForUpdate(el);
		await arrow(el, 'ArrowUp');
		expect(el.value).toBe('09:00');
	});

	it('begint zonder min op de huidige tijd, afgerond op de stap', async () => {
		// Geen fake timers: die bevriezen ook de klok waar Lit zijn update-cyclus
		// op plant, en dan komt waitForUpdate nooit terug. De echte klok kan
		// tijdens de test een minuut verspringen, dus beide uitkomsten mogen.
		const asTime = (d: Date) => roundToStep(
			`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
			15,
		);
		el = await fixture<NLDDTimeField>('<nldd-time-field step="15"></nldd-time-field>');
		await waitForUpdate(el);
		const before = asTime(new Date());
		await arrow(el, 'ArrowUp');
		const after = asTime(new Date());
		expect([before, after]).toContain(el.value);
	});

	it('komt niet voorbij max', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field value="17:00" max="17:00" step="15"></nldd-time-field>');
		await waitForUpdate(el);
		await arrow(el, 'ArrowUp');
		expect(el.value).toBe('17:00');
	});

	it('doet niets wanneer het veld readonly is', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field value="09:00" readonly></nldd-time-field>');
		await waitForUpdate(el);
		await arrow(el, 'ArrowUp');
		expect(el.value).toBe('09:00');
	});
});


/* ============================================================
   Toegankelijkheid
   ============================================================ */

describe('nldd-time-field – toegankelijkheid', () => {
	let el: NLDDTimeField;

	afterEach(() => { if (el) cleanup(el); });

	it('valt terug op een Nederlands label zonder accessible-label', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field></nldd-time-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-label')).toBe('Tijd');
	});

	it('zet accessible-label op de input', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field accessible-label="Starttijd"></nldd-time-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-label')).toBe('Starttijd');
	});

	it('geeft error-message-ids door aan aria-describedby', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field error-message-ids="err-1"></nldd-time-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-describedby')).toBe('err-1');
	});

	it('opent een cijfertoetsenbord op mobiel', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field></nldd-time-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('inputmode')).toBe('numeric');
	});
});


/* ============================================================
   Picker
   ============================================================ */

describe('nldd-time-field – picker', () => {
	let el: NLDDTimeField;

	afterEach(() => { if (el) cleanup(el); });

	it('toont standaard een knop om de picker te openen', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field></nldd-time-field>');
		await waitForUpdate(el);
		const knop = el.shadowRoot!.querySelector('.time-field__picker-button nldd-icon-button');
		expect(knop).not.toBeNull();
		expect(knop!.getAttribute('text')).toBe('Tijd kiezen');
	});

	it('verbergt de knop met no-picker', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field no-picker></nldd-time-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.time-field__picker-button')).toBeNull();
	});

	// De maat van een knop is een attribuut en dus niet met een media query te
	// kiezen; het veld stelt dezelfde vraag daarom in JS.
	it('kiest de knopmaat op het aanwijzertype', async () => {
		el = await fixture<NLDDTimeField>('<nldd-time-field></nldd-time-field>');
		await waitForUpdate(el);
		const verwacht = matchMedia('(pointer: fine)').matches ? 'sm' : 'md';
		expect(el._pickerButtonSize).toBe(verwacht);
	});
});


/* ============================================================
   Formulier
   ============================================================ */

describe('nldd-time-field – formulier', () => {
	let el: NLDDTimeField;

	afterEach(() => { if (el) cleanup(el); });

	it('draagt zijn waarde bij aan de formulierdata', async () => {
		const form = await fixture<HTMLFormElement>(`
			<form>
				<nldd-time-field name="start" value="09:30"></nldd-time-field>
			</form>
		`);
		el = form.querySelector('nldd-time-field')!;
		await waitForUpdate(el);
		expect(new FormData(form).get('start')).toBe('09:30');
		cleanup(form);
	});

	it('zet bij reset terug naar de beginwaarde', async () => {
		const form = await fixture<HTMLFormElement>(`
			<form>
				<nldd-time-field name="start" value="09:30"></nldd-time-field>
			</form>
		`);
		el = form.querySelector('nldd-time-field')!;
		await waitForUpdate(el);
		await typeInto(el, '11:00', true);
		expect(el.value).toBe('11:00');
		form.reset();
		await waitForUpdate(el);
		expect(el.value).toBe('09:30');
		expect(el.shadowRoot!.querySelector('input')!.value).toBe('09:30');
		cleanup(form);
	});
});
