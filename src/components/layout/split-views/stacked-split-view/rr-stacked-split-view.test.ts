import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-stacked-split-view.ts';

describe('rr-stacked-split-view', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-stacked-split-view></rr-stacked-split-view>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
