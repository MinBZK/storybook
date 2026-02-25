import { html } from 'lit';
import './rr-icon-cell.js';

const placeholderIcon = (size = 24) => html`
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
  </svg>
`;

export default {
  title: 'Components/Lists/Icon Cell',
  component: 'rr-icon-cell',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['16', '20', '24', '32'],
      description: 'Icon size in pixels',
    },
    verticalAlignment: {
      control: 'select',
      options: ['center', 'top'],
      description: 'Vertical alignment of the icon',
    },
  },
};

export const Default = {
  args: {
    size: '24',
    verticalAlignment: 'center',
  },
  render: (args) => html`
    <rr-icon-cell
      size=${args.size}
      vertical-alignment=${args.verticalAlignment}
    >
      ${placeholderIcon(Number(args.size))}
    </rr-icon-cell>
  `,
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <rr-icon-cell size="16">${placeholderIcon(16)}</rr-icon-cell>
      <rr-icon-cell size="20">${placeholderIcon(20)}</rr-icon-cell>
      <rr-icon-cell size="24">${placeholderIcon(24)}</rr-icon-cell>
      <rr-icon-cell size="32">${placeholderIcon(32)}</rr-icon-cell>
    </div>
  `,
};

export const VerticalTop = {
  render: () => html`
    <rr-icon-cell vertical-alignment="top" size="24" style="height: 80px; border: 1px dashed #ccc;">
      ${placeholderIcon(24)}
    </rr-icon-cell>
  `,
};
