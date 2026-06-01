import { html, nothing } from 'lit';
import './icon-button.js';
import { ICONS } from './../../content/icon/icon.js';

/**
 * De Icon Button component is een vierkante knop voor icoon-only acties.
 *
 * ## Gebruik
 * ```html
 * <nldd-icon-button text="Annuleer" icon="dismiss"></nldd-icon-button>
 * ```
 */
export default {
	title: 'Components/Actions/Icon Button',
	component: 'nldd-icon-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/actions/icon-button/icon-button.ts',
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
			options: ['xs', 'sm', 'md', 'lg'],
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
		expanded: {
			control: 'boolean',
			description: 'Geeft aan dat het popover/menu uitgeklapt is. Wordt geforward als aria-expanded op de inner button en activeert de is-expanded visuele state.',
			table: {
				defaultValue: { summary: false },
			},
		},
		popupType: {
			name: 'popup-type',
			control: 'select',
			options: ['(geen)', 'menu', 'listbox', 'dialog', 'tree', 'grid'],
			mapping: { '(geen)': '' },
			description: 'Type popup-container dat deze knop opent. Zet aria-haspopup op de inner button en zorgt dat aria-expanded altijd aanwezig is (true/false) zodat screenreaders de popup-staat kennen.',
			table: { defaultValue: { summary: '(geen)' } },
		},
		text: {
			control: 'text',
			description: 'Tekst die als aria-label en title tooltip wordt gebruikt, en zichtbaar is als label onder het icoon in lg formaat',
		},
		icon: {
			control: 'select',
			options: ICONS,
			description: 'Icoon naam voor nldd-icon',
			table: {
				defaultValue: { summary: 'dismiss' },
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
			options: ['(geen)', '_self', '_blank', '_parent', '_top'],
			mapping: { '(geen)': '' },
			description: 'Link target (alleen gebruikt als href is gezet)',
			table: { defaultValue: { summary: '(geen)' } },
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Overschrijft de tekst als aria-label en title tooltip voor schermlezer-context. Gebruik als de zichtbare tekst onvoldoende context biedt (bijv. tekst "Toon", accessible-label "Toon wachtwoord"). De tekst blijft zichtbaar in lg formaat.',
		},
		tooltipTiming: {
			name: 'tooltip-timing',
			control: 'select',
			options: ['default', 'instant', 'never'],
			description: 'Forwarded naar de inner nldd-tooltip `timing`. `never` onderdrukt de visuele tooltip (aria-label blijft intact). Gebruik `never` wanneer de context al duidelijk is (bv. spin-knoppen in nldd-number-field, chevron in nldd-split-button).',
			table: {
				defaultValue: { summary: 'default' },
			},
		},
		loading: {
			control: 'boolean',
			description: 'Laad-toestand: toont een activity indicator over het verborgen icoon, zet aria-busy en blokkeert activatie (knop blijft focusbaar).',
			table: {
				defaultValue: { summary: false },
			},
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
		expanded: false,
		popupType: '',
		text: 'Annuleer',
		icon: 'dismiss',
		type: 'button',
		href: '',
		target: '',
		accessibleLabel: '',
		tooltipTiming: 'default',
		loading: false,
		disabled: false,
	},
};

const Template = ({ variant, size, width, expandable, expanded, popupType, text, icon, type, href, target, accessibleLabel, tooltipTiming, loading, disabled }: Record<string, any>) => html`
	<nldd-icon-button
		variant=${variant}
		size=${size}
		icon=${icon}
		text=${text}
		popup-type=${popupType || nothing}
		?expandable=${expandable}
		?expanded=${expanded}
		width=${width || nothing}
		type=${type}
		href=${href || nothing}
		target=${target || nothing}
		?loading=${loading}
		?disabled=${disabled}
		accessible-label=${accessibleLabel || nothing}
		tooltip-timing=${tooltipTiming || nothing}
	></nldd-icon-button>
`;

export const Default = {
	render: Template,
	args: {
		icon: 'dismiss',
		text: 'Annuleer',
	},
};

export const RoleBased = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button variant="primary" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="secondary" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="destructive" icon="delete" text="Verwijder"></nldd-icon-button>
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
		<nldd-icon-button variant="accent-filled" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="accent-transparent" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="neutral-tinted" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="neutral-transparent" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="critical-tinted" icon="delete" text="Verwijder"></nldd-icon-button>
		<nldd-icon-button variant="critical-transparent" icon="delete" text="Verwijder"></nldd-icon-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
	},
};

