import { html, nothing } from 'lit';
import './rr-toolbar.ts';
import '../../actions/button/rr-button.ts';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';
import '../button-bar/rr-button-bar.ts';
import '../../lists-and-menus/menu/rr-menu.ts';

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
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Vorige/Volgende">
					<rr-button-bar>
						<rr-icon-button>
							<rr-icon name="chevron-left"></rr-icon>
							Vorige
						</rr-icon-button>
						<rr-button-bar-divider></rr-button-bar-divider>
						<rr-icon-button>
							<rr-icon name="chevron-right"></rr-icon>
							Volgende
						</rr-icon-button>
					</rr-button-bar>
					<rr-menu-item slot="overflow" title="Vorige"></rr-menu-item>
					<rr-menu-item slot="overflow" title="Volgende"></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item slot="overflow" title="Opslaan"></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`,
};

export const WithLabels = {
	args: { size: 'md', showLabels: true },
	render: (args) => html`
		<rr-toolbar size=${args.size} show-labels=${args.showLabels || nothing}>
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Vet">
					<rr-icon-button>
						<rr-icon name="bold"></rr-icon>
						Vet
					</rr-icon-button>
					<rr-menu-item slot="overflow" title="Vet"></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Cursief">
					<rr-icon-button>
						<rr-icon name="italic"></rr-icon>
						Cursief
					</rr-icon-button>
					<rr-menu-item slot="overflow" title="Cursief"></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item slot="overflow" title="Opslaan"></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`,
};

export const WithDivider = {
	args: { size: 'md', showLabels: false },
	render: (args) => html`
		<rr-toolbar size=${args.size} show-labels=${args.showLabels || nothing}>
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Bestand">
					<rr-button>Bestand</rr-button>
					<rr-menu-item slot="overflow" title="Bestand"></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Bewerk">
					<rr-button>Bewerk</rr-button>
					<rr-menu-item slot="overflow" title="Bewerk"></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-divider></rr-toolbar-divider>
				<rr-toolbar-item label="Weergave">
					<rr-button>Weergave</rr-button>
					<rr-menu-item slot="overflow" title="Weergave"></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item slot="overflow" title="Opslaan"></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`,
};

export const WithTitleGroup = {
	args: { size: 'md', showLabels: false },
	render: (args) => html`
		<rr-toolbar size=${args.size} show-labels=${args.showLabels || nothing}>
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Terug">
					<rr-icon-button>
						<rr-icon name="chevron-left"></rr-icon>
						Terug
					</rr-icon-button>
					<rr-menu-item slot="overflow" title="Terug"></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-title-group
					title="Document titel"
					subtitle="Laatste wijziging: vandaag"
				></rr-toolbar-title-group>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Annuleren">
					<rr-button>Annuleren</rr-button>
					<rr-menu-item slot="overflow" title="Annuleren"></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item slot="overflow" title="Opslaan"></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`,
};

export const WithTitleGroupCentered = {
	args: { size: 'md', showLabels: false },
	render: (args) => html`
		<rr-toolbar size=${args.size} show-labels=${args.showLabels || nothing}>
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Terug">
					<rr-icon-button>
						<rr-icon name="chevron-left"></rr-icon>
						Terug
					</rr-icon-button>
					<rr-menu-item slot="overflow" title="Terug"></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-center-area>
				<rr-toolbar-title-group
					title="Document titel"
					subtitle="Laatste wijziging: vandaag"
					align="center"
				></rr-toolbar-title-group>
			</rr-toolbar-center-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item slot="overflow" title="Opslaan"></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`,
};

export const SizeSmall = {
	args: { size: 'sm', showLabels: false },
	render: (args) => html`
		<rr-toolbar size=${args.size} show-labels=${args.showLabels || nothing}>
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Bewerk">
					<rr-button>Bewerk</rr-button>
					<rr-menu-item slot="overflow" title="Bewerk"></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-divider></rr-toolbar-divider>
				<rr-toolbar-item label="Dupliceer">
					<rr-button>Dupliceer</rr-button>
					<rr-menu-item slot="overflow" title="Dupliceer"></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item slot="overflow" title="Opslaan"></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`,
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div>
				<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">md (default)</p>
				<rr-toolbar size="md">
					<rr-toolbar-start-area>
						<rr-toolbar-item label="Bewerk">
							<rr-button>Bewerk</rr-button>
							<rr-menu-item slot="overflow" title="Bewerk"></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-divider></rr-toolbar-divider>
						<rr-toolbar-item label="Dupliceer">
							<rr-button>Dupliceer</rr-button>
							<rr-menu-item slot="overflow" title="Dupliceer"></rr-menu-item>
						</rr-toolbar-item>
					</rr-toolbar-start-area>
					<rr-toolbar-end-area>
						<rr-toolbar-item label="Opslaan">
							<rr-button variant="accent-filled">Opslaan</rr-button>
							<rr-menu-item slot="overflow" title="Opslaan"></rr-menu-item>
						</rr-toolbar-item>
					</rr-toolbar-end-area>
				</rr-toolbar>
			</div>
			<div>
				<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">sm</p>
				<rr-toolbar size="sm">
					<rr-toolbar-start-area>
						<rr-toolbar-item label="Bewerk">
							<rr-button>Bewerk</rr-button>
							<rr-menu-item slot="overflow" title="Bewerk"></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-divider></rr-toolbar-divider>
						<rr-toolbar-item label="Dupliceer">
							<rr-button>Dupliceer</rr-button>
							<rr-menu-item slot="overflow" title="Dupliceer"></rr-menu-item>
						</rr-toolbar-item>
					</rr-toolbar-start-area>
					<rr-toolbar-end-area>
						<rr-toolbar-item label="Opslaan">
							<rr-button variant="accent-filled">Opslaan</rr-button>
							<rr-menu-item slot="overflow" title="Opslaan"></rr-menu-item>
						</rr-toolbar-item>
					</rr-toolbar-end-area>
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
					<rr-toolbar-start-area>
						<rr-toolbar-item label="Vet">
							<rr-icon-button>
								<rr-icon name="bold"></rr-icon>
								Vet
							</rr-icon-button>
							<rr-menu-item slot="overflow" title="Vet"></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-item label="Cursief">
							<rr-icon-button>
								<rr-icon name="italic"></rr-icon>
								Cursief
							</rr-icon-button>
							<rr-menu-item slot="overflow" title="Cursief"></rr-menu-item>
						</rr-toolbar-item>
					</rr-toolbar-start-area>
				</rr-toolbar>
			</div>
			<div>
				<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">Met labels</p>
				<rr-toolbar size="md" show-labels>
					<rr-toolbar-start-area>
						<rr-toolbar-item label="Vet">
							<rr-icon-button>
								<rr-icon name="bold"></rr-icon>
								Vet
							</rr-icon-button>
							<rr-menu-item slot="overflow" title="Vet"></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-item label="Cursief">
							<rr-icon-button>
								<rr-icon name="italic"></rr-icon>
								Cursief
							</rr-icon-button>
							<rr-menu-item slot="overflow" title="Cursief"></rr-menu-item>
						</rr-toolbar-item>
					</rr-toolbar-start-area>
				</rr-toolbar>
			</div>
		</div>
	`,
};

