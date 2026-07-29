import { html, nothing } from 'lit';

export type ListItemActionControl = 'link' | 'button' | 'checkbox' | 'plain';

export function template(
	control: ListItemActionControl,
	href: string | undefined,
	target: string | undefined,
	rel: string | undefined,
	checked: boolean,
	expanded: boolean | undefined,
	current: boolean,
	disabled: boolean,
	accessibleLabel: string,
	actionTabindex?: string,
) {
	const content = html`<slot></slot>`;
	const ariaExpanded = expanded === undefined ? nothing : String(expanded);
	const ariaCurrent = current ? 'page' : nothing;
	const label = accessibleLabel || nothing;

	if (control === 'link') {
		return html`<a class="list-item-action"
			href=${href ?? nothing}
			target=${target ?? nothing}
			rel=${rel ?? nothing}
			aria-expanded=${ariaExpanded}
			aria-current=${ariaCurrent}
			aria-label=${label}
			tabindex=${actionTabindex ?? nothing}
		>${content}</a>`;
	}

	if (control === 'checkbox' || control === 'button') {
		return html`<button class="list-item-action"
			type="button"
			role=${control === 'checkbox' ? 'checkbox' : nothing}
			aria-checked=${control === 'checkbox' ? String(checked) : nothing}
			aria-expanded=${ariaExpanded}
			aria-current=${ariaCurrent}
			aria-label=${label}
			?disabled=${disabled}
			tabindex=${actionTabindex ?? nothing}
		>${content}</button>`;
	}

	// Plain: no control at all. Used in a listbox parent, where an `option` may
	// not contain interactive descendants — the cells still render, so the row
	// looks unchanged, it just isn't operable.
	return html`<div class="list-item-action">${content}</div>`;
}
