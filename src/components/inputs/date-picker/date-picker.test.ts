import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './date-picker.js';
import { datePickerStyles } from './date-picker.styles.js';
import type { NLDDDatePicker } from './date-picker.js';

function days(el: NLDDDatePicker): HTMLButtonElement[] {
	return Array.from(el.shadowRoot!.querySelectorAll('.date-picker__day'));
}

/** Keyed on the full date: with neighboring months shown, day numbers repeat. */
function dayFor(el: NLDDDatePicker, iso: string): HTMLButtonElement {
	return el.shadowRoot!.querySelector(`.date-picker__day[data-date="${iso}"]`)!;
}

function focusedIso(el: NLDDDatePicker): string {
	return el._focused;
}

function title(el: NLDDDatePicker): string {
	return el.shadowRoot!.querySelector('.date-picker__title')!.textContent!.replace(/\s+/g, ' ').trim();
}

function announcement(el: NLDDDatePicker): string {
	return el.shadowRoot!.querySelector('.date-picker__announcer')!.textContent!.trim();
}

/** Keyboard events are handled on the grid, so they bubble up from the focused day. */
async function press(el: NLDDDatePicker, key: string, shiftKey = false): Promise<void> {
	const target = el.shadowRoot!.querySelector('.date-picker__day[tabindex="0"]')!;
	target.dispatchEvent(new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, composed: true }));
	await waitForUpdate(el);
}

