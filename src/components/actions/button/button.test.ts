import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDButton } from './button.js';
import './button.js';

describe('nldd-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-button></nldd-button>');
		await waitForUpdate(el);

		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders text from text attribute', async () => {
		el = await fixture('<nldd-button text="Click me"></nldd-button>');
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.button__content')!;
		expect(content.textContent).toContain('Click me');
	});

	it('forwards aria-label to the inner button element', async () => {
		el = await fixture('<nldd-button accessible-label="Close dialog" text="X"></nldd-button>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('button');
		expect(inner!.getAttribute('aria-label')).toBe('Close dialog');
	});

	it('does not set aria-label on inner button when property is empty', async () => {
		el = await fixture('<nldd-button text="Click me"></nldd-button>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('button');
		expect(inner!.hasAttribute('aria-label')).toBe(false);
	});
});

describe('nldd-button – icon attributes', () => {
	let el: NLDDButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders no icons when no icon attributes are set', async () => {
		el = await fixture<NLDDButton>('<nldd-button text="Click me"></nldd-button>');
		await waitForUpdate(el);

		const shadowIcons = el.shadowRoot!.querySelectorAll('.button__start-icon, .button__end-icon');
		expect(shadowIcons.length).toBe(0);
	});

	it('renders start icon from start-icon attribute', async () => {
		el = await fixture<NLDDButton>('<nldd-button text="Like" start-icon="heart"></nldd-button>');
		await waitForUpdate(el);

		const startIcon = el.shadowRoot!.querySelector('.button__start-icon');
		const endIcon = el.shadowRoot!.querySelector('.button__end-icon');

		expect(startIcon).not.toBeNull();
		expect(startIcon!.getAttribute('name')).toBe('heart');
		expect(endIcon).toBeNull();
	});

	it('renders end icon from end-icon attribute', async () => {
		el = await fixture<NLDDButton>('<nldd-button text="Next" end-icon="arrow-right"></nldd-button>');
		await waitForUpdate(el);

		const startIcon = el.shadowRoot!.querySelector('.button__start-icon');
		const endIcon = el.shadowRoot!.querySelector('.button__end-icon');

		expect(startIcon).toBeNull();
		expect(endIcon).not.toBeNull();
		expect(endIcon!.getAttribute('name')).toBe('arrow-right');
	});

	it('renders both start and end icons', async () => {
		el = await fixture<NLDDButton>('<nldd-button text="Favorite" start-icon="heart" end-icon="chevron-down-small"></nldd-button>');
		await waitForUpdate(el);

		const startIcon = el.shadowRoot!.querySelector('.button__start-icon');
		const endIcon = el.shadowRoot!.querySelector('.button__end-icon');

		expect(startIcon).not.toBeNull();
		expect(startIcon!.getAttribute('name')).toBe('heart');
		expect(endIcon).not.toBeNull();
		expect(endIcon!.getAttribute('name')).toBe('chevron-down-small');
	});

	it('renders start-icon slot when start-icon attribute is not set', async () => {
		el = await fixture<NLDDButton>(`
			<nldd-button text="Custom">
				<svg slot="start-icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</nldd-button>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot[name="start-icon"]') as HTMLSlotElement;
		expect(slot).not.toBeNull();
		expect(slot!.assignedElements().length).toBe(1);
	});

	it('renders end-icon slot when end-icon attribute is not set', async () => {
		el = await fixture<NLDDButton>(`
			<nldd-button text="Custom">
				<svg slot="end-icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</nldd-button>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot[name="end-icon"]') as HTMLSlotElement;
		expect(slot).not.toBeNull();
		expect(slot!.assignedElements().length).toBe(1);
	});
});

describe('nldd-button – href / link rendering', () => {
	let el: NLDDButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders a <button> by default', async () => {
		el = await fixture<NLDDButton>('<nldd-button text="Click"></nldd-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('a')).toBeNull();
	});

	it('does not reflect href attribute when not set', async () => {
		el = await fixture<NLDDButton>('<nldd-button text="Click"></nldd-button>');
		await waitForUpdate(el);
		expect(el.hasAttribute('href')).toBe(false);
	});

	it('renders an <a> when href is set', async () => {
		el = await fixture<NLDDButton>('<nldd-button href="/overzicht" text="Terug"></nldd-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});

	it('sets href on the anchor element', async () => {
		el = await fixture<NLDDButton>('<nldd-button href="/overzicht" text="Terug"></nldd-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('href')).toBe('/overzicht');
	});

	it('forwards target and rel to the anchor element', async () => {
		el = await fixture<NLDDButton>('<nldd-button href="/overzicht" target="_blank" rel="noopener" text="Terug"></nldd-button>');
		await waitForUpdate(el);
		const a = el.shadowRoot!.querySelector('a')!;
		expect(a.getAttribute('target')).toBe('_blank');
		expect(a.getAttribute('rel')).toBe('noopener');
	});

	it('defaults rel to noopener noreferrer when target is _blank and rel is not set', async () => {
		el = await fixture<NLDDButton>('<nldd-button href="/overzicht" target="_blank" text="Terug"></nldd-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('rel')).toBe('noopener noreferrer');
	});

	it('sets aria-disabled on the anchor when disabled', async () => {
		el = await fixture<NLDDButton>('<nldd-button href="/overzicht" disabled text="Terug"></nldd-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-disabled')).toBe('true');
	});

	it('forwards accessible-label to the anchor element', async () => {
		el = await fixture<NLDDButton>('<nldd-button href="/overzicht" accessible-label="Ga terug naar overzicht" text="Terug"></nldd-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-label')).toBe('Ga terug naar overzicht');
	});

	it('prevents default click on disabled anchor to block navigation', async () => {
		el = await fixture<NLDDButton>('<nldd-button href="/overzicht" disabled text="Terug"></nldd-button>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		const preventSpy = vi.spyOn(event, 'preventDefault');
		anchor.dispatchEvent(event);
		expect(preventSpy).toHaveBeenCalled();
	});

	it('switches from <button> to <a> when href is set dynamically', async () => {
		el = await fixture<NLDDButton>('<nldd-button text="Terug"></nldd-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();

		el.href = '/overzicht';
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});
});
