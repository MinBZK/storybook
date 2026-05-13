import { html, nothing } from 'lit';
import './tag.js';
import { ICONS } from './../icon/icon.js';

/**
 * De Tag component is een compacte label voor categorieën, statussen of metadata.
 * Tags zijn niet interactief — gebruik <nldd-token> voor filter- of dismissible chips.
 *
 * ## Gebruik
 * ```html
 * <nldd-tag text="Concept"></nldd-tag>
 * <nldd-tag variant="success" text="Gepubliceerd"></nldd-tag>
 * ```
 */
export default {
	title: 'Components/Content/Tag',
	component: 'nldd-tag',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/tag/tag.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: [
				// Semantisch
				'neutral', 'accent', 'success', 'warning', 'critical',
				// Rijkskleuren
				'coolgray', 'lintblauw', 'donkerblauw', 'hemelblauw', 'lichtblauw',
				'paars', 'violet', 'robijnrood', 'roze', 'rood',
				'oranje', 'donkergeel', 'geel', 'donkerbruin', 'bruin',
				'donkergroen', 'groen', 'mosgroen', 'mintgroen',
			],
			description: 'Visuele variant — semantisch (neutral, accent, success, warning, critical) of een rijkskleur uit het palette',
			table: {
				defaultValue: { summary: 'neutral' },
			},
		},
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Grootte van de tag',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		text: {
			control: 'text',
			description: 'Tekst van de tag',
		},
		icon: {
			control: 'select',
			options: ['(geen)', ...ICONS],
			mapping: { '(geen)': '' },
			description: 'Icoon voor de tekst',
			table: {
				defaultValue: { summary: '(geen)' },
			},
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijk label (vooral nuttig bij icon-only tags)',
		},
	},
	args: {
		variant: 'neutral',
		size: 'md',
		text: 'Tag',
		icon: '',
		accessibleLabel: '',
	},
};

const Template = ({ variant, size, text, icon, accessibleLabel }: Record<string, any>) => html`
	<nldd-tag
		variant=${variant}
		size=${size}
		icon=${icon || nothing}
		text=${text}
		accessible-label=${accessibleLabel || nothing}
	></nldd-tag>
`;

export const Default = {
	render: Template,
	args: {
		text: 'Tag',
	},
};

export const Variants = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
			<nldd-tag variant="neutral" text="Concept"></nldd-tag>
			<nldd-tag variant="accent" text="Nieuw"></nldd-tag>
			<nldd-tag variant="success" text="Gepubliceerd"></nldd-tag>
			<nldd-tag variant="warning" text="Let op"></nldd-tag>
			<nldd-tag variant="critical" text="Afgewezen"></nldd-tag>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Semantische varianten voor de meest voorkomende statussen. Gebruik deze waar mogelijk — ze communiceren betekenis bovenop kleur.',
			},
		},
	},
};

export const Rijkskleuren = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
			<nldd-tag variant="coolgray" text="coolgray"></nldd-tag>
			<nldd-tag variant="lintblauw" text="lintblauw"></nldd-tag>
			<nldd-tag variant="donkerblauw" text="donkerblauw"></nldd-tag>
			<nldd-tag variant="hemelblauw" text="hemelblauw"></nldd-tag>
			<nldd-tag variant="lichtblauw" text="lichtblauw"></nldd-tag>
			<nldd-tag variant="paars" text="paars"></nldd-tag>
			<nldd-tag variant="violet" text="violet"></nldd-tag>
			<nldd-tag variant="robijnrood" text="robijnrood"></nldd-tag>
			<nldd-tag variant="roze" text="roze"></nldd-tag>
			<nldd-tag variant="rood" text="rood"></nldd-tag>
			<nldd-tag variant="oranje" text="oranje"></nldd-tag>
			<nldd-tag variant="donkergeel" text="donkergeel"></nldd-tag>
			<nldd-tag variant="geel" text="geel"></nldd-tag>
			<nldd-tag variant="donkerbruin" text="donkerbruin"></nldd-tag>
			<nldd-tag variant="bruin" text="bruin"></nldd-tag>
			<nldd-tag variant="donkergroen" text="donkergroen"></nldd-tag>
			<nldd-tag variant="groen" text="groen"></nldd-tag>
			<nldd-tag variant="mosgroen" text="mosgroen"></nldd-tag>
			<nldd-tag variant="mintgroen" text="mintgroen"></nldd-tag>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Alle rijkskleuren uit het palette zijn direct als variant beschikbaar — handig voor categorisering waar de semantische varianten niet passen. Combineer kleur altijd met tekst zodat de tag ook zonder kleur leesbaar blijft.',
			},
		},
	},
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
			<nldd-tag size="md" text="Medium"></nldd-tag>
			<nldd-tag size="sm" text="Small"></nldd-tag>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const WithIcon = {
	render: () => html`
		<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
			<nldd-tag variant="success" text="Goedgekeurd" icon="check-mark"></nldd-tag>
			<nldd-tag variant="warning" text="Let op" icon="alert"></nldd-tag>
			<nldd-tag variant="critical" text="Afgewezen" icon="dismiss-circle"></nldd-tag>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};
