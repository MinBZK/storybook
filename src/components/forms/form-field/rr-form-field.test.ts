import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-form-field.ts';


/* ============================================================
   rr-form-field
   ============================================================ */

describe('rr-form-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-form-field></rr-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a label when provided', async () => {
		el = await fixture('<rr-form-field label="Name"></rr-form-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.form-field__label');
		expect(label).not.toBeNull();
		expect(label!.textContent).toContain('Name');
	});

	it('does not render a label span when label is omitted', async () => {
		el = await fixture('<rr-form-field></rr-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.form-field__label')).toBeNull();
	});

	it('hides the header when neither label nor supporting-label is set', async () => {
		el = await fixture('<rr-form-field></rr-form-field>');
		await waitForUpdate(el);
		const header = el.shadowRoot!.querySelector('.form-field__header');
		expect(header?.classList.contains('is-empty')).toBe(true);
	});

	it('shows the header when only supporting-label is set', async () => {
		el = await fixture('<rr-form-field supporting-label="DD-MM-YYYY"></rr-form-field>');
		await waitForUpdate(el);
		const header = el.shadowRoot!.querySelector('.form-field__header');
		expect(header?.classList.contains('is-empty')).toBe(false);
		expect(header!.textContent).toContain('DD-MM-YYYY');
	});

	it('shows "Optional" when optional attribute is set', async () => {
		el = await fixture('<rr-form-field label="Phone" optional></rr-form-field>');
		await waitForUpdate(el);
		const optional = el.shadowRoot!.querySelector('.form-field__optional');
		expect(optional).not.toBeNull();
		expect(optional!.textContent).toContain('Optional');
	});

	it('hides "Optional" when optional attribute is not set', async () => {
		el = await fixture('<rr-form-field label="Name"></rr-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.form-field__optional')).toBeNull();
	});

	it('reflects label-alignment attribute', async () => {
		el = await fixture('<rr-form-field label="Name" label-alignment="right"></rr-form-field>');
		await waitForUpdate(el);
		expect(el.getAttribute('label-alignment')).toBe('right');
	});

	it('renders the header as a label element', async () => {
		el = await fixture('<rr-form-field label="Name"></rr-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('label.form-field__header')).not.toBeNull();
	});

	it('sets aria-label on the slotted input', async () => {
		el = await fixture('<rr-form-field label="Email"><input></rr-form-field>');
		await waitForUpdate(el);
		expect(el.querySelector('input')!.getAttribute('aria-label')).toBe('Email');
	});

	it('updates aria-label on the slotted input when label changes', async () => {
		el = await fixture('<rr-form-field label="Email"><input></rr-form-field>');
		await waitForUpdate(el);
		(el as any).label = 'New label';
		await waitForUpdate(el);
		expect(el.querySelector('input')!.getAttribute('aria-label')).toBe('New label');
	});
});


/* ============================================================
   rr-form-field error text wiring
   ============================================================ */

