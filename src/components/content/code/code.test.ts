import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './code.ts';

describe('nldd-code', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-code>hello</nldd-code>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('rendert een pre element met de code class', async () => {
		el = await fixture('<nldd-code>hello</nldd-code>');
		await waitForUpdate(el);
		const pre = el.shadowRoot!.querySelector('pre.code');
		expect(pre).not.toBeNull();
	});

	it('toont slot content', async () => {
		el = await fixture('<nldd-code>example content</nldd-code>');
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot');
		const assigned = slot!.assignedNodes({ flatten: true });
		expect(assigned[0].textContent).toContain('example content');
	});

	it('reflects the wrap attribute', async () => {
		el = await fixture('<nldd-code wrap>x</nldd-code>');
		await waitForUpdate(el);
		expect(el.hasAttribute('wrap')).toBe(true);
	});
});
