import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-page-sticky-area-background.ts';

describe('rr-page-sticky-area-background', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-page-sticky-area-background></rr-page-sticky-area-background>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
