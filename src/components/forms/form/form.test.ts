import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './form.js';
import '../form-field/form-field.js';
import '../form-actions/form-actions.js';
import type { NLDDForm } from './form.js';

/**
 * NLDDForm extends HTMLElement (geen Lit), dus waitForUpdate dekt z'n
 * MutationObserver-callback niet — die vuurt buiten de Lit update-cycle.
 * Use deze helper voor "wacht op pending microtasks" zodat de observer
 * heeft kunnen lopen. Niet vervangen door waitForUpdate; dat zou de
 * timing breken.
 */
const awaitMicrotask = () => new Promise(resolve => setTimeout(resolve, 0));

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

	it('forwardt enctype attribuut (multipart/form-data voor file upload)', async () => {
		el = await fixture('<nldd-form enctype="multipart/form-data"></nldd-form>');
		await waitForUpdate(el);
		const form = el.querySelector('form')!;
		expect(form.getAttribute('enctype')).toBe('multipart/form-data');
	});

	it('forwardt target attribuut', async () => {
		el = await fixture('<nldd-form target="_blank"></nldd-form>');
		await waitForUpdate(el);
		const form = el.querySelector('form')!;
		expect(form.getAttribute('target')).toBe('_blank');
	});

	it('forwardt autocomplete attribuut', async () => {
		el = await fixture('<nldd-form autocomplete="off"></nldd-form>');
		await waitForUpdate(el);
		const form = el.querySelector('form')!;
		expect(form.getAttribute('autocomplete')).toBe('off');
	});

	it('verwijdert geforwarde attributen wanneer ze van de host weggehaald worden', async () => {
		el = await fixture('<nldd-form enctype="multipart/form-data" target="_blank"></nldd-form>');
		await waitForUpdate(el);
		const form = el.querySelector('form')!;
		expect(form.getAttribute('enctype')).toBe('multipart/form-data');

		el.removeAttribute('enctype');
		await waitForUpdate(el);
		expect(form.hasAttribute('enctype')).toBe(false);
		// target blijft staan (geen impact)
		expect(form.getAttribute('target')).toBe('_blank');
	});

	it('exposeert het inner form via .form getter', async () => {
		el = await fixture('<nldd-form></nldd-form>');
		await waitForUpdate(el);
		const form = (el as NLDDForm).form;
		expect(form).toBeInstanceOf(HTMLFormElement);
	});

	it('verplaatst dynamisch toegevoegde children naar het form', async () => {
		el = await fixture('<nldd-form></nldd-form>');
		await waitForUpdate(el);

		const input = document.createElement('input');
		input.name = 'late';
		el.appendChild(input);

		// MutationObserver runs async — wait a microtask
		await awaitMicrotask();

		const form = el.querySelector('form')!;
		expect(form.querySelector('input[name="late"]')).not.toBeNull();
	});

	it('user-provided form mode: gebruikt bestaande <form> child i.p.v. nieuwe te creëren', async () => {
		// Framework-friendly mode: user wraps content in eigen <form>. Component
		// detecteert 't en neemt 't over voor attribute-mirroring zonder DOM-shuffle.
		el = await fixture(`
			<nldd-form name="user-form" novalidate>
				<form>
					<input type="text" name="email">
					<button type="submit">Save</button>
				</form>
			</nldd-form>
		`);
		await waitForUpdate(el);

		// Er moet maar één <form> zijn (de user's), niet een tweede die wij creëerden
		const forms = el.querySelectorAll('form');
		expect(forms.length).toBe(1);

		// .form getter wijst naar de user's form
		const innerForm = (el as NLDDForm).form;
		expect(innerForm).toBe(forms[0]);

		// Attributes zijn gespiegeld
		expect(innerForm!.getAttribute('name')).toBe('user-form');
		expect(innerForm!.hasAttribute('novalidate')).toBe(true);

		// Children blijven waar ze zijn (niet verplaatst)
		expect(innerForm!.querySelector('input[name="email"]')).not.toBeNull();
		expect(innerForm!.querySelector('button[type="submit"]')).not.toBeNull();
	});

	it('user-provided form mode: skipt migration voor nieuw toegevoegde direct children', async () => {
		// In user-provided mode mag een framework children OUT-of-form positioneren
		// zonder dat wij ze automatisch verhuizen.
		const wrapper = await fixture(`
			<nldd-form name="user-form">
				<form>
					<input name="initial">
				</form>
			</nldd-form>
		`);
		el = wrapper;
		await waitForUpdate(el);

		// Voeg een direct child toe aan het host (dus NAAST de form, niet erin)
		const stray = document.createElement('div');
		stray.dataset.testid = 'stray';
		el.appendChild(stray);
		await awaitMicrotask();

		// Stray blijft een direct child van host (niet in form gemigreerd)
		expect(el.querySelector(':scope > [data-testid="stray"]')).not.toBeNull();
		// Form's eigen children zijn ongewijzigd
		const innerForm = (el as NLDDForm).form!;
		expect(innerForm.children.length).toBe(1);
	});

	it('herattacht observer na disconnect/reconnect', async () => {
		const wrapper = await fixture(`
			<div>
				<div id="from"><nldd-form></nldd-form></div>
				<div id="to"></div>
			</div>
		`);
		el = wrapper;
		const form = wrapper.querySelector('nldd-form')!;
		await waitForUpdate(form);

		// Move the form to a different parent (triggers disconnect + reconnect)
		const to = wrapper.querySelector('#to')!;
		to.appendChild(form);
		await waitForUpdate(form);

		// Append a child after reconnect — observer should catch it
		const late = document.createElement('input');
		late.name = 'after-reconnect';
		form.appendChild(late);
		await awaitMicrotask();

		const innerForm = form.querySelector('form')!;
		expect(innerForm.querySelector('input[name="after-reconnect"]')).not.toBeNull();
	});


	describe('label-alignment propagation', () => {
		it('propageert label-alignment naar form-field en form-actions children als form-label-alignment', async () => {
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
				// form-label-alignment is gepropageerd; eigen label-alignment is NIET gezet
				expect(f.getAttribute('form-label-alignment')).toBe('right');
				expect(f.hasAttribute('label-alignment')).toBe(false);
			});
			expect(actions.getAttribute('form-label-alignment')).toBe('right');
			// form-actions' labelAlignment default is `undefined`, dus Lit reflectt
			// niets — eigen `label-alignment` blijft afwezig en de cascaded
			// `form-label-alignment="right"` wint zonder dat de form 'm hoeft te
			// overschrijven.
			expect(actions.hasAttribute('label-alignment')).toBe(false);
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

			// Inherited: form-label-alignment gezet, eigen label-alignment niet
			expect(inherits.getAttribute('form-label-alignment')).toBe('right');
			expect(inherits.hasAttribute('label-alignment')).toBe(false);

			// Eigen: label-alignment behouden; form-label-alignment óók aanwezig maar
			// CSS-cascade laat eigen waarde winnen via :host(:not([label-alignment])[form-label-alignment=…])
			expect(own.getAttribute('label-alignment')).toBe('top');
			expect(own.getAttribute('form-label-alignment')).toBe('right');
		});

		it('past form-label-alignment aan wanneer parent label-alignment wijzigt', async () => {
			el = await fixture(`
				<nldd-form label-alignment="right">
					<nldd-form-field label="A"></nldd-form-field>
				</nldd-form>
			`);
			await waitForUpdate(el);

			const field = el.querySelector('nldd-form-field') as HTMLElement;
			expect(field.getAttribute('form-label-alignment')).toBe('right');

			el.setAttribute('label-alignment', 'left');
			await waitForUpdate(el);

			expect(field.getAttribute('form-label-alignment')).toBe('left');
			expect(field.hasAttribute('label-alignment')).toBe(false);
		});

		it("zet form-label-alignment terug naar 'top' wanneer parent label-alignment leegmaakt", async () => {
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

			// form-label-alignment valt terug op de default 'top' (always-set)
			expect(inherits.getAttribute('form-label-alignment')).toBe('top');
			expect(own.getAttribute('form-label-alignment')).toBe('top');

			// Eigen label-alignment blijft staan op de descendant die 't zelf had
			expect(own.getAttribute('label-alignment')).toBe('top');
			// Inherits had geen eigen label-alignment, dus die heeft 'm nog steeds niet
			expect(inherits.hasAttribute('label-alignment')).toBe(false);
		});

		it('propageert ook naar later toegevoegde form-field children', async () => {
			el = await fixture('<nldd-form label-alignment="right"></nldd-form>');
			await waitForUpdate(el);

			const field = document.createElement('nldd-form-field');
			field.setAttribute('label', 'Late');
			el.appendChild(field);

			// MutationObserver runs async — wait a microtask
			await awaitMicrotask();

			expect(field.getAttribute('form-label-alignment')).toBe('right');
			expect(field.hasAttribute('label-alignment')).toBe(false);
		});

		it('propageert ook naar later toegevoegde form-actions children', async () => {
			// Form-actions reflect z'n Lit-default ='top' op label-alignment bij
			// eerste update — maar omdat we nooit aan label-alignment komen, is
			// er geen race meer. We zetten alleen form-label-alignment.
			el = await fixture('<nldd-form label-alignment="right"></nldd-form>');
			await waitForUpdate(el);

			const actions = document.createElement('nldd-form-actions');
			el.appendChild(actions);

			await waitForUpdate(actions);
			await awaitMicrotask();

			expect(actions.getAttribute('form-label-alignment')).toBe('right');
		});

		it("zet form-label-alignment='top' als default wanneer parent geen label-alignment heeft", async () => {
			el = await fixture(`
				<nldd-form>
					<nldd-form-field label="A"></nldd-form-field>
				</nldd-form>
			`);
			await waitForUpdate(el);

			const field = el.querySelector('nldd-form-field') as HTMLElement;
			// Always-set: descendants binnen nldd-form hebben altijd
			// form-label-alignment, zodat downstream CSS-selectors mogen
			// aannemen dat het attribuut aanwezig is.
			expect(field.getAttribute('form-label-alignment')).toBe('top');
		});

		it('CSS cascade: expliciete eigen label-alignment wint over geërfde via container query', async () => {
			// Container ≥ mdMin zodat de @container (min-width: 640px) regel
			// matcht en row-layout wordt toegepast bij left/right alignment.
			const wrapper = await fixture(`
				<div style="width: 800px;">
					<nldd-form label-alignment="right">
						<nldd-form-field label="Inherits"></nldd-form-field>
						<nldd-form-field label="Own" label-alignment="top"></nldd-form-field>
					</nldd-form>
				</div>
			`);
			el = wrapper;
			await waitForUpdate(wrapper.querySelector('nldd-form') as HTMLElement);

			const inherits = wrapper.querySelector('nldd-form-field[label="Inherits"]')!;
			const own = wrapper.querySelector('nldd-form-field[label="Own"]')!;

			const inheritsRoot = inherits.shadowRoot!.querySelector('.form-field')!;
			const ownRoot = own.shadowRoot!.querySelector('.form-field')!;

			// Inherits → label-alignment=right → row layout
			expect(getComputedStyle(inheritsRoot).flexDirection).toBe('row');
			// Own (label-alignment=top) → kolom-layout, niet overschreven door
			// container query op de parent's right-alignment
			expect(getComputedStyle(ownRoot).flexDirection).toBe('column');
		});
	});
});
