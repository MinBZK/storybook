import { html, nothing } from 'lit';
import './ndd-menu-bar.ts';

export default {
	title: 'Components/Navigation/Menu Bar',
	component: 'ndd-menu-bar',
	tags: ['autodocs'],
	args: {
		accessibleLabel: 'Navigatie',
		overflowText: 'Meer opties',
		compact: false,
	},
	argTypes: {
		accessibleLabel: { name: 'accessible-label', control: 'text', description: 'aria-label voor de nav landmark', table: { defaultValue: { summary: '' } } },
		overflowText: { name: 'overflow-text', control: 'text', description: 'Tekst voor de overflow button', table: { defaultValue: { summary: 'Meer opties' } } },
		compact: { control: 'boolean', description: 'Propageert compact naar slotted items', table: { defaultValue: { summary: false } } },
	},
};

const layoutArea = 'container-type: inline-size; container-name: layout-area; background-color: var(--semantics-surfaces-background-color);';

const Template = ({
	accessibleLabel,
	overflowText,
	compact,
}: Record<string, unknown>) => html`
	<div style=${layoutArea}>
		<ndd-menu-bar
			accessible-label=${(accessibleLabel as string) || nothing}
			overflow-text=${(overflowText as string) || nothing}
			?compact=${compact}
		>
			<ndd-menu-bar-item text="Home" current></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Aanvragen & activeren"></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Manieren van inloggen"></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Veiligheid"></ndd-menu-bar-item>
			<ndd-menu-bar-item text="Hulp"></ndd-menu-bar-item>
		</ndd-menu-bar>
	</div>
`;

export const Default = Template.bind({});

export const FewItems = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-menu-bar>
				<ndd-menu-bar-item text="Home" current></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Contact"></ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const ManyItems = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-menu-bar>
				<ndd-menu-bar-item text="Home" current></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Onderwerpen"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Documenten en publicaties"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Ministeries"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Contact"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Actueel"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Vraag en antwoord"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Wetten en regelgeving"></ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const NarrowContainer = {
	render: () => html`
		<div style="${layoutArea} max-width: 400px;">
			<ndd-menu-bar>
				<ndd-menu-bar-item text="Home" current></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Aanvragen & activeren"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Manieren van inloggen"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Veiligheid"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Hulp"></ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const WithExpandableItems = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-menu-bar>
				<ndd-menu-bar-item text="NL" expandable content-priority="icon">
					<ndd-menu-item text="Nederlands" type="radio" selected></ndd-menu-item>
					<ndd-menu-item text="English" type="radio"></ndd-menu-item>
					<ndd-menu-item text="Papiamentu" type="radio"></ndd-menu-item>
				</ndd-menu-bar-item>
				<ndd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Account" icon="person" expandable content-priority="text">
					<ndd-menu-item text="Mijn profiel"></ndd-menu-item>
					<ndd-menu-divider></ndd-menu-divider>
					<ndd-menu-item text="Uitloggen"></ndd-menu-item>
				</ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const Compact = {
	render: () => html`
		<div style=${layoutArea}>
			<ndd-menu-bar compact>
				<ndd-menu-bar-item text="NL" expandable content-priority="icon">
					<ndd-menu-item text="Nederlands" type="radio" selected></ndd-menu-item>
					<ndd-menu-item text="English" type="radio"></ndd-menu-item>
				</ndd-menu-bar-item>
				<ndd-menu-bar-item text="Zoeken" icon="magnifier" content-priority="icon"></ndd-menu-bar-item>
				<ndd-menu-bar-item text="Mijn DigID" icon="person" expandable content-priority="text">
					<ndd-menu-item text="Mijn gegevens"></ndd-menu-item>
					<ndd-menu-item text="Uitloggen"></ndd-menu-item>
				</ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
	`,
	parameters: { controls: { disable: true } },
};
