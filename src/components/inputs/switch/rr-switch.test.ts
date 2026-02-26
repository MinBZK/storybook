import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRSwitch } from './rr-switch.ts';
import './rr-switch.ts';

describe('rr-switch', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-switch></rr-switch>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});

describe('rr-switch – ARIA roles & state', () => {
  let el: RRSwitch;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('sets role="switch" on host', async () => {
    el = await fixture<RRSwitch>('<rr-switch></rr-switch>');
    await waitForUpdate(el);

    expect(el.getAttribute('role')).toBe('switch');
  });

  it('sets aria-checked="false" when unchecked', async () => {
    el = await fixture<RRSwitch>('<rr-switch></rr-switch>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-checked')).toBe('false');
  });

  it('sets aria-checked="true" when checked', async () => {
    el = await fixture<RRSwitch>('<rr-switch checked></rr-switch>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('updates aria-checked when toggled programmatically', async () => {
    el = await fixture<RRSwitch>('<rr-switch></rr-switch>');
    await waitForUpdate(el);

    el.checked = true;
    await waitForUpdate(el);

    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('sets tabindex="0" when not disabled', async () => {
    el = await fixture<RRSwitch>('<rr-switch></rr-switch>');
    await waitForUpdate(el);

    expect(el.getAttribute('tabindex')).toBe('0');
  });

  it('removes tabindex when disabled', async () => {
    el = await fixture<RRSwitch>('<rr-switch disabled></rr-switch>');
    await waitForUpdate(el);

    expect(el.hasAttribute('tabindex')).toBe(false);
  });

  it('restores tabindex when re-enabled', async () => {
    el = await fixture<RRSwitch>('<rr-switch disabled></rr-switch>');
    await waitForUpdate(el);

    el.disabled = false;
    await waitForUpdate(el);

    expect(el.getAttribute('tabindex')).toBe('0');
  });

  it('sets aria-disabled when disabled', async () => {
    el = await fixture<RRSwitch>('<rr-switch disabled></rr-switch>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-disabled')).toBe('true');
  });
});

describe('rr-switch – click toggle', () => {
  let el: RRSwitch;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('toggles checked on click', async () => {
    el = await fixture<RRSwitch>('<rr-switch></rr-switch>');
    await waitForUpdate(el);

    el.click();
    await waitForUpdate(el);

    expect(el.checked).toBe(true);
    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('toggles back off on second click', async () => {
    el = await fixture<RRSwitch>('<rr-switch checked></rr-switch>');
    await waitForUpdate(el);

    el.click();
    await waitForUpdate(el);

    expect(el.checked).toBe(false);
  });

  it('dispatches change event with checked detail', async () => {
    el = await fixture<RRSwitch>('<rr-switch></rr-switch>');
    await waitForUpdate(el);

    let detail: any;
    el.addEventListener('change', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    el.click();
    expect(detail).toBeDefined();
    expect(detail.checked).toBe(true);
  });

  it('does not toggle when disabled', async () => {
    el = await fixture<RRSwitch>('<rr-switch disabled></rr-switch>');
    await waitForUpdate(el);

    el.click();
    await waitForUpdate(el);

    expect(el.checked).toBe(false);
  });

  it('does not dispatch change when disabled', async () => {
    el = await fixture<RRSwitch>('<rr-switch disabled></rr-switch>');
    await waitForUpdate(el);

    let changeFired = false;
    el.addEventListener('change', () => { changeFired = true; });

    el.click();
    expect(changeFired).toBe(false);
  });
});

describe('rr-switch – keyboard', () => {
  let el: RRSwitch;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('Space toggles the switch', async () => {
    el = await fixture<RRSwitch>('<rr-switch></rr-switch>');
    await waitForUpdate(el);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await waitForUpdate(el);

    expect(el.checked).toBe(true);
  });

  it('Enter does NOT toggle the switch (not standard for switch role)', async () => {
    el = await fixture<RRSwitch>('<rr-switch></rr-switch>');
    await waitForUpdate(el);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await waitForUpdate(el);

    expect(el.checked).toBe(false);
  });

  it('Space does nothing when disabled', async () => {
    el = await fixture<RRSwitch>('<rr-switch disabled></rr-switch>');
    await waitForUpdate(el);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await waitForUpdate(el);

    expect(el.checked).toBe(false);
  });
});
