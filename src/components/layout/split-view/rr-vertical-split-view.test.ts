import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-vertical-split-view.ts';

describe('rr-vertical-split-view', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-vertical-split-view></rr-vertical-split-view>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
