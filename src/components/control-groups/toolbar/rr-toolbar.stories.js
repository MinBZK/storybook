import { html, nothing } from 'lit';
import './rr-toolbar.ts';
import '../../actions/button/rr-button.ts';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';
import '../button-bar/rr-button-bar.ts';

export default {
	title: 'Components/Control Groups/Toolbar',
	component: 'rr-toolbar',
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Toolbar size',
		},
		showLabels: {
			control: 'boolean',
			description: 'Show labels below toolbar items',
		},
	},
};

export const Default = {
	args: { size: 'md', showLabels: false },
	render: (args) => html`
		<rr-toolbar size=${args.size} show-labels=${args.showLabels || nothing}>
			<rr-toolbar-item slot="start-area" label="Vorige/Volgende">
				<rr-button-bar>
					<rr-icon-button>
						<rr-icon name="chevron-left">
						Vorige
					</rr-icon-button>
					<rr-button-bar-divider></rr-button-bar-divider>
					<rr-icon-button>
						<rr-icon name="chevron-right">
						Volgende
					</rr-icon-button>
				</rr-button-bar>
			</rr-toolbar-item>
			<rr-toolbar-item slot="end-area" label="Opslaan">
				<rr-button variant="accent-filled">Opslaan</rr-button>
			</rr-toolbar-item>
		</rr-toolbar>
	`,
};

export const WithLabels = {
	args: { size: 'md', showLabels: true },
	render: (args) => html`
		<rr-toolbar size=${args.size} show-labels=${args.showLabels || nothing}>
			<rr-toolbar-item slot="start-area" label="Vet">
				<rr-icon-button>
					<rr-icon name="bold"></rr-icon>
					Vet
				</rr-icon-button>
			</rr-toolbar-item>
			<rr-toolbar-item slot="start-area" label="Cursief">
				<rr-icon-button>
					<rr-icon name="italic"></rr-icon>
					Cursief
				</rr-icon-button>
			</rr-toolbar-item>
			<rr-toolbar-item slot="end-area" label="Opslaan">
				<rr-button variant="accent-filled">Opslaan</rr-button>
			</rr-toolbar-item>
		</rr-toolbar>
	`,
};

export const WithDivider = {
	args: { size: 'md', showLabels: false },
	render: (args) => html`
		<rr-toolbar size=${args.size} show-labels=${args.showLabels || nothing}>
			<rr-toolbar-item slot="start-area">
				<rr-button>Bestand</rr-button>
			</rr-toolbar-item>
			<rr-toolbar-item slot="start-area">
				<rr-button>Bewerk</rr-button>
			</rr-toolbar-item>
			<rr-toolbar-divider slot="start-area"></rr-toolbar-divider>
			<rr-toolbar-item slot="start-area">
				<rr-button>Weergave</rr-button>
			</rr-toolbar-item>
			<rr-toolbar-item slot="end-area">
				<rr-button variant="accent-filled">Opslaan</rr-button>
			</rr-toolbar-item>
		</rr-toolbar>
	`,
};

export const WithTitleGroup = {
	args: { size: 'md', showLabels: false },
	render: (args) => html`
		<rr-toolbar size=${args.size} show-labels=${args.showLabels || nothing}>
			<rr-toolbar-item slot="start-area">
				<rr-icon-button>
					<rr-icon name="chevron-left"></rr-icon>
					Terug
				</rr-icon-button>
			</rr-toolbar-item>
			<rr-toolbar-divider slot="start-area"></rr-toolbar-divider>
			<rr-toolbar-title-group
				slot="start-area"
				title="Document titel"
				subtitle="Laatste wijziging: vandaag"
			></rr-toolbar-title-group>
			<rr-toolbar-item slot="end-area">
				<rr-button>Annuleren</rr-button>
			</rr-toolbar-item>
			<rr-toolbar-item slot="end-area">
				<rr-button variant="accent-filled">Opslaan</rr-button>
			</rr-toolbar-item>
		</rr-toolbar>
	`,
};

