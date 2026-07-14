import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDAvatar } from './avatar.js';
import './avatar.js';

const IMAGE = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 40 40\'%3E%3Crect width=\'40\' height=\'40\'/%3E%3C/svg%3E';

describe('nldd-avatar', () => {
	let el: NLDDAvatar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-avatar></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to type person, default colour, and a container-scaled size', async () => {
		el = await fixture('<nldd-avatar name="Bart van de Biezen"></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.type).toBe('person');
		expect(el.color).toBe('default');
		expect(el.size).toBe(''); // empty = scale to the container (like nldd-icon)
	});

	it('reflects color="inherit" and keeps default colour unreflected', async () => {
		el = await fixture('<nldd-avatar name="Bart van de Biezen" color="inherit"></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.color).toBe('inherit');
		expect(el.getAttribute('color')).toBe('inherit');
		el.color = 'default';
		await waitForUpdate(el);
		expect(el.hasAttribute('color')).toBe(false);
	});

	it('reflects icon-aligned and scales the disc to 5/6', async () => {
		el = await fixture('<nldd-avatar name="Bart van de Biezen" size="48" icon-aligned></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.iconAligned).toBe(true);
		expect(el.getAttribute('icon-aligned')).toBe('');
		// --_content-scale drives the 5/6 disc; default avatars stay full-bleed (1).
		expect(getComputedStyle(el).getPropertyValue('--_content-scale').trim()).toBe('calc(5 / 6)');
		el.iconAligned = false;
		await waitForUpdate(el);
		expect(el.hasAttribute('icon-aligned')).toBe(false);
		expect(getComputedStyle(el).getPropertyValue('--_content-scale').trim()).toBe('1');
	});

	it('derives initials from the first and last word of the name', async () => {
		el = await fixture('<nldd-avatar name="Bart van de Biezen"></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.resolvedInitials).toBe('BB');
		expect(el.shadowRoot!.querySelector('.avatar__initials')!.textContent).toBe('BB');
	});

	it('derives initials from first + last word, skipping middle words', async () => {
		el = await fixture('<nldd-avatar name="Petra van der Berg"></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.resolvedInitials).toBe('PB');
	});

	it('lets explicit initials override the derivation', async () => {
		el = await fixture('<nldd-avatar name="Kamer van Koophandel" initials="KvK"></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.resolvedInitials).toBe('KvK');
		expect(el.shadowRoot!.querySelector('.avatar__initials')!.textContent).toBe('KvK');
	});

	it('caps explicit initials at three characters', async () => {
		el = await fixture('<nldd-avatar initials="ABCDE" decorative></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.resolvedInitials).toBe('ABC');
		expect(el.shadowRoot!.querySelector('.avatar__initials')!.textContent).toBe('ABC');
	});

	it('renders the image when src is set, with an empty alt (host owns the label)', async () => {
		el = await fixture(`<nldd-avatar name="Jan Jansen" src="${IMAGE}"></nldd-avatar>`);
		await waitForUpdate(el);
		const img = el.shadowRoot!.querySelector<HTMLImageElement>('.avatar__image');
		expect(img).not.toBeNull();
		expect(img!.getAttribute('alt')).toBe('');
		expect(el.shadowRoot!.querySelector('.avatar__initials')).toBeNull();
	});

	it('falls back to initials when the image errors', async () => {
		el = await fixture(`<nldd-avatar name="Bart van de Biezen" src="${IMAGE}"></nldd-avatar>`);
		await waitForUpdate(el);
		const img = el.shadowRoot!.querySelector('.avatar__image')!;
		img.dispatchEvent(new Event('error'));
		await waitForUpdate(el);
		expect(el._imageFailed).toBe(true);
		expect(el.shadowRoot!.querySelector('.avatar__image')).toBeNull();
		expect(el.shadowRoot!.querySelector('.avatar__initials')!.textContent).toBe('BB');
	});

	it('resets the image-failed state when src changes', async () => {
		el = await fixture(`<nldd-avatar name="Bart van de Biezen" src="${IMAGE}"></nldd-avatar>`);
		await waitForUpdate(el);
		el.shadowRoot!.querySelector('.avatar__image')!.dispatchEvent(new Event('error'));
		await waitForUpdate(el);
		expect(el._imageFailed).toBe(true);
		el.src = `${IMAGE}#other`;
		await waitForUpdate(el);
		expect(el._imageFailed).toBe(false);
		expect(el.shadowRoot!.querySelector('.avatar__image')).not.toBeNull();
	});

	it('falls back to the person icon without image/initials', async () => {
		el = await fixture('<nldd-avatar decorative></nldd-avatar>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('.avatar__icon');
		expect(icon).not.toBeNull();
		expect(icon!.getAttribute('name')).toBe('person');
	});

	it('falls back to the building icon for an organization', async () => {
		el = await fixture('<nldd-avatar type="organization" decorative></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.resolvedIcon).toBe('building');
		expect(el.shadowRoot!.querySelector('.avatar__icon')!.getAttribute('name')).toBe('building');
	});

	it('lets the icon attribute override the fallback icon', async () => {
		el = await fixture('<nldd-avatar icon="star" decorative></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.resolvedIcon).toBe('star');
		expect(el.shadowRoot!.querySelector('.avatar__icon')!.getAttribute('name')).toBe('star');
	});

	it('exposes role=img and the name as label when named and not decorative', async () => {
		el = await fixture('<nldd-avatar name="Bart van de Biezen"></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('img');
		expect(el.getAttribute('aria-label')).toBe('Bart van de Biezen');
		expect(el.hasAttribute('aria-hidden')).toBe(false);
	});

	it('is hidden from assistive tech when decorative', async () => {
		el = await fixture('<nldd-avatar name="Bart van de Biezen" decorative></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.getAttribute('aria-hidden')).toBe('true');
		expect(el.hasAttribute('role')).toBe(false);
		expect(el.hasAttribute('aria-label')).toBe(false);
	});

	it('is hidden from assistive tech when it has no name', async () => {
		el = await fixture('<nldd-avatar></nldd-avatar>');
		await waitForUpdate(el);
		expect(el.getAttribute('aria-hidden')).toBe('true');
		expect(el.hasAttribute('role')).toBe(false);
	});
});
