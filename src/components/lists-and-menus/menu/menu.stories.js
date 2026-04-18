import { html } from 'lit';
import './ndd-menu.ts';
import '../../actions/button/ndd-button.ts';

export default {
	title: 'Components/Lists & Menus/Menu',
	component: 'ndd-menu',
	tags: ['autodocs'],
};

export const Default = {
	tags: ['!autodocs'],
	render: () => html`
		<ndd-button id="button-default" expandable text="Open menu"></ndd-button>
		<ndd-menu id="menu-default" anchor="button-default">
			<ndd-menu-item text="Menu item"></ndd-menu-item>
		</ndd-menu>
	`,
};

export const WithDetails = {
	render: () => html`
		<ndd-button id="button-details" expandable text="Open menu"></ndd-button>
		<ndd-menu id="menu-details" anchor="button-details">
			<ndd-menu-item text="Bewerk" details="Cmd+E"></ndd-menu-item>
			<ndd-menu-item text="Kopieer" details="Cmd+C"></ndd-menu-item>
			<ndd-menu-item text="Plak" details="Cmd+V"></ndd-menu-item>
		</ndd-menu>
	`,
};

export const WithDivider = {
	render: () => html`
		<ndd-button id="button-divider" expandable text="Open menu"></ndd-button>
		<ndd-menu id="menu-divider" anchor="button-divider">
			<ndd-menu-item text="Bewerk" details="Cmd+E"></ndd-menu-item>
			<ndd-menu-item text="Kopieer" details="Cmd+C"></ndd-menu-item>
			<ndd-menu-item text="Plak" details="Cmd+V"></ndd-menu-item>
			<ndd-menu-divider></ndd-menu-divider>
			<ndd-menu-item text="Sluiten"></ndd-menu-item>
		</ndd-menu>
	`,
};

export const Checkbox = {
	render: () => html`
		<ndd-button id="button-checkbox" expandable text="Open menu"></ndd-button>
		<ndd-menu id="menu-checkbox" anchor="button-checkbox">
			<ndd-menu-item type="checkbox" text="Optie 1" selected></ndd-menu-item>
			<ndd-menu-item type="checkbox" text="Optie 2"></ndd-menu-item>
			<ndd-menu-item type="checkbox" text="Optie 3"></ndd-menu-item>
		</ndd-menu>
	`,
};

export const Radio = {
	render: () => html`
		<ndd-button id="button-radio" expandable text="Open menu"></ndd-button>
		<ndd-menu id="menu-radio" anchor="button-radio">
			<ndd-menu-item type="radio" text="Optie A" selected></ndd-menu-item>
			<ndd-menu-item type="radio" text="Optie B"></ndd-menu-item>
			<ndd-menu-item type="radio" text="Optie C"></ndd-menu-item>
		</ndd-menu>
	`,
};

export const Disabled = {
	render: () => html`
		<ndd-button id="button-disabled" expandable text="Open menu"></ndd-button>
		<ndd-menu id="menu-disabled" anchor="button-disabled">
			<ndd-menu-item text="Bewerk"></ndd-menu-item>
			<ndd-menu-item text="Uitgeschakeld" disabled></ndd-menu-item>
			<ndd-menu-item text="Kopieer"></ndd-menu-item>
		</ndd-menu>
	`,
};
