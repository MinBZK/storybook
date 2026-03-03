import { html } from 'lit';
import './rr-list-item-drag-handle-cell.js';
import '../list-item-drag-handle/rr-list-item-drag-handle.js';

export default {
  title: 'Components/Lists & Menus/Cells/List Item Drag Handle Cell',
  component: 'rr-list-item-drag-handle-cell',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    verticalAlignment: {
      control: 'select',
      options: ['center', 'top'],
      description: 'Vertical alignment of the drag handle',
    },
  },
};

export const Default = {
  args: {
    verticalAlignment: 'center',
  },
  render: (args) => html`
    <rr-list-item-drag-handle-cell vertical-alignment=${args.verticalAlignment}>
      <rr-list-item-drag-handle size="md"></rr-list-item-drag-handle>
    </rr-list-item-drag-handle-cell>
  `,
};

export const VerticalTop = {
  render: () => html`
    <rr-list-item-drag-handle-cell vertical-alignment="top" style="height: 80px; border: 1px dashed #ccc;">
      <rr-list-item-drag-handle size="md"></rr-list-item-drag-handle>
    </rr-list-item-drag-handle-cell>
  `,
};
