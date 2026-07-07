import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './token-field.js';

type TokenFieldEl = HTMLElement & {
	values: string[];
	_isOpen: boolean;
	_addValue(v: string): void;
	_removeValue(v: string): void;
	_togglePicker(): void;
};

describe('nldd-token-field', () => {
	let el: TokenFieldEl;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error and exposes the inline input', async () => {
		el = await fixture('<nldd-token-field accessible-label="Tags" allow-custom></nldd-token-field>');
		expect(el.shadowRoot).toBeTruthy();
		expect(el.shadowRoot!.querySelector('.token-field__input')).toBeTruthy();
	});

	it('renders a dismissible token per value', async () => {
		el = await fixture('<nldd-token-field accessible-label="Tags"></nldd-token-field>');
		el.values = ['a', 'b'];
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('nldd-token').length).toBe(2);
	});

	it('seeds values from a comma-separated attribute (whitespace trimmed, blanks dropped)', async () => {
		el = await fixture<TokenFieldEl>('<nldd-token-field accessible-label="Tags" values=" a , ,b, c "></nldd-token-field>');
		await waitForUpdate(el);
		expect(el.values).toEqual(['a', 'b', 'c']);
	});

	it('uses the slotted menu-item text as the token label', async () => {
		el = await fixture(`
			<nldd-token-field accessible-label="Tags">
				<nldd-menu>
					<nldd-menu-item value="a" text="Alpha"></nldd-menu-item>
				</nldd-menu>
			</nldd-token-field>
		`);
		el.values = ['a'];
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-token')!.textContent!.trim()).toBe('Alpha');
	});

	it('falls back to the raw value when no matching option exists', async () => {
		el = await fixture('<nldd-token-field accessible-label="Tags"></nldd-token-field>');
		el.values = ['x'];
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-token')!.textContent!.trim()).toBe('x');
	});

	it('dismissing a token drops the value and fires change', async () => {
		el = await fixture('<nldd-token-field accessible-label="Tags"></nldd-token-field>');
		el.values = ['a', 'b'];
		await waitForUpdate(el);
		let detail: { values: string[] } | null = null;
		el.addEventListener('change', (e) => {
			detail = (e as CustomEvent<{ values: string[] }>).detail;
		});
		el._removeValue('a');
		await waitForUpdate(el);
		expect(el.values).toEqual(['b']);
		expect(detail).toEqual({ values: ['b'] });
	});

	it('dedupes on add', async () => {
		el = await fixture('<nldd-token-field accessible-label="Tags"></nldd-token-field>');
		el.values = ['a'];
		el._addValue('a');
		expect(el.values).toEqual(['a']);
	});

	it('hides the input when no options remain and custom is not allowed', async () => {
		el = await fixture(`
			<nldd-token-field accessible-label="Tags">
				<nldd-menu>
					<nldd-menu-item value="a" text="Alpha"></nldd-menu-item>
					<nldd-menu-item value="b" text="Beta"></nldd-menu-item>
				</nldd-menu>
			</nldd-token-field>
		`);
		el.values = ['a', 'b'];
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.token-field__input')).toBeNull();
	});

	it('keeps the input visible when custom values are allowed', async () => {
		el = await fixture(`
			<nldd-token-field accessible-label="Tags" allow-custom>
				<nldd-menu>
					<nldd-menu-item value="a" text="Alpha"></nldd-menu-item>
				</nldd-menu>
			</nldd-token-field>
		`);
		el.values = ['a'];
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.token-field__input')).toBeTruthy();
	});

	it('keeps the placeholder on the input, also with tokens present', async () => {
		el = await fixture('<nldd-token-field accessible-label="Tags" allow-custom placeholder="Voeg toe…"></nldd-token-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('.token-field__input')!;
		expect(input.getAttribute('placeholder')).toBe('Voeg toe…');
		el.values = ['a'];
		await waitForUpdate(el);
		expect(input.getAttribute('placeholder')).toBe('Voeg toe…');
	});

	// — Menu wiring (F2) ——————————————————————————————————————————————————————

	const withMenu = () => fixture<TokenFieldEl>(`
		<nldd-token-field accessible-label="Landen">
			<nldd-menu variant="listbox">
				<nldd-menu-item value="nl" text="Nederland"></nldd-menu-item>
				<nldd-menu-item value="be" text="België"></nldd-menu-item>
			</nldd-menu>
		</nldd-token-field>
	`);

	it('selecting an option adds it as a token and fires change', async () => {
		el = await withMenu();
		await waitForUpdate(el);
		let detail: { values: string[] } | null = null;
		el.addEventListener('change', (e) => {
			detail = (e as CustomEvent<{ values: string[] }>).detail;
		});
		el.querySelector('nldd-menu-item[value="be"]')!
			.dispatchEvent(new CustomEvent('select', { bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(el.values).toEqual(['be']);
		expect(detail).toEqual({ values: ['be'] });
		expect(el.shadowRoot!.querySelector('nldd-token')!.textContent!.trim()).toBe('België');
	});

	it('hides options that are already selected from the menu', async () => {
		el = await withMenu();
		el.values = ['nl'];
		await waitForUpdate(el);
		expect(el.querySelector('nldd-menu-item[value="nl"]')!.hasAttribute('hidden')).toBe(true);
		expect(el.querySelector('nldd-menu-item[value="be"]')!.hasAttribute('hidden')).toBe(false);
	});

	it('reveals an option again when its token is removed', async () => {
		el = await withMenu();
		el.values = ['nl'];
		await waitForUpdate(el);
		el._removeValue('nl');
		await waitForUpdate(el);
		expect(el.querySelector('nldd-menu-item[value="nl"]')!.hasAttribute('hidden')).toBe(false);
	});

	// — Comma-separated custom input ——————————————————————————————————————————

	const typeInto = async (input: HTMLInputElement, value: string) => {
		input.value = value;
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
	};

	it('splits comma-separated custom input into tokens, keeping the trailing part', async () => {
		el = await fixture<TokenFieldEl>('<nldd-token-field accessible-label="E-mail" allow-custom></nldd-token-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('.token-field__input')!;
		await typeInto(input, 'a@x.com, b@y.com');
		expect(el.values).toEqual(['a@x.com']);
		expect(input.value.trim()).toBe('b@y.com');
	});

	it('commits a token on a trailing comma and clears the input', async () => {
		el = await fixture<TokenFieldEl>('<nldd-token-field accessible-label="E-mail" allow-custom></nldd-token-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('.token-field__input')!;
		await typeInto(input, 'hello,');
		expect(el.values).toEqual(['hello']);
		expect(input.value).toBe('');
	});

	it('does not treat commas as separators without allow-custom', async () => {
		el = await withMenu(); // has options (so the input renders), no allow-custom
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('.token-field__input')!;
		await typeInto(input, 'a,b');
		expect(el.values).toEqual([]);
	});

	// — Picker button ——————————————————————————————————————————————————————————

	it('renders a picker button and toggles the menu with it', async () => {
		el = await withMenu();
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.token-field__picker nldd-icon-button')).toBeTruthy();
		el._togglePicker();
		await waitForUpdate(el);
		expect(el._isOpen).toBe(true);
		el._togglePicker();
		await waitForUpdate(el);
		expect(el._isOpen).toBe(false);
	});

	it('highlights the first option when the menu opens', async () => {
		el = await withMenu();
		await waitForUpdate(el);
		el._togglePicker();
		await waitForUpdate(el);
		await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null))));
		expect(el.querySelector('nldd-menu-item[highlighted]')?.getAttribute('value')).toBe('nl');
	});

	it('renders no picker for a free-text field without a menu', async () => {
		el = await fixture<TokenFieldEl>('<nldd-token-field accessible-label="E-mail" allow-custom></nldd-token-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.token-field__picker')).toBeNull();
	});

	const pressEnter = (input: HTMLInputElement) =>
		input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

	it('commits a custom value on Enter with no menu', async () => {
		el = await fixture<TokenFieldEl>('<nldd-token-field accessible-label="E-mail" allow-custom></nldd-token-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('.token-field__input')!;
		await typeInto(input, 'test 3');
		pressEnter(input);
		await waitForUpdate(el);
		expect(el.values).toEqual(['test 3']);
	});

	it('commits a custom value on Enter when the menu has no matching option', async () => {
		el = await fixture<TokenFieldEl>(`
			<nldd-token-field accessible-label="Landen" allow-custom>
				<nldd-menu variant="listbox">
					<nldd-menu-item value="nl" text="Nederland"></nldd-menu-item>
				</nldd-menu>
			</nldd-token-field>
		`);
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('.token-field__input')!;
		await typeInto(input, 'xyz'); // matches no option → menu closes
		pressEnter(input);
		await waitForUpdate(el);
		expect(el.values).toEqual(['xyz']);
	});

	// — Form participation (F3) ————————————————————————————————————————————————

	it('submits one form entry per token value', async () => {
		const form = document.createElement('form');
		const field = document.createElement('nldd-token-field') as TokenFieldEl;
		field.setAttribute('name', 'landen');
		form.appendChild(field);
		document.body.appendChild(form);
		field.values = ['nl', 'be'];
		await waitForUpdate(field);
		expect(new FormData(form).getAll('landen')).toEqual(['nl', 'be']);
		form.remove();
	});

	// — Keyboard navigation (F3) ———————————————————————————————————————————————

	it('Backspace focuses the last token, a second removes it and returns to the input', async () => {
		el = await withMenu();
		el.values = ['nl'];
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector<HTMLInputElement>('.token-field__input')!;
		input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
		await waitForUpdate(el);
		const token = el.shadowRoot!.querySelectorAll('.token-field__token')[0];
		expect(el.shadowRoot!.activeElement).toBe(token); // focused, not removed
		expect(el.values).toEqual(['nl']);
		token.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
		await waitForUpdate(el);
		await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
		expect(el.values).toEqual([]);
		expect(el.shadowRoot!.activeElement).toBe(el.shadowRoot!.querySelector('.token-field__input'));
	});

	it('removes a token on Backspace while the token is focused', async () => {
		el = await withMenu();
		el.values = ['nl', 'be'];
		await waitForUpdate(el);
		const token = el.shadowRoot!.querySelectorAll('.token-field__token')[0];
		token.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
		await waitForUpdate(el);
		expect(el.values).toEqual(['be']);
	});

	// — Readonly & required (F3.5) —————————————————————————————————————————————

	it('readonly hides the input and picker and makes tokens static', async () => {
		el = await withMenu();
		el.values = ['nl'];
		(el as unknown as { readonly: boolean }).readonly = true;
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.token-field__input')).toBeNull();
		expect(el.shadowRoot!.querySelector('.token-field__picker')).toBeNull();
		expect(el.shadowRoot!.querySelector('nldd-token')!.getAttribute('control')).toBeNull();
	});

	it('is invalid when required and empty, valid once a token is added', async () => {
		const form = document.createElement('form');
		const field = document.createElement('nldd-token-field') as TokenFieldEl;
		field.setAttribute('name', 'landen');
		field.setAttribute('required', '');
		form.appendChild(field);
		document.body.appendChild(form);
		await waitForUpdate(field);
		expect(form.checkValidity()).toBe(false);
		field.values = ['nl'];
		await waitForUpdate(field);
		expect(form.checkValidity()).toBe(true);
		form.remove();
	});

});
