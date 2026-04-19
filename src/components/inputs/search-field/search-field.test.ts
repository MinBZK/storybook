import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDSearchField } from './search-field.js';
import './search-field.js';

describe('nldd-search-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-search-field></nldd-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native search input', async () => {
		el = await fixture('<nldd-search-field></nldd-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input[type="search"]')).not.toBeNull();
	});

	it('renders nldd-icon for the search icon', async () => {
		el = await fixture('<nldd-search-field></nldd-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-icon')).not.toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('nldd-search-field – state', () => {
	let el: NLDDSearchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards placeholder to native input', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field placeholder="Zoek documenten"></nldd-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('placeholder')).toBe('Zoek documenten');
	});

	it('forwards accessible-label as aria-label to native input', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field accessible-label="Zoek een document"></nldd-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-label')).toBe('Zoek een document');
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field disabled></nldd-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.disabled).toBe(true);
	});

	it('forwards name to native input', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field name="q"></nldd-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.name).toBe('q');
	});

	it('does not render dismiss button when value is empty', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field></nldd-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-icon-button')).toBeNull();
	});

	it('renders dismiss button when value is set', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field value="test"></nldd-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-icon-button')).not.toBeNull();
	});

	it('does not render search button when has-search-button is not set', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field></nldd-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-button')).toBeNull();
	});

	it('renders search button when has-search-button is set', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field has-search-button></nldd-search-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-button')).not.toBeNull();
	});
});


/* ============================================================
   Input & change events
   ============================================================ */

describe('nldd-search-field – input & change events', () => {
	let el: NLDDSearchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates value on input', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field></nldd-search-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'test';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.value).toBe('test');
	});

	it('dispatches input event with value detail', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field></nldd-search-field>');
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

describe('nldd-search-field – search event', () => {
	let el: NLDDSearchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('dispatches search event on Enter', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field value="test"></nldd-search-field>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('search', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		const input = el.shadowRoot!.querySelector('input')!;
		input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
		expect(detail?.value).toBe('test');
	});

	it('dispatches search event on search button click', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field value="test" has-search-button></nldd-search-field>');
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

describe('nldd-search-field – dismiss', () => {
	let el: NLDDSearchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('clears value on dismiss', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field value="test"></nldd-search-field>');
		await waitForUpdate(el);
		el._handleDismiss();
		await waitForUpdate(el);
		expect(el.value).toBe('');
	});

	it('dispatches change event with empty value on dismiss', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field value="test"></nldd-search-field>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		el._handleDismiss();
		expect(detail?.value).toBe('');
	});

	it('hides dismiss button after dismiss', async () => {
		el = await fixture<NLDDSearchField>('<nldd-search-field value="test"></nldd-search-field>');
		await waitForUpdate(el);
		el._handleDismiss();
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-icon-button')).toBeNull();
	});
});
