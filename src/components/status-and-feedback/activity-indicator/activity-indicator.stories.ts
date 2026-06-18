import { html } from 'lit';
import './activity-indicator.js';
import '../progress-circle/progress-circle.js';
import '../progress-bar/progress-bar.js';
import '../../actions/button/button.js';

/**
 * Een layout placeholder die de beschikbare ruimte vult en een indeterminate
 * activity indicator centreert. Standaard is dat een eenvoudige, icoon-grote
 * cirkel in `currentColor` (dus de cirkel erft de tekstkleur van de context).
 *
 * Standaard verschijnt de indicator pas na 1000ms (`timing="default"`) zodat
 * korte laad-acties niet onnodig flashen. `timing="instant"` toont hem direct
 * — de fade-in speelt nog steeds. Componenten zoals `nldd-button` gebruiken
 * `instant` voor hun loading-state.
 *
 * Standaard zonder label (`show-text` uit); de tekst voedt wél de accessible
 * name. Een eigen indicator (progress-bar of progress-circle) zet je in de
 * `indicator`-slot.
 *
 * Overlay-modus: zet content in de default slot en de indicator wordt de
 * container eromheen — de spinner (en optionele backdrop) komt erover en de
 * content wordt `inert` (knoppen niet focusbaar of klikbaar) zolang er geladen
 * wordt. Schakel met `complete` (`?complete=${!isLoading}`).
 */
export default {
	title: 'Components/Status & Feedback/Activity Indicator',
	component: 'nldd-activity-indicator',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/status-and-feedback/activity-indicator/activity-indicator.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	args: {
		size: '32',
		text: '',
		showText: false,
		timing: 'default',
		noBackdrop: false,
		complete: false,
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'],
			description: 'Diameter op de icon-schaal. De cirkel (lijn incl.) schaalt mee.',
			table: { defaultValue: { summary: '32' } },
		},
		text: {
			control: 'text',
			description: 'Leeg → vertaalde fallback "Laden". Voedt altijd de accessible name.',
			table: { defaultValue: { summary: 'Laden' } },
		},
		showText: {
			name: 'show-text',
			control: 'boolean',
			description: 'Toon het label onder de cirkel. Standaard verborgen (alleen accessible name).',
			table: { defaultValue: { summary: false } },
		},
		timing: {
			control: 'select',
			options: ['default', 'instant'],
			description: '`default` wacht 1000ms (anti-flash); `instant` toont direct (fade-in speelt nog).',
			table: { defaultValue: { summary: 'default' } },
		},
		noBackdrop: {
			name: 'no-backdrop',
			control: 'boolean',
			description: 'Overlay-modus dimt + blurt de geneste content standaard; zet dit aan om alleen het indicator-paneel te tonen zonder dimmen. Geen effect zonder content.',
			table: { defaultValue: { summary: 'false' } },
		},
		complete: {
			control: 'boolean',
			description: 'Markeer als klaar: verbergt de indicator en heft de inert op de geneste content op. In overlay-modus bind je `?complete=${!isLoading}`.',
			table: { defaultValue: { summary: 'false' } },
		},
	},
};

const Template = ({ size, text, showText, timing, noBackdrop, complete }: Record<string, unknown>) => html`
	<nldd-activity-indicator size=${size as string}
		text=${text as string}
		?show-text=${showText as boolean}
		timing=${timing as string}
		?no-backdrop=${noBackdrop as boolean}
		?complete=${complete as boolean}
		style="width: 360px; border-radius: 12px; overflow: hidden; background: var(--semantics-surfaces-base-background-color); box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);"
	>
		<div style="padding: 20px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
			<p style="margin: 0; font: var(--primitives-font-body-md-medium-tight); color: var(--semantics-content-color);">Voorbeeldcontent</p>
			<p style="margin: 0; font: var(--primitives-font-body-sm-regular-tight); color: var(--semantics-content-secondary-color);">
				De content zit nu IN de activity indicator, geen wrapper-div meer. Tijdens het laden is deze inert: de knop kan niet gefocust of geklikt worden.
			</p>
			<nldd-button text="Knop in de content"></nldd-button>
		</div>
	</nldd-activity-indicator>
`;

