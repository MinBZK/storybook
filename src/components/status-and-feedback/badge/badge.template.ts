import { html, nothing } from 'lit';
import type { NLDDBadge } from './badge.js';

export function template(component: NLDDBadge) {
	const modifiers = [];
	if (component._isDot) modifiers.push('badge--dot');
	if (component._isIconOnly) modifiers.push('badge--icon-only');
	const classes = ['badge', ...modifiers].join(' ');
	const needsAriaImg = component._isDot || component._isIconOnly;

	return html`
		<span class=${classes}
			role=${needsAriaImg ? 'img' : nothing}
			aria-label=${needsAriaImg ? component._ariaLabel : nothing}
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
