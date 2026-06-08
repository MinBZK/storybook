import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './split-button.js';
import '../../actions/menu/menu.js';

describe('nldd-split-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-split-button></nldd-split-button>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});

	it('without a slotted menu, chevron click dispatches menu-click', async () => {
		el = await fixture('<nldd-split-button text="Opslaan"></nldd-split-button>');
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('menu-click', () => { fired = true; });

		const trigger = el.shadowRoot!.querySelector<HTMLElement>('.split-button__popup-button nldd-icon-button')!;
		trigger.click();
		await waitForUpdate(el);

		expect(fired).toBe(true);
	});

	it('with a slotted nldd-menu, chevron click opens it instead of firing menu-click', async () => {
		el = await fixture(`
			<nldd-split-button text="Opslaan">
				<nldd-menu>
					<nldd-menu-item text="Opslaan als…"></nldd-menu-item>
					<nldd-menu-item text="Verwijderen"></nldd-menu-item>
				</nldd-menu>
			</nldd-split-button>
		`);
		await waitForUpdate(el);

		let menuClickFired = false;
		el.addEventListener('menu-click', () => { menuClickFired = true; });

		const menu = el.querySelector<HTMLElement>('nldd-menu')!;
		const trigger = el.shadowRoot!.querySelector<HTMLElement>('.split-button__popup-button nldd-icon-button')!;
		trigger.click();
		await waitForUpdate(el);

		expect(menuClickFired).toBe(false);
		expect(menu.matches(':popover-open')).toBe(true);
	});

	it('keeps the slotted menu and its items in the light DOM (no moving)', async () => {
		el = await fixture(`
			<nldd-split-button text="Opslaan">
				<nldd-menu>
					<nldd-menu-item text="A"></nldd-menu-item>
					<nldd-menu-item text="B"></nldd-menu-item>
				</nldd-menu>
			</nldd-split-button>
		`);
		await waitForUpdate(el);

		const menu = el.querySelector('nldd-menu')!;
		expect(menu.querySelectorAll('nldd-menu-item').length).toBe(2);
		// Nothing is moved into the split-button's shadow DOM.
		expect(el.shadowRoot!.querySelector('nldd-menu')).toBeNull();
	});

	it('wires an nldd-menu added after first render', async () => {
		el = await fixture('<nldd-split-button text="Opslaan"></nldd-split-button>');
		await waitForUpdate(el);

		const menu = document.createElement('nldd-menu');
		const item = document.createElement('nldd-menu-item');
		item.setAttribute('text', 'Later');
		menu.appendChild(item);
		el.appendChild(menu);
		await waitForUpdate(el);

		// The wired menu and its item stay in the split-button's light DOM
		// (the architecture pierces shadow boundaries instead of moving nodes).
		expect(el.querySelector('nldd-menu nldd-menu-item')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('nldd-menu')).toBeNull();

		let menuClickFired = false;
		el.addEventListener('menu-click', () => { menuClickFired = true; });
		const trigger = el.shadowRoot!.querySelector<HTMLElement>('.split-button__popup-button nldd-icon-button')!;
		trigger.click();
		await waitForUpdate(el);

		expect(menuClickFired).toBe(false);
		expect(menu.matches(':popover-open')).toBe(true);
	});
});
