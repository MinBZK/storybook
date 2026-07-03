import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDRadioButtonGroup } from './radio-button-group.js';
import type { NLDDRadioButtonField } from '../radio-button-field/radio-button-field.js';
import './radio-button-group.js';
import '../radio-button-field/radio-button-field.js';

function groupFixture(name = 'group'): string {
	return `
		<nldd-radio-button-group name="${name}">
			<nldd-radio-button-field value="1" checked label="Optie 1"></nldd-radio-button-field>
			<nldd-radio-button-field value="2" label="Optie 2"></nldd-radio-button-field>
			<nldd-radio-button-field value="3" label="Optie 3"></nldd-radio-button-field>
		</nldd-radio-button-group>
	`;
}

describe('nldd-radio-button-group', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-radio-button-group></nldd-radio-button-group>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('sets role="radiogroup" on the host element', async () => {
		el = await fixture('<nldd-radio-button-group></nldd-radio-button-group>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('radiogroup');
	});
});


/* ============================================================
   Name and disabled forwarding
   ============================================================ */

describe('nldd-radio-button-group – field sync', () => {
	let el: NLDDRadioButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards name to all child fields', async () => {
		el = await fixture<NLDDRadioButtonGroup>(groupFixture('mygroup'));
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll<NLDDRadioButtonField>('nldd-radio-button-field'));
		fields.forEach(f => expect(f.name).toBe('mygroup'));
	});

	it('forwards disabled to all child fields', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group name="g" disabled>
				<nldd-radio-button-field value="1" label="Optie 1"></nldd-radio-button-field>
				<nldd-radio-button-field value="2" label="Optie 2"></nldd-radio-button-field>
			</nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll<NLDDRadioButtonField>('nldd-radio-button-field'));
		fields.forEach(f => expect(f.disabled).toBe(true));
	});
});


/* ============================================================
   Keyboard navigation
   ============================================================ */

describe('nldd-radio-button-group – keyboard navigation', () => {
	let el: NLDDRadioButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	function pressKey(target: Element, key: string) {
		target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
	}

	it('ArrowDown moves to next field', async () => {
		el = await fixture<NLDDRadioButtonGroup>(groupFixture());
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll<NLDDRadioButtonField>('nldd-radio-button-field'));

		pressKey(el, 'ArrowDown');
		await waitForUpdate(el);

		expect(fields[0].checked).toBe(false);
		expect(fields[1].checked).toBe(true);
	});

	it('ArrowUp moves to previous field', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group name="g">
				<nldd-radio-button-field value="1" label="Optie 1"></nldd-radio-button-field>
				<nldd-radio-button-field value="2" checked label="Optie 2"></nldd-radio-button-field>
				<nldd-radio-button-field value="3" label="Optie 3"></nldd-radio-button-field>
			</nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll<NLDDRadioButtonField>('nldd-radio-button-field'));

		pressKey(el, 'ArrowUp');
		await waitForUpdate(el);

		expect(fields[1].checked).toBe(false);
		expect(fields[0].checked).toBe(true);
	});

	it('ArrowDown wraps from last to first', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group name="g">
				<nldd-radio-button-field value="1" label="Optie 1"></nldd-radio-button-field>
				<nldd-radio-button-field value="2" label="Optie 2"></nldd-radio-button-field>
				<nldd-radio-button-field value="3" checked label="Optie 3"></nldd-radio-button-field>
			</nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll<NLDDRadioButtonField>('nldd-radio-button-field'));

		pressKey(el, 'ArrowDown');
		await waitForUpdate(el);

		expect(fields[2].checked).toBe(false);
		expect(fields[0].checked).toBe(true);
	});

	it('skips disabled fields during navigation', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group name="g">
				<nldd-radio-button-field value="1" checked label="Optie 1"></nldd-radio-button-field>
				<nldd-radio-button-field value="2" disabled label="Optie 2"></nldd-radio-button-field>
				<nldd-radio-button-field value="3" label="Optie 3"></nldd-radio-button-field>
			</nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = Array.from(el.querySelectorAll<NLDDRadioButtonField>('nldd-radio-button-field'));

		pressKey(el, 'ArrowDown');
		await waitForUpdate(el);

		expect(fields[0].checked).toBe(false);
		expect(fields[2].checked).toBe(true);
	});
});


/* ============================================================
   Accessibility
   ============================================================ */

describe('nldd-radio-button-group – accessibility', () => {
	let el: NLDDRadioButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards accessible-labelled-by to aria-labelledby on the radiogroup element', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group accessible-labelled-by="my-label"></nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('aria-labelledby')).toBe('my-label');
	});

	it('does not set aria-labelledby when accessible-labelled-by is not provided', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group></nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('aria-labelledby')).toBeNull();
	});
});
