import { html } from 'lit';
import './menu.js';
import '../../actions/button/button.js';

export default {
	title: 'Components/Lists & Menus/Menu',
	component: 'nldd-menu',
	tags: ['autodocs'],
};

export const Default = {
	tags: ['!autodocs'],
	render: () => html`
		<nldd-button id="button-default" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-default" anchor="button-default">
			<nldd-menu-item text="Menu item"></nldd-menu-item>
		</nldd-menu>
	`,
};

export const WithDetails = {
	render: () => html`
		<nldd-button id="button-details" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-details" anchor="button-details">
			<nldd-menu-item text="Bewerk" details="Cmd+E"></nldd-menu-item>
			<nldd-menu-item text="Kopieer" details="Cmd+C"></nldd-menu-item>
			<nldd-menu-item text="Plak" details="Cmd+V"></nldd-menu-item>
		</nldd-menu>
	`,
};

export const WithIcons = {
	render: () => html`
		<nldd-button id="button-icons" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-icons" anchor="button-icons">
			<nldd-menu-item text="Bewerk" icon="pencil"></nldd-menu-item>
			<nldd-menu-item text="Dupliceer" icon="square-plus-on-square"></nldd-menu-item>
			<nldd-menu-item text="Verwijder" icon="trash"></nldd-menu-item>
		</nldd-menu>
	`,
};

export const WithDivider = {
	render: () => html`
		<nldd-button id="button-divider" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-divider" anchor="button-divider">
			<nldd-menu-item text="Bewerk" details="Cmd+E"></nldd-menu-item>
			<nldd-menu-item text="Kopieer" details="Cmd+C"></nldd-menu-item>
			<nldd-menu-item text="Plak" details="Cmd+V"></nldd-menu-item>
			<nldd-menu-divider></nldd-menu-divider>
			<nldd-menu-item text="Sluiten"></nldd-menu-item>
		</nldd-menu>
	`,
};

export const Checkbox = {
	render: () => html`
		<nldd-button id="button-checkbox" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-checkbox" anchor="button-checkbox">
			<nldd-menu-item type="checkbox" text="Optie 1" selected></nldd-menu-item>
			<nldd-menu-item type="checkbox" text="Optie 2"></nldd-menu-item>
			<nldd-menu-item type="checkbox" text="Optie 3"></nldd-menu-item>
		</nldd-menu>
	`,
};

export const Radio = {
	render: () => html`
		<nldd-button id="button-radio" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-radio" anchor="button-radio">
			<nldd-menu-item type="radio" text="Optie A" selected></nldd-menu-item>
			<nldd-menu-item type="radio" text="Optie B"></nldd-menu-item>
			<nldd-menu-item type="radio" text="Optie C"></nldd-menu-item>
		</nldd-menu>
	`,
};

export const Disabled = {
	render: () => html`
		<nldd-button id="button-disabled" expandable text="Open menu"></nldd-button>
		<nldd-menu id="menu-disabled" anchor="button-disabled">
			<nldd-menu-item text="Bewerk"></nldd-menu-item>
			<nldd-menu-item text="Uitgeschakeld" disabled></nldd-menu-item>
			<nldd-menu-item text="Kopieer"></nldd-menu-item>
		</nldd-menu>
	`,
};
