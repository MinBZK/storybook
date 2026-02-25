import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-title-cell.ts';

describe('rr-title-cell', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-title-cell></rr-title-cell>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
