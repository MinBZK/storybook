import { html } from 'lit';
import './rr-menu.ts';
import '../../actions/button/rr-button.ts';

export default {
	title: 'Components/Lists & Menus/Menu',
	component: 'rr-menu',
	tags: ['autodocs'],
};

export const Default = {
	tags: ['!autodocs'],
	render: () => html`
		<rr-button id="button-default" is-expandable>Open menu</rr-button>
		<rr-menu id="menu-default" anchor="button-default">
			<rr-menu-item text="Menu item"></rr-menu-item>
		</rr-menu>
	`,
};

export const WithDetails = {
	render: () => html`
		<rr-button id="button-details" is-expandable>Open menu</rr-button>
		<rr-menu id="menu-details" anchor="button-details">
			<rr-menu-item text="Bewerk" details="Cmd+E"></rr-menu-item>
			<rr-menu-item text="Kopieer" details="Cmd+C"></rr-menu-item>
			<rr-menu-item text="Plak" details="Cmd+V"></rr-menu-item>
		</rr-menu>
	`,
};

export const WithDivider = {
	render: () => html`
		<rr-button id="button-divider" is-expandable>Open menu</rr-button>
		<rr-menu id="menu-divider" anchor="button-divider">
			<rr-menu-item text="Bewerk" details="Cmd+E"></rr-menu-item>
			<rr-menu-item text="Kopieer" details="Cmd+C"></rr-menu-item>
			<rr-menu-item text="Plak" details="Cmd+V"></rr-menu-item>
			<rr-menu-divider></rr-menu-divider>
			<rr-menu-item text="Sluiten"></rr-menu-item>
		</rr-menu>
	`,
};

export const Checkbox = {
	render: () => html`
		<rr-button id="button-checkbox" is-expandable>Open menu</rr-button>
		<rr-menu id="menu-checkbox" anchor="button-checkbox">
			<rr-menu-item type="checkbox" text="Optie 1" selected></rr-menu-item>
			<rr-menu-item type="checkbox" text="Optie 2"></rr-menu-item>
			<rr-menu-item type="checkbox" text="Optie 3"></rr-menu-item>
		</rr-menu>
	`,
};

export const Radio = {
	render: () => html`
		<rr-button id="button-radio" is-expandable>Open menu</rr-button>
		<rr-menu id="menu-radio" anchor="button-radio">
			<rr-menu-item type="radio" text="Optie A" selected></rr-menu-item>
			<rr-menu-item type="radio" text="Optie B"></rr-menu-item>
			<rr-menu-item type="radio" text="Optie C"></rr-menu-item>
		</rr-menu>
	`,
};

export const Disabled = {
	render: () => html`
		<rr-button id="button-disabled" is-expandable>Open menu</rr-button>
		<rr-menu id="menu-disabled" anchor="button-disabled">
			<rr-menu-item text="Bewerk"></rr-menu-item>
			<rr-menu-item text="Uitgeschakeld" disabled></rr-menu-item>
			<rr-menu-item text="Kopieer"></rr-menu-item>
		</rr-menu>
	`,
};
