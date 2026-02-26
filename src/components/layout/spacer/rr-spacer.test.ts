import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-spacer.ts';

describe('rr-spacer', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-spacer></rr-spacer>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
