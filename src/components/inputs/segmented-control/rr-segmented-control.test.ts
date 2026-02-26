import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRSegmentedControl } from './rr-segmented-control.ts';
import type { RRSegmentedControlItem } from './rr-segmented-control-item.ts';
import './rr-segmented-control.ts';

function threeItemFixture(selectedValue = 'a'): string {
  return `
    <rr-segmented-control value="${selectedValue}">
      <rr-segmented-control-item value="a">Alpha</rr-segmented-control-item>
      <rr-segmented-control-item value="b">Beta</rr-segmented-control-item>
      <rr-segmented-control-item value="c">Gamma</rr-segmented-control-item>
    </rr-segmented-control>
  `;
}

function getItems(el: RRSegmentedControl): RRSegmentedControlItem[] {
  return Array.from(el.querySelectorAll('rr-segmented-control-item'));
}

describe('rr-segmented-control', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-segmented-control></rr-segmented-control>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});

describe('rr-segmented-control – state sync & propagation', () => {
  let el: RRSegmentedControl;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('sets selected=true on the item matching value', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('b'));
    await waitForUpdate(el);

    const items = getItems(el);
    expect(items[0].selected).toBe(false);
    expect(items[1].selected).toBe(true);
    expect(items[2].selected).toBe(false);
  });

  it('updates child selected when parent value changes', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('a'));
    await waitForUpdate(el);

    el.value = 'c';
    await waitForUpdate(el);

    const items = getItems(el);
    expect(items[0].selected).toBe(false);
    expect(items[2].selected).toBe(true);
  });

  it('propagates size to items', async () => {
    el = await fixture<RRSegmentedControl>(`
      <rr-segmented-control value="a" size="sm">
        <rr-segmented-control-item value="a">A</rr-segmented-control-item>
        <rr-segmented-control-item value="b">B</rr-segmented-control-item>
      </rr-segmented-control>
    `);
    await waitForUpdate(el);

    const items = getItems(el);
    expect(items[0].size).toBe('sm');
    expect(items[1].size).toBe('sm');
  });

  it('disables all items when parent is disabled', async () => {
    el = await fixture<RRSegmentedControl>(`
      <rr-segmented-control value="a" disabled>
        <rr-segmented-control-item value="a">A</rr-segmented-control-item>
        <rr-segmented-control-item value="b">B</rr-segmented-control-item>
      </rr-segmented-control>
    `);
    await waitForUpdate(el);

    const items = getItems(el);
    expect(items[0].disabled).toBe(true);
    expect(items[1].disabled).toBe(true);
  });

  it('preserves item-level disabled when parent is not disabled', async () => {
    el = await fixture<RRSegmentedControl>(`
      <rr-segmented-control value="a">
        <rr-segmented-control-item value="a">A</rr-segmented-control-item>
        <rr-segmented-control-item value="b" disabled>B</rr-segmented-control-item>
        <rr-segmented-control-item value="c">C</rr-segmented-control-item>
      </rr-segmented-control>
    `);
    await waitForUpdate(el);

    const items = getItems(el);
    expect(items[0].disabled).toBe(false);
    expect(items[1].disabled).toBe(true);
    expect(items[2].disabled).toBe(false);
  });
});

describe('rr-segmented-control – click selection', () => {
  let el: RRSegmentedControl;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('fires change event when clicking an unselected item', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('a'));
    await waitForUpdate(el);

    let changeValue: string | undefined;
    el.addEventListener('change', ((e: CustomEvent) => {
      changeValue = e.detail.value;
    }) as EventListener);

    const items = getItems(el);
    items[1].click();
    await waitForUpdate(el);

    expect(changeValue).toBe('b');
    expect(el.value).toBe('b');
  });

  it('does NOT fire change when clicking the already selected item', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('a'));
    await waitForUpdate(el);

    let changeFired = false;
    el.addEventListener('change', () => { changeFired = true; });

    const items = getItems(el);
    items[0].click();
    await waitForUpdate(el);

    expect(changeFired).toBe(false);
  });

  it('ignores clicks when parent is disabled', async () => {
    el = await fixture<RRSegmentedControl>(`
      <rr-segmented-control value="a" disabled>
        <rr-segmented-control-item value="a">A</rr-segmented-control-item>
        <rr-segmented-control-item value="b">B</rr-segmented-control-item>
      </rr-segmented-control>
    `);
    await waitForUpdate(el);

    let changeFired = false;
    el.addEventListener('change', () => { changeFired = true; });

    // Dispatch a manual select event like the item would
    el.dispatchEvent(new CustomEvent('select', {
      detail: { value: 'b' },
      bubbles: true,
      composed: true,
    }));
    await waitForUpdate(el);

    expect(changeFired).toBe(false);
    expect(el.value).toBe('a');
  });
});

