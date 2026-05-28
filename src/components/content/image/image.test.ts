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

	it('defaults shape to rounded', async () => {
		el = await fixture<NLDDImage>('<nldd-image src="/foo.jpg" alt="Foo"></nldd-image>');
		await waitForUpdate(el);
		expect((el as unknown as NLDDImage).shape).toBe('rounded');
		expect(el.getAttribute('shape')).toBe('rounded');
	});

	it('defaults width to "full" and applies no host max-width', async () => {
		el = await fixture<NLDDImage>('<nldd-image src="/foo.jpg" alt="Foo"></nldd-image>');
		await waitForUpdate(el);
		expect(el.style.maxWidth).toBe('');
		const img = el.shadowRoot!.querySelector('img')!;
		expect(img.hasAttribute('width')).toBe(false);
	});

	it('applies max-width on host and width hint on img when width is numeric', async () => {
		el = await fixture<NLDDImage>('<nldd-image src="/foo.jpg" alt="Foo" width="240"></nldd-image>');
		await waitForUpdate(el);
		expect(el.style.maxWidth).toBe('240px');
		const img = el.shadowRoot!.querySelector('img')!;
		expect(img.getAttribute('width')).toBe('240');
	});

	it('reflects aspect-ratio as inline style on the media wrapper (colon → slash)', async () => {
		el = await fixture('<nldd-image src="/foo.jpg" alt="Foo" aspect-ratio="16:9"></nldd-image>');
		await waitForUpdate(el);
		const media = el.shadowRoot!.querySelector<HTMLElement>('.image__media')!;
		// Browser normalises the parsed value with surrounding spaces.
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

	it('passes through srcset and sizes', async () => {
		el = await fixture('<nldd-image src="/foo.jpg" alt="Foo" srcset="/foo-2x.jpg 2x" sizes="100vw"></nldd-image>');
		await waitForUpdate(el);
		const img = el.shadowRoot!.querySelector('img')!;
		expect(img.getAttribute('srcset')).toBe('/foo-2x.jpg 2x');
		expect(img.getAttribute('sizes')).toBe('100vw');
	});
});
