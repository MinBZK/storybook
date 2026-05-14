import { html, nothing } from 'lit';
import type { NLDDSplitButton } from './split-button.js';

export function template(this: NLDDSplitButton) {
	return html`
		<div class="split-button">
			<nldd-button
				variant=${this.variant}
				size=${this.size}
				text=${this.text}
				start-icon=${this.icon || nothing}
				?disabled=${this.disabled}
				@click=${this._handleActionClick}
			></nldd-button>
			<div class="split-button__divider"></div>
			<div class="split-button__popup-button">
				<nldd-icon-button
					variant=${this.variant}
					size=${this.size}
					icon="chevron-down-small"
					text=${this._t('components.split-button.menu-action')}
					tooltip-timing="never"
					?disabled=${this.disabled}
					?expanded=${this._menuIsOpen}
					popup-type="menu"
					@click=${this._handleMenuClick}
				></nldd-icon-button>
			</div>
		</div>
		<nldd-menu class="split-button__menu"></nldd-menu>
	`;
}
