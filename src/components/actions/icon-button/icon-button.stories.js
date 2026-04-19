import { html, nothing } from 'lit';
import './icon-button.ts';
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
				'accent-outlined',
				'accent-transparent',
				'neutral-tinted',
				'neutral-transparent',
				'danger-tinted',
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
		icon: {
			control: 'select',
			options: ICONS,
			description: 'Icoon naam voor nldd-icon',
			table: {
				defaultValue: { summary: 'dismiss' },
			},
		},
		text: {
			control: 'text',
			description: 'Tekst die als aria-label en title tooltip wordt gebruikt, en zichtbaar is als label onder het icoon in lg formaat',
		},
		accessibleLabel: {
			control: 'text',
			name: 'accessible-label',
			description: 'Overschrijft de tekst als aria-label en title tooltip voor schermlezer-context. Gebruik als de zichtbare tekst onvoldoende context biedt (bijv. tekst "Toon", accessible-label "Toon wachtwoord"). De tekst blijft zichtbaar in lg formaat.',
		},
		expandable: {
			control: 'boolean',
			name: 'expandable',
			description: 'Voegt een chevron toe om aan te geven dat deze knop een menu of popover opent',
			table: {
				defaultValue: { summary: false },
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
		icon: 'dismiss',
		text: 'Annuleer',
		accessibleLabel: '',
		expandable: false,
		type: 'button',
		href: '',
		target: '',
		disabled: false,
	},
};

const Template = ({ variant, size, icon, text, accessibleLabel, expandable, type, href, target, disabled }) => html`
	<nldd-icon-button
		variant=${variant}
		size=${size}
		icon=${icon}
		text=${text}
		?expandable=${expandable}
		type=${type}
		href=${href || nothing}
		target=${target || nothing}
		?disabled=${disabled}
		accessible-label=${accessibleLabel || nothing}
	></nldd-icon-button>
`;

export const Default = Template.bind({});
Default.args = {
	icon: 'dismiss',
	text: 'Annuleer',
};

export const RoleBased = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button variant="primary" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="secondary" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="destructive" icon="delete" text="Verwijder"></nldd-icon-button>
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

export const AppearanceBased = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button variant="accent-filled" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="accent-outlined" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="accent-transparent" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="neutral-tinted" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="neutral-transparent" icon="add" text="Voeg toe"></nldd-icon-button>
		<nldd-icon-button variant="danger-tinted" icon="delete" text="Verwijder"></nldd-icon-button>
	</div>
`;
AppearanceBased.parameters = {
	controls: { disable: true },
};

export const Sizes = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button size="lg" icon="dismiss" text="Annuleer"></nldd-icon-button>
		<nldd-icon-button size="md" icon="dismiss" text="Annuleer"></nldd-icon-button>
		<nldd-icon-button size="sm" icon="dismiss" text="Annuleer"></nldd-icon-button>
		<nldd-icon-button size="xs" icon="dismiss" text="Annuleer"></nldd-icon-button>
	</div>
`;
Sizes.parameters = {
	controls: { disable: true },
};

export const Large = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button size="lg" icon="download" text="Download"></nldd-icon-button>
		<nldd-icon-button size="lg" icon="global-settings" text="Instellingen"></nldd-icon-button>
		<nldd-icon-button size="lg" icon="search" text="Zoeken"></nldd-icon-button>
	</div>
`;
Large.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Icon button in lg formaat toont automatisch de tekst als label onder het icoon.',
		},
	},
};

export const WithAccessibleLabel = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button icon="eye" text="Toon" accessible-label="Toon wachtwoord"></nldd-icon-button>
		<nldd-icon-button icon="eye-slash" text="Verberg" accessible-label="Verberg wachtwoord"></nldd-icon-button>
	</div>
`;
WithAccessibleLabel.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Gebruik <code>accessible-label</code> als de zichtbare tekst onvoldoende context biedt voor schermlezers. De zichtbare tekst blijft ongewijzigd.',
		},
	},
};

export const WithDisclosureIcon = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button expandable size="lg" icon="global-settings" text="Instellingen"></nldd-icon-button>
		<nldd-icon-button expandable size="md" icon="global-settings" text="Instellingen"></nldd-icon-button>
		<nldd-icon-button expandable size="sm" icon="global-settings" text="Instellingen"></nldd-icon-button>
		<nldd-icon-button expandable size="xs" icon="global-settings" text="Instellingen"></nldd-icon-button>
	</div>
`;
WithDisclosureIcon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Icon button die een menu of popover opent. Gebruik de <code>expandable</code> attribute om aan te geven dat deze button een menu of popover toont.',
		},
	},
};

export const Disabled = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button disabled variant="accent-filled" icon="remove" text="Verwijderen"></nldd-icon-button>
		<nldd-icon-button disabled variant="accent-outlined" icon="remove" text="Verwijderen"></nldd-icon-button>
		<nldd-icon-button disabled variant="neutral-tinted" icon="remove" text="Verwijderen"></nldd-icon-button>
		<nldd-icon-button disabled variant="danger-tinted" icon="remove" text="Verwijderen"></nldd-icon-button>
	</div>
`;
Disabled.parameters = {
	controls: { disable: true },
};

export const CustomIconSlot = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<nldd-icon-button text="Custom">
			<svg slot="icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
				<circle cx="10" cy="10" r="8"/>
			</svg>
		</nldd-icon-button>
	</div>
`;
CustomIconSlot.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Gebruik de <code>icon</code> slot om een custom SVG icoon te plaatsen in plaats van het <code>icon</code> attribute.',
		},
	},
};
