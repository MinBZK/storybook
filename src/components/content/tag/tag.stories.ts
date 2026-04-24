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
			options: ['neutral', 'accent', 'success', 'warning', 'danger'],
			description: 'Visuele variant',
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
			options: ['', ...ICONS],
			description: 'Icoon voor de tekst',
			table: {
				defaultValue: { summary: '' },
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
			<nldd-tag variant="danger" text="Afgewezen"></nldd-tag>
		</div>
	`,
	parameters: {
		controls: { disable: true },
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
			<nldd-tag variant="danger" text="Afgewezen" icon="dismiss-circle"></nldd-tag>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};
