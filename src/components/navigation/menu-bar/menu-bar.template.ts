import { html, nothing } from 'lit';
import type { NLDDMenuBar } from './menu-bar.js';

export function template(component: NLDDMenuBar) {
	return html`
		<nav class="menu-bar"
			aria-label=${component.accessibleLabel || nothing}
		>
			<slot></slot>
			<div class="menu-bar__overflow-button">
				<nldd-menu-bar-item
					text="${component._overflowText}"
					icon="ellipsis"
					icon-only
					haspopup="menu"
					@click=${component._onOverflowClick}
				></nldd-menu-bar-item>
			</div>
		</nav>
	`;
}
