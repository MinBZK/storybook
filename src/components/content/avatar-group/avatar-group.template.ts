import { html, nothing } from 'lit';
import type { NLDDAvatarGroup } from './avatar-group.js';

export function avatarGroupTemplate(component: NLDDAvatarGroup) {
	return html`
		<div class="avatar-group"
			role=${component.accessibleLabel ? 'group' : nothing}
			aria-label=${component.accessibleLabel || nothing}
		>
			<slot></slot>
		</div>
	`;
}
