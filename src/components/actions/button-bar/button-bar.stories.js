import { html } from 'lit';
import './ndd-button-bar.ts';
import '../button/ndd-button.ts';
import '../icon-button/ndd-icon-button.ts';

export default {
	title: 'Components/Actions/Button Bar',
	component: 'ndd-button-bar',
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
		<ndd-button-bar size=${args.size} ?disabled=${args.disabled}>
			<ndd-icon-button icon="chevron-left" text="Vorige"></ndd-icon-button>
			<ndd-button-bar-divider></ndd-button-bar-divider>
			<ndd-icon-button icon="chevron-right" text="Volgende"></ndd-icon-button>
		</ndd-button-bar>
	`,
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
			<ndd-button-bar size="md">
				<ndd-button text="Bewerk"></ndd-button>
				<ndd-button-bar-divider></ndd-button-bar-divider>
				<ndd-button text="Dupliceer"></ndd-button>
				<ndd-button-bar-divider></ndd-button-bar-divider>
				<ndd-icon-button icon="trash" text="Verwijder"></ndd-icon-button>
			</ndd-button-bar>
			<ndd-button-bar size="sm">
				<ndd-button text="Bewerk"></ndd-button>
				<ndd-button-bar-divider></ndd-button-bar-divider>
				<ndd-button text="Dupliceer"></ndd-button>
				<ndd-button-bar-divider></ndd-button-bar-divider>
				<ndd-icon-button icon="trash" text="Verwijder"></ndd-icon-button>
			</ndd-button-bar>
			<ndd-button-bar size="xs">
				<ndd-button text="Bewerk"></ndd-button>
				<ndd-button-bar-divider></ndd-button-bar-divider>
				<ndd-button text="Dupliceer"></ndd-button>
				<ndd-button-bar-divider></ndd-button-bar-divider>
				<ndd-icon-button icon="trash" text="Verwijder"></ndd-icon-button>
			</ndd-button-bar>
		</div>
	`,
};

export const WithoutDivider = {
	args: { size: 'md', disabled: false },
	render: (args) => html`
		<ndd-button-bar size=${args.size} ?disabled=${args.disabled}>
			<ndd-button text="Cut"></ndd-button>
			<ndd-button text="Copy"></ndd-button>
			<ndd-button text="Paste"></ndd-button>
		</ndd-button-bar>
	`,
};

export const Disabled = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
			<ndd-button-bar size="md" disabled>
				<ndd-button text="Bewerk"></ndd-button>
				<ndd-button-bar-divider></ndd-button-bar-divider>
				<ndd-button text="Dupliceer"></ndd-button>
				<ndd-button-bar-divider></ndd-button-bar-divider>
				<ndd-icon-button icon="trash" text="Verwijder"></ndd-icon-button>
			</ndd-button-bar>
		</div>
	`,
};
