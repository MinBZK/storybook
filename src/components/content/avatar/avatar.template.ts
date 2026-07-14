import { html, nothing } from 'lit';
import type { NLDDAvatar } from './avatar.js';

export function avatarTemplate(component: NLDDAvatar) {
	const showImage = Boolean(component.src) && !component._imageFailed;
	const initials = component.resolvedInitials;
	const showInitials = !showImage && initials !== '';
	const showIcon = !showImage && !showInitials;
	return html`
		<div class="avatar">
			${showImage ? html`
				<img class="avatar__image"
					src=${component.src}
					srcset=${component.srcset || nothing}
					sizes=${component.size ? `${component.size}px` : nothing}
					alt=""
					loading="lazy"
					decoding="async"
					@error=${component._onImageError}
				>
			` : nothing}
			${showInitials ? html`
				<span class="avatar__initials"
					aria-hidden="true"
				>${initials}</span>
			` : nothing}
			${showIcon ? html`
				<nldd-icon class="avatar__icon"
					name=${component.resolvedIcon}
				></nldd-icon>
			` : nothing}
		</div>
	`;
}
