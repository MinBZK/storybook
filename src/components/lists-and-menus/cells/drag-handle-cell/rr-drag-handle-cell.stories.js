import { html } from 'lit';
import './rr-drag-handle-cell.js';

export default {
  title: 'Components/Lists & Menus/Cells/Drag Handle Cell',
  component: 'rr-drag-handle-cell',
  tags: ['autodocs'],
  argTypes: {
	size: {
	  control: 'select',
	  options: ['md', 'sm'],
	  description: 'Handle size',
	  table: {
		defaultValue: { summary: 'md' },
	  },
	},
  },
};

export const Default = {
  args: {
	size: 'md',
  },
  render: (args) => html`
	<rr-drag-handle-cell size=${args.size}></rr-drag-handle-cell>
  `,
};

export const AllSizes = {
  render: () => html`
	<div style="display: flex; gap: 16px; align-items: center;">
	  <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
		<rr-drag-handle-cell size="md"></rr-drag-handle-cell>
		<span style="font-size: 0.75rem; color: #64748b;">MD</span>
	  </div>
	  <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
		<rr-drag-handle-cell size="sm"></rr-drag-handle-cell>
		<span style="font-size: 0.75rem; color: #64748b;">SM</span>
	  </div>
	</div>
  `,
};
