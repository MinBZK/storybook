import { html, nothing } from 'lit';
import './badge.js';
import { ICONS } from './../../content/icon/icon.js';

/**
 * De Badge component toont een notificatie of statusindicator. Met `number` of `text`
 * toont de badge een waarde; zonder waarde verschijnt automatisch een stip.
 *
 * ## Gebruik
 * ```html
 * <nldd-badge number="3"></nldd-badge>
 * <nldd-badge></nldd-badge> <!-- toont stip -->
 * <nldd-badge variant="success" text="Nieuw"></nldd-badge>
 * ```
 */
const VARIANTS = ['red', 'accent', 'neutral', 'warning', 'success'];

export default {
	title: 'Components/Status & Feedback/Badge',
	component: 'nldd-badge',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/status-and-feedback/badge/badge.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: VARIANTS,
			description: 'Kleur-variant',
			table: {
				defaultValue: { summary: 'red' },
			},
		},
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Grootte',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		icon: {
			control: 'select',
			options: ['', ...ICONS],
			description: 'Icoon naam',
			table: {
				defaultValue: { summary: '' },
			},
		},
		number: {
			control: { type: 'text' },
			type: { name: 'string' },
			description: 'Numerieke waarde (leeg laten voor stip)',
			table: {
				type: { summary: 'number' },
			},
		},
		max: {
			control: 'number',
			description: 'Maximum getoonde waarde (daarboven "max+")',
			table: {
				defaultValue: { summary: '99' },
			},
		},
		text: {
			control: 'text',
			description: 'Tekst (heeft voorrang op number)',
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijk label voor screenreaders (fallback naar text/number; anders naar i18n default)',
		},
	},
	args: {
		variant: 'red',
		size: 'md',
		icon: '',
		number: '',
		max: 99,
		text: '',
		accessibleLabel: '',
	},
};

const Template = ({ variant, size, icon, number, max, text, accessibleLabel }: Record<string, any>) => {
	const parsed = number === '' || number === null || number === undefined ? undefined : Number(number);
	return html`
		<nldd-badge
			variant=${variant}
			size=${size}
			icon=${icon || nothing}
			number=${Number.isFinite(parsed) ? parsed! : nothing}
			max=${max}
			text=${text || nothing}
			accessible-label=${accessibleLabel || nothing}
		></nldd-badge>
	`;
};

export const Default = {
	render: Template,
	args: {
		number: '3',
	},
};

export const Dot = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-badge variant="red"></nldd-badge>
			<nldd-badge variant="accent"></nldd-badge>
			<nldd-badge variant="neutral"></nldd-badge>
			<nldd-badge variant="warning"></nldd-badge>
			<nldd-badge variant="success"></nldd-badge>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Zonder text of number verschijnt automatisch een stip — ideaal voor "nieuw/ongelezen" indicatie.',
			},
		},
	},
};

export const WithNumber = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-badge number="1"></nldd-badge>
			<nldd-badge number="12"></nldd-badge>
			<nldd-badge number="150"></nldd-badge>
			<nldd-badge number="150" max="9"></nldd-badge>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Met een numerieke waarde. Boven de max wordt "{max}+" getoond.',
			},
		},
	},
};

export const WithText = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-badge variant="accent" text="Nieuw"></nldd-badge>
			<nldd-badge variant="success" text="Live"></nldd-badge>
			<nldd-badge variant="warning" text="Bèta"></nldd-badge>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const WithIcon = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-badge variant="success" icon="check-mark"></nldd-badge>
			<nldd-badge variant="warning" icon="alert"></nldd-badge>
			<nldd-badge variant="red" icon="dismiss-circle"></nldd-badge>
			<nldd-badge variant="accent" icon="info-circle"></nldd-badge>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Icon-only badges worden als vierkant gerenderd — nuttig voor status-indicatoren (verified, waarschuwing, geblokkeerd).',
			},
		},
	},
};

export const WithIconAndText = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-badge variant="success" icon="check-mark" text="Geverifieerd"></nldd-badge>
			<nldd-badge variant="warning" icon="alert" text="Let op"></nldd-badge>
			<nldd-badge variant="accent" icon="info-circle" number="3"></nldd-badge>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Icon + text/number: icoon links, content rechts.',
			},
		},
	},
};

export const Variants = {
	render: () => html`
		<div style="display: flex; gap: 12px; align-items: center;">
			${VARIANTS.map(v => html`<nldd-badge variant=${v} number="3"></nldd-badge>`)}
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-badge size="md" number="3"></nldd-badge>
			<nldd-badge size="sm" number="3"></nldd-badge>
			<nldd-badge size="md"></nldd-badge>
			<nldd-badge size="sm"></nldd-badge>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const OverlayOnIcon = {
	render: () => html`
		<div style="display: flex; gap: 24px; align-items: center;">
			<span style="position: relative; display: inline-flex;">
				<nldd-icon name="envelope" style="width: 32px; height: 32px;"></nldd-icon>
				<nldd-badge
					number="3"
					style="position: absolute; top: -4px; right: -8px;"
				></nldd-badge>
			</span>
			<span style="position: relative; display: inline-flex;">
				<nldd-icon name="envelope" style="width: 32px; height: 32px;"></nldd-icon>
				<nldd-badge
					size="sm"
					number="3"
					style="position: absolute; top: -4px; right: -6px;"
				></nldd-badge>
			</span>
			<span style="position: relative; display: inline-flex;">
				<nldd-icon name="envelope" style="width: 32px; height: 32px;"></nldd-icon>
				<nldd-badge
					style="position: absolute; top: 0; right: 0;"
				></nldd-badge>
			</span>
			<span style="position: relative; display: inline-flex;">
				<nldd-icon name="envelope" style="width: 32px; height: 32px;"></nldd-icon>
				<nldd-badge
					size="sm"
					style="position: absolute; top: 0; right: 0;"
				></nldd-badge>
			</span>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Badge gepositioneerd in een hoek van een icon als notificatie-indicator.',
			},
		},
	},
};
