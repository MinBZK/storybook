import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { NLDDImage } from './image.js';

export function imageTemplate(component: NLDDImage) {
	// aspect-ratio is applied to the media wrapper (not the img) so it
	// reserves space in the layout *before* the image loads, avoiding CLS.
	// Slotted img/picture also fills this wrapper.
	// --lqip is the 20-bit-encoded placeholder integer; the CSS reads it via
	// var(--lqip) and renders a 6-cell gradient until the image loads.
	const hasLqip = component.lqip !== undefined && component.lqip !== null;
	const mediaStyles: Record<string, string> = {};
	if (component._cssAspectRatio) mediaStyles.aspectRatio = component._cssAspectRatio;
	if (hasLqip) mediaStyles['--lqip'] = String(component.lqip);

	const mediaClasses = classMap({
		'image__media': true,
		'image__media--lqip': hasLqip,
	});

	const imgClasses = classMap({
		'image__img': true,
		'image__img--loaded': component._imageLoaded,
	});

	const fallbackImg = html`
		<img class=${imgClasses}
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
			@load=${component._onImageLoad}
		>
	`;

	const media = html`
		<div class=${mediaClasses}
			style=${styleMap(mediaStyles)}
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
