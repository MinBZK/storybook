import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../test-utils.js';
import '../components/inputs/checkbox/checkbox.js';
import '../components/inputs/checkbox-field/checkbox-field.js';
import '../components/inputs/combo-box/combo-box.js';
import '../components/inputs/dropdown/dropdown.js';
import '../components/inputs/multi-line-text-field/multi-line-text-field.js';
import '../components/inputs/password-field/password-field.js';
import '../components/inputs/search-field/search-field.js';
import '../components/inputs/switch/switch.js';
import '../components/inputs/switch-field/switch-field.js';
import '../components/inputs/text-field/text-field.js';

/**
 * The contract of the constraint attributes: a component that renders a native
 * control hands `pattern`, `minlength` and `maxlength` straight to it, so the
 * browser is the one enforcing them.
 *
 * `pattern` is checked on the value itself, because that is the case a
 * consumer runs into first and the platform evaluates it whatever put the
 * value there. `minlength` is only checked as far as the attribute: `tooShort`
 * counts once the value has been edited by a person, and this suite fills the
 * value from script.
 *
 * The multi-line field has no `pattern` on purpose. HTML does not support it on
 * a `<textarea>`, and an attribute that quietly does nothing is worse than one
 * that is not there.
 */

interface Case {
	name: string;
	/** The native control inside the shadow root. */
	inner: string;
	/** Whether the platform supports `pattern` here. */
	pattern: boolean;
}

const cases: Case[] = [
	{ name: 'nldd-text-field', inner: 'input', pattern: true },
	{ name: 'nldd-password-field', inner: 'input', pattern: true },
	{ name: 'nldd-search-field', inner: 'input', pattern: true },
	{ name: 'nldd-combo-box', inner: 'input', pattern: true },
	{ name: 'nldd-multi-line-text-field', inner: 'textarea', pattern: false },
];

describe('the constraint attributes reach the native control', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	for (const { name, inner, pattern } of cases) {
		it(`${name}: minlength and maxlength land on the control`, async () => {
			el = await fixture<HTMLElement>(`<${name} minlength="5" maxlength="40"></${name}>`);
			await waitForUpdate(el);
			const control = el.shadowRoot!.querySelector(inner) as HTMLInputElement;
			expect(control.minLength).toBe(5);
			expect(control.maxLength).toBe(40);
		});

		it(`${name}: neither is set when the component does not carry them`, async () => {
			el = await fixture<HTMLElement>(`<${name}></${name}>`);
			await waitForUpdate(el);
			const control = el.shadowRoot!.querySelector(inner)!;
			expect(control.hasAttribute('minlength')).toBe(false);
			expect(control.hasAttribute('maxlength')).toBe(false);
		});

		if (!pattern) continue;

		it(`${name}: pattern refuses a value that does not match`, async () => {
			el = await fixture<HTMLElement>(`<${name} pattern="[0-9]{4}"></${name}>`);
			await waitForUpdate(el);
			const control = el.shadowRoot!.querySelector(inner) as HTMLInputElement;
			control.value = 'abcd';
			expect(control.validity.patternMismatch).toBe(true);
			control.value = '1234';
			expect(control.validity.valid).toBe(true);
		});
	}

	it('nldd-multi-line-text-field has no pattern, because a textarea has none', async () => {
		el = await fixture<HTMLElement>('<nldd-multi-line-text-field></nldd-multi-line-text-field>');
		await waitForUpdate(el);
		expect('pattern' in el).toBe(false);
	});
});

/**
 * `required` on the controls that can answer it: a checkbox or a switch that
 * is off has no value, so the browser reports `valueMissing` and the form does
 * not submit. The two -field variants render one of those and hand the
 * attribute on.
 */
describe('required reaches the native control', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	for (const name of ['nldd-checkbox', 'nldd-switch']) {
		it(`${name}: unchecked and required is a missing value`, async () => {
			el = await fixture<HTMLElement>(`<${name} required accessible-label="Akkoord"></${name}>`);
			await waitForUpdate(el);
			const control = el.shadowRoot!.querySelector('input') as HTMLInputElement;
			expect(control.required).toBe(true);
			expect(control.validity.valueMissing).toBe(true);
			control.checked = true;
			expect(control.validity.valueMissing).toBe(false);
		});
	}

	it('nldd-dropdown: hands required to the slotted select', async () => {
		el = await fixture<HTMLElement>(
			'<nldd-dropdown required><select aria-label="Optie"><option value="">Kies</option></select></nldd-dropdown>',
		);
		await waitForUpdate(el);
		const select = el.querySelector('select') as HTMLSelectElement;
		expect(select.required).toBe(true);
		expect(select.validity.valueMissing).toBe(true);
	});

	it('nldd-dropdown: leaves a required the consumer put on the select alone', async () => {
		el = await fixture<HTMLElement>(
			'<nldd-dropdown><select required aria-label="Optie"><option value="">Kies</option></select></nldd-dropdown>',
		);
		await waitForUpdate(el);
		const select = el.querySelector('select') as HTMLSelectElement;
		expect(select.required).toBe(true);
	});

	for (const [name, inner] of [['nldd-checkbox-field', 'nldd-checkbox'], ['nldd-switch-field', 'nldd-switch']] as const) {
		it(`${name}: hands required to the ${inner} it renders`, async () => {
			el = await fixture<HTMLElement>(`<${name} required label="Akkoord"></${name}>`);
			await waitForUpdate(el);
			const child = el.shadowRoot!.querySelector(inner) as HTMLElement;
			const control = child.shadowRoot!.querySelector('input') as HTMLInputElement;
			expect(control.required).toBe(true);
			expect(control.validity.valueMissing).toBe(true);
		});
	}
});
