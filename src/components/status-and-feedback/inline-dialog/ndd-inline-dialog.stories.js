import { html, nothing } from 'lit';
import './ndd-inline-dialog.ts';
import '../../actions/button/ndd-button.ts';
import '../../layout/box/ndd-box.ts';
import { ICONS } from '../../content/icon/ndd-icon.ts';

/**
 * De Dialog is een inline statuscomponent voor lege toestanden, bevestigingen en feedback.
 * Hij vult zijn container en heeft geen overlay of backdrop.
 * Gebruik `ndd-modal-dialog` voor een modaal venster met backdrop.
 *
 * ## Gebruik
 * ```html
 * <ndd-inline-dialog
 *   text="Bevestiging vereist"
 *   supporting-text="Dit kan niet ongedaan worden gemaakt."
 * >
 *   <ndd-button slot="actions" variant="primary" text="Bevestig"></ndd-button>
 *   <ndd-button slot="actions" variant="neutral-tinted" text="Annuleer"></ndd-button>
 * </ndd-inline-dialog>
 * ```
 */
export default {
	title: 'Components/Status and Feedback/Inline Dialog',
	component: 'ndd-inline-dialog',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/status-and-feedback/inline-dialog/ndd-inline-dialog.ts',
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
			description: 'Naam van het ndd-icon icoon; afwezig wanneer niet ingesteld. Overschrijft het variant-icoon.',
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
	<ndd-inline-dialog
		variant=${args.variant || nothing}
		icon-name=${args.iconName || nothing}
		text=${args.text}
		supporting-text=${args.supportingText}
	>
		<ndd-button slot="actions" variant="primary" text="Bevestig"></ndd-button>
		<ndd-button slot="actions" variant="neutral-tinted" text="Annuleer"></ndd-button>
	</ndd-inline-dialog>
`;

export const ZonderIcoon = () => html`
	<ndd-inline-dialog
		text="Bevestiging vereist"
		supporting-text="Weet u zeker dat u door wilt gaan? Dit kan niet ongedaan worden gemaakt."
	>
		<ndd-button slot="actions" variant="primary" text="Bevestig"></ndd-button>
		<ndd-button slot="actions" variant="neutral-tinted" text="Annuleer"></ndd-button>
	</ndd-inline-dialog>
`;
ZonderIcoon.parameters = { controls: { disable: true } };

export const MetIcoon = () => html`
	<ndd-inline-dialog
		icon-name="check-mark-circle"
		text="Succesvol opgeslagen"
		supporting-text="Uw wijzigingen zijn opgeslagen."
	>
		<ndd-button slot="actions" variant="primary" text="Sluiten"></ndd-button>
	</ndd-inline-dialog>
`;
MetIcoon.parameters = { controls: { disable: true } };

export const Alert = () => html`
	<ndd-inline-dialog
		variant="alert"
		text="Niet opgeslagen"
		supporting-text="Als u doorgaat gaan uw wijzigingen verloren."
	>
		<ndd-button slot="actions" variant="primary" text="Doorgaan"></ndd-button>
		<ndd-button slot="actions" variant="neutral-tinted" text="Annuleer"></ndd-button>
	</ndd-inline-dialog>
`;
Alert.parameters = { controls: { disable: true } };

export const LegeToestand = () => html`
	<ndd-box style="height: 400px; display: flex; align-items: center; justify-content: center;">
		<ndd-inline-dialog
			icon-name="inbox"
			text="Geen resultaten"
			supporting-text="Er zijn geen items gevonden die overeenkomen met uw zoekopdracht."
		>
			<ndd-button slot="actions" variant="neutral-tinted" text="Zoekopdracht wissen"></ndd-button>
		</ndd-inline-dialog>
	</ndd-box>
`;
LegeToestand.parameters = { controls: { disable: true } };
