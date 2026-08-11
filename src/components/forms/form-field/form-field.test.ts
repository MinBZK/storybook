import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate, deepActiveElement } from '../../../test-utils.js';
import './form-field.js';
import '../../inputs/text-field/text-field.js';
import '../../inputs/password-field/password-field.js';
import '../../inputs/multi-line-text-field/multi-line-text-field.js';
import '../../inputs/number-field/number-field.js';
import '../../inputs/search-field/search-field.js';
import '../../inputs/date-field/date-field.js';
import '../../inputs/time-field/time-field.js';
import '../../inputs/combo-box/combo-box.js';
import '../../inputs/token-field/token-field.js';
import '../../inputs/switch-field/switch-field.js';
import '../../inputs/dropdown/dropdown.js';
import '../../inputs/checkbox/checkbox.js';
import '../../inputs/checkbox-field/checkbox-field.js';
import '../../inputs/radio-button/radio-button.js';
import '../../inputs/radio-button-field/radio-button-field.js';
import '../../inputs/radio-button-group/radio-button-group.js';
import '../../inputs/segmented-control/segmented-control.js';
import '../../inputs/stepper/stepper.js';
import '../../inputs/toggle-button/toggle-button.js';
import '../../inputs/toggle-button-group/toggle-button-group.js';
import '../../inputs/switch/switch.js';
import '../../content/tag/tag.js';
import '../../actions/button/button.js';


/* ============================================================
   nldd-form-field
   ============================================================ */

