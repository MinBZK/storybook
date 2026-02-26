import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-title-bar-title-group.ts';

describe('rr-title-bar-title-group', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-title-bar-title-group></rr-title-bar-title-group>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
