import { html, render } from 'lit';
import './ndd-list.ts';
import '../list-item/ndd-list-item.ts';
import '../cells/title-cell/ndd-title-cell.ts';
import '../cells/text-cell/ndd-text-cell.ts';
import '../cells/spacer-cell/ndd-spacer-cell.ts';
import '../cells/drag-handle-cell/ndd-drag-handle-cell.ts';
import '../../content/title/ndd-title.ts';
import '../../content/rich-text/ndd-rich-text.ts';

export default {
	title: 'Components/Lists & Menus/List',
	component: 'ndd-list',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['simple', 'box', 'inset'],
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
		<ndd-list variant=${args.variant} ?no-dividers=${args['no-dividers']}>
			<ndd-list-item>
				<ndd-text-cell text="Item 1" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Item 2" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Item 3" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const VariantSimple = {
	render: () => html`
		<ndd-list variant="simple">
			<ndd-list-item>
				<ndd-text-cell text="Simple list item 1" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Simple list item 2" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Simple list item 3" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const VariantBox = {
	render: () => html`
		<ndd-list variant="box">
			<ndd-list-item>
				<ndd-text-cell text="Box list item 1" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Box list item 2" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Box list item 3" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const VariantInset = {
	render: () => html`
		<div style="background: var(--semantics-surfaces-tinted-background-color); padding: 24px;">
			<ndd-list variant="inset">
				<ndd-list-item>
					<ndd-text-cell text="Inset item 1" />
				</ndd-list-item>
				<ndd-list-item>
					<ndd-text-cell text="Inset item 2" />
				</ndd-list-item>
				<ndd-list-item>
					<ndd-text-cell text="Inset item 3" />
				</ndd-list-item>
			</ndd-list>
		</div>
	`,
};

export const WithHeaderAndFooter = {
	render: () => html`
		<ndd-list variant="box">
			<ndd-title slot="header" size="4">
				<h5>Notifications</h5>
			</ndd-title>
			<ndd-list-item>
				<ndd-text-cell text="Allow notifications" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Sounds" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Badges" />
			</ndd-list-item>
			<ndd-rich-text slot="footer">
				<p>Notifications will only be sent when the app is active on your device.</p>
			</ndd-rich-text>
		</ndd-list>
	`,
};

export const WithSelection = {
	render: () => {
		const handleClick = (e) => {
			const item = e.target.closest('ndd-list-item');
			if (!item) return;
			const list = item.closest('ndd-list');
			list.querySelectorAll('ndd-list-item').forEach(i => i.removeAttribute('selected'));
			item.setAttribute('selected', '');
		};

		return html`
			<ndd-list variant="simple" @click=${handleClick}>
				<ndd-list-item type="button">
					<ndd-text-cell text="Item 1" />
				</ndd-list-item>
				<ndd-list-item type="button" selected>
					<ndd-text-cell text="Item 2 (selected)" />
				</ndd-list-item>
				<ndd-list-item type="button">
					<ndd-text-cell text="Item 3" />
				</ndd-list-item>
			</ndd-list>
		`;
	},
};

export const SizeSmall = {
	render: () => html`
		<ndd-list variant="simple">
			<ndd-list-item size="sm">
				<ndd-text-cell size="sm" text="Small item 1" />
			</ndd-list-item>
			<ndd-list-item size="sm">
				<ndd-text-cell size="sm" text="Small item 2" />
			</ndd-list-item>
			<ndd-list-item size="sm">
				<ndd-text-cell size="sm" text="Small item 3" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const WithSupportingText = {
	render: () => html`
		<ndd-list variant="box">
			<ndd-list-item>
				<ndd-text-cell text="Primary title" supporting-text="Supporting text below" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Another title" supporting-text="More description here" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const WithTitleAndDetail = {
	render: () => html`
		<ndd-list variant="box">
			<ndd-list-item>
				<ndd-text-cell text="Primary title" />
				<ndd-spacer-cell></ndd-spacer-cell>
				<ndd-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
					text="Detail"
				/>
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Another title" />
				<ndd-spacer-cell size="8"></ndd-spacer-cell>
				<ndd-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
					text="More detail"
				/>
			</ndd-list-item>
		</ndd-list>
	`,
};

export const WithInteractiveItems = {
	render: () => html`
		<ndd-list variant="box">
			<ndd-list-item type="button">
				<ndd-text-cell text="Button item" />
			</ndd-list-item>
			<ndd-list-item type="link" href="/settings">
				<ndd-text-cell text="Link item" />
			</ndd-list-item>
			<ndd-list-item>
				<ndd-text-cell text="Non-interactive item" />
			</ndd-list-item>
		</ndd-list>
	`,
};

export const DraggableList = {
	// Imperative render is intentional: the ndd-reorder handler needs to mutate
	// the DOM in-place to demonstrate actual reordering. A standard Storybook
	// render function cannot do this because Lit templates are stateless.
	render: () => {
		const onReorder = (e) => {
			const list = e.currentTarget;
			const { fromIndex, toIndex } = e.detail;
			const items = [...list.querySelectorAll('ndd-list-item')];
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
			<ndd-list variant="box" reorderable @ndd-reorder=${onReorder}>
				${labels.map((label) => html`
					<ndd-list-item>
						<ndd-spacer-cell slot="start" size="12"></ndd-spacer-cell>
						<ndd-drag-handle-cell size="sm" slot="start" draggable-only></ndd-drag-handle-cell>
						<ndd-spacer-cell slot="start" draggable-only size="8"></ndd-spacer-cell>
						<ndd-text-cell text="${label}" />
					</ndd-list-item>
				`)}
			</ndd-list>
		`, el);
		return el;
	},
};
DraggableList.parameters = { controls: { disable: true } };
