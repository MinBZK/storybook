import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../../test-utils.js';
import './text-cell.js';

describe('nldd-text-cell', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-text-cell></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to md size', async () => {
		el = await fixture('<nldd-text-cell></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('md');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<nldd-text-cell size="sm"></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('sm');
	});

	it('defaults to default color', async () => {
		el = await fixture('<nldd-text-cell></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('color')).toBe('default');
	});

	it('reflects color attribute', async () => {
		el = await fixture('<nldd-text-cell color="secondary"></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('color')).toBe('secondary');
	});

	it('defaults to stretch width', async () => {
		el = await fixture('<nldd-text-cell></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('stretch');
	});

	it('reflects width attribute', async () => {
		el = await fixture('<nldd-text-cell width="fit-content"></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('width')).toBe('fit-content');
	});

	it('sets inline width style for explicit CSS length', async () => {
		el = await fixture('<nldd-text-cell width="120px"></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_width')).toBe('120px');
	});

	it('sets --_min-width custom property', async () => {
		el = await fixture('<nldd-text-cell min-width="80px"></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-width')).toBe('80px');
	});

	it('sets --_max-width custom property', async () => {
		el = await fixture('<nldd-text-cell max-width="200px"></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('200px');
	});

	it('sets --_min-height custom property', async () => {
		el = await fixture('<nldd-text-cell min-height="44px"></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-height')).toBe('44px');
	});

	it('accepts CSS length units other than px', async () => {
		el = await fixture('<nldd-text-cell min-width="5rem"></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_min-width')).toBe('5rem');
	});

	it('injects a @container rule for hide-below', async () => {
		el = await fixture('<nldd-text-cell hide-below="320px"></nldd-text-cell>');
		await waitForUpdate(el);
		const styleEls = el.shadowRoot!.querySelectorAll('style');
		const injected = Array.from(styleEls).find((s) =>
			s.textContent?.includes('@container'),
		);
		expect(injected?.textContent).toContain('max-width: 320px');
		expect(injected?.textContent).toContain('display: none');
	});

	it('injects a @container rule for hide-above', async () => {
		el = await fixture('<nldd-text-cell hide-above="480px"></nldd-text-cell>');
		await waitForUpdate(el);
		const styleEls = el.shadowRoot!.querySelectorAll('style');
		const injected = Array.from(styleEls).find((s) =>
			s.textContent?.includes('@container'),
		);
		expect(injected?.textContent).toContain('min-width: 480px');
	});

	it('defaults to left horizontal alignment', async () => {
		el = await fixture('<nldd-text-cell></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('horizontal-alignment')).toBe('left');
	});

	it('reflects horizontal-alignment attribute', async () => {
		el = await fixture('<nldd-text-cell horizontal-alignment="right"></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('horizontal-alignment')).toBe('right');
	});

	it('defaults to center vertical alignment', async () => {
		el = await fixture('<nldd-text-cell></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('center');
	});

	it('reflects vertical-alignment top', async () => {
		el = await fixture('<nldd-text-cell vertical-alignment="top"></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('top');
	});

	it('reflects vertical-alignment bottom', async () => {
		el = await fixture('<nldd-text-cell vertical-alignment="bottom"></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.getAttribute('vertical-alignment')).toBe('bottom');
	});

	it('renders text in shadow DOM', async () => {
		el = await fixture('<nldd-text-cell text="Hallo"></nldd-text-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.text-cell__text');
		expect(p).not.toBeNull();
		expect(p!.textContent?.trim()).toBe('Hallo');
	});

	it('renders overline in shadow DOM', async () => {
		el = await fixture('<nldd-text-cell overline="Overline"></nldd-text-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.text-cell__overline');
		expect(p).not.toBeNull();
		expect(p!.textContent?.trim()).toBe('Overline');
	});

	it('renders supporting-text in shadow DOM', async () => {
		el = await fixture('<nldd-text-cell supporting-text="Supporting"></nldd-text-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.text-cell__supporting-text');
		expect(p).not.toBeNull();
		expect(p!.textContent?.trim()).toBe('Supporting');
	});

	it('does not render text element when text is empty', async () => {
		el = await fixture('<nldd-text-cell></nldd-text-cell>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.text-cell__text')).toBeNull();
	});

	it('renders **bold** markers as <b> elements', async () => {
		el = await fixture('<nldd-text-cell text="Hello **world**"></nldd-text-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.text-cell__text');
		expect(p).not.toBeNull();
		expect(p!.querySelector('b')?.textContent).toBe('world');
		expect(p!.textContent?.trim()).toBe('Hello world');
	});

	it('renders unbalanced ** as plain text', async () => {
		el = await fixture('<nldd-text-cell text="Hello **world"></nldd-text-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.text-cell__text');
		expect(p!.querySelector('b')).toBeNull();
		expect(p!.textContent?.trim()).toBe('Hello **world');
	});

	it('renders plain text without bold when no ** markers', async () => {
		el = await fixture('<nldd-text-cell text="No bold here"></nldd-text-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.text-cell__text');
		expect(p!.querySelector('b')).toBeNull();
		expect(p!.textContent?.trim()).toBe('No bold here');
	});

	// — query / query-mark-mode —

	it('query: predictive mode bolds the remainder of text (default)', async () => {
		el = await fixture('<nldd-text-cell text="Aardappelen" query="aa"></nldd-text-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.text-cell__text');
		const bold = p!.querySelector('b');
		expect(bold?.textContent).toBe('rdappelen');
		expect(p!.textContent?.trim()).toBe('Aardappelen');
	});

	it('query: match mode bolds the query substring', async () => {
		el = await fixture('<nldd-text-cell text="Aardappelen" query="aa" query-mark-mode="match"></nldd-text-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.text-cell__text');
		const bold = p!.querySelector('b');
		expect(bold?.textContent).toBe('Aa');
		expect(p!.textContent?.trim()).toBe('Aardappelen');
	});

	it('query applies across text, overline and supporting-text', async () => {
		el = await fixture('<nldd-text-cell overline="Groente" text="Aardappelen" supporting-text="appelsoort" query="app"></nldd-text-cell>');
		await waitForUpdate(el);
		const overline = el.shadowRoot!.querySelector('.text-cell__overline');
		const text = el.shadowRoot!.querySelector('.text-cell__text');
		const supporting = el.shadowRoot!.querySelector('.text-cell__supporting-text');
		// overline "Groente" does not contain "app" → no marking
		expect(overline!.querySelector('b')).toBeNull();
		// text "Aardappelen" contains "app" → predictive mode bolds remainder
		expect(text!.querySelectorAll('b').length).toBeGreaterThan(0);
		// supporting-text "appelsoort" contains "app" → bolding applied
		expect(supporting!.querySelectorAll('b').length).toBeGreaterThan(0);
	});

	it('query: empty query leaves text untouched (falls back to **bold** rendering)', async () => {
		el = await fixture('<nldd-text-cell text="Hello **world**" query=""></nldd-text-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.text-cell__text');
		expect(p!.querySelector('b')?.textContent).toBe('world');
	});

	it('query: query not present in text renders plain (no bold)', async () => {
		el = await fixture('<nldd-text-cell text="Aardappelen" query="zz"></nldd-text-cell>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.text-cell__text');
		expect(p!.querySelector('b')).toBeNull();
	});

	it('query-mark-mode defaults to predictive', async () => {
		el = await fixture('<nldd-text-cell text="Aardappelen" query="aa"></nldd-text-cell>');
		await waitForUpdate(el);
		expect((el as HTMLElement & { queryMarkMode: string }).queryMarkMode).toBe('predictive');
	});

});
