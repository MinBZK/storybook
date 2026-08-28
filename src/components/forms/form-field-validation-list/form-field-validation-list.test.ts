import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './form-field-validation-list.js';
import '../form-field/form-field.js';
import '../form/form.js';
import '../../inputs/text-field/text-field.js';
import type { NLDDFormFieldValidationItem } from './form-field-validation-list.js';

function item(root: ParentNode, id: string): NLDDFormFieldValidationItem {
	return root.querySelector(`#${id}`) as NLDDFormFieldValidationItem;
}

/** Types into the field the way the component hears it, so the list re-checks. */
async function type(field: HTMLElement, value: string): Promise<void> {
	const control = field.querySelector('nldd-text-field') as HTMLElement & { value: string };
	control.value = value;
	control.dispatchEvent(new Event('input', { bubbles: true }));
	await waitForUpdate(field);
}

describe('nldd-form-field-validation-list', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-form-field-validation-list></nldd-form-field-validation-list>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('houdt een item zonder regel verborgen tot de app hem noemt', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field></nldd-text-field>
				<nldd-form-field-validation-list>
					<nldd-form-field-validation-item id="breach">Staat in een datalek</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(item(el, 'breach').visible).toBe(false);

		const control = el.querySelector('nldd-text-field')!;
		control.setAttribute('unmet', 'breach');
		control.setAttribute('invalid', '');
		await waitForUpdate(el);

		expect(item(el, 'breach').visible).toBe(true);
		expect(item(el, 'breach').unmet).toBe(true);
	});

	it('laat een regel zichzelf toetsen en verdwijnen zodra hij gehaald is', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field invalid></nldd-text-field>
				<nldd-form-field-validation-list>
					<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);

		await type(el, 'kort');
		expect(item(el, 'length').unmet).toBe(true);
		expect(item(el, 'length').visible).toBe(true);

		await type(el, 'lang genoeg');
		expect(item(el, 'length').unmet).toBe(false);
		expect(item(el, 'length').visible).toBe(false);
	});

	it('houdt een lege waarde tegen de regels aan, want die haalt hij niet', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field invalid></nldd-text-field>
				<nldd-form-field-validation-list>
					<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(item(el, 'length').unmet).toBe(true);
	});

	it('laat een onaangeraakt veld met rust, want er is nog geen oordeel', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field></nldd-text-field>
				<nldd-form-field-validation-list hint>
					<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(item(el, 'length').visible).toBe(true);
		expect(item(el, 'length').unmet).toBe(false);
	});

	it('laat `required` afgaan op leeg, ook zonder andere regels', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field invalid></nldd-text-field>
				<nldd-form-field-validation-list>
					<nldd-form-field-validation-item id="leeg" required>Vul een wachtwoord in</nldd-form-field-validation-item>
					<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(item(el, 'leeg').unmet).toBe(true);
		expect(item(el, 'length').unmet).toBe(true);

		await type(el, 'x');
		expect(item(el, 'leeg').unmet).toBe(false);
		expect(item(el, 'length').unmet).toBe(true);
	});

	it('leest `match` als "bevat", niet als de hele waarde', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field invalid></nldd-text-field>
				<nldd-form-field-validation-list>
					<nldd-form-field-validation-item id="capital" match="[A-Z]">Een hoofdletter</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);

		await type(el, 'abc');
		expect(item(el, 'capital').unmet).toBe(true);

		await type(el, 'aBc');
		expect(item(el, 'capital').unmet).toBe(false);
	});

	it('toont met `hint` alles vooraf, neutraal', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field></nldd-text-field>
				<nldd-form-field-validation-list hint>
					<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
					<nldd-form-field-validation-item id="capital" match="[A-Z]">Een hoofdletter</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		for (const id of ['length', 'capital']) {
			expect(item(el, id).visible).toBe(true);
			expect(item(el, id).unmet).toBe(false);
		}
	});

	it('laat een hint staan als het veld goed is, en een gewoon item niet', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field valid></nldd-text-field>
				<nldd-form-field-validation-list>
					<nldd-form-field-validation-item id="length" hint minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
					<nldd-form-field-validation-item id="breach">Staat in een datalek</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(item(el, 'length').visible).toBe(true);
		expect(item(el, 'length').unmet).toBe(false);
		expect(item(el, 'breach').visible).toBe(false);
	});

	it('vindt z\'n control via `for` als hij buiten een veld staat', async () => {
		el = await fixture(`
			<div>
				<nldd-text-field id="los" invalid></nldd-text-field>
				<nldd-form-field-validation-list for="los">
					<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</div>
		`);
		await waitForUpdate(el);
		const control = el.querySelector('nldd-text-field') as HTMLElement & { value: string };
		control.value = 'kort';
		control.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect(item(el, 'length').unmet).toBe(true);
	});

	it('meldt een falende regel bij de control, zodat het formulier niet weggaat', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field></nldd-text-field>
				<nldd-form-field-validation-list>
					<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		const control = el.querySelector('nldd-text-field') as HTMLElement & { value: string; internals?: ElementInternals };

		await type(el, 'kort');
		expect(control.internals?.validity.customError).toBe(true);

		await type(el, 'lang genoeg');
		expect(control.internals?.validity.valid).toBe(true);
	});

	it('staat in de beschrijving van de control, één keer', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field invalid></nldd-text-field>
				<nldd-form-field-validation-list hint>
					<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		const inner = el.querySelector('nldd-text-field')!.shadowRoot!.querySelector('input')!;
		const described = (inner as Element & { ariaDescribedByElements?: readonly Element[] | null })
			.ariaDescribedByElements ?? [];
		expect(described).toEqual([el.querySelector('nldd-form-field-validation-list')]);
	});

	it('toont niets zonder `invalid`, maar blokkeert het formulier wel', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field></nldd-text-field>
				<nldd-form-field-validation-list>
					<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		await type(el, 'kort');
		const control = el.querySelector('nldd-text-field') as HTMLElement & { internals?: ElementInternals };

		expect(item(el, 'length').visible).toBe(false);
		expect(control.internals?.validity.customError).toBe(true);
	});
});

