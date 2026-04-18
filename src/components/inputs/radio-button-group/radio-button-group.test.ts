import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDRadioButtonGroup } from './ndd-radio-button-group.ts';
import './ndd-radio-button-group.ts';
import '../radio-button-field/ndd-radio-button-field.ts';

function groupFixture(name = 'group'): string {
	return `
		<ndd-radio-button-group name="${name}">
			<ndd-radio-button-field value="1" checked label="Optie 1"></ndd-radio-button-field>
			<ndd-radio-button-field value="2" label="Optie 2"></ndd-radio-button-field>
			<ndd-radio-button-field value="3" label="Optie 3"></ndd-radio-button-field>
		</ndd-radio-button-group>
	`;
}

describe('ndd-radio-button-group', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-radio-button-group></ndd-radio-button-group>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a div with role="radiogroup"', async () => {
		el = await fixture('<ndd-radio-button-group></ndd-radio-button-group>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('radiogroup');
	});
});


/* ============================================================
   Name and disabled forwarding
   ============================================================ */

describe('ndd-radio-button-group – field sync', () => {
	let el: NDDRadioButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards name to all child fields', async () => {
		el = await fixture<NDDRadioButtonGroup>(groupFixture('mygroup'));
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('ndd-radio-button-field')) as any[];
		fields.forEach(f => expect(f.name).toBe('mygroup'));
	});

	it('forwards disabled to all child fields', async () => {
		el = await fixture<NDDRadioButtonGroup>(`
			<ndd-radio-button-group name="g" disabled>
				<ndd-radio-button-field value="1" label="Optie 1"></ndd-radio-button-field>
				<ndd-radio-button-field value="2" label="Optie 2"></ndd-radio-button-field>
			</ndd-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('ndd-radio-button-field')) as any[];
		fields.forEach(f => expect(f.disabled).toBe(true));
	});
});


/* ============================================================
   Keyboard navigation
   ============================================================ */

describe('ndd-radio-button-group – keyboard navigation', () => {
	let el: NDDRadioButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	function pressKey(target: Element, key: string) {
		target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
	}

	it('ArrowDown moves to next field', async () => {
		el = await fixture<NDDRadioButtonGroup>(groupFixture());
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('ndd-radio-button-field')) as any[];

		pressKey(el, 'ArrowDown');
		await waitForUpdate(el);

		expect(fields[0].checked).toBe(false);
		expect(fields[1].checked).toBe(true);
	});

	it('ArrowUp moves to previous field', async () => {
		el = await fixture<NDDRadioButtonGroup>(`
			<ndd-radio-button-group name="g">
				<ndd-radio-button-field value="1" label="Optie 1"></ndd-radio-button-field>
				<ndd-radio-button-field value="2" checked label="Optie 2"></ndd-radio-button-field>
				<ndd-radio-button-field value="3" label="Optie 3"></ndd-radio-button-field>
			</ndd-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('ndd-radio-button-field')) as any[];

		pressKey(el, 'ArrowUp');
		await waitForUpdate(el);

		expect(fields[1].checked).toBe(false);
		expect(fields[0].checked).toBe(true);
	});

	it('ArrowDown wraps from last to first', async () => {
		el = await fixture<NDDRadioButtonGroup>(`
			<ndd-radio-button-group name="g">
				<ndd-radio-button-field value="1" label="Optie 1"></ndd-radio-button-field>
				<ndd-radio-button-field value="2" label="Optie 2"></ndd-radio-button-field>
				<ndd-radio-button-field value="3" checked label="Optie 3"></ndd-radio-button-field>
			</ndd-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('ndd-radio-button-field')) as any[];

		pressKey(el, 'ArrowDown');
		await waitForUpdate(el);

		expect(fields[2].checked).toBe(false);
		expect(fields[0].checked).toBe(true);
	});

	it('skips disabled fields during navigation', async () => {
		el = await fixture<NDDRadioButtonGroup>(`
			<ndd-radio-button-group name="g">
				<ndd-radio-button-field value="1" checked label="Optie 1"></ndd-radio-button-field>
				<ndd-radio-button-field value="2" disabled label="Optie 2"></ndd-radio-button-field>
				<ndd-radio-button-field value="3" label="Optie 3"></ndd-radio-button-field>
			</ndd-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll('ndd-radio-button-field')) as any[];

		pressKey(el, 'ArrowDown');
		await waitForUpdate(el);

		expect(fields[0].checked).toBe(false);
		expect(fields[2].checked).toBe(true);
	});
});


/* ============================================================
   Accessibility
   ============================================================ */

describe('ndd-radio-button-group – accessibility', () => {
	let el: NDDRadioButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards accessible-labelledby to aria-labelledby on the radiogroup element', async () => {
		el = await fixture<NDDRadioButtonGroup>(`
			<ndd-radio-button-group accessible-labelledby="my-label"></ndd-radio-button-group>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('aria-labelledby')).toBe('my-label');
	});

	it('does not set aria-labelledby when accessible-labelledby is not provided', async () => {
		el = await fixture<NDDRadioButtonGroup>(`
			<ndd-radio-button-group></ndd-radio-button-group>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('aria-labelledby')).toBeNull();
	});
});
