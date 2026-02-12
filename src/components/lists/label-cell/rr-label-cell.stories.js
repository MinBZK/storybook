import { html } from 'lit';
import './rr-label-cell.js';

export default {
  title: 'Components/Lists/Label Cell',
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
        Individual variant comparisons (Code vs Figma). Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <!-- Default color, left alignment -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">default / left</span>
        <ftl-holster node="1033:4448" style="display: inline-block;">
          <rr-label-cell color="default" horizontal-alignment="left">Label cell</rr-label-cell>
        </ftl-holster>
      </div>

      <!-- Default color, right alignment -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">default / right</span>
        <ftl-holster node="1033:4455" style="display: inline-block;">
          <rr-label-cell color="default" horizontal-alignment="right">Label cell</rr-label-cell>
        </ftl-holster>
      </div>

      <!-- White color, left alignment -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">white / left</span>
        <ftl-holster node="1033:4560" style="display: inline-block; background: #333a45;">
          <rr-label-cell color="white" horizontal-alignment="left">Label cell</rr-label-cell>
        </ftl-holster>
      </div>

      <!-- White color, right alignment -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">white / right</span>
        <ftl-holster node="1033:4567" style="display: inline-block; background: #333a45;">
          <rr-label-cell color="white" horizontal-alignment="right">Label cell</rr-label-cell>
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
