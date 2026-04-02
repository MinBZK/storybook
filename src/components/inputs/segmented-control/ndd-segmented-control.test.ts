import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDSegmentedControl, NDDSegmentedControlItem } from './ndd-segmented-control.ts';
import './ndd-segmented-control.ts';

function radioFixture(selectedValue = 'a'): string {
	return `
		<ndd-segmented-control value="${selectedValue}" name="test">
			<ndd-segmented-control-item value="a" text="Alpha"></ndd-segmented-control-item>
			<ndd-segmented-control-item value="b" text="Beta"></ndd-segmented-control-item>
			<ndd-segmented-control-item value="c" text="Gamma"></ndd-segmented-control-item>
		</ndd-segmented-control>
	`;
}

function getItems(el: NDDSegmentedControl): NDDSegmentedControlItem[] {
	return Array.from(el.querySelectorAll('ndd-segmented-control-item'));
}

function getInput(item: NDDSegmentedControlItem): HTMLInputElement {
	return item.shadowRoot!.querySelector('input')!;
}

describe('ndd-segmented-control', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-segmented-control></ndd-segmented-control>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});

describe('ndd-segmented-control-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-segmented-control-item></ndd-segmented-control-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native input', async () => {
		el = await fixture('<ndd-segmented-control-item></ndd-segmented-control-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')).not.toBeNull();
	});
});

/* ============================================================
   State sync
   ============================================================ */

describe('ndd-segmented-control – state sync', () => {
	let el: NDDSegmentedControl;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('marks matching item as selected', async () => {
		el = await fixture<NDDSegmentedControl>(radioFixture('b'));
		await waitForUpdate(el);
		const items = getItems(el);
		expect(items[0].selected).toBe(false);
		expect(items[1].selected).toBe(true);
		expect(items[2].selected).toBe(false);
	});

	it('updates selected when value changes', async () => {
		el = await fixture<NDDSegmentedControl>(radioFixture('a'));
		await waitForUpdate(el);
		el.value = 'c';
		await waitForUpdate(el);
		const items = getItems(el);
		expect(items[0].selected).toBe(false);
		expect(items[2].selected).toBe(true);
	});

	it('propagates size to items', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control size="sm">
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		expect(getItems(el)[0].size).toBe('sm');
	});

	it('disables all items when parent is disabled', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control disabled>
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
				<ndd-segmented-control-item value="b" text="B"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		getItems(el).forEach((item) => expect(item.disabled).toBe(true));
	});

	it('preserves item-level disabled when parent is not disabled', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control>
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
				<ndd-segmented-control-item value="b" disabled text="B"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		const items = getItems(el);
		expect(items[0].disabled).toBe(false);
		expect(items[1].disabled).toBe(true);
	});

	it('re-enables group-disabled items when parent disabled is removed', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control disabled>
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
				<ndd-segmented-control-item value="b" text="B"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		el.disabled = false;
		await waitForUpdate(el);
		getItems(el).forEach((item) => expect(item.disabled).toBe(false));
	});

	it('does not re-enable individually disabled items when parent disabled is removed', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control disabled>
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
				<ndd-segmented-control-item value="b" disabled text="B"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		el.disabled = false;
		await waitForUpdate(el);
		const items = getItems(el);
		expect(items[0].disabled).toBe(false);
		expect(items[1].disabled).toBe(true);
	});

	it('propagates variant to items', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control variant="icon">
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		expect(getItems(el)[0].variant).toBe('icon');
	});

	it('forwards name as groupName to items', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control name="view">
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		expect(getInput(getItems(el)[0]).name).toBe('view');
	});
});

describe('ndd-segmented-control – radio change', () => {
	let el: NDDSegmentedControl;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('fires change with value detail when item changes', async () => {
		el = await fixture<NDDSegmentedControl>(radioFixture('a'));
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);
		const input = getInput(getItems(el)[1]);
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		expect(detail?.value).toBe('b');
	});

	it('does not fire change when already selected item is clicked', async () => {
		el = await fixture<NDDSegmentedControl>(radioFixture('a'));
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('change', () => {
			fired = true;
		});
		const input = getInput(getItems(el)[0]);
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		expect(fired).toBe(false);
	});
});

