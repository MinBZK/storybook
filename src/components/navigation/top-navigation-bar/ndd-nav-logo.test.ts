import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-nav-logo.ts';

describe('ndd-nav-logo', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<ndd-nav-logo></ndd-nav-logo>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
