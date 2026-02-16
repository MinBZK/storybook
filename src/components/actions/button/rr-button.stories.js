import { html } from 'lit';
import './rr-button.ts';

/**
 * De Button component is het primaire interactie-element voor gebruikersacties.
 *
 * ## Gebruik
 * ```html
 * <rr-button>Titel</rr-button>
 * ```
 */
export default {
	title: 'Components/Actions/Button',
	component: 'rr-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/actions/button/rr-button.ts',
			repository: 'https://github.com/regelrecht/design-system',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'accent-filled',
				'accent-outlined',
				'accent-transparent',
				'neutral-tinted',
				'neutral-transparent',
			],
			description: 'Visual style variant',
			table: {
				defaultValue: { summary: 'neutral-tinted' },
			},
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Button size',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
			table: {
				defaultValue: { summary: false },
			},
		},
		type: {
			control: 'select',
			options: ['button', 'submit', 'reset'],
			description: 'Button type attribute',
			table: {
				defaultValue: { summary: 'button' },
			},
		},
		title: {
			control: 'text',
			description: 'Button title',
		},
		hasStartIcon: {
			control: 'boolean',
			description: 'Whether button has a start icon',
			table: {
				defaultValue: { summary: false },
			},
		},
		hasEndIcon: {
			control: 'boolean',
			description: 'Whether button has a end icon',
			table: {
				defaultValue: { summary: false },
			},
		},
		hasMenu: {
			control: 'boolean',
			description: 'Whether button opens a menu (shows chevron)',
			table: {
				defaultValue: { summary: false },
			},
		},
	},
	args: {
		title: 'Button',
		variant: 'neutral-tinted',
		size: 'md',
		disabled: false,
		type: 'button',
		hasStartIcon: false,
		hasEndIcon: false,
		hasMenu: false,
	},
};

const Template = ({ title, variant, size, disabled, type }) => html`
	<rr-button variant=${variant} size=${size} ?disabled=${disabled} type=${type}>${title}</rr-button>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
	title: 'Button',
};

// All variants
export const AccentFilled = Template.bind({});
AccentFilled.args = {
	title: 'Accent Filled',
	variant: 'accent-filled',
};

export const AccentOutlined = Template.bind({});
AccentOutlined.args = {
	title: 'Accent Outlined',
	variant: 'accent-outlined',
};

export const AccentTransparent = Template.bind({});
AccentTransparent.args = {
	title: 'Accent Transparent',
	variant: 'accent-transparent',
};

export const NeutralTinted = Template.bind({});
NeutralTinted.args = {
	title: 'Neutral Tinted',
	variant: 'neutral-tinted',
};

export const NeutralTransparent = Template.bind({});
NeutralTransparent.args = {
	title: 'Neutral Transparent',
	variant: 'neutral-transparent',
};

// Sizes
export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
	title: 'Extra Small',
	size: 'xs',
};

export const Small = Template.bind({});
Small.args = {
	title: 'Small',
	size: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
	title: 'Medium',
	size: 'md',
};

// States
export const Disabled = Template.bind({});
Disabled.args = {
	title: 'Disabled',
	disabled: true,
};

// All variants overview
export const AllVariants = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button variant="accent-filled">Accent Filled</rr-button>
		<rr-button variant="accent-outlined">Accent Outlined</rr-button>
		<rr-button variant="accent-transparent">Accent Transparent</rr-button>
		<rr-button variant="neutral-tinted">Neutral Tinted</rr-button>
		<rr-button variant="neutral-transparent">Neutral Tinted</rr-button>
	</div>
`;
AllVariants.parameters = {
	controls: { disable: true },
};

// All sizes overview
export const AllSizes = () => html`
	<div style="display: flex; gap: 1rem; align-items: center;">
		<rr-button size="xs">Extra Small</rr-button>
		<rr-button size="sm">Small</rr-button>
		<rr-button size="md">Medium</rr-button>
	</div>
`;
AllSizes.parameters = {
	controls: { disable: true },
};

// Matrix of all combinations
export const VariantSizeMatrix = () => html`
	<table style="border-collapse: collapse; width: 100%;">
		<thead>
			<tr>
				<th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
					Variant
				</th>
				<th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">XS</th>
				<th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">S</th>
				<th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">M</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">accent-filled</td>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
					<rr-button variant="accent-filled" size="xs">Title</rr-button>
				</td>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
					<rr-button variant="accent-filled" size="sm">Title</rr-button>
				</td>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
					<rr-button variant="accent-filled" size="md">Title</rr-button>
				</td>
			</tr>
			<tr>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">accent-outlined</td>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
					<rr-button variant="accent-outlined" size="xs">Title</rr-button>
				</td>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
					<rr-button variant="accent-outlined" size="sm">Title</rr-button>
				</td>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
					<rr-button variant="accent-outlined" size="md">Title</rr-button>
				</td>
			</tr>
			<tr>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">neutral-tinted</td>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
					<rr-button variant="neutral-tinted" size="xs">Title</rr-button>
				</td>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
					<rr-button variant="neutral-tinted" size="sm">Title</rr-button>
				</td>
				<td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
					<rr-button variant="neutral-tinted" size="md">Title</rr-button>
				</td>
			</tr>
			<tr>
				<td style="padding: 0.75rem;">accent-transparent</td>
				<td style="padding: 0.75rem; text-align: center;">
					<rr-button variant="accent-transparent" size="xs">Title</rr-button>
				</td>
				<td style="padding: 0.75rem; text-align: center;">
					<rr-button variant="accent-transparent" size="sm">Title</rr-button>
				</td>
				<td style="padding: 0.75rem; text-align: center;">
					<rr-button variant="accent-transparent" size="md">Title</rr-button>
				</td>
			</tr>
		</tbody>
	</table>
`;
VariantSizeMatrix.parameters = {
	controls: { disable: true },
};