function todayIso(): string {
	const now = new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

// Fixtures zonder gekozen datum openen op de huidige maand, terwijl de tests
// dagen in juli 2026 aanklikken. `max="2026-07-31"` klemt die beginweergave op
// juli (zie _initialFocus), zodat ze niet stukgaan zodra de kalender verder
// loopt. Tests die bewust op vandaag klikken houden geen grens.
describe('nldd-date-picker', () => {
	let el: NLDDDatePicker;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker></nldd-date-picker>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});


	// # Rooster

	it('zet de eerste dag van de maand op de juiste weekdag', async () => {
		// 1 juli 2026 is een woensdag, dus met maandag vooraan vult juni de twee
		// cellen ervoor.
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		const cells = Array.from(el.shadowRoot!.querySelectorAll('tbody tr')[0].querySelectorAll('td'));
		const dateOf = (i: number) => cells[i].querySelector('button')!.getAttribute('data-date');
		expect(dateOf(0)).toBe('2026-06-29');
		expect(dateOf(1)).toBe('2026-06-30');
		expect(dateOf(2)).toBe('2026-07-01');
	});

	it('rendert elke dag van de maand precies één keer', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		const july = days(el).filter((d) => d.getAttribute('data-date')!.startsWith('2026-07-'));
		expect(july).toHaveLength(31);
		expect(new Set(july.map((d) => d.getAttribute('data-date'))).size).toBe(31);
	});

	// Vaste hoogte: anders verspringt de kalender bij het bladeren, en in een
	// popover schuift daarmee alles eronder mee.
	it('toont altijd zes weken', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-02-15"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('tbody tr')).toHaveLength(6);
		expect(days(el)).toHaveLength(42);
	});


	// # Dagen buiten de maand

	it('markeert dagen buiten de getoonde maand', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(dayFor(el, '2026-06-30').classList.contains('is-outside-month')).toBe(true);
		expect(dayFor(el, '2026-07-01').classList.contains('is-outside-month')).toBe(false);
	});

	// Het label noemt altijd de maand, dus een 1e van de volgende maand is niet te
	// verwarren met die van deze.
	it('noemt de maand in het label van een dag buiten de maand', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(dayFor(el, '2026-08-01').getAttribute('aria-label')).toContain('1 augustus 2026');
	});

	it('kiest een dag buiten de maand en springt naar die maand', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		dayFor(el, '2026-08-01').click();
		await waitForUpdate(el);
		expect(el.value).toBe('2026-08-01');
		expect(title(el)).toBe('Augustus 2026');
	});


	// # Weeknummers

	it('toont geen weeknummers zonder het attribuut', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.date-picker__week-cell')).toBeNull();
	});

	it('toont ISO-weeknummers met week-numbers', async () => {
		el = await fixture<NLDDDatePicker>(
			'<nldd-date-picker value="2026-07-15" week-numbers></nldd-date-picker>',
		);
		await waitForUpdate(el);
		const numbers = Array.from(el.shadowRoot!.querySelectorAll('.date-picker__week-cell'));
		expect(numbers).toHaveLength(6);
		// De week met 1 juli 2026 (woensdag) is ISO-week 27.
		expect(numbers[0].textContent!.trim()).toBe('27');
		expect(numbers[0].getAttribute('aria-label')).toBe('Week 27');
		expect(numbers[0].getAttribute('scope')).toBe('row');
	});

	// ISO-weken hangen aan de donderdag, dus het nummer mag niet verschuiven als
	// de rij op zondag begint.
	it('houdt het weeknummer gelijk bij een andere eerste weekdag', async () => {
		el = await fixture<NLDDDatePicker>(
			'<nldd-date-picker value="2026-07-15" week-numbers first-day-of-week="0"></nldd-date-picker>',
		);
		await waitForUpdate(el);
		const numbers = Array.from(el.shadowRoot!.querySelectorAll('.date-picker__week-cell'));
		expect(numbers[0].textContent!.trim()).toBe('27');
	});

	it('verschuift de kolommen met first-day-of-week', async () => {
		el = await fixture<NLDDDatePicker>(
			'<nldd-date-picker value="2026-07-15" first-day-of-week="0"></nldd-date-picker>',
		);
		await waitForUpdate(el);
		const headers = Array.from(el.shadowRoot!.querySelectorAll('.date-picker__weekday-header-cell'));
		expect(headers[0].textContent!.trim()).toBe('zo');
		// Met zondag vooraan schuift woensdag een plek op, dus drie lege cellen.
		const cells = Array.from(el.shadowRoot!.querySelectorAll('tbody tr')[0].querySelectorAll('td'));
		expect(cells[3].querySelector('button')!.textContent!.trim()).toBe('1');
	});

	it('toont de volledige weekdag als abbr, want "ma" alleen zegt niets', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker></nldd-date-picker>');
		await waitForUpdate(el);
		const first = el.shadowRoot!.querySelector('.date-picker__weekday-header-cell')!;
		expect(first.getAttribute('abbr')).toBe('maandag');
		expect(first.getAttribute('scope')).toBe('col');
	});

	it('is een grid met een gekoppelde maandtitel die wijzigingen aankondigt', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		const grid = el.shadowRoot!.querySelector('.date-picker__calendar')!;
		const heading = el.shadowRoot!.querySelector('.date-picker__title')!;
		expect(grid.getAttribute('role')).toBe('grid');
		expect(grid.getAttribute('aria-labelledby')).toBe(heading.id);
		expect(heading.getAttribute('aria-live')).toBe('polite');
		expect(title(el)).toBe('Juli 2026');
	});

	// aria-labelledby wint van aria-label in de accessible-name-berekening, dus met
	// beide erop bereikte de gedocumenteerde accessible-label de schermlezer nooit.
	it('laat accessible-label de grid benoemen in plaats van de maandtitel', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker accessible-label="Geboortedatum"></nldd-date-picker>');
		await waitForUpdate(el);
		const grid = el.shadowRoot!.querySelector('.date-picker__calendar')!;
		expect(grid.getAttribute('aria-label')).toBe('Geboortedatum');
		expect(grid.getAttribute('aria-labelledby')).toBeNull();
	});


	// # Toetsenbord

	it('houdt precies één dag in de tab-volgorde', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(days(el).filter((d) => d.getAttribute('tabindex') === '0')).toHaveLength(1);
	});

	it.each([
		['ArrowLeft', false, '2026-07-14'],
		['ArrowRight', false, '2026-07-16'],
		['ArrowUp', false, '2026-07-08'],
		['ArrowDown', false, '2026-07-22'],
		['Home', false, '2026-07-13'],
		['End', false, '2026-07-19'],
		['PageUp', false, '2026-06-15'],
		['PageDown', false, '2026-08-15'],
		['PageUp', true, '2025-07-15'],
		['PageDown', true, '2027-07-15'],
	])('verplaatst de focus met %s (shift: %s)', async (key, shift, expected) => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		await press(el, key, shift);
		expect(focusedIso(el)).toBe(expected);
	});

	it('neemt de maand mee wanneer de focus over de maandgrens gaat', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		await press(el, 'ArrowRight');
		expect(focusedIso(el)).toBe('2026-08-01');
		expect(title(el)).toBe('Augustus 2026');
	});

	it.each([['Enter'], [' ']])('kiest de datum met %s', async (key) => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		await press(el, 'ArrowRight');
		await press(el, key);
		expect(el.value).toBe('2026-07-16');
	});


	// # Grenzen

	it('markeert datums buiten min en max als niet beschikbaar', async () => {
		el = await fixture<NLDDDatePicker>(
			'<nldd-date-picker value="2026-07-15" min="2026-07-10" max="2026-07-20"></nldd-date-picker>',
		);
		await waitForUpdate(el);
		expect(dayFor(el, '2026-07-09').getAttribute('aria-disabled')).toBe('true');
		expect(dayFor(el, '2026-07-10').getAttribute('aria-disabled')).toBeNull();
		expect(dayFor(el, '2026-07-21').getAttribute('aria-disabled')).toBe('true');
	});

	it('accepteert today met een verschuiving als grens', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker max="today"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(el._max).toBe(todayIso());
	});

	it('kiest een datum buiten de grenzen niet', async () => {
		el = await fixture<NLDDDatePicker>(
			'<nldd-date-picker value="2026-07-15" min="2026-07-10"></nldd-date-picker>',
		);
		await waitForUpdate(el);
		dayFor(el, '2026-07-05').click();
		await waitForUpdate(el);
		expect(el.value).toBe('2026-07-15');
	});

	it('markeert losse datums via is-date-unavailable en weigert ze', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		el.isDateUnavailable = (iso) => iso === '2026-07-16';
		await waitForUpdate(el);
		expect(dayFor(el, '2026-07-16').getAttribute('aria-disabled')).toBe('true');
		dayFor(el, '2026-07-16').click();
		await waitForUpdate(el);
		expect(el.value).toBe('2026-07-15');
	});

	// Blijft focusbaar, anders slaat het pijltje een geblokkeerde dag stilzwijgend over.
	it('houdt een niet-beschikbare dag bereikbaar met het toetsenbord', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		el.isDateUnavailable = (iso) => iso === '2026-07-16';
		await waitForUpdate(el);
		expect(dayFor(el, '2026-07-16').hasAttribute('disabled')).toBe(false);
		await press(el, 'ArrowRight');
		expect(focusedIso(el)).toBe('2026-07-16');
	});


	// # Vandaag

	it('markeert vandaag met aria-current', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker></nldd-date-picker>');
		await waitForUpdate(el);
		const current = days(el).filter((d) => d.getAttribute('aria-current') === 'date');
		expect(current).toHaveLength(1);
		expect(current[0].textContent!.trim()).toBe(String(Number(todayIso().slice(8, 10))));
	});


	// # Periode

	it('kiest een periode in twee stappen', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range start="2026-07-01"></nldd-date-picker>');
		await waitForUpdate(el);
		dayFor(el, '2026-07-10').click();
		await waitForUpdate(el);
		expect(el.start).toBe('2026-07-10');
		expect(el.end).toBe('');

		dayFor(el, '2026-07-20').click();
		await waitForUpdate(el);
		expect(el.start).toBe('2026-07-10');
		expect(el.end).toBe('2026-07-20');
	});

	// De tweede keuze mag ook vóór de eerste liggen; de aankondiging moet dat
	// zeggen, anders stuurt hij een schermlezergebruiker maar één kant op.
	it('kondigt de tussenstap aan zonder een richting voor te schrijven', async () => {
		// Geen bovengrens: deze test klikt op vandaag en is daarmee zelf al
		// datumonafhankelijk.
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range></nldd-date-picker>');
		await waitForUpdate(el);
		dayFor(el, todayIso()).click();
		await waitForUpdate(el);
		expect(announcement(el)).toContain('Kies nu een tweede datum');
		expect(announcement(el)).toMatch(/eerder of later/);
		expect(announcement(el)).not.toMatch(/einddatum|begindatum/i);
	});

	it('kondigt de volledige periode aan', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		el.start = '2026-07-01';
		await waitForUpdate(el);
		dayFor(el, '2026-07-10').click();
		await waitForUpdate(el);
		dayFor(el, '2026-07-20').click();
		await waitForUpdate(el);
		expect(announcement(el)).toContain('tot en met');
	});

	// Het voorbeeld onder de muis tekent de band al achteruit, dus hier opnieuw
	// beginnen zou het enige gedrag zijn dat de kalender tegenspreekt.
	it('maakt de periode af wanneer de tweede datum vóór de eerste ligt', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range start="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		dayFor(el, '2026-07-20').click();
		await waitForUpdate(el);
		dayFor(el, '2026-07-10').click();
		await waitForUpdate(el);
		expect(el.start).toBe('2026-07-10');
		expect(el.end).toBe('2026-07-20');
	});

	// Opnieuw beginnen blijft mogelijk: de klik ná een afgeronde periode start er een.
	it('begint een nieuwe periode na een afgeronde periode', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range start="2026-07-10"></nldd-date-picker>');
		el.end = '2026-07-20';
		await waitForUpdate(el);
		dayFor(el, '2026-07-05').click();
		await waitForUpdate(el);
		expect(el.start).toBe('2026-07-05');
		expect(el.end).toBe('');
	});

	it('markeert de dagen tussen begin en eind', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range start="2026-07-10"></nldd-date-picker>');
		el.end = '2026-07-14';
		await waitForUpdate(el);
		expect(dayFor(el, '2026-07-12').classList.contains('is-in-range')).toBe(true);
		expect(dayFor(el, '2026-07-10').classList.contains('is-in-range')).toBe(false);
		expect(dayFor(el, '2026-07-15').classList.contains('is-in-range')).toBe(false);
	});

	// De vulling markeert het uiteinde; de band verbindt alleen de dagen ertussen,
	// dus links van de begindatum hoort geen blauw te staan.
	it('laat de band bij begin en eind halverwege de dag beginnen', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range start="2026-07-10"></nldd-date-picker>');
		el.end = '2026-07-14';
		await waitForUpdate(el);
		expect(el._bandFor('2026-07-10')).toBe('start');
		expect(el._bandFor('2026-07-12')).toBe('full');
		expect(el._bandFor('2026-07-14')).toBe('end');
		expect(el._bandFor('2026-07-15')).toBe('none');
	});

	// De begin- en einddag dragen een eigen klas, zodat de styling er een halve
	// capsule van maakt (rond aan de buitenkant, recht naar de band toe).
	it('markeert begin- en einddag als endpoint', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range start="2026-07-10"></nldd-date-picker>');
		el.end = '2026-07-14';
		await waitForUpdate(el);
		expect(dayFor(el, '2026-07-10').classList.contains('is-range-start')).toBe(true);
		expect(dayFor(el, '2026-07-14').classList.contains('is-range-end')).toBe(true);
		expect(dayFor(el, '2026-07-12').classList.contains('is-range-start')).toBe(false);
		expect(dayFor(el, '2026-07-12').classList.contains('is-range-end')).toBe(false);
	});

	it('tekent geen band voor een periode van één dag', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range start="2026-07-10"></nldd-date-picker>');
		el.end = '2026-07-10';
		await waitForUpdate(el);
		expect(el._bandFor('2026-07-10')).toBe('none');
	});

	// Dezelfde afleiding als een vastgelegde periode, zodat het voorbeeld onder de
	// muis niet anders loopt dan wat je krijgt.
	it('tekent de band ook voor het voorbeeld onder de muis', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range max="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		dayFor(el, '2026-07-10').click();
		await waitForUpdate(el);
		el._handleDayHover('2026-07-14');
		await waitForUpdate(el);
		expect(el._bandFor('2026-07-10')).toBe('start');
		expect(el._bandFor('2026-07-12')).toBe('full');
		expect(el._bandFor('2026-07-14')).toBe('end');
	});

	// # Slepen

	/** Sleep van de ene dag naar de andere; het component leest de dag onder de muis. */
	async function drag(picker: NLDDDatePicker, from: string, to: string): Promise<void> {
		const rect = (iso: string) => dayFor(picker, iso).getBoundingClientRect();
		const at = (iso: string) => {
			const r = rect(iso);
			return { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
		};
		dayFor(picker, from).dispatchEvent(new PointerEvent('pointerdown', {
			...at(from), pointerType: 'mouse', bubbles: true, composed: true,
		}));
		picker.shadowRoot!.querySelector('.date-picker__calendar')!.dispatchEvent(new PointerEvent('pointermove', {
			...at(to), pointerType: 'mouse', bubbles: true, composed: true,
		}));
		await waitForUpdate(picker);
		document.dispatchEvent(new PointerEvent('pointerup', {
			...at(to), pointerType: 'mouse', bubbles: true, composed: true,
		}));
		await waitForUpdate(picker);
	}

	it('kiest een periode door te slepen', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		el.start = '2026-07-01';
		await waitForUpdate(el);
		await drag(el, '2026-07-10', '2026-07-20');
		expect(el.start).toBe('2026-07-10');
		expect(el.end).toBe('2026-07-20');
	});

	// De richting is met het gebaar uitgesproken, dus hier hoort geen herstart maar
	// een omgekeerde periode.
	it('keert de periode om bij achteruit slepen', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		el.start = '2026-07-01';
		await waitForUpdate(el);
		await drag(el, '2026-07-20', '2026-07-10');
		expect(el.start).toBe('2026-07-10');
		expect(el.end).toBe('2026-07-20');
	});

	/** Klikken zoals de browser het doet: een pointerdown gaat er altijd aan vooraf. */
	async function clickDay(picker: NLDDDatePicker, iso: string): Promise<void> {
		const day = dayFor(picker, iso);
		const r = day.getBoundingClientRect();
		const at = { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
		day.dispatchEvent(new PointerEvent('pointerdown', {
			...at, pointerType: 'mouse', bubbles: true, composed: true,
		}));
		document.dispatchEvent(new PointerEvent('pointerup', {
			...at, pointerType: 'mouse', bubbles: true, composed: true,
		}));
		day.click();
		await waitForUpdate(picker);
	}

	// De klik na een sleep landt op het rooster en niet op een dag, dus de
	// onderdrukking moet bij de volgende pointerdown vervallen; anders eet hij de
	// eerstvolgende echte klik op en moet je twee keer klikken.
	it('begint direct een nieuwe periode na een sleep', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		await drag(el, '2026-07-10', '2026-07-20');
		await clickDay(el, '2026-07-05');
		expect(el.start).toBe('2026-07-05');
		expect(el.end).toBe('');
	});

	// Zonder markering loopt de band naar een dag die zelf niets laat zien.
	it('accentueert de einddatum al tijdens het slepen', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		const from = dayFor(el, '2026-07-10').getBoundingClientRect();
		const to = dayFor(el, '2026-07-14').getBoundingClientRect();
		dayFor(el, '2026-07-10').dispatchEvent(new PointerEvent('pointerdown', {
			clientX: from.left + from.width / 2, clientY: from.top + from.height / 2,
			pointerType: 'mouse', bubbles: true, composed: true,
		}));
		el.shadowRoot!.querySelector('.date-picker__calendar')!.dispatchEvent(new PointerEvent('pointermove', {
			clientX: to.left + to.width / 2, clientY: to.top + to.height / 2,
			pointerType: 'mouse', bubbles: true, composed: true,
		}));
		await waitForUpdate(el);
		expect(el._isSelected('2026-07-10')).toBe(true);
		expect(el._isSelected('2026-07-14')).toBe(true);
		expect(dayFor(el, '2026-07-14').classList.contains('is-selected')).toBe(true);
	});

	it('toont de band al tijdens het slepen', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		const from = dayFor(el, '2026-07-10').getBoundingClientRect();
		const to = dayFor(el, '2026-07-14').getBoundingClientRect();
		dayFor(el, '2026-07-10').dispatchEvent(new PointerEvent('pointerdown', {
			clientX: from.left + from.width / 2, clientY: from.top + from.height / 2,
			pointerType: 'mouse', bubbles: true, composed: true,
		}));
		el.shadowRoot!.querySelector('.date-picker__calendar')!.dispatchEvent(new PointerEvent('pointermove', {
			clientX: to.left + to.width / 2, clientY: to.top + to.height / 2,
			pointerType: 'mouse', bubbles: true, composed: true,
		}));
		await waitForUpdate(el);
		expect(el._bandFor('2026-07-12')).toBe('full');
	});

	// Zonder onderdrukking start de klik na het loslaten meteen een nieuwe periode.
	it('start geen nieuwe periode met de klik na het slepen', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		await drag(el, '2026-07-10', '2026-07-20');
		dayFor(el, '2026-07-20').click();
		await waitForUpdate(el);
		expect(el.start).toBe('2026-07-10');
		expect(el.end).toBe('2026-07-20');
	});

	// Een gewone klik mag niet als sleep tellen, anders werkt twee keer klikken niet.
	it('laat klikken zonder bewegen gewoon door de klik-route lopen', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		const day = dayFor(el, '2026-07-10');
		const r = day.getBoundingClientRect();
		day.dispatchEvent(new PointerEvent('pointerdown', {
			clientX: r.left + r.width / 2, clientY: r.top + r.height / 2,
			pointerType: 'mouse', bubbles: true, composed: true,
		}));
		document.dispatchEvent(new PointerEvent('pointerup', {
			clientX: r.left + r.width / 2, clientY: r.top + r.height / 2,
			pointerType: 'mouse', bubbles: true, composed: true,
		}));
		day.click();
		await waitForUpdate(el);
		expect(el.start).toBe('2026-07-10');
		expect(el.end).toBe('');
	});

	// Op touch is een horizontale veeg niet te onderscheiden van scrollen.
	it('sleept niet op touch', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		const day = dayFor(el, '2026-07-10');
		const r = day.getBoundingClientRect();
		day.dispatchEvent(new PointerEvent('pointerdown', {
			clientX: r.left + r.width / 2, clientY: r.top + r.height / 2,
			pointerType: 'touch', bubbles: true, composed: true,
		}));
		const to = dayFor(el, '2026-07-20').getBoundingClientRect();
		el.shadowRoot!.querySelector('.date-picker__calendar')!.dispatchEvent(new PointerEvent('pointermove', {
			clientX: to.left + to.width / 2, clientY: to.top + to.height / 2,
			pointerType: 'touch', bubbles: true, composed: true,
		}));
		await waitForUpdate(el);
		expect(el.start).toBe('');
	});


	it('vuurt change pas wanneer de periode compleet is', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range start="2026-07-01"></nldd-date-picker>');
		await waitForUpdate(el);
		const changes: unknown[] = [];
		el.addEventListener('change', (e) => changes.push((e as CustomEvent).detail));

		dayFor(el, '2026-07-10').click();
		await waitForUpdate(el);
		expect(changes).toHaveLength(0);

		dayFor(el, '2026-07-20').click();
		await waitForUpdate(el);
		expect(changes).toEqual([{ start: '2026-07-10', end: '2026-07-20' }]);
	});


	// # Celbeschrijvingen

	it('geeft elke dag een volledige datum als label', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(dayFor(el, '2026-07-15').getAttribute('aria-label')).toContain('woensdag 15 juli 2026');
	});

	it('vermeldt in het label dat een dag niet beschikbaar is', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		el.isDateUnavailable = (iso) => iso === '2026-07-16';
		await waitForUpdate(el);
		expect(dayFor(el, '2026-07-16').getAttribute('aria-label')).toContain('niet beschikbaar');
	});

	it('vermeldt in het label dat een dag in de periode valt', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range start="2026-07-10"></nldd-date-picker>');
		el.end = '2026-07-14';
		await waitForUpdate(el);
		expect(dayFor(el, '2026-07-12').getAttribute('aria-label')).toContain('in de periode');
		expect(dayFor(el, '2026-07-10').getAttribute('aria-label')).toContain('begin van de periode');
		expect(dayFor(el, '2026-07-14').getAttribute('aria-label')).toContain('einde van de periode');
	});


	// # Vandaag-knop

	it('navigeert met Vandaag terug naar de huidige maand', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2020-01-15"></nldd-date-picker>');
		await waitForUpdate(el);
		el._handleToday();
		await waitForUpdate(el);
		expect(el._view).toBe(`${todayIso().slice(0, 7)}-01`);
		expect(el._focused).toBe(todayIso());
	});

	// Navigeren is geen kiezen: wie rondkijkt wil terug kunnen, geen datum erbij.
	it('kiest niets met Vandaag', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2020-01-15"></nldd-date-picker>');
		await waitForUpdate(el);
		const changes: unknown[] = [];
		el.addEventListener('change', (e) => changes.push((e as CustomEvent).detail));
		el._handleToday();
		await waitForUpdate(el);
		expect(el.value).toBe('2020-01-15');
		expect(changes).toHaveLength(0);
	});

	// Buiten de grenzen zou de knop liegen: klemmen naar de dichtstbijzijnde
	// toegestane datum laat "Vandaag" achttien jaar terugspringen.
	it('verbergt Vandaag wanneer vandaag buiten de grenzen valt', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker max="today-18y"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(el._todayReachable).toBe(false);
		const labels = Array.from(el.shadowRoot!.querySelectorAll('nldd-button'))
			.map((b) => b.getAttribute('text'));
		expect(labels).not.toContain('Vandaag');
	});

	it('toont Vandaag wanneer vandaag binnen de grenzen valt', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker min="today-1y" max="today+1y"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(el._todayReachable).toBe(true);
		const labels = Array.from(el.shadowRoot!.querySelectorAll('nldd-button'))
			.map((b) => b.getAttribute('text'));
		expect(labels).toContain('Vandaag');
	});


	// # Jaarmenu

	// De titel beloofde maand en jaar en opende alleen jaartallen. Nu is elk deel
	// z'n eigen knop met z'n eigen menu, en staat er geen dode tekst tussen.
	it('maakt maand en jaar allebei een knop met een eigen menu', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		const buttons = el.shadowRoot!.querySelectorAll('.date-picker__title-button');
		expect(buttons.length).toBe(2);
		for (const button of buttons) {
			expect(button.getAttribute('aria-haspopup')).toBe('menu');
			expect(button.getAttribute('aria-expanded')).toBe('false');
		}
		// Alles in de kop zit in een van de twee knoppen.
		const heading = el.shadowRoot!.querySelector('.date-picker__title')!;
		const buiten = [...heading.childNodes].filter(
			(node) => node.nodeType === Node.TEXT_NODE && node.textContent!.trim(),
		);
		expect(buiten).toEqual([]);
	});

	// Een menu dat opengaat om te bevestigen wat je al ziet is erger dan geen menu,
	// en de chevron belooft dan een keuze die er niet is.
	it('laat de chevron en het menu weg als er maar één maand bereikbaar is', async () => {
		el = await fixture<NLDDDatePicker>(
			'<nldd-date-picker value="2026-08-12" min="2026-08-01" max="2026-08-31"></nldd-date-picker>',
		);
		await waitForUpdate(el);
		expect(el._months).toEqual([8]);
		expect(el.shadowRoot!.querySelector('.date-picker__title-button--month')).toBeNull();
		expect(el.shadowRoot!.querySelector('.date-picker__month-menu')).toBeNull();
		expect(el.shadowRoot!.querySelector('.date-picker__title-button--year')).toBeNull();
		expect(el.shadowRoot!.querySelector('.date-picker__year-menu')).toBeNull();
		expect(title(el)).toBe('Augustus 2026');
	});

	// Twaalf maanden aanbieden terwijl een grens er elf stilletjes terugklemt naar
	// de maand waar je al stond.
	it('begrenst de maandlijst met min en max', async () => {
		el = await fixture<NLDDDatePicker>(
			'<nldd-date-picker value="2026-08-12" min="2026-05-01" max="2026-10-31"></nldd-date-picker>',
		);
		await waitForUpdate(el);
		expect(el._months).toEqual([5, 6, 7, 8, 9, 10]);
		expect(el.shadowRoot!.querySelectorAll('.date-picker__month-menu nldd-menu-item').length).toBe(6);
	});

	// Buiten het jaar van de grens telt die grens niet mee: met max in 2026 mag
	// december 2025 gewoon.
	it('begrenst de maandlijst alleen in het jaar waar de grens ligt', async () => {
		el = await fixture<NLDDDatePicker>(
			'<nldd-date-picker value="2025-12-01" min="2025-01-01" max="2026-03-31"></nldd-date-picker>',
		);
		await waitForUpdate(el);
		expect(el._months.length).toBe(12);
	});

	// De pijltjes klemmen de view niet, alleen de focus, dus je kunt voorbij een
	// grens bladeren. Die maand hoort dan niet alsnog in het menu te verschijnen.
	it('biedt geen maanden aan buiten de grens, ook niet als je erheen bladert', async () => {
		el = await fixture<NLDDDatePicker>(
			'<nldd-date-picker value="2026-08-12" min="2026-08-01" max="2026-11-30"></nldd-date-picker>',
		);
		await waitForUpdate(el);
		el._shiftView(-2);
		await waitForUpdate(el);

		expect(el._view.slice(0, 7)).toBe('2026-06');
		expect(el._months).toEqual([8, 9, 10, 11]);
		const items = el.shadowRoot!.querySelectorAll('.date-picker__month-menu nldd-menu-item');
		expect([...items].map((item) => item.getAttribute('text'))).toEqual([
			'Augustus', 'September', 'Oktober', 'November',
		]);
		// Niets staat aan: je kijkt naar een maand die deze kalender niet aanneemt.
		expect(el.shadowRoot!.querySelector('.date-picker__month-menu nldd-menu-item[selected]')).toBeNull();
	});

	// Zonder grens is het venster willekeurig gekozen, dus dat rekt wel mee.
	it('rekt het standaard jaarvenster op naar het jaar waar je heen bladert', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-08-12"></nldd-date-picker>');
		await waitForUpdate(el);
		el._shiftView(-12 * 130);
		await waitForUpdate(el);

		expect(el._years).toContain(el._viewYear);
	});

	it('kiest een maand uit het maandmenu', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		const items = el.shadowRoot!.querySelectorAll('.date-picker__month-menu nldd-menu-item');
		expect(items.length).toBe(12);
		expect(items[6].hasAttribute('selected')).toBe(true);

		(items[10] as HTMLElement).click();
		await waitForUpdate(el);
		expect(title(el)).toBe('November 2026');
		// Het jaar en de dag blijven staan; alleen de maand verschuift.
		expect(focusedIso(el)).toBe('2026-11-15');
	});

	// 31 maart naar februari bestaat niet, dus de dag zakt naar de laatste die er
	// wel is, net als bij een schrikkeljaar via het jaarmenu.
	it('klemt de dag als de gekozen maand korter is', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-03-31"></nldd-date-picker>');
		await waitForUpdate(el);
		const items = el.shadowRoot!.querySelectorAll('.date-picker__month-menu nldd-menu-item');

		(items[1] as HTMLElement).click();
		await waitForUpdate(el);
		expect(focusedIso(el)).toBe('2026-02-28');
	});

	// Zonder dit begin je op het eerste jaar in de lijst en loop je met de pijltjes
	// een eeuw terug naar het jaar dat je al bekeek.
	it('opent het jaarmenu op het jaar dat in beeld staat', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		(el.shadowRoot!.querySelector('.date-picker__title-button--year') as HTMLButtonElement).click();

		// Het menu focust zichzelf pas na zijn eigen open-volgorde, dus even wachten
		// tot het is uitgevochten in plaats van één vaste vertraging gokken.
		let active: Element | null = null;
		for (let i = 0; i < 40; i += 1) {
			await new Promise((resolve) => setTimeout(resolve, 25));
			active = el.shadowRoot!.activeElement;
			if (active?.getAttribute('text') === '2026') break;
		}
		expect(active?.tagName).toBe('NLDD-MENU-ITEM');
		expect(active?.getAttribute('text')).toBe('2026');
	});

	it('begrenst de jaarlijst met min en max', async () => {
		el = await fixture<NLDDDatePicker>(
			'<nldd-date-picker value="2005-07-15" min="2000-01-01" max="2010-12-31"></nldd-date-picker>',
		);
		await waitForUpdate(el);
		expect(el._years[0]).toBe(2000);
		expect(el._years[el._years.length - 1]).toBe(2010);
	});

	// Anders toont het menu geen enkele selectie zodra je voorbij de rand bladert.
	it('houdt het getoonde jaar altijd in de lijst', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="1850-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(el._years).toContain(1850);
	});

	it('springt met een jaar naar die maand zonder iets te kiezen', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		el._handleYearSelect(2001);
		await waitForUpdate(el);
		expect(el._view).toBe('2001-07-01');
		expect(el._focused).toBe('2001-07-15');
		expect(el.value).toBe('2026-07-15');
	});

	// 29 februari bestaat niet elk jaar.
	it('klemt een schrikkeldag bij het wisselen van jaar', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2024-02-29"></nldd-date-picker>');
		await waitForUpdate(el);
		el._handleYearSelect(2025);
		await waitForUpdate(el);
		expect(el._focused).toBe('2025-02-28');
	});


	// # Focus

	// Een overlay die de kalender focust landt anders op de host, die nergens naar
	// doorstuurt - en dan doen de pijltjes niets tot je zelf naar binnen tabt.
	it('zet focus op de dag met de roving tabindex', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		el.focus();
		const active = el.shadowRoot!.activeElement;
		expect(active?.getAttribute('data-date')).toBe('2026-07-15');
		expect(active?.getAttribute('tabindex')).toBe('0');
	});

	it('zet focus op vandaag wanneer er niets gekozen is', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker></nldd-date-picker>');
		await waitForUpdate(el);
		el.focus();
		expect(el.shadowRoot!.activeElement?.getAttribute('data-date')).toBe(todayIso());
	});


	// # Focusring en invoermodus

	// Browsers behandelen programmatische focus als focus-visible, en de kalender
	// met de muis openen focust een dag - dan zou er een ring staan zonder dat er
	// een toets is aangeraakt.
	it('onderdrukt de focusring wanneer de focus van een aanwijzer komt', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		document.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'mouse', bubbles: true }));

		el.focus();
		expect(dayFor(el, '2026-07-15').classList.contains('is-pointer-focus')).toBe(true);
	});

	// De overgang is wat telt: zonder de klasse zou "afwezig" ook zonder fix
	// kloppen, dus beide kanten staan in één test.
	it('toont de focusring weer zodra het toetsenbord wordt gebruikt', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		const day = dayFor(el, '2026-07-15');

		document.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'mouse', bubbles: true }));
		el.focus();
		expect(day.classList.contains('is-pointer-focus')).toBe(true);

		day.blur();
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
		el.focus();
		expect(day.classList.contains('is-pointer-focus')).toBe(false);
	});


	// Pijltjes verplaatsen de focus programmatisch, en de browser blijft de sessie
	// beoordelen op de klik waarmee de kalender openging - :focus-visible matcht
	// dan nooit tijdens het navigeren. De ring hangt daarom aan :focus plus de
	// modaliteitsklasse.
	it('toont de ring tijdens pijltjesnavigatie na openen met de muis', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		const ringSelector = '.date-picker__day:focus:not(.is-pointer-focus)';

		document.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'mouse', bubbles: true }));
		el.focus();
		expect(dayFor(el, '2026-07-15').matches(ringSelector)).toBe(false);

		await press(el, 'ArrowRight');
		expect(dayFor(el, '2026-07-16').matches(ringSelector)).toBe(true);
	});

	// Het gemelde geval: de eerste pijltjestoets verplaatste de focus wel maar toonde
	// geen ring, pas de tweede. Hier nagebootst met een keydown die de document-
	// listener niet bereikt (composed: false), zodat de modaliteit op muis blijft
	// staan - net als wanneer die listener nog niet had bijgewerkt. De kalender moet
	// de ring dan uit zichzelf tonen, want hij verplaatst de focus zelf.
	it('toont de ring al bij de eerste pijltjestoets, ook als de modaliteit nog op muis staat', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		document.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'mouse', bubbles: true }));
		el.focus();
		expect(dayFor(el, '2026-07-15').classList.contains('is-pointer-focus')).toBe(true);

		el.shadowRoot!.querySelector('.date-picker__day[tabindex="0"]')!
			.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: false }));
		await waitForUpdate(el);

		expect(dayFor(el, '2026-07-16').classList.contains('is-pointer-focus')).toBe(false);
	});

	// Bladeren met de muis mag de ring juist niet aanzetten.
	it('houdt de ring weg wanneer een muisklik de maand verzet', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		document.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'mouse', bubbles: true }));
		el.focus();

		el._shiftView(1);
		await waitForUpdate(el);
		el.focus();
		expect(dayFor(el, '2026-08-15').classList.contains('is-pointer-focus')).toBe(true);
	});

	// Op de stylesheet-tekst, bij uitzondering: variables.css wordt in de tests niet
	// geladen, dus de echte ring is niet te meten (het token is leeg en de outline
	// blijft none). Zonder deze controle zou een terugkeer naar :focus-visible - de
	// bug die dit veroorzaakte - door alle tests heen glippen.
	it('hangt de dagring aan :focus en niet aan :focus-visible', () => {
		const css = datePickerStyles.cssText;
		expect(css).toContain('.date-picker__day:focus:not(.is-pointer-focus)');
		expect(css).not.toContain('.date-picker__day:focus-visible');
	});


	// # Gestapelde indeling

	// "Vandaag" staat in beide indelingen linksonder: het is een snelkoppeling en
	// geen paginering, en zonder die knop past een voluit geschreven maand in de
	// kop naast het jaar en twee menuknoppen.
	it('houdt de paginering in de kop op een breed scherm, met Vandaag eronder', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker></nldd-date-picker>');
		el._stacked = false;
		await waitForUpdate(el);
		const header = el.shadowRoot!.querySelector('.date-picker__header')!;
		expect(header.querySelector('.date-picker__pagination')).not.toBeNull();
		expect(header.querySelector('nldd-button')).toBeNull();

		const footer = el.shadowRoot!.querySelector('.date-picker__footer')!;
		expect(footer.querySelector('.date-picker__footer-start nldd-button')).not.toBeNull();
		expect(footer.querySelector('nldd-button-bar')).toBeNull();
	});

	// Onder het rooster, en in twee hoeken: een duim die de ene groep raakt dekt
	// de andere dan niet af.
	it('zet de paginering onder de kalender wanneer hij gestapeld is', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker></nldd-date-picker>');
		el._stacked = true;
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.date-picker__pagination')).toBeNull();
		const footer = el.shadowRoot!.querySelector('.date-picker__footer');
		expect(footer).not.toBeNull();
		// Vandaag links, de maandpijlen rechts in een eigen bar.
		expect(footer!.querySelector('.date-picker__footer-start nldd-button')).not.toBeNull();
		expect(footer!.querySelector('nldd-button-bar')).not.toBeNull();
	});

	// Op de property, niet op het attribuut: md is de standaard en die wordt met
	// reflectNonDefault juist uit het DOM gehouden.
	it('vergroot de knoppen naar md wanneer hij gestapeld is', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker></nldd-date-picker>');
		el._stacked = true;
		await waitForUpdate(el);
		const footer = el.shadowRoot!.querySelector('.date-picker__footer')!;
		const bar = footer.querySelector('nldd-button-bar') as HTMLElement & { size?: string };
		const today = footer.querySelector('nldd-button') as HTMLElement & { size?: string };
		expect(bar.size).toBe('md');
		expect(today.size).toBe('md');
	});

	it('houdt de knoppen op sm in de brede indeling', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker></nldd-date-picker>');
		el._stacked = false;
		await waitForUpdate(el);
		const bar = el.shadowRoot!.querySelector('.date-picker__pagination nldd-button-bar') as HTMLElement & { size?: string };
		expect(bar.size).toBe('sm');
	});

	// Anders staat Vandaag twee keer: los linksonder én in de bar ernaast.
	it('zet Vandaag niet ook in de paginering wanneer hij gestapeld is', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker></nldd-date-picker>');
		el._stacked = true;
		await waitForUpdate(el);
		const bar = el.shadowRoot!.querySelector('.date-picker__footer nldd-button-bar')!;
		expect(bar.querySelector('nldd-button')).toBeNull();
	});

	it('laat Vandaag ook gestapeld weg wanneer vandaag buiten bereik valt', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker max="today-18y"></nldd-date-picker>');
		el._stacked = true;
		await waitForUpdate(el);
		const footer = el.shadowRoot!.querySelector('.date-picker__footer')!;
		expect(footer.querySelector('nldd-button')).toBeNull();
		// De hoek blijft staan, zodat de pijlen niet naar links schuiven.
		expect(footer.querySelector('.date-picker__footer-start')).not.toBeNull();
	});


	// # Dag-knop

	// De hele cel is het raakvlak; de vorm zit op de indicator erbinnen.
	it('geeft elke dag een indicator als apart element', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		const day = dayFor(el, '2026-07-15');
		expect(day.querySelector('.date-picker__day-indicator')).not.toBeNull();
		expect(getComputedStyle(day).borderRadius).toBe('0px');
	});

	// De hover-regel draagt een pseudo-class en weegt daarmee zwaarder dan een
	// kale selected-regel; zonder herhaling ziet een gekozen dag er onder de
	// muis uit alsof hij niet gekozen is.
	it('blijft een gekozen dag als gekozen tonen onder de muis', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		const day = dayFor(el, '2026-07-15');
		const indicator = day.querySelector('.date-picker__day-indicator')!;
		const selectedBackground = getComputedStyle(indicator).backgroundColor;

		day.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
		await waitForUpdate(el);
		expect(getComputedStyle(indicator).backgroundColor).toBe(selectedBackground);
	});
});

