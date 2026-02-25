import { html } from 'lit';
import './rr-label-cell.js';

export default {
  title: 'Components/Lists/Label Cell',
  component: 'rr-label-cell',
  tags: ['autodocs'],
  parameters: {
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
