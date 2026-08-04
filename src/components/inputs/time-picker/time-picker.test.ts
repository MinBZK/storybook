import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDTimePicker } from './time-picker.js';
import './time-picker.js';

function column(el: NLDDTimePicker, name: 'hours' | 'minutes'): HTMLElement {
	return el.shadowRoot!.querySelector(`[data-column="${name}"]`)!;
}

function options(el: NLDDTimePicker, name: 'hours' | 'minutes'): string[] {
	return [...column(el, name).querySelectorAll('.time-picker__option')].map((o) => o.textContent!.trim());
}

function selected(el: NLDDTimePicker, name: 'hours' | 'minutes'): string | null {
	return column(el, name).querySelector('[data-selected]')?.textContent?.trim() ?? null;
}

function band(el: NLDDTimePicker, name: 'hours' | 'minutes'): HTMLElement {
	const index = name === 'hours' ? 0 : 1;
	return [...el.shadowRoot!.querySelectorAll<HTMLElement>('.time-picker__band-value')][index];
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
		const tien = [...column(el, 'hours').querySelectorAll('.time-picker__option')][10] as HTMLElement;
		tien.click();
		await waitForUpdate(el);
		expect(seen).toEqual(['10:30']);
	});

	// Anders spring je bij elk uur terug naar :00 en moet je de minuut opnieuw
	// zoeken, terwijl je alleen het uur wilde verschuiven.
	it('houdt de minuut vast bij het wisselen van uur', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:45" step="15"></nldd-time-picker>');
		await waitForUpdate(el);
		const veertien = [...column(el, 'hours').querySelectorAll('.time-picker__option')][14] as HTMLElement;
		veertien.click();
		await waitForUpdate(el);
		expect(el.value).toBe('14:45');
	});

	it('valt terug op de eerste mogelijke minuut als de huidige niet past', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:45" min="09:00" max="10:15" step="15"></nldd-time-picker>');
		await waitForUpdate(el);
		const tien = [...column(el, 'hours').querySelectorAll('.time-picker__option')][1] as HTMLElement;
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

	it('wisselt met links en rechts van kolom in plaats van de waarde te verzetten', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		await press(el, 'hours', 'ArrowRight');
		expect(el.value).toBe('09:30');
		expect(el.shadowRoot!.activeElement?.textContent?.trim()).toBe('30');
		await press(el, 'minutes', 'ArrowLeft');
		expect(el.shadowRoot!.activeElement?.textContent?.trim()).toBe('09');
	});

	it('wisselt in het wiel tussen de twee spinbuttons', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker variant="wheel" value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		const uur = [...el.shadowRoot!.querySelectorAll<HTMLElement>('.time-picker__band-value')][0];
		uur.dispatchEvent(new KeyboardEvent('keydown', {
			key: 'ArrowRight', bubbles: true, composed: true, cancelable: true,
		}));
		await waitForUpdate(el);
		expect(el.shadowRoot!.activeElement?.getAttribute('aria-label')).toBe('Minuut');
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
		const bereikbaar = [...column(el, 'hours').querySelectorAll('.time-picker__option')]
			.filter((o) => o.getAttribute('tabindex') === '0');
		expect(bereikbaar).toHaveLength(1);
		expect(bereikbaar[0].textContent!.trim()).toBe('09');
	});

	it('maakt zonder waarde de eerste optie bereikbaar', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker></nldd-time-picker>');
		await waitForUpdate(el);
		const bereikbaar = [...column(el, 'hours').querySelectorAll('.time-picker__option')]
			.filter((o) => o.getAttribute('tabindex') === '0');
		expect(bereikbaar).toHaveLength(1);
		expect(bereikbaar[0].textContent!.trim()).toBe('00');
	});
});


/* ============================================================
   Wiel
   ============================================================ */

