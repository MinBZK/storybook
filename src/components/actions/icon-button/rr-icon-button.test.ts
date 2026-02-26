import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRIconButton } from './rr-icon-button.ts';
import './rr-icon-button.ts';

describe('rr-icon-button', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-icon-button></rr-icon-button>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});

describe('rr-icon-button – slot assignment & text extraction', () => {
  let el: RRIconButton;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('assigns slot="__icon" to rr-icon child', async () => {
    el = await fixture<RRIconButton>(`
      <rr-icon-button>
        <rr-icon name="download"></rr-icon>
        Download
      </rr-icon-button>
    `);
    await waitForUpdate(el);

    const icon = el.querySelector('rr-icon')!;
    expect(icon.getAttribute('slot')).toBe('__icon');
  });

  it('extracts text as aria-label on shadow button', async () => {
    el = await fixture<RRIconButton>(`
      <rr-icon-button>
        <rr-icon name="download"></rr-icon>
        Download
      </rr-icon-button>
    `);
    await waitForUpdate(el);

    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-label')).toBe('Download');
  });

  it('filters out whitespace-only text nodes', async () => {
    el = await fixture<RRIconButton>(`<rr-icon-button>
        <rr-icon name="download"></rr-icon>

        Download

      </rr-icon-button>`);
    await waitForUpdate(el);

    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-label')).toBe('Download');
  });

  it('has empty aria-label when only icon is provided', async () => {
    el = await fixture<RRIconButton>(`
      <rr-icon-button>
        <rr-icon name="download"></rr-icon>
      </rr-icon-button>
    `);
    await waitForUpdate(el);

    const btn = el.shadowRoot!.querySelector('button')!;
    // With no text, _title is '' so aria-label should not be set (Lit's nothing)
    // or empty string
    const ariaLabel = btn.getAttribute('aria-label');
    expect(ariaLabel === null || ariaLabel === '').toBe(true);
  });

  it('sets title attr for non-lg sizes and empty for lg', async () => {
    el = await fixture<RRIconButton>(`
      <rr-icon-button size="md">
        <rr-icon name="download"></rr-icon>
        Download
      </rr-icon-button>
    `);
    await waitForUpdate(el);

    let btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('title')).toBe('Download');

    // Change to lg
    el.size = 'lg';
    await waitForUpdate(el);

    btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('title')).toBe('');
  });

  it('updates aria-label when text is dynamically added', async () => {
    el = await fixture<RRIconButton>(`
      <rr-icon-button>
        <rr-icon name="download"></rr-icon>
      </rr-icon-button>
    `);
    await waitForUpdate(el);

    // Dynamically add text
    el.appendChild(document.createTextNode('Save'));
    await waitForUpdate(el);

    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-label')).toBe('Save');
  });

  it('assigns slot to dynamically added icon', async () => {
    el = await fixture<RRIconButton>(`
      <rr-icon-button>Upload</rr-icon-button>
    `);
    await waitForUpdate(el);

    const icon = document.createElement('rr-icon');
    icon.setAttribute('name', 'upload');
    el.prepend(icon);

    await waitForUpdate(el);

    expect(icon.getAttribute('slot')).toBe('__icon');
  });

  it('cleans up observer on disconnect', async () => {
    el = await fixture<RRIconButton>(`
      <rr-icon-button>
        <rr-icon name="x"></rr-icon>
        Close
      </rr-icon-button>
    `);
    await waitForUpdate(el);

    expect((el as any)._observer).not.toBeNull();

    el.remove();

    expect((el as any)._observer).toBeNull();
  });
});
