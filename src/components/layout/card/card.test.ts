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
});
