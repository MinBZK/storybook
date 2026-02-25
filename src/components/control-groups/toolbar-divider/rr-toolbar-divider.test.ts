import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-toolbar-divider.ts';

describe('rr-toolbar-divider', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-toolbar-divider></rr-toolbar-divider>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
