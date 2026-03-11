import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-one-half-one-half-section.ts';

describe('rr-one-half-one-half-section', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-one-half-one-half-section></rr-one-half-one-half-section>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
