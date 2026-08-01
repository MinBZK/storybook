import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './popover.js';
import type { NLDDPopover } from './popover.js';

describe('nldd-popover', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-popover accessible-label="Test"></nldd-popover>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('zet popover, role en tabindex attributen op de host', async () => {
		el = await fixture('<nldd-popover accessible-label="Test"></nldd-popover>');
		await waitForUpdate(el);
		expect(el.getAttribute('popover')).toBe('');
		expect(el.getAttribute('role')).toBe('dialog');
		// aria-modal: niet expliciet gezet — default voor role="dialog" is
		// false en explicit duplication voegt geen waarde toe.
		expect(el.hasAttribute('aria-modal')).toBe(false);
		expect(el.getAttribute('tabindex')).toBe('-1');
	});

	it('zet aria-label op basis van accessible-label', async () => {
		el = await fixture('<nldd-popover accessible-label="Mijn popover"></nldd-popover>');
		await waitForUpdate(el);
		expect(el.getAttribute('aria-label')).toBe('Mijn popover');
	});

	it('show() opent en zet open=true; hide() sluit', async () => {
		const wrapper = await fixture(`
			<div>
				<button id="trigger-show">Trigger</button>
				<nldd-popover anchor="trigger-show" accessible-label="Test"></nldd-popover>
			</div>
		`);
		el = wrapper;
		const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
		await waitForUpdate(popover);

		popover.show();
		await waitForUpdate(popover);
		expect(popover.open).toBe(true);

		popover.hide();
		await waitForUpdate(popover);
		expect(popover.open).toBe(false);
	});

	it('toggle() wisselt staat', async () => {
		const wrapper = await fixture(`
			<div>
				<button id="trigger-toggle">Trigger</button>
				<nldd-popover anchor="trigger-toggle" accessible-label="Test"></nldd-popover>
			</div>
		`);
		el = wrapper;
		const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
		await waitForUpdate(popover);

		popover.toggle();
		await waitForUpdate(popover);
		expect(popover.open).toBe(true);

		popover.toggle();
		await waitForUpdate(popover);
		expect(popover.open).toBe(false);
	});

	it('vuurt open en close events', async () => {
		const wrapper = await fixture(`
			<div>
				<button id="trigger-events">Trigger</button>
				<nldd-popover anchor="trigger-events" accessible-label="Test"></nldd-popover>
			</div>
		`);
		el = wrapper;
		const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
		await waitForUpdate(popover);

		const opened = vi.fn();
		const closed = vi.fn();
		popover.addEventListener('open', opened);
		popover.addEventListener('close', closed);

		popover.show();
		await waitForUpdate(popover);
		expect(opened).toHaveBeenCalledTimes(1);

		popover.hide();
		await waitForUpdate(popover);
		expect(closed).toHaveBeenCalledTimes(1);
	});

	it('initialiseert aria-expanded en aria-haspopup op de anchor bij connect', async () => {
		// SR moet de trigger als toggle-control aankondigen vanaf de eerste
		// render — niet pas na de eerste open.
		const wrapper = await fixture(`
			<div>
				<button id="trigger-init-aria">Trigger</button>
				<nldd-popover anchor="trigger-init-aria" accessible-label="Test"></nldd-popover>
			</div>
		`);
		el = wrapper;
		const trigger = wrapper.querySelector('#trigger-init-aria')!;
		// Wacht tot de gedeferred microtask in connectedCallback heeft gelopen
		await new Promise(resolve => setTimeout(resolve, 0));
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
		expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
	});

	it('update aria-expanded en aria-haspopup op de anchor', async () => {
		const wrapper = await fixture(`
			<div>
				<button id="trigger-aria">Trigger</button>
				<nldd-popover anchor="trigger-aria" accessible-label="Test"></nldd-popover>
			</div>
		`);
		el = wrapper;
		const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
		const trigger = wrapper.querySelector('#trigger-aria')!;
		await waitForUpdate(popover);

		popover.show();
		await waitForUpdate(popover);
		expect(trigger.getAttribute('aria-expanded')).toBe('true');
		expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');

		popover.hide();
		await waitForUpdate(popover);
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
	});

	it('warnt en doet niets als anchor niet gevonden wordt', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture('<nldd-popover anchor="non-existent" accessible-label="Test"></nldd-popover>');
		await waitForUpdate(el);

		(el as NLDDPopover).show();
		await waitForUpdate(el);

		expect(warn).toHaveBeenCalled();
		expect((el as NLDDPopover).open).toBe(false);
		warn.mockRestore();
	});

	it('anchorElement property heeft voorrang op anchor attribuut', async () => {
		const wrapper = await fixture(`
			<div>
				<button id="anchor-by-id">By ID</button>
				<button id="anchor-by-prop">By prop</button>
				<nldd-popover anchor="anchor-by-id" accessible-label="Test"></nldd-popover>
			</div>
		`);
		el = wrapper;
		const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
		const propAnchor = wrapper.querySelector('#anchor-by-prop')!;
		popover.anchorElement = propAnchor;
		await waitForUpdate(popover);

		popover.show();
		await waitForUpdate(popover);

		expect(propAnchor.getAttribute('aria-expanded')).toBe('true');
		expect(wrapper.querySelector('#anchor-by-id')!.hasAttribute('aria-expanded')).toBe(false);
	});

	it('disconnect strip alle aria-* van anchor (geen stale state in SPA flows)', async () => {
		// Regression: in SPA-patterns (v-if, React conditional render) kan
		// de popover verdwijnen terwijl de anchor blijft. Een achtergebleven
		// aria-controls naar een niet-bestaand element is een WCAG 4.1.2 fout.
		const wrapper = await fixture(`
			<div>
				<button id="trigger-disconnect">Trigger</button>
				<nldd-popover anchor="trigger-disconnect" id="disconnect-popover" accessible-label="Test"></nldd-popover>
			</div>
		`);
		el = wrapper;
		const trigger = wrapper.querySelector('#trigger-disconnect')!;
		const popover = wrapper.querySelector('nldd-popover')!;
		// Wacht tot de gedeferred init-aria call gelopen is
		await new Promise(resolve => setTimeout(resolve, 0));
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
		expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
		expect(trigger.getAttribute('aria-controls')).toBe('disconnect-popover');

		// Verwijder popover uit DOM (bv. v-if false)
		popover.remove();

		// Anchor mag geen achtergebleven aria-* hebben
		expect(trigger.hasAttribute('aria-expanded')).toBe(false);
		expect(trigger.hasAttribute('aria-haspopup')).toBe(false);
		expect(trigger.hasAttribute('aria-controls')).toBe(false);
	});

	it('updated() reageert op anchor-wissel zelfs als popover gesloten is', async () => {
		// Regression: voorheen werd _updateAnchorAria niet aangeroepen
		// wanneer anchor of anchorElement runtime veranderde terwijl de
		// popover gesloten was — de oude trigger hield stale aria-expanded
		// en aria-controls.
		const wrapper = await fixture(`
			<div>
				<button id="initial-anchor">Initial</button>
				<button id="new-anchor">New</button>
				<nldd-popover anchor="initial-anchor" id="my-popover" accessible-label="Test"></nldd-popover>
			</div>
		`);
		el = wrapper;
		const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
		const initial = wrapper.querySelector('#initial-anchor')!;
		const newAnchor = wrapper.querySelector('#new-anchor')!;
		// Wacht tot de gedeferred init-aria call is gelopen
		await new Promise(resolve => setTimeout(resolve, 0));
		expect(initial.getAttribute('aria-expanded')).toBe('false');
		expect(initial.getAttribute('aria-controls')).toBe('my-popover');

		// Wijzig de anchor terwijl popover gesloten is
		popover.setAttribute('anchor', 'new-anchor');
		await waitForUpdate(popover);

		// Oude anchor: aria-expanded en aria-controls weg
		expect(initial.hasAttribute('aria-expanded')).toBe(false);
		expect(initial.hasAttribute('aria-controls')).toBe(false);
		// Nieuwe anchor: aria-expanded = false (gesloten), aria-controls gezet
		expect(newAnchor.getAttribute('aria-expanded')).toBe('false');
		expect(newAnchor.getAttribute('aria-controls')).toBe('my-popover');
	});


	describe('focus management & keyboard navigation', () => {
		it('zet focus terug op de anchor na hide()', async () => {
			const wrapper = await fixture(`
				<div>
					<button id="trigger-return-focus">Trigger</button>
					<nldd-popover anchor="trigger-return-focus" accessible-label="Test"></nldd-popover>
				</div>
			`);
			el = wrapper;
			const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
			const trigger = wrapper.querySelector<HTMLButtonElement>('#trigger-return-focus')!;
			await waitForUpdate(popover);

			// Focus de trigger zodat _previousFocus 'm onthoudt bij open
			trigger.focus();
			expect(document.activeElement).toBe(trigger);

			popover.show();
			await waitForUpdate(popover);

			popover.hide();
			await waitForUpdate(popover);

			expect(document.activeElement).toBe(trigger);
		});

		it('Tab op laatste focusable sluit de popover', async () => {
			const wrapper = await fixture(`
				<div>
					<button id="trigger-tab-out">Trigger</button>
					<nldd-popover anchor="trigger-tab-out" accessible-label="Test">
						<button id="popover-btn-1">Eerste</button>
						<button id="popover-btn-2">Laatste</button>
					</nldd-popover>
				</div>
			`);
			el = wrapper;
			const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
			await waitForUpdate(popover);

			popover.show();
			await waitForUpdate(popover);
			expect(popover.open).toBe(true);

			const last = wrapper.querySelector<HTMLButtonElement>('#popover-btn-2')!;
			last.focus();

			// Tab vooruit op laatste focusable → popover sluit. Dispatch op
			// het gefocuste element zodat composedPath()[0] de button is
			// (matcht hoe een echte browser het event aflevert).
			const tabEvent = new KeyboardEvent('keydown', {
				key: 'Tab',
				bubbles: true,
				cancelable: true,
				composed: true,
			});
			last.dispatchEvent(tabEvent);
			await waitForUpdate(popover);

			expect(popover.open).toBe(false);
		});

		it('Shift+Tab op eerste focusable sluit de popover', async () => {
			const wrapper = await fixture(`
				<div>
					<button id="trigger-shift-tab">Trigger</button>
					<nldd-popover anchor="trigger-shift-tab" accessible-label="Test">
						<button id="popover-btn-first">Eerste</button>
						<button id="popover-btn-second">Tweede</button>
					</nldd-popover>
				</div>
			`);
			el = wrapper;
			const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
			await waitForUpdate(popover);

			popover.show();
			await waitForUpdate(popover);

			const first = wrapper.querySelector<HTMLButtonElement>('#popover-btn-first')!;
			first.focus();

			const tabEvent = new KeyboardEvent('keydown', {
				key: 'Tab',
				shiftKey: true,
				bubbles: true,
				cancelable: true,
				composed: true,
			});
			first.dispatchEvent(tabEvent);
			await waitForUpdate(popover);

			expect(popover.open).toBe(false);
		});

		it('Shift+Tab vanuit shadow-DOM custom element sluit niet wanneer er een focusable vóór staat', async () => {
			// Regression: voorheen gaf document.activeElement de host (custom
			// element) terug i.p.v. het interne <button>. indexOf gaf -1, en
			// (-1 <= 0) === true, wat Shift-Tab altijd liet sluiten — ook
			// midden in de popover. Test simuleert een nldd-button-achtige
			// custom element met een interne button.
			class TestCustomBtn extends HTMLElement {
				static observedAttributes = [];
				constructor() {
					super();
					const sr = this.attachShadow({ mode: 'open' });
					sr.innerHTML = '<button class="inner">slot</button>';
				}
			}
			if (!customElements.get('test-custom-btn')) {
				customElements.define('test-custom-btn', TestCustomBtn);
			}

			const wrapper = await fixture(`
				<div>
					<button id="trigger-shadow-shift">Trigger</button>
					<nldd-popover anchor="trigger-shadow-shift" accessible-label="Test">
						<button id="first-light">First</button>
						<test-custom-btn id="second-shadow"></test-custom-btn>
					</nldd-popover>
				</div>
			`);
			el = wrapper;
			const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
			await waitForUpdate(popover);

			popover.show();
			await waitForUpdate(popover);

			// Focus het interne button van de custom element (positie 2)
			const customBtn = wrapper.querySelector('#second-shadow') as HTMLElement;
			const innerBtn = customBtn.shadowRoot!.querySelector('.inner') as HTMLButtonElement;
			innerBtn.focus();

			// Shift-Tab vanaf positie 2 moet NIET sluiten — er staat nog een
			// focusable vóór (de light-DOM button op positie 1).
			const tabEvent = new KeyboardEvent('keydown', {
				key: 'Tab',
				shiftKey: true,
				bubbles: true,
				cancelable: true,
				composed: true,
			});
			innerBtn.dispatchEvent(tabEvent);
			await waitForUpdate(popover);

			expect(popover.open).toBe(true);
		});

		it('Tab in het midden van de popover sluit niet', async () => {
			const wrapper = await fixture(`
				<div>
					<button id="trigger-middle-tab">Trigger</button>
					<nldd-popover anchor="trigger-middle-tab" accessible-label="Test">
						<button id="middle-btn-1">A</button>
						<button id="middle-btn-2">B</button>
						<button id="middle-btn-3">C</button>
					</nldd-popover>
				</div>
			`);
			el = wrapper;
			const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
			await waitForUpdate(popover);

			popover.show();
			await waitForUpdate(popover);

			// Focus op middelste — Tab moet niet sluiten
			const middle = wrapper.querySelector<HTMLButtonElement>('#middle-btn-2')!;
			middle.focus();
			const tabEvent = new KeyboardEvent('keydown', {
				key: 'Tab',
				bubbles: true,
				cancelable: true,
				composed: true,
			});
			middle.dispatchEvent(tabEvent);
			await waitForUpdate(popover);

			expect(popover.open).toBe(true);
		});

		it('zet is-pointer-focus class wanneer geopend met de muis', async () => {
			const wrapper = await fixture(`
				<div>
					<button id="trigger-pointer">Trigger</button>
					<nldd-popover anchor="trigger-pointer" accessible-label="Test"></nldd-popover>
				</div>
			`);
			el = wrapper;
			const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
			await waitForUpdate(popover);

			// Markeer de input-modality als 'mouse' — listener zit op document
			// (vorige Tab-tests zetten modality op 'keyboard', dus een expliciete
			// pointerdown is nodig om 'm te resetten).
			document.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'mouse', bubbles: true }));

			popover.show();
			await waitForUpdate(popover);

			expect(popover.classList.contains('is-pointer-focus')).toBe(true);
		});

		it('focust [autofocus] element binnen de popover als aanwezig', async () => {
			const wrapper = await fixture(`
				<div>
					<button id="trigger-autofocus">Trigger</button>
					<nldd-popover anchor="trigger-autofocus" accessible-label="Test">
						<button id="not-auto">Niet</button>
						<button id="auto-target" autofocus>Wel</button>
					</nldd-popover>
				</div>
			`);
			el = wrapper;
			const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
			await waitForUpdate(popover);

			popover.show();
			await waitForUpdate(popover);

			const autoTarget = wrapper.querySelector('#auto-target');
			expect(document.activeElement).toBe(autoTarget);
		});

		it('focust de popover-host zelf als er geen [autofocus] is', async () => {
			const wrapper = await fixture(`
				<div>
					<button id="trigger-host-focus">Trigger</button>
					<nldd-popover anchor="trigger-host-focus" accessible-label="Test">
						<p>Geen focusable</p>
					</nldd-popover>
				</div>
			`);
			el = wrapper;
			const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
			await waitForUpdate(popover);

			popover.show();
			await waitForUpdate(popover);

			expect(document.activeElement).toBe(popover);
		});
	});


	describe('position overrides (centered + edge attrs)', () => {
		// Force md/lg viewport so the sm bottom-sheet branch isn't taken.
		// reposition() reads `_smQuery.matches`, which we override to false.
		function asMd(popover: NLDDPopover) {
			(popover as unknown as { _smQuery: MediaQueryList })._smQuery = {
				matches: false,
				addEventListener: () => {},
				removeEventListener: () => {},
			} as unknown as MediaQueryList;
		}

		it('centered=true centreert beide assen via translate(-50%, -50%)', async () => {
			const wrapper = await fixture(`
				<div>
					<button id="trigger-centered">Trigger</button>
					<nldd-popover anchor="trigger-centered" accessible-label="Test" centered></nldd-popover>
				</div>
			`);
			el = wrapper;
			const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
			asMd(popover);
			await waitForUpdate(popover);

			popover.show();
			await waitForUpdate(popover);

			expect(popover.style.top).toBe('50%');
			expect(popover.style.left).toBe('50%');
			expect(popover.style.transform).toContain('-50%');
			expect(popover.style.transform).toContain(', -50%');
		});

		it('centered + top="0" → horizontaal gecentreerd, top-aligned', async () => {
			const wrapper = await fixture(`
				<div>
					<button id="trigger-centered-top">Trigger</button>
					<nldd-popover anchor="trigger-centered-top" accessible-label="Test" centered top="0"></nldd-popover>
				</div>
			`);
			el = wrapper;
			const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
			asMd(popover);
			await waitForUpdate(popover);

			popover.show();
			await waitForUpdate(popover);

			expect(popover.style.top).toBe('0px');
			expect(popover.style.left).toBe('50%');
			// Y-as gebruikt geen translate; X-as wel. (jsdom normaliseert "0" naar "0px".)
			expect(popover.style.transform).toMatch(/translate\(-50%,\s*0(px)?\)/);
		});

		it('expliciete edge attrs zonder centered worden ingeklemd', async () => {
			const wrapper = await fixture(`
				<div>
					<button id="trigger-edge">Trigger</button>
					<nldd-popover anchor="trigger-edge" accessible-label="Test" top="10px" right="20px"></nldd-popover>
				</div>
			`);
			el = wrapper;
			const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
			asMd(popover);
			await waitForUpdate(popover);

			popover.show();
			await waitForUpdate(popover);

			expect(popover.style.top).toBe('10px');
			expect(popover.style.right).toBe('20px');
			// Geen transform — geen as werd gecenterd.
			expect(popover.style.transform).toBe('');
		});

		it('sm-full-height attribuut wordt op de host gereflecteerd', async () => {
			el = await fixture('<nldd-popover accessible-label="Test" sm-full-height></nldd-popover>');
			await waitForUpdate(el);
			expect(el.hasAttribute('sm-full-height')).toBe(true);
		});

		// Een roving-tabindex-widget (grid, toolbar, tree) zet al zijn items op -1
		// behalve één. Telden die mee, dan zag tab-out nooit dat de focus aan het
		// eind stond en tabde de gebruiker de popover uit terwijl die openbleef.
		it('telt alleen echt tabbare elementen, geen tabindex="-1"', async () => {
			el = await fixture(`
				<nldd-popover accessible-label="Test">
					<button id="een">Een</button>
					<button id="rovend" tabindex="-1">Overgeslagen</button>
					<button id="twee">Twee</button>
				</nldd-popover>
			`);
			await waitForUpdate(el);
			// Dicht is de popover display:none en filtert de zichtbaarheidscheck alles weg.
			(el as HTMLElement).showPopover();
			await waitForUpdate(el);
			const focusables = (el as unknown as { _getFocusables(): HTMLElement[] })._getFocusables();
			expect(focusables.map((e) => e.id)).toEqual(['een', 'twee']);
			(el as HTMLElement).hidePopover();
		});

		it('top/left/right/bottom defaulten naar undefined — geen lege reflectie', async () => {
			el = await fixture('<nldd-popover accessible-label="Test"></nldd-popover>');
			await waitForUpdate(el);
			// Voorheen reflecteerde Lit een lege string als top="" enzovoort op
			// elke popover. Met undefined-default mag het attribuut afwezig zijn.
			expect(el.hasAttribute('top')).toBe(false);
			expect(el.hasAttribute('left')).toBe(false);
			expect(el.hasAttribute('right')).toBe(false);
			expect(el.hasAttribute('bottom')).toBe(false);
		});
	});
});

