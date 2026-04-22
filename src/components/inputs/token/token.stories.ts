import { action } from 'storybook/actions';
import { html } from 'lit';
import './token.js';

/**
 * De Token component is een visuele representatie van data —
 * zoals een persoon in een adresveld of een actieve filterwaarde.
 * Optioneel verwijderbaar of interactief via een contextueel menu.
 *
 * ## Gebruik
 * ```html
 * <nldd-token>Label</nldd-token>
 * <nldd-token control="dismiss">Verwijderbaar</nldd-token>
 * <nldd-token control="menu">Kies optie</nldd-token>
 * ```
 */
export default {
	title: 'Components/Inputs/Token',
	component: 'nldd-token',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/token/token.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		control: {
			control: 'select',
			options: ['none', 'dismiss', 'menu'],
			description: 'Control type',
			table: { defaultValue: { summary: 'none' } },
		},
		open: {
			control: 'boolean',
			description: 'Of de menu open is (alleen bij control="menu")',
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: { defaultValue: { summary: false } },
		},
		dismissText: {
			control: 'text',
			name: 'dismiss-text',
			description: 'Tekst van de dismiss-knop',
			table: { defaultValue: { summary: 'Verwijder' } },
		},
		label: {
			control: 'text',
			description: 'Tekst van het token',
		},
	},
	args: {
		control: 'none',
		open: false,
		disabled: false,
		label: 'Token',
	},
};

const Template = (args: Record<string, any>) => html`
	<nldd-token
		control=${args.control}
		?open=${args.open}
		?disabled=${args.disabled}
		@dismiss=${action('dismiss')}
		@toggle=${action('toggle')}
	>${args.label}</nldd-token>
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
		<nldd-token>Geen control</nldd-token>
		<nldd-token control="dismiss">Met dismiss</nldd-token>
		<nldd-token control="menu">Met menu</nldd-token>
		<nldd-token control="menu" open>Menu open</nldd-token>
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

export const MetDismiss = {
	render: Template,
	args: { control: 'dismiss', label: 'Status: Actief' },
	parameters: {
		docs: {
			description: {
				story: 'Gebruik `control="dismiss"` voor verwijderbare tokens. De dismiss-knop dispatcht een `dismiss` event waarmee de consumer de token kan verwijderen.',
			},
	},
},
};

export const MetMenu = {
	render: Template,
	args: { control: 'menu', label: 'Datum' },
	parameters: {
		docs: {
			description: {
				story: 'Gebruik `control="menu"` voor tokens die een contextueel menu openen over de gerepresenteerde data (bijv. kopieer e-mailadres, bewerk, verwijder). Dispatcht een `toggle` event met `{ open: boolean }`.',
			},
	},
},
};

export const MenuOpen = {
	render: Template,
	args: { control: 'menu', open: true, label: 'Datum' },
};


/* ============================================================
   Toestanden
   ============================================================ */

export const Uitgeschakeld = {
	render: () => html`
	<div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
		<nldd-token disabled>Geen control</nldd-token>
		<nldd-token control="dismiss" disabled>Met dismiss</nldd-token>
		<nldd-token control="menu" disabled>Met menu</nldd-token>
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
				<nldd-token control="dismiss" @dismiss=${handleDismiss}>Status: Actief</nldd-token>
				<nldd-token control="dismiss" @dismiss=${handleDismiss}>Type: Document</nldd-token>
				<nldd-token control="dismiss" @dismiss=${handleDismiss}>Datum: Vandaag</nldd-token>
				<nldd-token control="dismiss" @dismiss=${handleDismiss}>Auteur: Jan de Vries</nldd-token>
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

export const MenuVoorbeeld = {
	render: () => html`
	<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
		<nldd-token control="menu"
			@toggle=${action('toggle-periode')}
		>Periode: Laatste maand</nldd-token>
		<nldd-token control="menu" open
			@toggle=${action('toggle-status')}
		>Status: Actief</nldd-token>
		<nldd-token control="menu"
			@toggle=${action('toggle-afdeling')}
		>Afdeling: Juridisch</nldd-token>
	</div>
`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Voorbeeld van tokens met een contextueel menu. Klik op het token om acties te tonen over de gerepresenteerde data. De `open` toestand wordt door de consumer beheerd.',
			},
	},
},
};
