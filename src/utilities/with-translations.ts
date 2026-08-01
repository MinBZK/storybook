import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

type Constructor<T = object> = abstract new (...args: any[]) => T;

/**
 * Mixin that adds i18n support to a LitElement component.
 *
 * Provides a `translations` property for overriding defaults,
 * a merged translations object, and a `_t()` method for lookups.
 *
 * @example
 * ```ts
 * import { withTranslations } from '../../../utilities/with-translations.js';
 * import { myDefaults } from './my-component.i18n.js';
 * import type { MyTranslations } from './my-component.i18n.js';
 *
 * class MyComponent extends withTranslations<MyTranslations>(LitElement, myDefaults) {
 *   render() {
 *     return html`${this._t('my-key')}`;
 *   }
 * }
 * ```
 */
export function withTranslations<T extends Record<string, string>>(
	Base: Constructor<LitElement> & typeof LitElement,
	defaults: T,
) {
	class TranslationsMixin extends Base {
		@property({ type: Object })
		translations: Partial<T> = {};

		/** @internal */
		_mergedTranslations: T = { ...defaults };

		/** @internal */
		_t(key: keyof T, vars?: Record<string, string | number>): string {
			let str: string = this._mergedTranslations[key] ?? String(key);
			if (vars) {
				for (const [k, v] of Object.entries(vars)) {
					str = str.split(`{${k}}`).join(String(v));
				}
			}
			return str;
		}

		override willUpdate(changed: PropertyValues): void {
			super.willUpdate(changed);
			if (changed.has('translations' as keyof this)) {
				this._mergedTranslations = { ...defaults, ...this.translations };
			}
		}
	}

	return TranslationsMixin as unknown as Constructor<LitElement & {
		translations: Partial<T>;
		_t(key: keyof T, vars?: Record<string, string | number>): string;
	}> & typeof LitElement;
}
