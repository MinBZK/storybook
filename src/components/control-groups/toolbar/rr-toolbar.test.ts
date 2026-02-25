import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-toolbar.ts';

describe('rr-toolbar', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-toolbar></rr-toolbar>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
