import { html, nothing } from 'lit';
import './rr-menu.ts';
import '../../actions/button/rr-button.ts';
import '../../actions/icon-button/rr-icon-button.ts';

export default {
	title: 'Components/Lists & Menus/Menu',
	component: 'rr-menu',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['neutral', 'danger'],
			description: 'Item style variant',
		},
		selected: {
			control: 'boolean',
			description: 'Selected state',
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
		},
		hasSubmenu: {
			control: 'boolean',
			description: 'Shows chevron-right indicator',
		},
		details: {
			control: 'text',
			description: 'Details text (e.g. keyboard shortcut)',
		},
	},
};

export const Default = {
	args: {
		variant: 'neutral',
		selected: false,
		disabled: false,
		hasSubmenu: false,
		details: '',
	},
	render: (args) => html`
		<rr-icon-button id="btn-default" popovertarget="menu-default" is-expandable>
			<rr-icon name="global-settings"></rr-icon>
			Open menu
		</rr-icon-button>
		<rr-menu id="menu-default" popover anchor="btn-default">
			<rr-menu-item
				title="Menu item"
				variant=${args.variant}
				?selected=${args.selected}
				?disabled=${args.disabled}
				?has-submenu=${args.hasSubmenu}
				details=${args.details || nothing}
			></rr-menu-item>
		</rr-menu>
	`,
};

export const AllStates = {
	render: () => html`
		<rr-button id="btn-all-states" popovertarget="menu-all-states" is-expandable>Open menu</rr-button>
		<rr-menu id="menu-all-states" popover anchor="btn-all-states">
			<rr-menu-item title="Standaard item"></rr-menu-item>
			<rr-menu-item title="Geselecteerd item" selected></rr-menu-item>
			<rr-menu-item title="Met details" details="Cmd+S"></rr-menu-item>
			<rr-menu-item title="Meer opties" has-submenu></rr-menu-item>
			<rr-menu-divider></rr-menu-divider>
			<rr-menu-item title="Verwijderen" variant="danger"></rr-menu-item>
			<rr-menu-item title="Uitgeschakeld" disabled></rr-menu-item>
		</rr-menu>
	`,
};

export const WithDivider = {
	render: () => html`
		<rr-button id="btn-divider" popovertarget="menu-divider" is-expandable>Open menu</rr-button>
		<rr-menu id="menu-divider" popover anchor="btn-divider">
			<rr-menu-item title="Bewerk" details="Cmd+E"></rr-menu-item>
			<rr-menu-item title="Kopieer" details="Cmd+C"></rr-menu-item>
			<rr-menu-item title="Plak" details="Cmd+V"></rr-menu-item>
			<rr-menu-divider></rr-menu-divider>
			<rr-menu-item title="Verwijderen" variant="danger"></rr-menu-item>
		</rr-menu>
	`,
};

export const WithSubmenu = {
	render: () => html`
		<rr-button id="btn-submenu" popovertarget="menu-submenu" is-expandable>Open menu</rr-button>
		<rr-menu id="menu-submenu" popover anchor="btn-submenu">
			<rr-menu-item title="Bewerk"></rr-menu-item>
			<rr-menu-item title="Meer opties" has-submenu></rr-menu-item>
			<rr-menu-item title="Exporteer als" has-submenu></rr-menu-item>
			<rr-menu-divider></rr-menu-divider>
			<rr-menu-item title="Verwijderen" variant="danger"></rr-menu-item>
		</rr-menu>
	`,
};

export const Selected = {
	render: () => html`
		<rr-button id="btn-selected" popovertarget="menu-selected" is-expandable>Open menu</rr-button>
		<rr-menu id="menu-selected" popover anchor="btn-selected">
			<rr-menu-item title="Optie 1" selected></rr-menu-item>
			<rr-menu-item title="Optie 2"></rr-menu-item>
			<rr-menu-item title="Optie 3"></rr-menu-item>
		</rr-menu>
	`,
};
