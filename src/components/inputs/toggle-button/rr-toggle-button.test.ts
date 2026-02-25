import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-toggle-button.ts';

describe('rr-toggle-button', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-toggle-button></rr-toggle-button>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
