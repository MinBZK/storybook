import { html, render } from 'lit';
import './list.js';
import '../list-item/list-item.js';
import '../cells/title-cell/title-cell.js';
import '../cells/text-cell/text-cell.js';
import '../cells/spacer-cell/spacer-cell.js';
import '../cells/icon-cell/icon-cell.js';
import '../cells/drag-handle-cell/drag-handle-cell.js';
import '../../content/icon/icon.js';
import '../../content/title/title.js';
import '../../content/rich-text/rich-text.js';

export default {
	title: 'Components/Lists & Menus/List',
	component: 'nldd-list',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['simple', 'box', 'box-on-tinted'],
			description: 'Visual style of the list',
			table: { defaultValue: { summary: 'simple' } },
		},
		'no-dividers': {
			control: 'boolean',
			description: 'Hides dividers between list items',
			table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
		},
	},
};

export const Default = {
	args: {
		variant: 'simple',
		'no-dividers': false,
	},
	render: (args) => html`
		<nldd-list variant=${args.variant} ?no-dividers=${args['no-dividers']}>
			<nldd-list-item>
				<nldd-text-cell text="Item 1" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Item 2" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Item 3" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const VariantSimple = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item>
				<nldd-text-cell text="Simple list item 1" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Simple list item 2" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Simple list item 3" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const VariantBox = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item>
				<nldd-text-cell text="Box list item 1" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Box list item 2" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Box list item 3" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const VariantBoxOnTinted = {
	render: () => html`
		<div style="background: var(--semantics-surfaces-tinted-background-color); padding: 24px;">
			<nldd-list variant="box-on-tinted">
				<nldd-list-item>
					<nldd-text-cell text="Box-on-tinted item 1"></nldd-text-cell>
				</nldd-list-item>
				<nldd-list-item>
					<nldd-text-cell text="Box-on-tinted item 2"></nldd-text-cell>
				</nldd-list-item>
				<nldd-list-item>
					<nldd-text-cell text="Box-on-tinted item 3"></nldd-text-cell>
				</nldd-list-item>
			</nldd-list>
		</div>
	`,
};

export const WithHeaderAndFooter = {
	render: () => html`
		<div style="container-type: inline-size; container-name: layout-area;">
			<nldd-list variant="box">
				<nldd-title slot="header" size="4">
					<h5>Notifications</h5>
				</nldd-title>
				<nldd-list-item>
					<nldd-text-cell text="Allow notifications" />
				</nldd-list-item>
				<nldd-list-item>
					<nldd-text-cell text="Sounds" />
				</nldd-list-item>
				<nldd-list-item>
					<nldd-text-cell text="Badges" />
				</nldd-list-item>
				<nldd-rich-text slot="footer">
					<p>Notifications will only be sent when the app is active on your device.</p>
				</nldd-rich-text>
			</nldd-list>
		</div>
	`,
};

const handleSelectionClick = (e) => {
	const item = e.target.closest('nldd-list-item');
	if (!item) return;
	const list = item.closest('nldd-list');
	list.querySelectorAll('nldd-list-item').forEach(i => i.removeAttribute('selected'));
	item.setAttribute('selected', '');
};

export const WithSelection = {
	render: () => html`
		<nldd-list variant="simple" @click=${handleSelectionClick}>
			<nldd-list-item type="button">
				<nldd-text-cell text="Item 1" />
			</nldd-list-item>
			<nldd-list-item type="button" selected>
				<nldd-text-cell text="Item 2 (selected)" />
			</nldd-list-item>
			<nldd-list-item type="button">
				<nldd-text-cell text="Item 3" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const WithSelectionBoxed = {
	render: () => html`
		<nldd-list variant="box" @click=${handleSelectionClick}>
			<nldd-list-item type="button">
				<nldd-text-cell text="Item 1" />
			</nldd-list-item>
			<nldd-list-item type="button" selected>
				<nldd-text-cell text="Item 2 (selected)" />
			</nldd-list-item>
			<nldd-list-item type="button">
				<nldd-text-cell text="Item 3" />
			</nldd-list-item>
		</nldd-list>
	`,
};
WithSelectionBoxed.parameters = { controls: { disable: true } };

export const SizeSmall = {
	render: () => html`
		<nldd-list variant="simple">
			<nldd-list-item size="sm">
				<nldd-text-cell size="sm" text="Small item 1" />
			</nldd-list-item>
			<nldd-list-item size="sm">
				<nldd-text-cell size="sm" text="Small item 2" />
			</nldd-list-item>
			<nldd-list-item size="sm">
				<nldd-text-cell size="sm" text="Small item 3" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const WithMultipleColumns = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item type="button">
				<nldd-spacer-cell slot="start" size="12"></nldd-spacer-cell>
				<nldd-icon-cell slot="start" size="24" vertical-alignment="top">
					<nldd-icon name="calendar-event"></nldd-icon>
				</nldd-icon-cell>
				<nldd-spacer-cell slot="start" size="8"></nldd-spacer-cell>
				<nldd-text-cell text="Primary title" supporting-text="Supporting text below"></nldd-text-cell>
				<nldd-spacer-cell></nldd-spacer-cell>
				<nldd-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
					text="Detail"
				></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-icon-cell color="secondary" size="16">
					<nldd-icon name="chevron-right"></nldd-icon>
				</nldd-icon-cell>
			</nldd-list-item>
			<nldd-list-item type="button">
				<nldd-spacer-cell slot="start" size="12"></nldd-spacer-cell>
				<nldd-icon-cell slot="start" size="24" vertical-alignment="top">
					<nldd-icon name="certificate"></nldd-icon>
				</nldd-icon-cell>
				<nldd-spacer-cell slot="start" size="8"></nldd-spacer-cell>
				<nldd-text-cell text="Another title" supporting-text="More description here"></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
					text="More detail"
				></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-icon-cell color="secondary" size="16">
					<nldd-icon name="chevron-right"></nldd-icon>
				</nldd-icon-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const WithInteractiveItems = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item type="button">
				<nldd-text-cell text="Button item" />
			</nldd-list-item>
			<nldd-list-item href="/settings">
				<nldd-text-cell text="Link item" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Non-interactive item" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const DraggableList = {
	// Imperative render is intentional: the nldd-reorder handler needs to mutate
	// the DOM in-place to demonstrate actual reordering. A standard Storybook
	// render function cannot do this because Lit templates are stateless.
	render: () => {
		const onReorder = (e) => {
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

		const labels = ['Aardappelen', 'Broccoli', 'Courgette', 'Doperwten', 'Erwten'];

		const el = document.createElement('div');
		render(html`
			<nldd-list variant="box" reorderable @nldd-reorder=${onReorder}>
				${labels.map((label) => html`
					<nldd-list-item>
						<nldd-spacer-cell slot="start" size="8"></nldd-spacer-cell>
						<nldd-drag-handle-cell size="sm" slot="start" reorderable-only></nldd-drag-handle-cell>
						<nldd-spacer-cell slot="start" reorderable-only size="8"></nldd-spacer-cell>
						<nldd-text-cell text="${label}" />
					</nldd-list-item>
				`)}
			</nldd-list>
		`, el);
		return el;
	},
};
DraggableList.parameters = { controls: { disable: true } };
