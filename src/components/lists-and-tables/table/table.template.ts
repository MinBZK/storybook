import { html, nothing } from 'lit';

export function tableTemplate(emptyText: string, emptySupportingText: string) {
	// Two bare slots (no rowgroup wrappers): the slots are display:contents so
	// the slotted <nldd-table-row> elements become direct grid items of the
	// table and can use `grid-template-columns: subgrid`. The header slot is
	// rendered first so the header row sits above the body rows.
	//
	// The empty state spans all columns below the rows. It keeps role="row" >
	// role="cell" so the host stays a valid role="table" (an inline-dialog as a
	// direct table child would be invalid ARIA); it's removed from the a11y tree
	// while [hidden]. Slot content (`[slot=empty]`) overrides the default dialog.
	// Starts hidden — the table toggles `hidden` imperatively from _updateEmpty
	// (avoids a reactive re-render scheduled out of firstUpdated).
	return html`
		<slot name="header"></slot>
		<slot></slot>
		<div class="table__empty" role="row" hidden>
			<div class="table__empty-cell" role="cell">
				<slot name="empty">
					<nldd-inline-dialog
						text=${emptyText}
						supporting-text=${emptySupportingText || nothing}
					></nldd-inline-dialog>
				</slot>
			</div>
		</div>
	`;
}

export function tableRowTemplate(onSlotChange: (e: Event) => void) {
	// display:contents (in styles) so the slotted cells are grid items of this
	// row's subgrid. The slot's ::after renders the selected background.
	return html`<slot @slotchange=${onSlotChange}></slot>`;
}
