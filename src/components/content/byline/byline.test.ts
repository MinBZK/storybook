import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './byline.js';

const AVATAR = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 40 40\'%3E%3Crect width=\'40\' height=\'40\'/%3E%3C/svg%3E';

describe('nldd-byline', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-byline></nldd-byline>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders text and supporting-text', async () => {
		el = await fixture('<nldd-byline text="Jan Jansen" supporting-text="Redacteur"></nldd-byline>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.byline__text')!.textContent).toBe('Jan Jansen');
		expect(el.shadowRoot!.querySelector('.byline__supporting-text')!.textContent).toBe('Redacteur');
	});

	it('hides the main area without text and supporting-text', async () => {
		el = await fixture(`<nldd-byline><img slot="avatars" src="${AVATAR}" alt=""></nldd-byline>`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.byline__main')!.hasAttribute('hidden')).toBe(true);
	});

	it('hides the supporting-text element when not set', async () => {
		el = await fixture('<nldd-byline text="Jan Jansen"></nldd-byline>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.byline__text')!.hasAttribute('hidden')).toBe(false);
		expect(el.shadowRoot!.querySelector('.byline__supporting-text')!.hasAttribute('hidden')).toBe(true);
	});


	/* ============================================================
	   Text slots (attribute is the slot fallback)
	   ============================================================ */

	it('renders slotted rich content in the text and supporting-text slots', async () => {
		el = await fixture(`
			<nldd-byline>
				<span slot="text">Door <a href="/auteurs/jan">Jan Jansen</a></span>
				<time slot="supporting-text" datetime="2026-06-12">12 juni 2026</time>
			</nldd-byline>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.byline__main')!.hasAttribute('hidden')).toBe(false);
		expect(el.shadowRoot!.querySelector('.byline__text')!.hasAttribute('hidden')).toBe(false);
		expect(el.shadowRoot!.querySelector('.byline__supporting-text')!.hasAttribute('hidden')).toBe(false);
		const textSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="text"]')!;
		const supportingSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="supporting-text"]')!;
		expect(textSlot.assignedElements().length).toBe(1);
		expect(supportingSlot.assignedElements()[0]!.tagName).toBe('TIME');
	});

	it('uses the attribute as fallback when the slot is empty', async () => {
		el = await fixture('<nldd-byline text="Jan Jansen"></nldd-byline>');
		await waitForUpdate(el);
		const text = el.shadowRoot!.querySelector('.byline__text')!;
		expect(text.textContent).toContain('Jan Jansen');
		expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="text"]')!.assignedElements().length).toBe(0);
	});

	it('shows the main area when slotted content is added at runtime', async () => {
		el = await fixture('<nldd-byline></nldd-byline>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.byline__main')!.hasAttribute('hidden')).toBe(true);
		const time = document.createElement('time');
		time.setAttribute('slot', 'supporting-text');
		time.setAttribute('datetime', '2026-06-12');
		time.textContent = '12 juni 2026';
		el.appendChild(time);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.byline__main')!.hasAttribute('hidden')).toBe(false);
		expect(el.shadowRoot!.querySelector('.byline__text')!.hasAttribute('hidden')).toBe(true);
	});


	/* ============================================================
	   Avatar slot management
	   ============================================================ */

	it('hides the avatars area without slotted avatars', async () => {
		el = await fixture('<nldd-byline text="Jan Jansen"></nldd-byline>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.byline__avatars')!.hasAttribute('hidden')).toBe(true);
	});

	it('shows the avatars area with a slotted avatar', async () => {
		el = await fixture(`<nldd-byline text="Jan Jansen"><img slot="avatars" src="${AVATAR}" alt=""></nldd-byline>`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.byline__avatars')!.hasAttribute('hidden')).toBe(false);
	});

	it('supports multiple slotted avatars', async () => {
		el = await fixture(`
			<nldd-byline text="Jan, Petra en Ahmed">
				<img slot="avatars" src="${AVATAR}" alt="">
				<img slot="avatars" src="${AVATAR}" alt="">
				<img slot="avatars" src="${AVATAR}" alt="">
			</nldd-byline>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="avatars"]')!;
		expect(slot.assignedElements().length).toBe(3);
		expect(el.shadowRoot!.querySelector('.byline__avatars')!.hasAttribute('hidden')).toBe(false);
	});

	it('updates avatar visibility when avatars are added at runtime', async () => {
		el = await fixture('<nldd-byline text="Jan Jansen"></nldd-byline>');
		await waitForUpdate(el);
		const img = document.createElement('img');
		img.setAttribute('slot', 'avatars');
		img.setAttribute('src', AVATAR);
		img.setAttribute('alt', '');
		el.appendChild(img);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.byline__avatars')!.hasAttribute('hidden')).toBe(false);
	});
});
