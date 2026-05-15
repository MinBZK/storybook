/**
 * Nederlandse Digitale Dienst Keyboard Shortcut Component (Lit + TypeScript)
 *
 * Toont een toetsencombinatie (zoals Cmd+K of Ctrl+Shift+P) in één gecombineerde
 * container met semantische <kbd>-elementen per toets.
 *
 * Op touch-only devices (geen hover-capable input) wordt de shortcut standaard
 * verborgen omdat hij niet aanroepbaar is. Gebruik het `always-visible` attribuut
 * wanneer de shortcut puur informatief is en altijd zichtbaar moet blijven.
 *
 * Voor cross-platform shortcuts kunnen `mac-keys`, `windows-keys` en `linux-keys`
 * worden gezet — het component picks de juiste op basis van de gedetecteerde OS,
 * met `keys` als fallback voor onbekende platforms.
 *
 * @element nldd-keyboard-shortcut
 * @attr {string} keys - Toetsen gescheiden door '+' (bijv. 'Cmd+K' of 'Ctrl+Shift+P').
 *   Gebruik '+++' voor een letterlijke '+' toets: 'Ctrl+++' wordt 'Ctrl' + '+'.
 *   Voor complexere scenario's (bijv. combo met meerdere '+' keys) kun je in plaats
 *   van het keys-attribuut de default slot gebruiken met eigen <kbd> elementen.
 * @attr {string} mac-keys - Optionele override voor macOS (incl. iPhone/iPad/iPod).
 * @attr {string} windows-keys - Optionele override voor Windows.
 * @attr {string} linux-keys - Optionele override voor Linux/ChromeOS.
 * @attr {string} size - Grootte: 'sm' | 'md' (default: 'md')
 * @attr {boolean} always-visible - Toon ook op touch-only devices waar shortcuts niet aanroepbaar zijn.
 *
 * @slot - Optionele custom <kbd>-elementen. Wordt genegeerd als keys is opgegeven.
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { keyboardShortcutStyles } from './keyboard-shortcut.styles.js';
import { template } from './keyboard-shortcut.template.js';
import { detectOS, type OS } from '../../../utilities/os.js';

type Size = 'sm' | 'md';

@customElement('nldd-keyboard-shortcut')
export class NLDDKeyboardShortcut extends LitElement {
	static override styles = keyboardShortcutStyles;

	@property({ type: String })
	keys = '';

	@property({ type: String, attribute: 'mac-keys' })
	macKeys = '';

	@property({ type: String, attribute: 'windows-keys' })
	windowsKeys = '';

	@property({ type: String, attribute: 'linux-keys' })
	linuxKeys = '';

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true, attribute: 'always-visible' })
	alwaysVisible = false;

	/**
	 * @internal — development only.
	 *
	 * Per-instance OS override that bypasses `detectOS()`. Same pattern as
	 * `debug-safe-triangle` on `nldd-menu`: useful in Storybook stories or
	 * documentation comparisons where you need different instances on the
	 * page to render as different operating systems. Don't ship this in
	 * production markup — production should rely on real OS detection.
	 */
	@property({ type: String, reflect: true, attribute: 'debug-os' })
	debugOS: OS | '' = '';

	get _resolvedKeys(): string {
		const os = this.debugOS || detectOS();
		if (os === 'mac' && this.macKeys) return this.macKeys;
		if (os === 'windows' && this.windowsKeys) return this.windowsKeys;
		if (os === 'linux' && this.linuxKeys) return this.linuxKeys;
		return this.keys;
	}

	get _parsedKeys(): string[] {
		const spec = this._resolvedKeys;
		if (!spec) return [];
		// '+++' encodes a literal '+' key between separators: Ctrl+++a → [Ctrl, +, a]
		const MARKER = '\u0000';
		return spec
			.replace(/\+\+\+/g, `+${MARKER}+`)
			.split('+')
			.map(k => k.trim().replace(new RegExp(MARKER, 'g'), '+'))
			.filter(Boolean);
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
