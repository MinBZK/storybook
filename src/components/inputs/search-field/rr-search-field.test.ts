import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRSearchField } from './rr-search-field.ts';
import './rr-search-field.ts';

describe('rr-search-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-search-field></rr-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native search input', async () => {
		el = await fixture('<rr-search-field></rr-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input[type="search"]')).not.toBeNull();
	});

	it('renders rr-icon for the search icon', async () => {
		el = await fixture('<rr-search-field></rr-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-icon')).not.toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('rr-search-field – state', () => {
	let el: RRSearchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards placeholder to native input', async () => {
		el = await fixture<RRSearchField>('<rr-search-field placeholder="Zoek documenten"></rr-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('placeholder')).toBe('Zoek documenten');
	});

	it('forwards accessible-label as aria-label to native input', async () => {
		el = await fixture<RRSearchField>('<rr-search-field accessible-label="Zoek een document"></rr-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-label')).toBe('Zoek een document');
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<RRSearchField>('<rr-search-field disabled></rr-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.disabled).toBe(true);
	});

	it('forwards name to native input', async () => {
		el = await fixture<RRSearchField>('<rr-search-field name="q"></rr-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.name).toBe('q');
	});

	it('does not render dismiss button when value is empty', async () => {
		el = await fixture<RRSearchField>('<rr-search-field></rr-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-icon-button')).toBeNull();
	});

	it('renders dismiss button when value is set', async () => {
		el = await fixture<RRSearchField>('<rr-search-field value="test"></rr-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-icon-button')).not.toBeNull();
	});

	it('does not render search button when has-search-button is not set', async () => {
		el = await fixture<RRSearchField>('<rr-search-field></rr-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-button')).toBeNull();
	});

	it('renders search button when has-search-button is set', async () => {
		el = await fixture<RRSearchField>('<rr-search-field has-search-button></rr-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-button')).not.toBeNull();
	});
});


/* ============================================================
   Input & change events
   ============================================================ */

describe('rr-search-field – input & change events', () => {
	let el: RRSearchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates value on input', async () => {
		el = await fixture<RRSearchField>('<rr-search-field></rr-search-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'test';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.value).toBe('test');
	});

	it('dispatches input event with value detail', async () => {
		el = await fixture<RRSearchField>('<rr-search-field></rr-search-field>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('input', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'hello';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		expect(detail?.value).toBe('hello');
	});
});


/* ============================================================
   Search event
   ============================================================ */

describe('rr-search-field – search event', () => {
	let el: RRSearchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('dispatches search event on Enter', async () => {
		el = await fixture<RRSearchField>('<rr-search-field value="test"></rr-search-field>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('search', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		const input = el.shadowRoot!.querySelector('input')!;
		input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
		expect(detail?.value).toBe('test');
	});

	it('dispatches search event on search button click', async () => {
		el = await fixture<RRSearchField>('<rr-search-field value="test" has-search-button></rr-search-field>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('search', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		el._handleSearch();
		expect(detail?.value).toBe('test');
	});
});


/* ============================================================
   Dismiss
   ============================================================ */

describe('rr-search-field – dismiss', () => {
	let el: RRSearchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('clears value on dismiss', async () => {
		el = await fixture<RRSearchField>('<rr-search-field value="test"></rr-search-field>');
		await waitForUpdate(el);
		el._handleDismiss();
		await waitForUpdate(el);
		expect(el.value).toBe('');
	});

	it('dispatches change event with empty value on dismiss', async () => {
		el = await fixture<RRSearchField>('<rr-search-field value="test"></rr-search-field>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		el._handleDismiss();
		expect(detail?.value).toBe('');
	});

	it('hides dismiss button after dismiss', async () => {
		el = await fixture<RRSearchField>('<rr-search-field value="test"></rr-search-field>');
		await waitForUpdate(el);
		el._handleDismiss();
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-icon-button')).toBeNull();
	});
});
