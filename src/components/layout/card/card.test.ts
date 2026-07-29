import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDCard } from './card.js';
import './card.js';

describe('nldd-card', () => {
	let el: NLDDCard;

	afterEach(() => {
		if (el) cleanup(el);
	});

	// The ring is its own layer beside the card, driven by a class instead of
	// :has(… :focus-visible): the card clips its descendants, and Safari does not
	// re-evaluate a dynamic pseudo-class inside :has().
	it('toont de focusring pas als de eigen control toetsenbordfocus heeft', async () => {
		el = await fixture<NLDDCard>('<nldd-card button accessible-label="Open"><p>Inhoud</p></nldd-card>');
		await waitForUpdate(el);
		const ring = el.shadowRoot!.querySelector('.card__focus-ring')!;
		expect(ring).not.toBeNull();
		expect(el.classList.contains('is-action-focused')).toBe(false);

		const control = el.shadowRoot!.querySelector<HTMLElement>('.card__action')!;
		control.dispatchEvent(new FocusEvent('focusin', { bubbles: true, composed: true }));
		await waitForUpdate(el);
		// Programmatic focus is not focus-visible, so the ring stays away — that is
		// the same rule the pointer follows.
		expect(el.classList.contains('is-action-focused')).toBe(false);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture<NLDDCard>('<nldd-card></nldd-card>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('verbergt header als slot leeg is', async () => {
		el = await fixture<NLDDCard>('<nldd-card></nldd-card>');
		await waitForUpdate(el);
		const header = el.shadowRoot!.querySelector('.card__header') as HTMLElement;
		expect(header.hidden).toBe(true);
	});

	it('toont header als slot gevuld is', async () => {
		el = await fixture<NLDDCard>('<nldd-card><div slot="header">Titel</div></nldd-card>');
		await waitForUpdate(el);
		const header = el.shadowRoot!.querySelector('.card__header') as HTMLElement;
		expect(header.hidden).toBe(false);
	});

	it('verbergt footer als slot leeg is', async () => {
		el = await fixture<NLDDCard>('<nldd-card></nldd-card>');
		await waitForUpdate(el);
		const footer = el.shadowRoot!.querySelector('.card__footer') as HTMLElement;
		expect(footer.hidden).toBe(true);
	});

	it('toont footer als slot gevuld is', async () => {
		el = await fixture<NLDDCard>('<nldd-card><div slot="footer">Acties</div></nldd-card>');
		await waitForUpdate(el);
		const footer = el.shadowRoot!.querySelector('.card__footer') as HTMLElement;
		expect(footer.hidden).toBe(false);
	});

	it('rendert geen link zonder href', async () => {
		el = await fixture<NLDDCard>('<nldd-card></nldd-card>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.card__action')).toBeNull();
	});

	it('maakt de hele kaart een link met href en zet de naam op de link', async () => {
		el = await fixture<NLDDCard>('<nldd-card href="/dossier" accessible-label="Open dossier"></nldd-card>');
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('.card__action') as HTMLAnchorElement;
		expect(link).not.toBeNull();
		expect(link.getAttribute('href')).toBe('/dossier');
		expect(link.getAttribute('aria-label')).toBe('Open dossier');
		// Naam op de link, niet ook redundant op de article.
		expect(el.shadowRoot!.querySelector('.card')!.getAttribute('aria-label')).toBeNull();
	});

	it('zonder href staat accessible-label op de article', async () => {
		el = await fixture<NLDDCard>('<nldd-card accessible-label="Kaart X"></nldd-card>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.card')!.getAttribute('aria-label')).toBe('Kaart X');
	});

	it('target="_blank" voegt rel en een nieuw-tabblad-melding toe', async () => {
		el = await fixture<NLDDCard>('<nldd-card href="/x" target="_blank" accessible-label="Open X"></nldd-card>');
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('.card__action') as HTMLAnchorElement;
		expect(link.getAttribute('rel')).toContain('noopener');
		expect(link.getAttribute('rel')).toContain('noreferrer');
		expect(link.getAttribute('aria-label')).toBe('Open X, Opent in nieuw tabblad');
	});

	it('maakt de hele kaart een knop met button en zet de naam op de knop', async () => {
		el = await fixture<NLDDCard>('<nldd-card button accessible-label="Open dossier"></nldd-card>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('.card__action') as HTMLButtonElement;
		expect(button).not.toBeNull();
		expect(button.tagName).toBe('BUTTON');
		expect(button.getAttribute('type')).toBe('button');
		expect(button.getAttribute('aria-label')).toBe('Open dossier');
		expect(el.shadowRoot!.querySelector('.card')!.getAttribute('aria-label')).toBeNull();
	});

	// De klik moet de shadow-grens over: een listener of hx-attribuut op de
	// kaart zelf is precies hoe consumenten dit gebruiken.
	it('een klik op de knop komt als composed click op de host aan', async () => {
		el = await fixture<NLDDCard>('<nldd-card button accessible-label="Open"></nldd-card>');
		await waitForUpdate(el);
		let seen = false;
		el.addEventListener('click', () => { seen = true; });
		(el.shadowRoot!.querySelector('.card__action') as HTMLButtonElement).click();
		expect(seen).toBe(true);
	});

	it('href wint van button', async () => {
		el = await fixture<NLDDCard>('<nldd-card button href="/x" accessible-label="Open"></nldd-card>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.card__action')!.tagName).toBe('A');
	});
});
