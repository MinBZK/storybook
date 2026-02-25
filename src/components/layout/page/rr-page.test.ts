import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-page.ts';

describe('rr-page', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-page></rr-page>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
