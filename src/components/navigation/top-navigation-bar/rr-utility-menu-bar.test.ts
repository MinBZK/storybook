import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-utility-menu-bar.ts';

describe('rr-utility-menu-bar', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-utility-menu-bar></rr-utility-menu-bar>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
