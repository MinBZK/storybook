import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-dialog.ts';

describe('rr-dialog', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-dialog></rr-dialog>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
