import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { ListType } from './list.js';

/** Listbox-mode props for the list's own search input (combobox pattern). */
export interface ListboxOptions {
	listboxId: string;
	searchValue: string;
	activeId: string;
	searchPlaceholder: string;
	searchAccessibleLabel: string;
	searchClearLabel: string;
	hasSearchBarEnd: boolean;
	onSearchInput: (event: Event) => void;
	onSearchKeyDown: (event: KeyboardEvent) => void;
	onSearchFocus: () => void;
	onSearchBlur: () => void;
	onClearClick: () => void;
	onSearchBarEndSlotChange: (event: Event) => void;
}

export interface ListTemplateProps {
	itemsLabel: string;
	hasToolbar: boolean;
	type: ListType;
	isEmpty: boolean;
	emptyText: string;
	emptySupportingText: string;
	listbox: ListboxOptions;
}

export const template = ({
	itemsLabel,
	hasToolbar,
	type,
	isEmpty,
	emptyText,
	emptySupportingText,
	listbox,
}: ListTemplateProps) => {
	const isNavigation = type === 'navigation';
	const isListbox = type === 'listbox';
	// Navigation: the host carries role="navigation" with its own label; an
	// extra aria-label on the inner role="list" would make the landmark name
	// and the inner list name stack in screen-reader announcements. Listbox:
	// the input is the labeled control, so the listbox itself stays unlabeled.
	const skipItemsLabel = isNavigation || isListbox;
	// Role on .list__items: role="listbox" in listbox mode, role="tree" for a
	// tree, else role="list".
	// The empty-state (a non-option) is now a SIBLING of .list__items inside
	// .list__main, so .list__items only ever contains options/items — the role
	// can be set unconditionally per type (it's hidden when empty anyway).
	const itemsRole = isListbox ? 'listbox' : type === 'tree' ? 'tree' : 'list';
	// In listbox mode an empty search has no "no results" meaning yet, so the
	// empty state is suppressed — the consumer shows just the search field (and
	// may place its own hint outside the list). It appears only once a query is
	// present. .list__main collapses when it would hold neither visible options
	// nor the empty state, leaving no bare box behind.
	const showEmpty = isEmpty && !(isListbox && listbox.searchValue === '');
	const showMain = !isEmpty || showEmpty;
	return html`
		<div class="list">
			<div class="list__header">
				${isListbox ? html`
					<div class="list__search-bar">
						<div class="list__search-field">
							<label class="list__search-field-label">
								<div class="list__search-field-icon"
									aria-hidden="true"
								>
									<nldd-icon name="search"></nldd-icon>
								</div>
								<input class="list__search-field-input"
									type="text"
									role="combobox"
									aria-controls=${listbox.listboxId}
									aria-expanded=${!isEmpty}
									aria-autocomplete="list"
									aria-activedescendant=${listbox.activeId || nothing}
									aria-label=${listbox.searchAccessibleLabel}
									placeholder=${listbox.searchPlaceholder}
									.value=${listbox.searchValue}
									@input=${listbox.onSearchInput}
									@keydown=${listbox.onSearchKeyDown}
									@focus=${listbox.onSearchFocus}
									@blur=${listbox.onSearchBlur}
								>
							</label>
							${listbox.searchValue ? html`
								<div class="list__search-field-end">
									<div class="list__search-field-clear">
										<nldd-icon-button
											variant="neutral-transparent"
											size="sm"
											icon="dismiss"
											text=${listbox.searchClearLabel}
											tooltip-timing="never"
											@click=${listbox.onClearClick}
										></nldd-icon-button>
									</div>
								</div>
							` : nothing}
						</div>
						<div class="list__search-bar-end" ?hidden=${!listbox.hasSearchBarEnd}>
							<slot name="search-bar-end" @slotchange=${listbox.onSearchBarEndSlotChange}></slot>
						</div>
					</div>
				` : nothing}
				<div class="list__toolbar" ?hidden=${!hasToolbar}>
					<slot name="toolbar"></slot>
				</div>
			</div>
			<div class="list__main" ?hidden=${!showMain}>
				<div class="list__items"
					id=${ifDefined(isListbox ? listbox.listboxId : undefined)}
					role=${itemsRole}
					aria-label=${ifDefined(skipItemsLabel ? undefined : itemsLabel)}
					?hidden=${isEmpty}
				>
					<slot></slot>
				</div>
				<div class="list__empty"
					?hidden=${!showEmpty}
				>
					<slot name="empty">
						<nldd-inline-dialog
							text=${emptyText}
							supporting-text=${emptySupportingText || nothing}
						></nldd-inline-dialog>
					</slot>
				</div>
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
