import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDJustInTimeEducation } from './just-in-time-education.js';
import './just-in-time-education.js';

const MARKUP = '<nldd-just-in-time-education text="Begin hier" supporting-text="Typ een trefwoord"><button>Zoeken</button></nldd-just-in-time-education>';
const MARKUP_DISMISSABLE = '<nldd-just-in-time-education dismissable text="Begin hier" supporting-text="Typ een trefwoord"><button>Zoeken</button></nldd-just-in-time-education>';

function isCalloutOpen(el: NLDDJustInTimeEducation): boolean {
	const container = el.shadowRoot!.querySelector<HTMLElement>('.just-in-time-education');
	return container?.matches(':popover-open') ?? false;
}

/**
 * Yield one macrotask so the deferred outside-interaction listeners attach.
 * Distinct from waitForUpdate (which drains a Lit render + MutationObserver
 * cycle): this is only for the document-level listeners the component registers
 * on the next task, not for any reactive state.
 */
function nextTask(): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, 0));
}

describe('nldd-just-in-time-education', () => {
	let el: NLDDJustInTimeEducation;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture<NLDDJustInTimeEducation>(MARKUP);
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('callout is standaard verborgen', async () => {
		el = await fixture<NLDDJustInTimeEducation>(MARKUP);
		await waitForUpdate(el);
		expect(isCalloutOpen(el)).toBe(false);
	});

	it('toont de callout zodra active is gezet', async () => {
		el = await fixture<NLDDJustInTimeEducation>(MARKUP);
		await waitForUpdate(el);
		el.active = true;
		await waitForUpdate(el);
		expect(isCalloutOpen(el)).toBe(true);
	});

	it('rendert geen pijl wanneer no-arrow', async () => {
		el = await fixture<NLDDJustInTimeEducation>('<nldd-just-in-time-education no-arrow text="x"><button>Zoeken</button></nldd-just-in-time-education>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.just-in-time-education__arrow')).toBeNull();
	});

	it('respecteert een expliciete placement via data-arrow-side', async () => {
		el = await fixture<NLDDJustInTimeEducation>('<nldd-just-in-time-education placement="top" text="x"><button>Zoeken</button></nldd-just-in-time-education>');
		await waitForUpdate(el);
		el.active = true;
		await waitForUpdate(el);
		expect(el.getAttribute('data-arrow-side')).toBe('top');
	});

	it('zet arrow-length als CSS-lengte door op de --_arrow-length var', async () => {
		el = await fixture<NLDDJustInTimeEducation>(MARKUP);
		await waitForUpdate(el);
		el.arrowLength = '120px';
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_arrow-length')).toBe('120px');
		el.arrowLength = '';
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_arrow-length')).toBe('');
	});

	it('negeert een ongeldige arrow-length en valt terug op de standaard', async () => {
		el = await fixture<NLDDJustInTimeEducation>(MARKUP);
		await waitForUpdate(el);
		el.arrowLength = '120px';
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_arrow-length')).toBe('120px');
		// An invalid value (e.g. "d") is rejected and the override removed, so the
		// max()/calc() that consume the var stay valid (DS default applies).
		el.arrowLength = 'd';
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_arrow-length')).toBe('');
	});

	it('geeft niet-eigen attributen door aan de slotted control, eigen niet', async () => {
		el = await fixture<NLDDJustInTimeEducation>('<nldd-just-in-time-education text="x" size="lg"><button>Zoeken</button></nldd-just-in-time-education>');
		await waitForUpdate(el);
		await nextTask();
		const control = el.querySelector('button')!;
		expect(control.getAttribute('size')).toBe('lg'); // initieel via slotchange
		el.setAttribute('size', 'md');
		await nextTask();
		expect(control.getAttribute('size')).toBe('md'); // dynamische wijziging via observer
		el.setAttribute('text', 'y');
		await nextTask();
		expect(control.hasAttribute('text')).toBe(false); // eigen attribuut blijft op de host
		el.removeAttribute('size');
		await nextTask();
		expect(control.hasAttribute('size')).toBe(false); // verwijderen wordt doorgegeven
	});
});