export const WithTitleGroupCentered = {
	args: { size: 'md', showLabels: false },
	render: (args) => html`
		<rr-toolbar size=${args.size} show-labels=${args.showLabels || nothing}>
			<rr-toolbar-item slot="start-area">
				<rr-icon-button>
					<rr-icon name="chevron-left"></rr-icon>
					Terug
				</rr-icon-button>
			</rr-toolbar-item>
			<rr-toolbar-title-group
				title="Document titel"
				subtitle="Laatste wijziging: vandaag"
				align="center"
			></rr-toolbar-title-group>
			<rr-toolbar-item slot="end-area">
				<rr-button variant="accent-filled">Opslaan</rr-button>
			</rr-toolbar-item>
		</rr-toolbar>
	`,
};

export const SizeSmall = {
	args: { size: 'sm', showLabels: false },
	render: (args) => html`
		<rr-toolbar size=${args.size} show-labels=${args.showLabels || nothing}>
			<rr-toolbar-item slot="start-area">
				<rr-button>Bewerk</rr-button>
			</rr-toolbar-item>
			<rr-toolbar-divider slot="start-area"></rr-toolbar-divider>
			<rr-toolbar-item slot="start-area">
				<rr-button>Dupliceer</rr-button>
			</rr-toolbar-item>
			<rr-toolbar-item slot="end-area">
				<rr-button variant="accent-filled">Opslaan</rr-button>
			</rr-toolbar-item>
		</rr-toolbar>
	`,
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div>
				<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">md (default)</p>
				<rr-toolbar size="md">
					<rr-toolbar-item slot="start-area">
						<rr-button>Bewerk</rr-button>
					</rr-toolbar-item>
					<rr-toolbar-divider slot="start-area"></rr-toolbar-divider>
					<rr-toolbar-item slot="start-area">
						<rr-button>Dupliceer</rr-button>
					</rr-toolbar-item>
					<rr-toolbar-item slot="end-area">
						<rr-button variant="accent-filled">Opslaan</rr-button>
					</rr-toolbar-item>
				</rr-toolbar>
			</div>
			<div>
				<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">sm</p>
				<rr-toolbar size="sm">
					<rr-toolbar-item slot="start-area">
						<rr-button>Bewerk</rr-button>
					</rr-toolbar-item>
					<rr-toolbar-divider slot="start-area"></rr-toolbar-divider>
					<rr-toolbar-item slot="start-area">
						<rr-button>Dupliceer</rr-button>
					</rr-toolbar-item>
					<rr-toolbar-item slot="end-area">
						<rr-button variant="accent-filled">Opslaan</rr-button>
					</rr-toolbar-item>
				</rr-toolbar>
			</div>
		</div>
	`,
};

export const LabelsToggle = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div>
				<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">Zonder labels</p>
				<rr-toolbar size="md">
					<rr-toolbar-item slot="start-area" label="Vet">
						<rr-icon-button>
							<rr-icon name="bold"></rr-icon>
							Vet
						</rr-icon-button>
					</rr-toolbar-item>
					<rr-toolbar-item slot="start-area" label="Cursief">
						<rr-icon-button>
							<rr-icon name="italic"></rr-icon>
							Cursief
						</rr-icon-button>
					</rr-toolbar-item>
				</rr-toolbar>
			</div>
			<div>
				<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">Met labels</p>
				<rr-toolbar size="md" show-labels>
					<rr-toolbar-item slot="start-area" label="Vet">
						<rr-icon-button>
							<rr-icon name="bold"></rr-icon>
							Vet
						</rr-icon-button>
					</rr-toolbar-item>
					<rr-toolbar-item slot="start-area" label="Cursief">
						<rr-icon-button>
							<rr-icon name="italic"></rr-icon>
							Cursief
						</rr-icon-button>
					</rr-toolbar-item>
				</rr-toolbar>
			</div>
		</div>
	`,
};
