import { html } from 'lit';
import './rr-pagination.ts';

/**
 * De Pagination component voor het navigeren tussen pagina's met inhoud.
 *
 * ## Gebruik
 * ```html
 * <rr-pagination current-page="1" total-pages="10"></rr-pagination>
 * ```
 */
export default {
  title: 'Components/Navigation/Pagination',
  component: 'rr-pagination',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/navigation/pagination/rr-pagination.ts',
      repository: 'https://github.com/regelrecht/design-system',
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
  <rr-pagination
    current-page=${currentPage}
    total-pages=${totalPages}
    ?disabled=${disabled}
  ></rr-pagination>
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
