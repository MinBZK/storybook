import { html, nothing } from 'lit';
import './ndd-button.ts';
import { ICONS } from './../../content/icon/ndd-icon.ts';

/**
 * De Button component is het primaire interactie-element voor gebruikersacties.
 *
 * ## Gebruik
 * ```html
 * <ndd-button text="Titel"></ndd-button>
 * <ndd-button text="Download" start-icon="download"></ndd-button>
 * ```
 */
export default {
	title: 'Components/Actions/Button',
	component: 'ndd-button',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/actions/button/ndd-button.ts',
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
		href: {
			control: 'text',
			description: 'Wanneer gezet, wordt het element als link gerenderd in plaats van het opgegeven type',
		},
		target: {
			control: 'select',
			options: ['', '_self', '_blank', '_parent', '_top'],
			description: 'Link target (alleen gebruikt als href is gezet)',
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
		href: '',
		target: '',
		disabled: false,
	},
};

const Template = ({ text, variant, size, fullWidth, type, href, target, startIcon, endIcon, expandable, disabled }) => html`
	<ndd-button
		variant=${variant}
		size=${size}
		?full-width=${fullWidth}
		type=${type}
		text=${text}
		href=${href || nothing}
		target=${target || nothing}
		start-icon=${startIcon || nothing}
		end-icon=${endIcon || nothing}
		?expandable=${expandable}
		?disabled=${disabled}
	></ndd-button>
`;

export const Default = Template.bind({});
Default.args = {
	text: 'Button',
};

export const RoleBased = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<ndd-button variant="primary" text="Primary"></ndd-button>
		<ndd-button variant="secondary" text="Secondary"></ndd-button>
		<ndd-button variant="destructive" text="Destructive"></ndd-button>
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
		<ndd-button variant="accent-filled" text="Accent Filled"></ndd-button>
		<ndd-button variant="accent-outlined" text="Accent Outlined"></ndd-button>
		<ndd-button variant="accent-transparent" text="Accent Transparent"></ndd-button>
		<ndd-button variant="neutral-tinted" text="Neutral Tinted"></ndd-button>
		<ndd-button variant="neutral-transparent" text="Neutral Transparent"></ndd-button>
		<ndd-button variant="danger-tinted" text="Danger Tinted"></ndd-button>
	</div>
`;
AppearanceBased.parameters = {
	controls: { disable: true },
};

export const Sizes = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<ndd-button size="md" text="Medium"></ndd-button>
		<ndd-button size="sm" text="Small"></ndd-button>
		<ndd-button size="xs" text="Extra Small"></ndd-button>
	</div>
`;
Sizes.parameters = {
	controls: { disable: true },
};

export const WithStartIcon = () => html`
	<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
		<ndd-button size="md" text="Download" start-icon="download"></ndd-button>
		<ndd-button size="sm" text="Download" start-icon="download"></ndd-button>
		<ndd-button size="xs" text="Download" start-icon="download"></ndd-button>
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
		<ndd-button size="md" text="Volgende" end-icon="arrow-right"></ndd-button>
		<ndd-button size="sm" text="Volgende" end-icon="arrow-right"></ndd-button>
		<ndd-button size="xs" text="Volgende" end-icon="arrow-right"></ndd-button>
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
		<ndd-button size="md" text="Download bestand" start-icon="download" end-icon="arrow-right"></ndd-button>
		<ndd-button size="sm" text="Download bestand" start-icon="download" end-icon="arrow-right"></ndd-button>
		<ndd-button size="xs" text="Download bestand" start-icon="download" end-icon="arrow-right"></ndd-button>
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
		<ndd-button expandable size="md" text="Opties"></ndd-button>
		<ndd-button expandable size="sm" text="Opties"></ndd-button>
		<ndd-button expandable size="xs" text="Opties"></ndd-button>
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
		<ndd-button text="Custom start">
			<svg slot="start-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
				<circle cx="10" cy="10" r="8"/>
			</svg>
		</ndd-button>
		<ndd-button text="Custom end">
			<svg slot="end-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
				<polygon points="10,2 18,18 2,18"/>
			</svg>
		</ndd-button>
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
