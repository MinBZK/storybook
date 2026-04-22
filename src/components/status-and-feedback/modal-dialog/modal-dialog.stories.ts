import { html, nothing } from 'lit';
import './modal-dialog.js';
import '../../actions/button/button.js';
import { ICONS } from '../../content/icon/icon.js';

/**
 * De Modal Dialog is een modaal venster met overlay backdrop.
 * Gebruik `nldd-inline-dialog` voor een inline variant zonder overlay.
 *
 * ## Gebruik
 * ```html
 * <nldd-modal-dialog
 *   text="Bevestiging vereist"
 *   supporting-text="Dit kan niet ongedaan worden gemaakt."
 * >
 *   <nldd-button slot="actions" variant="primary" text="Bevestig"></nldd-button>
 *   <nldd-button slot="actions" variant="neutral-tinted" text="Annuleer"></nldd-button>
 * </nldd-modal-dialog>
 * ```
 */
export default {
	title: 'Components/Status & Feedback/Modal Dialog',
	component: 'nldd-modal-dialog',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/status-and-feedback/modal-dialog/modal-dialog.ts',
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
			description: 'Naam van het nldd-icon icoon; afwezig wanneer niet ingesteld',
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
	<nldd-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></nldd-button>
	<nldd-modal-dialog
		variant=${args.variant || nothing}
		icon-name=${args.iconName || nothing}
		text=${args.text}
		supporting-text=${args.supportingText}
	>
		<nldd-button
			slot="actions"
			variant="primary"
			text="Bevestig"
			@click=${(e) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
		<nldd-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
	</nldd-modal-dialog>
`;

export const ZonderIcoon = () => html`
	<nldd-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></nldd-button>
	<nldd-modal-dialog
		text="Bevestiging vereist"
		supporting-text="Weet u zeker dat u door wilt gaan? Dit kan niet ongedaan worden gemaakt."
	>
		<nldd-button
			slot="actions"
			variant="primary"
			text="Bevestig"
			@click=${(e) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
		<nldd-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
	</nldd-modal-dialog>
`;
ZonderIcoon.parameters = { controls: { disable: true } };

export const MetIcoon = () => html`
	<nldd-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></nldd-button>
	<nldd-modal-dialog
		icon-name="check-mark-circle"
		text="Succesvol opgeslagen"
		supporting-text="Uw wijzigingen zijn opgeslagen."
	>
		<nldd-button
			slot="actions"
			variant="primary"
			text="Sluiten"
			@click=${(e) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
	</nldd-modal-dialog>
`;
MetIcoon.parameters = { controls: { disable: true } };

export const Alert = () => html`
	<nldd-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></nldd-button>
	<nldd-modal-dialog
		variant="alert"
		text="Niet opgeslagen"
		supporting-text="Als u doorgaat gaan uw wijzigingen verloren."
	>
		<nldd-button
			slot="actions"
			variant="primary"
			text="Doorgaan"
			@click=${(e) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
		<nldd-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
	</nldd-modal-dialog>
`;
Alert.parameters = { controls: { disable: true } };
