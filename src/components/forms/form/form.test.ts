import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './form.js';
import '../form-field/form-field.js';
import '../form-actions/form-actions.js';

describe('nldd-form', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-form></nldd-form>');
		await waitForUpdate(el);
		expect(el.querySelector('form')).not.toBeNull();
	});

	it('verplaatst children in het inner form element', async () => {
		el = await fixture(`
			<nldd-form>
				<input type="text" name="email">
				<button type="submit">Send</button>
			</nldd-form>
		`);
		await waitForUpdate(el);
		const form = el.querySelector('form')!;
		expect(form.querySelector('input[name="email"]')).not.toBeNull();
		expect(form.querySelector('button[type="submit"]')).not.toBeNull();
	});

	it('forwardt name attribuut naar form', async () => {
		el = await fixture('<nldd-form name="login"></nldd-form>');
		await waitForUpdate(el);
		expect(el.querySelector('form')!.getAttribute('name')).toBe('login');
	});

	it('forwardt novalidate attribuut', async () => {
		el = await fixture('<nldd-form novalidate></nldd-form>');
		await waitForUpdate(el);
		expect(el.querySelector('form')!.hasAttribute('novalidate')).toBe(true);
	});

	it('forwardt method en action', async () => {
		el = await fixture('<nldd-form method="post" action="/login"></nldd-form>');
		await waitForUpdate(el);
		const form = el.querySelector('form')!;
		expect(form.getAttribute('method')).toBe('post');
		expect(form.getAttribute('action')).toBe('/login');
	});

	it('exposeert het inner form via .form getter', async () => {
		el = await fixture('<nldd-form></nldd-form>');
		await waitForUpdate(el);
		const form = (el as any).form;
		expect(form).toBeInstanceOf(HTMLFormElement);
	});

	it('verplaatst dynamisch toegevoegde children naar het form', async () => {
		el = await fixture('<nldd-form></nldd-form>');
		await waitForUpdate(el);

		const input = document.createElement('input');
		input.name = 'late';
		el.appendChild(input);

		// MutationObserver runs async — wait a microtask
		await new Promise(resolve => setTimeout(resolve, 0));

		const form = el.querySelector('form')!;
		expect(form.querySelector('input[name="late"]')).not.toBeNull();
	});


	describe('label-alignment propagation', () => {
		it('propageert label-alignment naar form-field en form-actions children', async () => {
			el = await fixture(`
				<nldd-form label-alignment="right">
					<nldd-form-field label="A"></nldd-form-field>
					<nldd-form-field label="B"></nldd-form-field>
					<nldd-form-actions></nldd-form-actions>
				</nldd-form>
			`);
			await waitForUpdate(el);

			const fields = el.querySelectorAll('nldd-form-field');
			const actions = el.querySelector('nldd-form-actions')!;
			fields.forEach(f => {
				expect(f.getAttribute('label-alignment')).toBe('right');
				expect((f as HTMLElement).dataset.formAlignmentInherited).toBe('true');
			});
			expect(actions.getAttribute('label-alignment')).toBe('right');
			expect((actions as HTMLElement).dataset.formAlignmentInherited).toBe('true');
		});

		it('overschrijft NIET een explicit eigen label-alignment van een form-field', async () => {
			el = await fixture(`
				<nldd-form label-alignment="right">
					<nldd-form-field label="Inherits"></nldd-form-field>
					<nldd-form-field label="Own" label-alignment="top"></nldd-form-field>
				</nldd-form>
			`);
			await waitForUpdate(el);

			const inherits = el.querySelector('nldd-form-field[label="Inherits"]') as HTMLElement;
			const own = el.querySelector('nldd-form-field[label="Own"]') as HTMLElement;

			expect(inherits.getAttribute('label-alignment')).toBe('right');
			expect(inherits.dataset.formAlignmentInherited).toBe('true');

			// Eigen attribute moet behouden blijven en NIET als inherited gemarkeerd zijn
			expect(own.getAttribute('label-alignment')).toBe('top');
			expect(own.dataset.formAlignmentInherited).toBeUndefined();
		});

		it('past inherited children aan wanneer parent label-alignment wijzigt', async () => {
			el = await fixture(`
				<nldd-form label-alignment="right">
					<nldd-form-field label="A"></nldd-form-field>
				</nldd-form>
			`);
			await waitForUpdate(el);

			const field = el.querySelector('nldd-form-field') as HTMLElement;
			expect(field.getAttribute('label-alignment')).toBe('right');

			el.setAttribute('label-alignment', 'left');
			await waitForUpdate(el);

			expect(field.getAttribute('label-alignment')).toBe('left');
			expect(field.dataset.formAlignmentInherited).toBe('true');
		});

		it('verwijdert inherited attribuut wanneer parent label-alignment leegmaakt', async () => {
			el = await fixture(`
				<nldd-form label-alignment="right">
					<nldd-form-field label="A"></nldd-form-field>
					<nldd-form-field label="Own" label-alignment="top"></nldd-form-field>
				</nldd-form>
			`);
			await waitForUpdate(el);

			const inherits = el.querySelector('nldd-form-field[label="A"]') as HTMLElement;
			const own = el.querySelector('nldd-form-field[label="Own"]') as HTMLElement;

			el.removeAttribute('label-alignment');
			await waitForUpdate(el);

			// Inherited child verliest 't attribute en de marker
			expect(inherits.hasAttribute('label-alignment')).toBe(false);
			expect(inherits.dataset.formAlignmentInherited).toBeUndefined();

			// Eigen waarde blijft staan
			expect(own.getAttribute('label-alignment')).toBe('top');
		});

		it('propageert ook naar later toegevoegde form-field children', async () => {
			el = await fixture('<nldd-form label-alignment="right"></nldd-form>');
			await waitForUpdate(el);

			const field = document.createElement('nldd-form-field');
			field.setAttribute('label', 'Late');
			el.appendChild(field);

			// MutationObserver runs async — wait a microtask
			await new Promise(resolve => setTimeout(resolve, 0));

			expect(field.getAttribute('label-alignment')).toBe('right');
			expect(field.dataset.formAlignmentInherited).toBe('true');
		});

		it('markert niets als inherited als parent geen label-alignment heeft', async () => {
			el = await fixture(`
				<nldd-form>
					<nldd-form-field label="A"></nldd-form-field>
				</nldd-form>
			`);
			await waitForUpdate(el);

			const field = el.querySelector('nldd-form-field') as HTMLElement;
			// Field reflect z'n eigen default ('top'), maar het is NIET vanuit
			// form gepropageerd — geen inherited marker
			expect(field.dataset.formAlignmentInherited).toBeUndefined();
		});
	});
});
