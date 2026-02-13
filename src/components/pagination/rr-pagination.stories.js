import { html } from 'lit';
import './rr-pagination.ts';

/**
 * De Pagination component voor het navigeren tussen pagina's met inhoud.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1353-3779)
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1353-3779',
    },
    componentSource: {
      file: 'src/components/pagination/rr-pagination.ts',
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

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Pagination (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1353-3779" style="display: inline-block;">
        <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 16px; padding: 16px;">
          <div style="height: 44px;" aria-hidden="true"></div>
          <rr-pagination current-page="1" total-pages="10"></rr-pagination>
          <rr-pagination current-page="4" total-pages="10"></rr-pagination>
          <rr-pagination current-page="5" total-pages="10"></rr-pagination>
          <rr-pagination current-page="7" total-pages="10"></rr-pagination>
          <rr-pagination current-page="10" total-pages="10"></rr-pagination>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = 'Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = {
  controls: { disable: true },
};
