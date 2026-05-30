import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, hostileHostCss } from '../../test-utils.js';
import '../../components/content/title/title.js';
import '../../components/inputs/dropdown/dropdown.js';
import '../../components/forms/form-field/form-field.js';
import '../../components/content/image/image.js';
import '../../components/content/blockquote/blockquote.js';
import '../../components/lists-and-menus/cells/description-cell/description-cell.js';

/**
 * Regression coverage for the slotted-reset (./slotted-reset.ts).
 *
 * Per component: render it, snapshot the slotted element's computed style, then
 * inject a hostile host stylesheet (Tailwind Preflight + aggressive overrides) at
 * the document level. The reset must make that injection a no-op — the after
 * snapshot must equal the before snapshot for every protected property.
 *
 * Token-independent by design: it asserts "host CSS cannot change the rendering",
 * not specific token values, so it holds without settings.css loaded in the test
 * browser. If a slot loses its reset, the host bleeds in and before !== after.
 */
describe('slotted-reset: host CSS cannot bleed into slotted content', () => {
	let el: HTMLElement | undefined;
	let injected: HTMLStyleElement | undefined;

	afterEach(() => {
		if (el) {
			cleanup(el);
			el = undefined;
		}
		if (injected) {
			injected.remove();
			injected = undefined;
		}
	});

	function snapshot(node: Element, props: string[]): Record<string, string> {
		const cs = getComputedStyle(node) as unknown as Record<string, string>;
		return Object.fromEntries(props.map(p => [p, cs[p]]));
	}

	async function assertUnaffected(markup: string, selector: string, props: string[], opts: { shadow?: boolean } = {}): Promise<void> {
		el = await fixture(markup);
		const root: ParentNode = opts.shadow ? el.shadowRoot! : el;
		const node = root.querySelector(selector);
		expect(node, `element "${selector}" not found`).not.toBeNull();

		const before = snapshot(node!, props);

		injected = document.createElement('style');
		injected.textContent = hostileHostCss;
		document.head.appendChild(injected);

		const after = snapshot(node!, props);
		expect(after).toEqual(before);
	}

	it('title — slotted heading keeps its font and blocks inherited typography leaks', async () => {
		await assertUnaffected(
			'<nldd-title><h1>Titel</h1></nldd-title>',
			'h1',
			['fontSize', 'marginTop', 'letterSpacing', 'textTransform'],
		);
	});

	it('dropdown — slotted native select stays the invisible overlay', async () => {
		await assertUnaffected(
			'<nldd-dropdown><select><option>A</option></select></nldd-dropdown>',
			'select',
			['opacity', 'position', 'appearance'],
		);
	});

	it('dropdown — shadow value text blocks inherited typography leaks', async () => {
		await assertUnaffected(
			'<nldd-dropdown><select><option>Optie</option></select></nldd-dropdown>',
			'.dropdown__value',
			['letterSpacing', 'textTransform'],
			{ shadow: true },
		);
	});

	it('form-field error text — slotted link keeps colour and underline', async () => {
		await assertUnaffected(
			'<nldd-form-field-error-text invalid><a href="#">link</a></nldd-form-field-error-text>',
			'a',
			['color', 'textDecorationLine'],
		);
	});

	it('image — slotted img keeps its sizing', async () => {
		await assertUnaffected(
			'<nldd-image><img alt="x"></nldd-image>',
			'img',
			['display', 'width', 'maxWidth'],
		);
	});

	it('blockquote — slotted paragraph keeps margin and blocks the letter-spacing leak', async () => {
		await assertUnaffected(
			'<nldd-blockquote><p>Quote</p></nldd-blockquote>',
			'p',
			['marginTop', 'letterSpacing'],
		);
	});

	it('description-cell — slotted title keeps margin and blocks the text-transform leak', async () => {
		await assertUnaffected(
			'<nldd-description-cell><span slot="title">Titel</span></nldd-description-cell>',
			'[slot="title"]',
			['marginTop', 'textTransform'],
		);
	});
});