describe('nldd-date-picker labels tijdens het kiezen van een periode', () => {
	let el: NLDDDatePicker;

	afterEach(() => {
		if (el) cleanup(el);
	});

	// De eerste keuze werd "begin van de periode" genoemd, maar een tweede keuze
	// ervoor maakt er juist het einde van. Zo lang dat nog kan, mag het label geen
	// richting beweren.
	it('noemt de eerste keuze geen begindatum zolang de periode niet af is', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range max="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		dayFor(el, '2026-07-15').click();
		await waitForUpdate(el);
		const label = dayFor(el, '2026-07-15').getAttribute('aria-label') ?? '';
		expect(label).toContain('periode nog niet compleet');
		expect(label).not.toContain('begin van de periode');
	});

	it('noemt begin en einde wel zodra de periode af is', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range max="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		dayFor(el, '2026-07-15').click();
		await waitForUpdate(el);
		dayFor(el, '2026-07-10').click();
		await waitForUpdate(el);
		expect(dayFor(el, '2026-07-10').getAttribute('aria-label')).toContain('begin van de periode');
		expect(dayFor(el, '2026-07-15').getAttribute('aria-label')).toContain('einde van de periode');
	});
});

describe('nldd-date-picker maandnaam en hoofdletter', () => {
	let el: NLDDDatePicker;

	afterEach(() => {
		if (el) cleanup(el);
	});

	// De maandnaam bestaat in twee vormen omdat hij op twee plekken anders hoort:
	// met hoofdletter in de kop, klein midden in een datumlabel. Deed de code dat
	// zelf (met CSS of met charAt(0).toUpperCase()), dan kon een vertaler het niet
	// uitzetten - en in welke taal welke vorm hoort, weet de vertaler.
	it('haalt beide vormen uit de vertaling, zodat een consument ze los kan zetten', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		el.translations = {
			'components.date-picker.july-capitalize': 'HOOIMAAND',
			'components.date-picker.july-lowercase': 'hooimaand',
		};
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.date-picker__title')!.textContent!.trim()).toContain('HOOIMAAND');
		expect(dayFor(el, '2026-07-15').getAttribute('aria-label')).toContain('hooimaand');
	});

	it('gebruikt standaard de hoofdlettervorm in de kop en de kleine in het label', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker value="2026-07-15"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.date-picker__title')!.textContent!.trim()).toContain('Juli');
		expect(dayFor(el, '2026-07-15').getAttribute('aria-label')).toContain('juli');
	});
});

