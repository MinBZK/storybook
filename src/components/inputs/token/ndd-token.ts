/**
 * Nederlandse Digitale Dienst Token Component (Lit + TypeScript)
 *
 * A token component representing a piece of data — such as a person in an address field
 * or an active filter value. Optionally dismissable or interactive via a contextual menu.
 *
 * @element ndd-token
 *
 * @attr {'none' | 'dismiss' | 'menu'} control       - Control type (default: 'none')
 * @attr {boolean}                        open          - Whether the menu is open (menu only)
 * @attr {boolean}                        disabled      - Disabled state
 * @attr {string}                         dismiss-text - Text for the dismiss button (default: 'Verwijder')
 * @attr {string}                         controls      - ID of the associated popup element (aria-controls).
 *                                                        Required for ARIA compliance when control="menu".
 *
 * @slot - Token text
 *
 * @fires dismiss - When the dismiss button is clicked
 * @fires toggle  - When the menu is clicked; detail: { open: boolean }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokenStyles } from './ndd-token.styles.ts';
import { tokenTemplate } from './ndd-token.template.ts';
import './../../content/icon/ndd-icon.ts';
import './../../actions/icon-button/ndd-icon-button.ts';

export type TokenControl = 'none' | 'dismiss' | 'menu';

@customElement('ndd-token')
export class NDDToken extends LitElement {
	static override styles = tokenStyles;

	@property({ type: String, reflect: true })
	control: TokenControl = 'none';

	@property({ type: Boolean, reflect: true })
	open = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, attribute: 'dismiss-text' })
	dismissText = 'Verwijder';

	/** ID of the associated popup element. Required for ARIA compliance when control="menu". */
	@property({ type: String, reflect: true })
	controls = '';

	_handleDismiss(e: Event): void {
		e.stopPropagation();
		if (this.disabled) return;
		this.dispatchEvent(new CustomEvent('dismiss', {
			bubbles: true,
			composed: true,
		}));
	}

	_handleMenuClick(): void {
		if (this.disabled) return;
		this.open = !this.open;
		this.dispatchEvent(new CustomEvent('toggle', {
			detail: { open: this.open },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return tokenTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-token': NDDToken;
	}
}
