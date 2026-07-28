import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDImage } from './image.js';
import './image.js';

describe('nldd-image', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without errors', async () => {
		el = await fixture('<nldd-image src="/foo.jpg" alt="Foo"></nldd-image>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders an internal img with src and alt', async () => {
		el = await fixture('<nldd-image src="/foo.jpg" alt="Foo"></nldd-image>');
		await waitForUpdate(el);
		const img = el.shadowRoot!.querySelector('img')!;
		expect(img.getAttribute('src')).toBe('/foo.jpg');
		expect(img.getAttribute('alt')).toBe('Foo');
	});

	it('defaults loading to lazy and decoding to async', async () => {
		el = await fixture('<nldd-image src="/foo.jpg" alt="Foo"></nldd-image>');
		await waitForUpdate(el);
		const img = el.shadowRoot!.querySelector('img')!;
		expect(img.getAttribute('loading')).toBe('lazy');
		expect(img.getAttribute('decoding')).toBe('async');
	});

	it('forces alt empty and aria-hidden when decorative', async () => {
		el = await fixture('<nldd-image src="/foo.jpg" alt="Ignored" decorative></nldd-image>');
		await waitForUpdate(el);
		const img = el.shadowRoot!.querySelector('img')!;
		expect(img.getAttribute('alt')).toBe('');
		expect(img.getAttribute('aria-hidden')).toBe('true');
	});

	it('omits the figure wrapper when no caption or credit is set', async () => {
		el = await fixture('<nldd-image src="/foo.jpg" alt="Foo"></nldd-image>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('figure')).toBeNull();
	});

	it('renders figure + figcaption when caption is set', async () => {
		el = await fixture('<nldd-image src="/foo.jpg" alt="Foo" caption="Een caption"></nldd-image>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('figure')).not.toBeNull();
		const cap = el.shadowRoot!.querySelector('figcaption')!;
		expect(cap.textContent).toContain('Een caption');
	});

	it('renders credit inside the figcaption', async () => {
		el = await fixture('<nldd-image src="/foo.jpg" alt="Foo" credit="Foto: Rijksoverheid"></nldd-image>');
		await waitForUpdate(el);
		const credit = el.shadowRoot!.querySelector('.image__credit')!;
		expect(credit.textContent).toBe('Foto: Rijksoverheid');
	});

	it('reflects shape attribute', async () => {
		el = await fixture<NLDDImage>('<nldd-image src="/foo.jpg" alt="Foo" shape="circle"></nldd-image>');
		await waitForUpdate(el);
		expect((el as unknown as NLDDImage).shape).toBe('circle');
		expect(el.getAttribute('shape')).toBe('circle');
	});

	it('defaults shape to square', async () => {
		el = await fixture<NLDDImage>('<nldd-image src="/foo.jpg" alt="Foo"></nldd-image>');
		await waitForUpdate(el);
		expect((el as unknown as NLDDImage).shape).toBe('square');
		// The default shape is not reflected — kept out of the DOM.
		expect(el.hasAttribute('shape')).toBe(false);
	});

	it('defaults width to "full" and applies no host max-width', async () => {
		el = await fixture<NLDDImage>('<nldd-image src="/foo.jpg" alt="Foo"></nldd-image>');
		await waitForUpdate(el);
		expect(el.style.maxWidth).toBe('');
		const img = el.shadowRoot!.querySelector('img')!;
		expect(img.hasAttribute('width')).toBe(false);
	});

	it('applies max-width via --_max-width custom property and width hint on img when width is numeric', async () => {
		el = await fixture<NLDDImage>('<nldd-image src="/foo.jpg" alt="Foo" width="240"></nldd-image>');
		await waitForUpdate(el);
		// The component routes width through --_max-width so consumer CSS can
		// override the host's max-width if needed.
		expect(el.style.getPropertyValue('--_max-width')).toBe('240px');
		const img = el.shadowRoot!.querySelector('img')!;
		expect(img.getAttribute('width')).toBe('240');
	});

	it('reflects aspect-ratio as inline style on the media wrapper (colon → slash)', async () => {
		el = await fixture('<nldd-image src="/foo.jpg" alt="Foo" aspect-ratio="16:9"></nldd-image>');
		await waitForUpdate(el);
		const media = el.shadowRoot!.querySelector<HTMLElement>('.image__media')!;
		// Browser normalizes the parsed value with surrounding spaces.
		expect(media.style.aspectRatio.replace(/\s+/g, '')).toBe('16/9');
	});

	it('uses the slotted img as the displayed image instead of the fallback', async () => {
		el = await fixture(`
			<nldd-image>
				<img src="/slotted.jpg" alt="Slotted">
			</nldd-image>
		`);
		await waitForUpdate(el);
		// The fallback img exists in shadow DOM (it's the slot's default content)
		// but the slot's *assigned* nodes are what actually render.
		const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;
		const assigned = slot.assignedElements({ flatten: true });
		expect(assigned.length).toBe(1);
		expect(assigned[0].tagName).toBe('IMG');
		expect(assigned[0].getAttribute('src')).toBe('/slotted.jpg');
	});

	it('populates an aria-live status region with the error message + alt on error', async () => {
		// Mount with no src first so the img doesn't try (and fail) to load a
		// missing URL — that fires `error` synchronously in some browsers and
		// races with the "pre-error state is empty" assertion below.
		el = await fixture<NLDDImage>('<nldd-image alt="Beschrijving"></nldd-image>');
		await waitForUpdate(el);
		const status = el.shadowRoot!.querySelector('.image__status');
		expect(status).not.toBeNull();
		expect(status!.getAttribute('aria-live')).toBe('polite');
		expect(status!.textContent).toBe('');
		// Force the error transition by dispatching directly on the internal img.
		const img = el.shadowRoot!.querySelector('img')!;
		img.dispatchEvent(new Event('error'));
		await waitForUpdate(el);
		// Text now contains the translated default + the alt, so SR users get a
		// meaningful announcement on the empty → non-empty transition.
		expect(status!.textContent).toBe('Afbeelding is niet geladen: Beschrijving');
	});

	it('does not announce in the status region for decorative errored images', async () => {
		el = await fixture<NLDDImage>('<nldd-image src="/missing.jpg" alt="Ignored" decorative></nldd-image>');
		await waitForUpdate(el);
		const img = el.shadowRoot!.querySelector('img')!;
		img.dispatchEvent(new Event('error'));
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.image__status')!.textContent).toBe('');
	});

	it('renders the error overlay with icon + alt text when the image errors', async () => {
		el = await fixture<NLDDImage>('<nldd-image src="/missing.jpg" alt="Beschrijving"></nldd-image>');
		await waitForUpdate(el);
		// Force the error state directly (jsdom/headless browsers may or may
		// not fire a real error event for a missing relative URL).
		const img = el.shadowRoot!.querySelector('img')!;
		img.dispatchEvent(new Event('error'));
		await waitForUpdate(el);
		const overlay = el.shadowRoot!.querySelector('.image__error');
		expect(overlay).not.toBeNull();
		// The visible .image__error-text carries the alt; the wrapper deliberately
		// no longer mirrors it via aria-label to avoid a double SR announcement.
		expect(overlay!.hasAttribute('aria-label')).toBe(false);
		expect(el.shadowRoot!.querySelector('.image__error-text')?.textContent).toBe('Beschrijving');
		expect(el.shadowRoot!.querySelector('nldd-icon')).not.toBeNull();
	});

	it('hides the alt text in the error overlay when decorative', async () => {
		el = await fixture<NLDDImage>('<nldd-image src="/missing.jpg" alt="Ignored" decorative></nldd-image>');
		await waitForUpdate(el);
		const img = el.shadowRoot!.querySelector('img')!;
		img.dispatchEvent(new Event('error'));
		await waitForUpdate(el);
		const overlay = el.shadowRoot!.querySelector('.image__error')!;
		expect(el.shadowRoot!.querySelector('.image__error-text')).toBeNull();
		// Overlay is hidden from assistive tech entirely for decorative images:
		// no img role, no label, aria-hidden true.
		expect(overlay.hasAttribute('role')).toBe(false);
		expect(overlay.hasAttribute('aria-label')).toBe(false);
		expect(overlay.getAttribute('aria-hidden')).toBe('true');
	});

	it('passes through srcset and sizes', async () => {
		el = await fixture('<nldd-image src="/foo.jpg" alt="Foo" srcset="/foo-2x.jpg 2x" sizes="100vw"></nldd-image>');
		await waitForUpdate(el);
		const img = el.shadowRoot!.querySelector('img')!;
		expect(img.getAttribute('srcset')).toBe('/foo-2x.jpg 2x');
		expect(img.getAttribute('sizes')).toBe('100vw');
	});

	it('forwards a valid lqip CSV as 7 inline --context-lqip-* CSS variables', async () => {
		// Skip src so the image never errors out and removes the lqip class.
		el = await fixture<NLDDImage>('<nldd-image alt="Foo" lqip="98,154,162,99,99,99,100"></nldd-image>');
		await waitForUpdate(el);
		const media = el.shadowRoot!.querySelector<HTMLElement>('.image__media')!;
		expect(media.style.getPropertyValue('--context-lqip-base')).toBe('98');
		expect(media.style.getPropertyValue('--context-lqip-c1')).toBe('154');
		expect(media.style.getPropertyValue('--context-lqip-c2')).toBe('162');
		expect(media.style.getPropertyValue('--context-lqip-c3')).toBe('99');
		expect(media.style.getPropertyValue('--context-lqip-c4')).toBe('99');
		expect(media.style.getPropertyValue('--context-lqip-c5')).toBe('99');
		expect(media.style.getPropertyValue('--context-lqip-c6')).toBe('100');
		expect(media.classList.contains('image__media--lqip')).toBe(true);
	});

	it('silently ignores a malformed lqip string', async () => {
		// Too few values, out-of-range numbers, non-integers, empty — all
		// should fall through to "no LQIP" instead of throwing or producing
		// half-set CSS vars.
		for (const bad of ['1,2,3', '300,300,300,300,300,300,300', 'foo,1,2,3,4,5,6', '']) {
			el = await fixture<NLDDImage>(`<nldd-image alt="Foo" lqip="${bad}"></nldd-image>`);
			await waitForUpdate(el);
			const media = el.shadowRoot!.querySelector<HTMLElement>('.image__media')!;
			expect(media.style.getPropertyValue('--context-lqip-base')).toBe('');
			expect(media.classList.contains('image__media--lqip')).toBe(false);
			cleanup(el);
		}
	});

	it('sets the loaded host attribute when the image loads', async () => {
		// No src: a relative URL would 404 in the test env and fire a real
		// `error`, racing the synthetic `load` below. The load handler doesn't
		// depend on src, so dispatching directly is enough.
		el = await fixture<NLDDImage>('<nldd-image alt="Foo"></nldd-image>');
		await waitForUpdate(el);
		const img = el.shadowRoot!.querySelector('img')!;
		img.dispatchEvent(new Event('load'));
		await waitForUpdate(el);
		expect(el.hasAttribute('loaded')).toBe(true);
		expect(el.hasAttribute('errored')).toBe(false);
	});

	it('sets the errored host attribute when the image fails to load', async () => {
		el = await fixture<NLDDImage>('<nldd-image src="/missing.jpg" alt="Foo"></nldd-image>');
		await waitForUpdate(el);
		const img = el.shadowRoot!.querySelector('img')!;
		img.dispatchEvent(new Event('error'));
		await waitForUpdate(el);
		expect(el.hasAttribute('errored')).toBe(true);
		expect(el.hasAttribute('loaded')).toBe(false);
	});
});
