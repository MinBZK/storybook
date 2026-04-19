import { html } from 'lit';
import './pagination.js';

/**
 * De Pagination component voor het navigeren tussen pagina's met inhoud.
 *
 * ## Gebruik
 * ```html
 * <nldd-pagination current="1" total="10"></nldd-pagination>
 *
 * <!-- Met links in plaats van buttons -->
 * <nldd-pagination current="1" total="10" href-pattern="/resultaten?pagina={page}"></nldd-pagination>
 * ```
 */
export default {
	title: 'Components/Navigation/Pagination',
	component: 'nldd-pagination',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/navigation/pagination/pagination.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		current: {
			control: { type: 'number', min: 1 },
			description: 'Huidige actieve pagina (1-gebaseerd)',
			table: { defaultValue: { summary: 1 } },
		},
		total: {
			control: { type: 'number', min: 1 },
			description: 'Totaal aantal pagina\'s',
			table: { defaultValue: { summary: 1 } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde staat',
			table: { defaultValue: { summary: false } },
		},
		fullWidth: {
			control: 'boolean',
			name: 'full-width',
			description: 'Centreert de pagination in de container',
			table: { defaultValue: { summary: false } },
		},
	},
	args: {
		current: 1,
		total: 10,
		disabled: false,
		fullWidth: false,
	},
};

const Template = ({ current, total, disabled, fullWidth }) => html`
	<nldd-pagination
		current=${current}
		total=${total}
		?disabled=${disabled}
		?full-width=${fullWidth}
	></nldd-pagination>
`;

export const Standaard = Template.bind({});
Standaard.args = { current: 1, total: 10 };

export const VeelPaginas = Template.bind({});
VeelPaginas.args = { current: 25, total: 100 };

export const WeinigPaginas = Template.bind({});
WeinigPaginas.args = { current: 2, total: 3 };

export const Uitgeschakeld = Template.bind({});
Uitgeschakeld.args = { current: 3, total: 10, disabled: true };

export const MetLinks = () => html`
	<nldd-pagination current="3" total="10" href-pattern="/resultaten?pagina={page}"></nldd-pagination>
`;
MetLinks.parameters = {
	controls: { disable: true },
	docs: {
		description: {
			story: 'Met <code>href-pattern</code> worden pagina-knoppen als links gerenderd in plaats van buttons. Beter voor SEO en bookmarkbare pagina\'s.',
		},
	},
};
