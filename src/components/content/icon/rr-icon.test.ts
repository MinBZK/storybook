import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-icon.ts';

describe('rr-icon', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-icon></rr-icon>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
