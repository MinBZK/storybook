import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-two-thirds-one-third-section.ts';

describe('rr-two-thirds-one-third-section', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-two-thirds-one-third-section></rr-two-thirds-one-third-section>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
