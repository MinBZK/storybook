import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { fixture, cleanup, waitForUpdate, deepActiveElement, installUniversalReset } from '../../../test-utils.js';
import { _resetInputModalityForTesting, getInputModality } from '../../../utilities/input-modality.js';
import './list-item.js';
import type { NLDDListItem } from './list-item.js';
import '../list/list.js';
import '../cells/text-cell/text-cell.js';
import '../cells/spacer-cell/spacer-cell.js';
import '../list-item-action/list-item-action.js';
import '../cells/icon-cell/icon-cell.js';

describe('nldd-list-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-list-item></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to md size', async () => {
		el = await fixture('<nldd-list-item></nldd-list-item>');
		await waitForUpdate(el);
		expect((el as unknown as { size: string }).size).toBe('md');
		expect(el.hasAttribute('size')).toBe(false);
	});

	it('reflects selected attribute', async () => {
		el = await fixture('<nldd-list-item selected></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});

	it('renders a div by default', async () => {
		el = await fixture('<nldd-list-item></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div.list-item')).not.toBeNull();
	});

	it('renders a button when button is set', async () => {
		el = await fixture('<nldd-list-item button></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button.list-item__action')).not.toBeNull();
	});

	it('renders an anchor when href is set', async () => {
		el = await fixture('<nldd-list-item href="/test"></nldd-list-item>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a.list-item__action');
		expect(anchor).not.toBeNull();
		expect(anchor?.getAttribute('href')).toBe('/test');
	});

	it('href wins over button when both are set', async () => {
		el = await fixture('<nldd-list-item button href="/test"></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a.list-item__action')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});

	it('forwards target and rel to the anchor', async () => {
		el = await fixture('<nldd-list-item href="/test" target="_blank" rel="noopener noreferrer"></nldd-list-item>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a.list-item__action');
		expect(anchor?.getAttribute('target')).toBe('_blank');
		expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
	});

	it('omits target and rel when not set', async () => {
		el = await fixture('<nldd-list-item href="/test"></nldd-list-item>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a.list-item__action');
		expect(anchor?.hasAttribute('target')).toBe(false);
		expect(anchor?.hasAttribute('rel')).toBe(false);
	});

	it('injects a visually hidden "opens in new tab" announcement into the link when target="_blank"', async () => {
		el = await fixture('<nldd-list-item href="/test" target="_blank"></nldd-list-item>');
		await waitForUpdate(el);
		const hint = el.shadowRoot!.querySelector('a.list-item__action .list-item__opens-in-new-tab-hint');
		expect(hint).not.toBeNull();
		expect(hint?.textContent).toBe('Opent in nieuw tabblad');
	});

	it('does not add the new-tab announcement for same-tab links', async () => {
		el = await fixture('<nldd-list-item href="/test"></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.list-item__opens-in-new-tab-hint')).toBeNull();
	});

	it('lets the consumer override the new-tab announcement via translations', async () => {
		el = await fixture('<nldd-list-item href="/test" target="_blank"></nldd-list-item>');
		(el as unknown as { translations: Record<string, string> }).translations = {
			'components.list-item.opens-in-new-tab-label': 'opens in a new tab',
		};
		await waitForUpdate(el);
		const hint = el.shadowRoot!.querySelector('.list-item__opens-in-new-tab-hint');
		expect(hint?.textContent).toBe('opens in a new tab');
	});

	it('sets is-boxed class when inside a box list', async () => {
		const wrapper = await fixture(`
			<nldd-list variant="box">
				<nldd-list-item></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('nldd-list-item')!;
		await waitForUpdate(el);
		expect(el.classList.contains('is-boxed')).toBe(true);
	});

	it('does not set is-boxed class when inside a simple list', async () => {
		const wrapper = await fixture(`
			<nldd-list variant="simple">
				<nldd-list-item></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('nldd-list-item')!;
		await waitForUpdate(el);
		expect(el.classList.contains('is-boxed')).toBe(false);
	});

	it('renders all content in one flat slot (start/end slots are gone)', async () => {
		const wrapper = await fixture(`
			<nldd-list variant="simple">
				<nldd-list-item>
					<nldd-text-cell text="Inhoud"></nldd-text-cell>
				</nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('nldd-list-item')!;
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('slot[name="start"]')).toBeNull();
		expect(el.shadowRoot!.querySelector('slot[name="end"]')).toBeNull();
		expect(el.shadowRoot!.querySelector('.list-item slot:not([name])')).not.toBeNull();
	});


	it('matches [selected]:focus-within when focused on the action', async () => {
		// The :host([selected]:focus-within) CSS rule promotes a selected item
		// to the highlighted state on focus. Verify the selector semantics
		// (which the CSS then keys off of).
		el = await fixture('<nldd-list-item button selected></nldd-list-item>');
		await waitForUpdate(el);
		const action = el.shadowRoot!.querySelector<HTMLButtonElement>('.list-item__action')!;

		expect(el.matches('[selected]:focus-within')).toBe(false);
		action.focus();
		await waitForUpdate(el);
		expect(el.matches('[selected]:focus-within')).toBe(true);
		action.blur();
		await waitForUpdate(el);
		expect(el.matches('[selected]:focus-within')).toBe(false);
	});


	it('forces focus on the action on click (Safari/Firefox workaround)', async () => {
		el = await fixture('<nldd-list-item button></nldd-list-item>');
		await waitForUpdate(el);
		const action = el.shadowRoot!.querySelector<HTMLButtonElement>('.list-item__action')!;
		action.click();
		await waitForUpdate(el);
		expect(el.shadowRoot!.activeElement).toBe(action);
	});


	// — Mouse-focus suppression ————————————————————————————————————————————

	describe('is-pointer-focus', () => {
		beforeEach(() => {
			_resetInputModalityForTesting();
			getInputModality(); // re-register document listeners
		});

		it('adds is-pointer-focus class on mouse focus', async () => {
			el = await fixture('<nldd-list-item button></nldd-list-item>');
			await waitForUpdate(el);
			document.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'mouse' }));
			const action = el.shadowRoot!.querySelector('.list-item__action') as HTMLElement;
			action.focus();
			await waitForUpdate(el);
			expect(action.classList.contains('is-pointer-focus')).toBe(true);
		});

		it('does not add is-pointer-focus class on keyboard focus', async () => {
			el = await fixture('<nldd-list-item button></nldd-list-item>');
			await waitForUpdate(el);
			document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
			const action = el.shadowRoot!.querySelector('.list-item__action') as HTMLElement;
			action.focus();
			await waitForUpdate(el);
			expect(action.classList.contains('is-pointer-focus')).toBe(false);
		});

		it('removes is-pointer-focus class on blur', async () => {
			el = await fixture('<nldd-list-item button></nldd-list-item>');
			await waitForUpdate(el);
			document.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'mouse' }));
			const action = el.shadowRoot!.querySelector('.list-item__action') as HTMLElement;
			action.focus();
			await waitForUpdate(el);
			action.blur();
			await waitForUpdate(el);
			expect(action.classList.contains('is-pointer-focus')).toBe(false);
		});
	});


	// — Parent type sync: content (default) ——————————————————————————————————

	it('content parent: role="listitem", no aria-selected', async () => {
		const wrapper = await fixture(`
			<nldd-list>
				<nldd-list-item selected></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('nldd-list-item')!;
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('listitem');
		expect(el.hasAttribute('aria-selected')).toBe(false);
	});


	// — Parent type sync: navigation —————————————————————————————————————————

	it('navigation parent: aria-current="page" on inner anchor when selected', async () => {
		const wrapper = await fixture(`
			<nldd-list type="navigation">
				<nldd-list-item id="a" href="/a" selected></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('#a') as HTMLElement;
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a.list-item__action');
		expect(anchor?.getAttribute('aria-current')).toBe('page');
	});

	it('navigation parent: aria-current="page" on inner button when selected', async () => {
		const wrapper = await fixture(`
			<nldd-list type="navigation">
				<nldd-list-item id="a" button selected></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('#a') as HTMLElement;
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button.list-item__action');
		expect(button?.getAttribute('aria-current')).toBe('page');
	});

	it('navigation parent: removes aria-current when selected is toggled off', async () => {
		const wrapper = await fixture(`
			<nldd-list type="navigation">
				<nldd-list-item id="a" href="/a" selected></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('#a') as HTMLElement;
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a.list-item__action');
		expect(anchor?.getAttribute('aria-current')).toBe('page');

		el.removeAttribute('selected');
		await waitForUpdate(el);
		expect(anchor?.hasAttribute('aria-current')).toBe(false);
	});


	// — Parent type sync: switching at runtime ————————————————————————————————

	it('re-syncs ARIA when parent list type changes', async () => {
		const wrapper = await fixture(`
			<nldd-list>
				<nldd-list-item id="a" href="/a" selected></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('#a') as HTMLElement;
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a.list-item__action');
		expect(anchor?.hasAttribute('aria-current')).toBe(false);

		wrapper.setAttribute('type', 'navigation');
		// MutationObserver fires async — wait a tick
		await waitForUpdate(wrapper);
		await waitForUpdate(el);
		expect(anchor?.getAttribute('aria-current')).toBe('page');
	});

	it('focus() delegates to the inner .list-item__action', async () => {
		const el = await fixture<HTMLElement>('<nldd-list-item href="#">Item</nldd-list-item>');
		await waitForUpdate(el);
		el.focus();
		const action = el.shadowRoot!.querySelector('.list-item__action');
		expect(deepActiveElement()).toBe(action);
		cleanup(el);
	});

	it('shows press feedback on pointerdown and clears it on pointercancel (touch-scroll)', async () => {
		el = await fixture('<nldd-list-item button>Item</nldd-list-item>');
		await waitForUpdate(el);
		const action = el.shadowRoot!.querySelector('.list-item__action')!;
		el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true, button: 0 }));
		expect(action.classList.contains('is-pressed')).toBe(true);
		// A touch that becomes a scroll fires pointercancel — the press must clear.
		el.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true, composed: true }));
		expect(action.classList.contains('is-pressed')).toBe(false);
	});

	it('clears press feedback on pointerup', async () => {
		el = await fixture('<nldd-list-item button>Item</nldd-list-item>');
		await waitForUpdate(el);
		const action = el.shadowRoot!.querySelector('.list-item__action')!;
		el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true, button: 0 }));
		expect(action.classList.contains('is-pressed')).toBe(true);
		el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));
		expect(action.classList.contains('is-pressed')).toBe(false);
	});
});

