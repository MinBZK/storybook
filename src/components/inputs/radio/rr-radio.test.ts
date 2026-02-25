import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRRadio } from './rr-radio.ts';
import './rr-radio.ts';

function radioGroup(checked = '1'): string {
  return `
    <div role="radiogroup">
      <rr-radio name="group" value="1" ${checked === '1' ? 'checked' : ''}>Option 1</rr-radio>
      <rr-radio name="group" value="2" ${checked === '2' ? 'checked' : ''}>Option 2</rr-radio>
      <rr-radio name="group" value="3" ${checked === '3' ? 'checked' : ''}>Option 3</rr-radio>
    </div>
  `;
}

function getRadios(container: Element): RRRadio[] {
  return Array.from(container.parentElement!.querySelectorAll('rr-radio'));
}

describe('rr-radio', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-radio></rr-radio>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});

describe('rr-radio – ARIA roles & state', () => {
  let el: RRRadio;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('sets role="radio" on host', async () => {
    el = await fixture<RRRadio>('<rr-radio name="test" value="a">A</rr-radio>');
    await waitForUpdate(el);

    expect(el.getAttribute('role')).toBe('radio');
  });

  it('sets aria-checked="true" when checked', async () => {
    el = await fixture<RRRadio>('<rr-radio name="test" value="a" checked>A</rr-radio>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('sets aria-checked="false" when unchecked', async () => {
    el = await fixture<RRRadio>('<rr-radio name="test" value="a">A</rr-radio>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-checked')).toBe('false');
  });

  it('sets tabindex="0" when not disabled', async () => {
    el = await fixture<RRRadio>('<rr-radio name="test" value="a">A</rr-radio>');
    await waitForUpdate(el);

    expect(el.getAttribute('tabindex')).toBe('0');
  });

  it('removes tabindex when disabled', async () => {
    el = await fixture<RRRadio>('<rr-radio name="test" value="a" disabled>A</rr-radio>');
    await waitForUpdate(el);

    expect(el.hasAttribute('tabindex')).toBe(false);
  });

  it('sets aria-disabled when disabled', async () => {
    el = await fixture<RRRadio>('<rr-radio name="test" value="a" disabled>A</rr-radio>');
    await waitForUpdate(el);

    expect(el.getAttribute('aria-disabled')).toBe('true');
  });
});

describe('rr-radio – click behavior', () => {
  let container: HTMLDivElement;

  afterEach(() => {
    container?.remove();
  });

  it('checks radio on click and unchecks siblings', async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = radioGroup('1');
    document.body.appendChild(wrapper);
    const radios = Array.from(wrapper.querySelectorAll('rr-radio')) as RRRadio[];
    for (const r of radios) await r.updateComplete;
    await new Promise(r => setTimeout(r, 0));

    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);

    // Click second radio
    radios[1].click();
    await new Promise(r => setTimeout(r, 0));
    for (const r of radios) await r.updateComplete;

    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(true);

    container = wrapper as HTMLDivElement;
  });

  it('does not uncheck self on re-click', async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<rr-radio name="solo" value="a" checked>A</rr-radio>';
    document.body.appendChild(wrapper);
    const radio = wrapper.querySelector('rr-radio') as RRRadio;
    await radio.updateComplete;

    radio.click();
    await radio.updateComplete;

    expect(radio.checked).toBe(true);
    container = wrapper as HTMLDivElement;
  });

  it('dispatches change event on check', async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<rr-radio name="test" value="x">X</rr-radio>';
    document.body.appendChild(wrapper);
    const radio = wrapper.querySelector('rr-radio') as RRRadio;
    await radio.updateComplete;

    let detail: any;
    radio.addEventListener('change', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    radio.click();
    expect(detail).toBeDefined();
    expect(detail.checked).toBe(true);
    expect(detail.value).toBe('x');

    container = wrapper as HTMLDivElement;
  });

  it('does not fire change when disabled', async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<rr-radio name="test" value="x" disabled>X</rr-radio>';
    document.body.appendChild(wrapper);
    const radio = wrapper.querySelector('rr-radio') as RRRadio;
    await radio.updateComplete;

    let changeFired = false;
    radio.addEventListener('change', () => { changeFired = true; });

    radio.click();
    expect(changeFired).toBe(false);

    container = wrapper as HTMLDivElement;
  });
});

describe('rr-radio – keyboard navigation', () => {
  let container: HTMLDivElement;

  afterEach(() => {
    container?.remove();
  });

  function pressKey(target: Element, key: string) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  }

  it('ArrowRight checks and focuses next radio', async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = radioGroup('1');
    document.body.appendChild(wrapper);
    const radios = Array.from(wrapper.querySelectorAll('rr-radio')) as RRRadio[];
    for (const r of radios) await r.updateComplete;

    (radios[0] as HTMLElement).focus();
    pressKey(radios[0], 'ArrowRight');
    await new Promise(r => setTimeout(r, 0));
    for (const r of radios) await r.updateComplete;

    expect(radios[1].checked).toBe(true);
    expect(radios[0].checked).toBe(false);

    container = wrapper as HTMLDivElement;
  });

  it('ArrowLeft checks and focuses previous radio', async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = radioGroup('2');
    document.body.appendChild(wrapper);
    const radios = Array.from(wrapper.querySelectorAll('rr-radio')) as RRRadio[];
    for (const r of radios) await r.updateComplete;

    (radios[1] as HTMLElement).focus();
    pressKey(radios[1], 'ArrowLeft');
    await new Promise(r => setTimeout(r, 0));
    for (const r of radios) await r.updateComplete;

    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);

    container = wrapper as HTMLDivElement;
  });

  it('ArrowRight wraps from last to first', async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = radioGroup('3');
    document.body.appendChild(wrapper);
    const radios = Array.from(wrapper.querySelectorAll('rr-radio')) as RRRadio[];
    for (const r of radios) await r.updateComplete;

    (radios[2] as HTMLElement).focus();
    pressKey(radios[2], 'ArrowRight');
    await new Promise(r => setTimeout(r, 0));
    for (const r of radios) await r.updateComplete;

    expect(radios[0].checked).toBe(true);
    expect(radios[2].checked).toBe(false);

    container = wrapper as HTMLDivElement;
  });

  it('Space key checks radio', async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<rr-radio name="test" value="a">A</rr-radio>';
    document.body.appendChild(wrapper);
    const radio = wrapper.querySelector('rr-radio') as RRRadio;
    await radio.updateComplete;

    pressKey(radio, ' ');
    await radio.updateComplete;

    expect(radio.checked).toBe(true);

    container = wrapper as HTMLDivElement;
  });

  it('skips disabled radios in navigation', async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <rr-radio name="grp" value="1" checked>A</rr-radio>
      <rr-radio name="grp" value="2" disabled>B</rr-radio>
      <rr-radio name="grp" value="3">C</rr-radio>
    `;
    document.body.appendChild(wrapper);
    const radios = Array.from(wrapper.querySelectorAll('rr-radio')) as RRRadio[];
    for (const r of radios) await r.updateComplete;

    (radios[0] as HTMLElement).focus();
    pressKey(radios[0], 'ArrowRight');
    await new Promise(r => setTimeout(r, 0));
    for (const r of radios) await r.updateComplete;

    // Should skip disabled radio[1] and go to radio[2]
    expect(radios[2].checked).toBe(true);
    expect(radios[0].checked).toBe(false);

    container = wrapper as HTMLDivElement;
  });
});
