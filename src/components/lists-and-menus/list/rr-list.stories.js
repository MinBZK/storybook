import { html } from 'lit';
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
				<rr-text-cell>
					<p slot="text">Item 1</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Item 2</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Item 3</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const VariantSimple = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Simple list item 1</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Simple list item 2</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Simple list item 3</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const VariantBox = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Box list item 1</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Box list item 2</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Box list item 3</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const VariantInset = {
	render: () => html`
		<div style="background: var(--semantics-surfaces-tinted-background-color); padding: 24px;">
			<rr-list variant="inset">
				<rr-list-item>
					<rr-text-cell>
						<p slot="text">Inset item 1</p>
					</rr-text-cell>
				</rr-list-item>
				<rr-list-item>
					<rr-text-cell>
						<p slot="text">Inset item 2</p>
					</rr-text-cell>
				</rr-list-item>
				<rr-list-item>
					<rr-text-cell>
						<p slot="text">Inset item 3</p>
					</rr-text-cell>
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
				<rr-text-cell>
					<p slot="text">Allow notifications</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Sounds</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Badges</p>
				</rr-text-cell>
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
				<rr-text-cell>
					<p slot="text">Not selected</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item selected>
				<rr-text-cell>
					<p slot="text">Selected item</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Not selected</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const SizeSmall = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item size="sm">
				<rr-text-cell size="sm">
					<p slot="text">Small item 1</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item size="sm">
				<rr-text-cell size="sm">
					<p slot="text">Small item 2</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item size="sm">
				<rr-text-cell size="sm">
					<p slot="text">Small item 3</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const WithSupportingText = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Primary title</p>
					<p slot="supporting-text">Supporting text below</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Another title</p>
					<p slot="supporting-text">More description here</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const WithTitleAndDetail = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Primary title</p>
				</rr-text-cell>
				<rr-spacer-cell></rr-spacer-cell>
				<rr-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
				>
					<p slot="text">Detail</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Another title</p>
				</rr-text-cell>
				<rr-spacer-cell size="8"></rr-spacer-cell>
				<rr-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
				>
					<p slot="text">More detail</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const WithInteractiveItems = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item type="button">
				<rr-text-cell>
					<p slot="text">Button item</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item type="link" href="/settings">
				<rr-text-cell>
					<p slot="text">Link item</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Non-interactive item</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const DraggableList = {
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

		const el = document.createElement('div');
		el.innerHTML = `
			<style>
				rr-list-item:not([draggable]) [draggable-only] { display: none; }
			</style>
			<rr-list variant="box" reorderable>
				${['Aardappelen', 'Broccoli', 'Courgette', 'Doperwten', 'Erwten'].map((label) => `
					<rr-list-item>
						<rr-spacer-cell slot="start" size="12"></rr-spacer-cell>
						<rr-drag-handle-cell size="sm" slot="start" draggable-only tabindex="0"></rr-drag-handle-cell>
						<rr-spacer-cell slot="start" draggable-only size="8"></rr-spacer-cell>
						<rr-text-cell>
							<p slot="text">${label}</p>
						</rr-text-cell>
					</rr-list-item>
				`).join('')}
			</rr-list>
		`;
		el.querySelector('rr-list').addEventListener('rr-reorder', onReorder);
		return el;
	},
};
DraggableList.parameters = { controls: { disable: true } };
