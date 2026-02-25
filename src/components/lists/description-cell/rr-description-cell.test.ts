import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-description-cell.ts';

describe('rr-description-cell', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-description-cell></rr-description-cell>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
