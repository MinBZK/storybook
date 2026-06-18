import { html, nothing } from 'lit';
import type { NLDDLink } from './link.js';

interface TemplateHelpers {
	handleClick: (e: MouseEvent) => void;
}

export function template(this: NLDDLink, helpers: TemplateHelpers) {
	const resolvedRel = this._resolvedRel();
	// A new-tab link is a change of context, so announce it (WCAG 2.1 SC 3.2.2).
	// Suppressed when disabled (the <a> carries no href, so it doesn't navigate).
	const newTabHint = !this.disabled && this.href && this.target === '_blank'
		? this._t('components.link.opens-in-new-tab-text')
		: '';
	// aria-label wins the accessible-name cascade, so when one is set the hint
	// must live inside it; otherwise the name is content-derived (text or slot)
	// and the visually-hidden span below appends the hint to it.
	const ariaLabel = this.accessibleLabel
		? [this.accessibleLabel, newTabHint].filter(Boolean).join(', ')
		: nothing;
	const renderNewTabHint = !!newTabHint && !this.accessibleLabel;
	// Icons render in both modes:
	// - sized mode: inline-flex container + gap controls spacing
	// - inherit mode: inline container, the whitespace text node between
	//   icon span and label span provides a natural single-space separator
	return html`
		<a class="link"
			href=${this.disabled ? nothing : (this.href || nothing)}
			role=${this.disabled ? 'link' : nothing}
			tabindex=${this.disabled ? '0' : nothing}
			target=${this.disabled ? nothing : (this.target || nothing)}
			rel=${this.disabled ? nothing : (resolvedRel || nothing)}
			aria-disabled=${this.disabled ? 'true' : nothing}
			aria-label=${ariaLabel}
			@click=${helpers.handleClick}
		>
			${this.startIcon ? html`
				<span class="link__start-icon"><nldd-icon name=${this.startIcon}></nldd-icon></span>
			` : html`<slot name="start-icon"></slot>`}
			<span class="link__label">${this.text ? this.text : html`<slot></slot>`}</span>
			${this.endIcon ? html`
				<span class="link__end-icon"><nldd-icon name=${this.endIcon}></nldd-icon></span>
			` : html`<slot name="end-icon"></slot>`}
			${renderNewTabHint ? html`<span class="link__new-tab-hint">${newTabHint}</span>` : nothing}
		</a>
	`;
}
