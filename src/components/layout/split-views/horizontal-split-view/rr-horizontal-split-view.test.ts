import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-horizontal-split-view.ts';

describe('rr-horizontal-split-view', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-horizontal-split-view></rr-horizontal-split-view>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
