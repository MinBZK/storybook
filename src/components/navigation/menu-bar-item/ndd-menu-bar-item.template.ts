import { html, nothing } from 'lit';
import type { NDDMenuBarItem } from './ndd-menu-bar-item.js';

export function template(component: NDDMenuBarItem) {
	const safeHref = component.sanitizeUrl(component.href);
	const isLink = Boolean(safeHref);

	if (isLink) {
		return html`
			<a class="menu-bar-item"
				href=${safeHref as string}
				aria-disabled=${component.disabled || nothing}
				tabindex=${component.disabled ? '-1' : nothing}
				aria-current=${component.current && !component.expandable ? 'page' : nothing}
				aria-label=${component.accessibleLabel || ((component.iconOnly || (component.contentPriority === 'icon' && component.compact)) ? component.text : nothing)}
				aria-haspopup=${component.expandable ? 'menu' : (component.haspopup || nothing)}
				aria-expanded=${(component.expandable || component.haspopup) ? String(component.open) : nothing}
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
			aria-current=${component.current && !component.expandable ? 'page' : nothing}
			aria-label=${component.accessibleLabel || ((component.iconOnly || (component.contentPriority === 'icon' && component.compact)) ? component.text : nothing)}
			aria-haspopup=${component.expandable ? 'menu' : (component.haspopup || nothing)}
			aria-expanded=${(component.expandable || component.haspopup) ? String(component.open) : nothing}
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
