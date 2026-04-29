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
		expect(el.getAttribute('aria-modal')).toBe('false');
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

			// Tab vooruit op laatste focusable → popover sluit
			const tabEvent = new KeyboardEvent('keydown', {
				key: 'Tab',
				bubbles: true,
				cancelable: true,
			});
			popover.dispatchEvent(tabEvent);
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
			});
			popover.dispatchEvent(tabEvent);
			await waitForUpdate(popover);

			expect(popover.open).toBe(false);
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
			wrapper.querySelector<HTMLButtonElement>('#middle-btn-2')!.focus();
			const tabEvent = new KeyboardEvent('keydown', {
				key: 'Tab',
				bubbles: true,
				cancelable: true,
			});
			popover.dispatchEvent(tabEvent);
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
});
