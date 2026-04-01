import { html, render } from 'lit';
import './rr-list.ts';
import '../list-item/rr-list-item.ts';
import '../cells/title-cell/rr-title-cell.ts';
import '../cells/text-cell/rr-text-cell.ts';
import '../cells/spacer-cell/rr-spacer-cell.ts';
import '../cells/drag-handle-cell/rr-drag-handle-cell.ts';
import '../../layout/title-bar/rr-title-bar.ts';
import '../../content/rich-text/rr-rich-text.ts';

export default {
	title: 'Components/Lists & Menus/List',
	component: 'rr-list',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['simple', 'box', 'inset'],
			description: 'Visual style of the list',
		},
	},
};

export const Default = {
	args: {
		variant: 'simple',
	},
	render: (args) => html`
		<rr-list variant=${args.variant}>
			<rr-list-item>
				<rr-text-cell text="Item 1" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Item 2" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Item 3" />
			</rr-list-item>
		</rr-list>
	`,
};

export const VariantSimple = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item>
				<rr-text-cell text="Simple list item 1" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Simple list item 2" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Simple list item 3" />
			</rr-list-item>
		</rr-list>
	`,
};

export const VariantBox = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
				<rr-text-cell text="Box list item 1" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Box list item 2" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Box list item 3" />
			</rr-list-item>
		</rr-list>
	`,
};

export const VariantInset = {
	render: () => html`
		<div style="background: var(--semantics-surfaces-tinted-background-color); padding: 24px;">
			<rr-list variant="inset">
				<rr-list-item>
					<rr-text-cell text="Inset item 1" />
				</rr-list-item>
				<rr-list-item>
					<rr-text-cell text="Inset item 2" />
				</rr-list-item>
				<rr-list-item>
					<rr-text-cell text="Inset item 3" />
				</rr-list-item>
			</rr-list>
		</div>
	`,
};

export const WithHeaderAndFooter = {
	render: () => html`
		<rr-list variant="box">
			<rr-title-bar slot="header" size="4">
				<h5>Notifications</h5>
			</rr-title-bar>
			<rr-list-item>
				<rr-text-cell text="Allow notifications" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Sounds" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Badges" />
			</rr-list-item>
			<rr-rich-text slot="footer">
				<p>Notifications will only be sent when the app is active on your device.</p>
			</rr-rich-text>
		</rr-list>
	`,
};

export const WithSelection = {
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

export const SizeSmall = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item size="sm">
				<rr-text-cell size="sm" text="Small item 1" />
			</rr-list-item>
			<rr-list-item size="sm">
				<rr-text-cell size="sm" text="Small item 2" />
			</rr-list-item>
			<rr-list-item size="sm">
				<rr-text-cell size="sm" text="Small item 3" />
			</rr-list-item>
		</rr-list>
	`,
};

export const WithSupportingText = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
				<rr-text-cell text="Primary title" supporting-text="Supporting text below" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Another title" supporting-text="More description here" />
			</rr-list-item>
		</rr-list>
	`,
};

export const WithTitleAndDetail = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
				<rr-text-cell text="Primary title" />
				<rr-spacer-cell></rr-spacer-cell>
				<rr-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
					text="Detail"
				/>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Another title" />
				<rr-spacer-cell size="8"></rr-spacer-cell>
				<rr-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
					text="More detail"
				/>
			</rr-list-item>
		</rr-list>
	`,
};

export const WithInteractiveItems = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item type="button">
				<rr-text-cell text="Button item" />
			</rr-list-item>
			<rr-list-item type="link" href="/settings">
				<rr-text-cell text="Link item" />
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell text="Non-interactive item" />
			</rr-list-item>
		</rr-list>
	`,
};

export const DraggableList = {
	// Imperative render is intentional: the rr-reorder handler needs to mutate
	// the DOM in-place to demonstrate actual reordering. A standard Storybook
	// render function cannot do this because Lit templates are stateless.
	render: () => {
		const onReorder = (e) => {
			const list = e.currentTarget;
			const { fromIndex, toIndex } = e.detail;
			const items = [...list.querySelectorAll('rr-list-item')];
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
			<rr-list variant="box" reorderable @rr-reorder=${onReorder}>
				${labels.map((label) => html`
					<rr-list-item>
						<rr-spacer-cell slot="start" size="12"></rr-spacer-cell>
						<rr-drag-handle-cell size="sm" slot="start" draggable-only></rr-drag-handle-cell>
						<rr-spacer-cell slot="start" draggable-only size="8"></rr-spacer-cell>
						<rr-text-cell text="${label}" />
					</rr-list-item>
				`)}
			</rr-list>
		`, el);
		return el;
	},
};
DraggableList.parameters = { controls: { disable: true } };
