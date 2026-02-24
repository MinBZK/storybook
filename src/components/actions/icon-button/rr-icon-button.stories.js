import { html } from 'lit';
import './rr-icon-button.ts';
import { ICONS } from './../../content/icon/rr-icon.ts';

/**
 * De Icon Button component is een vierkante knop voor icoon-only acties.
 *
 * ## Gebruik
 * ```html
 * <rr-icon-button icon="close" title="Sluiten"></rr-icon-button>
 * ```
 */
export default {
	title: 'Components/Actions/Icon Button',
	component: 'rr-icon-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/actions/icon-button/rr-icon-button.ts',
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
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Button size',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		icon: {
			control: 'select',
			options: ICONS,
			description: 'Icon name to display',
			table: {
				defaultValue: { summary: 'icon-placeholder' },
			},
		},
		title: {
			control: 'text',
			description: 'Accessible label and visible text in lg size',
		},
		hasMenu: {
			control: 'boolean',
			name: 'has-menu',
			description: 'Adds a chevron to indicate this button opens a dropdown menu',
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
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
			table: {
				defaultValue: { summary: false },
			},
		},
	},
	args: {
		variant: 'neutral-tinted',
		size: 'md',
		icon: 'dismiss',
		title: 'Sluiten',
		hasMenu: false,
		type: 'button',
		disabled: false,
	},
};

const Template = ({ variant, size, icon, title, hasMenu, type, disabled }) => html`
	<rr-icon-button
		variant=${variant}
		size=${size}
		icon=${icon}
		title=${title}
		?has-menu=${hasMenu}
		type=${type}
		?disabled=${disabled}
	></rr-icon-button>
`;

// Main story
export const Default = Template.bind({});
Default.args = {
	icon: 'dismiss',
	title: 'Sluiten',
};

// Role based
export const RoleBased = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-icon-button variant="primary" icon="plus" title="Toevoegen"></rr-icon-button>
		<rr-icon-button variant="secondary" icon="plus" title="Toevoegen"></rr-icon-button>
		<rr-icon-button variant="destructive" icon="plus" title="Toevoegen"></rr-icon-button>
	</div>
`;
RoleBased.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Role based buttons zijn aliases van de appearance based buttons.',
		},
	},
};

// All variants overview
export const AppearanceBased = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-icon-button variant="accent-filled" icon="add" title="Toevoegen"></rr-icon-button>
		<rr-icon-button variant="accent-outlined" icon="add" title="Toevoegen"></rr-icon-button>
		<rr-icon-button variant="accent-transparent" icon="add" title="Toevoegen"></rr-icon-button>
		<rr-icon-button variant="neutral-tinted" icon="add" title="Toevoegen"></rr-icon-button>
		<rr-icon-button variant="neutral-transparent" icon="add" title="Toevoegen"></rr-icon-button>
		<rr-icon-button variant="danger-tinted" icon="add" title="Toevoegen"></rr-icon-button>
	</div>
`;
AppearanceBased.parameters = {
	controls: { disable: true },
};

// All sizes overview
export const Sizes = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-icon-button size="md" icon="dismiss" title="Sluiten"></rr-icon-button>
		<rr-icon-button size="sm" icon="dismiss" title="Sluiten"></rr-icon-button>
		<rr-icon-button size="xs" icon="dismiss" title="Sluiten"></rr-icon-button>
	</div>
`;
Sizes.parameters = {
	controls: { disable: true },
};

// LG with title
export const Large = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-icon-button size="lg" icon="download" title="Download"></rr-icon-button>
		<rr-icon-button size="lg" icon="global-settings" title="Instellingen"></rr-icon-button>
		<rr-icon-button size="lg" icon="dismiss" title="Sluiten"></rr-icon-button>
	</div>
`;
Large.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Icon button in lg formaat toont automatisch de title als tekst label onder het icoon.',
		},
	},
};

// With menu
export const WithMenu = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-icon-button has-menu size="md" icon="global-settings" title="Opties"></rr-icon-button>
		<rr-icon-button has-menu size="sm" icon="global-settings" title="Opties"></rr-icon-button>
		<rr-icon-button has-menu size="xs" icon="global-settings" title="Opties"></rr-icon-button>
	</div>
`;
WithMenu.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Icon button die een menu opent. Gebruik de `has-menu` attribute om aan te geven dat deze button een dropdown menu toont.',
		},
	},
};

// Disabled
export const Disabled = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-icon-button disabled variant="accent-filled" icon="trash" title="Verwijder"></rr-icon-button>
		<rr-icon-button disabled variant="accent-outlined" icon="trash" title="Verwijder"></rr-icon-button>
		<rr-icon-button disabled variant="neutral-tinted" icon="trash" title="Verwijder"></rr-icon-button>
		<rr-icon-button disabled variant="danger-tinted" icon="trash" title="Verwijder"></rr-icon-button>
	</div>
`;
Disabled.parameters = {
	controls: { disable: true },
};