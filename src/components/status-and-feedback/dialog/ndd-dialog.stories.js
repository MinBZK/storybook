import { html, nothing } from 'lit';
import './ndd-dialog.ts';
import '../../actions/button/ndd-button.ts';
import { ICONS } from '../../content/icon/ndd-icon.ts';

/**
 * De Modal Dialog is een modaal venster met overlay backdrop.
 * Gebruik `ndd-inline-dialog` voor een inline variant zonder overlay.
 *
 * ## Gebruik
 * ```html
 * <ndd-dialog
 *   text="Bevestiging vereist"
 *   supporting-text="Dit kan niet ongedaan worden gemaakt."
 * >
 *   <ndd-button slot="actions" variant="primary" text="Bevestig"></ndd-button>
 *   <ndd-button slot="actions" variant="neutral-tinted" text="Annuleer"></ndd-button>
 * </ndd-dialog>
 * ```
 */
export default {
	title: 'Components/Status and Feedback/Dialog',
	component: 'ndd-dialog',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/status-and-feedback/dialog/ndd-dialog.ts',
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
			description: 'Naam van het ndd-icon icoon; afwezig wanneer niet ingesteld',
		},
		text: {
			control: 'text',
			description: 'Hoofdtekst',
		},
		supportingText: {
			control: 'text',
			name: 'supporting-text',
			description: 'Ondersteunende tekst',
		},
	},
	args: {
		variant: '',
		iconName: '',
		text: 'Dialog titel',
		supportingText: 'Ondersteunende tekst voor aanvullende context.',
	},
};

const openNext = (e) => e.currentTarget.nextElementSibling.show();

export const Standaard = (args) => html`
	<ndd-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></ndd-button>
	<ndd-dialog
		variant=${args.variant || nothing}
		icon-name=${args.iconName || nothing}
		text=${args.text}
		supporting-text=${args.supportingText}
	>
		<ndd-button
			slot="actions"
			variant="primary"
			text="Bevestig"
			@click=${(e) => e.target.closest('ndd-dialog').hide()}
		></ndd-button>
		<ndd-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e) => e.target.closest('ndd-dialog').hide()}
		></ndd-button>
	</ndd-dialog>
`;

export const ZonderIcoon = () => html`
	<ndd-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></ndd-button>
	<ndd-dialog
		text="Bevestiging vereist"
		supporting-text="Weet u zeker dat u door wilt gaan? Dit kan niet ongedaan worden gemaakt."
	>
		<ndd-button
			slot="actions"
			variant="primary"
			text="Bevestig"
			@click=${(e) => e.target.closest('ndd-dialog').hide()}
		></ndd-button>
		<ndd-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e) => e.target.closest('ndd-dialog').hide()}
		></ndd-button>
	</ndd-dialog>
`;
ZonderIcoon.parameters = { controls: { disable: true } };

export const MetIcoon = () => html`
	<ndd-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></ndd-button>
	<ndd-dialog
		icon-name="check-mark-circle"
		text="Succesvol opgeslagen"
		supporting-text="Uw wijzigingen zijn opgeslagen."
	>
		<ndd-button
			slot="actions"
			variant="primary"
			text="Sluiten"
			@click=${(e) => e.target.closest('ndd-dialog').hide()}
		></ndd-button>
	</ndd-dialog>
`;
MetIcoon.parameters = { controls: { disable: true } };

export const Alert = () => html`
	<ndd-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></ndd-button>
	<ndd-dialog
		variant="alert"
		text="Niet opgeslagen"
		supporting-text="Als u doorgaat gaan uw wijzigingen verloren."
	>
		<ndd-button
			slot="actions"
			variant="primary"
			text="Doorgaan"
			@click=${(e) => e.target.closest('ndd-dialog').hide()}
		></ndd-button>
		<ndd-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e) => e.target.closest('ndd-dialog').hide()}
		></ndd-button>
	</ndd-dialog>
`;
Alert.parameters = { controls: { disable: true } };
