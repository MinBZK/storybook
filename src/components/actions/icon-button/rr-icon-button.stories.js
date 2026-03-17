import { html } from 'lit';
import './rr-icon-button.ts';
import { ICONS } from './../../content/icon/rr-icon.ts';

/**
 * De Icon Button component is een vierkante knop voor icoon-only acties.
 *
 * ## Gebruik
 * ```html
 * <rr-icon-button>
 *   <rr-icon name="dismiss"></rr-icon>
 *   Annuleer
 * </rr-icon-button>
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
			description: 'Icoon dat wordt weergegeven — als rr-icon in de knop geplaatst',
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
		isExpandable: {
			control: 'boolean',
			name: 'is-expandable',
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
		isExpandable: false,
		type: 'button',
		disabled: false,
	},
};

const Template = ({ variant, size, icon, text, accessibleLabel, isExpandable, type, disabled }) => html`
	<rr-icon-button
		variant=${variant}
		size=${size}
		?is-expandable=${isExpandable}
		type=${type}
		?disabled=${disabled}
		accessible-label=${accessibleLabel || ''}
	>
		<rr-icon name=${icon}></rr-icon>
		${text}
	</rr-icon-button>
`;

export const Default = Template.bind({});
Default.args = {
	icon: 'dismiss',
	text: 'Annuleer',
};

export const RoleBased = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-icon-button variant="primary">
			<rr-icon name="add"></rr-icon>
			Voeg toe
		</rr-icon-button>
		<rr-icon-button variant="secondary">
			<rr-icon name="add"></rr-icon>
			Voeg toe
		</rr-icon-button>
		<rr-icon-button variant="destructive">
			<rr-icon name="delete"></rr-icon>
			Verwijder
		</rr-icon-button>
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
		<rr-icon-button variant="accent-filled">
			<rr-icon name="add"></rr-icon>
			Voeg toe
		</rr-icon-button>
		<rr-icon-button variant="accent-outlined">
			<rr-icon name="add"></rr-icon>
			Voeg toe
		</rr-icon-button>
		<rr-icon-button variant="accent-transparent">
			<rr-icon name="add"></rr-icon>
			Voeg toe
		</rr-icon-button>
		<rr-icon-button variant="neutral-tinted">
			<rr-icon name="add"></rr-icon>
			Voeg toe
		</rr-icon-button>
		<rr-icon-button variant="neutral-transparent">
			<rr-icon name="add"></rr-icon>
			Voeg toe
		</rr-icon-button>
		<rr-icon-button variant="danger-tinted">
			<rr-icon name="delete"></rr-icon>
			Verwijder
		</rr-icon-button>
	</div>
`;
AppearanceBased.parameters = {
	controls: { disable: true },
};

export const Sizes = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-icon-button size="lg">
			<rr-icon name="dismiss"></rr-icon>
			Annuleer
		</rr-icon-button>
		<rr-icon-button size="md">
			<rr-icon name="dismiss"></rr-icon>
			Annuleer
		</rr-icon-button>
		<rr-icon-button size="sm">
			<rr-icon name="dismiss"></rr-icon>
			Annuleer
		</rr-icon-button>
		<rr-icon-button size="xs">
			<rr-icon name="dismiss"></rr-icon>
			Annuleer
		</rr-icon-button>
	</div>
`;
Sizes.parameters = {
	controls: { disable: true },
};

export const Large = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-icon-button size="lg">
			<rr-icon name="download"></rr-icon>
			Download
		</rr-icon-button>
		<rr-icon-button size="lg">
			<rr-icon name="global-settings"></rr-icon>
			Instellingen
		</rr-icon-button>
		<rr-icon-button size="lg">
			<rr-icon name="search"></rr-icon>
			Zoeken
		</rr-icon-button>
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
		<rr-icon-button accessible-label="Toon wachtwoord">
			<rr-icon name="eye"></rr-icon>
			Toon
		</rr-icon-button>
		<rr-icon-button accessible-label="Verberg wachtwoord">
			<rr-icon name="eye-slash"></rr-icon>
			Verberg
		</rr-icon-button>
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
		<rr-icon-button is-expandable size="lg">
			<rr-icon name="global-settings"></rr-icon>
			Instellingen
		</rr-icon-button>
		<rr-icon-button is-expandable size="md">
			<rr-icon name="global-settings"></rr-icon>
			Instellingen
		</rr-icon-button>
		<rr-icon-button is-expandable size="sm">
			<rr-icon name="global-settings"></rr-icon>
			Instellingen
		</rr-icon-button>
		<rr-icon-button is-expandable size="xs">
			<rr-icon name="global-settings"></rr-icon>
			Instellingen
		</rr-icon-button>
	</div>
`;
WithDisclosureIcon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Icon button die een menu of popover opent. Gebruik de <code>is-expandable</code> attribute om aan te geven dat deze button een menu of popover toont.',
		},
	},
};

export const Disabled = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-icon-button disabled variant="accent-filled">
			<rr-icon name="remove"></rr-icon>
			Verwijderen
		</rr-icon-button>
		<rr-icon-button disabled variant="accent-outlined">
			<rr-icon name="remove"></rr-icon>
			Verwijderen
		</rr-icon-button>
		<rr-icon-button disabled variant="neutral-tinted">
			<rr-icon name="remove"></rr-icon>
			Verwijderen
		</rr-icon-button>
		<rr-icon-button disabled variant="danger-tinted">
			<rr-icon name="remove"></rr-icon>
			Verwijderen
		</rr-icon-button>
	</div>
`;
Disabled.parameters = {
	controls: { disable: true },
};