/* ============================================================
   Checkbox change event
   ============================================================ */

describe('ndd-segmented-control – checkbox change', () => {
	let el: NDDSegmentedControl;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('fires change with values array when item is checked', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control type="checkbox">
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
				<ndd-segmented-control-item value="b" text="B"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);
		const input = getInput(getItems(el)[0]);
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		expect(detail?.values).toContain('a');
	});

	it('removes value from values when item is unchecked', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control type="checkbox">
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
				<ndd-segmented-control-item value="b" text="B"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		(el as NDDSegmentedControl).values = ['a', 'b'];
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);
		const input = getInput(getItems(el)[0]);
		input.checked = false;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		expect(detail?.values).not.toContain('a');
		expect(detail?.values).toContain('b');
	});
});

describe('ndd-segmented-control – keyboard navigation', () => {
	let el: NDDSegmentedControl;

	afterEach(() => {
		if (el) cleanup(el);
	});

	function pressKey(key: string) {
		el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
	}

	it('ArrowRight does nothing in checkbox mode', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control type="checkbox">
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
				<ndd-segmented-control-item value="b" text="B"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		(el as NDDSegmentedControl).values = ['a'];
		await waitForUpdate(el);
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
		await waitForUpdate(el);
		const items = getItems(el as NDDSegmentedControl);
		expect(items[0].selected).toBe(true);
		expect(items[1].selected).toBe(false);
	});

	it('ArrowRight selects next item', async () => {
		el = await fixture<NDDSegmentedControl>(radioFixture('a'));
		await waitForUpdate(el);
		pressKey('ArrowRight');
		await waitForUpdate(el);
		expect(el.value).toBe('b');
	});

	it('ArrowLeft selects previous item', async () => {
		el = await fixture<NDDSegmentedControl>(radioFixture('b'));
		await waitForUpdate(el);
		pressKey('ArrowLeft');
		await waitForUpdate(el);
		expect(el.value).toBe('a');
	});

	it('ArrowRight wraps from last to first', async () => {
		el = await fixture<NDDSegmentedControl>(radioFixture('c'));
		await waitForUpdate(el);
		pressKey('ArrowRight');
		await waitForUpdate(el);
		expect(el.value).toBe('a');
	});

	it('Home selects first item', async () => {
		el = await fixture<NDDSegmentedControl>(radioFixture('c'));
		await waitForUpdate(el);
		pressKey('Home');
		await waitForUpdate(el);
		expect(el.value).toBe('a');
	});

	it('End selects last item', async () => {
		el = await fixture<NDDSegmentedControl>(radioFixture('a'));
		await waitForUpdate(el);
		pressKey('End');
		await waitForUpdate(el);
		expect(el.value).toBe('c');
	});
});

/* ============================================================
   ARIA
   ============================================================ */

describe('ndd-segmented-control – ARIA', () => {
	let el: NDDSegmentedControl;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('has role="radiogroup" for radio type', async () => {
		el = await fixture<NDDSegmentedControl>(radioFixture('a'));
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('radiogroup');
	});

	it('has role="group" for checkbox type', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control type="checkbox">
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('group');
	});

	it('native radio input has correct checked state', async () => {
		el = await fixture<NDDSegmentedControl>(radioFixture('b'));
		await waitForUpdate(el);
		const items = getItems(el);
		expect(getInput(items[0]).checked).toBe(false);
		expect(getInput(items[1]).checked).toBe(true);
	});
});

/* ============================================================
   Accessibility
   ============================================================ */

describe('ndd-segmented-control – accessibility', () => {
	let el: NDDSegmentedControl;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('warns when no accessible name is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control>
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible name'));
	});

	it('does not warn when accessible-label is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control accessible-label="Weergave">
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
	});

	it('sets aria-label on host from accessible-label', async () => {
		el = await fixture<NDDSegmentedControl>(`
			<ndd-segmented-control accessible-label="Weergave">
				<ndd-segmented-control-item value="a" text="A"></ndd-segmented-control-item>
			</ndd-segmented-control>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('aria-label')).toBe('Weergave');
	});
});
