import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './tag.js';

describe('nldd-tag', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-tag text="Tag"></nldd-tag>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders text from text attribute', async () => {
		el = await fixture('<nldd-tag text="Nieuw"></nldd-tag>');
		await waitForUpdate(el);
		const text = el.shadowRoot!.querySelector('.tag__text')!;
		expect(text.textContent).toContain('Nieuw');
	});

	it('reflects variant attribute', async () => {
		el = await fixture('<nldd-tag variant="success" text="OK"></nldd-tag>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('success');
	});

	it('renders icon when provided', async () => {
		el = await fixture('<nldd-tag icon="check-mark" text="Done"></nldd-tag>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('nldd-icon');
		expect(icon).not.toBeNull();
		expect(icon!.getAttribute('name')).toBe('check-mark');
	});

	it('sets aria-label and role=img on icon-only tag with accessible-label', async () => {
		el = await fixture('<nldd-tag icon="check-mark" accessible-label="Geverifieerd"></nldd-tag>');
		await waitForUpdate(el);
		const tag = el.shadowRoot!.querySelector('.tag')!;
		expect(tag.getAttribute('aria-label')).toBe('Geverifieerd');
		expect(tag.getAttribute('role')).toBe('img');
	});

	it('does not set role=img or aria-label when visible text is present', async () => {
		el = await fixture('<nldd-tag icon="check-mark" text="Done" accessible-label="Geverifieerd"></nldd-tag>');
		await waitForUpdate(el);
		const tag = el.shadowRoot!.querySelector('.tag')!;
		expect(tag.hasAttribute('role')).toBe(false);
		expect(tag.hasAttribute('aria-label')).toBe(false);
	});
});
