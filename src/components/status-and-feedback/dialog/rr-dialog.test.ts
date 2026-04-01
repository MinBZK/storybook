import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRDialog } from './rr-dialog.ts';
import './rr-dialog.ts';

describe('rr-dialog', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-dialog></rr-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders text as p when heading-level is not set', async () => {
		el = await fixture('<rr-dialog text="Bevestiging vereist"></rr-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('p.dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders text as h2 when heading-level="2"', async () => {
		el = await fixture('<rr-dialog text="Bevestiging vereist" heading-level="2"></rr-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('h2.dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders text as h3 when heading-level="3"', async () => {
		el = await fixture('<rr-dialog text="Bevestiging vereist" heading-level="3"></rr-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('h3.dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders supporting-text when set', async () => {
		el = await fixture('<rr-dialog supporting-text="Dit kan niet ongedaan worden gemaakt."></rr-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.dialog__supporting-text')?.textContent?.trim()).toBe('Dit kan niet ongedaan worden gemaakt.');
	});

	it('does not render text element when text is absent', async () => {
		el = await fixture('<rr-dialog></rr-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.dialog__text')).toBeNull();
	});

	it('does not render supporting-text element when absent', async () => {
		el = await fixture('<rr-dialog></rr-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.dialog__supporting-text')).toBeNull();
	});

	it('renders icon when icon-name is set', async () => {
		el = await fixture('<rr-dialog icon-name="check-mark-circle"></rr-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.dialog__icon')).not.toBeNull();
	});

	it('does not render icon when icon-name is absent and no variant', async () => {
		el = await fixture('<rr-dialog></rr-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.dialog__icon')).toBeNull();
	});

	it('forces icon-name to "alert" when variant="alert" and no explicit icon-name', async () => {
		el = await fixture('<rr-dialog variant="alert"></rr-dialog>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('rr-icon');
		expect(icon?.getAttribute('name')).toBe('alert');
	});

	it('variant="alert" always overrides explicit icon-name', async () => {
		el = await fixture('<rr-dialog variant="alert" icon-name="info-circle"></rr-dialog>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('rr-icon');
		expect(icon?.getAttribute('name')).toBe('alert');
	});

	it('reflects variant attribute', async () => {
		el = await fixture('<rr-dialog variant="alert"></rr-dialog>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('alert');
	});

	it('renders actions slot wrapped in rr-button-group', async () => {
		el = await fixture(`
			<rr-dialog>
				<rr-button slot="actions" variant="primary" text="Bevestig"></rr-button>
			</rr-dialog>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-button-group')).not.toBeNull();
	});
});
