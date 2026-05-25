import { html } from 'lit';
import './breadcrumbs.js';

export default {
	title: 'Components/Navigation/Breadcrumbs',
	component: 'nldd-breadcrumbs',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/navigation/breadcrumbs/breadcrumbs.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'stable' },
	},
	args: {
		accessibleLabel: '',
	},
	argTypes: {
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Override van het aria-label op de <nav> (anders i18n-default)',
			table: { defaultValue: { summary: '(geen)' } },
		},
	},
};

export const Standaard = {
	render: (args: Record<string, any>) => html`
		<nldd-breadcrumbs
			accessible-label=${args.accessibleLabel || ''}
		>
			<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Documentatie" href="/docs/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Architectuur" href="/docs/architecture"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Detail" current></nldd-breadcrumbs-item>
		</nldd-breadcrumbs>
	`,
};

/**
 * Op een sm-viewport (≤640px) wisselt het component automatisch van het
 * volledige kruimelpad naar een "‹ {ouder}"-link, gestuurd door een
 * `@container`-query op de breadcrumbs zelf.
 */
export const SmFallback = {
	render: () => html`
		<div style="max-width: 320px; border: 1px dashed var(--semantics-dividers-color); padding: 16px;">
			<nldd-breadcrumbs>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Documentatie" href="/docs/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Architectuur" href="/docs/architecture"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Huidige pagina" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		</div>
	`,
	parameters: { controls: { disable: true } },
};