describe('nldd-just-in-time-education – sluit-routes', () => {
	let el: NLDDJustInTimeEducation;

	afterEach(() => {
		if (el) cleanup(el);
	});

	async function openCoachMark(markup = MARKUP): Promise<void> {
		el = await fixture<NLDDJustInTimeEducation>(markup);
		await waitForUpdate(el);
		el.active = true;
		await waitForUpdate(el);
	}

	it('complete() sluit met reason "completed"', async () => {
		await openCoachMark();

		let reason: string | undefined;
		el.addEventListener('nldd-close', (e: Event) => { reason = (e as CustomEvent).detail.reason; });
		el.complete();
		await waitForUpdate(el);

		expect(reason).toBe('completed');
		expect(el.active).toBe(false);
		expect(isCalloutOpen(el)).toBe(false);
	});

	it('kondigt de tip aan via een polite live region bij openen en wist die bij sluiten', async () => {
		await openCoachMark();

		const announcer = el.shadowRoot!.querySelector('.just-in-time-education__announcer')!;
		expect(announcer.getAttribute('aria-live')).toBe('polite');
		expect(announcer.textContent).toBe('Begin hier. Typ een trefwoord');

		el.active = false;
		await waitForUpdate(el);
		expect(announcer.textContent).toBe('');
	});

	it('de geadviseerde interactie op het control sluit met "completed" wanneer dismissable', async () => {
		await openCoachMark(MARKUP_DISMISSABLE);

		let reason: string | undefined;
		el.addEventListener('nldd-close', (e: Event) => { reason = (e as CustomEvent).detail.reason; });
		el.querySelector('button')!.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
		await waitForUpdate(el);

		expect(reason).toBe('completed');
	});

	it('de geadviseerde interactie (slot-klik) sluit NIET wanneer niet dismissable', async () => {
		await openCoachMark();

		let reason: string | undefined;
		el.addEventListener('nldd-close', (e: Event) => { reason = (e as CustomEvent).detail.reason; });
		el.querySelector('button')!.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
		await waitForUpdate(el);

		expect(reason).toBeUndefined();
		expect(el.active).toBe(true);
	});

	it('toont en sluit via de dismiss-knop met "dismissed" wanneer dismissable', async () => {
		await openCoachMark(MARKUP_DISMISSABLE);

		const button = el.shadowRoot!.querySelector<HTMLElement>('nldd-icon-button');
		expect(button).not.toBeNull();

		let reason: string | undefined;
		el.addEventListener('nldd-close', (e: Event) => { reason = (e as CustomEvent).detail.reason; });
		button!.click();
		await waitForUpdate(el);

		expect(reason).toBe('dismissed');
	});

	it('toont geen dismiss-knop wanneer niet dismissable', async () => {
		await openCoachMark();
		expect(el.shadowRoot!.querySelector('nldd-icon-button')).toBeNull();
	});

	it('sluit met "ignored" bij één klik buiten de coach-mark wanneer dismissable', async () => {
		await openCoachMark(MARKUP_DISMISSABLE);
		await nextTask(); // outside-listeners attach on the next task

		let reason: string | undefined;
		el.addEventListener('nldd-close', (e: Event) => { reason = (e as CustomEvent).detail.reason; });

		document.body.click();
		await waitForUpdate(el);
		expect(reason).toBe('ignored');
	});

	it('sluit NIET bij klikken buiten wanneer niet dismissable', async () => {
		await openCoachMark();
		await nextTask();

		let reason: string | undefined;
		el.addEventListener('nldd-close', (e: Event) => { reason = (e as CustomEvent).detail.reason; });

		document.body.click();
		document.body.click();
		await waitForUpdate(el);
		expect(reason).toBeUndefined();
		expect(el.active).toBe(true);
	});

	it('klikken binnen de coach-mark sluit niet, ook niet wanneer dismissable', async () => {
		await openCoachMark(MARKUP_DISMISSABLE);
		await nextTask();

		let reason: string | undefined;
		el.addEventListener('nldd-close', (e: Event) => { reason = (e as CustomEvent).detail.reason; });

		const card = el.shadowRoot!.querySelector<HTMLElement>('.just-in-time-education__main')!;
		card.click();
		card.click();

		expect(reason).toBeUndefined();
		expect(el.active).toBe(true);
	});

	it('sluit met "ignored" bij een klik in een ANDERE shadow root (composed-path is shadow-aware)', async () => {
		await openCoachMark(MARKUP_DISMISSABLE);
		await nextTask();

		// A click whose origin sits in a different shadow tree: its composedPath
		// never includes the coach-mark host, so the shadow-aware check must still
		// treat it as outside.
		const sibling = document.createElement('div');
		const innerButton = document.createElement('button');
		sibling.attachShadow({ mode: 'open' }).appendChild(innerButton);
		document.body.appendChild(sibling);

		let reason: string | undefined;
		el.addEventListener('nldd-close', (e: Event) => { reason = (e as CustomEvent).detail.reason; });

		innerButton.click();
		await waitForUpdate(el);
		expect(reason).toBe('ignored');

		sibling.remove();
	});

	it('verplaatst focus naar de callout bij openen (dismissable) en terug naar het control bij sluiten', async () => {
		await openCoachMark(MARKUP_DISMISSABLE);
		const container = el.shadowRoot!.querySelector('.just-in-time-education')!;
		expect(el.shadowRoot!.activeElement).toBe(container);

		// Closing while focus is inside the callout returns it to the slotted control.
		el.active = false;
		await waitForUpdate(el);
		expect(document.activeElement).toBe(el.querySelector('button'));
	});

	it('laat focus met rust bij openen wanneer niet dismissable', async () => {
		await openCoachMark();
		expect(el.shadowRoot!.activeElement).toBeNull();
	});
});
