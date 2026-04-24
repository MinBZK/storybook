import { html } from 'lit';
import type { NLDDBadge } from './badge.js';

export function template(component: NLDDBadge) {
	const modifiers = [];
	if (component._isDot) modifiers.push('badge--dot');
	if (component._isIconOnly) modifiers.push('badge--icon-only');
	const classes = ['badge', ...modifiers].join(' ');

	return html`
		<span class=${classes}
			role="img"
			aria-label=${component._ariaLabel}
		>
			${component.icon ? html`
				<span class="badge__icon">
					<nldd-icon name=${component.icon}></nldd-icon>
				</span>
			` : ''}
			${component._hasText ? html`<span class="badge__text">${component._displayValue}</span>` : ''}
		</span>
	`;
}
