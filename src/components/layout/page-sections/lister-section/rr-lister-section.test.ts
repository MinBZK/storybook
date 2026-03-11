import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-lister-section.ts';

describe('rr-lister-section', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-lister-section></rr-lister-section>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
