import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRRadioButtonGroup } from './rr-radio-button-group.ts';
import './rr-radio-button-group.ts';
import '../radio-button-field/rr-radio-button-field.ts';

function groupFixture(name = 'group'): string {
	return `
		<rr-radio-button-group name="${name}">
			<rr-radio-button-field value="1" checked>Optie 1</rr-radio-button-field>
			<rr-radio-button-field value="2">Optie 2</rr-radio-button-field>
			<rr-radio-button-field value="3">Optie 3</rr-radio-button-field>
		</rr-radio-button-group>
	`;
}

describe('rr-radio-button-group', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-radio-button-group></rr-radio-button-group>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a div with role="radiogroup"', async () => {
		el = await fixture('<rr-radio-button-group></rr-radio-button-group>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="radiogroup"]')).not.toBeNull();
	});
});


/* ============================================================
   Name and disabled forwarding
   ============================================================ */

describe('rr-radio-button-group – field sync', () => {
	let el: RRRadioButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards name to all child fields', async () => {
		el = await fixture<RRRadioButtonGroup>(groupFixture('mygroup'));
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('rr-radio-button-field')) as any[];
		fields.forEach(f => expect(f.name).toBe('mygroup'));
	});

	it('forwards disabled to all child fields', async () => {
		el = await fixture<RRRadioButtonGroup>(`
			<rr-radio-button-group name="g" disabled>
				<rr-radio-button-field value="1">Optie 1</rr-radio-button-field>
				<rr-radio-button-field value="2">Optie 2</rr-radio-button-field>
			</rr-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('rr-radio-button-field')) as any[];
		fields.forEach(f => expect(f.disabled).toBe(true));
	});
});


/* ============================================================
   Keyboard navigation
   ============================================================ */

describe('rr-radio-button-group – keyboard navigation', () => {
	let el: RRRadioButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	function pressKey(target: Element, key: string) {
		target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
	}

	it('ArrowDown moves to next field', async () => {
		el = await fixture<RRRadioButtonGroup>(groupFixture());
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('rr-radio-button-field')) as any[];

		pressKey(el, 'ArrowDown');
		await waitForUpdate(el);

		expect(fields[0].checked).toBe(false);
		expect(fields[1].checked).toBe(true);
	});

	it('ArrowUp moves to previous field', async () => {
		el = await fixture<RRRadioButtonGroup>(`
			<rr-radio-button-group name="g">
				<rr-radio-button-field value="1">Optie 1</rr-radio-button-field>
				<rr-radio-button-field value="2" checked>Optie 2</rr-radio-button-field>
				<rr-radio-button-field value="3">Optie 3</rr-radio-button-field>
			</rr-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('rr-radio-button-field')) as any[];

		pressKey(el, 'ArrowUp');
		await waitForUpdate(el);

		expect(fields[1].checked).toBe(false);
		expect(fields[0].checked).toBe(true);
	});

	it('ArrowDown wraps from last to first', async () => {
		el = await fixture<RRRadioButtonGroup>(`
			<rr-radio-button-group name="g">
				<rr-radio-button-field value="1">Optie 1</rr-radio-button-field>
				<rr-radio-button-field value="2">Optie 2</rr-radio-button-field>
				<rr-radio-button-field value="3" checked>Optie 3</rr-radio-button-field>
			</rr-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('rr-radio-button-field')) as any[];

		pressKey(el, 'ArrowDown');
		await waitForUpdate(el);

		expect(fields[2].checked).toBe(false);
		expect(fields[0].checked).toBe(true);
	});

	it('skips disabled fields during navigation', async () => {
		el = await fixture<RRRadioButtonGroup>(`
			<rr-radio-button-group name="g">
				<rr-radio-button-field value="1" checked>Optie 1</rr-radio-button-field>
				<rr-radio-button-field value="2" disabled>Optie 2</rr-radio-button-field>
				<rr-radio-button-field value="3">Optie 3</rr-radio-button-field>
			</rr-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('rr-radio-button-field')) as any[];

		pressKey(el, 'ArrowDown');
		await waitForUpdate(el);

		expect(fields[0].checked).toBe(false);
		expect(fields[2].checked).toBe(true);
	});
});


/* ============================================================
   Accessibility
   ============================================================ */

describe('rr-radio-button-group – accessibility', () => {
	let el: RRRadioButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards accessible-labelledby to aria-labelledby on the radiogroup element', async () => {
		el = await fixture<RRRadioButtonGroup>(`
			<rr-radio-button-group accessible-labelledby="my-label"></rr-radio-button-group>
		`);
		await waitForUpdate(el);
		const radiogroup = el.shadowRoot!.querySelector('[role="radiogroup"]')!;
		expect(radiogroup.getAttribute('aria-labelledby')).toBe('my-label');
	});

	it('does not set aria-labelledby when accessible-labelledby is not provided', async () => {
		el = await fixture<RRRadioButtonGroup>(`
			<rr-radio-button-group></rr-radio-button-group>
		`);
		await waitForUpdate(el);
		const radiogroup = el.shadowRoot!.querySelector('[role="radiogroup"]')!;
		expect(radiogroup.getAttribute('aria-labelledby')).toBeNull();
	});
});
