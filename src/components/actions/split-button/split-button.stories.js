import { action } from 'storybook/actions';
import { html } from 'lit';
import './split-button.js';
import '../../lists-and-menus/menu/menu.js';

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

const menuItems = html`
	<nldd-menu-item text="Opslaan als…" @select=${action('select: save-as')}></nldd-menu-item>
	<nldd-menu-item text="Opslaan en sluiten" @select=${action('select: save-and-close')}></nldd-menu-item>
	<nldd-menu-divider></nldd-menu-divider>
	<nldd-menu-item text="Verwijderen" @select=${action('select: delete')}></nldd-menu-item>
`;

const Template = ({ text, size, disabled }) => html`
	<nldd-split-button
		text=${text}
		size=${size}
		?disabled=${disabled}
		@action-click=${action('action-click')}
		@menu-click=${action('menu-click')}
	>${menuItems}</nldd-split-button>
`;

export const Default = Template.bind({});
Default.args = {};

// All sizes overview
export const Sizes = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-split-button text="Opslaan" size="md">${menuItems}</nldd-split-button>
		<nldd-split-button text="Opslaan" size="sm">${menuItems}</nldd-split-button>
		<nldd-split-button text="Opslaan" size="xs">${menuItems}</nldd-split-button>
	</div>
`;
Sizes.parameters = {
	controls: { disable: true },
};

// Disabled
export const Disabled = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-split-button text="Opslaan" disabled size="md">${menuItems}</nldd-split-button>
		<nldd-split-button text="Opslaan" disabled size="sm">${menuItems}</nldd-split-button>
		<nldd-split-button text="Opslaan" disabled size="xs">${menuItems}</nldd-split-button>
	</div>
`;
Disabled.parameters = {
	controls: { disable: true },
};
