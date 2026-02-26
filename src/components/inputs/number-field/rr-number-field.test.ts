import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRNumberField } from './rr-number-field.ts';
import './rr-number-field.ts';

describe('rr-number-field', () => {
  let el: HTMLElement;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('renders without error', async () => {
    el = await fixture('<rr-number-field></rr-number-field>');
    await waitForUpdate(el);

    expect(el.shadowRoot).not.toBeNull();
  });
});

describe('rr-number-field – increment & decrement', () => {
  let el: RRNumberField;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('increments value on increase button click', async () => {
    el = await fixture<RRNumberField>('<rr-number-field value="5"></rr-number-field>');
    await waitForUpdate(el);

    const increaseBtn = el.shadowRoot!.querySelector('[part="increase-button"]') as HTMLElement;
    increaseBtn.click();
    await waitForUpdate(el);

    expect(el.value).toBe(6);
  });

  it('decrements value on decrease button click', async () => {
    el = await fixture<RRNumberField>('<rr-number-field value="5"></rr-number-field>');
    await waitForUpdate(el);

    const decreaseBtn = el.shadowRoot!.querySelector('[part="decrease-button"]') as HTMLElement;
    decreaseBtn.click();
    await waitForUpdate(el);

    expect(el.value).toBe(4);
  });

  it('uses custom step value', async () => {
    el = await fixture<RRNumberField>('<rr-number-field value="10" step="5"></rr-number-field>');
    await waitForUpdate(el);

    const increaseBtn = el.shadowRoot!.querySelector('[part="increase-button"]') as HTMLElement;
    increaseBtn.click();
    await waitForUpdate(el);

    expect(el.value).toBe(15);
  });

  it('dispatches input and change events on value change', async () => {
    el = await fixture<RRNumberField>('<rr-number-field value="5"></rr-number-field>');
    await waitForUpdate(el);

    let inputDetail: any;
    let changeDetail: any;
    el.addEventListener('input', ((e: CustomEvent) => { inputDetail = e.detail; }) as EventListener);
    el.addEventListener('change', ((e: CustomEvent) => { changeDetail = e.detail; }) as EventListener);

    const increaseBtn = el.shadowRoot!.querySelector('[part="increase-button"]') as HTMLElement;
    increaseBtn.click();

    expect(inputDetail).toBeDefined();
    expect(inputDetail.value).toBe(6);
    expect(changeDetail).toBeDefined();
    expect(changeDetail.value).toBe(6);
  });
});

describe('rr-number-field – min/max clamping', () => {
  let el: RRNumberField;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('clamps value to max on increase', async () => {
    el = await fixture<RRNumberField>('<rr-number-field value="9" max="10"></rr-number-field>');
    await waitForUpdate(el);

    const increaseBtn = el.shadowRoot!.querySelector('[part="increase-button"]') as HTMLElement;
    increaseBtn.click();
    await waitForUpdate(el);

    expect(el.value).toBe(10);

    // Try again — should not go beyond
    increaseBtn.click();
    await waitForUpdate(el);

    expect(el.value).toBe(10);
  });

  it('clamps value to min on decrease', async () => {
    el = await fixture<RRNumberField>('<rr-number-field value="1" min="0"></rr-number-field>');
    await waitForUpdate(el);

    const decreaseBtn = el.shadowRoot!.querySelector('[part="decrease-button"]') as HTMLElement;
    decreaseBtn.click();
    await waitForUpdate(el);

    expect(el.value).toBe(0);

    // Try again — should not go below
    decreaseBtn.click();
    await waitForUpdate(el);

    expect(el.value).toBe(0);
  });

  it('disables decrease button when at min', async () => {
    el = await fixture<RRNumberField>('<rr-number-field value="0" min="0"></rr-number-field>');
    await waitForUpdate(el);

    const decreaseBtn = el.shadowRoot!.querySelector('[part="decrease-button"]') as HTMLButtonElement;
    expect(decreaseBtn.disabled).toBe(true);
  });

  it('disables increase button when at max', async () => {
    el = await fixture<RRNumberField>('<rr-number-field value="10" max="10"></rr-number-field>');
    await waitForUpdate(el);

    const increaseBtn = el.shadowRoot!.querySelector('[part="increase-button"]') as HTMLButtonElement;
    expect(increaseBtn.disabled).toBe(true);
  });

  it('does not dispatch events when value would not change', async () => {
    el = await fixture<RRNumberField>('<rr-number-field value="10" max="10"></rr-number-field>');
    await waitForUpdate(el);

    let eventFired = false;
    el.addEventListener('input', () => { eventFired = true; });

    const increaseBtn = el.shadowRoot!.querySelector('[part="increase-button"]') as HTMLElement;
    increaseBtn.click();

    expect(eventFired).toBe(false);
  });
});

describe('rr-number-field – disabled state', () => {
  let el: RRNumberField;

  afterEach(() => {
    if (el) cleanup(el);
  });

  it('disables both buttons when component is disabled', async () => {
    el = await fixture<RRNumberField>('<rr-number-field value="5" disabled></rr-number-field>');
    await waitForUpdate(el);

    const decreaseBtn = el.shadowRoot!.querySelector('[part="decrease-button"]') as HTMLButtonElement;
    const increaseBtn = el.shadowRoot!.querySelector('[part="increase-button"]') as HTMLButtonElement;

    expect(decreaseBtn.disabled).toBe(true);
    expect(increaseBtn.disabled).toBe(true);
  });

  it('disables the native input when component is disabled', async () => {
    el = await fixture<RRNumberField>('<rr-number-field value="5" disabled></rr-number-field>');
    await waitForUpdate(el);

    const input = el.shadowRoot!.querySelector('[part="input"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
