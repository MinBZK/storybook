import { action } from 'storybook/actions';
import { html } from 'lit';
import './split-button.ts';

/**
 * De Split Button combineert een primaire actieknop met een dropdown trigger.
 *
 * ## Gebruik
 * ```html
 * <nldd-split-button text="Opslaan"></nldd-split-button>
 * ```
 */
export default {
	title: 'Components/Actions/Split Button',
	component: 'nldd-split-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/actions/split-button/split-button.ts',
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
	<nldd-split-button
		text=${text}
		size=${size}
		?disabled=${disabled}
		@action-click=${action('action-click')}
		@menu-click=${action('menu-click')}
	></nldd-split-button>
`;

export const Default = Template.bind({});
Default.args = {};

// All sizes overview
export const Sizes = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-split-button text="Opslaan" size="md"></nldd-split-button>
		<nldd-split-button text="Opslaan" size="sm"></nldd-split-button>
		<nldd-split-button text="Opslaan" size="xs"></nldd-split-button>
	</div>
`;
Sizes.parameters = {
	controls: { disable: true },
};

// Disabled
export const Disabled = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-split-button text="Opslaan" disabled size="md"></nldd-split-button>
		<nldd-split-button text="Opslaan" disabled size="sm"></nldd-split-button>
		<nldd-split-button text="Opslaan" disabled size="xs"></nldd-split-button>
	</div>
`;
Disabled.parameters = {
	controls: { disable: true },
};
