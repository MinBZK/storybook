import { html, nothing } from 'lit';
import './list-item.ts';
import '../list/list.ts';
import '../cells/text-cell/text-cell.ts';
import '../cells/spacer-cell/spacer-cell.ts';
import '../cells/drag-handle-cell/drag-handle-cell.ts';

export default {
	title: 'Components/Lists & Menus/List Item',
	component: 'nldd-list-item',
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Size of the list item',
			table: { defaultValue: { summary: 'md' } },
		},
		selected: {
			control: 'boolean',
			description: 'Whether the item is selected',
			table: { defaultValue: { summary: 'false' } },
		},
		highlighted: {
			control: 'boolean',
			description: 'Whether the item is highlighted (high contrast accent)',
			table: { defaultValue: { summary: 'false' } },
		},
		type: {
			control: 'select',
			options: ['', 'button'],
			description: 'Interactive mode of the list item',
			table: { defaultValue: { summary: '-' } },
		},
		href: {
			control: 'text',
			description: 'Wanneer gezet, wordt het item als link gerenderd in plaats van het opgegeven type',
		},
	},
};

export const Default = {
	args: {
		size: 'md',
		selected: false,
		highlighted: false,
		type: '',
		href: '',
	},
	render: (args) => html`
		<nldd-list variant="simple">
			<nldd-list-item size=${args.size} ?selected=${args.selected} ?highlighted=${args.highlighted} type=${args.type || nothing} href=${args.href || nothing}>
				<nldd-text-cell text="Text cell" supporting-text="Supporting text" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const SizeMD = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item size="md">
				<nldd-text-cell text="Medium size item" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const SizeSM = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item size="sm">
				<nldd-text-cell size="sm" text="Small size item" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const Selected = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item>
				<nldd-text-cell text="Not selected" />
			</nldd-list-item>
			<nldd-list-item selected>
				<nldd-text-cell text="Selected item" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Not selected" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const TypeButton = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item type="button">
				<nldd-text-cell text="Clickable button item" />
			</nldd-list-item>
			<nldd-list-item type="button">
				<nldd-text-cell text="Another button item" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const TypeLink = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item href="/settings">
				<nldd-text-cell text="Settings" />
			</nldd-list-item>
			<nldd-list-item href="/profile">
				<nldd-text-cell text="Profile" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const BoxWithGutters = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item>
				<nldd-text-cell text="Gutters visible (spacer)" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Gutters visible (spacer)" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const WithStartAndEnd = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item>
				<nldd-spacer-cell slot="start" size="12"></nldd-spacer-cell>
				<div slot="start" style="width: 32px; height: 32px; background: var(--primitives-color-neutral-150); border-radius: 8px;"></div>
				<nldd-spacer-cell slot="start" size="8"></nldd-spacer-cell>
				<nldd-text-cell text="Item with start icon" />
				<nldd-spacer-cell slot="end" size="8"></nldd-spacer-cell>
				<nldd-icon-cell slot="end" size="16">
					<nldd-icon name="chevron-right"></nldd-icon>
				</nldd-icon-cell>
				<nldd-spacer-cell slot="end" size="12"></nldd-spacer-cell>
			</nldd-list-item>
			<nldd-list-item>
				<nldd-spacer-cell slot="start" size="12"></nldd-spacer-cell>
				<div slot="start" style="width: 32px; height: 32px; background: var(--primitives-color-neutral-150); border-radius: 8px;"></div>
				<nldd-spacer-cell slot="start" size="8"></nldd-spacer-cell>
				<nldd-text-cell text="Another item" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const SimpleWithEndOnly = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item>
				<nldd-text-cell text="Only end slot filled" />
				<nldd-spacer-cell slot="end" size="8"></nldd-spacer-cell>
				<nldd-icon-cell slot="end" size="16">
					<nldd-icon name="chevron-right"></nldd-icon>
				</nldd-icon-cell>
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="No slots" />
			</nldd-list-item>
		</nldd-list>
	`,
};

/**
 * Voeg het `draggable-only` attribuut toe aan `nldd-drag-handle-cell` zodat
 * `nldd-list` de hendel herkent in het composed event path. Zonder dit attribuut
 * werkt slepen via pointer en toetsenbord niet.
 */
export const WithDragHandle = {
	render: () => html`
		<nldd-list variant="box" reorderable>
			<nldd-list-item>
				<nldd-spacer-cell slot="start" size="12"></nldd-spacer-cell>
				<nldd-drag-handle-cell
					size="sm"
					slot="start"
					draggable-only
				></nldd-drag-handle-cell>
				<nldd-spacer-cell
					slot="start"
					draggable-only
					size="8"
				></nldd-spacer-cell>
				<nldd-text-cell text="Versleepbaar item" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-spacer-cell slot="start" size="12"></nldd-spacer-cell>
				<nldd-drag-handle-cell
					size="sm"
					slot="start"
					draggable-only
				></nldd-drag-handle-cell>
				<nldd-spacer-cell
					slot="start"
					draggable-only
					size="8"
				></nldd-spacer-cell>
				<nldd-text-cell text="Nog een item" />
			</nldd-list-item>
		</nldd-list>
	`,
};
WithDragHandle.parameters = { controls: { disable: true } };
