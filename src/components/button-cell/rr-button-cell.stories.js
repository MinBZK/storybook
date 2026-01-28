import { html } from 'lit';
import './rr-button-cell.js';
import '../button/rr-button.js';

export default {
  title: 'Components/Button Cell',
  component: 'rr-button-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-41331',
    },
  },
  argTypes: {
    verticalAlignment: {
      control: 'select',
      options: ['top', 'center'],
      description: 'Vertical alignment of the button',
    },
  },
};

export const Default = {
  args: {
    verticalAlignment: 'center',
  },
  render: (args) => html`
    <rr-button-cell
      vertical-alignment=${args.verticalAlignment}
      style="height: 100px; border: 1px dashed #ccc;"
    >
      <rr-button variant="neutral-tinted">Button</rr-button>
    </rr-button-cell>
  `,
};

export const AlignmentTop = {
  render: () => html`
    <rr-button-cell vertical-alignment="top" style="height: 100px; border: 1px dashed #ccc;">
      <rr-button variant="neutral-tinted">Button</rr-button>
    </rr-button-cell>
  `,
};

export const AlignmentCenter = {
  render: () => html`
    <rr-button-cell vertical-alignment="center" style="height: 100px; border: 1px dashed #ccc;">
      <rr-button variant="neutral-tinted">Button</rr-button>
    </rr-button-cell>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our button cells (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="236:41331" style="display: inline-block;">
        <!--
          Figma button-cell (236:41331) component set:
          - Layout: column, gap: 16px, padding: 16px
          - 2 variants: vertical-alignment (center/top)
          - Button uses neutral-tinted style, md size
        -->
        <div style="background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;">
          <rr-button-cell vertical-alignment="center">
            <rr-button variant="neutral-tinted" size="m">Button</rr-button>
          </rr-button-cell>
          <rr-button-cell vertical-alignment="top">
            <rr-button variant="neutral-tinted" size="m">Button</rr-button>
          </rr-button-cell>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
