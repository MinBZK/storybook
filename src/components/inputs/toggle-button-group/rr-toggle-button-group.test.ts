import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRToggleButtonGroup } from './rr-toggle-button-group.ts';
import type { RRToggleButton } from '../toggle-button/rr-toggle-button.ts';
import './rr-toggle-button-group.ts';
import '../toggle-button/rr-toggle-button.ts';


/* ============================================================
   Rendering
   ============================================================ */

describe('rr-toggle-button-group', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-toggle-button-group></rr-toggle-button-group>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('has role=group by default (type=checkbox)', async () => {
		el = await fixture('<rr-toggle-button-group type="checkbox"></rr-toggle-button-group>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('group');
	});

	it('has role=radiogroup for type=radio', async () => {
		el = await fixture('<rr-toggle-button-group type="radio"></rr-toggle-button-group>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('radiogroup');
	});

	it('has role=toolbar for type=button', async () => {
		el = await fixture('<rr-toggle-button-group type="button"></rr-toggle-button-group>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('toolbar');
	});

	it('has role=toolbar for type=button', async () => {
		el = await fixture('<rr-toggle-button-group type="button"></rr-toggle-button-group>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('toolbar');
	});
});


/* ============================================================
   Synchronisatie
   ============================================================ */

describe('rr-toggle-button-group – synchronisatie', () => {
	let el: RRToggleButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('does not sync name to child buttons when type=button', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="button" name="toolbar">
				<rr-toggle-button value="bold">Bold</rr-toggle-button>
				<rr-toggle-button value="italic">Italic</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		buttons.forEach(b => expect(b.name).toBe(''));
	});

	it('syncs type to child buttons', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="radio">
				<rr-toggle-button value="a">A</rr-toggle-button>
				<rr-toggle-button value="b">B</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		buttons.forEach(b => expect(b.type).toBe('radio'));
	});

	it('syncs name to child buttons', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="radio" name="keuze">
				<rr-toggle-button value="a">A</rr-toggle-button>
				<rr-toggle-button value="b">B</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		buttons.forEach(b => expect(b.name).toBe('keuze'));
	});

	it('syncs size to child buttons', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group size="sm">
				<rr-toggle-button value="a">A</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		const button = el.querySelector<RRToggleButton>('rr-toggle-button')!;
		expect(button.size).toBe('sm');
	});

	it('disables child buttons when group is disabled', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group disabled>
				<rr-toggle-button value="a">A</rr-toggle-button>
				<rr-toggle-button value="b">B</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		buttons.forEach(b => expect(b.disabled).toBe(true));
	});

	it('re-enables group-disabled buttons when group disabled is removed', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group disabled>
				<rr-toggle-button value="a">A</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.disabled = false;
		await waitForUpdate(el);

		const button = el.querySelector<RRToggleButton>('rr-toggle-button')!;
		expect(button.disabled).toBe(false);
	});

	it('does not re-enable buttons that were individually disabled', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group disabled>
				<rr-toggle-button value="a" disabled>A</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.disabled = false;
		await waitForUpdate(el);

		const button = el.querySelector<RRToggleButton>('rr-toggle-button')!;
		expect(button.disabled).toBe(true);
	});

	it('syncs buttons added after initial render', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="radio" name="laat">
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		const button = document.createElement('rr-toggle-button') as RRToggleButton;
		button.textContent = 'Laat toegevoegd';
		el.appendChild(button);
		await waitForUpdate(el);

		expect(button.type).toBe('radio');
		expect(button.name).toBe('laat');
	});
});


/* ============================================================
   Single-select (radio)
   ============================================================ */

describe('rr-toggle-button-group – single-select (radio)', () => {
	let el: RRToggleButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('deselects other buttons when one is selected via change event', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="radio" name="keuze">
				<rr-toggle-button value="a" selected>A</rr-toggle-button>
				<rr-toggle-button value="b">B</rr-toggle-button>
				<rr-toggle-button value="c">C</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		const [buttonA, buttonB] = el.querySelectorAll<RRToggleButton>('rr-toggle-button');

		buttonB.selected = true;
		buttonB.dispatchEvent(new CustomEvent('change', {
			detail: { selected: true, value: 'b' },
			bubbles: true,
		}));
		await waitForUpdate(el);

		expect(buttonA.selected).toBe(false);
		expect(buttonB.selected).toBe(true);
	});

	it('does not deselect others when a deselection event fires', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="radio" name="keuze">
				<rr-toggle-button value="a" selected>A</rr-toggle-button>
				<rr-toggle-button value="b" selected>B</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		const [buttonA, buttonB] = el.querySelectorAll<RRToggleButton>('rr-toggle-button');

		buttonA.selected = false;
		buttonA.dispatchEvent(new CustomEvent('change', {
			detail: { selected: false, value: 'a' },
			bubbles: true,
		}));
		await waitForUpdate(el);

		expect(buttonB.selected).toBe(true);
	});
});


