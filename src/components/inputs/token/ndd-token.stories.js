import { action } from 'storybook/actions';
import { html } from 'lit';
import './ndd-token.js';

/**
 * De Token component is een visuele representatie van data —
 * zoals een persoon in een adresveld of een actieve filterwaarde.
 * Optioneel verwijderbaar of interactief via een contextueel menu.
 *
 * ## Gebruik
 * ```html
 * <ndd-token>Label</ndd-token>
 * <ndd-token control="dismiss">Verwijderbaar</ndd-token>
 * <ndd-token control="menu">Kies optie</ndd-token>
 * ```
 */
export default {
	title: 'Components/Inputs/Token',
	component: 'ndd-token',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/inputs/token/ndd-token.ts',
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
		dismissLabel: {
			control: 'text',
			name: 'dismiss-label',
			description: 'Toegankelijk label voor de dismiss knop',
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

const Template = (args) => html`
	<ndd-token
		control=${args.control}
		?open=${args.open}
		?disabled=${args.disabled}
		@dismiss=${action('dismiss')}
		@toggle=${action('toggle')}
	>${args.label}</ndd-token>
`;

export const Standaard = Template.bind({});
Standaard.args = {};


/* ============================================================
   Controls
   ============================================================ */

export const AlleControls = () => html`
	<div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
		<ndd-token>Geen control</ndd-token>
		<ndd-token control="dismiss">Met dismiss</ndd-token>
		<ndd-token control="menu">Met menu</ndd-token>
		<ndd-token control="menu" open>Menu open</ndd-token>
	</div>
`;
AlleControls.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Overzicht van alle drie de control-varianten.',
		},
	},
};

export const MetDismiss = Template.bind({});
MetDismiss.args = { control: 'dismiss', label: 'Status: Actief' };
MetDismiss.parameters = {
	docs: {
		description: {
			story: 'Gebruik `control="dismiss"` voor verwijderbare tokens. De dismiss-knop dispatcht een `dismiss` event waarmee de consumer de token kan verwijderen.',
		},
	},
};

export const MetMenu = Template.bind({});
MetMenu.args = { control: 'menu', label: 'Datum' };
MetMenu.parameters = {
	docs: {
		description: {
			story: 'Gebruik `control="menu"` voor tokens die een contextueel menu openen over de gerepresenteerde data (bijv. kopieer e-mailadres, bewerk, verwijder). Dispatcht een `toggle` event met `{ open: boolean }`.',
		},
	},
};

export const MenuOpen = Template.bind({});
MenuOpen.args = { control: 'menu', open: true, label: 'Datum' };


/* ============================================================
   Toestanden
   ============================================================ */

export const Uitgeschakeld = () => html`
	<div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
		<ndd-token disabled>Geen control</ndd-token>
		<ndd-token control="dismiss" disabled>Met dismiss</ndd-token>
		<ndd-token control="menu" disabled>Met menu</ndd-token>
	</div>
`;
Uitgeschakeld.parameters = { controls: { disable: true } };


/* ============================================================
   Gebruik
   ============================================================ */

export const FilterVoorbeeld = () => {
	const handleDismiss = (e) => {
		(e.target).closest('ndd-token')?.remove();
	};

	return html`
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<p style="margin: 0; font: var(--primitives-font-body-md-regular-snug); color: var(--semantics-content-color);">
				Actieve tokens — klik op × om een waarde te verwijderen:
			</p>
			<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
				<ndd-token control="dismiss" @dismiss=${handleDismiss}>Status: Actief</ndd-token>
				<ndd-token control="dismiss" @dismiss=${handleDismiss}>Type: Document</ndd-token>
				<ndd-token control="dismiss" @dismiss=${handleDismiss}>Datum: Vandaag</ndd-token>
				<ndd-token control="dismiss" @dismiss=${handleDismiss}>Auteur: Jan de Vries</ndd-token>
			</div>
		</div>
	`;
};
FilterVoorbeeld.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Voorbeeld van verwijderbare tokens die een stuk data representeren.',
		},
	},
};

export const MenuVoorbeeld = () => html`
	<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
		<ndd-token control="menu"
			@toggle=${action('toggle-periode')}
		>Periode: Laatste maand</ndd-token>
		<ndd-token control="menu" open
			@toggle=${action('toggle-status')}
		>Status: Actief</ndd-token>
		<ndd-token control="menu"
			@toggle=${action('toggle-afdeling')}
		>Afdeling: Juridisch</ndd-token>
	</div>
`;
MenuVoorbeeld.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Voorbeeld van tokens met een contextueel menu. Klik op het token om acties te tonen over de gerepresenteerde data. De `open` toestand wordt door de consumer beheerd.',
		},
	},
};
