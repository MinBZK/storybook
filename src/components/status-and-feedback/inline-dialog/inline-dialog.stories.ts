import { html, nothing } from 'lit';
import './inline-dialog.js';
import '../../actions/button/button.js';
import '../../layout/box/box.js';
import { ICONS } from '../../content/icon/icon.js';

/**
 * De Dialog is een inline statuscomponent voor lege toestanden, bevestigingen en feedback.
 * Hij vult zijn container en heeft geen overlay of backdrop.
 * Gebruik `nldd-modal-dialog` voor een modaal venster met backdrop.
 *
 * ## Gebruik
 * ```html
 * <nldd-inline-dialog
 *   text="Bevestiging vereist"
 *   supporting-text="Dit kan niet ongedaan worden gemaakt."
 * >
 *   <nldd-button slot="actions" variant="primary" text="Bevestig"></nldd-button>
 *   <nldd-button slot="actions" variant="neutral-tinted" text="Annuleer"></nldd-button>
 * </nldd-inline-dialog>
 * ```
 */
export default {
	title: 'Components/Status & Feedback/Inline Dialog',
	component: 'nldd-inline-dialog',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/status-and-feedback/inline-dialog/inline-dialog.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'stable' },
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['', 'alert', 'success'],
			description: 'Semantische variant — dwingt een icoon en kleur af',
			table: { defaultValue: { summary: '' } },
		},
		text: {
			control: 'text',
			description: 'Hoofdtekst',
			table: { defaultValue: { summary: '' } },
		},
		supportingText: {
			name: 'supporting-text',
			control: 'text',
			description: 'Ondersteunende tekst onder de heading',
			table: { defaultValue: { summary: '' } },
		},
		icon: {
			control: 'select',
			options: ['', ...ICONS],
			description: 'Naam van het nldd-icon icoon; afwezig wanneer niet ingesteld. Overschrijft het variant-icoon.',
		},
		iconColor: {
			name: 'icon-color',
			control: 'select',
			options: ['', 'secondary', 'accent', 'critical', 'warning', 'success'],
			description: 'Overschrijft de standaard icoonkleur (en die van een variant).',
			table: { defaultValue: { summary: '' } },
		},
	},
	args: {
		variant: '',
		text: 'Dialog titel',
		supportingText: 'Ondersteunende tekst voor aanvullende context.',
		icon: '',
		iconColor: '',
	},
};

export const Standaard = (args: Record<string, any>) => html`
	<nldd-inline-dialog
		variant=${args.variant || nothing}
		text=${args.text}
		supporting-text=${args.supportingText}
		icon=${args.icon || nothing}
		icon-color=${args.iconColor || nothing}
	>
		<nldd-button slot="actions" variant="primary" text="Bevestig"></nldd-button>
		<nldd-button slot="actions" variant="neutral-tinted" text="Annuleer"></nldd-button>
	</nldd-inline-dialog>
`;

export const ZonderIcoon = {
	render: () => html`
	<nldd-inline-dialog
		text="Bevestiging vereist"
		supporting-text="Weet u zeker dat u door wilt gaan? Dit kan niet ongedaan worden gemaakt."
	>
		<nldd-button slot="actions" variant="primary" text="Bevestig"></nldd-button>
		<nldd-button slot="actions" variant="neutral-tinted" text="Annuleer"></nldd-button>
	</nldd-inline-dialog>
`,
	parameters: { controls: { disable: true } },
};

export const MetIcoon = {
	render: () => html`
	<nldd-inline-dialog
		icon="gear"
		text="Instellingen vereist"
		supporting-text="Configureer eerst uw voorkeuren voordat u verder gaat."
	>
		<nldd-button slot="actions" variant="primary" text="Naar instellingen"></nldd-button>
	</nldd-inline-dialog>
`,
	parameters: { controls: { disable: true } },
};

export const IcoonKleur = {
	render: () => html`
	<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
		${(['secondary', 'accent', 'critical', 'warning', 'success'] as const).map(color => html`
			<nldd-inline-dialog
				icon="info-circle"
				icon-color=${color}
				text=${color.charAt(0).toUpperCase() + color.slice(1)}
				supporting-text="Icon in de ${color} kleur."
			></nldd-inline-dialog>
		`)}
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Gebruik `icon-color` om de icoonkleur te zetten naar één van de semantic content kleuren. Werkt ook met `variant="alert"` — `icon-color` overrulet dan de variant-kleur.',
			},
		},
	},
};

export const Alert = {
	render: () => html`
	<nldd-inline-dialog
		variant="alert"
		text="Niet opgeslagen"
		supporting-text="Als u doorgaat gaan uw wijzigingen verloren."
	>
		<nldd-button slot="actions" variant="primary" text="Doorgaan"></nldd-button>
		<nldd-button slot="actions" variant="neutral-tinted" text="Annuleer"></nldd-button>
	</nldd-inline-dialog>
`,
	parameters: { controls: { disable: true } },
};

export const Success = {
	render: () => html`
	<nldd-inline-dialog
		variant="success"
		text="Succesvol opgeslagen"
		supporting-text="Uw wijzigingen zijn vastgelegd."
	>
		<nldd-button slot="actions" variant="primary" text="Sluiten"></nldd-button>
	</nldd-inline-dialog>
`,
	parameters: { controls: { disable: true } },
};

export const LegeToestand = {
	render: () => html`
	<nldd-box style="height: 400px; display: flex; align-items: center; justify-content: center;">
		<nldd-inline-dialog
			icon="inbox"
			text="Geen resultaten"
			supporting-text="Er zijn geen items gevonden die overeenkomen met uw zoekopdracht."
		>
			<nldd-button slot="actions" variant="neutral-tinted" text="Zoekopdracht wissen"></nldd-button>
		</nldd-inline-dialog>
	</nldd-box>
`,
	parameters: { controls: { disable: true } },
};
