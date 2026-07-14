import { html, nothing } from 'lit';
import type { NLDDByline } from './byline.js';

export function bylineTemplate(component: NLDDByline) {
	const hasText = Boolean(component.text) || component._hasSlottedText;
	const hasSupportingText = Boolean(component.supportingText) || component._hasSlottedSupportingText;
	const hasAvatars = component._hasSlottedAvatars || Boolean(component.avatarSrc);
	// Single-avatar convenience: an internal nldd-avatar from avatar-src, only
	// when nothing is slotted (the slot always wins). A non-empty avatar-alt
	// labels it; an empty one marks it decorative (the name is in the text).
	const avatarImage = component.avatarSrc && !component._hasSlottedAvatars
		? html`<nldd-avatar class="byline__avatar"
				src=${component.avatarSrc}
				srcset=${component.avatarSrcset || nothing}
				name=${component.avatarAlt || nothing}
				?decorative=${!component.avatarAlt}
			></nldd-avatar>`
		: nothing;
	return html`
		<div class="byline"
			?data-multiple-avatars=${component._avatarCount >= 2}
		>
			<div class="byline__avatars"
				?hidden=${!hasAvatars}
			>
				<slot name="avatars" @slotchange=${component._onSlotChange}></slot>
				${avatarImage}
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
