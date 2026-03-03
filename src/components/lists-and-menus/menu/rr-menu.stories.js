import { html, nothing } from 'lit';
import './rr-menu.ts';
import '../../actions/button/rr-button.ts';

export default {
	title: 'Components/Lists & Menus/Menu',
	component: 'rr-menu',
	tags: ['autodocs'],
	argTypes: {
		selected: {
			control: 'boolean',
			description: 'Selected state',
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
		},
		details: {
			control: 'text',
			description: 'Details text (e.g. keyboard shortcut)',
		},
	},
};

export const Default = {
	args: {
		selected: false,
		disabled: false,
		details: '',
	},
	render: (args) => html`
		<rr-button
			id="button-default"
			popovertarget="menu-default"
			is-expandable
		>
			Open menu
		</rr-button>
		<rr-menu
			id="menu-default"
			popover
			anchor="button-default"
		>
			<rr-menu-item
				title="Menu item"
				?selected=${args.selected}
				?disabled=${args.disabled}
				details=${args.details || nothing}
			></rr-menu-item>
		</rr-menu>
	`,
};

export const WithDetails = {
	render: () => html`
		<rr-button
			id="button-details"
			popovertarget="menu-details"
			is-expandable
		>
			Open menu
		</rr-button>
		<rr-menu
			id="menu-details"
			popover
			anchor="button-details"
		>
			<rr-menu-item
				title="Bewerk"
				details="Cmd+E"
			></rr-menu-item>
			<rr-menu-item
				title="Kopieer"
				details="Cmd+C"
			></rr-menu-item>
			<rr-menu-item
				title="Plak"
				details="Cmd+V"
			></rr-menu-item>
		</rr-menu>
	`,
};

export const WithDivider = {
	render: () => html`
		<rr-button
			id="button-divider"
			popovertarget="menu-divider"
			is-expandable
		>
			Open menu
		</rr-button>
		<rr-menu
			id="menu-divider"
			popover
			anchor="button-divider"
		>
			<rr-menu-item title="Bewerk" details="Cmd+E"></rr-menu-item>
			<rr-menu-item title="Kopieer" details="Cmd+C"></rr-menu-item>
			<rr-menu-item title="Plak" details="Cmd+V"></rr-menu-item>
			<rr-menu-divider></rr-menu-divider>
			<rr-menu-item title="Sluiten"></rr-menu-item>
		</rr-menu>
	`,
};

export const Selectable = {
	render: () => html`
		<rr-button
			id="button-selectable"
			popovertarget="menu-selectable"
			is-expandable
		>
			Open menu
		</rr-button>
		<rr-menu
			id="menu-selectable"
			popover
			anchor="button-selectable"
		>
			<rr-menu-item
				title="Optie 1"
				selectable
				selected
			></rr-menu-item>
			<rr-menu-item
				title="Optie 2"
				selectable
			></rr-menu-item>
			<rr-menu-item
				title="Optie 3"
				selectable
			></rr-menu-item>
		</rr-menu>
	`,
};

export const Disabled = {
	render: () => html`
		<rr-button
			id="button-disabled"
			popovertarget="menu-disabled"
			is-expandable
		>
			Open menu
		</rr-button>
		<rr-menu
			id="menu-disabled"
			popover
			anchor="button-disabled"
		>
			<rr-menu-item title="Bewerk"></rr-menu-item>
			<rr-menu-item
				title="Uitgeschakeld"
				disabled
			></rr-menu-item>
			<rr-menu-item title="Kopieer"></rr-menu-item>
		</rr-menu>
	`,
};
