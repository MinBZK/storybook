import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-text-field.ts';

describe('rr-text-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-text-field></rr-text-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders valid icon when valid attribute is set', async () => {
		el = await fixture('<rr-text-field valid></rr-text-field>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.text-field__validation-icon-area rr-icon');
		expect(icon).not.toBeNull();
		expect(icon!.getAttribute('name')).toBe('valid');
	});

	it('renders invalid icon when invalid attribute is set', async () => {
		el = await fixture('<rr-text-field invalid></rr-text-field>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.text-field__validation-icon-area rr-icon');
		expect(icon).not.toBeNull();
		expect(icon!.getAttribute('name')).toBe('invalid');
	});

	it('does not render validation icon in neutral state', async () => {
		el = await fixture('<rr-text-field></rr-text-field>');
		await waitForUpdate(el);
		const area = el.shadowRoot!.querySelector('.text-field__validation-icon-area');
		expect(area).toBeNull();
	});

	it('dispatches custom input event on input', async () => {
		el = await fixture('<rr-text-field></rr-text-field>');
		await waitForUpdate(el);
		const handler = vi.fn();
		el.addEventListener('input', handler);
		const input = el.shadowRoot!.querySelector('input')!;
		input.value = 'hello';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		expect(handler).toHaveBeenCalledOnce();
		expect(handler.mock.calls[0][0].detail.value).toBe('hello');
	});

	it('dispatches custom change event on change', async () => {
		el = await fixture('<rr-text-field></rr-text-field>');
		await waitForUpdate(el);
		const handler = vi.fn();
		el.addEventListener('change', handler);
		const input = el.shadowRoot!.querySelector('input')!;
		input.value = 'world';
		input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		expect(handler).toHaveBeenCalledOnce();
		expect(handler.mock.calls[0][0].detail.value).toBe('world');
	});

	it('does not double-fire input event', async () => {
		el = await fixture('<rr-text-field></rr-text-field>');
		await waitForUpdate(el);
		const handler = vi.fn();
		el.addEventListener('input', handler);
		const input = el.shadowRoot!.querySelector('input')!;
		input.value = 'test';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		expect(handler).toHaveBeenCalledOnce();
	});

	it('reflects disabled attribute to host', async () => {
		el = await fixture('<rr-text-field disabled></rr-text-field>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(true);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.disabled).toBe(true);
	});

	it('reflects readonly attribute to host', async () => {
		el = await fixture('<rr-text-field readonly></rr-text-field>');
		await waitForUpdate(el);
		expect(el.hasAttribute('readonly')).toBe(true);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.readOnly).toBe(true);
	});

	it('reflects size attribute to host', async () => {
		el = await fixture('<rr-text-field size="sm"></rr-text-field>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('sm');
	});

	it('forwards accessible-label to the inner input', async () => {
		el = await fixture('<rr-text-field accessible-label="Zoeken"></rr-text-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.getAttribute('aria-label')).toBe('Zoeken');
	});

	it('accepts aria-describedby on the host element', async () => {
		el = await fixture('<rr-text-field aria-describedby="help-1 err-1"></rr-text-field>');
		await waitForUpdate(el);
		expect(el.getAttribute('aria-describedby')).toBe('help-1 err-1');
	});

	it('forwards error-message-ids to inner input aria-describedby', async () => {
		el = await fixture('<rr-text-field error-message-ids="help-1 err-1"></rr-text-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.getAttribute('aria-describedby')).toBe('help-1 err-1');
	});

	it('omits aria-describedby from inner input when error-message-ids not set', async () => {
		el = await fixture('<rr-text-field></rr-text-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.hasAttribute('aria-describedby')).toBe(false);
	});
});
