import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate, deepActiveElement } from '../../../test-utils.js';
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

	it('forwards accessible-labeled-by to aria-labelledby on the radiogroup element', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group accessible-labeled-by="my-label"></nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('aria-labelledby')).toBe('my-label');
	});

	it('does not set aria-labelledby when accessible-labeled-by is not provided', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group></nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('aria-labelledby')).toBeNull();
	});

	it('focus() lands on the checked option', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group name="g">
				<nldd-radio-button-field value="1" label="Optie 1"></nldd-radio-button-field>
				<nldd-radio-button-field value="2" label="Optie 2" checked></nldd-radio-button-field>
			</nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = el.querySelectorAll<NLDDRadioButtonField>('nldd-radio-button-field');
		await waitForUpdate(fields[1]);
		const radio = fields[1].shadowRoot!.querySelector('nldd-radio-button')!;
		await waitForUpdate(radio as HTMLElement);
		el.focus();
		expect(deepActiveElement()).toBe(radio.shadowRoot!.querySelector('.radio-button__input'));
	});

	it('focus() falls back to the first enabled option when nothing is checked', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group name="g">
				<nldd-radio-button-field value="1" label="Optie 1" disabled></nldd-radio-button-field>
				<nldd-radio-button-field value="2" label="Optie 2"></nldd-radio-button-field>
			</nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		const fields = el.querySelectorAll<NLDDRadioButtonField>('nldd-radio-button-field');
		await waitForUpdate(fields[1]);
		const radio = fields[1].shadowRoot!.querySelector('nldd-radio-button')!;
		await waitForUpdate(radio as HTMLElement);
		el.focus();
		expect(deepActiveElement()).toBe(radio.shadowRoot!.querySelector('.radio-button__input'));
	});

	it('sets accessible-label as aria-label on the group', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group name="g" accessible-label="Bezorgwijze">
				<nldd-radio-button-field value="1" label="Optie 1"></nldd-radio-button-field>
			</nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('radiogroup');
		expect(el.getAttribute('aria-label')).toBe('Bezorgwijze');
	});

	it('warns in DEV when the group has no accessible name', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group name="g">
				<nldd-radio-button-field value="1" label="Optie 1"></nldd-radio-button-field>
			</nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		expect(warn).toHaveBeenCalledWith(expect.stringContaining('No accessible name'));
		warn.mockRestore();
	});

	it('stays quiet when it has a name', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group name="g" accessible-label="Bezorgwijze">
				<nldd-radio-button-field value="1" label="Optie 1"></nldd-radio-button-field>
			</nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('No accessible name'));
		warn.mockRestore();
	});

	it('leaves an aria-label the consumer put on the group', async () => {
		el = await fixture<NLDDRadioButtonGroup>(`
			<nldd-radio-button-group name="g" aria-label="Bezorgwijze">
				<nldd-radio-button-field value="1" label="Optie 1"></nldd-radio-button-field>
			</nldd-radio-button-group>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('aria-label')).toBe('Bezorgwijze');
	});
});
