import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-segmented-control-item.ts';

describe('rr-segmented-control-item', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-segmented-control-item></rr-segmented-control-item>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
