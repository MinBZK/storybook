import { html, nothing } from 'lit';
import type { NLDDAvatar } from './avatar.js';

export function avatarTemplate(component: NLDDAvatar) {
	const showImage = Boolean(component.src) && !component._imageFailed;
	const initials = component.resolvedInitials;
	const showInitials = !showImage && initials !== '';
	const showIcon = !showImage && !showInitials;
	// sizes="auto" (valid because the image is lazy) resolves srcset against the
	// avatar's real rendered width; without a fixed size we can't know it here,
	// and the browser would otherwise assume 100vw and pick a huge candidate.
	return html`
		<div class="avatar">
			${showImage ? html`
				<img class="avatar__image"
					src=${component.src}
					srcset=${component.srcset || nothing}
					sizes=${component.size ? `${component.size}px` : 'auto'}
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
