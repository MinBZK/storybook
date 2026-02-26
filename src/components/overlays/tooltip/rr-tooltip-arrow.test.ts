import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-tooltip-arrow.ts';

describe('rr-tooltip-arrow', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-tooltip-arrow></rr-tooltip-arrow>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
