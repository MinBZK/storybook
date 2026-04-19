import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './drag-handle-cell.js';
import { nlddDragHandleCellTranslations } from './drag-handle-cell.i18n.js';

describe('nldd-drag-handle-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-drag-handle-cell></nldd-drag-handle-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the sm size', async () => {
		el = await fixture('<nldd-drag-handle-cell size="sm"></nldd-drag-handle-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('uses the default label when not pressed', async () => {
		el = await fixture('<nldd-drag-handle-cell></nldd-drag-handle-cell>');
		await waitForUpdate(el);
		const control = el.shadowRoot!.querySelector('.drag-handle-cell__control');
		expect(control?.getAttribute('aria-label')).toBe(
			nlddDragHandleCellTranslations['components.drag-handle-cell.label-text'],
		);
	});

	it('applies a custom translation override', async () => {
		el = await fixture('<nldd-drag-handle-cell></nldd-drag-handle-cell>');
		(el as any).translations = {
			'components.drag-handle-cell.label-text': 'Aangepaste sleepgreep',
		};
		await waitForUpdate(el);
		const control = el.shadowRoot!.querySelector('.drag-handle-cell__control');
		expect(control?.getAttribute('aria-label')).toBe('Aangepaste sleepgreep');
	});
});
