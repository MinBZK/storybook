import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-side-by-side-split-view.ts';

describe('rr-side-by-side-split-view', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-side-by-side-split-view></rr-side-by-side-split-view>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