// Icon stories
export const WithStartIcon = () => html`
	<rr-button variant="accent-filled" size="md" has-start-icon>
		<svg
			slot="icon-start"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
		</svg>
		Download
	</rr-button>
`;
WithStartIcon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story:
				'Button met een icoon aan de linkerkant. Gebruik de `has-start-icon` attribute en plaats een icoon in de `icon-start` slot.',
		},
	},
};

export const WithEndIcon = () => html`
	<rr-button variant="accent-filled" size="md" has-end-icon>
		Volgende
		<svg
			slot="icon-end"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M5 12h14M12 5l7 7-7 7" />
		</svg>
	</rr-button>
`;
WithEndIcon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story:
				'Button met een icoon aan de rechterkant. Gebruik de `has-end-icon` attribute en plaats een icoon in de `icon-end` slot.',
		},
	},
};

export const WithMenu = () => html`
	<rr-button variant="accent-outlined" size="md" has-menu>
		Opties
		<svg
			slot="icon-end"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M6 9l6 6 6-6" />
		</svg>
	</rr-button>
`;
WithMenu.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story:
				'Button die een menu opent. Gebruik de `has-menu` attribute om aan te geven dat deze button een dropdown menu toont.',
		},
	},
};

export const WithBothIcons = () => html`
	<rr-button variant="accent-filled" size="md" has-start-icon has-end-icon>
		<svg
			slot="icon-start"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
		</svg>
		Download bestand
		<svg
			slot="icon-end"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M5 12h14M12 5l7 7-7 7" />
		</svg>
	</rr-button>
`;
WithBothIcons.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story:
				'Button met zowel een start als end icoon. Combineer `has-start-icon` en `has-end-icon` attributes.',
		},
	},
};

export const IconVariants = () => html`
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
			<rr-button variant="accent-filled" has-start-icon>
				<svg
					slot="icon-start"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
				</svg>
				Accent Filled
			</rr-button>
			<rr-button variant="accent-outlined" has-start-icon>
				<svg
					slot="icon-start"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
				</svg>
				Accent Outlined
			</rr-button>
			<rr-button variant="accent-filled" has-start-icon>
				<svg
					slot="icon-start"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
				</svg>
				Accent Tinted
			</rr-button>
			<rr-button variant="neutral-tinted" has-start-icon>
				<svg
					slot="icon-start"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
				</svg>
				Neutral Tinted
			</rr-button>
			<rr-button variant="accent-transparent" has-start-icon>
				<svg
					slot="icon-start"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
				</svg>
				Accent Transparent
			</rr-button>
		</div>
		<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
			<rr-button variant="accent-filled" has-end-icon>
				Volgende
				<svg
					slot="icon-end"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</rr-button>
			<rr-button variant="accent-outlined" has-end-icon>
				Volgende
				<svg
					slot="icon-end"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</rr-button>
			<rr-button variant="accent-filled" has-end-icon>
				Volgende
				<svg
					slot="icon-end"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</rr-button>
			<rr-button variant="neutral-tinted" has-end-icon>
				Volgende
				<svg
					slot="icon-end"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</rr-button>
			<rr-button variant="accent-transparent" has-end-icon>
				Volgende
				<svg
					slot="icon-end"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</rr-button>
		</div>
		<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
			<rr-button variant="accent-filled" has-menu>
				Menu
				<svg
					slot="icon-end"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</rr-button>
			<rr-button variant="accent-outlined" has-menu>
				Menu
				<svg
					slot="icon-end"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</rr-button>
			<rr-button variant="accent-filled" has-menu>
				Menu
				<svg
					slot="icon-end"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</rr-button>
			<rr-button variant="neutral-tinted" has-menu>
				Menu
				<svg
					slot="icon-end"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</rr-button>
			<rr-button variant="accent-transparent" has-menu>
				Menu
				<svg
					slot="icon-end"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</rr-button>
		</div>
	</div>
`;
IconVariants.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Overzicht van buttons met iconen in alle beschikbare varianten.',
		},
	},
};
