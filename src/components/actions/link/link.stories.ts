import { html, nothing } from 'lit';
import './link.js';
import { ICONS } from './../../content/icon/icon.js';

/**
 * De Link component is een standalone hyperlink voor gebruik buiten lopende tekst —
 * denk aan menu-items, "verder lezen" acties of actiegebieden. Voor inline links
 * in paragrafen gebruik je <nldd-rich-text> met een standaard <a>.
 *
 * ## Gebruik
 * ```html
 * <nldd-link href="/pad" text="Bekijk meer"></nldd-link>
 * <nldd-link href="https://example.com" target="_blank" text="Externe link" end-icon="arrow-up-right"></nldd-link>
 * ```
 */
export default {
	title: 'Components/Actions/Link',
	component: 'nldd-link',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/actions/link/link.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		text: {
			control: 'text',
			description: 'Tekst van de link',
		},
		href: {
			control: 'text',
			description: 'Link doel',
		},
		target: {
			control: 'select',
			options: ['', '_self', '_blank', '_parent', '_top'],
			description: 'Link target (stelt rel automatisch bij voor _blank)',
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tekstgrootte',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		startIcon: {
			name: 'start-icon',
			control: 'select',
			options: ['', ...ICONS],
			description: 'Icoon voor de tekst',
			table: {
				defaultValue: { summary: '' },
			},
		},
		endIcon: {
			name: 'end-icon',
			control: 'select',
			options: ['', ...ICONS],
			description: 'Icoon na de tekst',
			table: {
				defaultValue: { summary: '' },
			},
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijk label voor screen readers',
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde staat',
			table: {
				defaultValue: { summary: false },
			},
		},
	},
	args: {
		text: 'Bekijk meer',
		href: '#',
		target: '',
		size: 'md',
		startIcon: '',
		endIcon: '',
		accessibleLabel: '',
		disabled: false,
	},
};

const Template = ({ text, href, target, size, startIcon, endIcon, accessibleLabel, disabled }: Record<string, any>) => html`
	<nldd-link
		href=${href || nothing}
		target=${target || nothing}
		size=${size}
		text=${text}
		start-icon=${startIcon || nothing}
		end-icon=${endIcon || nothing}
		accessible-label=${accessibleLabel || nothing}
		?disabled=${disabled}
	></nldd-link>
`;

export const Default = {
	render: Template,
	args: {
		text: 'Bekijk meer',
		href: '#',
	},
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
			<nldd-link href="#" size="lg" text="Large link"></nldd-link>
			<nldd-link href="#" size="md" text="Medium link"></nldd-link>
			<nldd-link href="#" size="sm" text="Small link"></nldd-link>
			<nldd-link href="#" size="xs" text="Extra small link"></nldd-link>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const WithStartIcon = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
			<nldd-link href="#" text="Download bestand" start-icon="download"></nldd-link>
			<nldd-link href="#" text="Terug naar overzicht" start-icon="arrow-left"></nldd-link>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const WithEndIcon = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
			<nldd-link href="#" text="Verder lezen" end-icon="arrow-right"></nldd-link>
			<nldd-link href="https://example.com" target="_blank" text="Externe website" end-icon="square-arrow-right-top"></nldd-link>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Gebruik een end-icon om richting of externe navigatie te indiceren.',
			},
		},
	},
};

export const Disabled = {
	render: () => html`
		<nldd-link href="#" text="Uitgeschakelde link" disabled></nldd-link>
	`,
	parameters: {
		controls: { disable: true },
	},
};
