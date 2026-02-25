import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-form-field.ts';

describe('rr-form-field', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-form-field></rr-form-field>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