describe('nldd-form-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-form-field></nldd-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a label when provided', async () => {
		el = await fixture('<nldd-form-field label="Name"></nldd-form-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.form-field__label');
		expect(label).not.toBeNull();
		expect(label!.textContent).toContain('Name');
	});

	it('does not render a label span when label is omitted', async () => {
		el = await fixture('<nldd-form-field></nldd-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.form-field__label')).toBeNull();
	});

	it('hides the header when neither label nor supporting-label is set', async () => {
		el = await fixture('<nldd-form-field></nldd-form-field>');
		await waitForUpdate(el);
		const header = el.shadowRoot!.querySelector('.form-field__header');
		expect(header?.classList.contains('is-empty')).toBe(true);
	});

	it('shows the header when only supporting-label is set', async () => {
		el = await fixture('<nldd-form-field supporting-label="DD-MM-YYYY"></nldd-form-field>');
		await waitForUpdate(el);
		const header = el.shadowRoot!.querySelector('.form-field__header');
		expect(header?.classList.contains('is-empty')).toBe(false);
		expect(header!.textContent).toContain('DD-MM-YYYY');
	});

	it('shows the optional badge when optional attribute is set', async () => {
		el = await fixture('<nldd-form-field label="Phone" optional></nldd-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.form-field__optional')).not.toBeNull();
	});

	it('hides "Optional" when optional attribute is not set', async () => {
		el = await fixture('<nldd-form-field label="Name"></nldd-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.form-field__optional')).toBeNull();
	});

	it('renders "Optioneel" as the default optional label', async () => {
		el = await fixture('<nldd-form-field label="Phone" optional></nldd-form-field>');
		await waitForUpdate(el);
		const optional = el.shadowRoot!.querySelector('.form-field__optional');
		expect(optional!.textContent).toContain('Optioneel');
	});

	it('renders a custom optional label when optional-label is set', async () => {
		el = await fixture('<nldd-form-field label="Phone" optional optional-label="Optional"></nldd-form-field>');
		await waitForUpdate(el);
		const optional = el.shadowRoot!.querySelector('.form-field__optional');
		expect(optional!.textContent).toContain('Optional');
	});

	it('reflects label-alignment attribute', async () => {
		el = await fixture('<nldd-form-field label="Name" label-alignment="right"></nldd-form-field>');
		await waitForUpdate(el);
		expect(el.getAttribute('label-alignment')).toBe('right');
	});

	it('renders the header as a div containing a label element', async () => {
		el = await fixture('<nldd-form-field label="Name"></nldd-form-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div.form-field__header')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('label.form-field__label')).not.toBeNull();
	});

	it('includes help text id in aria-describedby', async () => {
		el = await fixture(`
			<nldd-form-field label="Email">
				<nldd-form-field-help-text id="help-static">Format: DD-MM-YYYY</nldd-form-field-help-text>
				<input>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		const input = el.querySelector('input')!;
		const describedBy = input.getAttribute('aria-describedby') ?? '';
		expect(describedBy).toContain('help-static');
	});

	it('hides help text via the hidden attribute', async () => {
		// The host is display: contents, which outranks the UA [hidden] rule;
		// without the :host([hidden]) restatement this stays visible.
		el = await fixture(`
			<nldd-form-field label="Periode">
				<nldd-form-field-help-text hidden>De periode van de opdracht is 1 jan t/m 1 feb</nldd-form-field-help-text>
				<input>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		const help = el.querySelector('nldd-form-field-help-text')!;
		expect(getComputedStyle(help).display).toBe('none');
	});

	it('lists help text id before error id in aria-describedby', async () => {
		el = await fixture(`
			<nldd-form-field label="Email">
				<nldd-form-field-help-text id="help-1">Format hint</nldd-form-field-help-text>
				<input invalid error-message="error-1">
				<nldd-form-field-error-text id="error-1">Required</nldd-form-field-error-text>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		const input = el.querySelector('input')!;
		const describedBy = input.getAttribute('aria-describedby') ?? '';
		const helpIndex = describedBy.indexOf('help-1');
		const errIndex = describedBy.indexOf('error-1');
		expect(helpIndex).toBeGreaterThanOrEqual(0);
		expect(errIndex).toBeGreaterThan(helpIndex);
	});

	it('sets aria-label on the slotted input', async () => {
		el = await fixture('<nldd-form-field label="Email"><input></nldd-form-field>');
		await waitForUpdate(el);
		expect(el.querySelector('input')!.getAttribute('aria-label')).toBe('Email');
	});

	it('updates aria-label on the slotted input when label changes', async () => {
		el = await fixture('<nldd-form-field label="Email"><input></nldd-form-field>');
		await waitForUpdate(el);
		(el as any).label = 'New label';
		await waitForUpdate(el);
		expect(el.querySelector('input')!.getAttribute('aria-label')).toBe('New label');
	});

	it('removes aria-label from slotted input when label is cleared', async () => {
		el = await fixture('<nldd-form-field label="Email"><input></nldd-form-field>');
		await waitForUpdate(el);
		(el as any).label = '';
		await waitForUpdate(el);
		expect(el.querySelector('input')!.hasAttribute('aria-label')).toBe(false);
	});

	it('forwards aria-label to the inner input of a slotted nldd-text-field', async () => {
		el = await fixture('<nldd-form-field label="Email"><nldd-text-field></nldd-text-field></nldd-form-field>');
		await waitForUpdate(el);
		const textField = el.querySelector('nldd-text-field') as any;
		if (!textField) throw new Error('nldd-text-field not found');
		await textField.updateComplete;
		const innerInput = textField.shadowRoot!.querySelector('input')!;
		expect(innerInput.getAttribute('aria-label')).toBe('Email');
	});

	it('forwards aria-label to the inner input of a slotted nldd-password-field', async () => {
		el = await fixture('<nldd-form-field label="Wachtwoord"><nldd-password-field></nldd-password-field></nldd-form-field>');
		await waitForUpdate(el);
		const passwordField = el.querySelector('nldd-password-field') as any;
		if (!passwordField) throw new Error('nldd-password-field not found');
		await passwordField.updateComplete;
		const innerInput = passwordField.shadowRoot!.querySelector('input')!;
		expect(innerInput.getAttribute('aria-label')).toBe('Wachtwoord');
	});
});


/* ============================================================
   nldd-form-field error text wiring
   ============================================================ */

describe('nldd-form-field error text wiring', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('shows referenced error text when control is invalid', async () => {
		el = await fixture(`
			<nldd-form-field label="Email">
				<input invalid error-message="error-1">
				<nldd-form-field-error-text id="error-1">Required.</nldd-form-field-error-text>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('nldd-form-field-error-text')!.hasAttribute('invalid')).toBe(true);
	});

	it('hides error text when control is not invalid', async () => {
		el = await fixture(`
			<nldd-form-field label="Email">
				<input error-message="error-1">
				<nldd-form-field-error-text id="error-1">Required.</nldd-form-field-error-text>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('nldd-form-field-error-text')!.hasAttribute('invalid')).toBe(false);
	});

	it('only shows error texts referenced by error-message', async () => {
		el = await fixture(`
			<nldd-form-field label="Password">
				<input invalid error-message="error-length">
				<nldd-form-field-error-text id="error-required">Required.</nldd-form-field-error-text>
				<nldd-form-field-error-text id="error-length">Too short.</nldd-form-field-error-text>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		const [errRequired, errLength] = el.querySelectorAll('nldd-form-field-error-text');
		expect(errRequired.hasAttribute('invalid')).toBe(false);
		expect(errLength.hasAttribute('invalid')).toBe(true);
	});

	it('shows multiple error texts when all are referenced', async () => {
		el = await fixture(`
			<nldd-form-field label="Password">
				<input invalid error-message="error-required error-length">
				<nldd-form-field-error-text id="error-required">Required.</nldd-form-field-error-text>
				<nldd-form-field-error-text id="error-length">Too short.</nldd-form-field-error-text>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		const [errRequired, errLength] = el.querySelectorAll('nldd-form-field-error-text');
		expect(errRequired.hasAttribute('invalid')).toBe(true);
		expect(errLength.hasAttribute('invalid')).toBe(true);
	});

	it('hides error texts when invalid is removed from control', async () => {
		el = await fixture(`
			<nldd-form-field label="Email">
				<input id="ctrl" invalid error-message="error-1">
				<nldd-form-field-error-text id="error-1">Required.</nldd-form-field-error-text>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		el.querySelector('#ctrl')!.removeAttribute('invalid');
		await waitForUpdate(el);
		expect(el.querySelector('nldd-form-field-error-text')!.hasAttribute('invalid')).toBe(false);
	});

	it('does not treat nldd-form-field-help-text as the control', async () => {
		el = await fixture(`
			<nldd-form-field label="Email">
				<nldd-form-field-help-text>Help.</nldd-form-field-help-text>
				<input invalid error-message="error-1">
				<nldd-form-field-error-text id="error-1">Required.</nldd-form-field-error-text>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('nldd-form-field-error-text')!.hasAttribute('invalid')).toBe(true);
	});

	it('does not treat nldd-form-field-error-text as the control', async () => {
		el = await fixture(`
			<nldd-form-field label="Email">
				<nldd-form-field-error-text id="error-1">Required.</nldd-form-field-error-text>
				<input invalid error-message="error-1">
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('nldd-form-field-error-text')!.hasAttribute('invalid')).toBe(true);
	});

	it('sets aria-describedby on the input referencing visible error IDs', async () => {
		el = await fixture(`
			<nldd-form-field label="Email">
				<input invalid error-message="error-1">
				<nldd-form-field-error-text id="error-1">Required.</nldd-form-field-error-text>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		const input = el.querySelector('input')!;
		expect(input.getAttribute('aria-describedby')).toBe('error-1');
	});

	it('sets aria-describedby with multiple IDs when multiple errors are visible', async () => {
		el = await fixture(`
			<nldd-form-field label="Password">
				<input invalid error-message="error-required error-length">
				<nldd-form-field-error-text id="error-required">Required.</nldd-form-field-error-text>
				<nldd-form-field-error-text id="error-length">Too short.</nldd-form-field-error-text>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		const input = el.querySelector('input')!;
		expect(input.getAttribute('aria-describedby')).toBe('error-required error-length');
	});

	it('removes aria-describedby when errors are cleared', async () => {
		el = await fixture(`
			<nldd-form-field label="Email">
				<input id="ctrl" invalid error-message="error-1">
				<nldd-form-field-error-text id="error-1">Required.</nldd-form-field-error-text>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		el.querySelector('#ctrl')!.removeAttribute('invalid');
		await waitForUpdate(el);
		expect(el.querySelector('#ctrl')!.hasAttribute('aria-describedby')).toBe(false);
	});
});


/* ============================================================
   nldd-form-field-help-text
   ============================================================ */

describe('nldd-form-field-help-text', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders slotted content', async () => {
		el = await fixture('<nldd-form-field-help-text>Some help text.</nldd-form-field-help-text>');
		await waitForUpdate(el);
		expect(el.textContent).toContain('Some help text.');
	});

	it('renders slotted links', async () => {
		el = await fixture('<nldd-form-field-help-text>Read <a href="/help">more</a>.</nldd-form-field-help-text>');
		await waitForUpdate(el);
		expect(el.querySelector('a')).not.toBeNull();
	});
});


/* ============================================================
   nldd-form-field-error-text
   ============================================================ */

describe('nldd-form-field-error-text', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is hidden by default', async () => {
		el = await fixture('<nldd-form-field-error-text>Error</nldd-form-field-error-text>');
		await waitForUpdate(el);
		expect(el.hasAttribute('invalid')).toBe(false);
	});

	it('is visible when invalid is set', async () => {
		el = await fixture('<nldd-form-field-error-text invalid>Error</nldd-form-field-error-text>');
		await waitForUpdate(el);
		expect(el.hasAttribute('invalid')).toBe(true);
	});

	it('renders slotted content', async () => {
		el = await fixture('<nldd-form-field-error-text invalid>Must be at least 8 characters.</nldd-form-field-error-text>');
		await waitForUpdate(el);
		expect(el.textContent).toContain('Must be at least 8 characters.');
	});
});

/* ============================================================
   Label click focuses the slotted control

   Every input the package ships must be reachable this way. Half of them
   silently were not (issue #189): the label calls .focus() on the slotted
   element, which does nothing unless that element is a native control or
   carries its own focus(). Walking the whole set here is what keeps the
   next component from slipping out again.
   ============================================================ */

const SLOTTED_CONTROLS: Array<{ name: string; markup: string }> = [
	{ name: 'text-field', markup: '<nldd-text-field></nldd-text-field>' },
	{ name: 'password-field', markup: '<nldd-password-field></nldd-password-field>' },
	{ name: 'multi-line-text-field', markup: '<nldd-multi-line-text-field></nldd-multi-line-text-field>' },
	{ name: 'number-field', markup: '<nldd-number-field></nldd-number-field>' },
	{ name: 'search-field', markup: '<nldd-search-field></nldd-search-field>' },
	{ name: 'date-field', markup: '<nldd-date-field></nldd-date-field>' },
	{ name: 'time-field', markup: '<nldd-time-field></nldd-time-field>' },
	{ name: 'combo-box', markup: '<nldd-combo-box></nldd-combo-box>' },
	// allow-custom keeps the inner input alive; without options or custom input a
	// token field has nothing to type into, and so nothing to focus.
	{ name: 'token-field', markup: '<nldd-token-field allow-custom accessible-label="Tags"></nldd-token-field>' },
	{ name: 'switch-field', markup: '<nldd-switch-field label="Aan"></nldd-switch-field>' },
	{ name: 'checkbox', markup: '<nldd-checkbox label="Optie"></nldd-checkbox>' },
	{ name: 'checkbox-field', markup: '<nldd-checkbox-field label="Optie"></nldd-checkbox-field>' },
	{ name: 'radio-button', markup: '<nldd-radio-button label="Optie"></nldd-radio-button>' },
	{ name: 'radio-button-field', markup: '<nldd-radio-button-field label="Optie"></nldd-radio-button-field>' },
	{ name: 'stepper', markup: '<nldd-stepper></nldd-stepper>' },
	{ name: 'toggle-button', markup: '<nldd-toggle-button type="button" text="Vet"></nldd-toggle-button>' },
	{ name: 'native input', markup: '<input type="text">' },
	{ name: 'native checkbox', markup: '<input type="checkbox">' },
	{
		name: 'dropdown',
		markup: '<nldd-dropdown><select aria-label="Land"><option value="nl">Nederland</option></select></nldd-dropdown>',
	},
	{
		name: 'radio-button-group',
		markup: `
			<nldd-radio-button-group name="g">
				<nldd-radio-button-field value="1" label="Optie 1"></nldd-radio-button-field>
				<nldd-radio-button-field value="2" label="Optie 2"></nldd-radio-button-field>
			</nldd-radio-button-group>
		`,
	},
	{
		name: 'toggle-button-group',
		markup: `
			<nldd-toggle-button-group type="button" name="t">
				<nldd-toggle-button value="a" text="A"></nldd-toggle-button>
				<nldd-toggle-button value="b" text="B"></nldd-toggle-button>
			</nldd-toggle-button-group>
		`,
	},
	{
		name: 'segmented-control',
		markup: `
			<nldd-segmented-control>
				<nldd-segmented-control-item value="a" text="A"></nldd-segmented-control-item>
				<nldd-segmented-control-item value="b" text="B"></nldd-segmented-control-item>
			</nldd-segmented-control>
		`,
	},
];

/** Walks up from the deepest active element, hopping shadow hosts, to see
 *  whether focus ended up anywhere inside `control`. */
function focusIsInside(control: Element): boolean {
	let node: Node | null = deepActiveElement();
	while (node) {
		if (node === control) return true;
		node = node instanceof ShadowRoot ? node.host : node.parentNode;
	}
	return false;
}

describe('nldd-form-field – label click focuses the slotted control', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	for (const { name, markup } of SLOTTED_CONTROLS) {
		it(`moves focus into ${name}`, async () => {
			el = await fixture(`<nldd-form-field label="Veld">${markup}</nldd-form-field>`);
			await waitForUpdate(el);

			const control = el.firstElementChild as HTMLElement;
			await waitForUpdate(control);

			const label = el.shadowRoot!.querySelector<HTMLElement>('.form-field__label')!;
			label.click();

			expect(focusIsInside(control)).toBe(true);
		});
	}
});


/* ============================================================
   The label is handed to the control as its accessible name

   `for` and `aria-labelledby` are IDREFs and an IDREF only resolves inside its
   own tree, so a label in this shadow root cannot point at a control in the
   consumer's light DOM. The name has to be handed over, and these cases pin
   down through which channel.
   ============================================================ */

// Controls that take the name through the design system's own naming channel.
const NAMED_VIA_ACCESSIBLE_LABEL = [
	'<nldd-text-field></nldd-text-field>',
	'<nldd-number-field></nldd-number-field>',
	'<nldd-search-field></nldd-search-field>',
	'<nldd-combo-box></nldd-combo-box>',
	'<nldd-token-field allow-custom></nldd-token-field>',
	'<nldd-checkbox></nldd-checkbox>',
	'<nldd-radio-button></nldd-radio-button>',
	'<nldd-switch></nldd-switch>',
	'<nldd-toggle-button text="A"></nldd-toggle-button>',
	'<nldd-stepper></nldd-stepper>',
	'<nldd-dropdown><select><option>a</option></select></nldd-dropdown>',
	'<nldd-radio-button-group name="g"><nldd-radio-button-field value="1" label="Een"></nldd-radio-button-field></nldd-radio-button-group>',
	'<nldd-toggle-button-group name="t"><nldd-toggle-button value="a" text="A"></nldd-toggle-button></nldd-toggle-button-group>',
	'<nldd-segmented-control><nldd-segmented-control-item value="a" text="A"></nldd-segmented-control-item></nldd-segmented-control>',
];

// These carry a visible label that already names their control. The caption
// above them is not their name, so it must not overwrite one.
const NAMES_ITSELF = [
	'<nldd-checkbox-field label="Nieuwsbrief"></nldd-checkbox-field>',
	'<nldd-radio-button-field label="Per post"></nldd-radio-button-field>',
	'<nldd-switch-field label="Meldingen"></nldd-switch-field>',
];

describe('nldd-form-field – hands the label to the control', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	for (const markup of NAMED_VIA_ACCESSIBLE_LABEL) {
		const tag = markup.slice(1, markup.indexOf(' ') > 0 ? Math.min(markup.indexOf(' '), markup.indexOf('>')) : markup.indexOf('>'));
		it(`names ${tag} through accessible-label`, async () => {
			el = await fixture(`<nldd-form-field label="Veldnaam">${markup}</nldd-form-field>`);
			await waitForUpdate(el);
			expect(el.firstElementChild!.getAttribute('accessible-label')).toBe('Veldnaam');
		});
	}

	for (const markup of NAMES_ITSELF) {
		const tag = markup.slice(1, markup.indexOf(' '));
		it(`leaves ${tag} to name itself`, async () => {
			el = await fixture(`<nldd-form-field label="Veldnaam">${markup}</nldd-form-field>`);
			await waitForUpdate(el);
			const control = el.firstElementChild!;
			expect(control.hasAttribute('accessible-label')).toBe(false);
			expect(control.getAttribute('label')).not.toBe('Veldnaam');
		});
	}

	it('names a native input through aria-label', async () => {
		el = await fixture('<nldd-form-field label="Veldnaam"><input type="text"></nldd-form-field>');
		await waitForUpdate(el);
		expect(el.querySelector('input')!.getAttribute('aria-label')).toBe('Veldnaam');
	});

	it('keeps a name the consumer set when it has no label of its own', async () => {
		el = await fixture('<nldd-form-field><nldd-text-field accessible-label="Zelf gezet"></nldd-text-field></nldd-form-field>');
		await waitForUpdate(el);
		expect(el.firstElementChild!.getAttribute('accessible-label')).toBe('Zelf gezet');
	});

	it('takes back only the name it wrote itself', async () => {
		el = await fixture('<nldd-form-field label="Veldnaam"><nldd-text-field></nldd-text-field></nldd-form-field>');
		await waitForUpdate(el);
		const field = el as HTMLElement & { label: string };
		expect(el.firstElementChild!.getAttribute('accessible-label')).toBe('Veldnaam');

		field.label = '';
		await waitForUpdate(el);
		expect(el.firstElementChild!.hasAttribute('accessible-label')).toBe(false);
	});
});

/* ============================================================
   Finding the control it is about

   The first child is normally the control, but it can be a wrapper put there
   for layout, and it can be the first of several. These pin down which element
   the field ends up wiring itself to.
   ============================================================ */

describe('nldd-form-field – finds the control', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('looks inside a wrapper for the control', async () => {
		el = await fixture('<nldd-form-field label="Veldnaam"><div><nldd-text-field></nldd-text-field></div></nldd-form-field>');
		await waitForUpdate(el);
		const field = el.querySelector('nldd-text-field')!;
		expect(field.getAttribute('accessible-label')).toBe('Veldnaam');
		expect(el.querySelector('div')!.hasAttribute('accessible-label')).toBe(false);
	});

	it('moves focus into a wrapped control', async () => {
		el = await fixture('<nldd-form-field label="Veldnaam"><div><nldd-text-field></nldd-text-field></div></nldd-form-field>');
		await waitForUpdate(el);
		const field = el.querySelector('nldd-text-field')! as HTMLElement;
		await waitForUpdate(field);
		el.shadowRoot!.querySelector<HTMLElement>('.form-field__label')!.click();
		expect(focusIsInside(field)).toBe(true);
	});

	it('digs through more than one layer of wrapping', async () => {
		el = await fixture('<nldd-form-field label="Veldnaam"><div><div><nldd-number-field></nldd-number-field></div></div></nldd-form-field>');
		await waitForUpdate(el);
		expect(el.querySelector('nldd-number-field')!.getAttribute('accessible-label')).toBe('Veldnaam');
	});

	it('names the first control when a field holds more than one', async () => {
		// A radio group whose last option is "Anders", with the text field that
		// appears alongside it. One question, one caption, two controls.
		el = await fixture(`
			<nldd-form-field label="Bezorgwijze">
				<nldd-radio-button-group name="b">
					<nldd-radio-button-field value="post" label="Per post"></nldd-radio-button-field>
					<nldd-radio-button-field value="anders" label="Anders"></nldd-radio-button-field>
				</nldd-radio-button-group>
				<nldd-text-field accessible-label="Andere bezorgwijze"></nldd-text-field>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('nldd-radio-button-group')!.getAttribute('accessible-label')).toBe('Bezorgwijze');
		expect(el.querySelector('nldd-text-field')!.getAttribute('accessible-label')).toBe('Andere bezorgwijze');
	});

	it('walks past a component that is not an input', async () => {
		// nldd-tag accepts accessible-label too. Taking that as the signal would
		// name the tag and leave the field it sits next to unnamed.
		el = await fixture(`
			<nldd-form-field label="Veldnaam">
				<div>
					<nldd-tag>PDF</nldd-tag>
					<nldd-text-field></nldd-text-field>
				</div>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('nldd-tag')!.hasAttribute('accessible-label')).toBe(false);
		expect(el.querySelector('nldd-text-field')!.getAttribute('accessible-label')).toBe('Veldnaam');
	});

	it('skips a leading component that is not an input', async () => {
		el = await fixture(`
			<nldd-form-field label="Veldnaam">
				<nldd-button text="Help"></nldd-button>
				<nldd-text-field></nldd-text-field>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('nldd-button')!.hasAttribute('accessible-label')).toBe(false);
		expect(el.querySelector('nldd-text-field')!.getAttribute('accessible-label')).toBe('Veldnaam');
	});

	it('wires up nothing and warns when there is no input at all', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture('<nldd-form-field label="Veldnaam"><div>Geen veld</div></nldd-form-field>');
		await waitForUpdate(el);
		expect(el.querySelector('div')!.hasAttribute('accessible-label')).toBe(false);
		expect(el.querySelector('div')!.hasAttribute('aria-label')).toBe(false);
		expect(warn).toHaveBeenCalledWith(expect.stringContaining('No form input found'));
		expect(warn).toHaveBeenCalledWith(expect.stringContaining('label="Veldnaam"'));
		warn.mockRestore();
	});

	it('stays quiet while the field is still empty', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture('<nldd-form-field label="Veldnaam"></nldd-form-field>');
		await waitForUpdate(el);
		expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('No form input found'));
		warn.mockRestore();
	});

	it('leaves a helper element alone as the first child', async () => {
		el = await fixture(`
			<nldd-form-field label="Veldnaam">
				<nldd-form-field-help-text>Uitleg</nldd-form-field-help-text>
				<nldd-text-field></nldd-text-field>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('nldd-text-field')!.getAttribute('accessible-label')).toBe('Veldnaam');
	});
});
