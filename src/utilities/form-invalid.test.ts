import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../test-utils.js';
import '../components/inputs/checkbox/checkbox.js';
import '../components/inputs/checkbox-field/checkbox-field.js';
import '../components/inputs/code-editor/code-editor.js';
import '../components/inputs/date-picker/date-picker.js';
import '../components/inputs/number-field/number-field.js';
import '../components/inputs/radio-button/radio-button.js';
import '../components/inputs/radio-button-field/radio-button-field.js';
import '../components/inputs/radio-button-group/radio-button-group.js';
import '../components/inputs/search-field/search-field.js';
import '../components/inputs/segmented-control/segmented-control.js';
import '../components/inputs/stepper/stepper.js';
import '../components/inputs/switch/switch.js';
import '../components/inputs/switch-field/switch-field.js';
import '../components/inputs/text-editor/text-editor.js';
import '../components/inputs/time-picker/time-picker.js';
import '../components/inputs/toggle-button/toggle-button.js';
import '../components/inputs/toggle-button-group/toggle-button-group.js';

/**
 * `invalid` is announced on every control, and drawn on none of these.
 *
 * That is a decision. What is wrong belongs in an
 * nldd-form-field-validation-list, in words: a red ring around one checkbox
 * would say that option is wrong, while it is the question that is unanswered.
 * Choosing not to show it is no reason to keep quiet about it, so the state has
 * to reach the element assistive software meets.
 */

const cases: [string, string][] = [
	['nldd-checkbox', '<nldd-checkbox invalid accessible-label="Akkoord"></nldd-checkbox>'],
	['nldd-checkbox-field', '<nldd-checkbox-field invalid label="Akkoord"></nldd-checkbox-field>'],
	['nldd-code-editor', '<nldd-code-editor invalid accessible-label="Code"></nldd-code-editor>'],
	['nldd-date-picker', '<nldd-date-picker invalid accessible-label="Datum"></nldd-date-picker>'],
	['nldd-number-field', '<nldd-number-field invalid></nldd-number-field>'],
	['nldd-radio-button', '<nldd-radio-button invalid value="1" text="Optie"></nldd-radio-button>'],
	['nldd-radio-button-field', '<nldd-radio-button-field invalid value="1" label="Optie"></nldd-radio-button-field>'],
	['nldd-radio-button-group', '<nldd-radio-button-group invalid name="x" accessible-label="Vraag"><nldd-radio-button-field value="1" label="Optie"></nldd-radio-button-field></nldd-radio-button-group>'],
	['nldd-search-field', '<nldd-search-field invalid></nldd-search-field>'],
	['nldd-segmented-control', '<nldd-segmented-control invalid accessible-label="Weergave"><nldd-segmented-control-item value="a" text="A"></nldd-segmented-control-item></nldd-segmented-control>'],
	['nldd-stepper', '<nldd-stepper invalid accessible-label="Aantal"></nldd-stepper>'],
	['nldd-switch', '<nldd-switch invalid accessible-label="Aan"></nldd-switch>'],
	['nldd-switch-field', '<nldd-switch-field invalid label="Aan"></nldd-switch-field>'],
	['nldd-text-editor', '<nldd-text-editor invalid accessible-label="Tekst"></nldd-text-editor>'],
	['nldd-time-picker', '<nldd-time-picker invalid accessible-label="Tijd"></nldd-time-picker>'],
	['nldd-toggle-button', '<nldd-toggle-button invalid value="1" text="Vet"></nldd-toggle-button>'],
	['nldd-toggle-button-group', '<nldd-toggle-button-group invalid type="radio" name="x" accessible-label="Weergave"><nldd-toggle-button value="1" text="Vet"></nldd-toggle-button></nldd-toggle-button-group>'],
];

/** The first element carrying aria-invalid, shadow roots included. */
function announced(root: Element | ShadowRoot, depth = 0): Element | null {
	if (depth > 10) return null;
	if (root instanceof Element && root.getAttribute('aria-invalid') === 'true') return root;
	const children = [
		...(root instanceof Element && root.shadowRoot ? [root.shadowRoot] : []),
		...Array.from(root.children),
	];
	for (const child of children) {
		const found = announced(child as Element, depth + 1);
		if (found) return found;
	}
	return null;
}

describe('invalid is announced on every control', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	for (const [name, markup] of cases) {
		it(`${name}: reaches the control as aria-invalid`, async () => {
			el = await fixture<HTMLElement>(markup);
			await waitForUpdate(el);
			await new Promise(resolve => setTimeout(resolve, 60));
			expect(announced(el), `${name}: nothing carries aria-invalid`).not.toBeNull();
		});
	}
});
