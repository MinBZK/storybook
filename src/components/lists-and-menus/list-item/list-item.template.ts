import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

const areas = (showStart: boolean, showEnd: boolean) => html`
	<div class=${classMap({ 'list-item__start-area': true, 'is-visible': showStart })}>
		<slot name="start">
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
		</slot>
	</div>
	<div class="list-item__main-area">
		<slot></slot>
		<div class="list-item__divider"></div>
	</div>
	<div class=${classMap({ 'list-item__end-area': true, 'is-visible': showEnd })}>
		<slot name="end">
			<nldd-spacer-cell size="12"></nldd-spacer-cell>
		</slot>
	</div>
`;

export const template = (
	type: string | undefined,
	href: string | undefined,
	isListboxOption: boolean,
	showStart: boolean,
	showEnd: boolean,
) => {
	// Listbox options: render the same inner layout (`.list-item__action`) as
	// interactive variants, but as a plain div — not focusable, no own
	// activation semantics. The listbox container handles focus + selection
	// via aria-activedescendant. Sharing the structure means hover and
	// selection styling all work via the existing `.list-item__action` rules.
	if (isListboxOption) {
		return html`<div class="list-item">
			<div class="list-item__action">
				${areas(showStart, showEnd)}
			</div>
		</div>`;
	}
	if (href) {
		return html`<div class="list-item">
			<a class="list-item__action"
				href=${href}
			>${areas(showStart, showEnd)}</a>
		</div>`;
	}
	if (type === 'button') {
		return html`<div class="list-item">
			<button class="list-item__action"
				type="button"
			>${areas(showStart, showEnd)}</button>
		</div>`;
	}
	return html`<div class="list-item">
		${areas(showStart, showEnd)}
	</div>`;
};
