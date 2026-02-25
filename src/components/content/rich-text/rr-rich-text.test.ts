import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-rich-text.ts';

describe('rr-rich-text', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-rich-text></rr-rich-text>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
