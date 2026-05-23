import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDAppView } from './app-view.js';
import './app-view.js';

describe('nldd-app-view', () => {
	let el: NLDDAppView;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the app-view container', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.app-view')).not.toBeNull();
	});

	it('renders slotted content', async () => {
		el = await fixture('<nldd-app-view><div id="child"></div></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.querySelector('#child')).not.toBeNull();
	});

	it('defaults background to "base"', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('base');
	});

	it('reflects background="tinted" attribute', async () => {
		el = await fixture('<nldd-app-view background="tinted"></nldd-app-view>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('tinted');
	});

	it('setting background property reflects to attribute', async () => {
		el = await fixture('<nldd-app-view></nldd-app-view>');
		await waitForUpdate(el);
		el.background = 'tinted';
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('tinted');
	});

	describe('document.body background ownership', () => {
		// Track every fixture so a mid-test failure can't leave a detached
		// instance still listed as `_bodyBackgroundOwner` inside the module.
		const instances: NLDDAppView[] = [];
		async function track(html: string): Promise<NLDDAppView> {
			const el = await fixture<NLDDAppView>(html);
			instances.push(el);
			return el;
		}

		afterEach(() => {
			while (instances.length > 0) {
				const inst = instances.pop()!;
				if (inst.isConnected) cleanup(inst);
			}
			document.body.style.removeProperty('background-color');
		});

		it('writes the body background on connect', async () => {
			el = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(el);
			expect(document.body.style.backgroundColor).not.toBe('');
		});

		it('clears the body background on disconnect when sole owner', async () => {
			el = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(el);
			cleanup(el);
			el = undefined as unknown as NLDDAppView;
			expect(document.body.style.backgroundColor).toBe('');
		});

		it('does not erase a surviving instance when an older one disconnects', async () => {
			const first = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(first);
			const second = await track('<nldd-app-view background="tinted"></nldd-app-view>');
			await waitForUpdate(second);

			// `second` is the most recent writer; its background sits on body.
			const ownedBySecond = document.body.style.backgroundColor;
			expect(ownedBySecond).not.toBe('');

			// Disconnecting the older instance must not clear the surviving one's
			// background — that was the multi-instance regression.
			cleanup(first);
			expect(document.body.style.backgroundColor).toBe(ownedBySecond);

			// Then disconnecting the actual owner clears it.
			cleanup(second);
			expect(document.body.style.backgroundColor).toBe('');
		});
	});

	describe('overscroll-behavior on documentElement and body', () => {
		const instances: NLDDAppView[] = [];
		async function track(html: string): Promise<NLDDAppView> {
			const el = await fixture<NLDDAppView>(html);
			instances.push(el);
			return el;
		}

		afterEach(() => {
			while (instances.length > 0) {
				const inst = instances.pop()!;
				if (inst.isConnected) cleanup(inst);
			}
			document.documentElement.style.removeProperty('overscroll-behavior');
			document.body.style.removeProperty('overscroll-behavior');
		});

		it('locks overscroll on connect and clears on last disconnect', async () => {
			el = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(el);
			expect(document.documentElement.style.overscrollBehavior).toBe('none');
			expect(document.body.style.overscrollBehavior).toBe('none');

			cleanup(el);
			el = undefined as unknown as NLDDAppView;
			expect(document.documentElement.style.overscrollBehavior).toBe('');
			expect(document.body.style.overscrollBehavior).toBe('');
		});

		it('keeps the lock while another instance is still connected', async () => {
			const first = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(first);
			const second = await track('<nldd-app-view></nldd-app-view>');
			await waitForUpdate(second);

			cleanup(first);
			expect(document.body.style.overscrollBehavior).toBe('none');

			cleanup(second);
			expect(document.body.style.overscrollBehavior).toBe('');
		});
	});
});
