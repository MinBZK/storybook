import { html, nothing, render } from 'lit';
import './list-item.js';
import '../list/list.js';
import '../cells/text-cell/text-cell.js';
import '../cells/spacer-cell/spacer-cell.js';
import '../cells/icon-cell/icon-cell.js';
import '../cells/drag-handle-cell/drag-handle-cell.js';
import '../../content/icon/icon.js';

export default {
	title: 'Components/Lists & Tables/List Item',
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
		href: {
			control: 'text',
			description: 'Maakt het hele item een link',
		},
		button: {
			control: 'boolean',
			description: 'Maakt het hele item een button; genegeerd als href is gezet',
			table: { defaultValue: { summary: false } },
		},
	},
};

export const Default = {
	args: {
		size: 'md',
		selected: false,
		href: '',
		button: false,
	},
	render: (args: Record<string, any>) => html`
		<nldd-list variant="simple">
			<nldd-list-item size=${args.size} ?selected=${args.selected} href=${args.href || nothing} ?button=${args.button}>
				<nldd-text-cell text="Text cell" supporting-text="Supporting text"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const SizeMD = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item size="md">
				<nldd-text-cell text="Medium size item"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const SizeSM = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item size="sm">
				<nldd-text-cell size="sm" text="Small size item"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const Selected = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item>
				<nldd-text-cell text="Not selected"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item selected>
				<nldd-text-cell text="Selected item"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Not selected"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const AlsButton = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item button>
				<nldd-text-cell text="Clickable button item"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item button>
				<nldd-text-cell text="Another button item"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const AlsLink = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item href="/settings">
				<nldd-text-cell text="Settings"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item href="/profile">
				<nldd-text-cell text="Profile"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const BoxWithGutters = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item>
				<nldd-text-cell text="Gutters visible (spacer)"></nldd-text-cell>
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Gutters visible (spacer)"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const WithLeadingAndTrailingCells = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item>
				<div style="width: 32px; height: 32px; background: var(--primitives-color-neutral-150); border-radius: 8px;"></div>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-text-cell text="Item with start icon"></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-icon-cell size="16">
					<nldd-icon name="chevron-right"></nldd-icon>
				</nldd-icon-cell>
			</nldd-list-item>
			<nldd-list-item>
				<div style="width: 32px; height: 32px; background: var(--primitives-color-neutral-150); border-radius: 8px;"></div>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-text-cell text="Another item"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const SimpleWithTrailingCells = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item>
				<nldd-text-cell text="Trailing cells"></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-icon-cell size="16">
					<nldd-icon name="chevron-right"></nldd-icon>
				</nldd-icon-cell>
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Alleen tekst"></nldd-text-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

/**
 * Voeg het `reorderable-only` attribuut toe aan `nldd-drag-handle-cell` zodat
 * `nldd-list` de hendel herkent in het composed event path. Zonder dit attribuut
 * werkt slepen via pointer en toetsenbord niet.
 */
export const WithDragHandle = {
	// Imperative render: the nldd-reorder handler mutates the DOM in place so
	// keyboard + pointer drag actually move items. A standard Storybook render
	// function can't do this because Lit templates are stateless.
	render: () => {
		const onReorder = (e: Record<string, any>) => {
			const list = e.currentTarget;
			const { fromIndex, toIndex } = e.detail;
			const items = [...list.querySelectorAll('nldd-list-item')];
			const moved = items[fromIndex];
			if (toIndex === 0) {
				items[0].before(moved);
			} else {
				const ref = items.filter((_, i) => i !== fromIndex)[toIndex - 1];
				ref.after(moved);
			}
		};

		const el = document.createElement('div');
		render(html`
			<nldd-list variant="box" reorderable @nldd-reorder=${onReorder}>
				<nldd-list-item>
					<nldd-drag-handle-cell size="sm" reorderable-only></nldd-drag-handle-cell>
					<nldd-spacer-cell reorderable-only size="8"></nldd-spacer-cell>
					<nldd-text-cell text="Versleepbaar item"></nldd-text-cell>
				</nldd-list-item>
				<nldd-list-item>
					<nldd-drag-handle-cell size="sm" reorderable-only></nldd-drag-handle-cell>
					<nldd-spacer-cell reorderable-only size="8"></nldd-spacer-cell>
					<nldd-text-cell text="Nog een item"></nldd-text-cell>
				</nldd-list-item>
			</nldd-list>
		`, el);
		return el;
	},
	parameters: { controls: { disable: true } },
};

/**
 * Cells kunnen via `hide-below` en `hide-above` verschijnen of verdwijnen op
 * basis van de breedte van het list-item zelf. Maak het browservenster smaller
 * om het effect te zien: de secundaire tekst verdwijnt onder 600px, de trailing
 * chevron onder 480px.
 */
export const ResponsiveCells = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item>
				<nldd-icon-cell><nldd-icon name="file-text"></nldd-icon></nldd-icon-cell>
				<nldd-spacer-cell size="12"></nldd-spacer-cell>
				<nldd-text-cell text="Begroting 2026"></nldd-text-cell>
				<nldd-spacer-cell size="12"></nldd-spacer-cell>
				<nldd-text-cell width="fit-content" color="secondary" text="Gewijzigd 2 uur geleden" hide-below="480px"></nldd-text-cell>
				<nldd-spacer-cell size="8" hide-below="280px"></nldd-spacer-cell>
				<nldd-icon-cell hide-below="280px"><nldd-icon name="chevron-right-small"></nldd-icon></nldd-icon-cell>
			</nldd-list-item>
			<nldd-list-item>
				<nldd-icon-cell><nldd-icon name="folder"></nldd-icon></nldd-icon-cell>
				<nldd-spacer-cell size="12"></nldd-spacer-cell>
				<nldd-text-cell text="Projecten"></nldd-text-cell>
				<nldd-spacer-cell size="12"></nldd-spacer-cell>
				<nldd-text-cell width="fit-content" color="secondary" text="Gisteren" hide-below="480px"></nldd-text-cell>
				<nldd-spacer-cell size="8" hide-below="280px"></nldd-spacer-cell>
				<nldd-icon-cell hide-below="280px"><nldd-icon name="chevron-right-small"></nldd-icon></nldd-icon-cell>
			</nldd-list-item>
		</nldd-list>
	`,
	parameters: { controls: { disable: true } },
};
