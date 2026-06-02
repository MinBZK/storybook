import { html } from 'lit';
import './activity-indicator.js';
import '../progress-circle/progress-circle.js';
import '../progress-bar/progress-bar.js';

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
 * name. Zet eigen content in de slot (een progress-bar of progress-circle) om
 * de indicator volledig te vervangen.
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
	},
};

const Template = ({ size, text, showText, timing }: Record<string, unknown>) => html`
	<div style="height: 240px; display: flex;">
		<nldd-activity-indicator size=${size as string}
			text=${text as string}
			?show-text=${showText as boolean}
			timing=${timing as string}
		></nldd-activity-indicator>
	</div>
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
				<nldd-progress-bar indeterminate text="Uploaden"></nldd-progress-bar>
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
				<nldd-progress-circle size="64" color="success" indeterminate text="Verwerken"></nldd-progress-circle>
			</nldd-activity-indicator>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};