describe('nldd-list-item – checkbox row', () => {
	let el: NLDDListItem;

	afterEach(() => {
		if (el) cleanup(el);
	});

	const mount = async (attrs = ''): Promise<NLDDListItem> => {
		el = await fixture<NLDDListItem>(`<nldd-list><nldd-list-item ${attrs}><nldd-text-cell text="AI"></nldd-text-cell></nldd-list-item></nldd-list>`)
			.then((list) => list.querySelector('nldd-list-item') as NLDDListItem);
		await waitForUpdate(el);
		return el;
	};

	const action = (item: NLDDListItem): HTMLElement =>
		item.shadowRoot!.querySelector('.list-item__action') as HTMLElement;

	it('renders the action as a checkbox with its state', async () => {
		await mount('checkbox');
		expect(action(el).tagName).toBe('BUTTON');
		expect(action(el).getAttribute('role')).toBe('checkbox');
		expect(action(el).getAttribute('aria-checked')).toBe('false');
	});

	it('reflects checked into aria-checked', async () => {
		await mount('checkbox checked');
		expect(action(el).getAttribute('aria-checked')).toBe('true');
	});

	it('toggles and fires change when the row is activated', async () => {
		await mount('checkbox');
		const seen: boolean[] = [];
		el.addEventListener('change', (e: Event) => seen.push((e as CustomEvent).detail.checked));
		action(el).click();
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
		expect(action(el).getAttribute('aria-checked')).toBe('true');
		action(el).click();
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
		expect(seen).toEqual([true, false]);
	});

	it('lets href win over checkbox', async () => {
		await mount('checkbox href="/ergens"');
		expect(action(el).tagName).toBe('A');
		expect(action(el).getAttribute('role')).toBeNull();
	});
});

