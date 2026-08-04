import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDTimePicker } from './time-picker.js';
import './time-picker.js';

function column(el: NLDDTimePicker, name: 'hours' | 'minutes'): HTMLElement {
	return el.shadowRoot!.querySelector(`[data-column="${name}"]`)!;
}

function options(el: NLDDTimePicker, name: 'hours' | 'minutes'): string[] {
	return [...column(el, name).querySelectorAll('[role="option"]')].map((o) => o.textContent!.trim());
}

function selected(el: NLDDTimePicker, name: 'hours' | 'minutes'): string | null {
	return column(el, name).querySelector('[aria-selected="true"]')?.textContent?.trim() ?? null;
}

async function press(el: NLDDTimePicker, name: 'hours' | 'minutes', key: string) {
	column(el, name).dispatchEvent(new KeyboardEvent('keydown', {
		key, bubbles: true, composed: true, cancelable: true,
	}));
	await waitForUpdate(el);
}


/* ============================================================
   Smoke en kolommen
   ============================================================ */

describe('nldd-time-picker', () => {
	let el: NLDDTimePicker;

	afterEach(() => { if (el) cleanup(el); });

	it('rendert zonder fouten', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker></nldd-time-picker>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('toont 24 uren en 60 minuten bij de standaardstap', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker></nldd-time-picker>');
		await waitForUpdate(el);
		expect(options(el, 'hours')).toHaveLength(24);
		expect(options(el, 'minutes')).toHaveLength(60);
	});

	it('toont per stap alleen de geldige minuten', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker step="15"></nldd-time-picker>');
		await waitForUpdate(el);
		expect(options(el, 'minutes')).toEqual(['00', '15', '30', '45']);
	});

	it('telt de stap vanaf min', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker min="09:07" step="15"></nldd-time-picker>');
		await waitForUpdate(el);
		expect(options(el, 'minutes')).toEqual(['07', '22', '37', '52']);
	});

	it('laat uren buiten min en max weg', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker min="09:00" max="11:00"></nldd-time-picker>');
		await waitForUpdate(el);
		expect(options(el, 'hours')).toEqual(['09', '10', '11']);
	});

	it('toont in het laatste uur alleen de minuten tot en met max', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="11:00" min="09:00" max="11:30" step="15"></nldd-time-picker>');
		await waitForUpdate(el);
		expect(options(el, 'minutes')).toEqual(['00', '15', '30']);
	});
});


/* ============================================================
   Kiezen
   ============================================================ */

describe('nldd-time-picker – kiezen', () => {
	let el: NLDDTimePicker;

	afterEach(() => { if (el) cleanup(el); });

	it('markeert de gekozen tijd in beide kolommen', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		expect(selected(el, 'hours')).toBe('09');
		expect(selected(el, 'minutes')).toBe('30');
	});

	it('vuurt change bij een klik op een uur', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		const seen: string[] = [];
		el.addEventListener('change', ((e: CustomEvent) => { seen.push(e.detail.value); }) as EventListener);
		const tien = [...column(el, 'hours').querySelectorAll('[role="option"]')][10] as HTMLElement;
		tien.click();
		await waitForUpdate(el);
		expect(seen).toEqual(['10:30']);
	});

	// Anders spring je bij elk uur terug naar :00 en moet je de minuut opnieuw
	// zoeken, terwijl je alleen het uur wilde verschuiven.
	it('houdt de minuut vast bij het wisselen van uur', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:45" step="15"></nldd-time-picker>');
		await waitForUpdate(el);
		const veertien = [...column(el, 'hours').querySelectorAll('[role="option"]')][14] as HTMLElement;
		veertien.click();
		await waitForUpdate(el);
		expect(el.value).toBe('14:45');
	});

	it('valt terug op de eerste mogelijke minuut als de huidige niet past', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:45" min="09:00" max="10:15" step="15"></nldd-time-picker>');
		await waitForUpdate(el);
		const tien = [...column(el, 'hours').querySelectorAll('[role="option"]')][1] as HTMLElement;
		tien.click();
		await waitForUpdate(el);
		expect(el.value).toBe('10:00');
	});

	it('vuurt niets als dezelfde waarde opnieuw wordt gekozen', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		const seen: string[] = [];
		el.addEventListener('change', ((e: CustomEvent) => { seen.push(e.detail.value); }) as EventListener);
		(column(el, 'minutes').querySelector('[aria-selected="true"]') as HTMLElement).click();
		await waitForUpdate(el);
		expect(seen).toEqual([]);
	});
});


/* ============================================================
   Toetsenbord
   ============================================================ */

describe('nldd-time-picker – toetsenbord', () => {
	let el: NLDDTimePicker;

	afterEach(() => { if (el) cleanup(el); });

	it('loopt met de pijltoetsen door een kolom', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		await press(el, 'hours', 'ArrowDown');
		expect(el.value).toBe('10:30');
		await press(el, 'hours', 'ArrowUp');
		expect(el.value).toBe('09:30');
	});

	it('springt met Home en End naar de randen van de kolom', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		await press(el, 'hours', 'Home');
		expect(el.value).toBe('00:30');
		await press(el, 'hours', 'End');
		expect(el.value).toBe('23:30');
	});

	it('blijft binnen de kolom aan de randen', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="00:00"></nldd-time-picker>');
		await waitForUpdate(el);
		await press(el, 'hours', 'ArrowUp');
		expect(el.value).toBe('00:00');
	});

	it('verspringt in de minutenkolom met de stap', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:00" step="15"></nldd-time-picker>');
		await waitForUpdate(el);
		await press(el, 'minutes', 'ArrowDown');
		expect(el.value).toBe('09:15');
	});
});


/* ============================================================
   Toegankelijkheid
   ============================================================ */

describe('nldd-time-picker – toegankelijkheid', () => {
	let el: NLDDTimePicker;

	afterEach(() => { if (el) cleanup(el); });

	it('geeft elke kolom een eigen naam', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker></nldd-time-picker>');
		await waitForUpdate(el);
		expect(column(el, 'hours').getAttribute('aria-label')).toBe('Uur');
		expect(column(el, 'minutes').getAttribute('aria-label')).toBe('Minuut');
		expect(column(el, 'hours').getAttribute('role')).toBe('listbox');
	});

	it('valt terug op een Nederlandse naam voor het geheel', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker></nldd-time-picker>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="group"]')!.getAttribute('aria-label')).toBe('Tijd kiezen');
	});

	// Eén tab-stop per kolom: anders loop je met Tab door 24 uren voordat je bij
	// de minuten bent.
	it('houdt per kolom één optie bereikbaar met Tab', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		const bereikbaar = [...column(el, 'hours').querySelectorAll('[role="option"]')]
			.filter((o) => o.getAttribute('tabindex') === '0');
		expect(bereikbaar).toHaveLength(1);
		expect(bereikbaar[0].textContent!.trim()).toBe('09');
	});

	it('maakt zonder waarde de eerste optie bereikbaar', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker></nldd-time-picker>');
		await waitForUpdate(el);
		const bereikbaar = [...column(el, 'hours').querySelectorAll('[role="option"]')]
			.filter((o) => o.getAttribute('tabindex') === '0');
		expect(bereikbaar).toHaveLength(1);
		expect(bereikbaar[0].textContent!.trim()).toBe('00');
	});
});
