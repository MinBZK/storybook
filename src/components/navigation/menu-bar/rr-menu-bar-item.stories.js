import { html } from 'lit';
import './rr-menu-bar-item.ts';

export default {
	title: 'Components/Navigation/Menu Bar/Menu Bar Item',
	component: 'rr-menu-bar-item',
	tags: ['autodocs'],
	argTypes: {
		selected: {
			control: 'boolean',
			description: 'Whether the menu bar item is currently selected/active',
			table: {
				defaultValue: { summary: false },
			},
		},
		href: {
			control: 'text',
			description: 'Link destination (renders as anchor tag when set)',
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the menu bar item is disabled',
			table: {
				defaultValue: { summary: false },
			},
		},
	},
};

export const Default = {
	render: () => html`<rr-menu-bar-item>Menu item</rr-menu-bar-item>`,
};

export const Selected = {
	render: () => html`<rr-menu-bar-item selected>Home</rr-menu-bar-item>`,
};

export const AsLink = {
	render: () => html`<rr-menu-bar-item href="/contact">Contact</rr-menu-bar-item>`,
};

export const Disabled = {
	render: () => html`<rr-menu-bar-item disabled>Disabled item</rr-menu-bar-item>`,
};

export const AllStates = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 1rem; background: #1e293b; padding: 1rem;">
			<div style="display: flex; gap: 0.5rem; align-items: center;">
				<span style="color: #64748b; font-size: 12px; width: 80px;">Default:</span>
				<rr-menu-bar-item>Menu item</rr-menu-bar-item>
			</div>
			<div style="display: flex; gap: 0.5rem; align-items: center;">
				<span style="color: #64748b; font-size: 12px; width: 80px;">Selected:</span>
				<rr-menu-bar-item selected>Menu item</rr-menu-bar-item>
			</div>
			<div style="display: flex; gap: 0.5rem; align-items: center;">
				<span style="color: #64748b; font-size: 12px; width: 80px;">Disabled:</span>
				<rr-menu-bar-item disabled>Menu item</rr-menu-bar-item>
			</div>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};
