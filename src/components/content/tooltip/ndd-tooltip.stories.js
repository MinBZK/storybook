import { html } from 'lit';
import './ndd-tooltip.ts';

/**
 * De Tooltip component voor het tonen van informatie tekst.
 *
 * ## Gebruik
 * ```html
 * <ndd-tooltip text="Tooltip tekst"></ndd-tooltip>
 * ```
 */
export default {
	title: 'Components/Content/Tooltip',
	component: 'ndd-tooltip',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/tooltip/ndd-tooltip.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		text: {
			control: 'text',
			description: 'Tooltip text content',
		},
	},
	args: {
		text: 'Tooltip tekst',
	},
};

const Template = ({ text }) => html`
	<div style="padding: 2rem; display: flex; justify-content: center;">
		<ndd-tooltip text=${text}></ndd-tooltip>
	</div>
`;

export const Default = Template.bind({});
Default.args = {
	text: 'Dit is een tooltip',
};
