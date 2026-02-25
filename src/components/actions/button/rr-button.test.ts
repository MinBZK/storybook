import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRButton } from './rr-button.ts';
import './rr-button.ts';

describe('rr-button', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-button></rr-button>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});

describe('rr-button – icon detection', () => {
  let el: RRButton;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders no shadow icons when there are no icons', async () => {
    el = await fixture<RRButton>('<rr-button>Click me</rr-button>');
    await waitForUpdate(el);

    const shadowIcons = el.shadowRoot!.querySelectorAll('.button__start-icon, .button__end-icon');
    expect(shadowIcons.length).toBe(0);
  });

  it('detects icon before text as start icon', async () => {
    el = await fixture<RRButton>(`
      <rr-button>
        <rr-icon name="heart"></rr-icon>
        Like
      </rr-button>
    `);
    await waitForUpdate(el);

    const startIcon = el.shadowRoot!.querySelector('.button__start-icon');
    const endIcon = el.shadowRoot!.querySelector('.button__end-icon');

    expect(startIcon).not.toBeNull();
    expect(startIcon!.getAttribute('name')).toBe('heart');
    expect(endIcon).toBeNull();
  });

  it('detects icon after text as end icon', async () => {
    el = await fixture<RRButton>(`
      <rr-button>
        Next
        <rr-icon name="arrow-right"></rr-icon>
      </rr-button>
    `);
    await waitForUpdate(el);

    const startIcon = el.shadowRoot!.querySelector('.button__start-icon');
    const endIcon = el.shadowRoot!.querySelector('.button__end-icon');

    expect(startIcon).toBeNull();
    expect(endIcon).not.toBeNull();
    expect(endIcon!.getAttribute('name')).toBe('arrow-right');
  });

  it('renders both start and end icons when surrounding text', async () => {
    el = await fixture<RRButton>(`
      <rr-button>
        <rr-icon name="heart"></rr-icon>
        Favorite
        <rr-icon name="chevron-down-small"></rr-icon>
      </rr-button>
    `);
    await waitForUpdate(el);

    const startIcon = el.shadowRoot!.querySelector('.button__start-icon');
    const endIcon = el.shadowRoot!.querySelector('.button__end-icon');

    expect(startIcon).not.toBeNull();
    expect(startIcon!.getAttribute('name')).toBe('heart');
    expect(endIcon).not.toBeNull();
    expect(endIcon!.getAttribute('name')).toBe('chevron-down-small');
  });

  it('warns and falls back when two icons are not surrounding the title', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    el = await fixture<RRButton>(`
      <rr-button>
        <rr-icon name="a"></rr-icon>
        <rr-icon name="b"></rr-icon>
        Text
      </rr-button>
    `);
    await waitForUpdate(el);

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Two rr-icon elements detected but they are not surrounding the title')
    );

    const startIcon = el.shadowRoot!.querySelector('.button__start-icon');
    const endIcon = el.shadowRoot!.querySelector('.button__end-icon');

    expect(startIcon).not.toBeNull();
    expect(startIcon!.getAttribute('name')).toBe('a');
    expect(endIcon).toBeNull();

    warnSpy.mockRestore();
  });

  it('warns and truncates when more than 2 icons are provided', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    el = await fixture<RRButton>(`
      <rr-button>
        <rr-icon name="a"></rr-icon>
        Text
        <rr-icon name="b"></rr-icon>
        <rr-icon name="c"></rr-icon>
      </rr-button>
    `);
    await waitForUpdate(el);

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Too many rr-icon elements')
    );

    warnSpy.mockRestore();
  });

  it('ignores whitespace-only text nodes in position calculation', async () => {
    el = await fixture<RRButton>(`<rr-button>
        <rr-icon name="star"></rr-icon>


        Rate
      </rr-button>`);
    await waitForUpdate(el);

    const startIcon = el.shadowRoot!.querySelector('.button__start-icon');
    expect(startIcon).not.toBeNull();
    expect(startIcon!.getAttribute('name')).toBe('star');
  });

  it('re-detects when an icon is dynamically added', async () => {
    el = await fixture<RRButton>('<rr-button>Click</rr-button>');
    await waitForUpdate(el);

    expect(el.shadowRoot!.querySelector('.button__start-icon')).toBeNull();

    // Dynamically prepend an icon
    const icon = document.createElement('rr-icon');
    icon.setAttribute('name', 'plus');
    el.prepend(icon);

    await waitForUpdate(el);

    const startIcon = el.shadowRoot!.querySelector('.button__start-icon');
    expect(startIcon).not.toBeNull();
    expect(startIcon!.getAttribute('name')).toBe('plus');
  });

  it('re-detects when an icon is dynamically removed', async () => {
    el = await fixture<RRButton>(`
      <rr-button>
        <rr-icon name="heart"></rr-icon>
        Like
      </rr-button>
    `);
    await waitForUpdate(el);

    expect(el.shadowRoot!.querySelector('.button__start-icon')).not.toBeNull();

    // Remove the icon
    el.querySelector('rr-icon')!.remove();

    await waitForUpdate(el);

    expect(el.shadowRoot!.querySelector('.button__start-icon')).toBeNull();
    expect(el.shadowRoot!.querySelector('.button__end-icon')).toBeNull();
  });

  it('disconnects observer when removed from DOM', async () => {
    el = await fixture<RRButton>('<rr-button>Test</rr-button>');
    await waitForUpdate(el);

    // Access the private _observer via any-cast
    const observer = (el as any)._observer as MutationObserver | null;
    expect(observer).not.toBeNull();

    // Remove from DOM triggers disconnectedCallback
    el.remove();

    expect((el as any)._observer).toBeNull();
  });

  it('re-creates observer when re-inserted into DOM', async () => {
    el = await fixture<RRButton>('<rr-button>Test</rr-button>');
    await waitForUpdate(el);

    // Remove
    const parent = el.parentElement!;
    el.remove();
    expect((el as any)._observer).toBeNull();

    // Re-insert
    parent.appendChild(el);
    await waitForUpdate(el);

    expect((el as any)._observer).not.toBeNull();
  });
});
