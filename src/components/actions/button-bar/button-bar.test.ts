import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NLDDButtonBar } from './button-bar.ts';
import './button-bar.ts';
import '../button/button.ts';
import '../icon-button/icon-button.ts';

describe('nldd-button-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-button-bar></nldd-button-bar>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});
});

describe('nldd-button-bar – child building & attribute propagation', () => {
	let el: NLDDButtonBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('assigns slot="child-N" to button children', async () => {
		el = await fixture<NLDDButtonBar>(`
			<nldd-button-bar>
				<nldd-button text="A"></nldd-button>
				<nldd-button text="B"></nldd-button>
			</nldd-button-bar>
		`);
		await waitForUpdate(el);

		const buttons = el.querySelectorAll('nldd-button');
		expect(buttons[0].getAttribute('slot')).toBe('child-0');
		expect(buttons[1].getAttribute('slot')).toBe('child-1');
	});

	it('renders divider as separator in shadow DOM without slot on light DOM', async () => {
		el = await fixture<NLDDButtonBar>(`
			<nldd-button-bar>
				<nldd-button text="A"></nldd-button>
				<nldd-button-bar-divider></nldd-button-bar-divider>
				<nldd-button text="B"></nldd-button>
			</nldd-button-bar>
		`);
		await waitForUpdate(el);

		// Divider in light DOM should NOT have a slot attribute
		const divider = el.querySelector('nldd-button-bar-divider')!;
		expect(divider.hasAttribute('slot')).toBe(false);

		// Shadow DOM should contain a divider
		const divider2 = el.shadowRoot!.querySelector('.button-bar__divider');
		expect(divider2).not.toBeNull();
	});

	it('treats nldd-icon-button the same as nldd-button', async () => {
		el = await fixture<NLDDButtonBar>(`
			<nldd-button-bar>
				<nldd-icon-button icon="heart" text="Like"></nldd-icon-button>
				<nldd-button text="Text"></nldd-button>
			</nldd-button-bar>
		`);
		await waitForUpdate(el);

		const iconBtn = el.querySelector('nldd-icon-button')!;
		const btn = el.querySelector('nldd-button')!;

		expect(iconBtn.getAttribute('slot')).toBe('child-0');
		expect(btn.getAttribute('slot')).toBe('child-1');
	});

	it('cleans stale slot attrs before rebuild', async () => {
		el = await fixture<NLDDButtonBar>(`
			<nldd-button-bar>
				<nldd-button text="A"></nldd-button>
				<nldd-button text="B"></nldd-button>
			</nldd-button-bar>
		`);
		await waitForUpdate(el);

		const btnA = el.querySelectorAll('nldd-button')[0];
		expect(btnA.getAttribute('slot')).toBe('child-0');

		// Add a third button — triggers rebuild via MO
		const btnC = document.createElement('nldd-button');
		btnC.setAttribute('text', 'C');
		el.appendChild(btnC);

		await waitForUpdate(el);

		// All slots should be cleanly reassigned (0, 1, 2)
		const buttons = el.querySelectorAll('nldd-button');
		expect(buttons[0].getAttribute('slot')).toBe('child-0');
		expect(buttons[1].getAttribute('slot')).toBe('child-1');
		expect(buttons[2].getAttribute('slot')).toBe('child-2');
	});

	it('propagates initial size to button children', async () => {
		el = await fixture<NLDDButtonBar>(`
			<nldd-button-bar size="sm">
				<nldd-button text="A"></nldd-button>
				<nldd-icon-button icon="x" text="Close"></nldd-icon-button>
			</nldd-button-bar>
		`);
		await waitForUpdate(el);

		expect(el.querySelector('nldd-button')!.getAttribute('size')).toBe('sm');
		expect(el.querySelector('nldd-icon-button')!.getAttribute('size')).toBe('sm');
	});

	it('propagates size change to children', async () => {
		el = await fixture<NLDDButtonBar>(`
			<nldd-button-bar size="md">
				<nldd-button text="A"></nldd-button>
			</nldd-button-bar>
		`);
		await waitForUpdate(el);

		expect(el.querySelector('nldd-button')!.getAttribute('size')).toBe('md');

		el.size = 'xs';
		await waitForUpdate(el);

		expect(el.querySelector('nldd-button')!.getAttribute('size')).toBe('xs');
	});

	it('propagates disabled to children', async () => {
		el = await fixture<NLDDButtonBar>(`
			<nldd-button-bar disabled>
				<nldd-button text="A"></nldd-button>
			</nldd-button-bar>
		`);
		await waitForUpdate(el);

		expect(el.querySelector('nldd-button')!.hasAttribute('disabled')).toBe(true);
	});

	it('removes disabled from children when bar is re-enabled', async () => {
		el = await fixture<NLDDButtonBar>(`
			<nldd-button-bar disabled>
				<nldd-button text="A"></nldd-button>
			</nldd-button-bar>
		`);
		await waitForUpdate(el);

		expect(el.querySelector('nldd-button')!.hasAttribute('disabled')).toBe(true);

		el.disabled = false;
		await waitForUpdate(el);

		expect(el.querySelector('nldd-button')!.hasAttribute('disabled')).toBe(false);
	});

	it('updates slots when a child is added after mount', async () => {
		el = await fixture<NLDDButtonBar>(`
			<nldd-button-bar>
				<nldd-button text="A"></nldd-button>
			</nldd-button-bar>
		`);
		await waitForUpdate(el);

		const newBtn = document.createElement('nldd-button');
		newBtn.setAttribute('text', 'B');
		el.appendChild(newBtn);

		await waitForUpdate(el);

		expect(newBtn.getAttribute('slot')).toBe('child-1');
		// Verify a corresponding named slot exists in shadow DOM
		const namedSlot = el.shadowRoot!.querySelector('slot[name="child-1"]');
		expect(namedSlot).not.toBeNull();
	});

	it('updates slots when a child is removed after mount', async () => {
		el = await fixture<NLDDButtonBar>(`
			<nldd-button-bar>
				<nldd-button text="A"></nldd-button>
				<nldd-button text="B"></nldd-button>
			</nldd-button-bar>
		`);
		await waitForUpdate(el);

		// Remove first button
		el.querySelector('nldd-button')!.remove();

		await waitForUpdate(el);

		// Remaining button should be re-slotted as child-0
		const remaining = el.querySelector('nldd-button')!;
		expect(remaining.getAttribute('slot')).toBe('child-0');
	});
});
