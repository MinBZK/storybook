import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDCard } from './card.js';
import './card.js';

describe('nldd-card', () => {
	let el: NLDDCard;

	afterEach(() => {
		if (el) cleanup(el);
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
		expect(el.shadowRoot!.querySelector('.card__link')).toBeNull();
	});

	it('maakt de hele kaart een link met href en zet de naam op de link', async () => {
		el = await fixture<NLDDCard>('<nldd-card href="/dossier" accessible-label="Open dossier"></nldd-card>');
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('.card__link') as HTMLAnchorElement;
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
		const link = el.shadowRoot!.querySelector('.card__link') as HTMLAnchorElement;
		expect(link.getAttribute('rel')).toContain('noopener');
		expect(link.getAttribute('rel')).toContain('noreferrer');
		expect(link.getAttribute('aria-label')).toBe('Open X, Opent in nieuw tabblad');
	});
});
