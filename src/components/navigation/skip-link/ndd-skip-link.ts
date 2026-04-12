/**
 * Nederlandse Digitale Dienst Skip Link Component (Lit + TypeScript)
 *
 * Accessibility-patroon dat keyboard-gebruikers toestaat om content over te slaan.
 * Wraps content in een default slot — zonder href focust het het eerste element
 * na de skip-link in het DOM (nextElementSibling). Zorg dat er een focusbaar
 * element na het component staat, anders heeft de skip-link geen effect.
 *
 * @element ndd-skip-link
 * @attr {string} text - Tekst van de skip-link. Fallback naar i18n default.
 * @attr {string} href - Optioneel extern doel-ID. Zonder href springt naar eind van eigen content.
 *
 * @slot - Content die overgeslagen kan worden
 */

import { LitElement, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './ndd-skip-link.styles.js';
import { template } from './ndd-skip-link.template.js';
import { nddSkipLinkTranslations } from './ndd-skip-link.i18n.js';
import type { NDDSkipLinkTranslations } from './ndd-skip-link.i18n.js';

@customElement('ndd-skip-link')
export class NDDSkipLink extends LitElement {
	static override styles = styles;

	@property({ type: String })
	text = '';

	@property({ type: String })
	href = '';

	@property({ type: Object })
	translations: Partial<NDDSkipLinkTranslations> = {};

	private _mergedTranslations = { ...nddSkipLinkTranslations };

	_t(key: keyof NDDSkipLinkTranslations): string {
		return this._mergedTranslations[key] ?? key;
	}

	override willUpdate(changed: PropertyValues): void {
		if (changed.has('translations')) {
			this._mergedTranslations = { ...nddSkipLinkTranslations, ...this.translations };
		}
	}

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
		'ndd-skip-link': NDDSkipLink;
	}
}
