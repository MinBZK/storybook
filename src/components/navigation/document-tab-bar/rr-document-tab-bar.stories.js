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
			label="Artikel 2"
			supporting-label="Wet op de Zorgtoeslag"
			short-label="Art. 2"
			short-supporting-label="WZT"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 1"
			supporting-label="Zorgverzekeringswet"
			short-label="Art. 1"
			short-supporting-label="Zvw"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 3:2"
			supporting-label="Algemene wet bestuursrecht"
			short-label="Art. 3:2"
			short-supporting-label="Awb"
		></rr-document-tab-bar-item>
		<rr-icon-button slot="end" variant="neutral-tinted" label="Nieuw tabblad">
			<rr-icon name="plus"></rr-icon>
		</rr-icon-button>
	</rr-document-tab-bar>
`;

export const Standaard = Template.bind({});

export const VeelTabbladen = () => html`
	<rr-document-tab-bar accessible-label="Documenten">
		<rr-document-tab-bar-item
			selected
			label="Artikel 2"
			supporting-label="Wet op de Zorgtoeslag"
			short-label="Art. 2"
			short-supporting-label="WZT"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 1"
			supporting-label="Zorgverzekeringswet"
			short-label="Art. 1"
			short-supporting-label="Zvw"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 68b"
			supporting-label="Zorgverzekeringswet"
			short-label="Art. 68b"
			short-supporting-label="Zvw"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 3:2"
			supporting-label="Algemene wet bestuursrecht"
			short-label="Art. 3:2"
			short-supporting-label="Awb"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 7"
			supporting-label="Algemene wet inkomensafhankelijke regelingen"
			short-label="Art. 7"
			short-supporting-label="Awir"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 67"
			supporting-label="Algemene wet inzake rijksbelastingen"
			short-label="Art. 67"
			short-supporting-label="AWR"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 18"
			supporting-label="Algemene Kinderbijslagwet"
			short-label="Art. 18"
			short-supporting-label="AKW"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 4:3"
			supporting-label="Algemene wet bestuursrecht"
			short-label="Art. 4:3"
			short-supporting-label="Awb"
		></rr-document-tab-bar-item>
		<rr-icon-button slot="end" variant="neutral-tinted" label="Nieuw tabblad">
			<rr-icon name="plus"></rr-icon>
		</rr-icon-button>
	</rr-document-tab-bar>
`;
VeelTabbladen.parameters = { controls: { disable: true } };

export const ZonderSubtitel = () => html`
	<rr-document-tab-bar accessible-label="Documenten">
		<rr-document-tab-bar-item
			selected
			label="Artikel 2"
			short-label="Art. 2"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 1"
			short-label="Art. 1"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 3:2"
			short-label="Art. 3:2"
		></rr-document-tab-bar-item>
	</rr-document-tab-bar>
`;
ZonderSubtitel.parameters = { controls: { disable: true } };

export const Uitgeschakeld = () => html`
	<rr-document-tab-bar accessible-label="Documenten">
		<rr-document-tab-bar-item
			selected
			label="Artikel 2"
			supporting-label="Wet op de Zorgtoeslag"
			short-label="Art. 2"
			short-supporting-label="WZT"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			disabled
			label="Artikel 1"
			supporting-label="Zorgverzekeringswet"
			short-label="Art. 1"
			short-supporting-label="Zvw"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			label="Artikel 3:2"
			supporting-label="Algemene wet bestuursrecht"
			short-label="Art. 3:2"
			short-supporting-label="Awb"
		></rr-document-tab-bar-item>
	</rr-document-tab-bar>
`;
Uitgeschakeld.parameters = { controls: { disable: true } };

export const Herschikbaar = {
	render: () => {
		const el = document.createElement('div');
		el.innerHTML = `
			<rr-document-tab-bar accessible-label="Documenten">
				<rr-document-tab-bar-item selected label="Artikel 2" supporting-label="Wet op de Zorgtoeslag" short-label="Art. 2" short-supporting-label="WZT"></rr-document-tab-bar-item>
				<rr-document-tab-bar-item label="Artikel 1" supporting-label="Zorgverzekeringswet" short-label="Art. 1" short-supporting-label="Zvw"></rr-document-tab-bar-item>
				<rr-document-tab-bar-item label="Artikel 3:2" supporting-label="Algemene wet bestuursrecht" short-label="Art. 3:2" short-supporting-label="Awb"></rr-document-tab-bar-item>
				<rr-document-tab-bar-item label="Artikel 7" supporting-label="Algemene wet inkomensafhankelijke regelingen" short-label="Art. 7" short-supporting-label="Awir"></rr-document-tab-bar-item>
			</rr-document-tab-bar>
		`;
		return el;
	},
};
Herschikbaar.parameters = { controls: { disable: true } };
