import { html } from 'lit';
import './ndd-split-button.ts';

/**
 * De Split Button combineert een primaire actieknop met een dropdown trigger.
 *
 * ## Gebruik
 * ```html
 * <ndd-split-button text="Opslaan"></ndd-split-button>
 * ```
 */
export default {
	title: 'Components/Actions/Split Button',
	component: 'ndd-split-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/actions/split-button/ndd-split-button.ts',
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
	<ndd-split-button
		text=${text}
		size=${size}
		?disabled=${disabled}
		@action-click=${() => console.warn('Action clicked')}
		@menu-click=${() => console.warn('Menu clicked')}
	></ndd-split-button>
`;

export const Default = Template.bind({});
Default.args = {};

// All sizes overview
export const Sizes = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<ndd-split-button text="Opslaan" size="md"></ndd-split-button>
		<ndd-split-button text="Opslaan" size="sm"></ndd-split-button>
		<ndd-split-button text="Opslaan" size="xs"></ndd-split-button>
	</div>
`;
Sizes.parameters = {
	controls: { disable: true },
};

// Disabled
export const Disabled = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<ndd-split-button text="Opslaan" disabled size="md"></ndd-split-button>
		<ndd-split-button text="Opslaan" disabled size="sm"></ndd-split-button>
		<ndd-split-button text="Opslaan" disabled size="xs"></ndd-split-button>
	</div>
`;
Disabled.parameters = {
	controls: { disable: true },
};
