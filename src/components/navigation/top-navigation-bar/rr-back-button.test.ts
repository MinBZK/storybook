import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-back-button.ts';

describe('rr-back-button', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-back-button></rr-back-button>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
