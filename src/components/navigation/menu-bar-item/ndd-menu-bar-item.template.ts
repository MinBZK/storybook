import { html, nothing } from 'lit';
import type { NDDMenuBarItem } from './ndd-menu-bar-item.js';
import { sanitizeUrl } from '../../../utilities/sanitize-url.js';

export function template(component: NDDMenuBarItem) {
	const safeHref = sanitizeUrl(component.href);
	const isLink = Boolean(safeHref);
	const isIconOnly = (component.iconOnly || (component.contentPriority === 'icon' && component.compact)) && component.text;
	const ariaLabel = component.accessibleLabel || (isIconOnly ? component.text : nothing);
	const ariaCurrent = component.current ? component.currentType : nothing;
	const ariaHaspopup = component.expandable ? 'menu' : (component.haspopup || nothing);
	const ariaExpanded = (component.expandable || component.haspopup) ? String(component.open) : nothing;

	if (isLink) {
		return html`
			<a class="menu-bar-item"
				href=${safeHref as string}
				aria-disabled=${component.disabled || nothing}
				tabindex=${component.disabled ? '-1' : nothing}
				aria-current=${ariaCurrent}
				aria-label=${ariaLabel}
				aria-haspopup=${ariaHaspopup}
				aria-expanded=${ariaExpanded}
			>
				${component.icon ? html`
					<span class="menu-bar-item__icon">
						<ndd-icon name=${component.icon}></ndd-icon>
					</span>
				` : nothing}
				<span class="menu-bar-item__text">
					${component.text}
				</span>
				${component.expandable ? html`
					<span class="menu-bar-item__disclosure-icon">
						<ndd-icon name="chevron-down-small"></ndd-icon>
					</span>
				` : nothing}
			</a>
			<slot></slot>
		`;
	}

	return html`
		<button class="menu-bar-item"
			type="button"
			?disabled=${component.disabled}
			aria-current=${ariaCurrent}
			aria-label=${ariaLabel}
			aria-haspopup=${ariaHaspopup}
			aria-expanded=${ariaExpanded}
		>
			${component.icon ? html`
				<span class="menu-bar-item__icon">
					<ndd-icon name=${component.icon}></ndd-icon>
				</span>
			` : nothing}
			<span class="menu-bar-item__text">
				${component.text}
			</span>
			${component.expandable ? html`
				<span class="menu-bar-item__disclosure-icon">
					<ndd-icon name="chevron-down-small"></ndd-icon>
				</span>
			` : nothing}
		</button>
		<slot></slot>
	`;
}
