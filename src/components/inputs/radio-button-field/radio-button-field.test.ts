import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate, deepActiveElement } from '../../../test-utils.js';
import type { NLDDRadioButtonField } from './radio-button-field.js';
import './radio-button-field.js';
import '../radio-button/radio-button.js';
import '../radio-button-group/radio-button-group.js';

describe('nldd-radio-button-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-radio-button-field></nldd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a label element', async () => {
		el = await fixture('<nldd-radio-button-field label="Optie 1"></nldd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.radio-button-field__label')).not.toBeNull();
	});

	it('renders label text from attribute', async () => {
		el = await fixture('<nldd-radio-button-field label="Optie 1"></nldd-radio-button-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.radio-button-field__label')!;
		expect(label.textContent).toBe('Optie 1');
	});

	it('renders nldd-radio-button in shadow DOM', async () => {
		el = await fixture('<nldd-radio-button-field></nldd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-radio-button')).not.toBeNull();
	});

	it('forwards label as accessible-label to nldd-radio-button', async () => {
		el = await fixture('<nldd-radio-button-field label="Optie A"></nldd-radio-button-field>');
		await waitForUpdate(el);
		const radio = el.shadowRoot!.querySelector('nldd-radio-button')!;
		expect(radio.getAttribute('accessible-label')).toBe('Optie A');
	});
});


/* ============================================================
   State
   ============================================================ */

describe('nldd-radio-button-field – state', () => {
	let el: NLDDRadioButtonField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<NLDDRadioButtonField>('<nldd-radio-button-field></nldd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<NLDDRadioButtonField>('<nldd-radio-button-field checked></nldd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<NLDDRadioButtonField>('<nldd-radio-button-field disabled></nldd-radio-button-field>');
		await waitForUpdate(el);
		const radioButton = el.shadowRoot!.querySelector('nldd-radio-button') as any;
		await waitForUpdate(radioButton);
		expect(radioButton.disabled).toBe(true);
	});

	it('forwards value to nldd-radio-button', async () => {
		el = await fixture<NLDDRadioButtonField>('<nldd-radio-button-field value="option-a"></nldd-radio-button-field>');
		await waitForUpdate(el);
		const radioButton = el.shadowRoot!.querySelector('nldd-radio-button') as any;
		await waitForUpdate(radioButton);
		expect(radioButton.value).toBe('option-a');
	});

	it('submits the checked value to the surrounding form', async () => {
		const form = await fixture<HTMLFormElement>('<form><nldd-radio-button-field name="status" value="active" label="Actief" checked></nldd-radio-button-field></form>');
		el = form as unknown as NLDDRadioButtonField;
		const field = form.querySelector<NLDDRadioButtonField>('nldd-radio-button-field')!;
		await waitForUpdate(field);
		expect(new FormData(form).get('status')).toBe('active');
	});

	it('submits nothing when unchecked', async () => {
		const form = await fixture<HTMLFormElement>('<form><nldd-radio-button-field name="status" value="active" label="Actief"></nldd-radio-button-field></form>');
		el = form as unknown as NLDDRadioButtonField;
		const field = form.querySelector<NLDDRadioButtonField>('nldd-radio-button-field')!;
		await waitForUpdate(field);
		expect(new FormData(form).has('status')).toBe(false);
	});

	it('leaves exactly one value in the form when the group switches selection', async () => {
		const form = await fixture<HTMLFormElement>(`
			<form>
				<nldd-radio-button-group name="status">
					<nldd-radio-button-field value="a" label="A" checked></nldd-radio-button-field>
					<nldd-radio-button-field value="b" label="B"></nldd-radio-button-field>
				</nldd-radio-button-group>
			</form>
		`);
		el = form as unknown as NLDDRadioButtonField;
		const [first, second] = Array.from(form.querySelectorAll<NLDDRadioButtonField>('nldd-radio-button-field'));
		// The group hands the name down to the fields on its own first update,
		// and form association reads that name — so wait for the group too.
		await waitForUpdate(form.querySelector('nldd-radio-button-group')!);
		await waitForUpdate(first!);
		await waitForUpdate(second!);
		expect(new FormData(form).getAll('status')).toEqual(['a']);

		let valuesAtChange: FormDataEntryValue[] = [];
		form.addEventListener('change', () => { valuesAtChange = new FormData(form).getAll('status'); });
		second!.shadowRoot!.querySelector<HTMLElement>('.radio-button-field__label')!.click();
		await waitForUpdate(second!);
		await waitForUpdate(first!);
		// Read during the change event: the group unchecks the sibling and the
		// form must already reflect it, not carry both values.
		expect(valuesAtChange).toEqual(['b']);
		expect(new FormData(form).getAll('status')).toEqual(['b']);
	});

	it('restores its initial state on form reset', async () => {
		const form = await fixture<HTMLFormElement>('<form><nldd-radio-button-field name="status" value="active" label="Actief" checked></nldd-radio-button-field></form>');
		el = form as unknown as NLDDRadioButtonField;
		const field = form.querySelector<NLDDRadioButtonField>('nldd-radio-button-field')!;
		await waitForUpdate(field);
		field.checked = false;
		await waitForUpdate(field);
		form.reset();
		await waitForUpdate(field);
		expect(field.checked).toBe(true);
		expect(new FormData(form).get('status')).toBe('active');
	});

	it('focus() delegates through to the inner radio input', async () => {
		el = await fixture<NLDDRadioButtonField>('<nldd-radio-button-field label="Optie"></nldd-radio-button-field>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('nldd-radio-button')!;
		await waitForUpdate(inner as HTMLElement);
		el.focus();
		expect(deepActiveElement()).toBe(inner.shadowRoot!.querySelector('.radio-button__input'));
	});
});
