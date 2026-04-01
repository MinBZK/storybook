import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-tooltip.ts';

describe('ndd-tooltip', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<ndd-tooltip></ndd-tooltip>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
