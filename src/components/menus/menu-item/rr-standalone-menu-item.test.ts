import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-standalone-menu-item.ts';

describe('rr-standalone-menu-item', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-standalone-menu-item></rr-standalone-menu-item>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
