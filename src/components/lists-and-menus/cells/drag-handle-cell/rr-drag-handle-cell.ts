/**
 * RegelRecht Drag Handle Cell Component (Lit + TypeScript)
 *
 * A cell that displays a drag handle for reorderable list items.
 * Always vertically centered and sized to fit the handle.
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

	/** Whether the handle is active (item is being dragged). Sets aria-pressed. */
	@property({ type: Boolean, reflect: true })
	pressed = false;

	// — i18n ————————————————————————————————————————————————————————————————

	_t(key: keyof RRDragHandleCellTranslations): string {
		return { ...rrDragHandleCellTranslations, ...this.translations }[key];
	}

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-drag-handle-cell': RRDragHandleCell;
	}
}
