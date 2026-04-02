import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-form-field.ts';
import '../../inputs/text-field/ndd-text-field.ts';
import '../../inputs/password-field/ndd-password-field.ts';

/* ============================================================
   ndd-form-field
   ============================================================ */

describe('ndd-form-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-form-field></ndd-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a label when provided', async () => {
		el = await fixture('<ndd-form-field label="Name"></ndd-form-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.form-field__label');
		expect(label).not.toBeNull();
		expect(label!.textContent).toContain('Name');
	});

	it('does not render a label span when label is omitted', async () => {
		el = await fixture('<ndd-form-field></ndd-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.form-field__label')).toBeNull();
	});

	it('hides the header when neither label nor supporting-label is set', async () => {
		el = await fixture('<ndd-form-field></ndd-form-field>');
		await waitForUpdate(el);
		const header = el.shadowRoot!.querySelector('.form-field__header');
		expect(header?.classList.contains('is-empty')).toBe(true);
	});

	it('shows the header when only supporting-label is set', async () => {
		el = await fixture('<ndd-form-field supporting-label="DD-MM-YYYY"></ndd-form-field>');
		await waitForUpdate(el);
		const header = el.shadowRoot!.querySelector('.form-field__header');
		expect(header?.classList.contains('is-empty')).toBe(false);
		expect(header!.textContent).toContain('DD-MM-YYYY');
	});

	it('shows the optional badge when optional attribute is set', async () => {
		el = await fixture('<ndd-form-field label="Phone" optional></ndd-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.form-field__optional')).not.toBeNull();
	});

	it('hides "Optional" when optional attribute is not set', async () => {
		el = await fixture('<ndd-form-field label="Name"></ndd-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.form-field__optional')).toBeNull();
	});

	it('renders "Optioneel" as the default optional label', async () => {
		el = await fixture('<ndd-form-field label="Phone" optional></ndd-form-field>');
		await waitForUpdate(el);
		const optional = el.shadowRoot!.querySelector('.form-field__optional');
		expect(optional!.textContent).toContain('Optioneel');
	});

	it('renders a custom optional label when optional-label is set', async () => {
		el = await fixture(
			'<ndd-form-field label="Phone" optional optional-label="Optional"></ndd-form-field>'
		);
		await waitForUpdate(el);
		const optional = el.shadowRoot!.querySelector('.form-field__optional');
		expect(optional!.textContent).toContain('Optional');
	});

	it('reflects label-alignment attribute', async () => {
		el = await fixture('<ndd-form-field label="Name" label-alignment="right"></ndd-form-field>');
		await waitForUpdate(el);
		expect(el.getAttribute('label-alignment')).toBe('right');
	});

	it('renders the header as a div containing a label element', async () => {
		el = await fixture('<ndd-form-field label="Name"></ndd-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div.form-field__header')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('label.form-field__label')).not.toBeNull();
	});

	it('includes help text id in aria-describedby', async () => {
		el = await fixture(`
			<ndd-form-field label="Email">
				<ndd-form-field-help-text id="help-static">Format: DD-MM-YYYY</ndd-form-field-help-text>
				<input>
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		const input = el.querySelector('input')!;
		const describedBy = input.getAttribute('aria-describedby') ?? '';
		expect(describedBy).toContain('help-static');
	});

	it('lists help text id before error id in aria-describedby', async () => {
		el = await fixture(`
			<ndd-form-field label="Email">
				<ndd-form-field-help-text id="help-1">Format hint</ndd-form-field-help-text>
				<input invalid error-message="endd-1">
				<ndd-form-field-error-text id="endd-1">Required</ndd-form-field-error-text>
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		const input = el.querySelector('input')!;
		const describedBy = input.getAttribute('aria-describedby') ?? '';
		const helpIndex = describedBy.indexOf('help-1');
		const errIndex = describedBy.indexOf('endd-1');
		expect(helpIndex).toBeGreaterThanOrEqual(0);
		expect(errIndex).toBeGreaterThan(helpIndex);
	});

	it('sets aria-label on the slotted input', async () => {
		el = await fixture('<ndd-form-field label="Email"><input></ndd-form-field>');
		await waitForUpdate(el);
		expect(el.querySelector('input')!.getAttribute('aria-label')).toBe('Email');
	});

	it('updates aria-label on the slotted input when label changes', async () => {
		el = await fixture('<ndd-form-field label="Email"><input></ndd-form-field>');
		await waitForUpdate(el);
		(el as any).label = 'New label';
		await waitForUpdate(el);
		expect(el.querySelector('input')!.getAttribute('aria-label')).toBe('New label');
	});

	it('removes aria-label from slotted input when label is cleared', async () => {
		el = await fixture('<ndd-form-field label="Email"><input></ndd-form-field>');
		await waitForUpdate(el);
		(el as any).label = '';
		await waitForUpdate(el);
		expect(el.querySelector('input')!.hasAttribute('aria-label')).toBe(false);
	});

	it('forwards aria-label to the inner input of a slotted ndd-text-field', async () => {
		el = await fixture(
			'<ndd-form-field label="Email"><ndd-text-field></ndd-text-field></ndd-form-field>'
		);
		await waitForUpdate(el);
		const textField = el.querySelector('ndd-text-field') as any;
		if (!textField) throw new Error('ndd-text-field not found');
		await textField.updateComplete;
		const innerInput = textField.shadowRoot!.querySelector('input')!;
		expect(innerInput.getAttribute('aria-label')).toBe('Email');
	});

	it('forwards aria-label to the inner input of a slotted ndd-password-field', async () => {
		el = await fixture(
			'<ndd-form-field label="Wachtwoord"><ndd-password-field></ndd-password-field></ndd-form-field>'
		);
		await waitForUpdate(el);
		const passwordField = el.querySelector('ndd-password-field') as any;
		if (!passwordField) throw new Error('ndd-password-field not found');
		await passwordField.updateComplete;
		const innerInput = passwordField.shadowRoot!.querySelector('input')!;
		expect(innerInput.getAttribute('aria-label')).toBe('Wachtwoord');
	});
});