describe('nldd-list-item – checked action selects the row', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	const blockOf = (item: Element) =>
		item.shadowRoot!.querySelector('.list-item') as HTMLElement;

	it('paints the whole row when a checkbox action is checked', async () => {
		el = await fixture<HTMLElement>(
			`<nldd-list type="tree" accessible-label="X">
				<nldd-list-item>
					<nldd-list-item-action button disclosure accessible-label="Klap uit"></nldd-list-item-action>
					<nldd-list-item-action checkbox width="full" accessible-label="Kies">
						<nldd-text-cell text="Ministeries"></nldd-text-cell>
					</nldd-list-item-action>
				</nldd-list-item>
			</nldd-list>`,
		);
		await waitForUpdate(el);
		const item = el.querySelector('nldd-list-item')!;
		const action = el.querySelector('nldd-list-item-action[checkbox]')!;
		expect(blockOf(item).classList.contains('is-action-checked')).toBe(false);

		// setAttribute, not click: consumers check rows programmatically too.
		action.setAttribute('checked', '');
		await waitForUpdate(item as NLDDListItem);
		expect(blockOf(item).classList.contains('is-action-checked')).toBe(true);

		action.removeAttribute('checked');
		await waitForUpdate(item as NLDDListItem);
		expect(blockOf(item).classList.contains('is-action-checked')).toBe(false);
	});

	it('does not light up an ancestor row for a checked nested row', async () => {
		el = await fixture<HTMLElement>(
			`<nldd-list type="tree" accessible-label="X">
				<nldd-list-item expanded>
					<nldd-list-item-action checkbox width="full" accessible-label="Ouder">
						<nldd-text-cell text="Tak"></nldd-text-cell>
					</nldd-list-item-action>
					<nldd-list-item slot="children">
						<nldd-list-item-action checkbox checked width="full" accessible-label="Kind">
							<nldd-text-cell text="Blad"></nldd-text-cell>
						</nldd-list-item-action>
					</nldd-list-item>
				</nldd-list-item>
			</nldd-list>`,
		);
		await waitForUpdate(el);
		const [outer, inner] = [...el.querySelectorAll('nldd-list-item')];
		await waitForUpdate(inner as NLDDListItem);
		expect(blockOf(inner).classList.contains('is-action-checked')).toBe(true);
		expect(blockOf(outer).classList.contains('is-action-checked')).toBe(false);
	});
});

