import { html } from 'lit';
import './rr-list.ts';
import '../list-item/rr-list-item.ts';
import '../cells/title-cell/rr-title-cell.ts';
import '../cells/label-cell/rr-label-cell.ts';
import '../../layout/title-bar/rr-title-bar.ts';

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
				<rr-title-cell>Item 1</rr-title-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-title-cell>Item 2</rr-title-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-title-cell>Item 3</rr-title-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const VariantSimple = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item>
				<rr-title-cell>Simple list item 1</rr-title-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-title-cell>Simple list item 2</rr-title-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-title-cell>Simple list item 3</rr-title-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const VariantBox = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
				<rr-title-cell>Box list item 1</rr-title-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-title-cell>Box list item 2</rr-title-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-title-cell>Box list item 3</rr-title-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const VariantInset = {
	render: () => html`
		<div style="background: var(--semantics-surfaces-tinted-background-color); padding: 24px;">
			<rr-list variant="inset">
				<rr-list-item>
					<rr-title-cell>Inset item 1</rr-title-cell>
				</rr-list-item>
				<rr-list-item>
					<rr-title-cell>Inset item 2</rr-title-cell>
				</rr-list-item>
				<rr-list-item>
					<rr-title-cell>Inset item 3</rr-title-cell>
				</rr-list-item>
			</rr-list>
		</div>
	`,
};

export const WithHeaderAndFooter = {
	render: () => html`
		<rr-list variant="box">
			<rr-title-bar slot="header" size="5">Notifications</rr-title-bar>

			<rr-list-item>
				<rr-title-cell>Allow notifications</rr-title-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-title-cell>Sounds</rr-title-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-title-cell>Badges</rr-title-cell>
			</rr-list-item>

			<rr-rich-text slot="footer">
				<p>	Notifications will only be sent when the app is active on your device.</p>
			</rr-rich-text>
		</rr-list>
	`,
};

export const WithSelection = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item>
				<rr-title-cell>Not selected</rr-title-cell>
			</rr-list-item>
			<rr-list-item selected>
				<rr-title-cell>Selected item</rr-title-cell>
			</rr-list-item>
			<rr-list-item>
				<rr-title-cell>Not selected</rr-title-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const SizeSmall = {
	render: () => html`
		<rr-list variant="simple">
			<rr-list-item size="sm">
				<rr-title-cell size="sm">Small item 1</rr-title-cell>
			</rr-list-item>
			<rr-list-item size="sm">
				<rr-title-cell size="sm">Small item 2</rr-title-cell>
			</rr-list-item>
			<rr-list-item size="sm">
				<rr-title-cell size="sm">Small item 3</rr-title-cell>
			</rr-list-item>
		</rr-list>
	`,
};

export const WithTitleAndDetail = {
	render: () => html`
		<rr-list variant="box">
			<rr-list-item>
					<rr-title-cell>Primary title</rr-title-cell>
					<rr-spacer-cell></rr-spacer-cell>
					<rr-text-cell space="8">Secondary label text</rr-text-cell>
			</rr-list-item>
			<rr-list-item>
					<rr-title-cell>Another title</rr-title-cell>
					<rr-spacer-cell space="8"></rr-spacer-cell>
					<rr-text-cell>More description here</rr-text-cell>
			</rr-list-item>
		</rr-list>
	`,
};
