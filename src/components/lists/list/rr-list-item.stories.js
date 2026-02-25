import { html } from 'lit';
import './rr-list-item.js';
import '../title-cell/rr-title-cell.js';
import '../label-cell/rr-label-cell.js';

export default {
  title: 'Components/Lists/List Item',
  component: 'rr-list-item',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the list item',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the item is selected',
    },
  },
};

export const Default = {
  args: {
    size: 'md',
    selected: false,
  },
  render: (args) => html`
    <rr-list-item
      size=${args.size}
      ?selected=${args.selected}
      style="width: 300px;"
    >
      <rr-title-cell .color=${args.selected ? 'white' : 'default'}>List item content</rr-title-cell>
    </rr-list-item>
  `,
};

export const SizeMD = {
  render: () => html`
    <rr-list-item size="md" style="width: 300px; border: 1px dashed #ccc;">
      <rr-title-cell>Medium size item</rr-title-cell>
    </rr-list-item>
  `,
};

export const SizeSM = {
  render: () => html`
    <rr-list-item size="sm" style="width: 300px; border: 1px dashed #ccc;">
      <rr-title-cell size="sm">Small size item</rr-title-cell>
    </rr-list-item>
  `,
};

export const Selected = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <rr-list-item style="width: 300px;">
        <rr-title-cell>Not selected</rr-title-cell>
      </rr-list-item>
      <rr-list-item selected style="width: 300px;">
        <rr-title-cell color="white">Selected item</rr-title-cell>
      </rr-list-item>
    </div>
  `,
};

export const WithStartAndEndSlots = {
  render: () => html`
    <rr-list-item style="width: 400px; border: 1px dashed #ccc;">
      <div slot="start" style="width: 40px; height: 40px; background: #e0e0e0; border-radius: 8px;"></div>
      <rr-title-cell>Item with start and end content</rr-title-cell>
      <div slot="end" style="padding: 0 8px; color: #666;">→</div>
    </rr-list-item>
  `,
};
