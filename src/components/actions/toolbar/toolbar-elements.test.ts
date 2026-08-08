import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './toolbar.js';

describe('nldd-toolbar-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error and exposes a shadow root', async () => {
		el = await fixture('<nldd-toolbar-item label="Item"><button>X</button></nldd-toolbar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
		// The slotted control is projected into the item's own box.
		expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
	});

	it('keeps its sizing and priority properties from attributes', async () => {
		el = await fixture('<nldd-toolbar-item min-width="120px" max-width="240px" width="40%" priority="2"></nldd-toolbar-item>');
		await waitForUpdate(el);
		const item = el as unknown as { minWidth: string; maxWidth: string; width: string; priority: number };
		expect(item.minWidth).toBe('120px');
		expect(item.maxWidth).toBe('240px');
		expect(item.width).toBe('40%');
		expect(item.priority).toBe(2);
	});
});

describe('nldd-toolbar-title', () => {

	it('toont een media-slot voor de titel', async () => {
		el = await fixture('<nldd-toolbar-title text="Titel"><img slot="media" alt="Merk"></nldd-toolbar-title>');
		const slot = el.shadowRoot!.querySelector('slot[name="media"]') as HTMLSlotElement;
		expect(slot).not.toBeNull();
		expect(slot.assignedElements().length).toBe(1);
	});

	it('staat een media-slot zonder titeltekst toe', async () => {
		el = await fixture('<nldd-toolbar-title><img slot="media" alt="Merk"></nldd-toolbar-title>');
		expect(el.shadowRoot!.querySelector('.toolbar__title')).toBeNull();
		const slot = el.shadowRoot!.querySelector('slot[name="media"]') as HTMLSlotElement;
		expect(slot.assignedElements().length).toBe(1);
	});
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error and shows its text and supporting text', async () => {
		el = await fixture('<nldd-toolbar-title text="Titel" supporting-text="Onder"></nldd-toolbar-title>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
		expect(el.shadowRoot!.textContent).toContain('Titel');
		expect(el.shadowRoot!.textContent).toContain('Onder');
	});

	it('maps min-width / width / max-width onto the title CSS variables (_reflectSizeVar)', async () => {
		el = await fixture('<nldd-toolbar-title text="T" min-width="200px" width="50%" max-width="300px"></nldd-toolbar-title>');
		await waitForUpdate(el);
		const style = (el as HTMLElement).style;
		expect(style.getPropertyValue('--_title-group-min-width')).toBe('200px');
		expect(style.getPropertyValue('--_title-width')).toBe('50%');
		expect(style.getPropertyValue('--_title-max-width')).toBe('300px');
	});

	it('removes the title CSS variables when the size attributes are cleared (_reflectSizeVar)', async () => {
		el = await fixture('<nldd-toolbar-title text="T" min-width="200px" width="50%" max-width="300px"></nldd-toolbar-title>');
		await waitForUpdate(el);
		const style = (el as HTMLElement).style;
		expect(style.getPropertyValue('--_title-width')).toBe('50%');
		const title = el as unknown as { minWidth: string; width: string; maxWidth: string };
		title.minWidth = '';
		title.width = '';
		title.maxWidth = '';
		await waitForUpdate(el);
		expect(style.getPropertyValue('--_title-group-min-width')).toBe('');
		expect(style.getPropertyValue('--_title-width')).toBe('');
		expect(style.getPropertyValue('--_title-max-width')).toBe('');
	});

	it('renders a slotted action control after the title text', async () => {
		el = await fixture('<nldd-toolbar-title text="Titel"><button slot="action" id="act">A</button></nldd-toolbar-title>');
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot[name="action"]') as HTMLSlotElement | null;
		expect(slot).not.toBeNull();
		const assigned = slot!.assignedElements();
		expect(assigned).toHaveLength(1);
		expect(assigned[0].id).toBe('act');
	});
});
