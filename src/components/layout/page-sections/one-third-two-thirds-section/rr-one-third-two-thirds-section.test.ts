import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-one-third-two-thirds-section.ts';

describe('rr-one-third-two-thirds-section', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-one-third-two-thirds-section></rr-one-third-two-thirds-section>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
