import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import { aliases } from './icon-aliases.js';
import { iconRegistry } from './icon-registry.js';
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

describe('icon aliases – messaging/composer', () => {
	// Each alias must resolve (aliases[name] -> target) to an icon that
	// actually exists in the registry, mirroring icon.ts#_loadIcon.
	it.each([
		['emoji', 'face-smiling'],
		['smile-plus', 'face-smiling-badge-plus'],
		['send-horizontal', 'paper-plane'],
		['paper-airplane', 'paper-plane'],
	])('alias "%s" resolves to existing icon "%s"', (alias, target) => {
		expect(aliases[alias]).toBe(target);
		expect(iconRegistry.has(target)).toBe(true);
	});
});
