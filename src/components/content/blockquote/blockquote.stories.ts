import { html, nothing } from 'lit';
import './blockquote.js';

/**
 * De Blockquote component toont een citaat met optionele bronvermelding.
 *
 * ## Gebruik
 * ```html
 * <nldd-blockquote>
 *   Het beste systeem is het systeem dat je niet ziet.
 *   <span slot="attribution">Jan Jansen, 2024</span>
 * </nldd-blockquote>
 * ```
 */
export default {
	title: 'Components/Content/Blockquote',
	component: 'nldd-blockquote',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/blockquote/blockquote.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		quote: {
			control: 'text',
			description: 'Citaat (default slot)',
		},
		attribution: {
			control: 'text',
			description: 'Bronvermelding (slot="attribution")',
		},
		cite: {
			control: 'text',
			description: 'URL van de bron',
		},
	},
	args: {
		quote: 'Overheidsdienstverlening moet begrijpelijk, toegankelijk en inclusief zijn voor iedereen.',
		attribution: 'Nederlandse Digitale Dienst, 2024',
		cite: '',
	},
};

const Template = ({ quote, attribution, cite }: Record<string, any>) => html`
	<nldd-blockquote cite=${cite || nothing}>
		${quote}
		${attribution ? html`<span slot="attribution">${attribution}</span>` : ''}
	</nldd-blockquote>
`;

export const Default = {
	render: Template,
};

export const WithCiteUrl = {
	render: Template,
	args: {
		cite: 'https://www.digitaleoverheid.nl/',
	},
};

export const LongQuote = {
	render: () => html`
		<nldd-blockquote>
			Een goede digitale dienst is als een goede ambtenaar: betrouwbaar, geduldig en altijd
			gericht op de burger die aan de andere kant van de balie staat. Of die balie nu
			fysiek is of een formulier op het scherm: de bedoeling blijft hetzelfde.
			<span slot="attribution">uit het handboek ontwerpprincipes</span>
		</nldd-blockquote>
	`,
	parameters: {
		controls: { disable: true },
	},
};
