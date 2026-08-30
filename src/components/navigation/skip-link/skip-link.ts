/**
 * Nederlandse Digitale Dienst Skip Link Component (Lit + TypeScript)
 *
 * Accessibility pattern that lets keyboard users skip past content. Wraps
 * content in a default slot. Without href it focuses the first element after
 * the skip link in the DOM (nextElementSibling). Make sure a focusable element
 * follows the component, otherwise the skip link has no effect.
 *
 * @element nldd-skip-link
 * @attr {string} text - Text of the skip link. Falls back to the i18n default.
 * @attr {string} href - Optional external target id. Without href it jumps to the end of its own content.
 *
 * @slot - Content that can be skipped
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { skipLinkStyles } from './skip-link.styles.js';
import { template } from './skip-link.template.js';
import { withTranslations } from '../../../utilities/with-translations.js';
import { nlddSkipLinkTranslations } from './skip-link.i18n.js';

@customElement('nldd-skip-link')
export class NLDDSkipLink extends withTranslations(LitElement, nlddSkipLinkTranslations) {
	static override styles = skipLinkStyles;

	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	text = '';

	@property({ type: String })
	href = '';

	get _text(): string {
		return this.text || this._t('components.skip-link.action');
	}

	_handleClick = (): void => {
		const next = this.nextElementSibling as HTMLElement | null;
		if (next) {
			const hadTabindex = next.hasAttribute('tabindex');
			if (!hadTabindex) {
				next.setAttribute('tabindex', '-1');
				next.addEventListener('blur', () => {
					next.removeAttribute('tabindex');
				}, { once: true });
			}
			next.focus();
		}
	};

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-skip-link': NLDDSkipLink;
	}
}
