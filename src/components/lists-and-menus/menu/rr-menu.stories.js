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
		<rr-button
			id="button-default"
			is-expandable
		>
			Open menu
		</rr-button>
		<rr-menu
			id="menu-default"
			anchor="button-default"
		>
			<rr-menu-item title="Menu item"></rr-menu-item>
		</rr-menu>
	`,
};

export const WithDetails = {
	render: () => html`
		<rr-button
			id="button-details"
			is-expandable
		>
			Open menu
		</rr-button>
		<rr-menu
			id="menu-details"
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
			is-expandable
		>
			Open menu
		</rr-button>
		<rr-menu
			id="menu-divider"
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
			is-expandable
		>
			Open menu
		</rr-button>
		<rr-menu
			id="menu-selectable"
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
			is-expandable
		>
			Open menu
		</rr-button>
		<rr-menu
			id="menu-disabled"
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
