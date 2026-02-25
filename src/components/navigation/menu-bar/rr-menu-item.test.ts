import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRMenuItem } from './rr-menu-item.ts';
import './rr-menu-item.ts';

describe('rr-menu-item', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-menu-item></rr-menu-item>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});

describe('rr-menu-item – rendering modes', () => {
  let el: RRMenuItem;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders as button when no href is set', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item>Home</rr-menu-item>');
    await waitForUpdate(el);

    const btn = el.shadowRoot!.querySelector('button');
    const link = el.shadowRoot!.querySelector('a');
    expect(btn).not.toBeNull();
    expect(link).toBeNull();
  });

  it('renders as link when href is set', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item href="/about">About</rr-menu-item>');
    await waitForUpdate(el);

    const link = el.shadowRoot!.querySelector('a');
    const btn = el.shadowRoot!.querySelector('button');
    expect(link).not.toBeNull();
    expect(link!.getAttribute('href')).toBe('/about');
    expect(btn).toBeNull();
  });

  it('sets role="none" on host', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item>Test</rr-menu-item>');
    await waitForUpdate(el);

    expect(el.getAttribute('role')).toBe('none');
  });

  it('sets aria-current="page" when selected', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item selected>Test</rr-menu-item>');
    await waitForUpdate(el);

    const btn = el.shadowRoot!.querySelector('button');
    expect(btn!.getAttribute('aria-current')).toBe('page');
  });

  it('does not set aria-current when not selected', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item>Test</rr-menu-item>');
    await waitForUpdate(el);

    const btn = el.shadowRoot!.querySelector('button');
    expect(btn!.hasAttribute('aria-current')).toBe(false);
  });
});

describe('rr-menu-item – URL sanitization (security)', () => {
  let el: RRMenuItem;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('blocks javascript: URLs', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item href="javascript:alert(1)">XSS</rr-menu-item>');
    await waitForUpdate(el);

    // Should fall back to button mode (no link rendered)
    const link = el.shadowRoot!.querySelector('a');
    const btn = el.shadowRoot!.querySelector('button');
    expect(link).toBeNull();
    expect(btn).not.toBeNull();
  });

  it('blocks JavaScript: with mixed case', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item href="JavaScript:void(0)">XSS</rr-menu-item>');
    await waitForUpdate(el);

    expect(el.shadowRoot!.querySelector('a')).toBeNull();
    expect(el.shadowRoot!.querySelector('button')).not.toBeNull();
  });

  it('blocks data: URLs', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item href="data:text/html,<script>alert(1)</script>">XSS</rr-menu-item>');
    await waitForUpdate(el);

    expect(el.shadowRoot!.querySelector('a')).toBeNull();
  });

  it('blocks vbscript: URLs', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item href="vbscript:MsgBox(1)">XSS</rr-menu-item>');
    await waitForUpdate(el);

    expect(el.shadowRoot!.querySelector('a')).toBeNull();
  });

  it('blocks javascript: with leading whitespace', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item href="  javascript:alert(1)">XSS</rr-menu-item>');
    await waitForUpdate(el);

    expect(el.shadowRoot!.querySelector('a')).toBeNull();
  });

  it('allows safe http URLs', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item href="https://example.com">Safe</rr-menu-item>');
    await waitForUpdate(el);

    const link = el.shadowRoot!.querySelector('a');
    expect(link).not.toBeNull();
    expect(link!.getAttribute('href')).toBe('https://example.com');
  });

  it('allows relative URLs', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item href="/about">About</rr-menu-item>');
    await waitForUpdate(el);

    const link = el.shadowRoot!.querySelector('a');
    expect(link).not.toBeNull();
    expect(link!.getAttribute('href')).toBe('/about');
  });
});

describe('rr-menu-item – click behavior', () => {
  let el: RRMenuItem;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('dispatches select event on click (button mode)', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item>Home</rr-menu-item>');
    await waitForUpdate(el);

    let detail: any;
    el.addEventListener('select', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    el.click();
    expect(detail).toBeDefined();
    expect(detail.item).toBe(el);
    expect(el.selected).toBe(true);
  });

  it('does not dispatch select when disabled', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item disabled>Home</rr-menu-item>');
    await waitForUpdate(el);

    let selectFired = false;
    el.addEventListener('select', () => { selectFired = true; });

    el.click();
    expect(selectFired).toBe(false);
  });

  it('Enter key triggers click handler', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item>Home</rr-menu-item>');
    await waitForUpdate(el);

    let selectFired = false;
    el.addEventListener('select', () => { selectFired = true; });

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(selectFired).toBe(true);
  });

  it('Space key triggers click handler', async () => {
    el = await fixture<RRMenuItem>('<rr-menu-item>Home</rr-menu-item>');
    await waitForUpdate(el);

    let selectFired = false;
    el.addEventListener('select', () => { selectFired = true; });

    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(selectFired).toBe(true);
  });
});
