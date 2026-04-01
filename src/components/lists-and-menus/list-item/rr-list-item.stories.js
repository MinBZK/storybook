import { html } from 'lit';
import './rr-list-item.ts';
import '../list/rr-list.ts';
import '../cells/text-cell/rr-text-cell.ts';
import '../cells/spacer-cell/rr-spacer-cell.ts';
import '../cells/drag-handle-cell/rr-drag-handle-cell.ts';

export default {
	title: 'Components/Lists & Menus/List Item',
	component: 'rr-list-item',
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
		<rr-list variant="simple">
			<rr-list-item size=${args.size} ?selected=${args.selected} type=${args.type} href=${args.href}>
				<rr-text-cell text="Text cell" supporting-text="Supporting text" />
			</rr-list-item>
		</rr-list>
	`,
};

export const SizeMD = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item size="md">
				<rr-text-cell text="Medium size item" />
			</rr-list-item>
		</rr-list>
	`,
};

export const SizeSM = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item size="sm">
				<rr-text-cell size="sm" text="Small size item" />
			</rr-list-item>
		</rr-list>
	`,
};

export const Selected = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item>
				<rr-text-cell text="Not selected" />
			</rr-list-item>
			<rr-list-item selected>
				<rr-text-cell text="Selected item" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Not selected" />
			</rr-list-item>
		</rr-list>
	`,
};

export const TypeButton = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item type="button">
				<rr-text-cell text="Clickable button item" />
			</rr-list-item>
			<rr-list-item type="button">
				<rr-text-cell text="Another button item" />
			</rr-list-item>
		</rr-list>
	`,
};

export const TypeLink = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item type="link" href="/settings">
				<rr-text-cell text="Settings" />
			</rr-list-item>
			<rr-list-item type="link" href="/profile">
				<rr-text-cell text="Profile" />
			</rr-list-item>
		</rr-list>
	`,
};

export const BoxWithGutters = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
				<rr-text-cell text="Gutters visible (spacer)" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Gutters visible (spacer)" />
			</rr-list-item>
		</rr-list>
	`,
};

export const WithStartAndEnd = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
				<rr-spacer-cell slot="start" size="12"></rr-spacer-cell>
				<div slot="start" style="width: 32px; height: 32px; background: var(--primitives-color-neutral-150); border-radius: 8px;"></div>
				<rr-spacer-cell slot="start" size="8"></rr-spacer-cell>
				<rr-text-cell text="Item with start icon" />
				<rr-spacer-cell slot="end" size="8"></rr-spacer-cell>
				<rr-icon-cell slot="end" size="16">
					<rr-icon name="chevron-right"></rr-icon>
				</rr-icon-cell>
				<rr-spacer-cell slot="end" size="12"></rr-spacer-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-spacer-cell slot="start" size="12"></rr-spacer-cell>
				<div slot="start" style="width: 32px; height: 32px; background: var(--primitives-color-neutral-150); border-radius: 8px;"></div>
				<rr-spacer-cell slot="start" size="8"></rr-spacer-cell>
				<rr-text-cell text="Another item" />
			</rr-list-item>
		</rr-list>
	`,
};

export const SimpleWithEndOnly = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item>
				<rr-text-cell text="Only end slot filled" />
				<rr-spacer-cell slot="end" size="8"></rr-spacer-cell>
				<rr-icon-cell slot="end" size="16">
					<rr-icon name="chevron-right"></rr-icon>
				</rr-icon-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="No slots" />
			</rr-list-item>
		</rr-list>
	`,
};

/**
 * Voeg het `draggable-only` attribuut toe aan `rr-drag-handle-cell` zodat
 * `rr-list` de hendel herkent in het composed event path. Zonder dit attribuut
 * werkt slepen via pointer en toetsenbord niet.
 */
export const WithDragHandle = {
	render: () => html`
		<rr-list variant="box" reorderable>
			<rr-list-item>
				<rr-spacer-cell slot="start" size="12"></rr-spacer-cell>
				<rr-drag-handle-cell
					size="sm"
					slot="start"
					draggable-only
				></rr-drag-handle-cell>
				<rr-spacer-cell
					slot="start"
					draggable-only
					size="8"
				></rr-spacer-cell>
				<rr-text-cell text="Versleepbaar item" />
			</rr-list-item>
			<rr-list-item>
				<rr-spacer-cell slot="start" size="12"></rr-spacer-cell>
				<rr-drag-handle-cell
					size="sm"
					slot="start"
					draggable-only
				></rr-drag-handle-cell>
				<rr-spacer-cell
					slot="start"
					draggable-only
					size="8"
				></rr-spacer-cell>
				<rr-text-cell text="Nog een item" />
			</rr-list-item>
		</rr-list>
	`,
};
WithDragHandle.parameters = { controls: { disable: true } };