describe('rr-form-field error text wiring', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('shows referenced error text when control is invalid', async () => {
		el = await fixture(`
			<rr-form-field label="Email">
				<input invalid error-message="err-1">
				<rr-form-field-error-text id="err-1">Required.</rr-form-field-error-text>
			</rr-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('rr-form-field-error-text')!.hasAttribute('invalid')).toBe(true);
	});

	it('hides error text when control is not invalid', async () => {
		el = await fixture(`
			<rr-form-field label="Email">
				<input error-message="err-1">
				<rr-form-field-error-text id="err-1">Required.</rr-form-field-error-text>
			</rr-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('rr-form-field-error-text')!.hasAttribute('invalid')).toBe(false);
	});

	it('only shows error texts referenced by error-message', async () => {
		el = await fixture(`
			<rr-form-field label="Password">
				<input invalid error-message="err-length">
				<rr-form-field-error-text id="err-required">Required.</rr-form-field-error-text>
				<rr-form-field-error-text id="err-length">Too short.</rr-form-field-error-text>
			</rr-form-field>
		`);
		await waitForUpdate(el);
		const [errRequired, errLength] = el.querySelectorAll('rr-form-field-error-text');
		expect(errRequired.hasAttribute('invalid')).toBe(false);
		expect(errLength.hasAttribute('invalid')).toBe(true);
	});

	it('shows multiple error texts when all are referenced', async () => {
		el = await fixture(`
			<rr-form-field label="Password">
				<input invalid error-message="err-required err-length">
				<rr-form-field-error-text id="err-required">Required.</rr-form-field-error-text>
				<rr-form-field-error-text id="err-length">Too short.</rr-form-field-error-text>
			</rr-form-field>
		`);
		await waitForUpdate(el);
		const [errRequired, errLength] = el.querySelectorAll('rr-form-field-error-text');
		expect(errRequired.hasAttribute('invalid')).toBe(true);
		expect(errLength.hasAttribute('invalid')).toBe(true);
	});

	it('hides error texts when invalid is removed from control', async () => {
		el = await fixture(`
			<rr-form-field label="Email">
				<input id="ctrl" invalid error-message="err-1">
				<rr-form-field-error-text id="err-1">Required.</rr-form-field-error-text>
			</rr-form-field>
		`);
		await waitForUpdate(el);
		el.querySelector('#ctrl')!.removeAttribute('invalid');
		await new Promise(r => setTimeout(r, 0));
		expect(el.querySelector('rr-form-field-error-text')!.hasAttribute('invalid')).toBe(false);
	});

	it('does not treat rr-form-field-help-text as the control', async () => {
		el = await fixture(`
			<rr-form-field label="Email">
				<rr-form-field-help-text>Help.</rr-form-field-help-text>
				<input invalid error-message="err-1">
				<rr-form-field-error-text id="err-1">Required.</rr-form-field-error-text>
			</rr-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('rr-form-field-error-text')!.hasAttribute('invalid')).toBe(true);
	});

	it('does not treat rr-form-field-error-text as the control', async () => {
		el = await fixture(`
			<rr-form-field label="Email">
				<rr-form-field-error-text id="err-1">Required.</rr-form-field-error-text>
				<input invalid error-message="err-1">
			</rr-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('rr-form-field-error-text')!.hasAttribute('invalid')).toBe(true);
	});

	it('sets aria-describedby on the input referencing visible error IDs', async () => {
		el = await fixture(`
			<rr-form-field label="Email">
				<input invalid error-message="err-1">
				<rr-form-field-error-text id="err-1">Required.</rr-form-field-error-text>
			</rr-form-field>
		`);
		await waitForUpdate(el);
		const input = el.querySelector('input')!;
		expect(input.getAttribute('aria-describedby')).toBe('err-1');
	});

	it('sets aria-describedby with multiple IDs when multiple errors are visible', async () => {
		el = await fixture(`
			<rr-form-field label="Password">
				<input invalid error-message="err-required err-length">
				<rr-form-field-error-text id="err-required">Required.</rr-form-field-error-text>
				<rr-form-field-error-text id="err-length">Too short.</rr-form-field-error-text>
			</rr-form-field>
		`);
		await waitForUpdate(el);
		const input = el.querySelector('input')!;
		expect(input.getAttribute('aria-describedby')).toBe('err-required err-length');
	});

	it('removes aria-describedby when errors are cleared', async () => {
		el = await fixture(`
			<rr-form-field label="Email">
				<input id="ctrl" invalid error-message="err-1">
				<rr-form-field-error-text id="err-1">Required.</rr-form-field-error-text>
			</rr-form-field>
		`);
		await waitForUpdate(el);
		el.querySelector('#ctrl')!.removeAttribute('invalid');
		await new Promise(r => setTimeout(r, 0));
		expect(el.querySelector('#ctrl')!.hasAttribute('aria-describedby')).toBe(false);
	});
});


/* ============================================================
   rr-form-field-help-text
   ============================================================ */

describe('rr-form-field-help-text', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders slotted content', async () => {
		el = await fixture('<rr-form-field-help-text>Some help text.</rr-form-field-help-text>');
		await waitForUpdate(el);
		expect(el.textContent).toContain('Some help text.');
	});

	it('renders slotted links', async () => {
		el = await fixture('<rr-form-field-help-text>Read <a href="/help">more</a>.</rr-form-field-help-text>');
		await waitForUpdate(el);
		expect(el.querySelector('a')).not.toBeNull();
	});
});


/* ============================================================
   rr-form-field-error-text
   ============================================================ */

describe('rr-form-field-error-text', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is hidden by default', async () => {
		el = await fixture('<rr-form-field-error-text>Error</rr-form-field-error-text>');
		await waitForUpdate(el);
		expect(el.hasAttribute('invalid')).toBe(false);
	});

	it('is visible when invalid is set', async () => {
		el = await fixture('<rr-form-field-error-text invalid>Error</rr-form-field-error-text>');
		await waitForUpdate(el);
		expect(el.hasAttribute('invalid')).toBe(true);
	});

	it('renders slotted content', async () => {
		el = await fixture('<rr-form-field-error-text invalid>Must be at least 8 characters.</rr-form-field-error-text>');
		await waitForUpdate(el);
		expect(el.textContent).toContain('Must be at least 8 characters.');
	});
});
