import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-button-group.ts';

describe('rr-button-group', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-button-group></rr-button-group>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
