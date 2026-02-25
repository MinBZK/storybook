import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-input-field-button.ts';

describe('rr-input-field-button', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-input-field-button></rr-input-field-button>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
