import { html } from 'lit';
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
		cite: {
			control: 'text',
			description: 'URL van de bron',
		},
	},
	args: {
		cite: '',
	},
};

export const Default = {
	render: () => html`
		<nldd-blockquote>
			Overheidsdienstverlening moet begrijpelijk, toegankelijk en inclusief zijn voor iedereen.
		</nldd-blockquote>
	`,
};

export const WithAttribution = {
	render: () => html`
		<nldd-blockquote cite="https://www.digitaleoverheid.nl/">
			Overheidsdienstverlening moet begrijpelijk, toegankelijk en inclusief zijn voor iedereen.
			<span slot="attribution">Nederlandse Digitale Dienst, 2024</span>
		</nldd-blockquote>
	`,
	parameters: {
		controls: { disable: true },
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
