import { html } from 'lit';
import './rr-text-cell.js';

export default {
  title: 'Components/Lists/Text Cell',
  component: 'rr-text-cell',
  tags: ['autodocs'],
  parameters: {
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
