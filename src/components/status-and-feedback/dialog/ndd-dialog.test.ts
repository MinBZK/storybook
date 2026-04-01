import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDDialog } from './ndd-dialog.ts';
import './ndd-dialog.ts';

describe('ndd-dialog', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders text as p when heading-level is not set', async () => {
		el = await fixture('<ndd-dialog text="Bevestiging vereist"></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('p.dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders text as h2 when heading-level="2"', async () => {
		el = await fixture('<ndd-dialog text="Bevestiging vereist" heading-level="2"></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('h2.dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders text as h3 when heading-level="3"', async () => {
		el = await fixture('<ndd-dialog text="Bevestiging vereist" heading-level="3"></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('h3.dialog__text')?.textContent?.trim()).toBe('Bevestiging vereist');
	});

	it('renders supporting-text when set', async () => {
		el = await fixture('<ndd-dialog supporting-text="Dit kan niet ongedaan worden gemaakt."></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.dialog__supporting-text')?.textContent?.trim()).toBe('Dit kan niet ongedaan worden gemaakt.');
	});

	it('does not render text element when text is absent', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.dialog__text')).toBeNull();
	});

	it('does not render supporting-text element when absent', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.dialog__supporting-text')).toBeNull();
	});

	it('renders icon when icon-name is set', async () => {
		el = await fixture('<ndd-dialog icon-name="check-mark-circle"></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.dialog__icon')).not.toBeNull();
	});

	it('does not render icon when icon-name is absent and no variant', async () => {
		el = await fixture('<ndd-dialog></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.dialog__icon')).toBeNull();
	});

	it('forces icon-name to "alert" when variant="alert" and no explicit icon-name', async () => {
		el = await fixture('<ndd-dialog variant="alert"></ndd-dialog>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('ndd-icon');
		expect(icon?.getAttribute('name')).toBe('alert');
	});

	it('variant="alert" always overrides explicit icon-name', async () => {
		el = await fixture('<ndd-dialog variant="alert" icon-name="info-circle"></ndd-dialog>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('ndd-icon');
		expect(icon?.getAttribute('name')).toBe('alert');
	});

	it('reflects variant attribute', async () => {
		el = await fixture('<ndd-dialog variant="alert"></ndd-dialog>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('alert');
	});

	it('renders actions slot wrapped in ndd-button-group', async () => {
		el = await fixture(`
			<ndd-dialog>
				<ndd-button slot="actions" variant="primary" text="Bevestig"></ndd-button>
			</ndd-dialog>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('ndd-button-group')).not.toBeNull();
	});
});
