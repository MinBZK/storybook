import { describe, it, expect, afterEach, beforeAll, afterAll } from 'vitest';
import { fixture, cleanup } from '../../../test-utils.js';
// Raw CSS injected for the width-zone grid-column tests below: rich-text is a
// document-level stylesheet and needs the settings tokens to resolve its grid.
import settingsCss from '../../../assets/styles/settings.css?raw';
import richTextCss from './rich-text.css?raw';
import './rich-text.js';

describe('nldd-rich-text', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-rich-text></nldd-rich-text>');
		expect(el).toBeDefined();
		expect(el.tagName.toLowerCase()).toBe('nldd-rich-text');
	});

	it('has no shadow DOM', async () => {
		el = await fixture('<nldd-rich-text></nldd-rich-text>');
		expect(el.shadowRoot).toBeNull();
	});

	it('renders slotted content as light DOM', async () => {
		el = await fixture('<nldd-rich-text><p>Tekst</p></nldd-rich-text>');
		const p = el.querySelector('p');
		expect(p).not.toBeNull();
		expect(p?.textContent).toBe('Tekst');
	});

	it('defaults to snug spacing', async () => {
		el = await fixture('<nldd-rich-text></nldd-rich-text>');
		expect(el.getAttribute('spacing')).toBe('snug');
	});

	it('reflects spacing attribute', async () => {
		el = await fixture('<nldd-rich-text spacing="loose"></nldd-rich-text>');
		expect(el.getAttribute('spacing')).toBe('loose');
	});

	it('reflects the color attribute', async () => {
		el = await fixture('<nldd-rich-text color="inherit"></nldd-rich-text>');
		expect(el.getAttribute('color')).toBe('inherit');
	});
});

describe('nldd-rich-text width zones', () => {
	let styles: HTMLStyleElement[] = [];
	let wrap: HTMLElement;

	beforeAll(() => {
		styles = [settingsCss, richTextCss].map((css) => {
			const style = document.createElement('style');
			style.textContent = css;
			document.head.appendChild(style);
			return style;
		});
	});

	afterAll(() => {
		styles.forEach((s) => s.remove());
	});

	afterEach(() => {
		if (wrap) wrap.remove();
	});

	const place = async (markup: string, id: string): Promise<string> => {
		wrap = document.createElement('div');
		wrap.style.width = '1000px';
		wrap.innerHTML = `<nldd-rich-text>${markup}</nldd-rich-text>`;
		document.body.appendChild(wrap);
		await new Promise((r) => setTimeout(r, 0));
		return getComputedStyle(wrap.querySelector(`#${id}`)!).gridColumn;
	};

	it('places text at the main measure', async () => {
		expect(await place('<p id="x">tekst</p>', 'x')).toBe('main');
	});

	it('places images and tables at the wide accent', async () => {
		expect(await place('<img id="x" src="data:," alt="">', 'x')).toBe('wide');
		expect(await place('<table id="x"><tr><td>x</td></tr></table>', 'x')).toBe('wide');
	});

	it('places code blocks and other elements at the full span', async () => {
		expect(await place('<pre id="x">code</pre>', 'x')).toBe('full');
	});

	it('lets data-width override the default per child', async () => {
		expect(await place('<p id="x" data-width="full">tekst</p>', 'x')).toBe('full');
		expect(await place('<table id="x" data-width="main"><tr><td>x</td></tr></table>', 'x')).toBe('main');
	});
});
