import { action } from 'storybook/actions';
import { html, nothing } from 'lit';
import './split-button.js';
import '../../actions/menu/menu.js';
import { ICONS } from '../../content/icon/icon.js';

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
		variant: {
			control: 'select',
			options: ['neutral-tinted', 'neutral-base', 'secondary', 'accent-filled', 'primary'],
			description: 'Button variant',
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
		width: {
			control: 'text',
			description: "Breedte: 'full' of een CSS-lengte (bijv. '320px'). De actieknop vult de ruimte op.",
		},
		text: {
			control: 'text',
			description: 'Tekst van de primaire actieknop',
		},
		icon: {
			control: 'select',
			options: ['', ...ICONS],
			description: 'Icoonnaam links van de tekst op de primaire actieknop',
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
		width: '',
		text: 'Opslaan',
		icon: '',
		disabled: false,
	},
};

const menu = html`
	<nldd-menu>
		<nldd-menu-item text="Opslaan als…" @select=${action('select: save-as')}></nldd-menu-item>
		<nldd-menu-item text="Opslaan en sluiten" @select=${action('select: save-and-close')}></nldd-menu-item>
		<nldd-menu-divider></nldd-menu-divider>
		<nldd-menu-item text="Verwijderen" @select=${action('select: delete')}></nldd-menu-item>
	</nldd-menu>
`;

const Template = ({ variant, size, width, text, icon, disabled }: Record<string, any>) => html`
	<nldd-split-button
		variant=${variant}
		size=${size}
		width=${width || nothing}
		text=${text}
		icon=${icon || nothing}
		?disabled=${disabled}
		@action-click=${action('action-click')}
		@menu-click=${action('menu-click')}
	>${menu}</nldd-split-button>
`;

export const Default = {
	render: Template,
	args: {},
};

// All variants overview
export const Variants = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-split-button text="Opslaan" variant="primary">${menu}</nldd-split-button>
		<nldd-split-button text="Opslaan" variant="secondary">${menu}</nldd-split-button>
		<nldd-split-button text="Opslaan" variant="neutral-base">${menu}</nldd-split-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
	},
};

// Start icon
export const WithStartIcon = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-split-button text="Opslaan" icon="check-mark" variant="primary">${menu}</nldd-split-button>
		<nldd-split-button text="Opslaan" icon="check-mark" variant="secondary">${menu}</nldd-split-button>
		<nldd-split-button text="Opslaan" icon="check-mark" variant="neutral-base">${menu}</nldd-split-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
	},
};

// All sizes overview
export const Sizes = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-split-button text="Opslaan" size="lg">${menu}</nldd-split-button>
		<nldd-split-button text="Opslaan" size="md">${menu}</nldd-split-button>
		<nldd-split-button text="Opslaan" size="sm">${menu}</nldd-split-button>
		<nldd-split-button text="Opslaan" size="xs">${menu}</nldd-split-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
	},
};

// Full width — the main action button fills the available space
export const VolleBreedte = {
	name: 'Volle breedte',
	render: () => html`
	<nldd-split-button text="Opslaan" width="full">${menu}</nldd-split-button>
`,
	parameters: {
		controls: { disable: true },
	},
};

// Disabled
export const Disabled = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-split-button text="Opslaan" disabled size="md">${menu}</nldd-split-button>
		<nldd-split-button text="Opslaan" disabled size="sm">${menu}</nldd-split-button>
		<nldd-split-button text="Opslaan" disabled size="xs">${menu}</nldd-split-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
	},
};
