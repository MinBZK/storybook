import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './ndd-drag-handle-cell.ts';
import { nddDragHandleCellTranslations } from './ndd-drag-handle-cell.i18n.ts';

describe('ndd-drag-handle-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-drag-handle-cell></ndd-drag-handle-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the sm size', async () => {
		el = await fixture('<ndd-drag-handle-cell size="sm"></ndd-drag-handle-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('uses the default label when not pressed', async () => {
		el = await fixture('<ndd-drag-handle-cell></ndd-drag-handle-cell>');
		await waitForUpdate(el);
		const control = el.shadowRoot!.querySelector('.drag-handle-cell__control');
		expect(control?.getAttribute('aria-label')).toBe(
			nddDragHandleCellTranslations['components.drag-handle-cell.label-text']
		);
	});

	it('applies a custom translation override', async () => {
		el = await fixture('<ndd-drag-handle-cell></ndd-drag-handle-cell>');
		(el as any).translations = {
			'components.drag-handle-cell.label-text': 'Aangepaste sleepgreep',
		};
		await waitForUpdate(el);
		const control = el.shadowRoot!.querySelector('.drag-handle-cell__control');
		expect(control?.getAttribute('aria-label')).toBe('Aangepaste sleepgreep');
	});
});
