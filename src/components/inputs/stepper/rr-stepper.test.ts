import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-stepper.ts';

describe('rr-stepper', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-stepper></rr-stepper>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});
