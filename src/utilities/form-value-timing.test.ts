import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../test-utils.js';
import '../components/inputs/checkbox/checkbox.js';
import '../components/inputs/switch/switch.js';
import '../components/inputs/radio-button/radio-button.js';
import '../components/inputs/toggle-button/toggle-button.js';
import '../components/inputs/text-field/text-field.js';
import '../components/inputs/password-field/password-field.js';
import '../components/inputs/search-field/search-field.js';
import '../components/inputs/multi-line-text-field/multi-line-text-field.js';
import '../components/inputs/number-field/number-field.js';
import '../components/inputs/stepper/stepper.js';
import '../components/inputs/date-field/date-field.js';
import '../components/inputs/combo-box/combo-box.js';
import '../components/inputs/segmented-control/segmented-control.js';

/**
 * The contract of FormAssociated: every input that uses the mixin commits its
 * value with ElementInternals before `change` fires. Doing that only on render
 * is a render too late: a listener on `change` runs
 * synchronously, so anything that serializes the form there (htmx, or a plain
 * `new FormData(form)`) would read the value from before the change — the
 * symptom being a field that appears to reset itself right after you fill it.
 *
 * Every input is therefore checked the same way: change the value the way a user
 * would, and read the form back from inside the event handler.
 */

interface Case {
	name: string;
	html: string;
	/** Drives the element as a user would, so the component's own handlers run. */
	act: (el: HTMLElement) => void;
	expected: string;
	/** The form field to read; defaults to 'veld'. */
	field?: string;
}

function innerInput(el: HTMLElement, selector = 'input'): HTMLInputElement {
	return el.shadowRoot!.querySelector(selector) as HTMLInputElement;
}

/** Types into the inner control and lets it announce the change natively. */
function type(el: HTMLElement, value: string, selector = 'input'): void {
	const input = innerInput(el, selector);
	input.value = value;
	input.dispatchEvent(new Event('input', { bubbles: true }));
	input.dispatchEvent(new Event('change', { bubbles: true }));
}

function check(el: HTMLElement): void {
	const input = innerInput(el);
	input.checked = true;
	input.dispatchEvent(new Event('change', { bubbles: true }));
}

const cases: Case[] = [
	{
		name: 'nldd-checkbox',
		html: '<nldd-checkbox name="veld" value="aan"></nldd-checkbox>',
		act: check,
		expected: 'aan',
	},
	{
		name: 'nldd-switch',
		html: '<nldd-switch name="veld" value="aan"></nldd-switch>',
		act: check,
		expected: 'aan',
	},
	{
		name: 'nldd-radio-button',
		html: '<nldd-radio-button name="veld" value="aan"></nldd-radio-button>',
		act: check,
		expected: 'aan',
	},
	{
		name: 'nldd-toggle-button',
		html: '<nldd-toggle-button type="checkbox" name="veld" value="aan" text="Aan"></nldd-toggle-button>',
		act: check,
		expected: 'aan',
	},
	{
		name: 'nldd-text-field',
		html: '<nldd-text-field name="veld" accessible-label="Veld"></nldd-text-field>',
		act: el => type(el, 'hallo'),
		expected: 'hallo',
	},
	{
		name: 'nldd-password-field',
		html: '<nldd-password-field name="veld" accessible-label="Veld"></nldd-password-field>',
		act: el => type(el, 'geheim'),
		expected: 'geheim',
	},
	{
		name: 'nldd-search-field',
		html: '<nldd-search-field name="veld" accessible-label="Veld"></nldd-search-field>',
		act: el => type(el, 'zoekterm'),
		expected: 'zoekterm',
	},
	{
		name: 'nldd-multi-line-text-field',
		html: '<nldd-multi-line-text-field name="veld" accessible-label="Veld"></nldd-multi-line-text-field>',
		act: el => type(el, 'meer tekst', 'textarea'),
		expected: 'meer tekst',
	},
	{
		// Only `change`: this field commits on blur/Enter and returns early when the
		// preceding `input` already settled the same number.
		name: 'nldd-number-field',
		html: '<nldd-number-field name="veld" accessible-label="Veld"></nldd-number-field>',
		act: el => {
			const input = innerInput(el);
			input.value = '42';
			input.dispatchEvent(new Event('change', { bubbles: true }));
		},
		expected: '42',
	},
	{
		name: 'nldd-date-field',
		html: '<nldd-date-field name="veld" accessible-label="Veld"></nldd-date-field>',
		act: el => type(el, '31-12-2026'),
		expected: '2026-12-31',
	},
	{
		name: 'nldd-combo-box',
		html: `<nldd-combo-box name="veld" allow-custom accessible-label="Veld">
			<nldd-menu><nldd-menu-item text="Nederland" value="nl"></nldd-menu-item></nldd-menu>
		</nldd-combo-box>`,
		// A combo box commits a typed value on blur (or Enter), not while typing.
		act: el => {
			const input = innerInput(el, '.combo-box__input');
			input.value = 'nl';
			input.dispatchEvent(new Event('input', { bubbles: true }));
			input.dispatchEvent(new Event('blur', { bubbles: true }));
		},
		expected: 'nl',
	},
];

describe('form value is committed before the change event', () => {
	let root: HTMLElement;
	let form: HTMLFormElement;

	afterEach(() => {
		if (root) cleanup(root);
		form?.remove();
	});

	for (const testCase of cases) {
		it(testCase.name, async () => {
			form = document.createElement('form');
			document.body.appendChild(form);
			root = await fixture<HTMLElement>(testCase.html);
			form.appendChild(root);
			await waitForUpdate(root);

			let seen: FormDataEntryValue | null = null;
			root.addEventListener('change', () => {
				seen = new FormData(form).get(testCase.field ?? 'veld');
			});

			testCase.act(root);

			expect(seen).toBe(testCase.expected);
		});
	}

	// The stepper and the segmented control have no inner input to drive, so they
	// go through their own public API instead.
	it('nldd-stepper', async () => {
		form = document.createElement('form');
		document.body.appendChild(form);
		root = await fixture<HTMLElement>('<nldd-stepper name="veld" value="1" accessible-label="Aantal"></nldd-stepper>');
		form.appendChild(root);
		await waitForUpdate(root);

		let seen: FormDataEntryValue | null = null;
		root.addEventListener('change', () => {
			seen = new FormData(form).get('veld');
		});

		(root.shadowRoot!.querySelectorAll('nldd-icon-button')[1] as HTMLElement).click();

		expect(seen).toBe('2');
	});

	it('nldd-segmented-control', async () => {
		form = document.createElement('form');
		document.body.appendChild(form);
		root = await fixture<HTMLElement>(
			`<nldd-segmented-control name="veld" accessible-label="Weergave">
				<nldd-segmented-control-item value="lijst" text="Lijst"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="raster" text="Raster"></nldd-segmented-control-item>
			</nldd-segmented-control>`,
		);
		form.appendChild(root);
		await waitForUpdate(root);

		let seen: FormDataEntryValue | null = null;
		root.addEventListener('change', () => {
			seen = new FormData(form).get('veld');
		});

		const item = root.querySelectorAll('nldd-segmented-control-item')[1] as HTMLElement;
		const input = item.shadowRoot!.querySelector('input') as HTMLInputElement;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));

		expect(seen).toBe('raster');
	});
});
