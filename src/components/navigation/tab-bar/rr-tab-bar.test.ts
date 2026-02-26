import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRTabBar } from './rr-tab-bar.ts';
import './rr-tab-bar.ts';

function threeTabBar(): string {
  return `
    <rr-tab-bar>
      <rr-tab-bar-item>Tab A</rr-tab-bar-item>
      <rr-tab-bar-item selected>Tab B</rr-tab-bar-item>
      <rr-tab-bar-item>Tab C</rr-tab-bar-item>
    </rr-tab-bar>
  `;
}

function clickInner(item: Element) {
  const inner = item.shadowRoot!.querySelector('[role="tab"]') as HTMLElement;
  inner.click();
}

function pressKey(target: Element, key: string) {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
}

describe('rr-tab-bar', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-tab-bar></rr-tab-bar>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});

describe('rr-tab-bar – ARIA & structure', () => {
  let el: RRTabBar;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('sets role="tablist" on host', async () => {
    el = await fixture<RRTabBar>(threeTabBar());
    await waitForUpdate(el);

    expect(el.getAttribute('role')).toBe('tablist');
  });
});

describe('rr-tab-bar – item selection', () => {
  let el: RRTabBar;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('deselects other items when one is selected', async () => {
    el = await fixture<RRTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-tab-bar-item');
    expect(items[1].hasAttribute('selected')).toBe(true);

    // Click the inner button of the third item
    clickInner(items[2]);
    await waitForUpdate(el);

    expect(items[1].hasAttribute('selected')).toBe(false);
    expect(items[2].hasAttribute('selected')).toBe(true);
  });

  it('dispatches tabchange event', async () => {
    el = await fixture<RRTabBar>(threeTabBar());
    await waitForUpdate(el);

    let detail: any;
    el.addEventListener('tabchange', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    clickInner(el.querySelectorAll('rr-tab-bar-item')[0]);
    await waitForUpdate(el);

    expect(detail).toBeDefined();
    expect(detail.item).toBe(el.querySelectorAll('rr-tab-bar-item')[0]);
  });

  it('does not dispatch when disabled item is clicked', async () => {
    el = await fixture<RRTabBar>(`
      <rr-tab-bar>
        <rr-tab-bar-item selected>A</rr-tab-bar-item>
        <rr-tab-bar-item disabled>B</rr-tab-bar-item>
      </rr-tab-bar>
    `);
    await waitForUpdate(el);

    let changeFired = false;
    el.addEventListener('tabchange', () => { changeFired = true; });

    clickInner(el.querySelectorAll('rr-tab-bar-item')[1]);
    await waitForUpdate(el);

    expect(changeFired).toBe(false);
  });
});

describe('rr-tab-bar – keyboard navigation', () => {
  let el: RRTabBar;

  afterEach(() => {
    if (el) cleanup(el);
    vi.restoreAllMocks();
  });

  it('ArrowRight calls focus on next item', async () => {
    el = await fixture<RRTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-tab-bar-item');
    const spy = vi.spyOn(items[1] as HTMLElement, 'focus');

    pressKey(items[0], 'ArrowRight');
    expect(spy).toHaveBeenCalled();
  });

  it('ArrowLeft calls focus on previous item', async () => {
    el = await fixture<RRTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-tab-bar-item');
    const spy = vi.spyOn(items[0] as HTMLElement, 'focus');

    pressKey(items[1], 'ArrowLeft');
    expect(spy).toHaveBeenCalled();
  });

  it('ArrowRight wraps from last to first', async () => {
    el = await fixture<RRTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-tab-bar-item');
    const spy = vi.spyOn(items[0] as HTMLElement, 'focus');

    pressKey(items[2], 'ArrowRight');
    expect(spy).toHaveBeenCalled();
  });

  it('ArrowLeft wraps from first to last', async () => {
    el = await fixture<RRTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-tab-bar-item');
    const spy = vi.spyOn(items[2] as HTMLElement, 'focus');

    pressKey(items[0], 'ArrowLeft');
    expect(spy).toHaveBeenCalled();
  });

  it('Home calls focus on first item', async () => {
    el = await fixture<RRTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-tab-bar-item');
    const spy = vi.spyOn(items[0] as HTMLElement, 'focus');

    pressKey(items[2], 'Home');
    expect(spy).toHaveBeenCalled();
  });

  it('End calls focus on last item', async () => {
    el = await fixture<RRTabBar>(threeTabBar());
    await waitForUpdate(el);

    const items = el.querySelectorAll('rr-tab-bar-item');
    const spy = vi.spyOn(items[2] as HTMLElement, 'focus');

    pressKey(items[0], 'End');
    expect(spy).toHaveBeenCalled();
  });
});