describe('nldd-popover verplaatst focus zelf met Tab', () => {
	let elTab: HTMLElement;

	afterEach(() => {
		if (elTab) cleanup(elTab);
	});

	// We verplaatsen focus nu zelf, dus we zijn ook de tab-volgorde verschuldigd:
	// een positieve tabindex dringt voor. Zonder sorteren liep het op DOM-volgorde.
	it('respecteert een positieve tabindex boven documentvolgorde', async () => {
		const wrapper = await fixture(`
			<div>
				<button id="pos-trigger">Open</button>
				<nldd-popover anchor="pos-trigger" accessible-label="Test">
					<button id="eerst-in-dom" tabindex="2">A</button>
					<button id="laatst-in-dom" tabindex="1">B</button>
				</nldd-popover>
			</div>
		`);
		elTab = wrapper;
		const popover = wrapper.querySelector('nldd-popover') as NLDDPopover & { show(): void };
		await waitForUpdate(popover);
		popover.show();
		await waitForUpdate(popover);
		// tabindex 1 komt vóór tabindex 2, ook al staat B later in de DOM.
		popover.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true, cancelable: true }));
		await waitForUpdate(popover);
		expect(document.activeElement?.id).toBe('laatst-in-dom');
	});

	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	async function metTweeKnoppen() {
		const wrapper = await fixture(`
			<div>
				<button id="trigger-tab">Open</button>
				<nldd-popover anchor="trigger-tab" accessible-label="Test">
					<button id="een">Een</button>
					<button id="twee">Twee</button>
				</nldd-popover>
			</div>
		`);
		const popover = wrapper.querySelector('nldd-popover') as HTMLElement & { show(): void };
		await waitForUpdate(popover);
		popover.show();
		await waitForUpdate(popover);
		return { wrapper, popover };
	}

	// Safari tabt niet de top layer in: met de container gefocust slaat hij de hele
	// popover over en landt op wat erna in het document staat. Onze lijst klopte
	// daar wel, dus het component verplaatst focus nu zelf.
	it('stapt vanaf de container naar de eerste knop', async () => {
		const { wrapper, popover } = await metTweeKnoppen();
		el = wrapper;
		popover.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true, cancelable: true }));
		await waitForUpdate(popover);
		expect(document.activeElement?.id).toBe('een');
	});

	// Tussen elementen verplaatst de browser de focus zelf. Een focus die de
	// browser op een toetsaanslag verplaatst krijgt onvoorwaardelijk een ring;
	// een focus die wíj verplaatsen erft alleen de ringstaat van het element dat
	// je verlaat. Elke Tab onderscheppen betekende dus dat één muisklik ergens
	// een keten startte waarin geen enkele Tab-stop nog een focusring toonde.
	it('laat een Tab tussen twee knoppen aan de browser', async () => {
		const { wrapper, popover } = await metTweeKnoppen();
		el = wrapper;
		const een = wrapper.querySelector('#een') as HTMLElement;
		een.focus();
		const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true, cancelable: true });
		een.dispatchEvent(event);
		await waitForUpdate(popover);
		expect(event.defaultPrevented).toBe(false);
		expect(popover.matches(':popover-open')).toBe(true);
	});

	it('sluit pas voorbij de laatste knop', async () => {
		const { wrapper, popover } = await metTweeKnoppen();
		el = wrapper;
		const twee = wrapper.querySelector('#twee') as HTMLElement;
		twee.focus();
		twee.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true, cancelable: true }));
		await waitForUpdate(popover);
		expect(popover.matches(':popover-open')).toBe(false);
	});
});