/* ============================================================
   Multi-select (checkbox)
   ============================================================ */

describe('rr-toggle-button-group – multi-select (checkbox)', () => {
	let el: RRToggleButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('allows multiple buttons to be selected simultaneously', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="checkbox" name="filter">
				<rr-toggle-button value="a" selected>A</rr-toggle-button>
				<rr-toggle-button value="b" selected>B</rr-toggle-button>
				<rr-toggle-button value="c">C</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		expect(buttons[0].selected).toBe(true);
		expect(buttons[1].selected).toBe(true);
		expect(buttons[2].selected).toBe(false);
	});

	it('does not deselect other buttons on change', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="checkbox" name="filter">
				<rr-toggle-button value="a" selected>A</rr-toggle-button>
				<rr-toggle-button value="b">B</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		const [buttonA, buttonB] = el.querySelectorAll<RRToggleButton>('rr-toggle-button');

		buttonB.selected = true;
		buttonB.dispatchEvent(new CustomEvent('change', {
			detail: { selected: true, value: 'b' },
			bubbles: true,
		}));
		await waitForUpdate(el);

		expect(buttonA.selected).toBe(true);
		expect(buttonB.selected).toBe(true);
	});
});


/* ============================================================
   Toetsenbordnavigatie (radio)
   ============================================================ */

describe('rr-toggle-button-group – toetsenbordnavigatie', () => {
	let el: RRToggleButtonGroup;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('ArrowRight selects first button when nothing is selected', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="radio" name="nav">
				<rr-toggle-button value="a">A</rr-toggle-button>
				<rr-toggle-button value="b">B</rr-toggle-button>
				<rr-toggle-button value="c">C</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		expect(buttons[0].selected).toBe(true);
	});

	it('ArrowRight selects next button', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="radio" name="nav">
				<rr-toggle-button value="a" selected>A</rr-toggle-button>
				<rr-toggle-button value="b">B</rr-toggle-button>
				<rr-toggle-button value="c">C</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		expect(buttons[0].selected).toBe(false);
		expect(buttons[1].selected).toBe(true);
	});

	it('ArrowLeft selects previous button', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="radio" name="nav">
				<rr-toggle-button value="a">A</rr-toggle-button>
				<rr-toggle-button value="b" selected>B</rr-toggle-button>
				<rr-toggle-button value="c">C</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		expect(buttons[0].selected).toBe(true);
		expect(buttons[1].selected).toBe(false);
	});

	it('wraps around from last to first', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="radio" name="nav">
				<rr-toggle-button value="a">A</rr-toggle-button>
				<rr-toggle-button value="b">B</rr-toggle-button>
				<rr-toggle-button value="c" selected>C</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		expect(buttons[0].selected).toBe(true);
		expect(buttons[2].selected).toBe(false);
	});

	it('wraps around from first to last', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="radio" name="nav">
				<rr-toggle-button value="a" selected>A</rr-toggle-button>
				<rr-toggle-button value="b">B</rr-toggle-button>
				<rr-toggle-button value="c">C</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		expect(buttons[0].selected).toBe(false);
		expect(buttons[2].selected).toBe(true);
	});

	it('skips disabled buttons during keyboard navigation', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="radio" name="nav">
				<rr-toggle-button value="a" selected>A</rr-toggle-button>
				<rr-toggle-button value="b" disabled>B</rr-toggle-button>
				<rr-toggle-button value="c">C</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		expect(buttons[2].selected).toBe(true);
	});

	it('does not handle arrow keys for type=checkbox', async () => {
		el = await fixture<RRToggleButtonGroup>(`
			<rr-toggle-button-group type="checkbox" name="filter">
				<rr-toggle-button value="a" selected>A</rr-toggle-button>
				<rr-toggle-button value="b">B</rr-toggle-button>
			</rr-toggle-button-group>
		`);
		await waitForUpdate(el);

		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
		await waitForUpdate(el);

		const buttons = el.querySelectorAll<RRToggleButton>('rr-toggle-button');
		expect(buttons[0].selected).toBe(true);
		expect(buttons[1].selected).toBe(false);
	});
});
