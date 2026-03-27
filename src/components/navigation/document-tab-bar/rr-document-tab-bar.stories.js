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
			title="Artikel 2"
			subtitle="Wet op de Zorgtoeslag"
			short-title="Art. 2"
			short-subtitle="WZT"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 1"
			subtitle="Zorgverzekeringswet"
			short-title="Art. 1"
			short-subtitle="Zvw"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 3:2"
			subtitle="Algemene wet bestuursrecht"
			short-title="Art. 3:2"
			short-subtitle="Awb"
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
			title="Artikel 2"
			subtitle="Wet op de Zorgtoeslag"
			short-title="Art. 2"
			short-subtitle="WZT"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 1"
			subtitle="Zorgverzekeringswet"
			short-title="Art. 1"
			short-subtitle="Zvw"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 68b"
			subtitle="Zorgverzekeringswet"
			short-title="Art. 68b"
			short-subtitle="Zvw"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 3:2"
			subtitle="Algemene wet bestuursrecht"
			short-title="Art. 3:2"
			short-subtitle="Awb"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 7"
			subtitle="Algemene wet inkomensafhankelijke regelingen"
			short-title="Art. 7"
			short-subtitle="Awir"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 67"
			subtitle="Algemene wet inzake rijksbelastingen"
			short-title="Art. 67"
			short-subtitle="AWR"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 18"
			subtitle="Algemene Kinderbijslagwet"
			short-title="Art. 18"
			short-subtitle="AKW"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 4:3"
			subtitle="Algemene wet bestuursrecht"
			short-title="Art. 4:3"
			short-subtitle="Awb"
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
			title="Artikel 2"
			short-title="Art. 2"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 1"
			short-title="Art. 1"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 3:2"
			short-title="Art. 3:2"
		></rr-document-tab-bar-item>
	</rr-document-tab-bar>
`;
ZonderSubtitel.parameters = { controls: { disable: true } };

export const Uitgeschakeld = () => html`
	<rr-document-tab-bar accessible-label="Documenten">
		<rr-document-tab-bar-item
			selected
			title="Artikel 2"
			subtitle="Wet op de Zorgtoeslag"
			short-title="Art. 2"
			short-subtitle="WZT"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			disabled
			title="Artikel 1"
			subtitle="Zorgverzekeringswet"
			short-title="Art. 1"
			short-subtitle="Zvw"
		></rr-document-tab-bar-item>
		<rr-document-tab-bar-item
			title="Artikel 3:2"
			subtitle="Algemene wet bestuursrecht"
			short-title="Art. 3:2"
			short-subtitle="Awb"
		></rr-document-tab-bar-item>
	</rr-document-tab-bar>
`;
Uitgeschakeld.parameters = { controls: { disable: true } };
