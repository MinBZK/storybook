import { html, nothing } from 'lit';
import './progress-bar.ts';

const SEMANTIC_VARIANTS = ['neutral', 'accent', 'success', 'warning', 'critical'] as const;

const RIJKSLEUREN = [
	'coolgray',
	'lintblauw', 'donkerblauw', 'hemelblauw', 'lichtblauw',
	'paars', 'violet',
	'robijnrood', 'roze', 'rood', 'oranje',
	'donkergeel', 'geel',
	'donkerbruin', 'bruin',
	'donkergroen', 'groen', 'mosgroen', 'mintgroen',
] as const;

const ALL_VARIANTS = [...SEMANTIC_VARIANTS, ...RIJKSLEUREN];

/**
 * Een progress bar toont voortgang of een verdeling. Eén waarde of meerdere
 * segmenten. Twee modes: `progress` (segmenten tellen op naar `max`, rest is
 * track) en `distribution` (segmenten verdelen het totaal, zoals
 * opslaggebruik). Geef ruwe getallen mee — wij berekenen percentages.
 */
export default {
	title: 'Components/Status & Feedback/Progress bar',
	component: 'nldd-progress-bar',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/status-and-feedback/progress-bar/progress-bar.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	argTypes: {
		mode: {
			control: 'select',
			options: ['progress', 'distribution'],
			description: 'Semantiek voor ARIA en visualisatie',
			table: { defaultValue: { summary: 'progress' } },
		},
		color: {
			control: 'select',
			options: ALL_VARIANTS,
			description: 'Kleur van het single-segment',
			table: { defaultValue: { summary: 'accent' } },
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Hoogte van de bar',
			table: { defaultValue: { summary: 'md' } },
		},
		max: {
			control: { type: 'number', min: 1 },
			description: 'Totaalwaarde',
			table: { defaultValue: { summary: 100 } },
		},
		value: {
			control: { type: 'number', min: 0 },
			description: 'Single-segment shorthand',
		},
		text: {
			control: 'text',
			description: 'Label boven de bar (links)',
		},
		valueFormat: {
			name: 'value-format',
			control: 'select',
			options: ['percentage', 'absolute', 'fraction', 'none'],
			description: 'Format voor de waarde rechtsboven',
			table: { defaultValue: { summary: 'percentage' } },
		},
		valueText: {
			name: 'value-text',
			control: 'text',
			description: 'Volledige override van de getoonde waarde',
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Volledige override van aria-valuetext',
		},
		indeterminate: {
			control: 'boolean',
			description: 'Toont een sliding indicator-animatie',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		mode: 'progress',
		color: 'accent',
		size: 'md',
		max: 100,
		value: 60,
		text: 'Bestanden uploaden',
		valueFormat: 'percentage',
		valueText: '',
		accessibleLabel: '',
		indeterminate: false,
	},
};

const Template = (args: Record<string, any>) => html`
	<nldd-progress-bar
		mode=${args.mode}
		color=${args.color}
		size=${args.size}
		max=${args.max}
		value=${args.value}
		text=${args.text || nothing}
		value-format=${args.valueFormat}
		value-text=${args.valueText || nothing}
		accessible-label=${args.accessibleLabel || nothing}
		?indeterminate=${args.indeterminate}
	></nldd-progress-bar>
`;

export const Standaard = {
	render: Template,
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 24px;">
			<nldd-progress-bar size="sm" value="40" text="Klein (4px)"></nldd-progress-bar>
			<nldd-progress-bar size="md" value="60" text="Middel (8px)"></nldd-progress-bar>
			<nldd-progress-bar size="lg" value="80" text="Groot (16px)"></nldd-progress-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const Colors = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 12px;">
			${ALL_VARIANTS.map(c => html`
				<nldd-progress-bar color=${c} value="65" text=${c}></nldd-progress-bar>
			`)}
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const MultiSegmentProgress = {
	render: () => html`
		<nldd-progress-bar mode="progress" max="100" text="Verwerking" value-text="2 van 3 stappen voltooid">
			<nldd-progress-bar-segment value="40" color="success" name="Geüpload"></nldd-progress-bar-segment>
			<nldd-progress-bar-segment value="30" color="accent" name="Verwerken"></nldd-progress-bar-segment>
		</nldd-progress-bar>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Meerdere segmenten in `progress` mode tellen op naar `max`. De resterende ruimte blijft track. Met `name` per segment genereren wij een leesbare aria-valuetext.',
			},
		},
	},
};

export const Distribution = {
	render: () => html`
		<nldd-progress-bar mode="distribution" size="lg" max="500" text="Opslag" value-text="350 GB van 500 GB">
			<nldd-progress-bar-segment value="200" color="hemelblauw" name="Foto's" tooltip-text="Foto's: 200 GB (40%)"></nldd-progress-bar-segment>
			<nldd-progress-bar-segment value="100" color="oranje" name="Video's" tooltip-text="Video's: 100 GB (20%)"></nldd-progress-bar-segment>
			<nldd-progress-bar-segment value="50" color="paars" name="Documenten" tooltip-text="Documenten: 50 GB (10%)"></nldd-progress-bar-segment>
		</nldd-progress-bar>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'In `distribution` mode verdelen de segmenten een totaal. Vaak gebruikt voor opslagverdeling of categorieën. Gebruik Rijksleuren om segmenten visueel te onderscheiden. Tooltips zijn per segment expliciet ingesteld om eenheden te tonen (GB) — zonder `tooltip-text` zou auto-tekst alleen `Foto\'s: 40%` tonen.',
			},
		},
	},
};

export const Indeterminate = {
	render: () => html`
		<nldd-progress-bar indeterminate color="accent" text="Bezig met laden" value-format="none"></nldd-progress-bar>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Geen bekende voortgang. De bar toont een doorlopende sliding indicator. Bij `prefers-reduced-motion` wordt de animatie vervangen door een rustige pulse.',
			},
		},
	},
};

export const ValueFormats = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<nldd-progress-bar value="60" max="100" text="Percentage" value-format="percentage"></nldd-progress-bar>
			<nldd-progress-bar value="60" max="100" text="Absoluut" value-format="absolute"></nldd-progress-bar>
			<nldd-progress-bar value="60" max="100" text="Breuk" value-format="fraction"></nldd-progress-bar>
			<nldd-progress-bar value="60" max="100" text="Geen waarde" value-format="none"></nldd-progress-bar>
			<nldd-progress-bar value="60" max="100" text="Custom (value-text)" value-text="Bijna klaar"></nldd-progress-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const ZonderHeader = {
	render: () => html`
		<nldd-progress-bar value="40"></nldd-progress-bar>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Zonder `text` verschijnt de header niet. Handig voor inline gebruik.',
			},
		},
	},
};
