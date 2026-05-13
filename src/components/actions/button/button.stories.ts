import { html, nothing } from 'lit';
import './button.js';
import { ICONS } from './../../content/icon/icon.js';

/**
 * De Button component is het primaire interactie-element voor gebruikersacties.
 *
 * ## Gebruik
 * ```html
 * <nldd-button text="Titel"></nldd-button>
 * <nldd-button text="Download" start-icon="download"></nldd-button>
 * ```
 */
export default {
	title: 'Components/Actions/Button',
	component: 'nldd-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/actions/button/button.ts',
			repository: 'https://github.com/MinBZK/storybook',
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
				'accent-transparent',
				'neutral-tinted',
				'neutral-transparent',
				'critical-tinted',
				'critical-transparent',
			],
			description: 'Visuele stijlvariant',
			table: {
				defaultValue: { summary: 'neutral-tinted' },
			},
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Grootte van de knop',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		width: {
			control: 'text',
			description: 'Width mode: "full" (stretches to container) or any CSS length (e.g. "240px")',
			table: {
				defaultValue: { summary: '' },
			},
		},
		expandable: {
			name: 'expandable',
			control: 'boolean',
			description: 'Voegt een chevron toe om aan te geven dat deze knop een menu of popover opent',
			table: {
				defaultValue: { summary: false },
			},
		},
		open: {
			name: 'open',
			control: 'boolean',
			description: 'Geeft aan dat het popover/menu open is. Activeert de is-open visuele state en zet aria-expanded="true" op de inner button.',
			table: {
				defaultValue: { summary: false },
			},
		},
		text: {
			control: 'text',
			description: 'Tekst van de knop',
		},
		startIcon: {
			name: 'start-icon',
			control: 'select',
			options: ['', ...ICONS],
			description: 'Icoon voor de tekst',
			table: {
				defaultValue: { summary: '' },
			},
		},
		endIcon: {
			name: 'end-icon',
			control: 'select',
			options: ['', ...ICONS],
			description: 'Icoon na de tekst',
			table: {
				defaultValue: { summary: '' },
			},
		},
		type: {
			control: 'select',
			options: ['button', 'submit', 'reset'],
			description: 'Type attribuut voor formulierverwerking',
			table: {
				defaultValue: { summary: 'button' },
			},
		},
		href: {
			control: 'text',
			description: 'Wanneer gezet, wordt het element als link gerenderd in plaats van het opgegeven type',
		},
		target: {
			control: 'select',
			options: ['', '_self', '_blank', '_parent', '_top'],
			description: 'Link target (alleen gebruikt als href is gezet)',
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: {
				defaultValue: { summary: false },
			},
		},
	},
	args: {
		variant: 'neutral-tinted',
		size: 'md',
		width: '',
		expandable: false,
		open: false,
		text: 'Button',
		startIcon: '',
		endIcon: '',
		type: 'button',
		href: '',
		target: '',
		disabled: false,
	},
};

const Template = ({ variant, size, width, expandable, open, text, startIcon, endIcon, type, href, target, disabled }: Record<string, any>) => html`
	<nldd-button
		variant=${variant}
		size=${size}
		width=${width || nothing}
		type=${type}
		text=${text}
		href=${href || nothing}
		target=${target || nothing}
		start-icon=${startIcon || nothing}
		end-icon=${endIcon || nothing}
		?expandable=${expandable}
		?open=${open}
		?disabled=${disabled}
	></nldd-button>
`;

export const Default = {
	render: Template,
	args: {
		text: 'Button',
	},
};

export const RoleBased = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-button variant="primary" text="Primary"></nldd-button>
		<nldd-button variant="secondary" text="Secondary"></nldd-button>
		<nldd-button variant="destructive" text="Destructive"></nldd-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Role based buttons zijn aliases van de appearance based buttons.',
			},
	},
},
};

export const AppearanceBased = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-button variant="accent-filled" text="Accent Filled"></nldd-button>
		<nldd-button variant="accent-transparent" text="Accent Transparent"></nldd-button>
		<nldd-button variant="neutral-tinted" text="Neutral Tinted"></nldd-button>
		<nldd-button variant="neutral-transparent" text="Neutral Transparent"></nldd-button>
		<nldd-button variant="critical-tinted" text="Critical Tinted"></nldd-button>
		<nldd-button variant="critical-transparent" text="Critical Transparent"></nldd-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
	},
};

export const Sizes = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-button size="md" text="Medium"></nldd-button>
		<nldd-button size="sm" text="Small"></nldd-button>
		<nldd-button size="xs" text="Extra Small"></nldd-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
	},
};

export const WithStartIcon = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-button size="md" text="Download" start-icon="download"></nldd-button>
		<nldd-button size="sm" text="Download" start-icon="download"></nldd-button>
		<nldd-button size="xs" text="Download" start-icon="download"></nldd-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Button met een icoon aan de linkerkant via het <code>start-icon</code> attribute.',
			},
	},
},
};

export const WithEndIcon = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-button size="md" text="Volgende" end-icon="arrow-right"></nldd-button>
		<nldd-button size="sm" text="Volgende" end-icon="arrow-right"></nldd-button>
		<nldd-button size="xs" text="Volgende" end-icon="arrow-right"></nldd-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Button met een icoon aan de rechterkant via het <code>end-icon</code> attribute.',
			},
	},
},
};

export const WithBothIcons = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-button size="md" text="Download bestand" start-icon="download" end-icon="arrow-right"></nldd-button>
		<nldd-button size="sm" text="Download bestand" start-icon="download" end-icon="arrow-right"></nldd-button>
		<nldd-button size="xs" text="Download bestand" start-icon="download" end-icon="arrow-right"></nldd-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Button met zowel een start als end icoon via de <code>start-icon</code> en <code>end-icon</code> attributes.',
			},
	},
},
};

export const WithDisclosureIcon = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-button expandable size="md" text="Opties"></nldd-button>
		<nldd-button expandable size="sm" text="Opties"></nldd-button>
		<nldd-button expandable size="xs" text="Opties"></nldd-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Button die een menu of popover opent. Gebruik de <code>expandable</code> attribute om aan te geven dat deze button een menu of popover opent.',
			},
	},
},
};

export const CustomIconSlot = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-button text="Custom start">
			<svg slot="start-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
				<circle cx="10" cy="10" r="8"/>
			</svg>
		</nldd-button>
		<nldd-button text="Custom end">
			<svg slot="end-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
				<polygon points="10,2 18,18 2,18"/>
			</svg>
		</nldd-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Gebruik de <code>start-icon</code> en <code>end-icon</code> slots om custom SVG iconen te plaatsen in plaats van de icon attributes.',
			},
	},
},
};
