import { html } from 'lit';
import './rr-list-item.ts';
import '../list/rr-list.ts';
import '../cells/text-cell/rr-text-cell.ts';
import '../cells/spacer-cell/rr-spacer-cell.ts';

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
				<rr-text-cell>
					<p slot="text">Text cell</p>
					<p slot="supporting-text">Supporting text</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const SizeMD = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item size="md">
				<rr-text-cell>
					<p slot="text">Medium size item</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const SizeSM = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item size="sm">
				<rr-text-cell size="sm">
					<p slot="text">Small size item</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const Selected = {
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

export const TypeButton = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item type="button">
				<rr-text-cell>
					<p slot="text">Clickable button item</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item type="button">
				<rr-text-cell>
					<p slot="text">Another button item</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const TypeLink = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item type="link" href="/settings">
				<rr-text-cell>
					<p slot="text">Settings</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item type="link" href="/profile">
				<rr-text-cell>
					<p slot="text">Profile</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const BoxWithGutters = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Gutters visible (spacer)</p>
				</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Gutters visible (spacer)</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const WithStartAndEnd = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
				<rr-spacer-cell slot="start" size="12"></rr-spacer-cell>
				<div slot="start" style="width: 32px; height: 32px; background: #e0e0e0; border-radius: 8px;"></div>
				<rr-spacer-cell slot="start" size="8"></rr-spacer-cell>
				<rr-text-cell>
					<p slot="text">Item with start icon</p>
				</rr-text-cell>
				<rr-spacer-cell slot="end" size="8"></rr-spacer-cell>
				<div slot="end" style="color: #999;">›</div>
				<rr-spacer-cell slot="end" size="12"></rr-spacer-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-spacer-cell slot="start" size="12"></rr-spacer-cell>
				<div slot="start" style="width: 32px; height: 32px; background: #e0e0e0; border-radius: 8px;"></div>
				<rr-spacer-cell slot="start" size="8"></rr-spacer-cell>
				<rr-text-cell>
					<p slot="text">Another item</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const SimpleWithEndOnly = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">Only end slot filled</p>
				</rr-text-cell>
				<rr-spacer-cell slot="end" size="8"></rr-spacer-cell>
				<div slot="end" style="color: #999;">›</div>
			</rr-list-item>
			<rr-list-item>
				<rr-text-cell>
					<p slot="text">No slots</p>
				</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};
