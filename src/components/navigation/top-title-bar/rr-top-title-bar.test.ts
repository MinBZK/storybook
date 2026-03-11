import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-top-title-bar.ts';

describe('rr-top-title-bar', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-top-title-bar></rr-top-title-bar>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