describe('nldd-date-picker aankondigingen bevatten alleen de datum', () => {
	let el: NLDDDatePicker;

	afterEach(() => {
		if (el) cleanup(el);
	});

	// De aankondiging gebruikte het volledige cellabel, dus de aanduidingen die aan
	// die cel hangen belandden midden in de zin: "vrijdag 10 juli 2026, begin van
	// de periode tot en met woensdag 15 juli 2026, einde van de periode".
	it('laat de celaanduidingen uit de periode-aankondiging', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range max="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		dayFor(el, '2026-07-15').click();
		await waitForUpdate(el);
		dayFor(el, '2026-07-10').click();
		await waitForUpdate(el);
		expect(announcement(el)).toBe('Geselecteerd: vrijdag 10 juli 2026 tot en met woensdag 15 juli 2026.');
	});

	it('laat de celaanduidingen ook uit de tussenstap', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range max="2026-07-31"></nldd-date-picker>');
		await waitForUpdate(el);
		dayFor(el, '2026-07-15').click();
		await waitForUpdate(el);
		expect(announcement(el)).not.toContain('periode nog niet compleet');
		expect(announcement(el)).toContain('woensdag 15 juli 2026');
	});
});

describe('nldd-date-picker weigert een periode over een geblokkeerde dag', () => {
	let el: NLDDDatePicker;

	afterEach(() => {
		if (el) cleanup(el);
	});

	// Beide eindpunten kunnen beschikbaar zijn terwijl een geboekte dag ertussen
	// zit. De eindpuntcheck miste dat, dus change vuurde met een periode die een
	// zichtbaar geblokkeerde datum omsloot.
	it('legt geen periode vast met een niet-beschikbare dag ertussen', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		el.isDateUnavailable = (iso) => iso === '2026-07-15';
		await waitForUpdate(el);
		let change = 0;
		el.addEventListener('change', () => { change += 1; });
		dayFor(el, '2026-07-10').click();
		await waitForUpdate(el);
		dayFor(el, '2026-07-20').click();
		await waitForUpdate(el);
		expect(el.end).toBe('');
		expect(change).toBe(0);
		expect(announcement(el)).toContain('niet beschikbaar');
	});

	it('legt een periode zonder geblokkeerde dagen wel vast', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		el.isDateUnavailable = (iso) => iso === '2026-07-25';
		await waitForUpdate(el);
		dayFor(el, '2026-07-10').click();
		await waitForUpdate(el);
		dayFor(el, '2026-07-20').click();
		await waitForUpdate(el);
		expect(el.start).toBe('2026-07-10');
		expect(el.end).toBe('2026-07-20');
	});

	// De sleep-route (_onDocumentPointerUp) deelt dezelfde guard als de klik-route,
	// maar loopt er niet via _select doorheen: een sleep over een geblokkeerde
	// binnendag mag evenmin vastleggen.
	it('weigert ook een gesleepte periode over een niet-beschikbare dag', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range value="" max="2026-07-31"></nldd-date-picker>');
		el.isDateUnavailable = (iso) => iso === '2026-07-15';
		await waitForUpdate(el);
		let change = 0;
		el.addEventListener('change', () => { change += 1; });
		const at = (iso: string) => {
			const r = dayFor(el, iso).getBoundingClientRect();
			return { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
		};
		dayFor(el, '2026-07-10').dispatchEvent(new PointerEvent('pointerdown', {
			...at('2026-07-10'), pointerType: 'mouse', bubbles: true, composed: true,
		}));
		el.shadowRoot!.querySelector('.date-picker__calendar')!.dispatchEvent(new PointerEvent('pointermove', {
			...at('2026-07-20'), pointerType: 'mouse', bubbles: true, composed: true,
		}));
		await waitForUpdate(el);
		document.dispatchEvent(new PointerEvent('pointerup', {
			...at('2026-07-20'), pointerType: 'mouse', bubbles: true, composed: true,
		}));
		await waitForUpdate(el);
		expect(el.end).toBe('');
		expect(change).toBe(0);
		expect(announcement(el)).toContain('niet beschikbaar');
	});
});

