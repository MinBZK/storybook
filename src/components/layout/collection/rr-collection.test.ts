import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-collection.ts';

describe('rr-collection', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-collection></rr-collection>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
