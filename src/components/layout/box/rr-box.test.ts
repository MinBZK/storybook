import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-box.ts';

describe('rr-box', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-box></rr-box>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
