import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './notification.js';
import type { NLDDNotification } from './notification.js';

/** The component moves itself out of the fixture and into the shared region, so
 *  the usual cleanup cannot reach it. */
function clearRegion(): void {
	document.getElementById('nldd-notification-region')?.remove();
}

async function maak(html: string): Promise<NLDDNotification> {
	const el = await fixture<NLDDNotification>(html);
	await waitForUpdate(el);
	// joinRegion runs in a microtask, so wait one turn for the move.
	await Promise.resolve();
	await waitForUpdate(el);
	return el;
}

describe('nldd-notification', () => {
	let el: NLDDNotification;

	afterEach(() => {
		if (el) cleanup(el);
		clearRegion();
		vi.useRealTimers();
	});

	it('rendert zonder fouten', async () => {
		el = await maak('<nldd-notification text="Opgeslagen"></nldd-notification>');
		expect(el.shadowRoot).not.toBeNull();
	});

	it('verhuist zichzelf naar de gedeelde regio', async () => {
		el = await maak('<nldd-notification text="Opgeslagen"></nldd-notification>');
		const region = document.getElementById('nldd-notification-region');
		expect(region).not.toBeNull();
		expect(el.parentElement).toBe(region);
	});

	it('kondigt een fout aan met role alert en de rest met role status', async () => {
		el = await maak('<nldd-notification text="Mislukt" variant="critical"></nldd-notification>');
		expect(el.getAttribute('role')).toBe('alert');
		cleanup(el);
		clearRegion();

		el = await maak('<nldd-notification text="Opgeslagen" variant="success"></nldd-notification>');
		expect(el.getAttribute('role')).toBe('status');
	});

	it('kiest een gevuld icoon per variant', async () => {
		el = await maak('<nldd-notification text="Opgeslagen" variant="success"></nldd-notification>');
		expect(el._resolvedIcon).toBe('check-circle-filled');
	});

	it('verdwijnt vanzelf als hij bovenaan staat', async () => {
		vi.useFakeTimers();
		const host = document.createElement('div');
		document.body.appendChild(host);
		host.innerHTML = '<nldd-notification text="Opgeslagen" duration="1000"></nldd-notification>';
		const item = host.querySelector('nldd-notification')!;
		const gezien = vi.fn();
		item.addEventListener('dismiss', gezien);

		await vi.advanceTimersByTimeAsync(0);
		await vi.advanceTimersByTimeAsync(1200);
		expect(gezien).toHaveBeenCalled();

		host.remove();
	});

	it('laat een fout staan, hoe lang je ook wacht', async () => {
		vi.useFakeTimers();
		const host = document.createElement('div');
		document.body.appendChild(host);
		host.innerHTML = '<nldd-notification text="Mislukt" variant="critical" duration="1000"></nldd-notification>';
		const item = host.querySelector('nldd-notification')!;
		const gezien = vi.fn();
		item.addEventListener('dismiss', gezien);

		await vi.advanceTimersByTimeAsync(0);
		await vi.advanceTimersByTimeAsync(5000);
		expect(gezien).not.toHaveBeenCalled();

		host.remove();
	});

	it('telt alleen af voor de voorste van de stapel, de nieuwste', async () => {
		vi.useFakeTimers();
		const host = document.createElement('div');
		document.body.appendChild(host);
		host.innerHTML = `
			<nldd-notification text="Eerste" duration="1000"></nldd-notification>
			<nldd-notification text="Tweede" duration="1000"></nldd-notification>
		`;
		const [eerste, tweede] = Array.from(host.querySelectorAll('nldd-notification'));
		const eersteWeg = vi.fn();
		const tweedeWeg = vi.fn();
		eerste.addEventListener('dismiss', eersteWeg);
		tweede.addEventListener('dismiss', tweedeWeg);

		await vi.advanceTimersByTimeAsync(0);
		await vi.advanceTimersByTimeAsync(1200);
		expect(tweedeWeg).toHaveBeenCalled();
		expect(eersteWeg).not.toHaveBeenCalled();

		host.remove();
	});

	it('zet de nieuwste vooraan en schuift de oudere naar achteren', async () => {
		const host = document.createElement('div');
		document.body.appendChild(host);
		host.innerHTML = `
			<nldd-notification text="Eerste" duration="0"></nldd-notification>
			<nldd-notification text="Tweede" duration="0"></nldd-notification>
		`;
		await Promise.resolve();
		await Promise.resolve();

		const region = document.getElementById('nldd-notification-region')!;
		const stapel = Array.from(region.querySelectorAll('nldd-notification'));
		expect(stapel.map((item) => item.getAttribute('text'))).toEqual(['Tweede', 'Eerste']);
		expect((stapel[0] as HTMLElement).style.getPropertyValue('--_stack-depth')).toBe('0');
		expect((stapel[1] as HTMLElement).style.getPropertyValue('--_stack-depth')).toBe('1');

		host.remove();
	});

	it('klapt de stapel open bij een klik op de strook en weer dicht daarbuiten', async () => {
		const host = document.createElement('div');
		document.body.appendChild(host);
		host.innerHTML = `
			<nldd-notification text="Eerste" duration="0"></nldd-notification>
			<nldd-notification text="Tweede" duration="0"></nldd-notification>
		`;
		await Promise.resolve();
		await Promise.resolve();

		const region = document.getElementById('nldd-notification-region')!;
		const strook = region.querySelector<HTMLElement>('[data-expander]')!;
		expect(strook.style.display).toBe('block');

		strook.click();
		expect(region.style.display).toBe('flex');
		expect(strook.style.display).toBe('none');
		Array.from(region.querySelectorAll('nldd-notification')).forEach((item) => {
			expect((item as HTMLElement).style.getPropertyValue('--_stack-depth')).toBe('0');
		});

		document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
		expect(region.style.display).toBe('grid');

		host.remove();
	});

	it('stuurt dismiss bij een klik op de sluitknop', async () => {
		el = await maak('<nldd-notification text="Opgeslagen"></nldd-notification>');
		const gezien = vi.fn();
		el.addEventListener('dismiss', gezien);
		const knop = el.shadowRoot!.querySelector('nldd-icon-button') as HTMLElement;
		knop.click();
		expect(gezien).toHaveBeenCalled();
	});

	it('waarschuwt in DEV bij meer dan twee acties', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await maak(`
			<nldd-notification text="Opgeslagen">
				<button slot="actions">1</button>
				<button slot="actions">2</button>
				<button slot="actions">3</button>
			</nldd-notification>
		`);
		expect(warn).toHaveBeenCalled();
		warn.mockRestore();
	});
});
