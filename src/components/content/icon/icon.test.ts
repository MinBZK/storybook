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

	it('defaults size and color to empty (inherit)', async () => {
		el = await fixture<NLDDIcon>('<nldd-icon></nldd-icon>');
		await waitForUpdate(el);
		expect(el.size).toBe('');
		expect(el.color).toBe('');
	});

	it('inherits parent color when no color attribute is set', async () => {
		const wrapper = await fixture<HTMLElement>('<div style="color: rgb(255, 0, 0);"><nldd-icon></nldd-icon></div>');
		const icon = wrapper.querySelector('nldd-icon') as NLDDIcon;
		await waitForUpdate(icon);
		expect(getComputedStyle(icon).color).toBe('rgb(255, 0, 0)');
		cleanup(wrapper);
	});
});
