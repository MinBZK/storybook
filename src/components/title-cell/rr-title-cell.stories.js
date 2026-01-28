import { html } from 'lit';
import './rr-title-cell.js';

export default {
  title: 'Components/Title Cell',
  component: 'rr-title-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-41079',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the title cell',
    },
    color: {
      control: 'select',
      options: ['default', 'white'],
      description: 'Color variant of the title text',
    },
    horizontalAlignment: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Horizontal alignment of the title',
    },
    verticalAlignment: {
      control: 'select',
      options: ['top', 'center'],
      description: 'Vertical alignment of the title',
    },
  },
};

export const Default = {
  args: {
    size: 'md',
    color: 'default',
    horizontalAlignment: 'left',
    verticalAlignment: 'center',
  },
  render: (args) => html`
    <rr-title-cell
      size=${args.size}
      color=${args.color}
      horizontal-alignment=${args.horizontalAlignment}
      vertical-alignment=${args.verticalAlignment}
    >
      Title cell
    </rr-title-cell>
  `,
};

export const SizeMD = {
  args: { size: 'md' },
  render: (args) => html`<rr-title-cell size=${args.size}>Title cell (MD)</rr-title-cell>`,
};

export const SizeSM = {
  args: { size: 'sm' },
  render: (args) => html`<rr-title-cell size=${args.size}>Title cell (SM)</rr-title-cell>`,
};

export const AlignmentRight = {
  render: () => html`
    <rr-title-cell horizontal-alignment="right" style="width: 200px; border: 1px dashed #ccc;">
      Title cell
    </rr-title-cell>
  `,
};

export const ColorWhite = {
  render: () => html`
    <div style="background: #154273; padding: 16px;">
      <rr-title-cell color="white">Title cell (White)</rr-title-cell>
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
        Our title cells (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="236:41079" style="display: inline-block;">
        <!--
          Figma title-cell (236:41079) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Fixed width: 308px
          - 16 variants: 2 sizes (md/sm) x 2 colors (default/white) x 2 h-align x 2 v-align
          - MD height: ~23px, SM height: ~20px per variant
        -->
        <div style="width: 308px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;">
          <!-- MD, default color variants -->
          <rr-title-cell size="md" vertical-alignment="center" horizontal-alignment="left">Title cell</rr-title-cell>
          <rr-title-cell size="md" vertical-alignment="center" horizontal-alignment="right">Title cell</rr-title-cell>
          <rr-title-cell size="md" vertical-alignment="top" horizontal-alignment="left">Title cell</rr-title-cell>
          <rr-title-cell size="md" vertical-alignment="top" horizontal-alignment="right">Title cell</rr-title-cell>

          <!-- SM, default color variants -->
          <rr-title-cell size="sm" vertical-alignment="center" horizontal-alignment="left">Title cell</rr-title-cell>
          <rr-title-cell size="sm" vertical-alignment="center" horizontal-alignment="right">Title cell</rr-title-cell>
          <rr-title-cell size="sm" vertical-alignment="top" horizontal-alignment="left">Title cell</rr-title-cell>
          <rr-title-cell size="sm" vertical-alignment="top" horizontal-alignment="right">Title cell</rr-title-cell>

          <!-- MD, white color variants (no background in Figma - white text on transparent) -->
          <rr-title-cell size="md" color="white" vertical-alignment="center" horizontal-alignment="left">Title cell</rr-title-cell>
          <rr-title-cell size="md" color="white" vertical-alignment="center" horizontal-alignment="right">Title cell</rr-title-cell>
          <rr-title-cell size="md" color="white" vertical-alignment="top" horizontal-alignment="left">Title cell</rr-title-cell>
          <rr-title-cell size="md" color="white" vertical-alignment="top" horizontal-alignment="right">Title cell</rr-title-cell>

          <!-- SM, white color variants -->
          <rr-title-cell size="sm" color="white" vertical-alignment="center" horizontal-alignment="left">Title cell</rr-title-cell>
          <rr-title-cell size="sm" color="white" vertical-alignment="center" horizontal-alignment="right">Title cell</rr-title-cell>
          <rr-title-cell size="sm" color="white" vertical-alignment="top" horizontal-alignment="left">Title cell</rr-title-cell>
          <rr-title-cell size="sm" color="white" vertical-alignment="top" horizontal-alignment="right">Title cell</rr-title-cell>
          </div>
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
