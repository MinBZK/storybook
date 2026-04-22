import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { ListType } from './list.js';

export const template = (
	itemsLabel: string,
	hasHeader: boolean,
	type: ListType,
	controlled: boolean,
	activeDescendantId: string,
	isEmpty: boolean,
) => {
	const isListbox = type === 'listbox';
	const itemsRole = isListbox ? 'listbox' : 'list';
	// Controlled listbox: an external input owns focus and drives navigation
	// via the public API, so the listbox container itself is not tabbable and
	// carries no aria-activedescendant (that attribute lives on the input).
	const isSelfDriven = isListbox && !controlled;
	return html`
		<div class="list__body">
			<div class="list__header">
				<slot name="header"></slot>
			</div>
			<div class="list__items"
				role=${itemsRole}
				tabindex=${ifDefined(isSelfDriven ? '0' : undefined)}
				aria-label=${ifDefined(hasHeader ? undefined : itemsLabel)}
				aria-activedescendant=${ifDefined(isSelfDriven && activeDescendantId ? activeDescendantId : undefined)}
			>
				<slot></slot>
				<div class="list__empty" ?hidden=${!isEmpty}>
					<slot name="empty"></slot>
				</div>
			</div>
			<div class="list__footer">
				<slot name="footer"></slot>
			</div>
		</div>
		<div class="list__polite-announcer"
			role="status"
			aria-live="polite"
			aria-atomic="true"
		></div>
		<div class="list__assertive-announcer"
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
		></div>
	`;
};