export const Default = {
	render: Template,
};

export const WithLabel = {
	name: 'With label',
	render: Template,
	args: { showText: true, text: 'Bezig met opslaan' },
};

export const Sizes = {
	name: 'Sizes',
	render: () => html`
		<div style="display: flex; gap: 32px; align-items: center; height: 120px;">
			<nldd-activity-indicator size="20" timing="instant"></nldd-activity-indicator>
			<nldd-activity-indicator size="28" timing="instant"></nldd-activity-indicator>
			<nldd-activity-indicator size="40" timing="instant"></nldd-activity-indicator>
			<nldd-activity-indicator size="64" timing="instant"></nldd-activity-indicator>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const InheritsColor = {
	name: 'Inherits currentColor',
	render: () => html`
		<div style="display: flex; gap: 32px; align-items: center; height: 120px;">
			<span style="color: var(--semantics-content-accent-color); display: inline-flex;">
				<nldd-activity-indicator size="32" timing="instant"></nldd-activity-indicator>
			</span>
			<span style="color: var(--semantics-content-critical-color); display: inline-flex;">
				<nldd-activity-indicator size="32" timing="instant"></nldd-activity-indicator>
			</span>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const AntiFlashDelay = {
	name: 'Anti-flash delay (timing="default")',
	render: () => html`
		<div style="height: 240px; display: flex;">
			<nldd-activity-indicator show-text text="Laden"></nldd-activity-indicator>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const ProgressBarViaSlot = {
	name: 'Progress bar via slot',
	render: () => html`
		<div style="height: 240px; display: flex;">
			<nldd-activity-indicator timing="instant">
				<nldd-progress-bar slot="indicator" indeterminate text="Uploaden"></nldd-progress-bar>
			</nldd-activity-indicator>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const CustomCircleViaSlot = {
	name: 'Custom progress-circle via slot',
	render: () => html`
		<div style="height: 240px; display: flex;">
			<nldd-activity-indicator timing="instant">
				<nldd-progress-circle slot="indicator" size="64" color="success" indeterminate text="Verwerken"></nldd-progress-circle>
			</nldd-activity-indicator>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

/**
 * In overlay-modus dimt én blurt de indicator de geneste content standaard met
 * een frosted laag in `--context-parent-background-color` (fallback: de base
 * surface) op `1 − disabled-opacity`. De content blijft zichtbaar maar leest als
 * inactief tijdens het laden. Zet `no-backdrop` om alleen het paneel te tonen.
 */
export const Backdrop = {
	name: 'Backdrop over content',
	render: ({ noBackdrop }: Record<string, unknown>) => html`
		<nldd-activity-indicator ?no-backdrop=${noBackdrop as boolean} show-text text="Bezig met verwerken…" timing="instant"
			style="width: 320px; border-radius: 12px; overflow: hidden; background: var(--semantics-surfaces-base-background-color); box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);"
		>
			<div style="padding: 20px; display: flex; flex-direction: column; gap: 8px;">
				<p style="margin: 0; font: var(--primitives-font-body-md-medium-tight); color: var(--semantics-content-color);">Aanvraag indienen</p>
				<p style="margin: 0; font: var(--primitives-font-body-sm-regular-tight); color: var(--semantics-content-secondary-color);">
					Deze gegevens worden verwerkt. De content blijft zichtbaar maar dimt en blurt achter de indicator, zodat duidelijk is dat het proces nog loopt.
				</p>
			</div>
		</nldd-activity-indicator>
	`,
	args: { noBackdrop: false },
	parameters: {
		controls: { include: ['noBackdrop'] },
	},
};
