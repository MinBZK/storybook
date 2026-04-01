import { html, nothing } from 'lit';
import './rr-button.ts';
import { ICONS } from './../../content/icon/rr-icon.ts';

/**
 * De Button component is het primaire interactie-element voor gebruikersacties.
 *
 * ## Gebruik
 * ```html
 * <rr-button text="Titel"></rr-button>
 * <rr-button text="Download" start-icon="download"></rr-button>
 * ```
 */
export default {
	title: 'Components/Actions/Button',
	component: 'rr-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/actions/button/rr-button.ts',
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
				'primary',
				'secondary',
				'destructive',
				'accent-filled',
				'accent-outlined',
				'accent-transparent',
				'neutral-tinted',
				'neutral-transparent',
				'danger-tinted',
			],
			description: 'Visuele stijlvariant',
			table: {
				defaultValue: { summary: 'neutral-tinted' },
			},
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Grootte van de knop',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		fullWidth: {
			control: 'boolean',
			name: 'full-width',
			description: 'Full width',
			table: {
				defaultValue: { summary: false },
			},
		},
		text: {
			control: 'text',
			description: 'Tekst van de knop',
		},
		startIcon: {
			control: 'select',
			options: ['', ...ICONS],
			name: 'start-icon',
			description: 'Icoon voor de tekst',
			table: {
				defaultValue: { summary: '' },
			},
		},
		endIcon: {
			control: 'select',
			options: ['', ...ICONS],
			name: 'end-icon',
			description: 'Icoon na de tekst',
			table: {
				defaultValue: { summary: '' },
			},
		},
		expandable: {
			control: 'boolean',
			name: 'expandable',
			description: 'Voegt een chevron toe om aan te geven dat deze knop een menu of popover opent',
			table: {
				defaultValue: { summary: false },
			},
		},
		type: {
			control: 'select',
			options: ['button', 'submit', 'reset'],
			description: 'Type attribuut voor formulierverwerking',
			table: {
				defaultValue: { summary: 'button' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde toestand',
			table: {
				defaultValue: { summary: false },
			},
		},
	},
	args: {
		variant: 'neutral-tinted',
		size: 'md',
		fullWidth: false,
		text: 'Button',
		startIcon: '',
		endIcon: '',
		expandable: false,
		type: 'button',
		disabled: false,
	},
};

const Template = ({ text, variant, size, fullWidth, type, startIcon, endIcon, expandable, disabled }) => html`
	<rr-button
		variant=${variant}
		size=${size}
		?full-width=${fullWidth}
		type=${type}
		text=${text}
		start-icon=${startIcon || nothing}
		end-icon=${endIcon || nothing}
		?expandable=${expandable}
		?disabled=${disabled}
	></rr-button>
`;

export const Default = Template.bind({});
Default.args = {
	text: 'Button',
};

export const RoleBased = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button variant="primary" text="Primary"></rr-button>
		<rr-button variant="secondary" text="Secondary"></rr-button>
		<rr-button variant="destructive" text="Destructive"></rr-button>
	</div>
`;
RoleBased.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Role based buttons zijn aliases van de appearance based buttons.',
		},
	},
};

export const AppearanceBased = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button variant="accent-filled" text="Accent Filled"></rr-button>
		<rr-button variant="accent-outlined" text="Accent Outlined"></rr-button>
		<rr-button variant="accent-transparent" text="Accent Transparent"></rr-button>
		<rr-button variant="neutral-tinted" text="Neutral Tinted"></rr-button>
		<rr-button variant="neutral-transparent" text="Neutral Transparent"></rr-button>
		<rr-button variant="danger-tinted" text="Danger Tinted"></rr-button>
	</div>
`;
AppearanceBased.parameters = {
	controls: { disable: true },
};

export const Sizes = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button size="md" text="Medium"></rr-button>
		<rr-button size="sm" text="Small"></rr-button>
		<rr-button size="xs" text="Extra Small"></rr-button>
	</div>
`;
Sizes.parameters = {
	controls: { disable: true },
};

export const WithStartIcon = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button size="md" text="Download" start-icon="download"></rr-button>
		<rr-button size="sm" text="Download" start-icon="download"></rr-button>
		<rr-button size="xs" text="Download" start-icon="download"></rr-button>
	</div>
`;
WithStartIcon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Button met een icoon aan de linkerkant via het <code>start-icon</code> attribute.',
		},
	},
};

export const WithEndIcon = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button size="md" text="Volgende" end-icon="arrow-right"></rr-button>
		<rr-button size="sm" text="Volgende" end-icon="arrow-right"></rr-button>
		<rr-button size="xs" text="Volgende" end-icon="arrow-right"></rr-button>
	</div>
`;
WithEndIcon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Button met een icoon aan de rechterkant via het <code>end-icon</code> attribute.',
		},
	},
};

export const WithBothIcons = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button size="md" text="Download bestand" start-icon="download" end-icon="arrow-right"></rr-button>
		<rr-button size="sm" text="Download bestand" start-icon="download" end-icon="arrow-right"></rr-button>
		<rr-button size="xs" text="Download bestand" start-icon="download" end-icon="arrow-right"></rr-button>
	</div>
`;
WithBothIcons.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Button met zowel een start als end icoon via de <code>start-icon</code> en <code>end-icon</code> attributes.',
		},
	},
};

export const WithDisclosureIcon = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button expandable size="md" text="Opties"></rr-button>
		<rr-button expandable size="sm" text="Opties"></rr-button>
		<rr-button expandable size="xs" text="Opties"></rr-button>
	</div>
`;
WithDisclosureIcon.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Button die een menu of popover opent. Gebruik de <code>expandable</code> attribute om aan te geven dat deze button een menu of popover opent.',
		},
	},
};

export const CustomIconSlot = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<rr-button text="Custom start">
			<svg slot="start-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
				<circle cx="10" cy="10" r="8"/>
			</svg>
		</rr-button>
		<rr-button text="Custom end">
			<svg slot="end-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
				<polygon points="10,2 18,18 2,18"/>
			</svg>
		</rr-button>
	</div>
`;
CustomIconSlot.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Gebruik de <code>start-icon</code> en <code>end-icon</code> slots om custom SVG iconen te plaatsen in plaats van de icon attributes.',
		},
	},
};
