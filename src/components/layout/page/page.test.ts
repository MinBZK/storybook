import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './page.js';

describe('nldd-page', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-page></nldd-page>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects sticky-header attribute', async () => {
		el = await fixture('<nldd-page sticky-header></nldd-page>');
		await waitForUpdate(el);
		expect(el.hasAttribute('sticky-header')).toBe(true);
	});

	it('reflects sticky-footer attribute', async () => {
		el = await fixture('<nldd-page sticky-footer></nldd-page>');
		await waitForUpdate(el);
		expect(el.hasAttribute('sticky-footer')).toBe(true);
	});

	it('reflects tinted attribute', async () => {
		el = await fixture('<nldd-page background="tinted"></nldd-page>');
		await waitForUpdate(el);
		expect(el.getAttribute('background')).toBe('tinted');
	});

	it('renders a page__scroll wrapper', async () => {
		el = await fixture('<nldd-page></nldd-page>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.page__scroll')).not.toBeNull();
	});

	it('sets paddingTop on scroll wrapper when sticky-header is set', async () => {
		el = await fixture('<nldd-page sticky-header><div slot="header" style="height: 48px;">Header</div></nldd-page>');
		await waitForUpdate(el);
		// ResizeObserver fires asynchronously — wait for it to settle
		await new Promise(r => setTimeout(r, 100));
		const scroll = el.shadowRoot!.querySelector('.page__scroll') as HTMLElement;
		expect(scroll.style.paddingTop).not.toBe('');
	});

	describe('layer heights for sticky content', () => {
		/* A custom property hands on its calc() untouched, so the value only
		   resolves where it lands. This probe is what a consumer writes anyway:
		   something sticky inside the page, clearing whatever is above it. */
		const stickyProbe = '<div id="probe" style="position: sticky; top: var(--context-inset-top, 0px); bottom: var(--context-inset-bottom, 0px);">Probe</div>';
		const probeTop = (el: HTMLElement) =>
			getComputedStyle(el.querySelector('#probe')!).top;
		const probeBottom = (el: HTMLElement) =>
			getComputedStyle(el.querySelector('#probe')!).bottom;

		it('adds its own sticky header to the layers above, so content inside can clear it', async () => {
			el = await fixture(`
				<nldd-page sticky-header style="--context-scroll-mode: root; --context-inset-top: 60px;">
					<div slot="header" style="height: 50px;">Header</div>
					${stickyProbe}
				</nldd-page>
			`);
			await waitForUpdate(el);
			await new Promise(r => setTimeout(r, 100));
			expect(probeTop(el)).toBe('110px');
		});

		it('counts only its own header while it owns the scroller, since the bars above sit outside it', async () => {
			el = await fixture(`
				<nldd-page sticky-header style="--context-inset-top: 60px;">
					<div slot="header" style="height: 50px;">Header</div>
					${stickyProbe}
				</nldd-page>
			`);
			await waitForUpdate(el);
			await new Promise(r => setTimeout(r, 100));
			expect(probeTop(el)).toBe('50px');
		});

		it('adds nothing for a header that is not sticky: it scrolls away and leaves no layer', async () => {
			el = await fixture(`
				<nldd-page style="--context-scroll-mode: root; --context-inset-top: 60px;">
					<div slot="header" style="height: 50px;">Header</div>
					${stickyProbe}
				</nldd-page>
			`);
			await waitForUpdate(el);
			await new Promise(r => setTimeout(r, 100));
			expect(probeTop(el)).toBe('60px');
		});

		it('publishes a sticky footer the same way', async () => {
			el = await fixture(`
				<nldd-page sticky-footer style="--context-scroll-mode: root; --context-inset-bottom: 20px;">
					<div slot="footer" style="height: 40px;">Footer</div>
					${stickyProbe}
				</nldd-page>
			`);
			await waitForUpdate(el);
			await new Promise(r => setTimeout(r, 100));
			expect(probeBottom(el)).toBe('60px');
		});
	});

	describe('scroll height for sticky content', () => {
		const probe = '<div id="probe" style="max-height: var(--context-scroller-height, 100dvh);">Probe</div>';

		it('publishes the scroller height while the page owns the scroller', async () => {
			el = await fixture(`
				<nldd-page sticky-header style="height: 400px;">
					<div slot="header" style="height: 50px;">Header</div>
					${probe}
				</nldd-page>
			`);
			await waitForUpdate(el);
			await new Promise(r => setTimeout(r, 100));
			const scroll = el.shadowRoot!.querySelector('.page__scroll') as HTMLElement;
			expect(getComputedStyle(el.querySelector('#probe')!).maxHeight).toBe(
				`${scroll.clientHeight}px`,
			);
		});

		it('leaves it to the viewport in root mode, where the document scrolls', async () => {
			el = await fixture(`
				<nldd-page sticky-header style="--context-scroll-mode: root;">
					<div slot="header" style="height: 50px;">Header</div>
					${probe}
				</nldd-page>
			`);
			await waitForUpdate(el);
			await new Promise(r => setTimeout(r, 100));
			expect(Math.round(parseFloat(getComputedStyle(el.querySelector('#probe')!).maxHeight)))
				.toBe(window.innerHeight);
		});
	});

	describe('root scroll mode', () => {
		it('reflects --context-scroll-mode: root to [data-scroll] and targets the document scroller', async () => {
			el = await fixture('<nldd-page sticky-header style="--context-scroll-mode: root;"></nldd-page>');
			await waitForUpdate(el);
			expect(el.dataset.scroll).toBe('root');
			const page = el as unknown as { scrollTarget: HTMLElement };
			expect(page.scrollTarget).toBe(document.scrollingElement);
		});

		it('exposes window as the scrollEventTarget in root mode (viewport scroll fires there, not on document.scrollingElement)', async () => {
			el = await fixture('<nldd-page sticky-header style="--context-scroll-mode: root;"></nldd-page>');
			await waitForUpdate(el);
			const page = el as unknown as { scrollEventTarget: EventTarget };
			expect(page.scrollEventTarget).toBe(window);
		});

		it('exposes the inner scroll wrapper as the scrollEventTarget in nested mode', async () => {
			el = await fixture('<nldd-page sticky-header></nldd-page>');
			await waitForUpdate(el);
			const page = el as unknown as { scrollEventTarget: EventTarget };
			expect(page.scrollEventTarget).toBe(el.shadowRoot!.querySelector('.page__scroll'));
		});

		it('defaults to nested (no --context-scroll-mode): scrollTarget is the inner wrapper', async () => {
			el = await fixture('<nldd-page sticky-header></nldd-page>');
			await waitForUpdate(el);
			expect(el.dataset.scroll).not.toBe('root');
			const page = el as unknown as { scrollTarget: HTMLElement };
			expect(page.scrollTarget).toBe(el.shadowRoot!.querySelector('.page__scroll'));
		});

		it('does not pad the scroll wrapper in root mode (the sticky header sits in flow)', async () => {
			el = await fixture('<nldd-page sticky-header style="--context-scroll-mode: root;"><div slot="header" style="height:48px;">H</div></nldd-page>');
			await waitForUpdate(el);
			await new Promise(r => setTimeout(r, 100));
			const scroll = el.shadowRoot!.querySelector('.page__scroll') as HTMLElement;
			expect(scroll.style.paddingTop).toBe('');
		});
	});

	describe('is-last main slot marker', () => {
		it('marks the last visible main child with is-last', async () => {
			el = await fixture(`
				<nldd-page>
					<div id="a">A</div>
					<div id="b">B</div>
					<div id="c">C</div>
				</nldd-page>
			`);
			await waitForUpdate(el);

			expect(el.querySelector('#a')!.classList.contains('is-last')).toBe(false);
			expect(el.querySelector('#b')!.classList.contains('is-last')).toBe(false);
			expect(el.querySelector('#c')!.classList.contains('is-last')).toBe(true);
		});

		it('skips hidden children when picking the last', async () => {
			el = await fixture(`
				<nldd-page>
					<div id="a">A</div>
					<div id="b">B</div>
					<div id="c" hidden>C</div>
				</nldd-page>
			`);
			await waitForUpdate(el);

			expect(el.querySelector('#b')!.classList.contains('is-last')).toBe(true);
			expect(el.querySelector('#c')!.classList.contains('is-last')).toBe(false);
		});

		it('ignores siblings in named slots', async () => {
			el = await fixture(`
				<nldd-page>
					<div id="a">A</div>
					<div id="b">B</div>
					<div id="footer" slot="footer">Footer</div>
				</nldd-page>
			`);
			await waitForUpdate(el);

			// `footer` is in a named slot — it should not appear in the main-slot
			// last-pick and thus must not carry is-last.
			expect(el.querySelector('#b')!.classList.contains('is-last')).toBe(true);
			expect(el.querySelector('#footer')!.classList.contains('is-last')).toBe(false);
		});
	});

});
