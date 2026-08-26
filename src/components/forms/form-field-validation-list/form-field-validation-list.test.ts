import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './form-field-validation-list.js';
import '../form-field/form-field.js';
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

	it('laat een lege waarde elke regel halen, zodat een onaangeraakt veld niet rood staat', async () => {
		el = await fixture(`
			<nldd-form-field label="Wachtwoord">
				<nldd-text-field invalid></nldd-text-field>
				<nldd-form-field-validation-list>
					<nldd-form-field-validation-item id="length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
				</nldd-form-field-validation-list>
			</nldd-form-field>
		`);
		await waitForUpdate(el);
		expect(item(el, 'length').unmet).toBe(false);
	});

	it('laat `required` als enige regel wél afgaan op leeg', async () => {
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
		expect(item(el, 'length').unmet).toBe(false);

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
});
