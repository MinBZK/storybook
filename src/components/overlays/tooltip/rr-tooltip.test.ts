import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-tooltip.ts';

describe('rr-tooltip', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-tooltip></rr-tooltip>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
