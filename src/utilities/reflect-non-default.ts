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
 * Known edge: if markup writes the default *explicitly* (e.g. `<nldd-button
 * size="md">`), `fromAttribute` resolves the property to the value it already
 * holds, so Lit's default `hasChanged` sees no change, schedules no update, and
 * `toAttribute` never runs to strip the attribute — so that one authored default
 * attribute stays in the DOM. Visual behavior is unaffected (styling keys off the
 * bare `:host`); it only matters to code matching `[prop="<default>"]`, which
 * should read the property instead. Not worth a fragile `hasChanged` workaround.
 *
 * @example
 * ```ts
 * @property({ reflect: true, converter: reflectNonDefault<Size>('md') })
 * size: Size = 'md';
 * ```
 */
export function reflectNonDefault<T extends string>(defaultValue: T): ComplexAttributeConverter<T> {
	return {
		fromAttribute: (value: string | null): T => (value === null ? defaultValue : (value as T)),
		toAttribute: (value: T): string | null => (value === defaultValue ? null : value),
	};
}
