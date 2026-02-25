import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRDocumentTabBar } from './rr-document-tab-bar.ts';
import './rr-document-tab-bar.ts';

function threeTabBar(): string {
  return `
    <rr-document-tab-bar>
      <rr-document-tab-bar-item selected>Doc A</rr-document-tab-bar-item>
      <rr-document-tab-bar-item>Doc B</rr-document-tab-bar-item>
      <rr-document-tab-bar-item>Doc C</rr-document-tab-bar-item>
    </rr-document-tab-bar>
  `;
}

function clickInner(item: Element) {
  const inner = item.shadowRoot!.querySelector('[part="item"]') as HTMLElement;
  inner.click();
}

function pressKey(target: Element, key: string) {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
}

describe('rr-document-tab-bar', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-document-tab-bar></rr-document-tab-bar>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});

describe('rr-document-tab-bar – ARIA & structure', () => {
  let el: RRDocumentTabBar;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('sets role="tablist" on host', async () => {
    el = await fixture<RRDocumentTabBar>(threeTabBar());
    await waitForUpdate(el);

    expect(el.getAttribute('role')).toBe('tablist');
  });
});

describe('rr-document-tab-bar – item selection', () => {
  let el: RRDocumentTabBar;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('deselects other items when one is selected via click', async () => {
    el = await fixture<RRDocumentTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-document-tab-bar-item');
    expect(items[0].hasAttribute('selected')).toBe(true);

    // Click the inner element of the second item
    clickInner(items[1]);
    await waitForUpdate(el);

    expect(items[0].hasAttribute('selected')).toBe(false);
    expect(items[1].hasAttribute('selected')).toBe(true);
  });

  it('dispatches tabchange event on selection', async () => {
    el = await fixture<RRDocumentTabBar>(threeTabBar());
    await waitForUpdate(el);

    let detail: any;
    el.addEventListener('tabchange', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    clickInner(el.querySelectorAll('rr-document-tab-bar-item')[1]);
    await waitForUpdate(el);

    expect(detail).toBeDefined();
    expect(detail.item).toBe(el.querySelectorAll('rr-document-tab-bar-item')[1]);
  });
});

describe('rr-document-tab-bar – tab dismissal', () => {
  let el: RRDocumentTabBar;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('dispatches tabdismiss event when dismiss button is clicked', async () => {
    el = await fixture<RRDocumentTabBar>(threeTabBar());
    await waitForUpdate(el);

    let detail: any;
    el.addEventListener('tabdismiss', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    // Click the dismiss button in the first item's shadow DOM
    const firstItem = el.querySelectorAll('rr-document-tab-bar-item')[0];
    const dismissBtn = firstItem.shadowRoot!.querySelector('[part="dismiss"]') as HTMLElement;
    dismissBtn.click();
    await waitForUpdate(el);

    expect(detail).toBeDefined();
    expect(detail.item).toBe(firstItem);
  });

  it('dismiss click does not trigger tab selection', async () => {
    el = await fixture<RRDocumentTabBar>(threeTabBar());
    await waitForUpdate(el);

    let tabchangeFired = false;
    el.addEventListener('tabchange', () => { tabchangeFired = true; });

    const secondItem = el.querySelectorAll('rr-document-tab-bar-item')[1];
    const dismissBtn = secondItem.shadowRoot!.querySelector('[part="dismiss"]') as HTMLElement;
    dismissBtn.click();
    await waitForUpdate(el);

    // Selection should not change because dismiss stops propagation
    expect(tabchangeFired).toBe(false);
  });
});

describe('rr-document-tab-bar – keyboard navigation', () => {
  let el: RRDocumentTabBar;

  afterEach(() => {
    if (el) cleanup(el);
    vi.restoreAllMocks();
  });

  it('ArrowRight calls focus on next item', async () => {
    el = await fixture<RRDocumentTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-document-tab-bar-item');
    const spy = vi.spyOn(items[1] as HTMLElement, 'focus');

    pressKey(items[0], 'ArrowRight');
    expect(spy).toHaveBeenCalled();
  });

  it('ArrowLeft calls focus on previous item', async () => {
    el = await fixture<RRDocumentTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-document-tab-bar-item');
    const spy = vi.spyOn(items[0] as HTMLElement, 'focus');

    pressKey(items[1], 'ArrowLeft');
    expect(spy).toHaveBeenCalled();
  });

  it('ArrowRight wraps from last to first', async () => {
    el = await fixture<RRDocumentTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-document-tab-bar-item');
    const spy = vi.spyOn(items[0] as HTMLElement, 'focus');

    pressKey(items[2], 'ArrowRight');
    expect(spy).toHaveBeenCalled();
  });

  it('Home calls focus on first item', async () => {
    el = await fixture<RRDocumentTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-document-tab-bar-item');
    const spy = vi.spyOn(items[0] as HTMLElement, 'focus');

    pressKey(items[2], 'Home');
    expect(spy).toHaveBeenCalled();
  });

  it('End calls focus on last item', async () => {
    el = await fixture<RRDocumentTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-document-tab-bar-item');
    const spy = vi.spyOn(items[2] as HTMLElement, 'focus');

    pressKey(items[0], 'End');
    expect(spy).toHaveBeenCalled();
  });
});
