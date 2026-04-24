/**
 * Nederlandse Digitale Dienst Keyboard Shortcut Component (Lit + TypeScript)
 *
 * Toont een toetsencombinatie (zoals Cmd+K of Ctrl+Shift+P) in één gecombineerde
 * container met semantische <kbd>-elementen per toets.
 *
 * @element nldd-keyboard-shortcut
 * @attr {string} keys - Toetsen gescheiden door '+' (bijv. 'Cmd+K' of 'Ctrl+Shift+P')
 * @attr {string} size - Grootte: 'sm' | 'md' (default: 'md')
 *
 * @slot - Optionele custom <kbd>-elementen. Wordt genegeerd als keys is opgegeven.
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { keyboardShortcutStyles } from './keyboard-shortcut.styles.js';
import { template } from './keyboard-shortcut.template.js';

type Size = 'sm' | 'md';

@customElement('nldd-keyboard-shortcut')
export class NLDDKeyboardShortcut extends LitElement {
	static override styles = keyboardShortcutStyles;

	@property({ type: String })
	keys = '';

	@property({ type: String, reflect: true })
	size: Size = 'md';

	get _parsedKeys(): string[] {
		if (!this.keys) return [];
		return this.keys.split('+').map(k => k.trim()).filter(Boolean);
	}

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-keyboard-shortcut': NLDDKeyboardShortcut;
	}
}
