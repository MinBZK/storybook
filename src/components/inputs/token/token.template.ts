import { html, nothing, TemplateResult } from 'lit';
import type { NLDDToken } from './token.js';

export function tokenTemplate(component: NLDDToken): TemplateResult {
	if (component.control === 'menu') {
		return html`
			<button
				class="token"
				type="button"
				?disabled=${component.disabled}
				aria-expanded=${component.expanded}
				aria-controls=${component.controls || nothing}
				@click=${component._handleMenuClick}
			>
				<span class="token__text"><slot></slot></span>
				<nldd-icon class="token__icon" name="chevron-down-small"></nldd-icon>
			</button>
		`;
	}

	return html`
		<div class="token">
			<span class="token__text"><slot></slot></span>
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
		</div>
	`;
}
