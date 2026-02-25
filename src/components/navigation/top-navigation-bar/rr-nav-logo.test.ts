import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-nav-logo.ts';

describe('rr-nav-logo', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-nav-logo></rr-nav-logo>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
