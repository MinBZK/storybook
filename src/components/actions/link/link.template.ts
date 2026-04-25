import { html, nothing } from 'lit';
import type { NLDDLink } from './link.js';

interface TemplateHelpers {
	handleClick: (e: MouseEvent) => void;
}

export function template(this: NLDDLink, helpers: TemplateHelpers) {
	const resolvedRel = this._resolvedRel();
	return html`
		<a class="link"
			href=${this.disabled ? nothing : (this.href || nothing)}
			role=${this.disabled ? 'link' : nothing}
			tabindex=${this.disabled ? '0' : nothing}
			target=${this.disabled ? nothing : (this.target || nothing)}
			rel=${this.disabled ? nothing : (resolvedRel || nothing)}
			aria-disabled=${this.disabled ? 'true' : nothing}
			aria-label=${this.accessibleLabel || nothing}
			@click=${helpers.handleClick}
		>
			${this.startIcon ? html`
				<span class="link__start-icon">
					<nldd-icon name=${this.startIcon}></nldd-icon>
				</span>
			` : html`<slot name="start-icon"></slot>`}
			<span class="link__label">
				${this.text ? this.text : html`<slot></slot>`}
			</span>
			${this.endIcon ? html`
				<span class="link__end-icon">
					<nldd-icon name=${this.endIcon}></nldd-icon>
				</span>
			` : html`<slot name="end-icon"></slot>`}
		</a>
	`;
}
