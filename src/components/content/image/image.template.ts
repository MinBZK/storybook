import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { NLDDImage } from './image.js';

export function imageTemplate(component: NLDDImage) {
	// aspect-ratio is applied to the media wrapper (not the img) so it
	// reserves space in the layout *before* the image loads, avoiding CLS.
	// Slotted img/picture also fills this wrapper.
	const mediaStyles = component._cssAspectRatio
		? styleMap({ aspectRatio: component._cssAspectRatio })
		: nothing;

	const fallbackImg = html`
		<img class="image__img"
			src=${component.src || nothing}
			alt=${component.decorative ? '' : component.alt}
			aria-hidden=${component.decorative ? 'true' : nothing}
			srcset=${component.srcset || nothing}
			sizes=${component.sizes || nothing}
			width=${ifDefined(component.width)}
			height=${ifDefined(component.height)}
			loading=${component.loading}
			decoding=${component.decoding}
			fetchpriority=${ifDefined(component.fetchPriority)}
		>
	`;

	const media = html`
		<div class="image__media"
			style=${mediaStyles}
		>
			<slot>${fallbackImg}</slot>
		</div>
	`;

	if (!component._hasCaption) {
		return media;
	}

	return html`
		<figure class="image__figure">
			${media}
			<figcaption class="image__caption">
				<slot name="caption" @slotchange=${component._onCaptionSlotChange}
				>${component.caption}</slot>
				${component.credit ? html`<span class="image__credit">${component.credit}</span>` : nothing}
			</figcaption>
		</figure>
	`;
}
