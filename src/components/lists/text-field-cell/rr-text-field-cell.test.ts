import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-text-field-cell.ts';

describe('rr-text-field-cell', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-text-field-cell></rr-text-field-cell>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
