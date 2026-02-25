import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-token.ts';

describe('rr-token', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-token></rr-token>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
