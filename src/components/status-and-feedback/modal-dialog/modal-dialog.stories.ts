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
		text: {
			control: 'text',
			description: 'Hoofdtekst',
		},
		supportingText: {
			name: 'supporting-text',
			control: 'text',
			description: 'Ondersteunende tekst',
		},
		icon: {
			control: 'select',
			options: ['', ...ICONS],
			description: 'Naam van het nldd-icon icoon; afwezig wanneer niet ingesteld',
		},
	},
	args: {
		variant: '',
		text: 'Dialog titel',
		supportingText: 'Ondersteunende tekst voor aanvullende context.',
		icon: '',
	},
};

const openNext = (e: Record<string, any>) => e.currentTarget.nextElementSibling.show();

export const Standaard = (args: Record<string, any>) => html`
	<nldd-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></nldd-button>
	<nldd-modal-dialog
		variant=${args.variant || nothing}
		text=${args.text}
		supporting-text=${args.supportingText}
		icon=${args.icon || nothing}
	>
		<nldd-button
			slot="actions"
			variant="primary"
			text="Bevestig"
			@click=${(e: any) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
		<nldd-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e: any) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
	</nldd-modal-dialog>
`;

export const ZonderIcoon = {
	render: () => html`
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
			@click=${(e: any) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
		<nldd-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e: any) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
	</nldd-modal-dialog>
`,
	parameters: { controls: { disable: true } },
};

export const MetIcoon = {
	render: () => html`
	<nldd-button
		variant="primary"
		text="Open modal dialog"
		@click=${openNext}
	></nldd-button>
	<nldd-modal-dialog
		icon="check-mark-circle"
		text="Succesvol opgeslagen"
		supporting-text="Uw wijzigingen zijn opgeslagen."
	>
		<nldd-button
			slot="actions"
			variant="primary"
			text="Sluiten"
			@click=${(e: any) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
	</nldd-modal-dialog>
`,
	parameters: { controls: { disable: true } },
};

export const Alert = {
	render: () => html`
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
			@click=${(e: any) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
		<nldd-button
			slot="actions"
			variant="neutral-tinted"
			text="Annuleer"
			@click=${(e: any) => e.target.closest('nldd-modal-dialog').hide()}
		></nldd-button>
	</nldd-modal-dialog>
`,
	parameters: { controls: { disable: true } },
};
