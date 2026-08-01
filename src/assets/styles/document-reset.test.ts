import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import variablesCss from './variables.css?raw';
import colorsCss from './colors.generated.css?raw';
import resetCss from './document-reset.css?raw';
import '../../components/layout/app-view/app-view.js';

/**
 * The skill promises an app-view sets the document typography. A component
 * cannot style the `body` from its shadow root, so the stylesheet does it,
 * scoped to `html:has(nldd-app-view)` so a page without one is untouched.
 * These tests guard both the promise and the scoping.
 */
describe('document-reset.css documenttypografie', () => {
	let styles: HTMLStyleElement[] = [];
	let appView: HTMLElement | null = null;

	beforeAll(() => {
		// variables.css imports the palettes; inject those separately, since an
		// @import with a relative path does not resolve from a <style> tag.
		styles = [colorsCss, variablesCss.replace(/@import[^;]+;/g, ''), resetCss].map((css) => {
			const style = document.createElement('style');
			style.textContent = css;
			document.head.appendChild(style);
			return style;
		});
	});

	afterAll(() => {
		styles.forEach((s) => s.remove());
	});

	afterEach(() => {
		appView?.remove();
		appView = null;
	});

	it('laat de body met rust zonder app-view', () => {
		expect(getComputedStyle(document.body).fontFamily).not.toMatch(/RijksSans/);
	});

	it('geeft de body een documentfont zodra er een app-view staat', () => {
		appView = document.createElement('nldd-app-view');
		document.body.appendChild(appView);

		const style = getComputedStyle(document.body);
		expect(style.fontFamily).toMatch(/RijksSans/);
		// No longer the browser default: that is 16px Times, ours is 18px with
		// a line height of its own.
		expect(parseFloat(style.fontSize)).toBeGreaterThan(16);
		expect(style.lineHeight).not.toBe('normal');
	});

	it('laat een consumer-regel er moeiteloos overheen gaan', () => {
		appView = document.createElement('nldd-app-view');
		document.body.appendChild(appView);

		const override = document.createElement('style');
		// No !important and no higher specificity: @layer reset loses to a rule
		// outside every layer by definition.
		override.textContent = 'body { font-family: Comic Sans MS; }';
		document.head.appendChild(override);

		expect(getComputedStyle(document.body).fontFamily).toMatch(/Comic Sans/);
		override.remove();
	});
});
