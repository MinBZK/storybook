import { html } from 'lit';
import './rr-split-button.ts';

/**
 * De Split Button combineert een primaire actieknop met een dropdown trigger.
 *
 * ## Gebruik
 * ```html
 * <rr-split-button text="Opslaan"></rr-split-button>
 * ```
 */
export default {
	title: 'Components/Actions/Split Button',
	component: 'rr-split-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/actions/split-button/rr-split-button.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		text: {
			control: 'text',
			description: 'Tekst van de primaire actieknop',
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Button size',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
			table: {
				defaultValue: { summary: false },
			},
		},
	},
	args: {
		text: 'Opslaan',
		size: 'md',
		disabled: false,
	},
};

const Template = ({ text, size, disabled }) => html`
	<rr-split-button
		text=${text}
		size=${size}
		?disabled=${disabled}
		@action-click=${() => console.log('Action clicked')}
		@menu-click=${() => console.log('Menu clicked')}
	></rr-split-button>
`;

export const Default = Template.bind({});
Default.args = {};

// All sizes overview
export const Sizes = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-split-button text="Opslaan" size="md"></rr-split-button>
		<rr-split-button text="Opslaan" size="sm"></rr-split-button>
		<rr-split-button text="Opslaan" size="xs"></rr-split-button>
	</div>
`;
Sizes.parameters = {
	controls: { disable: true },
};

// Disabled
export const Disabled = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-split-button text="Opslaan" disabled size="md"></rr-split-button>
		<rr-split-button text="Opslaan" disabled size="sm"></rr-split-button>
		<rr-split-button text="Opslaan" disabled size="xs"></rr-split-button>
	</div>
`;
Disabled.parameters = {
	controls: { disable: true },
};
