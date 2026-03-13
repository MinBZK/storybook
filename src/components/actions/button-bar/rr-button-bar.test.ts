import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRButtonBar } from './rr-button-bar.ts';
import './rr-button-bar.ts';
import '../button/rr-button.ts';
import '../icon-button/rr-icon-button.ts';

describe('rr-button-bar', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-button-bar></rr-button-bar>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});

describe('rr-button-bar – child building & attribute propagation', () => {
  let el: RRButtonBar;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('assigns slot="child-N" to button children', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar>
        <rr-button>A</rr-button>
        <rr-button>B</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    const buttons = el.querySelectorAll('rr-button');
    expect(buttons[0].getAttribute('slot')).toBe('child-0');
    expect(buttons[1].getAttribute('slot')).toBe('child-1');
  });

  it('renders divider as separator in shadow DOM without slot on light DOM', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar>
        <rr-button>A</rr-button>
        <rr-button-bar-divider></rr-button-bar-divider>
        <rr-button>B</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    // Divider in light DOM should NOT have a slot attribute
    const divider = el.querySelector('rr-button-bar-divider')!;
    expect(divider.hasAttribute('slot')).toBe(false);

    // Shadow DOM should contain a divider
    const divider2 = el.shadowRoot!.querySelector('.button-bar__divider');
    expect(divider2).not.toBeNull();
  });

  it('treats rr-icon-button the same as rr-button', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar>
        <rr-icon-button><rr-icon name="heart"></rr-icon>Like</rr-icon-button>
        <rr-button>Text</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    const iconBtn = el.querySelector('rr-icon-button')!;
    const btn = el.querySelector('rr-button')!;

    expect(iconBtn.getAttribute('slot')).toBe('child-0');
    expect(btn.getAttribute('slot')).toBe('child-1');
  });

  it('cleans stale slot attrs before rebuild', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar>
        <rr-button>A</rr-button>
        <rr-button>B</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    const btnA = el.querySelectorAll('rr-button')[0];
    expect(btnA.getAttribute('slot')).toBe('child-0');

    // Add a third button — triggers rebuild via MO
    const btnC = document.createElement('rr-button');
    btnC.textContent = 'C';
    el.appendChild(btnC);

    await waitForUpdate(el);

    // All slots should be cleanly reassigned (0, 1, 2)
    const buttons = el.querySelectorAll('rr-button');
    expect(buttons[0].getAttribute('slot')).toBe('child-0');
    expect(buttons[1].getAttribute('slot')).toBe('child-1');
    expect(buttons[2].getAttribute('slot')).toBe('child-2');
  });

  it('propagates initial size to button children', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar size="sm">
        <rr-button>A</rr-button>
        <rr-icon-button><rr-icon name="x"></rr-icon>Close</rr-icon-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    expect(el.querySelector('rr-button')!.getAttribute('size')).toBe('sm');
    expect(el.querySelector('rr-icon-button')!.getAttribute('size')).toBe('sm');
  });

  it('propagates size change to children', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar size="md">
        <rr-button>A</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    expect(el.querySelector('rr-button')!.getAttribute('size')).toBe('md');

    el.size = 'xs';
    await waitForUpdate(el);

    expect(el.querySelector('rr-button')!.getAttribute('size')).toBe('xs');
  });

  it('propagates disabled to children', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar disabled>
        <rr-button>A</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    expect(el.querySelector('rr-button')!.hasAttribute('disabled')).toBe(true);
  });

  it('removes disabled from children when bar is re-enabled', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar disabled>
        <rr-button>A</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    expect(el.querySelector('rr-button')!.hasAttribute('disabled')).toBe(true);

    el.disabled = false;
    await waitForUpdate(el);

    expect(el.querySelector('rr-button')!.hasAttribute('disabled')).toBe(false);
  });

  it('updates slots when a child is added after mount', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar>
        <rr-button>A</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    const newBtn = document.createElement('rr-button');
    newBtn.textContent = 'B';
    el.appendChild(newBtn);

    await waitForUpdate(el);

    expect(newBtn.getAttribute('slot')).toBe('child-1');
    // Verify a corresponding named slot exists in shadow DOM
    const namedSlot = el.shadowRoot!.querySelector('slot[name="child-1"]');
    expect(namedSlot).not.toBeNull();
  });

  it('preserves individual variant set in markup', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar variant="neutral-tinted">
        <rr-button variant="accent-filled">Active</rr-button>
        <rr-button>Inactive</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    const buttons = el.querySelectorAll('rr-button');
    expect(buttons[0].getAttribute('variant')).toBe('accent-filled');
    expect(buttons[1].getAttribute('variant')).toBe('neutral-tinted');
  });

  it('preserves individual variant after bar variant changes', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar variant="neutral-tinted">
        <rr-button variant="accent-filled">Active</rr-button>
        <rr-button>Inactive</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    el.variant = 'accent-tinted';
    await waitForUpdate(el);

    const buttons = el.querySelectorAll('rr-button');
    // Individually-set variant should be preserved
    expect(buttons[0].getAttribute('variant')).toBe('accent-filled');
    // Non-individual button should follow the bar
    expect(buttons[1].getAttribute('variant')).toBe('accent-tinted');
  });

  it('preserves individual variant when variant is changed via setAttribute', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar variant="neutral-tinted">
        <rr-button>A</rr-button>
        <rr-button>B</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    // Simulate a framework (e.g. Vue) setting variant on one button
    const btnA = el.querySelectorAll('rr-button')[0];
    btnA.setAttribute('variant', 'accent-filled');

    // Trigger a rebuild by adding a new child
    const btnC = document.createElement('rr-button');
    btnC.textContent = 'C';
    el.appendChild(btnC);
    await waitForUpdate(el);

    // btnA's individual variant should be preserved
    expect(btnA.getAttribute('variant')).toBe('accent-filled');
    // btnC (new, no individual variant) should get bar's variant
    expect(btnC.getAttribute('variant')).toBe('neutral-tinted');
  });

  it('preserves individual variant set via setAttribute when bar variant changes', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar variant="neutral-tinted">
        <rr-button>A</rr-button>
        <rr-button>B</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    const btnA = el.querySelectorAll('rr-button')[0];
    btnA.setAttribute('variant', 'accent-filled');

    // Change bar variant WITHOUT adding a child
    el.variant = 'accent-tinted';
    await waitForUpdate(el);

    expect(btnA.getAttribute('variant')).toBe('accent-filled');
    expect(el.querySelectorAll('rr-button')[1].getAttribute('variant')).toBe('accent-tinted');
  });

  it('updates slots when a child is removed after mount', async () => {
    el = await fixture<RRButtonBar>(`
      <rr-button-bar>
        <rr-button>A</rr-button>
        <rr-button>B</rr-button>
      </rr-button-bar>
    `);
    await waitForUpdate(el);

    // Remove first button
    el.querySelector('rr-button')!.remove();

    await waitForUpdate(el);

    // Remaining button should be re-slotted as child-0
    const remaining = el.querySelector('rr-button')!;
    expect(remaining.getAttribute('slot')).toBe('child-0');
  });
});
