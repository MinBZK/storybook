import { html, nothing } from 'lit';
import './rr-modal-dialog.ts';
import '../../actions/button/rr-button.ts';
import { ICONS } from '../../content/icon/rr-icon.ts';

/**
 * De Modal Dialog is een modaal venster met overlay backdrop.
 * Gebruik `rr-dialog` voor een inline variant zonder overlay.
 *
 * ## Gebruik
 * ```html
 * <rr-modal-dialog
 *   text="Bevestiging vereist"
 *   supporting-text="Dit kan niet ongedaan worden gemaakt."
 * >
 *   <rr-button slot="actions" variant="primary" text="Bevestig"></rr-button>
 *   <rr-button slot="actions" variant="neutral-tinted" text="Annuleer"></rr-button>
 * </rr-modal-dialog>
 * ```
 */
export default {
	title: 'Components/Overlays/Modal Dialog',
	component: 'rr-modal-dialog',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/overlays/modal-dialog/rr-modal-dialog.ts',
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
			description: 'Naam van het rr-icon icoon; afwezig wanneer niet ingesteld',
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
	<rr-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></rr-button>
	<rr-modal-dialog
		variant=${args.variant || nothing}
		icon-name=${args.iconName || nothing}
		text=${args.text}
		supporting-text=${args.supportingText}
	>
		<rr-button
			slot="actions"
			variant="primary"
			text="Bevestig"
			@click=${(e) => e.target.closest('rr-modal-dialog').hide()}
		></rr-button>
		<rr-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e) => e.target.closest('rr-modal-dialog').hide()}
		></rr-button>
	</rr-modal-dialog>
`;

export const ZonderIcoon = () => html`
	<rr-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></rr-button>
	<rr-modal-dialog
		text="Bevestiging vereist"
		supporting-text="Weet u zeker dat u door wilt gaan? Dit kan niet ongedaan worden gemaakt."
	>
		<rr-button
			slot="actions"
			variant="primary"
			text="Bevestig"
			@click=${(e) => e.target.closest('rr-modal-dialog').hide()}
		></rr-button>
		<rr-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e) => e.target.closest('rr-modal-dialog').hide()}
		></rr-button>
	</rr-modal-dialog>
`;
ZonderIcoon.parameters = { controls: { disable: true } };

export const MetIcoon = () => html`
	<rr-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></rr-button>
	<rr-modal-dialog
		icon-name="check-mark-circle"
		text="Succesvol opgeslagen"
		supporting-text="Uw wijzigingen zijn opgeslagen."
	>
		<rr-button
			slot="actions"
			variant="primary"
			text="Sluiten"
			@click=${(e) => e.target.closest('rr-modal-dialog').hide()}
		></rr-button>
	</rr-modal-dialog>
`;
MetIcoon.parameters = { controls: { disable: true } };

export const Alert = () => html`
	<rr-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></rr-button>
	<rr-modal-dialog
		variant="alert"
		text="Niet opgeslagen"
		supporting-text="Als u doorgaat gaan uw wijzigingen verloren."
	>
		<rr-button
			slot="actions"
			variant="primary"
			text="Doorgaan"
			@click=${(e) => e.target.closest('rr-modal-dialog').hide()}
		></rr-button>
		<rr-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e) => e.target.closest('rr-modal-dialog').hide()}
		></rr-button>
	</rr-modal-dialog>
`;
Alert.parameters = { controls: { disable: true } };
