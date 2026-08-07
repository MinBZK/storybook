import { html, nothing, TemplateResult } from 'lit';
import type { NLDDAvatar } from './avatar.js';
import '../tooltip/tooltip.js';

export function avatarTemplate(component: NLDDAvatar): TemplateResult {
	const showImage = Boolean(component.src) && !component._imageFailed;
	const initials = component.resolvedInitials;
	const showInitials = !showImage && initials !== '';
	const showIcon = !showImage && !showInitials;
	// A new-tab link is a change of context, so announce it (WCAG 2.1 SC 3.2.2).
	const opensInNewTabHint = component.href && component.target === '_blank'
		? component._t('components.avatar.opens-in-new-tab-label')
		: '';
	// The control shows no text of its own, so its name comes from
	// accessible-label (or the name it already carries), plus the new-tab hint.
	const controlLabel = [component.accessibleLabel || component.name, opensInNewTabHint]
		.filter(Boolean).join(', ') || nothing;
	// sizes="auto" (valid because the image is lazy) resolves srcset against the
	// avatar's real rendered width; without a fixed size we can't know it here,
	// and the browser would otherwise assume 100vw and pick a huge candidate.
	const content = html`
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
	`;

	// The disc itself becomes the control, rather than an overlay: an avatar is
	// small and round, so a rectangular overlay would take clicks (and paint a
	// focus ring) outside the shape.
	const disc = component.href
		? html`
			<a class="avatar avatar--interactive"
				href=${component.href}
				target=${component.target || nothing}
				rel=${component._resolvedRel() || nothing}
				aria-label=${controlLabel}
			>${content}</a>
		`
		: component.button
			? html`
				<button class="avatar avatar--interactive"
					type="button"
					aria-label=${controlLabel}
				>${content}</button>
			`
			: html`<div class="avatar">${content}</div>`;

	// The name as a tooltip, like nldd-icon-button does for its label: a disc
	// shows no text, so without this the name is readable by assistive software
	// and by nobody else. Decorative avatars have nothing to say here.
	const tooltipText = component.decorative ? '' : (component.accessibleLabel || component.name);

	return tooltipText && component.tooltipTiming !== 'never'
		? html`
			<nldd-tooltip text=${tooltipText} timing=${component.tooltipTiming}>
				${disc}
			</nldd-tooltip>
		`
		: disc;
}
