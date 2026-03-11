import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.ts';
import './rr-split-view-pane.ts';

describe('rr-split-view-pane', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-split-view-pane></rr-split-view-pane>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
