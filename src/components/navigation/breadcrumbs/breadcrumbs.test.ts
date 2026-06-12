import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate, deepActiveElement } from '../../../test-utils.js';
import './breadcrumbs.js';

describe('nldd-breadcrumbs', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders a nav landmark with the default aria-label', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		const nav = el.shadowRoot!.querySelector('nav');
		expect(nav).not.toBeNull();
		expect(nav!.getAttribute('aria-label')).toBe('Kruimelpad');
	});

	it('renders every item into the list and never collapses to a back link', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Documentatie" href="/docs/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot:not([name])')!;
		expect(slot.assignedElements().length).toBe(3);
		expect(el.shadowRoot!.querySelector('.breadcrumbs__level-up')).toBeNull();
	});

	it('lets the items wrap so the trail fits any width', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Here" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		const items = el.shadowRoot!.querySelector('.breadcrumbs__items')!;
		expect(getComputedStyle(items).flexWrap).toBe('wrap');
	});
});

describe('nldd-breadcrumbs-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-breadcrumbs-item text="Home"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('sets role="listitem" on the host', async () => {
		el = await fixture('<nldd-breadcrumbs-item text="Home"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('listitem');
	});

	it('does not overwrite a consumer-provided role', async () => {
		el = await fixture('<nldd-breadcrumbs-item role="treeitem" text="Home"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('treeitem');
	});

	it('renders as a link when href is set', async () => {
		el = await fixture('<nldd-breadcrumbs-item href="/docs/" text="Docs"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		const a = el.shadowRoot!.querySelector('a');
		expect(a).not.toBeNull();
		expect(a!.getAttribute('href')).toBe('/docs/');
	});

	it('renders plain text and sets aria-current on the host when current', async () => {
		el = await fixture('<nldd-breadcrumbs-item current text="Here" href="/here/"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')).toBeNull();
		expect(el.getAttribute('aria-current')).toBe('page');
	});

	it('clears aria-current when current is toggled off', async () => {
		el = await fixture('<nldd-breadcrumbs-item current text="Here"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('aria-current')).toBe('page');
		el.removeAttribute('current');
		await waitForUpdate(el);
		expect(el.hasAttribute('aria-current')).toBe(false);
	});

	it('renders a chevron-right separator after every item', async () => {
		el = await fixture('<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>');
		await waitForUpdate(el);
		const sep = el.shadowRoot!.querySelector('.breadcrumbs__separator');
		expect(sep).not.toBeNull();
		expect(sep?.querySelector('nldd-icon')?.getAttribute('name')).toBe('chevron-right-small');
	});
});

