import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-drag-handle-cell.ts';
import { rrDragHandleCellTranslations } from './rr-drag-handle-cell.i18n.ts';

describe('rr-drag-handle-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-drag-handle-cell></rr-drag-handle-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the sm size', async () => {
		el = await fixture('<rr-drag-handle-cell size="sm"></rr-drag-handle-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('uses the default label when not pressed', async () => {
		el = await fixture('<rr-drag-handle-cell></rr-drag-handle-cell>');
		await waitForUpdate(el);
		const control = el.shadowRoot!.querySelector('.drag-handle-cell__control');
		expect(control?.getAttribute('aria-label')).toBe(
			rrDragHandleCellTranslations['components.drag-handle-cell.label-text'],
		);
	});

	it('uses the pressed label when pressed=true', async () => {
		el = await fixture('<rr-drag-handle-cell pressed></rr-drag-handle-cell>');
		await waitForUpdate(el);
		const control = el.shadowRoot!.querySelector('.drag-handle-cell__control');
		expect(control?.getAttribute('aria-label')).toBe(
			rrDragHandleCellTranslations['components.drag-handle-cell.label-pressed-text'],
		);
	});

	it('sets aria-pressed="true" when pressed', async () => {
		el = await fixture('<rr-drag-handle-cell pressed></rr-drag-handle-cell>');
		await waitForUpdate(el);
		const control = el.shadowRoot!.querySelector('.drag-handle-cell__control');
		expect(control?.getAttribute('aria-pressed')).toBe('true');
	});

	it('sets aria-pressed="false" when not pressed', async () => {
		el = await fixture('<rr-drag-handle-cell></rr-drag-handle-cell>');
		await waitForUpdate(el);
		const control = el.shadowRoot!.querySelector('.drag-handle-cell__control');
		expect(control?.getAttribute('aria-pressed')).toBe('false');
	});

	it('applies a custom translation override', async () => {
		el = await fixture('<rr-drag-handle-cell></rr-drag-handle-cell>');
		(el as any).translations = {
			'components.drag-handle-cell.label-text': 'Aangepaste sleepgreep',
		};
		await waitForUpdate(el);
		const control = el.shadowRoot!.querySelector('.drag-handle-cell__control');
		expect(control?.getAttribute('aria-label')).toBe('Aangepaste sleepgreep');
	});
});
