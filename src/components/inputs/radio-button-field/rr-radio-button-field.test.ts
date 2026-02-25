import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-radio-button-field.ts';

describe('rr-radio-button-field', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-radio-button-field></rr-radio-button-field>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
