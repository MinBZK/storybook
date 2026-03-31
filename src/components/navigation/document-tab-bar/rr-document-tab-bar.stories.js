import { html } from 'lit';
import './rr-document-tab-bar.ts';
import './../../actions/icon-button/rr-icon-button.ts';
import './../../content/icon/rr-icon.ts';

export default {
	title: 'Components/Navigation/Document Tab Bar',
	component: 'rr-document-tab-bar',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/navigation/document-tab-bar/rr-document-tab-bar.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'stable' },
	},
	argTypes: {
		overflowButtonLabel: {
			control: 'text',
			name: 'overflow-button-label',
			description: 'Label voor de automatische overloopknop',
			table: { defaultValue: { summary: 'Meer' } },
		},
		accessibleLabel: {
			control: 'text',
			name: 'accessible-label',
			description: 'Toegankelijke naam voor de navigatieregio',
			table: { defaultValue: { summary: 'Tabbladen' } },
		},
	},
	args: {
		overflowButtonLabel: 'Meer',
		accessibleLabel: 'Documenten',
	},
};

const Template = ({ overflowButtonLabel, accessibleLabel }) => html`
	<rr-document-tab-bar
		overflow-button-label=${overflowButtonLabel}
		accessible-label=${accessibleLabel}
	>
		<rr-document-tab-bar-item
			selected
			text="Artikel 2"
			supporting-text="Wet op de Zorgtoeslag"
			short-text="Art. 2"
			short-supporting-text="WZT"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			text="Artikel 1"
			supporting-text="Zorgverzekeringswet"
			short-text="Art. 1"
			short-supporting-text="Zvw"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			text="Artikel 3:2"
			supporting-text="Algemene wet bestuursrecht"
			short-text="Art. 3:2"
			short-supporting-text="Awb"
		></rr-document-tab-bar-item>
		<rr-icon-button slot="end" variant="neutral-tinted" text="Nieuw tabblad">
			<rr-icon name="plus"></rr-icon>
		</rr-icon-button>
	</rr-document-tab-bar>
`;

export const Standaard = Template.bind({});

export const VeelTabbladen = () => html`
	<rr-document-tab-bar accessible-label="Documenten">
		<rr-document-tab-bar-item
			selected
			text="Artikel 2"
			supporting-text="Wet op de Zorgtoeslag"
			short-text="Art. 2"
			short-supporting-text="WZT"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			text="Artikel 1"
			supporting-text="Zorgverzekeringswet"
			short-text="Art. 1"
			short-supporting-text="Zvw"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			text="Artikel 68b"
			supporting-text="Zorgverzekeringswet"
			short-text="Art. 68b"
			short-supporting-text="Zvw"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			text="Artikel 3:2"
			supporting-text="Algemene wet bestuursrecht"
			short-text="Art. 3:2"
			short-supporting-text="Awb"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			text="Artikel 7"
			supporting-text="Algemene wet inkomensafhankelijke regelingen"
			short-text="Art. 7"
			short-supporting-text="Awir"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			text="Artikel 67"
			supporting-text="Algemene wet inzake rijksbelastingen"
			short-text="Art. 67"
			short-supporting-text="AWR"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			text="Artikel 18"
			supporting-text="Algemene Kinderbijslagwet"
			short-text="Art. 18"
			short-supporting-text="AKW"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			text="Artikel 4:3"
			supporting-text="Algemene wet bestuursrecht"
			short-text="Art. 4:3"
			short-supporting-text="Awb"
		></rr-document-tab-bar-item>
		<rr-icon-button slot="end" variant="neutral-tinted" text="Nieuw tabblad">
			<rr-icon name="plus"></rr-icon>
		</rr-icon-button>
	</rr-document-tab-bar>
`;
VeelTabbladen.parameters = { controls: { disable: true } };

export const ZonderSubtitel = () => html`
	<rr-document-tab-bar accessible-label="Documenten">
		<rr-document-tab-bar-item
			selected
			text="Artikel 2"
			short-text="Art. 2"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			text="Artikel 1"
			short-text="Art. 1"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			text="Artikel 3:2"
			short-text="Art. 3:2"
		></rr-document-tab-bar-item>
	</rr-document-tab-bar>
`;
ZonderSubtitel.parameters = { controls: { disable: true } };


export const Herschikbaar = {
	render: () => {
		const el = document.createElement('div');
		el.innerHTML = `
			<rr-document-tab-bar accessible-label="Documenten">
				<rr-document-tab-bar-item selected text="Artikel 2" supporting-text="Wet op de Zorgtoeslag" short-text="Art. 2" short-supporting-text="WZT"></rr-document-tab-bar-item>
				<rr-document-tab-bar-item text="Artikel 1" supporting-text="Zorgverzekeringswet" short-text="Art. 1" short-supporting-text="Zvw"></rr-document-tab-bar-item>
				<rr-document-tab-bar-item text="Artikel 3:2" supporting-text="Algemene wet bestuursrecht" short-text="Art. 3:2" short-supporting-text="Awb"></rr-document-tab-bar-item>
				<rr-document-tab-bar-item text="Artikel 7" supporting-text="Algemene wet inkomensafhankelijke regelingen" short-text="Art. 7" short-supporting-text="Awir"></rr-document-tab-bar-item>
			</rr-document-tab-bar>
		`;
		return el;
	},
};
Herschikbaar.parameters = { controls: { disable: true } };
