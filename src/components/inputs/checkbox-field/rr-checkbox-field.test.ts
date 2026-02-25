import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-checkbox-field.ts';

describe('rr-checkbox-field', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-checkbox-field></rr-checkbox-field>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