export const WithOverflow = {
	render: () => html`
		<div style="resize: horizontal; overflow: hidden; min-width: 200px; max-width: 100%; padding-bottom: 8px;">
			<rr-toolbar size="md">
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Vet">
						<rr-icon-button>
							<rr-icon name="bold"></rr-icon>
							Vet
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Vet"></rr-menu-item>
					</rr-toolbar-item>
					<rr-toolbar-item label="Cursief">
						<rr-icon-button>
							<rr-icon name="italic"></rr-icon>
							Cursief
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Cursief"></rr-menu-item>
					</rr-toolbar-item>
					<rr-toolbar-item label="Onderstrepen">
						<rr-icon-button>
							<rr-icon name="underline"></rr-icon>
							Onderstrepen
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Onderstrepen"></rr-menu-item>
					</rr-toolbar-item>
					<rr-toolbar-divider></rr-toolbar-divider>
					<rr-toolbar-item label="Lijst">
						<rr-icon-button>
							<rr-icon name="list-bullet"></rr-icon>
							Lijst
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Lijst"></rr-menu-item>
					</rr-toolbar-item>
					<rr-toolbar-item label="Genummerd">
						<rr-icon-button>
							<rr-icon name="list-number"></rr-icon>
							Genummerd
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Genummerd"></rr-menu-item>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
				<rr-toolbar-end-area>
					<rr-toolbar-item label="Annuleren">
						<rr-button>Annuleren</rr-button>
						<rr-menu-item slot="overflow" title="Annuleren"></rr-menu-item>
					</rr-toolbar-item>
					<rr-toolbar-item label="Opslaan">
						<rr-button variant="accent-filled">Opslaan</rr-button>
						<rr-menu-item slot="overflow" title="Opslaan"></rr-menu-item>
					</rr-toolbar-item>
				</rr-toolbar-end-area>
			</rr-toolbar>
		</div>
		<p style="font-size: 0.75rem; color: #64748b; margin: 8px 0 0;">
			↔ Sleep de hoek rechtsonder om de breedte aan te passen
		</p>
	`,
};

