import { html } from 'lit';
import './rr-button-bar.ts';
import '../../actions/button/rr-button.ts';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';

export default {
	title: 'Components/Control Groups/Button Bar',
	component: 'rr-button-bar',
	tags: ['autodocs'],
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1263:6841',
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Button bar size',
		},
	},
};

export const Default = {
	args: { size: 'md' },
	render: (args) => html`
		<rr-button-bar size=${args.size}>
			<rr-icon-button>
				<rr-icon name="chevron-left"></rr-icon>
				Terug
			</rr-icon-button>
			<rr-button-bar-divider></rr-button-bar-divider>
			<rr-icon-button>
				<rr-icon name="chevron-right"></rr-icon>
				Volgende
			</rr-icon-button>
		</rr-button-bar>
	`,
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
			<rr-button-bar size="md">
				<rr-button>
					<rr-icon name="edit"></rr-icon>
					Bewerk
				</rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-button>Dupliceer</rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-icon-button>
					<rr-icon name="trash"></rr-icon>
					Verwijder
				</rr-icon-button>
			</rr-button-bar>
			<rr-button-bar size="sm">
				<rr-button>
					<rr-icon name="edit"></rr-icon>
					Bewerk
				</rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-button>Dupliceer</rr-button>
				<rr-button-bar-divider></rr-button-bar-divider>
				<rr-icon-button>
					<rr-icon name="trash"></rr-icon>
					Verwijder
				</rr-icon-button>
			</rr-button-bar>
		</div>
	`,
};

export const WithoutDivider = {
	args: { size: 'md' },
	render: (args) => html`
		<rr-button-bar>
			<rr-button>
				<rr-icon name="edit"></rr-icon>
				Bewerk
			</rr-button>
			<rr-button>Dupliceer</rr-button>
			<rr-icon-button>
				<rr-icon name="trash"></rr-icon>
				Verwijder
			</rr-icon-button>
		</rr-button-bar>
	`,
};
