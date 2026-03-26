import { html } from 'lit';
import './rr-icon-cell.ts';
import { ICONS } from '../../../content/icon/rr-icon.ts';

export default {
  title: 'Components/Lists & Menus/Cells/Icon Cell',
  component: 'rr-icon-cell',
  tags: ['autodocs'],
  argTypes: {
    verticalAlignment: {
      control: 'select',
      options: ['center', 'top'],
      description: 'Vertical alignment of the icon',
    },
    size: {
      control: 'select',
      options: ['16', '20', '24', '32'],
      description: 'Icon size in pixels',
    },
    selected: {
      control: 'boolean',
      description: 'Selected state',
    },
    icon: {
      control: 'select',
      options: ICONS,
      description: 'Icon to display',
    },
  },
};

export const Default = {
  args: {
    size: '24',
    verticalAlignment: 'center',
    selected: false,
    icon: 'icon-placeholder',
  },
  render: (args) => html`
    <rr-icon-cell
      vertical-alignment=${args.verticalAlignment}
      size=${args.size}
      ?selected=${args.selected}
    >
      <rr-icon name=${args.icon}></rr-icon>
    </rr-icon-cell>
  `,
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <rr-icon-cell size="16">
        <rr-icon name="icon-placeholder"></rr-icon>
      </rr-icon-cell>
      <rr-icon-cell size="20">
        <rr-icon name="icon-placeholder"></rr-icon>
      </rr-icon-cell>
      <rr-icon-cell size="24">
        <rr-icon name="icon-placeholder"></rr-icon>
      </rr-icon-cell>
      <rr-icon-cell size="32">
        <rr-icon name="icon-placeholder"></rr-icon>
      </rr-icon-cell>
    </div>
  `,
};

export const Selected = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <rr-icon-cell size="24">
        <rr-icon name="icon-placeholder"></rr-icon>
      </rr-icon-cell>
      <rr-icon-cell size="24" selected>
        <rr-icon name="icon-placeholder"></rr-icon>
      </rr-icon-cell>
    </div>
  `,
};

export const VerticalTop = {
  render: () => html`
    <rr-icon-cell
      vertical-alignment="top"
      size="24"
      style="height: 80px; border: 1px dashed var(--primitives-color-neutral-150);"
    >
      <rr-icon name="icon-placeholder"></rr-icon>
    </rr-icon-cell>
  `,
};
