import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-list-item.ts';

describe('rr-list-item', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-list-item></rr-list-item>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
