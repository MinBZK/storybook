/**
 * Nederlandse Digitale Dienst Skip Link Component (Lit + TypeScript)
 *
 * Accessibility-patroon dat keyboard-gebruikers toestaat om content over te slaan.
 * Wraps content in een default slot — zonder href focust het het eerste element
 * na de skip-link in het DOM (nextElementSibling). Zorg dat er een focusbaar
 * element na het component staat, anders heeft de skip-link geen effect.
 *
 * @element nldd-skip-link
 * @attr {string} text - Tekst van de skip-link. Fallback naar i18n default.
 * @attr {string} href - Optioneel extern doel-ID. Zonder href springt naar eind van eigen content.
 *
 * @slot - Content die overgeslagen kan worden
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { skipLinkStyles } from './skip-link.styles.js';
import { template } from './skip-link.template.js';
import { withTranslations } from '../../../utilities/with-translations.js';
import { nlddSkipLinkTranslations } from './skip-link.i18n.js';

@customElement('nldd-skip-link')
export class NLDDSkipLink extends withTranslations(LitElement, nlddSkipLinkTranslations) {
	static override styles = skipLinkStyles;

	@property({ type: String })
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