export const WithOverflowPartial = {
	render: () => html`
		<div style="resize: horizontal; overflow: hidden; min-width: 200px; max-width: 100%; padding-bottom: 8px;">
			<rr-toolbar size="md">
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Vet">
						<rr-icon-button>
							<rr-icon name="bold"></rr-icon>
							Vet
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Vet"></rr-menu-item>
					</rr-toolbar-item>
					<rr-toolbar-item label="Cursief">
						<rr-icon-button>
							<rr-icon name="italic"></rr-icon>
							Cursief
						</rr-icon-button>
						<!-- No overflow slot: silently skipped in the menu -->
					</rr-toolbar-item>
					<rr-toolbar-item label="Onderstrepen">
						<rr-icon-button>
							<rr-icon name="underline"></rr-icon>
							Onderstrepen
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Onderstrepen"></rr-menu-item>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
				<rr-toolbar-end-area>
					<rr-toolbar-item label="Opslaan">
						<rr-button variant="accent-filled">Opslaan</rr-button>
						<rr-menu-item slot="overflow" title="Opslaan"></rr-menu-item>
					</rr-toolbar-item>
				</rr-toolbar-end-area>
			</rr-toolbar>
		</div>
		<p style="font-size: 0.75rem; color: #64748b; margin: 8px 0 0;">
			↔ Sleep de hoek rechtsonder — "Cursief" heeft geen overflow slot en verschijnt niet in het menu
		</p>
	`,
};

export const WithPriority = {
	render: () => html`
		<div style="resize: horizontal; overflow: hidden; min-width: 200px; max-width: 100%; padding-bottom: 8px;">
			<rr-toolbar size="md">
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Vet" priority="1">
						<rr-icon-button>
							<rr-icon name="bold"></rr-icon>
							Vet
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Vet"></rr-menu-item>
					</rr-toolbar-item>
					<rr-toolbar-item label="Cursief" priority="1">
						<rr-icon-button>
							<rr-icon name="italic"></rr-icon>
							Cursief
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Cursief"></rr-menu-item>
					</rr-toolbar-item>
					<rr-toolbar-item label="Onderstrepen" priority="1">
						<rr-icon-button>
							<rr-icon name="underline"></rr-icon>
							Onderstrepen
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Onderstrepen"></rr-menu-item>
					</rr-toolbar-item>
					<rr-toolbar-divider></rr-toolbar-divider>
					<rr-toolbar-item label="Lijst" priority="2">
						<rr-icon-button>
							<rr-icon name="list-bullet"></rr-icon>
							Lijst
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Lijst"></rr-menu-item>
					</rr-toolbar-item>
					<rr-toolbar-item label="Genummerd" priority="2">
						<rr-icon-button>
							<rr-icon name="list-number"></rr-icon>
							Genummerd
						</rr-icon-button>
						<rr-menu-item slot="overflow" title="Genummerd"></rr-menu-item>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
				<rr-toolbar-center-area>
					<rr-toolbar-title-group
						title="Document titel"
						subtitle="Laatste wijziging: vandaag"
						align="center"
					></rr-toolbar-title-group>
				</rr-toolbar-center-area>
				<rr-toolbar-end-area>
					<rr-toolbar-item label="Annuleren" priority="3">
						<rr-button>Annuleren</rr-button>
						<rr-menu-item slot="overflow" title="Annuleren"></rr-menu-item>
					</rr-toolbar-item>
					<rr-toolbar-item label="Opslaan" priority="10">
						<rr-button variant="accent-filled">Opslaan</rr-button>
						<rr-menu-item slot="overflow" title="Opslaan"></rr-menu-item>
					</rr-toolbar-item>
				</rr-toolbar-end-area>
			</rr-toolbar>
		</div>
		<p style="font-size: 0.75rem; color: #64748b; margin: 8px 0 0;">
			↔ Sleep de hoek rechtsonder — "Opslaan" (priority 10) blijft het langst zichtbaar,
			opmaakacties (priority 1) verdwijnen als eerste
		</p>
	`,
};
