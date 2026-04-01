/**
 * Nederlandse Digitale Dienst Drag Handle Cell Component (Lit + TypeScript)
 *
 * A cell that displays a drag handle for reorderable list items.
 * Always vertically centered and sized to fit the handle.
 *
 * ### Usage with ndd-list
 * To enable drag-to-reorder, add the `draggable-only` attribute to this element.
 * This attribute is required for `ndd-list` to detect the drag handle in the
 * composed event path and activate pointer and keyboard drag mode:
 *
 * ```html
 * <ndd-list reorderable>
 *   <ndd-list-item>
 *     <ndd-drag-handle-cell slot="start" draggable-only></ndd-drag-handle-cell>
 *     <ndd-text-cell text="Item"></ndd-text-cell>
 *   </ndd-list-item>
 * </ndd-list>
 * ```
 *
 * Without `draggable-only`, pointer and keyboard drag will never trigger.
 *
 * @element ndd-drag-handle-cell
 * @attr {string} size - Handle size: 'sm' | 'md' (default: 'md')
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './ndd-drag-handle-cell.styles.ts';
import { template } from './ndd-drag-handle-cell.template.ts';
import { nddDragHandleCellTranslations } from './ndd-drag-handle-cell.i18n.ts';
import type { NDDDragHandleCellTranslations } from './ndd-drag-handle-cell.i18n.ts';

type Size = 'sm' | 'md';

@customElement('ndd-drag-handle-cell')
export class NDDDragHandleCell extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	/** Override one or more translation keys. Unset keys fall back to the Dutch default. */
	@property({ type: Object })
	translations: Partial<NDDDragHandleCellTranslations> = {};

	// — i18n ————————————————————————————————————————————————————————————————

	private _t(key: keyof NDDDragHandleCellTranslations): string {
		return this.translations[key] ?? nddDragHandleCellTranslations[key];
	}

	override render() {
		const label = this._t('components.drag-handle-cell.label-text');
		return template(this.size, label);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-drag-handle-cell': NDDDragHandleCell;
	}
}
