import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-divider.ts';

describe('rr-divider', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-divider></rr-divider>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
