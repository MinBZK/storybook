import { describe, it, expect, afterEach, beforeAll, afterAll } from 'vitest';
import { fixture, cleanup } from '../../../test-utils.js';
// Raw CSS injected for the width-zone grid-column tests below: rich-text is a
// document-level stylesheet and needs the settings tokens to resolve its grid.
import settingsCss from '../../../assets/styles/settings.css?raw';
import palettesCss from '../../../assets/styles/palettes.generated.css?raw';
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
		expect((el as unknown as { spacing: string }).spacing).toBe('snug');
		expect(el.hasAttribute('spacing')).toBe(false);
	});

	it('reflects spacing attribute', async () => {
		el = await fixture('<nldd-rich-text spacing="loose"></nldd-rich-text>');
		expect(el.getAttribute('spacing')).toBe('loose');
	});

	it('reflects the color attribute', async () => {
		el = await fixture('<nldd-rich-text color="inherit"></nldd-rich-text>');
		expect(el.getAttribute('color')).toBe('inherit');
	});

	it('defaults to no hyphens', async () => {
		el = await fixture('<nldd-rich-text></nldd-rich-text>');
		expect((el as unknown as { hyphens: boolean }).hyphens).toBe(false);
		expect(el.hasAttribute('hyphens')).toBe(false);
	});

	it('reflects the hyphens attribute', async () => {
		el = await fixture('<nldd-rich-text hyphens></nldd-rich-text>');
		expect((el as unknown as { hyphens: boolean }).hyphens).toBe(true);
		expect(el.hasAttribute('hyphens')).toBe(true);
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

describe('nldd-rich-text color="inherit"', () => {
	let styles: HTMLStyleElement[] = [];
	let wrap: HTMLElement;

	// A hue no semantic token uses, so an exact-match assertion is meaningful:
	// if the computed color equals this, it can only have come from inheritance.
	const SURFACE_COLOR = 'rgb(255, 0, 255)';

	beforeAll(() => {
		// settings.css @imports the generated palette, and raw-injecting it as
		// text neither resolves that import nor applies the rest of the sheet
		// while the unresolvable @import sits at the top — so the light-dark()
		// tokens never resolve. Inject the palette explicitly and drop the
		// @import line so the semantic tokens (e.g. --semantics-content-color)
		// are available for the without-attribute assertions below.
		styles = [palettesCss, settingsCss.replace(/@import[^;]+;/g, ''), richTextCss].map((css) => {
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

	const place = async (attrs: string, markup: string): Promise<HTMLElement> => {
		wrap = document.createElement('div');
		wrap.style.color = SURFACE_COLOR;
		// The bare test document sets no color-scheme, so the light-dark()
		// semantic tokens (e.g. --semantics-content-color) would not resolve and
		// color would fall back to the inherited surface color — pin it to light.
		wrap.style.colorScheme = 'light';
		wrap.innerHTML = `<nldd-rich-text ${attrs}>${markup}</nldd-rich-text>`;
		document.body.appendChild(wrap);
		await new Promise((r) => setTimeout(r, 0));
		return wrap.querySelector('nldd-rich-text')!;
	};

	it('inherits the surface text color', async () => {
		const rt = await place('color="inherit"', '<p>tekst</p>');
		expect(getComputedStyle(rt).color).toBe(SURFACE_COLOR);
	});

	it('keeps the semantic content color without the attribute', async () => {
		const rt = await place('', '<p>tekst</p>');
		expect(getComputedStyle(rt).color).not.toBe(SURFACE_COLOR);
	});

	it('paints links with currentColor (the inherited surface color)', async () => {
		const rt = await place('color="inherit"', '<a id="lnk" href="/x">link</a>');
		expect(getComputedStyle(rt.querySelector('#lnk')!).color).toBe(SURFACE_COLOR);
	});

	it('keeps the semantic link color without the attribute', async () => {
		const rt = await place('', '<a id="lnk" href="/x">link</a>');
		expect(getComputedStyle(rt.querySelector('#lnk')!).color).not.toBe(SURFACE_COLOR);
	});

	it('tints figcaption to a translucent tier of the inherited color', async () => {
		const rt = await place('color="inherit"', '<figure><figcaption id="cap">bijschrift</figcaption></figure>');
		const body = getComputedStyle(rt).color;
		const caption = getComputedStyle(rt.querySelector('#cap')!).color;
		expect(body).toBe(SURFACE_COLOR);    // body text is the opaque inherited color
		expect(caption).not.toBe(body);      // figcaption is mixed toward transparent, so not the opaque color
	});
});
