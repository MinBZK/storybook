import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './text.js';

describe('nldd-text', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-text>Tekst</nldd-text>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	// The defaults are the ones the tokens already call default, so writing them
	// out would put attributes on every element that say nothing.
	it('reflecteert de standaardwaarden niet als attribuut', async () => {
		el = await fixture('<nldd-text>Tekst</nldd-text>');
		await waitForUpdate(el);
		expect(el.hasAttribute('size')).toBe(false);
		expect(el.hasAttribute('weight')).toBe(false);
		expect(el.hasAttribute('line-height')).toBe(false);
		expect(el.hasAttribute('color')).toBe(false);
		expect(el.hasAttribute('horizontal-alignment')).toBe(false);
	});

	it('reflecteert wat je wel zet', async () => {
		el = await fixture(
			'<nldd-text size="lg" weight="bold" line-height="loose" color="secondary" horizontal-alignment="center">Tekst</nldd-text>',
		);
		await waitForUpdate(el);
		const text = el as HTMLElement & {
			size: string;
			weight: string;
			lineHeight: string;
			color: string;
			horizontalAlignment: string;
		};
		expect(text.size).toBe('lg');
		expect(text.weight).toBe('bold');
		expect(text.lineHeight).toBe('loose');
		expect(text.color).toBe('secondary');
		expect(text.horizontalAlignment).toBe('center');
	});

	it('zet de tekst in de default slot', async () => {
		el = await fixture('<nldd-text>Toegewezen aan Yara</nldd-text>');
		await waitForUpdate(el);
		expect(el.shadowRoot?.querySelector('slot')).not.toBeNull();
		expect(el.textContent?.trim()).toBe('Toegewezen aan Yara');
	});
});
