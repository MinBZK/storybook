import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDWindow } from './window.js';
import './window.ts';

describe('nldd-window', () => {
	let el: NLDDWindow;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture<NLDDWindow>('<nldd-window></nldd-window>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('bevat een dialog element', async () => {
		el = await fixture<NLDDWindow>('<nldd-window></nldd-window>');
		await waitForUpdate(el);
		const dialog = el.shadowRoot!.querySelector('dialog');
		expect(dialog).not.toBeNull();
	});

	// Note: showModal() focus trap, backdrop and Escape are native browser features
	// not fully exercised in the test runner — verify in browser-based tests
	it('opent modaal met show() als standaard', async () => {
		el = await fixture<NLDDWindow>('<nldd-window></nldd-window>');
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
		expect(dialog.open).toBe(true);
	});

	it('opent niet-modaal met show() als modeless is ingesteld', async () => {
		el = await fixture<NLDDWindow>('<nldd-window modeless></nldd-window>');
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
		expect(dialog.open).toBe(true);
	});

	it('sluit met hide()', async () => {
		el = await fixture<NLDDWindow>('<nldd-window modeless></nldd-window>');
		await waitForUpdate(el);
		el.show();
		el.hide();
		const dialog = el.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
		expect(dialog.open).toBe(false);
	});

	it('stuurt open event bij show()', async () => {
		el = await fixture<NLDDWindow>('<nldd-window modeless></nldd-window>');
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('open', () => { fired = true; });
		el.show();
		expect(fired).toBe(true);
	});

	it('stuurt close event bij hide()', async () => {
		el = await fixture<NLDDWindow>('<nldd-window modeless></nldd-window>');
		await waitForUpdate(el);
		el.show();
		let fired = false;
		el.addEventListener('close', () => { fired = true; });
		el.hide();
		expect(fired).toBe(true);
	});

	it('stelt aria-label in', async () => {
		el = await fixture<NLDDWindow>('<nldd-window accessible-label="Instellingen"></nldd-window>');
		await waitForUpdate(el);
		const dialog = el.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
		expect(dialog.getAttribute('aria-label')).toBe('Instellingen');
	});

	it('detecteert drag handle en zet has-drag-handle attribuut', async () => {
		el = await fixture<NLDDWindow>('<nldd-window><div window-drag-handle>Handle</div></nldd-window>');
		await waitForUpdate(el);
		expect(el.hasAttribute('has-drag-handle')).toBe(true);
	});

	it('heeft geen has-drag-handle attribuut zonder drag handle', async () => {
		el = await fixture<NLDDWindow>('<nldd-window><div>Content</div></nldd-window>');
		await waitForUpdate(el);
		expect(el.hasAttribute('has-drag-handle')).toBe(false);
	});

	it('sluit bij cancel event (Escape)', async () => {
		el = await fixture<NLDDWindow>('<nldd-window modeless></nldd-window>');
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
		dialog.dispatchEvent(new Event('cancel'));
		expect(dialog.open).toBe(false);
	});

	it('reset _didDrag bij hide zodat clicks na heropening werken', async () => {
		el = await fixture<NLDDWindow>('<nldd-window modeless></nldd-window>');
		await waitForUpdate(el);
		el.show();
		// Simulate a drag flag being set
		(el as unknown as { _didDrag: boolean })._didDrag = true;
		el.hide();
		el.show();
		// Click should not be swallowed
		let clickHandled = false;
		el.addEventListener('click', () => { clickHandled = true; });
		el.click();
		expect(clickHandled).toBe(true);
	});

	it('sluit modaal venster bij backdrop click (buiten dialog rect)', async () => {
		el = await fixture<NLDDWindow>('<nldd-window width="200px" height="200px"></nldd-window>');
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
		expect(dialog.open).toBe(true);

		const rect = dialog.getBoundingClientRect();

		// Note: in test runners where getBoundingClientRect returns {0,0,0,0},
		// any negative coordinate is "outside" — the test passes but does not
		// fully validate the coordinate logic. Verify in browser-based tests.
		const backdropClick = new MouseEvent('click', {
			clientX: rect.left - 10,
			clientY: rect.top - 10,
			bubbles: true,
		});
		dialog.dispatchEvent(backdropClick);
		expect(dialog.open).toBe(false);
	});

	it('sluit niet bij click binnen dialog rect', async () => {
		el = await fixture<NLDDWindow>('<nldd-window width="200px" height="200px"></nldd-window>');
		await waitForUpdate(el);
		el.show();
		const dialog = el.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
		const rect = dialog.getBoundingClientRect();

		// Only meaningful when the dialog has a real rect (browser-based tests).
		// When getBoundingClientRect returns {0,0,0,0}, width/2 = 0 which is
		// on the boundary — skip assertion to avoid false positive.
		if (rect.width === 0 && rect.height === 0) {
			console.warn('Inside-click test skipped: dialog has zero-size rect in this test runner');
			return;
		}

		const insideClick = new MouseEvent('click', {
			clientX: rect.left + rect.width / 2,
			clientY: rect.top + rect.height / 2,
			bubbles: true,
		});
		dialog.dispatchEvent(insideClick);
		expect(dialog.open).toBe(true);
	});

	it('drag update left en top en cleart right en bottom', async () => {
		el = await fixture<NLDDWindow>('<nldd-window modeless movable right="32px" bottom="32px" width="200px" height="200px"><div window-drag-handle>Handle</div></nldd-window>');
		await waitForUpdate(el);
		el.show();
		await waitForUpdate(el);

		const handle = el.querySelector('[window-drag-handle]') as HTMLElement;

		// Override _isMovable to bypass viewport check in test runner
		Object.defineProperty(el, '_isMovable', { get: () => true });

		// Call _handlePointerDown directly — synthetic events on slotted
		// content don't reach shadow DOM handlers in the test runner
		const mockDown = new PointerEvent('pointerdown', {
			clientX: 100, clientY: 100, pointerId: 1, bubbles: true, composed: true,
		});
		mockDown.composedPath = () => [handle, el];
		el._handlePointerDown(mockDown);

		// Verify pointerdown was processed
		expect((el as unknown as { _dragHandle: Element | null })._dragHandle).not.toBeNull();

		// Simulate pointermove on handle to trigger drag
		handle.dispatchEvent(new PointerEvent('pointermove', {
			clientX: 150, clientY: 120, pointerId: 1, bubbles: true,
		}));

		// left/top should be set, right/bottom cleared
		expect(el.left).toBeDefined();
		expect(el.top).toBeDefined();
		expect(el.right).toBeUndefined();
		expect(el.bottom).toBeUndefined();

		// Cleanup
		handle.dispatchEvent(new PointerEvent('pointerup', {
			clientX: 150, clientY: 120, pointerId: 1, bubbles: true,
		}));
	});
});
