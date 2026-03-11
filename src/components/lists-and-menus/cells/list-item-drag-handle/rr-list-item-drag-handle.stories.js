import { html } from 'lit';
import './rr-list-item-drag-handle.js';

export default {
  title: 'Components/Lists & Menus/Cells/List Item Drag Handle',
  component: 'rr-list-item-drag-handle',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Handle size',
    },
  },
};

export const Default = {
  args: {
    size: 'md',
  },
  render: (args) => html`
    <rr-list-item-drag-handle size=${args.size}></rr-list-item-drag-handle>
  `,
};

export const AllSizes = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <rr-list-item-drag-handle size="md"></rr-list-item-drag-handle>
        <span style="font-size: 0.75rem; color: #64748b;">MD</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <rr-list-item-drag-handle size="sm"></rr-list-item-drag-handle>
        <span style="font-size: 0.75rem; color: #64748b;">SM</span>
      </div>
    </div>
  `,
};
