import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate, deepActiveElement } from '../../../test-utils.js';
import type { NLDDIconButton } from './icon-button.js';
import './icon-button.js';

describe('nldd-icon-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-icon-button></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});


/* ============================================================
   Icon & text attributes
   ============================================================ */

describe('nldd-icon-button – icon & text attributes', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders nldd-icon from icon attribute', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="download" text="Download"></nldd-icon-button>');
		await waitForUpdate(el);
		const icon = el.shadowRoot!.querySelector('nldd-icon.icon-button__icon nldd-icon, .icon-button__icon nldd-icon');
		expect(icon).not.toBeNull();
	});

	it('renders text from text attribute', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="download" text="Download"></nldd-icon-button>');
		await waitForUpdate(el);
		const textEl = el.shadowRoot!.querySelector('.icon-button__text');
		expect(textEl).not.toBeNull();
		expect(textEl!.textContent).toBe('Download');
	});

	it('renders icon slot when icon attribute is not set', async () => {
		el = await fixture<NLDDIconButton>(`
			<nldd-icon-button text="Custom">
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</nldd-icon-button>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot[name="icon"]') as HTMLSlotElement;
		expect(slot).not.toBeNull();
		expect(slot!.assignedElements().length).toBe(1);
	});

	it('does not render text span when text is empty', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="download"></nldd-icon-button>');
		await waitForUpdate(el);
		const textEl = el.shadowRoot!.querySelector('.icon-button__text');
		expect(textEl).toBeNull();
	});

	it('warns when slot-based icon-only has no accessible name', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NLDDIconButton>(`
			<nldd-icon-button>
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</nldd-icon-button>
		`);
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible-label'));
		warnSpy.mockRestore();
	});

	it('does not warn when slot-based icon has text', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NLDDIconButton>(`
			<nldd-icon-button text="Custom">
				<svg slot="icon" width="20" height="20"><circle cx="10" cy="10" r="8"/></svg>
			</nldd-icon-button>
		`);
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
		warnSpy.mockRestore();
	});
});


/* ============================================================
   Accessible label & aria-label
   ============================================================ */

describe('nldd-icon-button – accessible label & aria-label', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('uses text as aria-label when no accessible-label is set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="download" text="Download"></nldd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-label')).toBe('Download');
	});

	it('uses accessible-label as aria-label when set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="eye" text="Toon" accessible-label="Toon wachtwoord"></nldd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-label')).toBe('Toon wachtwoord');
	});

	it('has no aria-label when neither text nor accessible-label is set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="download"></nldd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		const ariaLabel = btn.getAttribute('aria-label');
		expect(ariaLabel === null || ariaLabel === '').toBe(true);
	});
});


/* ============================================================
   Title tooltip
   ============================================================ */

// Note: aria-describedby from nldd-tooltip does not reach the inner <button>
// in nldd-icon-button's shadow DOM. This is a known shadow DOM + ARIA limitation.
// The tooltip is visual-only for custom element triggers; aria-label on the
// inner button provides the accessible name.
describe('nldd-icon-button – tooltip', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders nldd-tooltip with text for non-lg sizes', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button size="md" icon="download" text="Download"></nldd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('nldd-tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('text')).toBe('Download');
	});

	it('renders nldd-tooltip with accessible-label when set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button size="md" icon="eye" text="Toon" accessible-label="Toon wachtwoord"></nldd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('nldd-tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('text')).toBe('Toon wachtwoord');
	});

	it('omits nldd-tooltip for lg size without accessible-label', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button size="lg" icon="download" text="Download"></nldd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('nldd-tooltip');
		expect(tooltip).toBeNull();
	});

	it('renders nldd-tooltip for lg size when accessible-label is set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button size="lg" icon="eye" text="Toon" accessible-label="Toon wachtwoord"></nldd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('nldd-tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('text')).toBe('Toon wachtwoord');
	});

	it('forwards tooltip-timing="instant" to the inner nldd-tooltip', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button size="md" icon="download" text="Download" tooltip-timing="instant"></nldd-icon-button>');
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('nldd-tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('timing')).toBe('instant');
	});
});


/* ============================================================
   Disabled & aria-disabled
   ============================================================ */

describe('nldd-icon-button – disabled & aria-disabled', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('does not set aria-disabled when not disabled', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="Close"></nldd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.hasAttribute('aria-disabled')).toBe(false);
	});

	it('sets aria-disabled="true" when disabled', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="Close" disabled></nldd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('aria-disabled')).toBe('true');
	});
});


/* ============================================================
   href / link rendering
   ============================================================ */

describe('nldd-icon-button – href / link rendering', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders a <button> by default', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="Sluiten"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('a')).toBeNull();
	});

	it('renders an <a> when href is set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});

	it('sets href on the anchor element', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('href')).toBe('/overzicht');
	});

	it('forwards target and rel to the anchor element', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" target="_blank" rel="noopener" icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		const a = el.shadowRoot!.querySelector('a')!;
		expect(a.getAttribute('target')).toBe('_blank');
		expect(a.getAttribute('rel')).toBe('noopener');
	});

	it('defaults rel to noopener noreferrer when target is _blank and rel is not set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" target="_blank" icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('rel')).toBe('noopener noreferrer');
	});

	it('sets aria-disabled on the anchor when disabled', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" disabled icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-disabled')).toBe('true');
	});

	it('forwards accessible-label to the anchor as aria-label', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" accessible-label="Ga terug naar overzicht" icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('a')!.getAttribute('aria-label')).toBe('Ga terug naar overzicht');
	});

	it('prevents default click on disabled anchor to block navigation', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" disabled icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a')!;
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		const preventSpy = vi.spyOn(event, 'preventDefault');
		anchor.dispatchEvent(event);
		expect(preventSpy).toHaveBeenCalled();
	});

	it('switches from <button> to <a> when href is set dynamically', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="arrow-left" text="Terug"></nldd-icon-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button')).not.toBeNull();

		el.href = '/overzicht';
		await waitForUpdate(el);

		expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('button')).toBeNull();
	});

	it('focus() delegates to the inner button', async () => {
		const el = await fixture<NLDDIconButton>('<nldd-icon-button text="Sluit" icon="dismiss" tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		el.focus();
		expect(deepActiveElement()).toBe(el.shadowRoot!.querySelector('.icon-button'));
		cleanup(el);
	});
});

/* ============================================================
   CSS part (external styling hook)
   ============================================================ */

describe('nldd-icon-button – part="button"', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('exposes part="button" on the inner <button>', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="Sluiten" tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		const btn = el.shadowRoot!.querySelector('button')!;
		expect(btn.getAttribute('part')).toBe('button');
	});

	it('exposes part="button" on the inner <a> when href is set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button href="/overzicht" icon="arrow-left" text="Terug" tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		const a = el.shadowRoot!.querySelector('a')!;
		expect(a.getAttribute('part')).toBe('button');
	});
});

describe('nldd-icon-button – aria-expanded / aria-haspopup', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('omits aria-expanded on a plain icon-button (no expandable, no popup-type, not open)', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="Sluit" tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('button')!;
		expect(inner.hasAttribute('aria-expanded')).toBe(false);
		expect(inner.hasAttribute('aria-haspopup')).toBe(false);
	});

	it('sets aria-expanded="false" when expandable and not open', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="more" text="Menu" expandable tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('button')!;
		expect(inner.getAttribute('aria-expanded')).toBe('false');
	});

	it('sets aria-expanded="true" when expandable and open', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="more" text="Menu" expandable expanded tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('button')!;
		expect(inner.getAttribute('aria-expanded')).toBe('true');
	});

	it('sets aria-expanded="false" + aria-haspopup when popup-type set and not open', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="more" text="Acties" popup-type="menu" tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('button')!;
		expect(inner.getAttribute('aria-expanded')).toBe('false');
		expect(inner.getAttribute('aria-haspopup')).toBe('menu');
	});

	it('sets aria-expanded="true" + aria-haspopup when popup-type set and open', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="more" text="Acties" popup-type="dialog" expanded tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('button')!;
		expect(inner.getAttribute('aria-expanded')).toBe('true');
		expect(inner.getAttribute('aria-haspopup')).toBe('dialog');
	});

	it('forwards aria-expanded + aria-haspopup to the anchor when href is set', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="more" text="Menu" href="/m" popup-type="menu" expanded tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('a')!;
		expect(inner.getAttribute('aria-expanded')).toBe('true');
		expect(inner.getAttribute('aria-haspopup')).toBe('menu');
	});
});

describe('nldd-icon-button – width', () => {
	let el: NLDDIconButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('applies inline host width and --_width=100% when width is a CSS length', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="X" width="240px" tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		expect((el as HTMLElement).style.width).toBe('240px');
		expect(el.style.getPropertyValue('--_width')).toBe('100%');
	});

	it('sets --_width=100% but leaves inline width empty for width="full"', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="X" width="full" tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		expect((el as HTMLElement).style.width).toBe('');
		expect(el.style.getPropertyValue('--_width')).toBe('100%');
	});

	it('ignores invalid width values', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="X" width="not-a-length" tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		expect((el as HTMLElement).style.width).toBe('');
		expect(el.style.getPropertyValue('--_width')).toBe('');
	});
});

describe('nldd-icon-button – popoverTargetElement / popoverTargetAction IDL forwarding', () => {
	let el: NLDDIconButton;
	let popover: HTMLDivElement;

	afterEach(() => {
		if (el) cleanup(el);
		if (popover) popover.remove();
	});

	it('forwards popoverTargetElement (Element ref) to the inner button across shadow boundaries', async () => {
		popover = document.createElement('div');
		popover.setAttribute('popover', '');
		document.body.appendChild(popover);

		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="X" tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);

		el.popoverTargetElement = popover;
		await waitForUpdate(el);

		const inner = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
		expect(inner.popoverTargetElement).toBe(popover);
	});

	it('clears the inner button popoverTargetElement when host property is set back to null', async () => {
		popover = document.createElement('div');
		popover.setAttribute('popover', '');
		document.body.appendChild(popover);

		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="X" tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);
		el.popoverTargetElement = popover;
		await waitForUpdate(el);
		const inner = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
		expect(inner.popoverTargetElement).toBe(popover);

		el.popoverTargetElement = null;
		await waitForUpdate(el);
		expect(inner.popoverTargetElement).toBe(null);
	});

	it('forwards popoverTargetAction to the inner button', async () => {
		el = await fixture<NLDDIconButton>('<nldd-icon-button icon="dismiss" text="X" tooltip-timing="never"></nldd-icon-button>');
		await waitForUpdate(el);

		const inner = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
		expect(inner.popoverTargetAction).toBe('toggle');

		el.popoverTargetAction = 'show';
		await waitForUpdate(el);
		expect(inner.popoverTargetAction).toBe('show');

		el.popoverTargetAction = 'hide';
		await waitForUpdate(el);
		expect(inner.popoverTargetAction).toBe('hide');
	});
});

describe('nldd-icon-button – form association', () => {
	let host: HTMLElement;

	afterEach(() => {
		if (host) cleanup(host);
	});

	function clickInner(root: ParentNode) {
		const btn = root.querySelector('nldd-icon-button')!;
		(btn.shadowRoot!.querySelector('button') as HTMLElement).click();
	}

	it('submits the closest form on click when type=submit', async () => {
		host = await fixture('<form><input name="x" /><nldd-icon-button type="submit" icon="check-mark" accessible-label="Verstuur"></nldd-icon-button></form>');
		await waitForUpdate(host.querySelector('nldd-icon-button')!);
		let submitted = false;
		host.addEventListener('submit', (e) => { e.preventDefault(); submitted = true; });
		clickInner(host);
		expect(submitted).toBe(true);
	});

	it('does not submit when type is the default (button)', async () => {
		host = await fixture('<form><input name="x" /><nldd-icon-button icon="check-mark" accessible-label="Actie"></nldd-icon-button></form>');
		await waitForUpdate(host.querySelector('nldd-icon-button')!);
		let submitted = false;
		host.addEventListener('submit', (e) => { e.preventDefault(); submitted = true; });
		clickInner(host);
		expect(submitted).toBe(false);
	});

	it('resets the form on click when type=reset', async () => {
		host = await fixture('<form><input name="x" /><nldd-icon-button type="reset" icon="arrow-2-counter-clockwise" accessible-label="Reset"></nldd-icon-button></form>');
		await waitForUpdate(host.querySelector('nldd-icon-button')!);
		const input = host.querySelector('input') as HTMLInputElement;
		input.value = 'changed';
		clickInner(host);
		expect(input.value).toBe('');
	});

	it('does not submit when disabled', async () => {
		host = await fixture('<form><input name="x" /><nldd-icon-button type="submit" disabled icon="check-mark" accessible-label="Verstuur"></nldd-icon-button></form>');
		await waitForUpdate(host.querySelector('nldd-icon-button')!);
		let submitted = false;
		host.addEventListener('submit', (e) => { e.preventDefault(); submitted = true; });
		clickInner(host);
		expect(submitted).toBe(false);
	});

	it('a link icon-button (href) never triggers form submission', async () => {
		host = await fixture('<form><input name="x" /><nldd-icon-button type="submit" href="/x" icon="arrow-right" accessible-label="Link"></nldd-icon-button></form>');
		await waitForUpdate(host.querySelector('nldd-icon-button')!);
		let submitted = false;
		host.addEventListener('submit', (e) => { e.preventDefault(); submitted = true; });
		const a = host.querySelector('nldd-icon-button')!.shadowRoot!.querySelector('a') as HTMLElement;
		a.addEventListener('click', (e) => e.preventDefault());
		a.click();
		expect(submitted).toBe(false);
	});
});
