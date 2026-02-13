import { html } from 'lit';
import './rr-text-cell.js';

export default {
  title: 'Components/Lists/Text Cell',
  component: 'rr-text-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-41152',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Text cell size',
    },
    color: {
      control: 'select',
      options: ['default', 'secondary'],
      description: 'Color variant of the text',
    },
    horizontalAlignment: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Horizontal alignment of the text',
    },
    verticalAlignment: {
      control: 'select',
      options: ['center', 'top'],
      description: 'Vertical alignment of the cell',
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
    <rr-text-cell
      size=${args.size}
      color=${args.color}
      horizontal-alignment=${args.horizontalAlignment}
      vertical-alignment=${args.verticalAlignment}
    >
      Text cell
    </rr-text-cell>
  `,
};

export const Secondary = {
  render: () => html`
    <rr-text-cell color="secondary">Text cell (secondary)</rr-text-cell>
  `,
};

export const SmallSize = {
  render: () => html`
    <rr-text-cell size="sm">Text cell (small)</rr-text-cell>
  `,
};

export const AlignmentRight = {
  render: () => html`
    <rr-text-cell horizontal-alignment="right" style="width: 200px; border: 1px dashed #ccc;">
      Text cell
    </rr-text-cell>
  `,
};

export const VerticalTop = {
  render: () => html`
    <rr-text-cell vertical-alignment="top" style="height: 80px; border: 1px dashed #ccc;">
      Text cell (top)
    </rr-text-cell>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Individual variant comparisons (Code vs Figma). Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <!-- MD / default / left / center -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">md / default / left / center</span>
        <ftl-holster node="236:41153" style="display: inline-block;">
          <rr-text-cell size="md" color="default" horizontal-alignment="left" vertical-alignment="center">Text cell</rr-text-cell>
        </ftl-holster>
      </div>

      <!-- MD / default / right / center -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">md / default / right / center</span>
        <ftl-holster node="236:41160" style="display: inline-block;">
          <rr-text-cell size="md" color="default" horizontal-alignment="right" vertical-alignment="center">Text cell</rr-text-cell>
        </ftl-holster>
      </div>

      <!-- MD / default / left / top -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">md / default / left / top</span>
        <ftl-holster node="236:41167" style="display: inline-block;">
          <rr-text-cell size="md" color="default" horizontal-alignment="left" vertical-alignment="top">Text cell</rr-text-cell>
        </ftl-holster>
      </div>

      <!-- SM / default / left / center -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">sm / default / left / center</span>
        <ftl-holster node="236:41181" style="display: inline-block;">
          <rr-text-cell size="sm" color="default" horizontal-alignment="left" vertical-alignment="center">Text cell</rr-text-cell>
        </ftl-holster>
      </div>

      <!-- MD / secondary / left / center -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">md / secondary / left / center</span>
        <ftl-holster node="236:41209" style="display: inline-block;">
          <rr-text-cell size="md" color="secondary" horizontal-alignment="left" vertical-alignment="center">Text cell</rr-text-cell>
        </ftl-holster>
      </div>

      <!-- SM / secondary / right / center -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">sm / secondary / right / center</span>
        <ftl-holster node="236:41244" style="display: inline-block;">
          <rr-text-cell size="sm" color="secondary" horizontal-alignment="right" vertical-alignment="center">Text cell</rr-text-cell>
        </ftl-holster>
      </div>

      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
