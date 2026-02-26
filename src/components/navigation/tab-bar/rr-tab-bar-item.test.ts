import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-tab-bar-item.ts';

describe('rr-tab-bar-item', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-tab-bar-item></rr-tab-bar-item>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
