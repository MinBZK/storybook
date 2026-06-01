import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { ListType } from './list.js';

export const template = (
	itemsLabel: string,
	hasHeader: boolean,
	type: ListType,
	isEmpty: boolean,
	emptyText: string,
	emptySupportingText: string,
) => {
	const isNavigation = type === 'navigation';
	// Navigation: the host carries role="navigation" with its own label; an
	// extra aria-label on the inner role="list" would make the landmark name
	// and the inner list name stack in screen-reader announcements.
	const skipItemsLabel = hasHeader || isNavigation;
	// Drop role="list" (and its label) when the container is empty. The
	// empty-state slot renders an nldd-inline-dialog which is not a listitem;
	// keeping role="list" here would violate ARIA's listitem-only child rule.
	const itemsRole = isEmpty ? undefined : 'list';
	return html`
		<div class="list__body">
			<div class="list__header">
				<slot name="header"></slot>
			</div>
			<div class="list__items"
				role=${ifDefined(itemsRole)}
				aria-label=${ifDefined(skipItemsLabel || isEmpty ? undefined : itemsLabel)}
			>
				<slot></slot>
				<div class="list__empty" ?hidden=${!isEmpty}>
					<slot name="empty">
						<nldd-inline-dialog
							text=${emptyText}
							supporting-text=${emptySupportingText || nothing}
						></nldd-inline-dialog>
					</slot>
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
