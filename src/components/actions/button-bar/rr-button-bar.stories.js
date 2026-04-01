import { html } from 'lit';
import './rr-button-bar.ts';
import '../button/rr-button.ts';
import '../icon-button/rr-icon-button.ts';

export default {
	title: 'Components/Actions/Button Bar',
	component: 'rr-button-bar',
	tags: ['autodocs'],
	parameters: {
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Button bar size',
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
		},
	},
};

export const Default = {
	args: { size: 'md', disabled: false },
	render: (args) => html`
		<rr-button-bar size=${args.size} ?disabled=${args.disabled}>
			<rr-icon-button icon="chevron-left" text="Vorige"></rr-icon-button>
			<rr-button-bar-divider></rr-button-bar-divider>
			<rr-icon-button icon="chevron-right" text="Volgende"></rr-icon-button>
		</rr-button-bar>
	`,
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
			<rr-button-bar size="md">
				<rr-button text="Bewerk"></rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-button text="Dupliceer"></rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-icon-button icon="trash" text="Verwijder"></rr-icon-button>
			</rr-button-bar>
			<rr-button-bar size="sm">
				<rr-button text="Bewerk"></rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-button text="Dupliceer"></rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-icon-button icon="trash" text="Verwijder"></rr-icon-button>
			</rr-button-bar>
			<rr-button-bar size="xs">
				<rr-button text="Bewerk"></rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-button text="Dupliceer"></rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-icon-button icon="trash" text="Verwijder"></rr-icon-button>
			</rr-button-bar>
		</div>
	`,
};

export const WithoutDivider = {
	args: { size: 'md', disabled: false },
	render: (args) => html`
		<rr-button-bar size=${args.size} ?disabled=${args.disabled}>
			<rr-button text="Cut"></rr-button>
			<rr-button text="Copy"></rr-button>
			<rr-button text="Paste"></rr-button>
		</rr-button-bar>
	`,
};

export const Disabled = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
			<rr-button-bar size="md" disabled>
				<rr-button text="Bewerk"></rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-button text="Dupliceer"></rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-icon-button icon="trash" text="Verwijder"></rr-icon-button>
			</rr-button-bar>
		</div>
	`,
};
