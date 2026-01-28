import { html } from 'lit';
import './rr-label-cell.js';

export default {
  title: 'Components/Label Cell',
  component: 'rr-label-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1033-4433',
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'white'],
      description: 'Color variant of the label text',
    },
    horizontalAlignment: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Horizontal alignment of the label',
    },
  },
};

export const Default = {
  args: {
    color: 'default',
    horizontalAlignment: 'left',
  },
  render: (args) => html`
    <rr-label-cell
      color=${args.color}
      horizontal-alignment=${args.horizontalAlignment}
    >
      Label cell
    </rr-label-cell>
  `,
};

export const AlignmentRight = {
  render: () => html`
    <rr-label-cell horizontal-alignment="right" style="width: 200px; border: 1px dashed #ccc;">
      Label cell
    </rr-label-cell>
  `,
};

export const ColorWhite = {
  render: () => html`
    <div style="background: #154273; padding: 16px;">
      <rr-label-cell color="white">Label cell (White)</rr-label-cell>
    </div>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our label cells (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1033:4433" style="display: inline-block;">
        <!--
          Figma label-cell (1033:4433) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Fixed width: 308px
          - 4 variants: 2 colors (default/white) x 2 h-align (left/right)
        -->
        <div style="width: 308px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;">
          <!-- Default color variants -->
          <rr-label-cell horizontal-alignment="left">Label cell</rr-label-cell>
          <rr-label-cell horizontal-alignment="right">Label cell</rr-label-cell>

          <!-- White color variants (no background in Figma - white text on transparent) -->
          <rr-label-cell color="white" horizontal-alignment="left">Label cell</rr-label-cell>
          <rr-label-cell color="white" horizontal-alignment="right">Label cell</rr-label-cell>
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
