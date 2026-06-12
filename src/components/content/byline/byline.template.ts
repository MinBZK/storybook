import { html } from 'lit';
import type { NLDDByline } from './byline.js';

export function bylineTemplate(component: NLDDByline) {
	const hasText = Boolean(component.text) || component._hasSlottedText;
	const hasSupportingText = Boolean(component.supportingText) || component._hasSlottedSupportingText;
	return html`
		<div class="byline__avatars"
			?hidden=${!component._hasSlottedAvatars}
		>
			<slot name="avatars" @slotchange=${component._onSlotChange}></slot>
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
	`;
}