/* ============================================================
   ndd-form-field error text wiring
   ============================================================ */

describe('ndd-form-field error text wiring', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('shows referenced error text when control is invalid', async () => {
		el = await fixture(`
			<ndd-form-field label="Email">
				<input invalid error-message="endd-1">
				<ndd-form-field-error-text id="endd-1">Required.</ndd-form-field-error-text>
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('ndd-form-field-error-text')!.hasAttribute('invalid')).toBe(true);
	});

	it('hides error text when control is not invalid', async () => {
		el = await fixture(`
			<ndd-form-field label="Email">
				<input error-message="endd-1">
				<ndd-form-field-error-text id="endd-1">Required.</ndd-form-field-error-text>
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('ndd-form-field-error-text')!.hasAttribute('invalid')).toBe(false);
	});

	it('only shows error texts referenced by error-message', async () => {
		el = await fixture(`
			<ndd-form-field label="Password">
				<input invalid error-message="endd-length">
				<ndd-form-field-error-text id="endd-required">Required.</ndd-form-field-error-text>
				<ndd-form-field-error-text id="endd-length">Too short.</ndd-form-field-error-text>
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		const [errRequired, errLength] = el.querySelectorAll('ndd-form-field-error-text');
		expect(errRequired.hasAttribute('invalid')).toBe(false);
		expect(errLength.hasAttribute('invalid')).toBe(true);
	});

	it('shows multiple error texts when all are referenced', async () => {
		el = await fixture(`
			<ndd-form-field label="Password">
				<input invalid error-message="endd-required endd-length">
				<ndd-form-field-error-text id="endd-required">Required.</ndd-form-field-error-text>
				<ndd-form-field-error-text id="endd-length">Too short.</ndd-form-field-error-text>
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		const [errRequired, errLength] = el.querySelectorAll('ndd-form-field-error-text');
		expect(errRequired.hasAttribute('invalid')).toBe(true);
		expect(errLength.hasAttribute('invalid')).toBe(true);
	});

	it('hides error texts when invalid is removed from control', async () => {
		el = await fixture(`
			<ndd-form-field label="Email">
				<input id="ctrl" invalid error-message="endd-1">
				<ndd-form-field-error-text id="endd-1">Required.</ndd-form-field-error-text>
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		el.querySelector('#ctrl')!.removeAttribute('invalid');
		await waitForUpdate(el);
		expect(el.querySelector('ndd-form-field-error-text')!.hasAttribute('invalid')).toBe(false);
	});

	it('does not treat ndd-form-field-help-text as the control', async () => {
		el = await fixture(`
			<ndd-form-field label="Email">
				<ndd-form-field-help-text>Help.</ndd-form-field-help-text>
				<input invalid error-message="endd-1">
				<ndd-form-field-error-text id="endd-1">Required.</ndd-form-field-error-text>
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('ndd-form-field-error-text')!.hasAttribute('invalid')).toBe(true);
	});

	it('does not treat ndd-form-field-error-text as the control', async () => {
		el = await fixture(`
			<ndd-form-field label="Email">
				<ndd-form-field-error-text id="endd-1">Required.</ndd-form-field-error-text>
				<input invalid error-message="endd-1">
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('ndd-form-field-error-text')!.hasAttribute('invalid')).toBe(true);
	});

	it('sets aria-describedby on the input referencing visible error IDs', async () => {
		el = await fixture(`
			<ndd-form-field label="Email">
				<input invalid error-message="endd-1">
				<ndd-form-field-error-text id="endd-1">Required.</ndd-form-field-error-text>
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		const input = el.querySelector('input')!;
		expect(input.getAttribute('aria-describedby')).toBe('endd-1');
	});

	it('sets aria-describedby with multiple IDs when multiple errors are visible', async () => {
		el = await fixture(`
			<ndd-form-field label="Password">
				<input invalid error-message="endd-required endd-length">
				<ndd-form-field-error-text id="endd-required">Required.</ndd-form-field-error-text>
				<ndd-form-field-error-text id="endd-length">Too short.</ndd-form-field-error-text>
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		const input = el.querySelector('input')!;
		expect(input.getAttribute('aria-describedby')).toBe('endd-required endd-length');
	});

	it('removes aria-describedby when errors are cleared', async () => {
		el = await fixture(`
			<ndd-form-field label="Email">
				<input id="ctrl" invalid error-message="endd-1">
				<ndd-form-field-error-text id="endd-1">Required.</ndd-form-field-error-text>
			</ndd-form-field>
		`);
		await waitForUpdate(el);
		el.querySelector('#ctrl')!.removeAttribute('invalid');
		await waitForUpdate(el);
		expect(el.querySelector('#ctrl')!.hasAttribute('aria-describedby')).toBe(false);
	});
});

/* ============================================================
   ndd-form-field-help-text
   ============================================================ */

describe('ndd-form-field-help-text', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders slotted content', async () => {
		el = await fixture('<ndd-form-field-help-text>Some help text.</ndd-form-field-help-text>');
		await waitForUpdate(el);
		expect(el.textContent).toContain('Some help text.');
	});

	it('renders slotted links', async () => {
		el = await fixture(
			'<ndd-form-field-help-text>Read <a href="/help">more</a>.</ndd-form-field-help-text>'
		);
		await waitForUpdate(el);
		expect(el.querySelector('a')).not.toBeNull();
	});
});

/* ============================================================
   ndd-form-field-error-text
   ============================================================ */

describe('ndd-form-field-error-text', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is hidden by default', async () => {
		el = await fixture('<ndd-form-field-error-text>Error</ndd-form-field-error-text>');
		await waitForUpdate(el);
		expect(el.hasAttribute('invalid')).toBe(false);
	});

	it('is visible when invalid is set', async () => {
		el = await fixture('<ndd-form-field-error-text invalid>Error</ndd-form-field-error-text>');
		await waitForUpdate(el);
		expect(el.hasAttribute('invalid')).toBe(true);
	});

	it('renders slotted content', async () => {
		el = await fixture(
			'<ndd-form-field-error-text invalid>Must be at least 8 characters.</ndd-form-field-error-text>'
		);
		await waitForUpdate(el);
		expect(el.textContent).toContain('Must be at least 8 characters.');
	});
});
