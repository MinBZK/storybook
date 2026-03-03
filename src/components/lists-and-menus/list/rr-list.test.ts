import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-list.ts';

describe('rr-list', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-list></rr-list>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
