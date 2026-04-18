import { html } from 'lit';
import './ndd-drag-handle-cell.ts';

export default {
	title: 'Components/Lists & Menus/Cells/Drag Handle Cell',
	component: 'ndd-drag-handle-cell',
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
		<ndd-drag-handle-cell size=${args.size}></ndd-drag-handle-cell>
	`,
};

export const AllSizes = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
				<ndd-drag-handle-cell size="md"></ndd-drag-handle-cell>
				<span style="font-size: 0.75rem; color: var(--semantics-content-color);">MD</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
				<ndd-drag-handle-cell size="sm"></ndd-drag-handle-cell>
				<span style="font-size: 0.75rem; color: var(--semantics-content-color);">SM</span>
			</div>
		</div>
	`,
};
