import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-button-cell.ts';

describe('rr-button-cell', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-button-cell></rr-button-cell>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