describe('nldd-breadcrumbs collapsing', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	const FIVE_LEVELS = `
		<nldd-breadcrumbs>
			<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Burgerzaken" href="/a/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Reisdocumenten" href="/a/b/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Aanvragen" href="/a/b/c/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Huidige" current></nldd-breadcrumbs-item>
		</nldd-breadcrumbs>
	`;

	it('collapses to first + ellipsis + parent + current at four or more levels', async () => {
		el = await fixture(FIVE_LEVELS);
		await waitForUpdate(el);
		const items = el.querySelectorAll('nldd-breadcrumbs-item');
		expect(el.shadowRoot!.querySelector('.breadcrumbs__ellipsis-button')).not.toBeNull();
		expect(items[0]!.getAttribute('slot')).toBe('first');
		expect(items[0]!.hasAttribute('data-nldd-collapsed')).toBe(false);
		expect(items[1]!.hasAttribute('data-nldd-collapsed')).toBe(true);
		expect(items[2]!.hasAttribute('data-nldd-collapsed')).toBe(true);
		expect(items[3]!.hasAttribute('data-nldd-collapsed')).toBe(false);
		expect(items[4]!.hasAttribute('data-nldd-collapsed')).toBe(false);
	});

	it('labels the ellipsis button via i18n', async () => {
		el = await fixture(FIVE_LEVELS);
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('.breadcrumbs__ellipsis-button')!;
		expect(button.getAttribute('aria-label')).toBe('Toon alle niveaus');
	});

	it('does not collapse with three levels', async () => {
		el = await fixture(`
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Documentatie" href="/docs/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Huidige" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.breadcrumbs__ellipsis-button')).toBeNull();
		expect(el.querySelector('[data-nldd-collapsed]')).toBeNull();
	});

	it('does not collapse with no-collapse set', async () => {
		el = await fixture(FIVE_LEVELS.replace('<nldd-breadcrumbs>', '<nldd-breadcrumbs no-collapse>'));
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.breadcrumbs__ellipsis-button')).toBeNull();
		expect(el.querySelector('[data-nldd-collapsed]')).toBeNull();
	});

	it('re-collapses when no-collapse is removed at runtime', async () => {
		el = await fixture(FIVE_LEVELS.replace('<nldd-breadcrumbs>', '<nldd-breadcrumbs no-collapse>'));
		await waitForUpdate(el);
		expect(el.querySelector('[data-nldd-collapsed]')).toBeNull();
		el.removeAttribute('no-collapse');
		await waitForUpdate(el);
		expect(el.querySelector('[data-nldd-collapsed]')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.breadcrumbs__ellipsis-button')).not.toBeNull();
	});

	it('expands on click: reveals all levels, removes the button, moves focus', async () => {
		el = await fixture(FIVE_LEVELS);
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector<HTMLButtonElement>('.breadcrumbs__ellipsis-button')!;
		button.click();
		await waitForUpdate(el);
		expect(el.querySelector('[data-nldd-collapsed]')).toBeNull();
		expect(el.shadowRoot!.querySelector('.breadcrumbs__ellipsis-button')).toBeNull();
		const firstRevealed = el.querySelectorAll('nldd-breadcrumbs-item')[1]!;
		expect(deepActiveElement()).toBe(firstRevealed.shadowRoot!.querySelector('a'));
	});

	it('stays expanded when items change afterwards', async () => {
		el = await fixture(FIVE_LEVELS);
		await waitForUpdate(el);
		el.shadowRoot!.querySelector<HTMLButtonElement>('.breadcrumbs__ellipsis-button')!.click();
		await waitForUpdate(el);
		const extra = document.createElement('nldd-breadcrumbs-item');
		extra.setAttribute('text', 'Extra');
		extra.setAttribute('href', '/extra/');
		el.insertBefore(extra, el.querySelectorAll('nldd-breadcrumbs-item')[1]!);
		// Twice: the slot insertion triggers slotchange → a deferred (microtask)
		// _syncCollapse, so let that cycle fully settle before asserting.
		await waitForUpdate(el);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.breadcrumbs__ellipsis-button')).toBeNull();
		expect(el.querySelector('[data-nldd-collapsed]')).toBeNull();
	});

	it('stays expanded after the whole trail is replaced (one-shot, e.g. SPA navigation)', async () => {
		el = await fixture(FIVE_LEVELS);
		await waitForUpdate(el);
		el.shadowRoot!.querySelector<HTMLButtonElement>('.breadcrumbs__ellipsis-button')!.click();
		await waitForUpdate(el);
		expect(el.querySelector('[data-nldd-collapsed]')).toBeNull();

		// Swap in a brand-new four-plus-level trail, as a persistent breadcrumbs
		// element would see on a route change. The one-shot _expanded flag is
		// deliberately not reset, so the fresh trail stays fully expanded.
		el.replaceChildren();
		['Home', 'Zorg', 'Aanvragen', 'Status', 'Detail'].forEach((text, i, all) => {
			const item = document.createElement('nldd-breadcrumbs-item');
			item.setAttribute('text', text);
			if (i < all.length - 1) item.setAttribute('href', `/${i}/`);
			else item.setAttribute('current', '');
			el.appendChild(item);
		});
		await waitForUpdate(el);
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('.breadcrumbs__ellipsis-button')).toBeNull();
		expect(el.querySelector('[data-nldd-collapsed]')).toBeNull();
	});
});
