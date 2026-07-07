import { action } from 'storybook/actions';
import { html } from 'lit';
import './token.js';
import '../../actions/menu/menu.js';

/**
 * De Token component is een visuele representatie van data —
 * zoals een persoon in een adresveld of een actieve filterwaarde.
 * Optioneel verwijderbaar of interactief via een contextueel menu.
 *
 * ## Gebruik
 * ```html
 * <nldd-token text="Label"></nldd-token>
 * <nldd-token control="dismiss" text="Verwijderbaar"></nldd-token>
 * <nldd-token control="menu" text="Kies optie"></nldd-token>
 * ```
 */
export default {
	title: 'Components/Content/Token',
	component: 'nldd-token',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/token/token.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		text: {
			control: 'text',
			description: 'Tekst van het token',
		},
		dismissText: {
			name: 'dismiss-text',
			control: 'text',
			description: 'Tekst van de dismiss-knop',
			table: { defaultValue: { summary: 'Verwijder' } },
		},
		control: {
			control: 'select',
			options: ['none', 'dismiss', 'menu'],
			description: 'Control type',
			table: { defaultValue: { summary: 'none' } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		text: 'Token',
		control: 'none',
		disabled: false,
	},
};

const Template = (args: Record<string, any>) => html`
	<nldd-token
		text=${args.text}
		control=${args.control}
		?disabled=${args.disabled}
		@dismiss=${action('dismiss')}
	></nldd-token>
`;

export const Standaard = {
	render: Template,
	args: {},
};


/* ============================================================
   Controls
   ============================================================ */

export const AlleControls = {
	render: () => html`
	<div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
		<nldd-token text="Geen control"></nldd-token>
		<nldd-token control="dismiss" text="Met dismiss"></nldd-token>
		<nldd-token control="menu" text="Met menu"></nldd-token>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Overzicht van alle drie de control-varianten.',
			},
	},
},
};

export const MetMenu = {
	render: () => html`
		<nldd-token control="menu" text="Datum">
			<nldd-menu slot="menu">
				<nldd-menu-item text="Bewerken" @select=${action('select: bewerken')}></nldd-menu-item>
				<nldd-menu-item text="Verwijderen" @select=${action('select: verwijderen')}></nldd-menu-item>
			</nldd-menu>
		</nldd-token>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Een token met een contextueel menu. Klik op de chevron; het menu opent als popover. De menu-items handelen zelf hun `select` af, de token opent, sluit en beheert de focus.',
			},
		},
	},
};


/* ============================================================
   Toestanden
   ============================================================ */

export const Uitgeschakeld = {
	render: () => html`
	<div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
		<nldd-token disabled text="Geen control"></nldd-token>
		<nldd-token control="dismiss" disabled text="Met dismiss"></nldd-token>
		<nldd-token control="menu" disabled text="Met menu"></nldd-token>
	</div>
`,
	parameters: { controls: { disable: true } },
};


/* ============================================================
   Gebruik
   ============================================================ */

export const FilterVoorbeeld = {
	render: () => {
	const handleDismiss = (e: Record<string, any>) => {
		(e.target).closest('nldd-token')?.remove();
	};

	return html`
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<p style="margin: 0; font: var(--primitives-font-body-md-regular-snug); color: var(--semantics-content-color);">
				Actieve tokens — klik op × om een waarde te verwijderen:
			</p>
			<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
				<nldd-token control="dismiss" text="Status: Actief" @dismiss=${handleDismiss}></nldd-token>
				<nldd-token control="dismiss" text="Type: Document" @dismiss=${handleDismiss}></nldd-token>
				<nldd-token control="dismiss" text="Datum: Vandaag" @dismiss=${handleDismiss}></nldd-token>
				<nldd-token control="dismiss" text="Auteur: Jan de Vries" @dismiss=${handleDismiss}></nldd-token>
			</div>
		</div>
	`;
},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Voorbeeld van verwijderbare tokens die een stuk data representeren.',
			},
	},
},
};
