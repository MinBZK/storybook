import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './badge.js';

describe('nldd-badge', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-badge></nldd-badge>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders number as label', async () => {
		el = await fixture('<nldd-badge number="5"></nldd-badge>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.badge__text')!;
		expect(label.textContent).toBe('5');
	});

	it('clamps number above max to "{max}+"', async () => {
		el = await fixture('<nldd-badge number="150" max="99"></nldd-badge>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.badge__text')!;
		expect(label.textContent).toBe('99+');
	});

	it('prefers text over number', async () => {
		el = await fixture('<nldd-badge text="Nieuw" number="3"></nldd-badge>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.badge__text')!;
		expect(label.textContent).toBe('Nieuw');
	});

	it('renders as dot automatically when text and number are empty', async () => {
		el = await fixture('<nldd-badge></nldd-badge>');
		await waitForUpdate(el);
		const badge = el.shadowRoot!.querySelector('.badge')!;
		expect(badge.classList.contains('badge--dot')).toBe(true);
		expect(el.shadowRoot!.querySelector('.badge__text')).toBeNull();
	});

	it('drops dot mode when number is set', async () => {
		el = await fixture('<nldd-badge number="5"></nldd-badge>');
		await waitForUpdate(el);
		const badge = el.shadowRoot!.querySelector('.badge')!;
		expect(badge.classList.contains('badge--dot')).toBe(false);
	});

	it('renders icon-only as square', async () => {
		el = await fixture('<nldd-badge icon="check-mark"></nldd-badge>');
		await waitForUpdate(el);
		const badge = el.shadowRoot!.querySelector('.badge')!;
		expect(badge.classList.contains('badge--icon-only')).toBe(true);
		expect(badge.classList.contains('badge--dot')).toBe(false);
		expect(el.shadowRoot!.querySelector('.badge__icon nldd-icon')!.getAttribute('name')).toBe('check-mark');
		expect(el.shadowRoot!.querySelector('.badge__text')).toBeNull();
	});

	it('renders icon with text', async () => {
		el = await fixture('<nldd-badge icon="check-mark" text="OK"></nldd-badge>');
		await waitForUpdate(el);
		const badge = el.shadowRoot!.querySelector('.badge')!;
		expect(badge.classList.contains('badge--icon-only')).toBe(false);
		expect(el.shadowRoot!.querySelector('.badge__icon')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.badge__text')!.textContent).toBe('OK');
	});

	it('omits role and aria-label when text is visible', async () => {
		el = await fixture('<nldd-badge text="Nieuw"></nldd-badge>');
		await waitForUpdate(el);
		const badge = el.shadowRoot!.querySelector('.badge')!;
		expect(badge.hasAttribute('role')).toBe(false);
		expect(badge.hasAttribute('aria-label')).toBe(false);
	});

	it('omits role and aria-label when number is visible', async () => {
		el = await fixture('<nldd-badge number="5"></nldd-badge>');
		await waitForUpdate(el);
		const badge = el.shadowRoot!.querySelector('.badge')!;
		expect(badge.hasAttribute('role')).toBe(false);
		expect(badge.hasAttribute('aria-label')).toBe(false);
	});

	it('sets role=img + i18n notification label in dot mode', async () => {
		el = await fixture('<nldd-badge></nldd-badge>');
		await waitForUpdate(el);
		const badge = el.shadowRoot!.querySelector('.badge')!;
		expect(badge.getAttribute('role')).toBe('img');
		expect(badge.getAttribute('aria-label')).toBe('Notificatie');
	});

	it('sets role=img + i18n label in icon-only mode', async () => {
		el = await fixture('<nldd-badge icon="check-mark"></nldd-badge>');
		await waitForUpdate(el);
		const badge = el.shadowRoot!.querySelector('.badge')!;
		expect(badge.getAttribute('role')).toBe('img');
		expect(badge.getAttribute('aria-label')).toBe('Notificatie');
	});

	it('uses accessible-label in icon-only mode', async () => {
		el = await fixture('<nldd-badge icon="check-mark" accessible-label="Geverifieerd"></nldd-badge>');
		await waitForUpdate(el);
		const badge = el.shadowRoot!.querySelector('.badge')!;
		expect(badge.getAttribute('aria-label')).toBe('Geverifieerd');
	});
});
