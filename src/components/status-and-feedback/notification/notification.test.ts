import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate, until } from '../../../test-utils.js';
import './notification.js';
import '../../layout/sheet/sheet.js';
import '../modal-dialog/modal-dialog.js';
import type { NLDDNotification } from './notification.js';

/** The component moves itself out of the fixture and into the shared region, so
 *  the usual cleanup cannot reach it. */
function clearRegion(): void {
	document.getElementById('nldd-notification-region')?.remove();
}

/** Real timers with a short duration rather than fake ones: the notification
 *  starts its clock from a microtask after it has joined the region, and how a
 *  fake clock interleaves with that differs per platform. */
function wacht(ms: number): Promise<void> {
	return new Promise((resolve) => { setTimeout(resolve, ms); });
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
		const host = document.createElement('div');
		document.body.appendChild(host);
		host.innerHTML = '<nldd-notification text="Opgeslagen" duration="60"></nldd-notification>';
		const item = host.querySelector('nldd-notification')!;
		const gezien = vi.fn();
		item.addEventListener('dismiss', gezien);

		await wacht(400);
		expect(gezien).toHaveBeenCalled();

		host.remove();
	});

	it('telt gewoon af als de aanwijzer er stil boven blijkt te liggen', async () => {
		const host = document.createElement('div');
		document.body.appendChild(host);
		host.innerHTML = '<nldd-notification text="Opgeslagen" duration="60"></nldd-notification>';
		const item = host.querySelector('nldd-notification')!;
		const gezien = vi.fn();
		item.addEventListener('dismiss', gezien);

		// Wat de browser doet zodra de melding op zijn vaste plek verschijnt en daar
		// toevallig een stilstaande aanwijzer ligt: een echte pointerenter zonder
		// dat er iets bewogen heeft. Dat is geen hover.
		item.dispatchEvent(new PointerEvent('pointerenter', { bubbles: false }));
		await wacht(400);
		expect(gezien).toHaveBeenCalled();

		host.remove();
	});

	it('pauzeert wel zodra de aanwijzer er echt overheen beweegt', async () => {
		const host = document.createElement('div');
		document.body.appendChild(host);
		host.innerHTML = '<nldd-notification text="Opgeslagen" duration="60"></nldd-notification>';
		const item = host.querySelector('nldd-notification')!;
		const gezien = vi.fn();
		item.addEventListener('dismiss', gezien);

		await Promise.resolve();
		await Promise.resolve();
		item.dispatchEvent(new PointerEvent('pointermove', { bubbles: false }));
		await wacht(400);
		expect(gezien).not.toHaveBeenCalled();

		host.remove();
	});

	it('laat een fout staan, hoe lang je ook wacht', async () => {
		const host = document.createElement('div');
		document.body.appendChild(host);
		host.innerHTML = '<nldd-notification text="Mislukt" variant="critical" duration="60"></nldd-notification>';
		const item = host.querySelector('nldd-notification')!;
		const gezien = vi.fn();
		item.addEventListener('dismiss', gezien);

		await wacht(400);
		expect(gezien).not.toHaveBeenCalled();

		host.remove();
	});

	it('telt alleen af voor de voorste van de stapel, de nieuwste', async () => {
		const host = document.createElement('div');
		document.body.appendChild(host);
		host.innerHTML = `
			<nldd-notification text="Eerste" duration="60"></nldd-notification>
			<nldd-notification text="Tweede" duration="60"></nldd-notification>
		`;
		const [eerste, tweede] = Array.from(host.querySelectorAll('nldd-notification'));
		const eersteWeg = vi.fn();
		const tweedeWeg = vi.fn();
		eerste.addEventListener('dismiss', eersteWeg);
		tweede.addEventListener('dismiss', tweedeWeg);

		await wacht(400);
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

describe('nldd-notification in a modal overlay', () => {
	const REGION = 'nldd-notification-region';
	let sheet: HTMLElement;

	// The token stylesheet is not loaded in tests, and without this value the
	// region's top/right are invalid and it falls back to its static position,
	// which would make a hit test say nothing about the real layout.
	beforeEach(() => {
		document.documentElement.style.setProperty('--semantics-overlays-inset', '16px');
	});

	afterEach(() => {
		document.documentElement.style.removeProperty('--semantics-overlays-inset');
		if (sheet) cleanup(sheet);
		document.getElementById(REGION)?.remove();
		document.querySelectorAll('nldd-notification').forEach((n) => n.remove());
	});

	const region = () => document.getElementById(REGION);
	const settle = () => new Promise((r) => setTimeout(r, 150));

	async function openSheet(): Promise<HTMLElement> {
		const el = await fixture('<nldd-sheet accessible-label="Sheet"><div style="height:120px">x</div></nldd-sheet>');
		await waitForUpdate(el);
		(el as unknown as { show(): void }).show();
		await settle();
		return el;
	}

	async function raise(): Promise<HTMLElement> {
		const note = document.createElement('nldd-notification');
		note.setAttribute('text', 'Bericht');
		note.setAttribute('duration', '0');
		document.body.appendChild(note);
		await settle();
		return note;
	}

	/** What the consumer actually cares about: can the message be clicked. */
	function hitTagAt(el: HTMLElement): string {
		const r = el.getBoundingClientRect();
		const hit = document.elementFromPoint(Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2));
		return hit ? hit.tagName : 'NULL';
	}

	it('reaches a notification raised while a sheet is open, instead of leaving it behind the sheet', async () => {
		sheet = await openSheet();
		const note = await raise();

		expect(region()!.parentElement).toBe(sheet);
		expect(note.isConnected).toBe(true);
		expect(hitTagAt(note)).toBe('NLDD-NOTIFICATION');
	});

	it('carries a notification that was already on screen into a sheet that opens over it', async () => {
		const note = await raise();
		expect(region()!.parentElement).toBe(document.body);

		sheet = await openSheet();

		expect(region()!.parentElement).toBe(sheet);
		// The move disconnects the region; a notification must not read that as
		// having been dismissed.
		expect(note.isConnected).toBe(true);
		expect(region()!.contains(note)).toBe(true);
	});

	it('sinks back to the body when the sheet closes', async () => {
		sheet = await openSheet();
		const note = await raise();
		expect(region()!.parentElement).toBe(sheet);

		(sheet as unknown as { hide(): void }).hide();
		await until(() => region()?.parentElement === document.body);

		expect(region()!.parentElement).toBe(document.body);
		expect(note.isConnected).toBe(true);
	});

	it('follows the topmost overlay when one opens over another, and one level back when it closes', async () => {
		sheet = await openSheet();
		await raise();
		expect(region()!.parentElement).toBe(sheet);

		const dialog = await fixture('<nldd-modal-dialog accessible-label="Dialog" text="Zeker weten?"></nldd-modal-dialog>');
		await waitForUpdate(dialog);
		(dialog as unknown as { show(): void }).show();
		await settle();
		expect(region()!.parentElement).toBe(dialog);

		(dialog as unknown as { hide(): void }).hide();
		await until(() => region()?.parentElement === sheet);
		expect(region()!.parentElement).toBe(sheet);

		cleanup(dialog);
	});
});
