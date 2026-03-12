import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-drag-handle-cell.ts';

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
});