describe('nldd-list-item – widened geometry', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	const settle = () => new Promise(resolve => setTimeout(resolve, 60));

	it('keeps content on the same grid for plain and interactive rows', async () => {
		el = await fixture(`
			<div style="padding: 40px; width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px; --semantics-controls-sm-min-size: 32px; --primitives-space-40: 40px; --semantics-dividers-thickness: 1px;">
				<nldd-list accessible-label="X">
					<nldd-list-item><nldd-text-cell text="Plain"></nldd-text-cell></nldd-list-item>
					<nldd-list-item button><nldd-text-cell text="Actie"></nldd-text-cell></nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		const [plain, action] = [...el.querySelectorAll('nldd-text-cell')];
		expect(action.getBoundingClientRect().left).toBeCloseTo(plain.getBoundingClientRect().left, 1);
	});

	it('marks rows with an action as is-interactive', async () => {
		el = await fixture(`
			<nldd-list accessible-label="X">
				<nldd-list-item><nldd-text-cell text="Plain"></nldd-text-cell></nldd-list-item>
				<nldd-list-item button><nldd-text-cell text="Knop"></nldd-text-cell></nldd-list-item>
				<nldd-list-item>
					<nldd-list-item-action button accessible-label="Action"></nldd-list-item-action>
					<nldd-text-cell text="Segmentrij"></nldd-text-cell>
				</nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);
		await settle();
		const [plain, button, actionRow] = [...el.querySelectorAll('nldd-list-item')];
		expect(plain.classList.contains('is-interactive')).toBe(false);
		expect(button.classList.contains('is-interactive')).toBe(true);
		expect(actionRow.classList.contains('is-interactive')).toBe(true);
	});

	it('makes the painted overhang clickable on a row-wide action', async () => {
		el = await fixture(`
			<div style="padding: 40px; width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px; --semantics-controls-sm-min-size: 32px; --primitives-space-40: 40px; --semantics-dividers-thickness: 1px;">
				<nldd-list accessible-label="X">
					<nldd-list-item button><nldd-text-cell text="Actie"></nldd-text-cell></nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		const item = el.querySelector('nldd-list-item')!;
		const cell = el.querySelector('nldd-text-cell')!;
		const cellRect = cell.getBoundingClientRect();
		// 4px into the overhang, left of the content grid.
		const hit = document.elementFromPoint(cellRect.left - 4, cellRect.top + cellRect.height / 2);
		expect(hit === item || item.contains(hit as Node)).toBe(true);
	});

	it('moves a leading action out to the row edge, without making it wider', async () => {
		el = await fixture(`
			<div style="padding: 40px; width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px;">
				<nldd-list type="tree" accessible-label="X">
					<nldd-list-item>
						<nldd-list-item-action button disclosure accessible-label="Klap"></nldd-list-item-action>
						<nldd-text-cell text="Rij"></nldd-text-cell>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await settle();
		const row = el.querySelector('nldd-list-item')!;
		const action = el.querySelector('nldd-list-item-action')!;
		const rowRect = row.getBoundingClientRect();
		const actionRect = action.getBoundingClientRect();
		// The action starts at the row's own (widened) edge — exactly where a
		// row-wide action's fill and hit area would start...
		expect(Math.round(actionRect.left - rowRect.left)).toBe(0);
		// ...and it shifted there rather than grown: the footprint stays the
		// control size, so its trailing edge moves out by the same 8px.
		expect(Math.round(actionRect.width)).toBe(44);
		expect(Math.round(actionRect.right - rowRect.left)).toBe(44);
	});

	it('puts the text of a leading action on the same grid as a plain row', async () => {
		el = await fixture(`
			<div style="padding: 40px; width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px;">
				<nldd-list accessible-label="X">
					<nldd-list-item><nldd-text-cell text="Plain"></nldd-text-cell></nldd-list-item>
					<nldd-list-item>
						<nldd-list-item-action button width="full" accessible-label="Actie">
							<nldd-text-cell text="Action"></nldd-text-cell>
						</nldd-list-item-action>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await settle();
		const [plainCell, actionCell] = [...el.querySelectorAll('nldd-text-cell')];
		expect(actionCell!.getBoundingClientRect().left)
			.toBeCloseTo(plainCell!.getBoundingClientRect().left, 1);
	});

	it('lets a trailing action absorb the end edge only', async () => {
		el = await fixture(`
			<div style="padding: 40px; width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px;">
				<nldd-list accessible-label="X">
					<nldd-list-item>
						<nldd-text-cell text="Rij"></nldd-text-cell>
						<nldd-list-item-action button accessible-label="Meer"></nldd-list-item-action>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await settle();
		const row = el.querySelector('nldd-list-item')!;
		const action = el.querySelector('nldd-list-item-action')!;
		expect(Math.round(row.getBoundingClientRect().right - action.getBoundingClientRect().right)).toBe(0);
		expect(Math.round(action.getBoundingClientRect().width)).toBe(44);
	});

	it('still sees its trailing action on a branch row with child rows', async () => {
		el = await fixture(`
			<div style="padding: 40px; width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px;">
				<nldd-list type="tree" accessible-label="X">
					<nldd-list-item expanded>
						<nldd-list-item-action button disclosure accessible-label="Klap"></nldd-list-item-action>
						<nldd-list-item-action button width="full" accessible-label="Kies">
							<nldd-text-cell text="Tak"></nldd-text-cell>
						</nldd-list-item-action>
						<nldd-list-item slot="children">
							<nldd-text-cell text="Blad"></nldd-text-cell>
						</nldd-list-item>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await settle();
		const branch = el.querySelector('nldd-list-item')!;
		// The child rows sit in the `children` slot and must not be mistaken for
		// the row's own last child — otherwise the trailing action stops short
		// of the row edge while the child rows below it do reach it.
		expect(branch.classList.contains('has-trailing-action')).toBe(true);
		const actions = branch.querySelectorAll(':scope > nldd-list-item-action');
		const trailing = actions[actions.length - 1]!;
		expect(Math.round(branch.getBoundingClientRect().right - trailing.getBoundingClientRect().right)).toBe(0);
	});

	it('leaves a mid-row action on the grid', async () => {
		el = await fixture(`
			<div style="padding: 40px; width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px;">
				<nldd-list accessible-label="X">
					<nldd-list-item>
						<nldd-text-cell text="Rij"></nldd-text-cell>
						<nldd-list-item-action button accessible-label="Midden"></nldd-list-item-action>
						<nldd-text-cell text="Achter"></nldd-text-cell>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await settle();
		const action = el.querySelector('nldd-list-item-action')!;
		// No edge to absorb: the plain control-size footprint.
		expect(Math.round(action.getBoundingClientRect().width)).toBe(44);
	});
});

describe('nldd-list-item – divider markers', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	const settle = () => new Promise(resolve => setTimeout(resolve, 80));

	it('runs the divider from a divider-start cell', async () => {
		el = await fixture(`
			<div style="width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px; --semantics-controls-sm-min-size: 32px; --primitives-space-40: 40px; --semantics-dividers-thickness: 1px;">
				<nldd-list accessible-label="X">
					<nldd-list-item>
						<nldd-spacer-cell size="40"></nldd-spacer-cell>
						<nldd-text-cell divider-start text="Vanaf hier"></nldd-text-cell>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await settle();
		const item = el.querySelector('nldd-list-item') as HTMLElement;
		const inset = parseFloat(item.style.getPropertyValue('--_divider-inset-start'));
		expect(inset).toBeGreaterThanOrEqual(40);
		expect(item.style.getPropertyValue('--_divider-inset-end')).toBe('');
	});

	// Een rij die met een icoon opent lijnt de lijn zelf al uit met de tekst,
	// zodat elke lijst dat consequent doet zonder markers te hoeven zetten.
	it('laat de divider vanzelf bij de tekst beginnen na een leidend icoon', async () => {
		el = await fixture(`
			<div style="width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px; --semantics-controls-sm-min-size: 32px; --primitives-space-40: 40px; --semantics-dividers-thickness: 1px;">
				<nldd-list accessible-label="X">
					<nldd-list-item>
						<nldd-icon-cell size="20"><nldd-icon name="star"></nldd-icon></nldd-icon-cell>
						<nldd-spacer-cell size="40"></nldd-spacer-cell>
						<nldd-text-cell text="Met icoon"></nldd-text-cell>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await settle();
		const item = el.querySelector('nldd-list-item') as HTMLElement;
		const inset = parseFloat(item.style.getPropertyValue('--_divider-inset-start'));
		expect(inset).toBeGreaterThanOrEqual(40);
	});

	// De marker overrulet de afleiding: op de icoon-cel krijg je de volle lijn terug.
	it('geeft de volle lijn terug met divider-start op de icoon-cel', async () => {
		el = await fixture(`
			<div style="width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px; --semantics-controls-sm-min-size: 32px; --primitives-space-40: 40px; --semantics-dividers-thickness: 1px;">
				<nldd-list accessible-label="X">
					<nldd-list-item>
						<nldd-icon-cell divider-start size="20"><nldd-icon name="star"></nldd-icon></nldd-icon-cell>
						<nldd-spacer-cell size="40"></nldd-spacer-cell>
						<nldd-text-cell text="Met icoon"></nldd-text-cell>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await settle();
		const item = el.querySelector('nldd-list-item') as HTMLElement;
		const inset = parseFloat(item.style.getPropertyValue('--_divider-inset-start'));
		expect(inset).toBeLessThan(40);
	});

	// Zonder leidend icoon blijft de lijn de volle contentbreedte houden.
	it('laat een rij zonder leidend icoon met rust', async () => {
		el = await fixture(`
			<div style="width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px; --semantics-controls-sm-min-size: 32px; --semantics-dividers-thickness: 1px;">
				<nldd-list accessible-label="X">
					<nldd-list-item>
						<nldd-text-cell text="Geen icoon"></nldd-text-cell>
						<nldd-icon-cell size="20"><nldd-icon name="chevron-right"></nldd-icon></nldd-icon-cell>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await settle();
		const item = el.querySelector('nldd-list-item') as HTMLElement;
		expect(item.style.getPropertyValue('--_divider-inset-start')).toBe('');
	});

	it('clears the vars again when the marker is removed', async () => {
		el = await fixture(`
			<div style="width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px; --semantics-controls-sm-min-size: 32px; --primitives-space-40: 40px; --semantics-dividers-thickness: 1px;">
				<nldd-list accessible-label="X">
					<nldd-list-item>
						<nldd-spacer-cell size="40"></nldd-spacer-cell>
						<nldd-text-cell divider-start text="Vanaf hier"></nldd-text-cell>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await settle();
		const item = el.querySelector('nldd-list-item') as HTMLElement;
		el.querySelector('[divider-start]')!.removeAttribute('divider-start');
		await settle();
		expect(item.style.getPropertyValue('--_divider-inset-start')).toBe('');
	});

	it('falls back to full width when start lies past the last end', async () => {
		el = await fixture(`
			<div style="width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px; --semantics-controls-sm-min-size: 32px; --primitives-space-40: 40px; --semantics-dividers-thickness: 1px;">
				<nldd-list accessible-label="X">
					<nldd-list-item>
						<nldd-text-cell divider-end text="Eind"></nldd-text-cell>
						<nldd-text-cell divider-start text="Start te laat" width="full"></nldd-text-cell>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await settle();
		const item = el.querySelector('nldd-list-item') as HTMLElement;
		expect(item.style.getPropertyValue('--_divider-inset-start')).toBe('');
		expect(item.style.getPropertyValue('--_divider-inset-end')).toBe('');
	});
});

describe('nldd-list-item – nested widening', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('does not stack the widened inset per nesting level', async () => {
		el = await fixture(`
			<div style="padding: 40px; width: 400px; --components-list-item-indicator-inline-inset: 8px; --semantics-controls-md-min-size: 44px;">
				<nldd-list type="tree" accessible-label="X">
					<nldd-list-item expanded>
						<nldd-list-item-action checkbox width="full" accessible-label="Ouder">
							<nldd-text-cell text="Tak"></nldd-text-cell>
						</nldd-list-item-action>
						<nldd-list-item slot="children" expanded>
							<nldd-list-item-action checkbox width="full" accessible-label="Kind">
								<nldd-text-cell text="Subtak"></nldd-text-cell>
							</nldd-list-item-action>
							<nldd-list-item slot="children">
								<nldd-list-item-action checkbox width="full" accessible-label="Kleinkind">
									<nldd-text-cell text="Blad"></nldd-text-cell>
								</nldd-list-item-action>
							</nldd-list-item>
						</nldd-list-item>
					</nldd-list-item>
				</nldd-list>
			</div>
		`);
		await waitForUpdate(el);
		await new Promise(resolve => setTimeout(resolve, 60));
		const [outer, middle, inner] = [...el.querySelectorAll('nldd-list-item')];
		// Every level's widened box spans the same inline range: the children
		// group re-insets the parent's widened strip, so nesting never stacks.
		const outerRect = outer.getBoundingClientRect();
		expect(Math.round(middle.getBoundingClientRect().left)).toBe(Math.round(outerRect.left));
		expect(Math.round(inner.getBoundingClientRect().left)).toBe(Math.round(outerRect.left));
		expect(Math.round(middle.getBoundingClientRect().right)).toBe(Math.round(outerRect.right));
		expect(Math.round(inner.getBoundingClientRect().right)).toBe(Math.round(outerRect.right));
	});
});

describe('nldd-list-item – row-wide disclosure', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('turns a chevron cell marked disclosure with its own expanded state', async () => {
		el = await fixture(`
			<nldd-list type="tree" accessible-label="X">
				<nldd-list-item button expanded>
					<nldd-icon-cell disclosure size="20"></nldd-icon-cell>
					<nldd-text-cell text="Tak"></nldd-text-cell>
					<nldd-list-item slot="children"><nldd-text-cell text="Blad"></nldd-text-cell></nldd-list-item>
				</nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const row = el.querySelector<NLDDListItem>('nldd-list-item')!;
		const chevron = row.querySelector('nldd-icon-cell[disclosure]')!;
		// The whole row is the control here — no disclosure action in sight.
		expect(getComputedStyle(chevron).rotate).toBe('90deg');

		row.expanded = false;
		await waitForUpdate(row);
		expect(getComputedStyle(chevron).rotate).toBe('0deg');
	});
});

describe('nldd-list-item – nested press', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('does not flash a branch row when a child row is pressed', async () => {
		el = await fixture(`
			<nldd-list type="tree" accessible-label="X">
				<nldd-list-item button expanded>
					<nldd-text-cell text="Tak"></nldd-text-cell>
					<nldd-list-item slot="children" button>
						<nldd-text-cell text="Blad"></nldd-text-cell>
					</nldd-list-item>
				</nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const [branch, leaf] = [...el.querySelectorAll<NLDDListItem>('nldd-list-item')];
		await waitForUpdate(leaf!);
		leaf!.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true, button: 0 }));
		// The child's pointer event travels through the branch — only the child
		// may show the press.
		expect(leaf!.shadowRoot!.querySelector('.list-item__action')!.classList.contains('is-pressed')).toBe(true);
		expect(branch!.shadowRoot!.querySelector('.list-item__action')!.classList.contains('is-pressed')).toBe(false);
	});
});

describe('nldd-list-item onder een universele reset', () => {
	let el: HTMLElement;
	let removeReset: () => void;

	afterEach(() => {
		removeReset();
		if (el) cleanup(el);
	});

	it('behoudt de negatieve inline-marge van een interactieve rij', async () => {
		removeReset = installUniversalReset();
		el = await fixture(`
			<div style="--components-list-item-indicator-inline-inset: 8px;">
				<nldd-list-item button>
					Rij
				</nldd-list-item>
			</div>
		`);
		const item = el.querySelector('nldd-list-item') as HTMLElement;
		await waitForUpdate(item);
		expect(item.classList.contains('is-interactive')).toBe(true);
		expect(getComputedStyle(item).marginLeft).toBe('-8px');
	});
});
