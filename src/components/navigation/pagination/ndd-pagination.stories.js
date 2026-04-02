import { html } from 'lit';
import './ndd-pagination.ts';

/**
 * De Pagination component voor het navigeren tussen pagina's met inhoud.
 *
 * ## Gebruik
 * ```html
 * <ndd-pagination current-page="1" total-pages="10"></ndd-pagination>
 * ```
 */
export default {
	title: 'Components/Navigation/Pagination',
	component: 'ndd-pagination',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/navigation/pagination/ndd-pagination.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		currentPage: {
			control: { type: 'number', min: 1 },
			description: 'Currently active page (1-based)',
			table: {
				defaultValue: { summary: 1 },
			},
		},
		totalPages: {
			control: { type: 'number', min: 1 },
			description: 'Total number of pages',
			table: {
				defaultValue: { summary: 1 },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
			table: {
				defaultValue: { summary: false },
			},
		},
	},
	args: {
		currentPage: 1,
		totalPages: 10,
		disabled: false,
	},
};

const Template = ({ currentPage, totalPages, disabled }) => html`
	<ndd-pagination
		current-page=${currentPage}
		total-pages=${totalPages}
		?disabled=${disabled}
	></ndd-pagination>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
	currentPage: 1,
	totalPages: 10,
};

// Many pages
export const ManyPages = Template.bind({});
ManyPages.args = {
	currentPage: 25,
	totalPages: 100,
};
