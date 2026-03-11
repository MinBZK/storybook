import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-list-item-drag-handle.ts';

describe('rr-list-item-drag-handle', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-list-item-drag-handle></rr-list-item-drag-handle>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
