import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-password-field.ts';

describe('rr-password-field', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-password-field></rr-password-field>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
