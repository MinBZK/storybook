/**
 * RegelRecht Drag Handle Cell Component (Lit + TypeScript)
 *
 * A cell that displays a drag handle for reorderable list items.
 * Always vertically centered and sized to fit the handle.
 *
 * ### Usage with rr-list
 * To enable drag-to-reorder, add the `draggable-only` attribute to this element.
 * This attribute is required for `rr-list` to detect the drag handle in the
 * composed event path and activate pointer and keyboard drag mode:
 *
 * ```html
 * <rr-list reorderable>
 *   <rr-list-item>
 *     <rr-drag-handle-cell slot="start" draggable-only></rr-drag-handle-cell>
 *     <rr-text-cell><p slot="text">Item</p></rr-text-cell>
 *   </rr-list-item>
 * </rr-list>
 * ```
 *
 * Without `draggable-only`, pointer and keyboard drag will never trigger.
 *
 * @element rr-drag-handle-cell
 * @attr {string} size - Handle size: 'sm' | 'md' (default: 'md')
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-drag-handle-cell.styles.ts';
import { template } from './rr-drag-handle-cell.template.ts';
import { rrDragHandleCellTranslations } from './rr-drag-handle-cell.i18n.ts';
import type { RRDragHandleCellTranslations } from './rr-drag-handle-cell.i18n.ts';

type Size = 'sm' | 'md';

@customElement('rr-drag-handle-cell')
export class RRDragHandleCell extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	/** Override one or more translation keys. Unset keys fall back to the Dutch default. */
	@property({ type: Object })
	translations: Partial<RRDragHandleCellTranslations> = {};

	// — i18n ————————————————————————————————————————————————————————————————

	private _t(key: keyof RRDragHandleCellTranslations): string {
		return this.translations[key] ?? rrDragHandleCellTranslations[key];
	}

	override render() {
		const label = this._t('components.drag-handle-cell.label-text');
		return template(this.size, label);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-drag-handle-cell': RRDragHandleCell;
	}
}
