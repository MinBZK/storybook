import { html } from 'lit';
import './rr-title-cell.js';

export default {
  title: 'Components/Lists/Title Cell',
  component: 'rr-title-cell',
  tags: ['autodocs'],
  parameters: {
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
