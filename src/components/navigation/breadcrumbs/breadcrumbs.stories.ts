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
		noCollapse: false,
	},
	argTypes: {
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Override van het aria-label op de <nav> (anders i18n-default)',
			table: { defaultValue: { summary: '(geen)' } },
		},
		noCollapse: {
			name: 'no-collapse',
			control: 'boolean',
			description: 'Toon altijd alle niveaus; schakelt het inklappen vanaf vier niveaus uit',
			table: { defaultValue: { summary: false } },
		},
	},
};

export const Standaard = {
	render: (args: Record<string, any>) => html`
		<nldd-breadcrumbs
			accessible-label=${args.accessibleLabel || ''}
			?no-collapse=${args.noCollapse}
		>
			<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Documentatie" href="/docs/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Architectuur" href="/docs/architecture"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Detail" current></nldd-breadcrumbs-item>
		</nldd-breadcrumbs>
	`,
};

/**
 * Vanaf vier niveaus klapt het pad standaard in tot
 * `Home › … › {bovenliggende pagina} › {huidige pagina}`. De ellipsis is een
 * knop in de stijl van het rijtje; activeren toont de verborgen niveaus op
 * hun plek en verplaatst de focus naar het eerste onthulde niveau. De
 * verborgen items blijven in de DOM, dus zoekmachines zien het hele pad.
 */
export const IngeklapteNiveaus = {
	render: () => html`
		<nldd-breadcrumbs>
			<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Burgerzaken" href="/burgerzaken/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Reisdocumenten" href="/burgerzaken/reisdocumenten/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Aanvragen" href="/burgerzaken/reisdocumenten/aanvragen/"></nldd-breadcrumbs-item>
			<nldd-breadcrumbs-item text="Paspoort verlengen" current></nldd-breadcrumbs-item>
		</nldd-breadcrumbs>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * In een smalle container wrapt het kruimelpad over meerdere regels, zodat het
 * op elke breedte past. Er is geen aparte terugknop-variant meer. Hier met
 * `no-collapse`, zodat het wrappen zichtbaar is in plaats van het inklappen.
 */
export const SmalleContainer = {
	render: () => html`
		<div style="max-width: 320px; border: 1px dashed var(--semantics-dividers-color); padding: 16px;">
			<nldd-breadcrumbs no-collapse>
				<nldd-breadcrumbs-item text="Home" href="/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Documentatie" href="/docs/"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Architectuur" href="/docs/architecture"></nldd-breadcrumbs-item>
				<nldd-breadcrumbs-item text="Huidige pagina" current></nldd-breadcrumbs-item>
			</nldd-breadcrumbs>
		</div>
	`,
	parameters: { controls: { disable: true } },
};
