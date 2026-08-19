import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './icon.js';
import type { NLDDIcon } from './icon.js';

describe('nldd-icon', () => {
	let el: NLDDIcon;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture<NLDDIcon>('<nldd-icon></nldd-icon>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects size attribute', async () => {
		el = await fixture<NLDDIcon>('<nldd-icon size="32"></nldd-icon>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('32');
	});

	it('reflects color attribute (functional)', async () => {
		el = await fixture<NLDDIcon>('<nldd-icon color="critical"></nldd-icon>');
		await waitForUpdate(el);
		expect(el.getAttribute('color')).toBe('critical');
	});

	it('reflects color attribute (rijkskleur)', async () => {
		el = await fixture<NLDDIcon>('<nldd-icon color="lintblauw"></nldd-icon>');
		await waitForUpdate(el);
		expect(el.getAttribute('color')).toBe('lintblauw');
	});

	it('paints a custom color, and the SVG fill follows it', async () => {
		el = await fixture<NLDDIcon>('<nldd-icon custom-color="rgb(0, 0, 255)"></nldd-icon>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).color).toBe('rgb(0, 0, 255)');
		const painted = el.shadowRoot!.querySelector('svg [fill="currentColor"], svg path');
		expect(getComputedStyle(painted as Element).fill).toBe('rgb(0, 0, 255)');
	});

	it('a custom color wins over a named one', async () => {
		el = await fixture<NLDDIcon>('<nldd-icon color="critical" custom-color="rgb(0, 128, 0)"></nldd-icon>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).color).toBe('rgb(0, 128, 0)');
	});

	it('defaults size and color to empty (inherit)', async () => {
		el = await fixture<NLDDIcon>('<nldd-icon></nldd-icon>');
		await waitForUpdate(el);
		expect(el.size).toBe('');
		expect(el.color).toBe('');
	});

	it('inherits parent color, and the SVG fill resolves to it through currentColor', async () => {
		const wrapper = await fixture<HTMLElement>('<div style="color: rgb(255, 0, 0);"><nldd-icon></nldd-icon></div>');
		const icon = wrapper.querySelector('nldd-icon') as NLDDIcon;
		await waitForUpdate(icon);
		// Host inherits the parent color.
		expect(getComputedStyle(icon).color).toBe('rgb(255, 0, 0)');
		// And the SVG paint actually uses it: the icon SVG paints with
		// fill="currentColor", which must resolve through the shadow boundary
		// to the inherited color — not break into the default black.
		const painted = icon.shadowRoot!.querySelector('svg [fill="currentColor"], svg path');
		expect(painted).not.toBeNull();
		expect(getComputedStyle(painted as Element).fill).toBe('rgb(255, 0, 0)');
		cleanup(wrapper);
	});
});

describe('nldd-icon – relative sizes', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	const mount = async (attrs: string, wrapper = 'div style="width: 40px; font-size: 12px"'): Promise<HTMLElement> => {
		el = await fixture<HTMLElement>(`<${wrapper}><nldd-icon name="check" ${attrs}></nldd-icon></${wrapper.split(' ')[0]}>`);
		const icon = el.querySelector('nldd-icon') as HTMLElement;
		await waitForUpdate(icon);
		return icon;
	};

	it('fills the container by default', async () => {
		const icon = await mount('');
		expect(Math.round(icon.getBoundingClientRect().width)).toBe(40);
	});

	it('size="full" names that same default', async () => {
		const icon = await mount('size="full"');
		expect(Math.round(icon.getBoundingClientRect().width)).toBe(40);
	});

	it('size="inherit" follows the surrounding text', async () => {
		const icon = await mount('size="inherit"');
		expect(Math.round(icon.getBoundingClientRect().width)).toBe(12);
	});

	it('a fixed size still wins over both', async () => {
		// The spacer tokens are not loaded in the test environment, so feed the
		// one this size resolves to.
		const icon = await mount('size="16"', 'div style="width: 40px; --primitives-space-16: 16px"');
		expect(Math.round(icon.getBoundingClientRect().width)).toBe(16);
	});
});
