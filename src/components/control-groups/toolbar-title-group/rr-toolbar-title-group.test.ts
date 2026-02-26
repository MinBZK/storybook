import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-toolbar-title-group.ts';

describe('rr-toolbar-title-group', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-toolbar-title-group></rr-toolbar-title-group>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
