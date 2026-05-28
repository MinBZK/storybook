import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { NLDDImage } from './image.js';

export function imageTemplate(component: NLDDImage) {
	// aspect-ratio is applied to the media wrapper (not the img) so it
	// reserves space in the layout *before* the image loads, avoiding CLS.
	// Slotted img/picture also fills this wrapper.
	// --context-lqip is the 20-bit-encoded placeholder integer; the CSS
	// reads it via var(--context-lqip) and renders a 6-cell gradient until
	// the image loads. Uses the --context-* prefix because it crosses the
	// shadow boundary from this inline style into the shadow stylesheet.
	const hasLqip = component.lqip !== undefined && component.lqip !== null;
	const mediaStyles: Record<string, string> = {};
	if (component._cssAspectRatio) mediaStyles.aspectRatio = component._cssAspectRatio;
	if (hasLqip) mediaStyles['--context-lqip'] = String(component.lqip);

	const mediaClasses = classMap({
		'image__media': true,
		'image__media--lqip': hasLqip,
	});

	const imgClasses = classMap({
		'image__img': true,
		'image__img--loaded': component._imageLoaded,
		'image__img--errored': component._imageErrored,
	});

	const fallbackImg = html`
		<img class=${imgClasses}
			src=${component.src || nothing}
			alt=${component.decorative ? '' : component.alt}
			aria-hidden=${component.decorative ? 'true' : nothing}
			srcset=${component.srcset || nothing}
			sizes=${component.sizes || nothing}
			width=${ifDefined(component._numericWidth)}
			height=${ifDefined(component.height)}
			loading=${component.loading}
			decoding=${component.decoding}
			fetchpriority=${ifDefined(component.fetchPriority)}
			@load=${component._onImageLoad}
			@error=${component._onImageError}
		>
	`;

	// Error overlay: shown when the fallback img fires an error. Sits centred
	// over the media area on top of the LQIP gradient (or the neutral fallback
	// background when no LQIP is provided). Decorative images skip the alt
	// label so they don't introduce an accidental description.
	const errorOverlay = component._imageErrored ? html`
		<div class="image__error"
			role=${component.decorative ? nothing : 'img'}
			aria-label=${component.decorative ? nothing : component.alt}
			aria-hidden=${component.decorative ? 'true' : nothing}
		>
			<div class="image__error-card">
				<nldd-icon name="broken-image" size="32" color="secondary-content"></nldd-icon>
				${component.decorative ? nothing : html`<span class="image__error-text">${component.alt}</span>`}
			</div>
		</div>
	` : nothing;

	const media = html`
		<div class=${mediaClasses}
			style=${styleMap(mediaStyles)}
		>
			<slot>${fallbackImg}</slot>
			${errorOverlay}
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
