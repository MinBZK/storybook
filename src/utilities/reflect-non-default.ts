import type { ComplexAttributeConverter } from 'lit';

/**
 * A Lit attribute converter for a reflected enum property whose DEFAULT value
 * should not appear in the DOM.
 *
 * It reflects any non-default value to the attribute (so `:host([prop="x"])`
 * styling and framework property binding keep working), but maps the default to
 * *no* attribute (`toAttribute` returns null), so the DOM isn't polluted with a
 * redundant `prop="<default>"` on every instance.
 *
 * Pair it with `reflect: true`. The component's default styling must then live
 * on the bare `:host` (not `:host([prop="<default>"])`), since a default-valued
 * element carries no attribute to select on.
 *
 * @example
 * ```ts
 * @property({ reflect: true, converter: reflectNonDefault<Size>('md') })
 * size: Size = 'md';
 * ```
 */
export function reflectNonDefault<T extends string>(defaultValue: T): ComplexAttributeConverter<T> {
	return {
		fromAttribute: (value: string | null): T => (value == null ? defaultValue : (value as T)),
		toAttribute: (value: T): string | null => (value === defaultValue ? null : value),
	};
}