describe('nldd-time-picker – wiel', () => {
	let el: NLDDTimePicker;

	afterEach(() => { if (el) cleanup(el); });

	it('toont een band in het midden, alleen in wiel-modus', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.time-picker__band')).toBeNull();
		el.variant = 'wheel';
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.time-picker__band')).not.toBeNull();
	});

	// Wat je in het wiel bedient is de band, niet de lijst erachter, en een wiel
	// ís een spinbutton. De kolommen zijn dan decor: aria-hidden, niet focusbaar,
	// zodat de waarden niet dubbel worden voorgelezen en focus de scrollpositie
	// niet meer verstoort.
	it('legt de betekenis in de band en verbergt de kolommen', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker variant="wheel" value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		expect(column(el, 'hours').getAttribute('aria-hidden')).toBe('true');
		expect(column(el, 'hours').getAttribute('role')).toBe('presentation');
		const focusbaar = [...column(el, 'hours').querySelectorAll('[tabindex="0"]')];
		expect(focusbaar).toHaveLength(0);
	});

	it('geeft uur en minuut elk een eigen spinbutton', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker variant="wheel" value="09:30" step="15"></nldd-time-picker>');
		await waitForUpdate(el);
		const uur = band(el, 'hours');
		expect(uur.getAttribute('role')).toBe('spinbutton');
		expect(uur.getAttribute('aria-label')).toBe('Uur');
		expect(uur.getAttribute('tabindex')).toBe('0');
		expect(uur.getAttribute('aria-valuenow')).toBe('9');
		expect(uur.getAttribute('aria-valuetext')).toBe('09');
		const minuut = band(el, 'minutes');
		expect(minuut.getAttribute('aria-valuemin')).toBe('0');
		expect(minuut.getAttribute('aria-valuemax')).toBe('45');
	});

	it('verzet de waarde met de pijltjes op de band', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker variant="wheel" value="09:30" step="15"></nldd-time-picker>');
		await waitForUpdate(el);
		band(el, 'minutes').dispatchEvent(new KeyboardEvent('keydown', {
			key: 'ArrowDown', bubbles: true, composed: true, cancelable: true,
		}));
		await waitForUpdate(el);
		expect(el.value).toBe('09:45');
	});

	// De band ligt over het midden van beide kolommen. Vangt hij de muis, dan
	// scrolt een veeg precies daar niet de kolom eronder, en dat is nou net de
	// plek waar je hem neerzet.
	it('laat de muis door de band heen naar de kolom eronder', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker variant="wheel" value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		const band = el.shadowRoot!.querySelector('.time-picker__band')!;
		expect(getComputedStyle(band).pointerEvents).toBe('none');
		for (const waarde of el.shadowRoot!.querySelectorAll('.time-picker__band-value')) {
			expect(getComputedStyle(waarde).pointerEvents).toBe('none');
		}
	});

	// De band zegt al welke waarde geldt, en het veld eromheen ook. Een tweede
	// markering in de kolom voegt niets toe en concurreert ermee zodra je
	// ervandaan scrolt.
	it('markeert de gekozen waarde niet in de kolom', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker variant="wheel" value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		const gekozen = column(el, 'hours').querySelector('[data-selected]')!;
		const gewoon = column(el, 'hours').querySelectorAll('.time-picker__option')[3];
		const stijl = (el: Element) => {
			const s = getComputedStyle(el);
			return { kleur: s.color, vlak: s.backgroundColor };
		};
		expect(stijl(gekozen)).toEqual(stijl(gewoon));
	});

	it('houdt in de lijst-variant de listbox-semantiek', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		expect(column(el, 'hours').getAttribute('role')).toBe('listbox');
		expect(column(el, 'hours').getAttribute('aria-label')).toBe('Uur');
		expect(selected(el, 'hours')).toBe('09');
	});

	it('kiest de waarde die in het midden tot stilstand komt', async () => {
		// variables.css wordt hier niet geladen, dus de kolom zou zonder deze token
		// geen vaste hoogte hebben en helemaal niet scrollen.
		el = await fixture<NLDDTimePicker>(
			'<nldd-time-picker variant="wheel" value="09:30" style="--semantics-controls-md-min-size: 44px"></nldd-time-picker>',
		);
		await waitForUpdate(el);
		// De picker scrolt bij het renderen zelf naar de gekozen waarde en negeert
		// scroll-events zolang die beweging loopt. Wachten tot die afscherming weg
		// is, anders wordt deze scroll voor de zijne aangezien.
		await new Promise((r) => setTimeout(r, 250));
		const kolom = column(el, 'hours');
		const optie = [...kolom.querySelectorAll<HTMLElement>('.time-picker__option')][14];
		// Uit de gemeten posities, niet uit een aangenomen formule: dit is precies
		// de rekensom die de component omkeert om te bepalen wat er in het midden
		// staat.
		kolom.scrollTop = optie.offsetTop + optie.offsetHeight / 2 - kolom.clientHeight / 2;
		kolom.dispatchEvent(new Event('scroll'));
		await new Promise((r) => setTimeout(r, 250));
		expect(el.value).toBe('14:30');
	});

	// De band moet elke beweging volgen, niet de vastgelegde waarde: anders blijft
	// het getal staan terwijl de kolom eronder schuift, en liegt hij over waar je
	// bent.
	it('toont tijdens het scrollen wat er in het midden ligt, voordat het vastligt', async () => {
		el = await fixture<NLDDTimePicker>(
			'<nldd-time-picker variant="wheel" value="09:30" style="--semantics-controls-md-min-size: 44px"></nldd-time-picker>',
		);
		await waitForUpdate(el);
		await new Promise((r) => setTimeout(r, 250));
		const kolom = column(el, 'hours');
		const optie = [...kolom.querySelectorAll<HTMLElement>('.time-picker__option')][14];
		kolom.scrollTop = optie.offsetTop + optie.offsetHeight / 2 - kolom.clientHeight / 2;
		kolom.dispatchEvent(new Event('scroll'));
		await waitForUpdate(el);
		const inBand = () => el.shadowRoot!.querySelector('.time-picker__band')!
			.textContent!.replace(/\s+/g, '');
		expect(inBand()).toBe('14:30');
		expect(el.value).toBe('09:30');
		await new Promise((r) => setTimeout(r, 250));
		expect(el.value).toBe('14:30');
	});

	it('kiest niets bij scrollen in de lijst-variant', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		const kolom = column(el, 'hours');
		kolom.scrollTop = 0;
		kolom.dispatchEvent(new Event('scroll'));
		await new Promise((r) => setTimeout(r, 250));
		expect(el.value).toBe('09:30');
	});

	// Zonder deze afscherming zou het in beeld scrollen van de gekozen waarde
	// onderweg iets anders kiezen.
	it('kiest niets tijdens het eigen scrollen naar de gekozen waarde', async () => {
		el = await fixture<NLDDTimePicker>('<nldd-time-picker variant="wheel" value="09:30"></nldd-time-picker>');
		await waitForUpdate(el);
		el.scrollSelectedIntoView();
		const kolom = column(el, 'hours');
		kolom.scrollTop = 0;
		kolom.dispatchEvent(new Event('scroll'));
		await new Promise((r) => setTimeout(r, 250));
		expect(el.value).toBe('09:30');
	});
});
