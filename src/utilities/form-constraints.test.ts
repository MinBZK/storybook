import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../test-utils.js';
import '../components/inputs/checkbox/checkbox.js';
import '../components/inputs/checkbox-field/checkbox-field.js';
import '../components/inputs/combo-box/combo-box.js';
import '../components/inputs/dropdown/dropdown.js';
import '../components/inputs/segmented-control/segmented-control.js';
import '../components/inputs/multi-line-text-field/multi-line-text-field.js';
import '../components/inputs/password-field/password-field.js';
import '../components/inputs/search-field/search-field.js';
import '../components/inputs/switch/switch.js';
import '../components/inputs/switch-field/switch-field.js';
import '../components/inputs/toggle-button-group/toggle-button-group.js';
import '../components/inputs/toggle-button/toggle-button.js';
import '../components/inputs/text-field/text-field.js';
import '../components/forms/form-field/form-field.js';
import '../components/forms/validation-list/validation-list.js';

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

/**
 * A group answers `required` through its items, because that is where the
 * platform reads it: one required radio makes the whole group required, and
 * the browser writes its own message.
 *
 * Not in checkbox mode. The same attribute on a checkbox means that box has to
 * be ticked, so spreading it out would demand all of them instead of one.
 */
describe('required on a group of controls', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('nldd-segmented-control: radio mode makes the group required', async () => {
		el = await fixture<HTMLElement>(`
			<nldd-segmented-control required accessible-label="Weergave">
				<nldd-segmented-control-item value="list" text="Lijst"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="grid" text="Raster"></nldd-segmented-control-item>
			</nldd-segmented-control>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('aria-required')).toBe(true);
		const input = el.querySelector('nldd-segmented-control-item')!.shadowRoot!.querySelector('input') as HTMLInputElement;
		expect(input.required).toBe(true);
		expect(input.validity.valueMissing).toBe(true);
	});

	it('nldd-segmented-control: checkbox mode announces it without demanding every box', async () => {
		el = await fixture<HTMLElement>(`
			<nldd-segmented-control required type="checkbox" accessible-label="Weergave">
				<nldd-segmented-control-item value="list" text="Lijst"></nldd-segmented-control-item>
			</nldd-segmented-control>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('aria-required')).toBe(true);
		const input = el.querySelector('nldd-segmented-control-item')!.shadowRoot!.querySelector('input') as HTMLInputElement;
		expect(input.required).toBe(false);
	});

	it('nldd-toggle-button-group: radio mode makes the group required', async () => {
		el = await fixture<HTMLElement>(`
			<nldd-toggle-button-group required type="radio" name="view" accessible-label="Weergave">
				<nldd-toggle-button value="list" text="Lijst"></nldd-toggle-button>
				<nldd-toggle-button value="grid" text="Raster"></nldd-toggle-button>
			</nldd-toggle-button-group>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('aria-required')).toBe(true);
		const input = el.querySelector('nldd-toggle-button')!.shadowRoot!.querySelector('input') as HTMLInputElement;
		expect(input.required).toBe(true);
		expect(input.validity.valueMissing).toBe(true);
	});

	it('nldd-toggle-button-group: checkbox mode announces it without demanding every box', async () => {
		el = await fixture<HTMLElement>(`
			<nldd-toggle-button-group required type="checkbox" name="view" accessible-label="Weergave">
				<nldd-toggle-button value="list" text="Lijst"></nldd-toggle-button>
			</nldd-toggle-button-group>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('aria-required')).toBe(true);
		const input = el.querySelector('nldd-toggle-button')!.shadowRoot!.querySelector('input') as HTMLInputElement;
		expect(input.required).toBe(false);
	});
});

/**
 * The contract that makes the attributes above worth setting: the form has to
 * see them.
 *
 * The control that carries them lives in a shadow root and is therefore not a
 * member of the form around the host. The form sees the host; the host sees the
 * control. Without something joining those two a `required` field submits
 * empty, no `invalid` event fires, and nothing on screen says why — which is
 * exactly what happened before the form-associated mixin reported the control's
 * verdict as the host's own.
 */
describe('the constraints reach the form around the component', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	/** Submits and reports what the platform did, without leaving the page. */
	async function submit(form: HTMLFormElement): Promise<{ submitted: boolean; invalid: string[] }> {
		const invalid: string[] = [];
		const onInvalid = (e: Event) => invalid.push((e.target as Element).tagName.toLowerCase());
		let submitted = false;
		form.addEventListener('invalid', onInvalid, true);
		form.addEventListener('submit', (e) => { e.preventDefault(); submitted = true; }, { once: true });
		form.requestSubmit();
		await waitForUpdate(form);
		form.removeEventListener('invalid', onInvalid, true);
		return { submitted, invalid };
	}

	for (const { name, inner, pattern } of cases) {
		it(`${name}: an empty required field stops the submit`, async () => {
			el = await fixture<HTMLElement>(`<div><form><${name} name="x" required></${name}></form></div>`);
			await waitForUpdate(el);
			const form = el.querySelector('form')!;

			let uitkomst = await submit(form);
			expect(uitkomst.submitted, `${name}: submitted while empty and required`).toBe(false);
			expect(uitkomst.invalid).toContain(name);

			const control = el.querySelector(name)! as HTMLElement & { value: string };
			control.value = 'iets';
			(control.shadowRoot!.querySelector(inner) as HTMLInputElement).value = 'iets';
			await waitForUpdate(el);

			uitkomst = await submit(form);
			expect(uitkomst.submitted, `${name}: still blocked after filling it in`).toBe(true);
		});

		if (!pattern) continue;

		it(`${name}: a value that fails the pattern stops the submit`, async () => {
			el = await fixture<HTMLElement>(`<div><form><${name} name="x" pattern="[0-9]{4}"></${name}></form></div>`);
			await waitForUpdate(el);
			const form = el.querySelector('form')!;
			const control = el.querySelector(name)! as HTMLElement & { value: string };
			const binnen = control.shadowRoot!.querySelector(inner) as HTMLInputElement;

			control.value = 'abcd';
			binnen.value = 'abcd';
			await waitForUpdate(el);
			expect((await submit(form)).submitted).toBe(false);

			control.value = '1234';
			binnen.value = '1234';
			await waitForUpdate(el);
			expect((await submit(form)).submitted).toBe(true);
		});
	}

	it('a rule of a validation list and a native constraint hold at the same time', async () => {
		el = await fixture<HTMLElement>(`
			<div><form>
				<nldd-form-field label="Wachtwoord">
					<nldd-text-field name="pw" required></nldd-text-field>
					<nldd-validation-list>
						<nldd-validation-item id="pw-capital" match="[A-Z]">Een hoofdletter</nldd-validation-item>
					</nldd-validation-list>
				</nldd-form-field>
			</form></div>
		`);
		await waitForUpdate(el);
		const form = el.querySelector('form')!;
		const control = el.querySelector('nldd-text-field')! as HTMLElement & { value: string };
		const binnen = control.shadowRoot!.querySelector('input') as HTMLInputElement;

		// Leeg: allebei ontevreden.
		expect((await submit(form)).submitted).toBe(false);

		// Gevuld, maar zonder hoofdletter: het native `required` is tevreden en de
		// regel niet, en dat mag de een de ander niet laten wegpoetsen.
		control.value = 'geheim';
		binnen.value = 'geheim';
		control.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect((await submit(form)).submitted, 'de regel liet het formulier door').toBe(false);

		// En met allebei in orde gaat hij weg.
		control.value = 'Geheim';
		binnen.value = 'Geheim';
		control.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect((await submit(form)).submitted).toBe(true);
	});
});
