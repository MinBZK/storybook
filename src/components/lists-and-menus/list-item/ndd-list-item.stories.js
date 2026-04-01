import { html } from 'lit';
import './ndd-list-item.ts';
import '../list/ndd-list.ts';
import '../cells/text-cell/ndd-text-cell.ts';
import '../cells/spacer-cell/ndd-spacer-cell.ts';
import '../cells/drag-handle-cell/ndd-drag-handle-cell.ts';

export default {
	title: 'Components/Lists & Menus/List Item',
	component: 'ndd-list-item',
	tags: ['autodocs'],
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
		type: {
			control: 'select',
			options: [undefined, 'button', 'link'],
			description: 'Interactive mode of the list item',
		},
		href: {
			control: 'text',
			description: 'URL for type="link"',
		},
	},
};

export const Default = {
	args: {
		size: 'md',
		selected: false,
	},
	render: (args) => html`
		<ndd-list variant="simple">
			<ndd-list-item size=${args.size} ?selected=${args.selected} type=${args.type} href=${args.href}>
				<ndd-text-cell text="Text cell" supporting-text="Supporting text" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const SizeMD = {
	render: () => html`
		<ndd-list variant="simple">
			<ndd-list-item size="md">
				<ndd-text-cell text="Medium size item" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const SizeSM = {
	render: () => html`
		<ndd-list variant="simple">
			<ndd-list-item size="sm">
				<ndd-text-cell size="sm" text="Small size item" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const Selected = {
	render: () => html`
		<ndd-list variant="simple">
			<ndd-list-item>
				<ndd-text-cell text="Not selected" />
			</ndd-list-item>
			<ndd-list-item selected>
				<ndd-text-cell text="Selected item" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Not selected" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const TypeButton = {
	render: () => html`
		<ndd-list variant="simple">
			<ndd-list-item type="button">
				<ndd-text-cell text="Clickable button item" />
			</ndd-list-item>
			<ndd-list-item type="button">
				<ndd-text-cell text="Another button item" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const TypeLink = {
	render: () => html`
		<ndd-list variant="simple">
			<ndd-list-item type="link" href="/settings">
				<ndd-text-cell text="Settings" />
			</ndd-list-item>
			<ndd-list-item type="link" href="/profile">
				<ndd-text-cell text="Profile" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const BoxWithGutters = {
	render: () => html`
		<ndd-list variant="box">
			<ndd-list-item>
				<ndd-text-cell text="Gutters visible (spacer)" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Gutters visible (spacer)" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const WithStartAndEnd = {
	render: () => html`
		<ndd-list variant="box">
			<ndd-list-item>
				<ndd-spacer-cell slot="start" size="12"></ndd-spacer-cell>
				<div slot="start" style="width: 32px; height: 32px; background: var(--primitives-color-neutral-150); border-radius: 8px;"></div>
				<ndd-spacer-cell slot="start" size="8"></ndd-spacer-cell>
				<ndd-text-cell text="Item with start icon" />
				<ndd-spacer-cell slot="end" size="8"></ndd-spacer-cell>
				<ndd-icon-cell slot="end" size="16">
					<ndd-icon name="chevron-right"></ndd-icon>
				</ndd-icon-cell>
				<ndd-spacer-cell slot="end" size="12"></ndd-spacer-cell>
			</ndd-list-item>
			<ndd-list-item>
				<ndd-spacer-cell slot="start" size="12"></ndd-spacer-cell>
				<div slot="start" style="width: 32px; height: 32px; background: var(--primitives-color-neutral-150); border-radius: 8px;"></div>
				<ndd-spacer-cell slot="start" size="8"></ndd-spacer-cell>
				<ndd-text-cell text="Another item" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const SimpleWithEndOnly = {
	render: () => html`
		<ndd-list variant="simple">
			<ndd-list-item>
				<ndd-text-cell text="Only end slot filled" />
				<ndd-spacer-cell slot="end" size="8"></ndd-spacer-cell>
				<ndd-icon-cell slot="end" size="16">
					<ndd-icon name="chevron-right"></ndd-icon>
				</ndd-icon-cell>
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="No slots" />
			</ndd-list-item>
		</ndd-list>
	`,
};

/**
 * Voeg het `draggable-only` attribuut toe aan `ndd-drag-handle-cell` zodat
 * `ndd-list` de hendel herkent in het composed event path. Zonder dit attribuut
 * werkt slepen via pointer en toetsenbord niet.
 */
export const WithDragHandle = {
	render: () => html`
		<ndd-list variant="box" reorderable>
			<ndd-list-item>
				<ndd-spacer-cell slot="start" size="12"></ndd-spacer-cell>
				<ndd-drag-handle-cell
					size="sm"
					slot="start"
					draggable-only
				></ndd-drag-handle-cell>
				<ndd-spacer-cell
					slot="start"
					draggable-only
					size="8"
				></ndd-spacer-cell>
				<ndd-text-cell text="Versleepbaar item" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-spacer-cell slot="start" size="12"></ndd-spacer-cell>
				<ndd-drag-handle-cell
					size="sm"
					slot="start"
					draggable-only
				></ndd-drag-handle-cell>
				<ndd-spacer-cell
					slot="start"
					draggable-only
					size="8"
				></ndd-spacer-cell>
				<ndd-text-cell text="Nog een item" />
			</ndd-list-item>
		</ndd-list>
	`,
};
WithDragHandle.parameters = { controls: { disable: true } };
