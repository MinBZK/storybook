/**
 * Nederlandse Digitale Dienst Link Component (Lit + TypeScript)
 *
 * Standalone hyperlink component voor gebruik buiten lopende tekst (menu's,
 * actiegebieden, overzichten). Voor inline links in paragrafen gebruik je
 * <nldd-rich-text> met een standaard <a>.
 *
 * @element nldd-link
 * @attr {string} href - Link doel
 * @attr {string} target - Link target (bijv. '_blank'); stelt rel automatisch bij
 * @attr {string} rel - Link rel attribuut; standaard 'noopener noreferrer' bij target='_blank'
 * @attr {string} size - Tekstgrootte: 'xs' | 'sm' | 'md' | 'lg' (default: 'md')
 * @attr {string} text - Link tekst (alternatief voor default slot)
 * @attr {string} start-icon - Icoon voor de tekst
 * @attr {string} end-icon - Icoon na de tekst
 * @attr {string} accessible-label - Toegankelijk label voor screen readers
 * @attr {boolean} disabled - Uitgeschakelde staat
 *
 * @slot - Link tekst (alternatief voor text attribuut)
 * @slot start-icon - Custom icoon voor de tekst
 * @slot end-icon - Custom icoon na de tekst
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { linkStyles } from './link.styles.js';
import { template } from './link.template.js';
import './../../content/icon/icon.js';

type Size = 'xs' | 'sm' | 'md' | 'lg';

@customElement('nldd-link')
export class NLDDLink extends LitElement {
	static override styles = linkStyles;

	@property({ type: String, reflect: true })
	href: string | undefined = undefined;

	@property({ type: String })
	target: string | undefined = undefined;

	@property({ type: String })
	rel: string | undefined = undefined;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: String })
	text = '';

	@property({ type: String, attribute: 'start-icon' })
	startIcon = '';

	@property({ type: String, attribute: 'end-icon' })
	endIcon = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	private _handleClick(e: MouseEvent): void {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	/** @internal */
	_resolvedRel(): string {
		const base = this.rel ?? '';
		if (this.target !== '_blank') return base;
		const parts = new Set(base.split(/\s+/).filter(Boolean));
		parts.add('noopener');
		parts.add('noreferrer');
		return [...parts].join(' ');
	}

	override render() {
		return template.call(this, {
			handleClick: this._handleClick.bind(this),
		});
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-link': NLDDLink;
	}
}
