import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRCheckbox } from './rr-checkbox.ts';
import './rr-checkbox.ts';

describe('rr-checkbox', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-checkbox></rr-checkbox>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});

describe('rr-checkbox – ARIA roles & state', () => {
  let el: RRCheckbox;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('sets role="checkbox" on host', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox></rr-checkbox>');
    await waitForUpdate(el);

    expect(el.getAttribute('role')).toBe('checkbox');
  });

  it('sets aria-checked="false" when unchecked', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox></rr-checkbox>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-checked')).toBe('false');
  });

  it('sets aria-checked="true" when checked', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox checked></rr-checkbox>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('sets aria-checked="mixed" when indeterminate', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox indeterminate></rr-checkbox>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-checked')).toBe('mixed');
  });

  it('indeterminate takes precedence over checked for aria-checked', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox checked indeterminate></rr-checkbox>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-checked')).toBe('mixed');
  });

  it('sets tabindex="0" when not disabled', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox></rr-checkbox>');
    await waitForUpdate(el);

    expect(el.getAttribute('tabindex')).toBe('0');
  });

  it('removes tabindex when disabled', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox disabled></rr-checkbox>');
    await waitForUpdate(el);

    expect(el.hasAttribute('tabindex')).toBe(false);
  });

  it('sets aria-disabled when disabled', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox disabled></rr-checkbox>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-disabled')).toBe('true');
  });
});

describe('rr-checkbox – click toggle', () => {
  let el: RRCheckbox;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('toggles checked on click', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox></rr-checkbox>');
    await waitForUpdate(el);

    el.click();
    await waitForUpdate(el);

    expect(el.checked).toBe(true);
    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('toggles off on second click', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox checked></rr-checkbox>');
    await waitForUpdate(el);

    el.click();
    await waitForUpdate(el);

    expect(el.checked).toBe(false);
  });

  it('clears indeterminate on click', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox indeterminate></rr-checkbox>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-checked')).toBe('mixed');

    el.click();
    await waitForUpdate(el);

    expect(el.indeterminate).toBe(false);
    expect(el.checked).toBe(true);
    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('dispatches change event with checked and value', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox value="agree"></rr-checkbox>');
    await waitForUpdate(el);

    let detail: any;
    el.addEventListener('change', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    el.click();
    expect(detail).toBeDefined();
    expect(detail.checked).toBe(true);
    expect(detail.value).toBe('agree');
  });

  it('does not toggle when disabled', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox disabled></rr-checkbox>');
    await waitForUpdate(el);

    el.click();
    await waitForUpdate(el);

    expect(el.checked).toBe(false);
  });
});

describe('rr-checkbox – keyboard', () => {
  let el: RRCheckbox;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('Space toggles checkbox', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox></rr-checkbox>');
    await waitForUpdate(el);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await waitForUpdate(el);

    expect(el.checked).toBe(true);
  });

  it('Space does nothing when disabled', async () => {
    el = await fixture<RRCheckbox>('<rr-checkbox disabled></rr-checkbox>');
    await waitForUpdate(el);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await waitForUpdate(el);

    expect(el.checked).toBe(false);
  });
});
