import { html } from 'lit';
import type { NDDMenuBar } from './ndd-menu-bar.js';

export function template(component: NDDMenuBar) {
	return html`
		<slot></slot>
		<div class="menu-bar__overflow-button">
			<ndd-menu-bar-item
				text="${component._overflowText}"
				icon="ellipsis"
				icon-only
				haspopup="menu"
				@click=${component._onOverflowClick}
			></ndd-menu-bar-item>
		</div>
	`;
}
