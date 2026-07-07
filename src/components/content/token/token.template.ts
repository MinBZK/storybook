import { html, nothing, TemplateResult } from 'lit';
import type { NLDDToken } from './token.js';

/** A dismiss (✕) or menu (⌄) control is a trailing icon-button; the token itself
 *  stays a plain data representation, never the button. */
export function tokenTemplate(component: NLDDToken): TemplateResult {
	return html`
		<div class="token">
			<span class="token__text">${component.text || html`<slot></slot>`}</span>
			${component.control === 'dismiss' ? html`
				<div class="token__dismiss-action">
					<nldd-icon-button
						size="sm"
						variant="neutral-tinted"
						icon="dismiss-small"
						text=${component.dismissText}
						accessible-label=${component.dismissText}
						tooltip-timing="never"
						no-highlight-border
						?disabled=${component.disabled}
						@click=${component._handleDismiss}
					></nldd-icon-button>
				</div>
			` : nothing}
			${component.control === 'menu' ? html`
				<div class="token__menu-action">
					<nldd-icon-button
						size="sm"
						variant="neutral-tinted"
						icon="chevron-down-small"
						text=${component.menuText}
						accessible-label=${component.menuText}
						tooltip-timing="never"
						no-highlight-border
						popup-type="menu"
						?expanded=${component.expanded}
						?disabled=${component.disabled}
						@click=${component._handleMenuClick}
					></nldd-icon-button>
				</div>
			` : nothing}
		</div>
	`;
}
