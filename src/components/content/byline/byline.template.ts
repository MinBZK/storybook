import { html } from 'lit';
import type { NLDDByline } from './byline.js';

export function bylineTemplate(component: NLDDByline) {
	const hasText = Boolean(component.text) || component._hasSlottedText;
	const hasSupportingText = Boolean(component.supportingText) || component._hasSlottedSupportingText;
	return html`
		<div class="byline__avatars" ?hidden=${!component._hasAvatars}>
			<slot name="avatars"></slot>
		</div>
		<div class="byline__main" ?hidden=${!hasText && !hasSupportingText}>
			<p class="byline__text" ?hidden=${!hasText}><slot name="text">${component.text}</slot></p>
			<p class="byline__supporting-text" ?hidden=${!hasSupportingText}><slot name="supporting-text">${component.supportingText}</slot></p>
		</div>
	`;
}
