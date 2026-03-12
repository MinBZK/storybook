/**
 * RegelRecht Drag Handle Cell Component (Lit + TypeScript)
 *
 * A cell that displays a drag handle for reorderable list items.
 * Always vertically centered and sized to fit the handle.
 *
 * @element rr-drag-handle-cell
 * @attr {string} size - Handle size: 'sm' | 'md' (default: 'md')
 *
 * @csspart control - The drag handle container
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-drag-handle-cell.styles.ts';
import { template } from './rr-drag-handle-cell.template.ts';

type Size = 'sm' | 'md';

@customElement('rr-drag-handle-cell')
export class RRDragHandleCell extends LitElement {
  static override styles = styles;

  @property({ type: String, reflect: true })
  size: Size = 'md';

  override render() {
	return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
	'rr-drag-handle-cell': RRDragHandleCell;
  }
}
