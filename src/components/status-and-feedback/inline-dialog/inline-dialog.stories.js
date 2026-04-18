import { html, nothing } from 'lit';
import './inline-dialog.ts';
import '../../actions/button/button.ts';
import '../../layout/box/box.ts';
import { ICONS } from '../../content/icon/icon.ts';

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
		iconName: {
			control: 'select',
			options: ['', ...ICONS],
			name: 'icon-name',
			description: 'Naam van het nldd-icon icoon; afwezig wanneer niet ingesteld. Overschrijft het variant-icoon.',
		},
		text: {
			control: 'text',
			description: 'Hoofdtekst',
			table: { defaultValue: { summary: '' } },
		},
		supportingText: {
			control: 'text',
			name: 'supporting-text',
			description: 'Ondersteunende tekst onder de heading',
			table: { defaultValue: { summary: '' } },
		},
	},
	args: {
		variant: '',
		iconName: '',
		text: 'Dialog titel',
		supportingText: 'Ondersteunende tekst voor aanvullende context.',
	},
};

export const Standaard = (args) => html`
	<nldd-inline-dialog
		variant=${args.variant || nothing}
		icon-name=${args.iconName || nothing}
		text=${args.text}
		supporting-text=${args.supportingText}
	>
		<nldd-button slot="actions" variant="primary" text="Bevestig"></nldd-button>
		<nldd-button slot="actions" variant="neutral-tinted" text="Annuleer"></nldd-button>
	</nldd-inline-dialog>
`;

export const ZonderIcoon = () => html`
	<nldd-inline-dialog
		text="Bevestiging vereist"
		supporting-text="Weet u zeker dat u door wilt gaan? Dit kan niet ongedaan worden gemaakt."
	>
		<nldd-button slot="actions" variant="primary" text="Bevestig"></nldd-button>
		<nldd-button slot="actions" variant="neutral-tinted" text="Annuleer"></nldd-button>
	</nldd-inline-dialog>
`;
ZonderIcoon.parameters = { controls: { disable: true } };

export const MetIcoon = () => html`
	<nldd-inline-dialog
		icon-name="check-mark-circle"
		text="Succesvol opgeslagen"
		supporting-text="Uw wijzigingen zijn opgeslagen."
	>
		<nldd-button slot="actions" variant="primary" text="Sluiten"></nldd-button>
	</nldd-inline-dialog>
`;
MetIcoon.parameters = { controls: { disable: true } };

export const Alert = () => html`
	<nldd-inline-dialog
		variant="alert"
		text="Niet opgeslagen"
		supporting-text="Als u doorgaat gaan uw wijzigingen verloren."
	>
		<nldd-button slot="actions" variant="primary" text="Doorgaan"></nldd-button>
		<nldd-button slot="actions" variant="neutral-tinted" text="Annuleer"></nldd-button>
	</nldd-inline-dialog>
`;
Alert.parameters = { controls: { disable: true } };

export const LegeToestand = () => html`
	<nldd-box style="height: 400px; display: flex; align-items: center; justify-content: center;">
		<nldd-inline-dialog
			icon-name="inbox"
			text="Geen resultaten"
			supporting-text="Er zijn geen items gevonden die overeenkomen met uw zoekopdracht."
		>
			<nldd-button slot="actions" variant="neutral-tinted" text="Zoekopdracht wissen"></nldd-button>
		</nldd-inline-dialog>
	</nldd-box>
`;
LegeToestand.parameters = { controls: { disable: true } };
