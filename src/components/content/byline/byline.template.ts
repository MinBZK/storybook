import { html, nothing } from 'lit';
import type { NLDDByline } from './byline.js';

export function bylineTemplate(component: NLDDByline) {
	const hasText = Boolean(component.text) || component._hasSlottedText;
	const hasSupportingText = Boolean(component.supportingText) || component._hasSlottedSupportingText;
	const hasAvatars = component._hasSlottedAvatars || Boolean(component.avatarSrc);
	// Single-avatar convenience: an internal <img> rendered from avatar-src, only
	// when nothing is slotted (the slot always wins). Fixed 40px, so sizes is set
	// here rather than exposed.
	const avatarImage = component.avatarSrc && !component._hasSlottedAvatars
		? html`<img class="byline__avatar"
				src=${component.avatarSrc}
				srcset=${component.avatarSrcset || nothing}
				sizes="40px"
				alt=${component.avatarAlt}
				loading="lazy"
				decoding="async"
			>`
		: nothing;
	return html`
		<div class="byline"
			?data-multiple-avatars=${component._avatarCount >= 2}
		>
			<div class="byline__avatars"
				?hidden=${!hasAvatars}
			>
				<slot name="avatars" @slotchange=${component._onSlotChange}></slot>${avatarImage}
			</div>
			<div class="byline__text-area"
				?hidden=${!hasText && !hasSupportingText}
			>
				<p class="byline__text"
					?hidden=${!hasText}
				><slot name="text" @slotchange=${component._onSlotChange}>${component.text}</slot></p>
				<p class="byline__supporting-text"
					?hidden=${!hasSupportingText}
				><slot name="supporting-text" @slotchange=${component._onSlotChange}>${component.supportingText}</slot></p>
			</div>
		</div>
	`;
}