describe('nldd-date-picker breedte en periode-indicatoren', () => {
	let el: NLDDDatePicker;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('width="full" en een CSS-lengte sturen de hostbreedte; ongeldig valt terug', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker width="full"></nldd-date-picker>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_width')).toBe('100%');

		el.width = '560px';
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_width')).toBe('560px');
		expect(Math.round(el.getBoundingClientRect().width)).toBe(560);

		el.width = 'kapot';
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_width')).toBe('');
	});

	// De eindpunten zijn hetzelfde vierkant als een losse selectie (even breed
	// als hoog, ook in bredere cellen), met rechte hoeken naar de periode toe
	// zodat het vierkant zonder lichte inkeping tegen de band ligt.
	it('eindpunten zijn vierkant en alleen aan de buitenkant afgerond', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range start="2026-07-10" end="2026-07-20" width="700px" style="--semantics-controls-md-corner-radius: 8px"></nldd-date-picker>');
		await waitForUpdate(el);
		const indicator = (iso: string) =>
			dayFor(el, iso).querySelector('.date-picker__day-indicator') as HTMLElement;
		const start = indicator('2026-07-10');
		const end = indicator('2026-07-20');

		for (const dot of [start, end]) {
			const r = dot.getBoundingClientRect();
			expect(Math.round(r.width)).toBe(Math.round(r.height));
		}
		const startStyle = getComputedStyle(start);
		expect(startStyle.borderStartStartRadius).not.toBe('0px');
		expect(startStyle.borderStartEndRadius).toBe('0px');
		const endStyle = getComputedStyle(end);
		expect(endStyle.borderStartStartRadius).toBe('0px');
		expect(endStyle.borderStartEndRadius).not.toBe('0px');
	});

	it('een periode van één dag houdt alle vier de hoeken', async () => {
		el = await fixture<NLDDDatePicker>('<nldd-date-picker range start="2026-07-10" end="2026-07-10" style="--semantics-controls-md-corner-radius: 8px"></nldd-date-picker>');
		await waitForUpdate(el);
		const dot = dayFor(el, '2026-07-10').querySelector('.date-picker__day-indicator') as HTMLElement;
		const style = getComputedStyle(dot);
		expect(style.borderStartStartRadius).not.toBe('0px');
		expect(style.borderStartEndRadius).not.toBe('0px');
	});
});