describe('nldd-popover slikt de eerste tik op klein scherm', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	function asSm(popover: NLDDPopover) {
		(popover as unknown as { _smQuery: MediaQueryList })._smQuery = {
			matches: true,
			addEventListener: () => {},
			removeEventListener: () => {},
		} as unknown as MediaQueryList;
	}

	async function openOnSm() {
		const wrapper = await fixture(`
			<div>
				<button id="sm-trigger">Open</button>
				<button id="sm-target">Doel</button>
				<nldd-popover anchor="sm-trigger" accessible-label="Test"></nldd-popover>
			</div>
		`);
		const popover = wrapper.querySelector('nldd-popover') as NLDDPopover;
		asSm(popover);
		await waitForUpdate(popover);
		popover.show();
		await waitForUpdate(popover);
		return { wrapper, popover, target: wrapper.querySelector('#sm-target') as HTMLElement };
	}

	// De verduistering op klein scherm laat de tik door naar de pagina eronder,
	// dus één tik sloot de sheet én activeerde wat onder de dimming zat.
	it('sluit de popover en houdt de klik eronder tegen', async () => {
		const { wrapper, popover, target } = await openOnSm();
		el = wrapper;
		let raakt = 0;
		target.addEventListener('click', () => { raakt += 1; });

		document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
		const click = new MouseEvent('click', { bubbles: true, composed: true, cancelable: true });
		target.dispatchEvent(click);

		expect(raakt).toBe(0);
		expect(click.defaultPrevented).toBe(true);
		expect(popover.matches(':popover-open')).toBe(false);
	});

	// Een tik die een scroll of drag wordt eindigt zonder klik; de opslik-vlag mag
	// dan niet blijven staan en een latere, ongerelateerde klik afvangen. Na de
	// opgeslikte tik is de popover dicht, dus een nieuw gebaar absorbeert niet meer
	// en moet de vlag simpelweg wissen.
	it('laat een latere ongerelateerde klik met rust na een tik zonder klik', async () => {
		const { wrapper, popover, target } = await openOnSm();
		el = wrapper;
		// Alsof een eerdere tik opgeslikt is maar geen klik gaf en de popover sloot.
		(popover as unknown as { _swallowNextClick: boolean })._swallowNextClick = true;
		popover.hide();
		await waitForUpdate(popover);
		let raakt = 0;
		target.addEventListener('click', () => { raakt += 1; });
		// Een nieuw, los gebaar met een echte klik.
		document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
		const click = new MouseEvent('click', { bubbles: true, composed: true, cancelable: true });
		target.dispatchEvent(click);

		expect(raakt).toBe(1);
		expect(click.defaultPrevented).toBe(false);
	});

	// De pointerdown-route wist de vlag bij het volgende gebaar; een geannuleerd
	// gebaar (scroll of drag) geeft die pointerdown niet, dus pointercancel moet 'm
	// ook wissen - anders vangt een latere klik de opslik-vlag alsnog af.
	it('wist de opslik-vlag bij een geannuleerd gebaar', async () => {
		const { wrapper, popover, target } = await openOnSm();
		el = wrapper;
		// Alsof een tik opgeslikt is (vlag gezet, sheet dicht) en het gebaar daarna
		// een scroll wordt: de browser stuurt pointercancel in plaats van een klik.
		(popover as unknown as { _swallowNextClick: boolean })._swallowNextClick = true;
		popover.hide();
		await waitForUpdate(popover);
		document.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true, composed: true }));
		let raakt = 0;
		target.addEventListener('click', () => { raakt += 1; });
		const click = new MouseEvent('click', { bubbles: true, composed: true, cancelable: true });
		target.dispatchEvent(click);

		expect(raakt).toBe(1);
		expect(click.defaultPrevented).toBe(false);
	});
});
