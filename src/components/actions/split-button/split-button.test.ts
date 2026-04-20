import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './split-button.js';
import '../../lists-and-menus/menu/menu.js';

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

	it('without slotted items, chevron click dispatches menu-click', async () => {
		el = await fixture('<nldd-split-button text="Opslaan"></nldd-split-button>');
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('menu-click', () => { fired = true; });

		const trigger = el.shadowRoot!.querySelector<HTMLElement>('.split-button__trigger')!;
		trigger.click();
		await waitForUpdate(el);

		expect(fired).toBe(true);
	});

	it('with slotted items, chevron click opens the internal menu instead of firing menu-click', async () => {
		el = await fixture(`
			<nldd-split-button text="Opslaan">
				<nldd-menu-item text="Opslaan als…"></nldd-menu-item>
				<nldd-menu-item text="Verwijderen"></nldd-menu-item>
			</nldd-split-button>
		`);
		await waitForUpdate(el);

		let menuClickFired = false;
		el.addEventListener('menu-click', () => { menuClickFired = true; });

		const menu = el.shadowRoot!.querySelector<HTMLElement>('.split-button__menu')!;
		const trigger = el.shadowRoot!.querySelector<HTMLElement>('.split-button__trigger')!;
		trigger.click();
		await waitForUpdate(el);

		expect(menuClickFired).toBe(false);
		expect(menu.matches(':popover-open')).toBe(true);
	});

	it('moves slotted menu-items into the internal menu', async () => {
		el = await fixture(`
			<nldd-split-button text="Opslaan">
				<nldd-menu-item text="A"></nldd-menu-item>
				<nldd-menu-item text="B"></nldd-menu-item>
			</nldd-split-button>
		`);
		await waitForUpdate(el);

		const menu = el.shadowRoot!.querySelector<HTMLElement>('.split-button__menu')!;
		expect(menu.querySelectorAll('nldd-menu-item').length).toBe(2);
		expect(el.querySelectorAll(':scope > nldd-menu-item').length).toBe(0);
	});
});