describe('rr-segmented-control – keyboard navigation', () => {
  let el: RRSegmentedControl;

  afterEach(() => {
    if (el) cleanup(el);
  });

  function pressKey(target: Element, key: string) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
  }

  it('ArrowRight selects next item', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('a'));
    await waitForUpdate(el);

    pressKey(el, 'ArrowRight');
    await waitForUpdate(el);

    expect(el.value).toBe('b');
  });

  it('ArrowLeft selects previous item', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('b'));
    await waitForUpdate(el);

    pressKey(el, 'ArrowLeft');
    await waitForUpdate(el);

    expect(el.value).toBe('a');
  });

  it('ArrowRight wraps from last to first', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('c'));
    await waitForUpdate(el);

    pressKey(el, 'ArrowRight');
    await waitForUpdate(el);

    expect(el.value).toBe('a');
  });

  it('ArrowLeft wraps from first to last', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('a'));
    await waitForUpdate(el);

    pressKey(el, 'ArrowLeft');
    await waitForUpdate(el);

    expect(el.value).toBe('c');
  });

  it('Home selects first item', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('c'));
    await waitForUpdate(el);

    pressKey(el, 'Home');
    await waitForUpdate(el);

    expect(el.value).toBe('a');
  });

  it('End selects last item', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('a'));
    await waitForUpdate(el);

    pressKey(el, 'End');
    await waitForUpdate(el);

    expect(el.value).toBe('c');
  });

  it('skips disabled items in keyboard navigation', async () => {
    el = await fixture<RRSegmentedControl>(`
      <rr-segmented-control value="a">
        <rr-segmented-control-item value="a">A</rr-segmented-control-item>
        <rr-segmented-control-item value="b" disabled>B</rr-segmented-control-item>
        <rr-segmented-control-item value="c">C</rr-segmented-control-item>
      </rr-segmented-control>
    `);
    await waitForUpdate(el);

    pressKey(el, 'ArrowRight');
    await waitForUpdate(el);

    // Should skip disabled "b" and go to "c"
    expect(el.value).toBe('c');
  });
});

describe('rr-segmented-control – ARIA roles & state', () => {
  let el: RRSegmentedControl;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('has role="radiogroup" on the parent', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('a'));
    await waitForUpdate(el);

    expect(el.getAttribute('role')).toBe('radiogroup');
  });

  it('has role="radio" on each item', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('a'));
    await waitForUpdate(el);

    const items = getItems(el);
    items.forEach(item => {
      expect(item.getAttribute('role')).toBe('radio');
    });
  });

  it('sets aria-checked and tabindex correctly', async () => {
    el = await fixture<RRSegmentedControl>(threeItemFixture('b'));
    await waitForUpdate(el);

    const items = getItems(el);
    // Selected item: aria-checked=true, tabindex=0
    expect(items[1].getAttribute('aria-checked')).toBe('true');
    expect(items[1].getAttribute('tabindex')).toBe('0');

    // Non-selected items: aria-checked=false, tabindex=-1
    expect(items[0].getAttribute('aria-checked')).toBe('false');
    expect(items[0].getAttribute('tabindex')).toBe('-1');
    expect(items[2].getAttribute('aria-checked')).toBe('false');
    expect(items[2].getAttribute('tabindex')).toBe('-1');
  });
});

describe('rr-segmented-control – slotchange reactivity', () => {
  let el: RRSegmentedControl;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('dynamically added item receives size and disabled properties', async () => {
    el = await fixture<RRSegmentedControl>(`
      <rr-segmented-control value="a" size="sm">
        <rr-segmented-control-item value="a">A</rr-segmented-control-item>
      </rr-segmented-control>
    `);
    await waitForUpdate(el);

    const newItem = document.createElement('rr-segmented-control-item') as RRSegmentedControlItem;
    newItem.value = 'b';
    newItem.textContent = 'B';
    el.appendChild(newItem);

    await waitForUpdate(el);

    expect(newItem.size).toBe('sm');
    expect(newItem.selected).toBe(false);
  });
});
