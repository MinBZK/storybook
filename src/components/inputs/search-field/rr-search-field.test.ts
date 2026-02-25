import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-search-field.ts';

describe('rr-search-field', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-search-field></rr-search-field>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
