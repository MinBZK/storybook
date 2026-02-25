import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-split-button.ts';

describe('rr-split-button', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-split-button></rr-split-button>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
