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
			options: ['', 'alert'],
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
	},
	args: {
		variant: '',
		text: 'Dialog titel',
		supportingText: 'Ondersteunende tekst voor aanvullende context.',
		icon: '',
	},
};

export const Standaard = (args: Record<string, any>) => html`
	<nldd-inline-dialog
		variant=${args.variant || nothing}
		text=${args.text}
		supporting-text=${args.supportingText}
		icon=${args.icon || nothing}
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
		icon="check-mark-circle"
		text="Succesvol opgeslagen"
		supporting-text="Uw wijzigingen zijn opgeslagen."
	>
		<nldd-button slot="actions" variant="primary" text="Sluiten"></nldd-button>
	</nldd-inline-dialog>
`,
	parameters: { controls: { disable: true } },
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
