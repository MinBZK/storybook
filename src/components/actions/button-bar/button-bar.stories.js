import { html } from 'lit';
import './button-bar.js';
import '../button/button.js';
import '../icon-button/icon-button.js';

export default {
	title: 'Components/Actions/Button Bar',
	component: 'nldd-button-bar',
	tags: ['autodocs'],

	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Button bar size',
			table: { defaultValue: { summary: 'md' } },
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
			table: { defaultValue: { summary: 'false' } },
		},
	},
};

export const Default = {
	args: { size: 'md', disabled: false },
	render: (args) => html`
		<nldd-button-bar size=${args.size} ?disabled=${args.disabled}>
			<nldd-icon-button icon="chevron-left" text="Vorige"></nldd-icon-button>
			<nldd-button-bar-divider></nldd-button-bar-divider>
			<nldd-icon-button icon="chevron-right" text="Volgende"></nldd-icon-button>
		</nldd-button-bar>
	`,
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
			<nldd-button-bar size="md">
				<nldd-button text="Bewerk"></nldd-button>
				<nldd-button-bar-divider></nldd-button-bar-divider>
				<nldd-button text="Dupliceer"></nldd-button>
				<nldd-button-bar-divider></nldd-button-bar-divider>
				<nldd-icon-button icon="trash" text="Verwijder"></nldd-icon-button>
			</nldd-button-bar>
			<nldd-button-bar size="sm">
				<nldd-button text="Bewerk"></nldd-button>
				<nldd-button-bar-divider></nldd-button-bar-divider>
				<nldd-button text="Dupliceer"></nldd-button>
				<nldd-button-bar-divider></nldd-button-bar-divider>
				<nldd-icon-button icon="trash" text="Verwijder"></nldd-icon-button>
			</nldd-button-bar>
			<nldd-button-bar size="xs">
				<nldd-button text="Bewerk"></nldd-button>
				<nldd-button-bar-divider></nldd-button-bar-divider>
				<nldd-button text="Dupliceer"></nldd-button>
				<nldd-button-bar-divider></nldd-button-bar-divider>
				<nldd-icon-button icon="trash" text="Verwijder"></nldd-icon-button>
			</nldd-button-bar>
		</div>
	`,
};

export const WithoutDivider = {
	args: { size: 'md', disabled: false },
	render: (args) => html`
		<nldd-button-bar size=${args.size} ?disabled=${args.disabled}>
			<nldd-button text="Cut"></nldd-button>
			<nldd-button text="Copy"></nldd-button>
			<nldd-button text="Paste"></nldd-button>
		</nldd-button-bar>
	`,
};

export const Disabled = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
			<nldd-button-bar size="md" disabled>
				<nldd-button text="Bewerk"></nldd-button>
				<nldd-button-bar-divider></nldd-button-bar-divider>
				<nldd-button text="Dupliceer"></nldd-button>
				<nldd-button-bar-divider></nldd-button-bar-divider>
				<nldd-icon-button icon="trash" text="Verwijder"></nldd-icon-button>
			</nldd-button-bar>
		</div>
	`,
};