describe('nldd-form markeert een control op het moment dat het platform het zegt', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('laat de native validatiebubbel weg, want we schrijven zelf', async () => {
		el = await fixture(`
			<nldd-form novalidate>
				<nldd-form-field label="Wachtwoord">
					<nldd-text-field name="pw"></nldd-text-field>
					<nldd-form-field-validation-list>
						<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
					</nldd-form-field-validation-list>
				</nldd-form-field>
			</nldd-form>
		`);
		await waitForUpdate(el);
		const control = el.querySelector('nldd-text-field')!;

		let gemeld = false;
		control.addEventListener('invalid', e => { gemeld = e.defaultPrevented; });
		(el as HTMLElement & { form: HTMLFormElement }).form.reportValidity();
		await waitForUpdate(el);
		expect(gemeld).toBe(true);
	});

	it('zet `invalid` bij submit en haalt hem weg zodra het klopt', async () => {
		el = await fixture(`
			<nldd-form novalidate>
				<nldd-form-field label="Wachtwoord">
					<nldd-text-field name="pw"></nldd-text-field>
					<nldd-form-field-validation-list>
						<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
					</nldd-form-field-validation-list>
				</nldd-form-field>
			</nldd-form>
		`);
		await waitForUpdate(el);
		const control = el.querySelector('nldd-text-field') as HTMLElement & { value: string };

		control.value = 'kort';
		control.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect(control.hasAttribute('invalid')).toBe(false);

		(el as HTMLElement & { form: HTMLFormElement }).form.checkValidity();
		await waitForUpdate(el);
		expect(control.hasAttribute('invalid')).toBe(true);
		expect(item(el, 'length').visible).toBe(true);

		control.value = 'lang genoeg';
		control.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect(control.hasAttribute('invalid')).toBe(false);

		// En weer terug: het formulier weigert dit opnieuw, dus het veld hoort
		// dat te zeggen in plaats van stil te blijven.
		control.value = 'kort';
		control.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect(control.hasAttribute('invalid')).toBe(true);
		expect(item(el, 'length').visible).toBe(true);
	});

	it('laat een veld dat nog nooit beoordeeld is met rust tijdens het typen', async () => {
		el = await fixture(`
			<nldd-form novalidate>
				<nldd-form-field label="Wachtwoord">
					<nldd-text-field name="pw"></nldd-text-field>
					<nldd-form-field-validation-list>
						<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
					</nldd-form-field-validation-list>
				</nldd-form-field>
			</nldd-form>
		`);
		await waitForUpdate(el);
		const control = el.querySelector('nldd-text-field') as HTMLElement & { value: string };

		control.value = 'k';
		control.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect(control.hasAttribute('invalid')).toBe(false);
		expect(item(el, 'length').visible).toBe(false);
	});
});