export const Sizes = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button size="lg" icon="dismiss" text="Annuleer"></nldd-icon-button>
		<nldd-icon-button size="md" icon="dismiss" text="Annuleer"></nldd-icon-button>
		<nldd-icon-button size="sm" icon="dismiss" text="Annuleer"></nldd-icon-button>
		<nldd-icon-button size="xs" icon="dismiss" text="Annuleer"></nldd-icon-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
	},
};

export const Large = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button size="lg" icon="download" text="Download"></nldd-icon-button>
		<nldd-icon-button size="lg" icon="global-settings" text="Instellingen"></nldd-icon-button>
		<nldd-icon-button size="lg" icon="search" text="Zoeken"></nldd-icon-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Icon button in lg formaat toont automatisch de tekst als label onder het icoon.',
			},
	},
},
};

export const WithAccessibleLabel = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button icon="eye" text="Toon" accessible-label="Toon wachtwoord"></nldd-icon-button>
		<nldd-icon-button icon="eye-slash" text="Verberg" accessible-label="Verberg wachtwoord"></nldd-icon-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Gebruik <code>accessible-label</code> als de zichtbare tekst onvoldoende context biedt voor schermlezers. De zichtbare tekst blijft ongewijzigd.',
			},
	},
},
};

export const WithDisclosureIcon = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button expandable size="lg" icon="global-settings" text="Instellingen"></nldd-icon-button>
		<nldd-icon-button expandable size="md" icon="global-settings" text="Instellingen"></nldd-icon-button>
		<nldd-icon-button expandable size="sm" icon="global-settings" text="Instellingen"></nldd-icon-button>
		<nldd-icon-button expandable size="xs" icon="global-settings" text="Instellingen"></nldd-icon-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Icon button die een menu of popover opent. Gebruik de <code>expandable</code> attribute om aan te geven dat deze button een menu of popover toont.',
			},
	},
},
};

export const Disabled = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button disabled variant="accent-filled" icon="delete" text="Verwijderen"></nldd-icon-button>
		<nldd-icon-button disabled variant="neutral-tinted" icon="delete" text="Verwijderen"></nldd-icon-button>
		<nldd-icon-button disabled variant="critical-tinted" icon="delete" text="Verwijderen"></nldd-icon-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
	},
};

export const Loading = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button loading variant="primary" icon="download" text="Opslaan"></nldd-icon-button>
		<nldd-icon-button loading variant="neutral-tinted" icon="download" text="Opslaan"></nldd-icon-button>
		<nldd-icon-button loading size="lg" icon="download" text="Download"></nldd-icon-button>
		<nldd-icon-button loading size="sm" icon="dismiss" text="Annuleer"></nldd-icon-button>
		<nldd-icon-button loading size="xs" icon="dismiss" text="Annuleer"></nldd-icon-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Laad-toestand via het <code>loading</code> attribuut: een activity indicator verschijnt over het verborgen icoon, de knop krijgt <code>aria-busy</code> en activatie is geblokkeerd terwijl de knop focusbaar blijft.',
			},
		},
	},
};

export const CustomIconSlot = {
	render: () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button text="Custom">
			<svg slot="icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
				<circle cx="10" cy="10" r="8"/>
			</svg>
		</nldd-icon-button>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Gebruik de <code>icon</code> slot om een custom SVG icoon te plaatsen in plaats van het <code>icon</code> attribute.',
			},
	},
},
};
