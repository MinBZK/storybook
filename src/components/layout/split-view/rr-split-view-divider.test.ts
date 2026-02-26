import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-split-view-divider.ts';

describe('rr-split-view-divider', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-split-view-divider></rr-split-view-divider>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
