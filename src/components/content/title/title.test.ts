import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './title.js';

describe('nldd-title', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-title></nldd-title>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to size 3', async () => {
		el = await fixture('<nldd-title></nldd-title>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('3');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<nldd-title size="1"></nldd-title>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('1');
	});

	it('renders slotted title content', async () => {
		el = await fixture('<nldd-title><h1>Paginatitel</h1></nldd-title>');
		await waitForUpdate(el);
		expect(el.querySelector('h1')?.textContent?.trim()).toBe('Paginatitel');
		expect(el.shadowRoot!.querySelector('slot:not([name])')!.assignedElements().length).toBeGreaterThan(0);
	});

	it('renders slotted overline content', async () => {
		el = await fixture('<nldd-title><p slot="overline">Overline</p></nldd-title>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="overline"]')?.textContent?.trim()).toBe('Overline');
		expect(el.shadowRoot!.querySelector('slot[name="overline"]')!.assignedElements().length).toBeGreaterThan(0);
	});

	it('renders slotted subtitle content', async () => {
		el = await fixture('<nldd-title><p slot="subtitle">Ondertitel</p></nldd-title>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="subtitle"]')?.textContent?.trim()).toBe('Ondertitel');
		expect(el.shadowRoot!.querySelector('slot[name="subtitle"]')!.assignedElements().length).toBeGreaterThan(0);
	});

	it('renders slotted actions', async () => {
		el = await fixture('<nldd-title><button slot="actions">Actie</button></nldd-title>');
		await waitForUpdate(el);
		expect(el.querySelector('[slot="actions"]')?.textContent?.trim()).toBe('Actie');
		expect(el.shadowRoot!.querySelector('slot[name="actions"]')!.assignedElements().length).toBeGreaterThan(0);
	});

	it('color="inherit" follows the surrounding text color, the default does not', async () => {
		// The vitest page does not load settings.css, so define the token the
		// default path resolves against — otherwise both paths would inherit.
		el = await fixture(`
			<div>
				<style>:root { --semantics-content-color: rgb(99, 99, 99); }</style>
				<div style="color: rgb(10, 20, 30);">
					<nldd-title color="inherit"><h2 id="inherit-title">A</h2></nldd-title>
					<nldd-title><h2 id="default-title">B</h2></nldd-title>
				</div>
			</div>
		`);
		const titles = el.querySelectorAll('nldd-title');
		await waitForUpdate(titles[0] as HTMLElement);
		await waitForUpdate(titles[1] as HTMLElement);
		expect(getComputedStyle(el.querySelector('#inherit-title')!).color).toBe('rgb(10, 20, 30)');
		expect(getComputedStyle(el.querySelector('#default-title')!).color).toBe('rgb(99, 99, 99)');
	});

	// getComputedStyle resolves ch to px, so assert the measure is capped and
	// scales with the font rather than checking for the literal '32ch'.
	it('begrenst de regellengte van de kop', async () => {
		el = await fixture('<nldd-title size="2"><h2>Een kop</h2></nldd-title>');
		await waitForUpdate(el);
		const heading = el.querySelector('h2')!;
		const style = getComputedStyle(heading);
		expect(style.maxWidth).not.toBe('none');
		expect(parseFloat(style.maxWidth)).toBeGreaterThan(parseFloat(style.fontSize) * 10);
	});

	it('balanceert de regels van de kop', async () => {
		el = await fixture('<nldd-title><h3>Een kop</h3></nldd-title>');
		await waitForUpdate(el);
		expect(getComputedStyle(el.querySelector('h3')!).textWrap).toBe('balance');
	});
});
