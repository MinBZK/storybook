import { html, nothing } from 'lit';
import './ndd-menu-bar-item.ts';
import { ICONS } from '../../content/icon/ndd-icon.ts';

export default {
	title: 'Components/Navigation/Menu Bar Item',
	component: 'ndd-menu-bar-item',
	tags: ['autodocs'],
	args: {
		text: 'Menu item',
		icon: '',
		href: '',
		current: false,
		expandable: false,
		iconOnly: false,
		contentPriority: '',
		compact: false,
		disabled: false,
	},
	argTypes: {
		text: { control: 'text', description: 'Tekst van het item' },
		icon: { control: 'select', options: ['', ...ICONS], description: 'Icon naam (ndd-icon)', table: { defaultValue: { summary: '' } } },
		href: { control: 'text', description: 'Optionele link URL', table: { defaultValue: { summary: '' } } },
		current: { control: 'boolean', description: 'Markeer als actief/huidig', table: { defaultValue: { summary: false } } },
		expandable: { control: 'boolean', description: 'Toon disclosure icon', table: { defaultValue: { summary: false } } },
		iconOnly: { name: 'icon-only', control: 'boolean', description: 'Verberg tekst visueel (altijd)', table: { defaultValue: { summary: false } } },
		contentPriority: {
			name: 'content-priority',
			control: 'select',
			options: ['', 'icon', 'text'],
			description: 'Bepaalt wat zichtbaar blijft in compact modus',
			table: { defaultValue: { summary: '' } },
		},
		compact: { control: 'boolean', description: 'Activeert content-priority gedrag (gezet door parent)', table: { defaultValue: { summary: false } } },
		disabled: { control: 'boolean', description: 'Schakel interactie uit', table: { defaultValue: { summary: false } } },
	},
};

const Template = ({
	text,
	icon,
	href,
	current,
	expandable,
	iconOnly,
	contentPriority,
	compact,
	disabled,
}: Record<string, unknown>) => html`
	<ndd-menu-bar-item
		text=${text || nothing}
		icon=${icon || nothing}
		href=${href || nothing}
		?current=${current}
		?expandable=${expandable}
		?icon-only=${iconOnly}
		content-priority=${contentPriority || nothing}
		?compact=${compact}
		?disabled=${disabled}
	></ndd-menu-bar-item>
`;

export const Default = Template.bind({});

export const WithIcon = Template.bind({});
WithIcon.args = {
	text: 'Zoeken',
	icon: 'magnifier',
};

export const Current = Template.bind({});
Current.args = {
	text: 'Home',
	current: true,
};

export const AsLink = Template.bind({});
AsLink.args = {
	text: 'Home',
	href: '/',
};

export const IconOnly = Template.bind({});
IconOnly.args = {
	text: 'Zoeken',
	icon: 'magnifier',
	iconOnly: true,
};

export const ContentPriorityIcon = Template.bind({});
ContentPriorityIcon.args = {
	text: 'Zoeken',
	icon: 'magnifier',
	contentPriority: 'icon',
	compact: true,
};

export const ContentPriorityText = Template.bind({});
ContentPriorityText.args = {
	text: 'Mijn DigID',
	icon: 'person',
	contentPriority: 'text',
	compact: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	text: 'Uitgeschakeld',
	disabled: true,
};

export const Expandable = {
	render: () => html`
		<ndd-menu-bar-item text="Account" icon="person" expandable>
			<ndd-menu-item text="Mijn profiel"></ndd-menu-item>
			<ndd-menu-item text="Instellingen"></ndd-menu-item>
			<ndd-menu-divider></ndd-menu-divider>
			<ndd-menu-item text="Uitloggen"></ndd-menu-item>
		</ndd-menu-bar-item>
	`,
	parameters: { controls: { disable: true } },
};

export const AllStates = {
	render: () => html`
		<div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
			<ndd-menu-bar-item text="Default"></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Current" current></ndd-menu-bar-item>
			<ndd-menu-bar-item text="With Icon" icon="magnifier"></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Icon Only" icon="magnifier" icon-only></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Priority Icon" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Priority Icon (compact)" icon="magnifier" content-priority="icon" compact></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Priority Text" icon="person" content-priority="text"></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Priority Text (compact)" icon="person" content-priority="text" compact></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Disabled" disabled></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Link" href="/"></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Expandable" expandable>
				<ndd-menu-item text="Optie 1"></ndd-menu-item>
				<ndd-menu-item text="Optie 2"></ndd-menu-item>
			</ndd-menu-bar-item>
		</div>
	`,
	parameters: { controls: { disable: true } },
};
