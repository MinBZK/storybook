import { html, nothing } from 'lit';
import './progress-circle.ts';

const SEMANTIC_COLORS = ['neutral', 'accent', 'success', 'warning', 'critical'] as const;

const RIJKSLEUREN = [
	'coolgray',
	'lintblauw', 'donkerblauw', 'hemelblauw', 'lichtblauw',
	'paars', 'violet',
	'robijnrood', 'roze', 'rood', 'oranje',
	'donkergeel', 'geel',
	'donkerbruin', 'bruin',
	'donkergroen', 'groen', 'mosgroen', 'mintgroen',
] as const;

const ALL_COLORS = [...SEMANTIC_COLORS, ...RIJKSLEUREN];

/**
 * Een circulaire progress indicator met dezelfde mogelijkheden als de
 * progress-bar: single-value of multi-segment, progress en distribution
 * modes, 24 kleur-varianten, indeterminate, en transitions tussen
 * determinate/indeterminate. Label staat onder de cirkel.
 */
export default {
	title: 'Components/Status & Feedback/Progress circle',
	component: 'nldd-progress-circle',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/status-and-feedback/progress-circle/progress-circle.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	argTypes: {
		mode: {
			control: 'select',
			options: ['progress', 'distribution'],
			description: 'Semantiek voor ARIA en de gap tussen segmenten',
			table: { defaultValue: { summary: 'progress' } },
		},
		color: {
			control: 'select',
			options: ALL_COLORS,
			description: 'Kleur van het single-segment',
			table: { defaultValue: { summary: 'accent' } },
		},
		size: {
			control: 'select',
			options: ['16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'],
			description: 'Diameter in px (zelfde set als nldd-icon)',
			table: { defaultValue: { summary: '32' } },
		},
		max: {
			control: { type: 'number', min: 1 },
			table: { defaultValue: { summary: 100 } },
		},
		value: {
			control: { type: 'number', min: 0 },
		},
		text: {
			control: 'text',
			description: 'Label onder de cirkel',
		},
		valueFormat: {
			name: 'value-format',
			control: 'select',
			options: ['percentage', 'absolute', 'fraction', 'none'],
			description: 'Format voor de waarde in de tooltip',
			table: { defaultValue: { summary: 'percentage' } },
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Volledige override van aria-valuetext en tooltip',
		},
		indeterminate: {
			control: 'boolean',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		mode: 'progress',
		color: 'accent',
		size: '32',
		max: 100,
		value: 60,
		text: 'Bestanden uploaden',
		valueFormat: 'percentage',
		accessibleLabel: '',
		indeterminate: false,
	},
};

const Template = (args: Record<string, any>) => html`
	<nldd-progress-circle
		mode=${args.mode}
		color=${args.color}
		size=${args.size}
		max=${args.max}
		value=${args.value}
		text=${args.text || nothing}
		value-format=${args.valueFormat}
		accessible-label=${args.accessibleLabel || nothing}
		?indeterminate=${args.indeterminate}
	></nldd-progress-circle>
`;

export const Standaard = {
	render: Template,
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; gap: 32px; align-items: center;">
			<nldd-progress-circle size="24" value="60" text="24"></nldd-progress-circle>
			<nldd-progress-circle size="32" value="60" text="32"></nldd-progress-circle>
			<nldd-progress-circle size="48" value="60" text="48"></nldd-progress-circle>
			<nldd-progress-circle size="56" value="60" text="56"></nldd-progress-circle>
			<nldd-progress-circle size="80" value="60" text="80"></nldd-progress-circle>
			<nldd-progress-circle size="96" value="60" text="96"></nldd-progress-circle>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const Colors = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
			${ALL_COLORS.map(c => html`
				<nldd-progress-circle color=${c} value="65" text=${c} size="56"></nldd-progress-circle>
			`)}
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const MultiSegmentProgress = {
	render: () => html`
		<nldd-progress-circle mode="progress" size="80" max="100" text="Verwerking">
			<nldd-progress-circle-segment value="40" color="success" name="Geüpload"></nldd-progress-circle-segment>
			<nldd-progress-circle-segment value="30" color="accent" name="Verwerken"></nldd-progress-circle-segment>
		</nldd-progress-circle>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'In `progress` mode tellen segmenten op naar `max`. De resterende ruimte blijft het lege track-deel. De tooltip combineert alle segmenten plus de totale voortgang.',
			},
		},
	},
};

export const Distribution = {
	render: () => html`
		<nldd-progress-circle mode="distribution" size="80" max="500" text="Opslag (500 GB)">
			<nldd-progress-circle-segment value="200" color="hemelblauw" name="Foto's"></nldd-progress-circle-segment>
			<nldd-progress-circle-segment value="100" color="oranje" name="Video's"></nldd-progress-circle-segment>
			<nldd-progress-circle-segment value="50" color="paars" name="Documenten"></nldd-progress-circle-segment>
			<nldd-progress-circle-segment value="150" color="coolgray" name="Vrij"></nldd-progress-circle-segment>
		</nldd-progress-circle>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'In `distribution` mode vullen de segmenten de hele cirkel. Gaps tussen segmenten zijn 2 graden. Tooltip toont alle categorieën met percentages.',
			},
		},
	},
};

export const Indeterminate = {
	render: () => html`
		<nldd-progress-circle indeterminate color="accent" text="Bezig met laden"></nldd-progress-circle>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Material-stijl: elastische boog draait rond. Bij `prefers-reduced-motion` wordt de animatie vervangen door een rustige pulse.',
			},
		},
	},
};
