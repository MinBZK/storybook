import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDButtonBar } from './ndd-button-bar.ts';
import './ndd-button-bar.ts';
import '../button/ndd-button.ts';
import '../icon-button/ndd-icon-button.ts';

describe('ndd-button-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-button-bar></ndd-button-bar>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});
});

describe('ndd-button-bar – child building & attribute propagation', () => {
	let el: NDDButtonBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('assigns slot="child-N" to button children', async () => {
		el = await fixture<NDDButtonBar>(`
			<ndd-button-bar>
				<ndd-button text="A"></ndd-button>
				<ndd-button text="B"></ndd-button>
			</ndd-button-bar>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll('ndd-button');
		expect(buttons[0].getAttribute('slot')).toBe('child-0');
		expect(buttons[1].getAttribute('slot')).toBe('child-1');
	});

	it('renders divider as separator in shadow DOM without slot on light DOM', async () => {
		el = await fixture<NDDButtonBar>(`
			<ndd-button-bar>
				<ndd-button text="A"></ndd-button>
				<ndd-button-bar-divider></ndd-button-bar-divider>
				<ndd-button text="B"></ndd-button>
			</ndd-button-bar>
		`);
		await waitForUpdate(el);

		// Divider in light DOM should NOT have a slot attribute
		const divider = el.querySelector('ndd-button-bar-divider')!;
		expect(divider.hasAttribute('slot')).toBe(false);

		// Shadow DOM should contain a divider
		const divider2 = el.shadowRoot!.querySelector('.button-bar__divider');
		expect(divider2).not.toBeNull();
	});

	it('treats ndd-icon-button the same as ndd-button', async () => {
		el = await fixture<NDDButtonBar>(`
			<ndd-button-bar>
				<ndd-icon-button icon="heart" text="Like"></ndd-icon-button>
				<ndd-button text="Text"></ndd-button>
			</ndd-button-bar>
		`);
		await waitForUpdate(el);

		const iconBtn = el.querySelector('ndd-icon-button')!;
		const btn = el.querySelector('ndd-button')!;

		expect(iconBtn.getAttribute('slot')).toBe('child-0');
		expect(btn.getAttribute('slot')).toBe('child-1');
	});

	it('cleans stale slot attrs before rebuild', async () => {
		el = await fixture<NDDButtonBar>(`
			<ndd-button-bar>
				<ndd-button text="A"></ndd-button>
				<ndd-button text="B"></ndd-button>
			</ndd-button-bar>
		`);
		await waitForUpdate(el);

		const btnA = el.querySelectorAll('ndd-button')[0];
		expect(btnA.getAttribute('slot')).toBe('child-0');

		// Add a third button — triggers rebuild via MO
		const btnC = document.createElement('ndd-button');
		btnC.setAttribute('text', 'C');
		el.appendChild(btnC);

		await waitForUpdate(el);

		// All slots should be cleanly reassigned (0, 1, 2)
		const buttons = el.querySelectorAll('ndd-button');
		expect(buttons[0].getAttribute('slot')).toBe('child-0');
		expect(buttons[1].getAttribute('slot')).toBe('child-1');
		expect(buttons[2].getAttribute('slot')).toBe('child-2');
	});

	it('propagates initial size to button children', async () => {
		el = await fixture<NDDButtonBar>(`
			<ndd-button-bar size="sm">
				<ndd-button text="A"></ndd-button>
				<ndd-icon-button icon="x" text="Close"></ndd-icon-button>
			</ndd-button-bar>
		`);
		await waitForUpdate(el);

		expect(el.querySelector('ndd-button')!.getAttribute('size')).toBe('sm');
		expect(el.querySelector('ndd-icon-button')!.getAttribute('size')).toBe('sm');
	});

	it('propagates size change to children', async () => {
		el = await fixture<NDDButtonBar>(`
			<ndd-button-bar size="md">
				<ndd-button text="A"></ndd-button>
			</ndd-button-bar>
		`);
		await waitForUpdate(el);

		expect(el.querySelector('ndd-button')!.getAttribute('size')).toBe('md');

		el.size = 'xs';
		await waitForUpdate(el);

		expect(el.querySelector('ndd-button')!.getAttribute('size')).toBe('xs');
	});

	it('propagates disabled to children', async () => {
		el = await fixture<NDDButtonBar>(`
			<ndd-button-bar disabled>
				<ndd-button text="A"></ndd-button>
			</ndd-button-bar>
		`);
		await waitForUpdate(el);

		expect(el.querySelector('ndd-button')!.hasAttribute('disabled')).toBe(true);
	});

	it('removes disabled from children when bar is re-enabled', async () => {
		el = await fixture<NDDButtonBar>(`
			<ndd-button-bar disabled>
				<ndd-button text="A"></ndd-button>
			</ndd-button-bar>
		`);
		await waitForUpdate(el);

		expect(el.querySelector('ndd-button')!.hasAttribute('disabled')).toBe(true);

		el.disabled = false;
		await waitForUpdate(el);

		expect(el.querySelector('ndd-button')!.hasAttribute('disabled')).toBe(false);
	});

	it('updates slots when a child is added after mount', async () => {
		el = await fixture<NDDButtonBar>(`
			<ndd-button-bar>
				<ndd-button text="A"></ndd-button>
			</ndd-button-bar>
		`);
		await waitForUpdate(el);

		const newBtn = document.createElement('ndd-button');
		newBtn.setAttribute('text', 'B');
		el.appendChild(newBtn);

		await waitForUpdate(el);

		expect(newBtn.getAttribute('slot')).toBe('child-1');
		// Verify a corresponding named slot exists in shadow DOM
		const namedSlot = el.shadowRoot!.querySelector('slot[name="child-1"]');
		expect(namedSlot).not.toBeNull();
	});

	it('updates slots when a child is removed after mount', async () => {
		el = await fixture<NDDButtonBar>(`
			<ndd-button-bar>
				<ndd-button text="A"></ndd-button>
				<ndd-button text="B"></ndd-button>
			</ndd-button-bar>
		`);
		await waitForUpdate(el);

		// Remove first button
		el.querySelector('ndd-button')!.remove();

		await waitForUpdate(el);

		// Remaining button should be re-slotted as child-0
		const remaining = el.querySelector('ndd-button')!;
		expect(remaining.getAttribute('slot')).toBe('child-0');
	});
});
