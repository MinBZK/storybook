import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-toolbar.ts';
describe('rr-toolbar', () => {
	let el: HTMLElement;
	afterEach(() => {
		if (el) cleanup(el);
	});
	it('renders without error', async () => {
		el = await fixture('<rr-toolbar></rr-toolbar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
	it('defaults to md size', async () => {
		el = await fixture('<rr-toolbar></rr-toolbar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('md');
	});
	it('reflects size attribute', async () => {
		el = await fixture('<rr-toolbar size="sm"></rr-toolbar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('sm');
	});
	it('defaults show-labels to false', async () => {
		el = await fixture('<rr-toolbar></rr-toolbar>');
		await waitForUpdate(el);
		expect(el.hasAttribute('show-labels')).toBe(false);
	});
	it('reflects show-labels attribute', async () => {
		el = await fixture('<rr-toolbar show-labels></rr-toolbar>');
		await waitForUpdate(el);
		expect(el.hasAttribute('show-labels')).toBe(true);
	});
	it('renders toolbar item in start area', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Opslaan">
						<button>Opslaan</button>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
			</rr-toolbar>
		`);
		await Promise.resolve();
		await waitForUpdate(el);
		const item = el.shadowRoot?.querySelector('.toolbar__item');
		expect(item).not.toBeNull();
	});
	it('renders title group', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-start-area>
					<rr-toolbar-title-group
						text="Titel"
						subtext="Subtitel"
					></rr-toolbar-title-group>
				</rr-toolbar-start-area>
			</rr-toolbar>
		`);
		await Promise.resolve();
		await waitForUpdate(el);
		const titleGroup = el.shadowRoot?.querySelector('.toolbar__title-group');
		expect(titleGroup).not.toBeNull();
		const title = el.shadowRoot?.querySelector('.toolbar__title');
		expect(title?.textContent?.trim()).toBe('Titel');
	});
	it('hides item label when show-labels is false', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Vet">
						<button>B</button>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
			</rr-toolbar>
		`);
		await Promise.resolve();
		await waitForUpdate(el);
		const label = el.shadowRoot?.querySelector('.toolbar__item-label');
		expect(label).not.toBeNull();
		const style = getComputedStyle(label!);
		expect(style.display).toBe('none');
	});
	it('registers marker elements as custom elements', () => {
		expect(customElements.get('rr-toolbar-item')).toBeDefined();
		expect(customElements.get('rr-toolbar-title-group')).toBeDefined();
	});
});
