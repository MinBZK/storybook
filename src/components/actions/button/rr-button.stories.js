import { html } from 'lit';
import './rr-button.ts';

/**
 * De Button component is het primaire interactie-element voor gebruikersacties.
 *
 * ## Gebruik
 * ```html
 * <rr-button>Titel</rr-button>
 * ```
 */
export default {
	title: 'Components/Actions/Button',
	component: 'rr-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/actions/button/rr-button.ts',
			repository: 'https://github.com/regelrecht/design-system',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'destructive',
				'accent-filled',
				'accent-outlined',
				'accent-transparent',
				'neutral-tinted',
				'neutral-transparent',
				'danger-tinted',
			],
			description: 'Visual style variant',
			table: {
				defaultValue: { summary: 'neutral-tinted' },
			},
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
		type: {
			control: 'select',
			options: ['button', 'submit', 'reset'],
			description: 'Button type attribute',
			table: {
				defaultValue: { summary: 'button' },
			},
		},
		title: {
			control: 'text',
			description: 'Button title',
		},
		hasStartIcon: {
			control: 'boolean',
			description: 'Whether button has a start icon',
			table: {
				defaultValue: { summary: false },
			},
		},
		hasEndIcon: {
			control: 'boolean',
			description: 'Whether button has an end icon',
			table: {
				defaultValue: { summary: false },
			},
		},
		hasMenu: {
			control: 'boolean',
			description: 'Whether button opens a menu (shows chevron)',
			table: {
				defaultValue: { summary: false },
			},
		},
	},
	args: {
		title: 'Button',
		variant: 'neutral-tinted',
		size: 'md',
		disabled: false,
		type: 'button',
		hasStartIcon: false,
		hasEndIcon: false,
		hasMenu: false,
	},
};

const Template = ({ title, variant, size, disabled, type }) => html`
	<rr-button variant=${variant} size=${size} ?disabled=${disabled} type=${type}>${title}</rr-button>
`;

// Main story
export const Default = Template.bind({});
Default.args = {
	title: 'Button',
};

// All roles overview
export const RoleBased = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button variant="primary">Primary</rr-button>
		<rr-button variant="secondary">Secondary</rr-button>
		<rr-button variant="destructive">Destructive</rr-button>
	</div>
`;
RoleBased.parameters = {
	controls: {
		disable: true
	},
	docs: {
		description: {
			story:
				'Role based buttons zijn aliases van de appearance based buttons.',
		},
	},
};

// All variants overview
export const AppearanceBased = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button variant="accent-filled">Accent Filled</rr-button>
		<rr-button variant="accent-outlined">Accent Outlined</rr-button>
		<rr-button variant="accent-transparent">Accent Transparent</rr-button>
		<rr-button variant="neutral-tinted">Neutral Tinted</rr-button>
		<rr-button variant="neutral-transparent">Neutral Tinted</rr-button>
		<rr-button variant="danger-tinted">Danger Tinted</rr-button>
	</div>
`;
AppearanceBased.parameters = {
	controls: {
		disable: true
	},
};

// All sizes overview
export const Sizes = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button size="md">Medium</rr-button>
		<rr-button size="sm">Small</rr-button>
		<rr-button size="xs">Extra Small</rr-button>
	</div>
`;
Sizes.parameters = {
	controls: {
		disable: true
	},
};

// Icon stories
export const WithStartIcon = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button has-start-icon size="md">
			<rr-icon
				name="download"
				slot="icon-start"
			></rr-icon>
			Download
		</rr-button>
		<rr-button has-start-icon size="sm">
			<rr-icon
				name="download"
				slot="icon-start"
			></rr-icon>
			Download
		</rr-button>
		<rr-button has-start-icon size="xs">
			<rr-icon
				name="download"
				slot="icon-start"
			></rr-icon>
			Download
		</rr-button>
	</div>
`;
WithStartIcon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story:
				'Button met een icoon aan de linkerkant. Gebruik de `has-start-icon` attribute en plaats een icoon in de `icon-start` slot.',
		},
	},
};

export const WithEndIcon = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button
			size="md"
			has-end-icon
		>
			Volgende
			<rr-icon
				name="arrow-right"
				slot="icon-end"
			></rr-icon>
		</rr-button>
		<rr-button
			size="sm"
			has-end-icon
		>
			Volgende
			<rr-icon
				name="arrow-right"
				slot="icon-end"
			></rr-icon>
		</rr-button>
		<rr-button
			size="xs"
			has-end-icon
		>
			Volgende
			<rr-icon
				name="arrow-right"
				slot="icon-end"
			></rr-icon>
		</rr-button>
	</div>
`;
WithEndIcon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story:
				'Button met een icoon aan de rechterkant. Gebruik de `has-end-icon` attribute en plaats een icoon in de `icon-end` slot.',
		},
	},
};

export const WithBothIcons = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button
			size="md"
			has-start-icon
			has-end-icon
		>
			<rr-icon
				name="download"
				slot="icon-start"
			></rr-icon>
			Download bestand
			<rr-icon
				name="arrow-right"
				slot="icon-end"
			></rr-icon>
		</rr-button>
		<rr-button
			size="sm"
			has-start-icon
			has-end-icon
		>
			<rr-icon
				name="download"
				slot="icon-start"
			></rr-icon>
			Download bestand
			<rr-icon
				name="arrow-right"
				slot="icon-end"
			></rr-icon>
		</rr-button>
		<rr-button
			size="xs"
			has-start-icon
			has-end-icon
		>
			<rr-icon
				name="download"
				slot="icon-start"
			></rr-icon>
			Download bestand
			<rr-icon
				name="arrow-right"
				slot="icon-end"
			></rr-icon>
		</rr-button>
	</div>
`;
WithBothIcons.parameters = {
	controls: {
		disable: true
	},
	docs: {
		description: {
			story:
				'Button met zowel een start als end icoon. Combineer `has-start-icon` en `has-end-icon` attributes.',
		},
	},
};

export const WithMenu = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button has-menu size="md">Opties</rr-button>
		<rr-button has-menu size="sm">Opties</rr-button>
		<rr-button has-menu size="xs">Opties</rr-button>
	</div>
`;
WithMenu.parameters = {
	controls: {
		disable: true
	},
	docs: {
		description: {
			story:
				'Button die een menu opent. Gebruik de `has-menu` attribute om aan te geven dat deze button een dropdown menu toont.',
		},
	},
};
