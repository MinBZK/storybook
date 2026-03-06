import { html } from 'lit';
import './rr-toolbar.ts';
import '../../actions/button/rr-button.ts';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';
import '../button-bar/rr-button-bar.ts';
import '../../lists-and-menus/menu/rr-menu.ts';
import '../../inputs/search-field/rr-search-field.ts';
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
		showItemLabels: {
			control: 'boolean',
			description: 'Show labels below toolbar items',
		},
	},
};
const resizable = (content) => html`
	<div style="resize: horizontal; overflow: hidden; min-width: 200px; max-width: 100%; padding: 8px;">
		${content}
	</div>
	<p style="font-size: 0.75rem; color: #64748b; margin: 8px 0 0;">
		↔ Sleep de hoek rechtsonder om de breedte aan te passen
	</p>
`;
export const Default = {
	args: { size: 'md', showItemLabels: false },
	render: (args) => resizable(html`
		<rr-toolbar
			size=${args.size}
			?show-item-labels=${args.showItemLabels}
		>
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
					<rr-menu-item
						text="Vorige"
					></rr-menu-item>
					<rr-menu-item
						text="Volgende"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item
						text="Opslaan"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`),
};
export const WithLabels = {
	args: { size: 'md', showItemLabels: true },
	render: (args) => resizable(html`
		<rr-toolbar
			size=${args.size}
			?show-item-labels=${args.showItemLabels}
		>
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Vet">
					<rr-icon-button>
						<rr-icon name="bold"></rr-icon>
						Vet
					</rr-icon-button>
					<rr-menu-item
						text="Vet"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Cursief">
					<rr-icon-button>
						<rr-icon name="italic"></rr-icon>
						Cursief
					</rr-icon-button>
					<rr-menu-item
						text="Cursief"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Onderstrepen">
					<rr-icon-button>
						<rr-icon name="underlined"></rr-icon>
						Onderstrepen
					</rr-icon-button>
					<rr-menu-item
						text="Onderstrepen"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item
						text="Opslaan"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`),
};
export const WithTitleGroup = {
	args: { size: 'md', showItemLabels: false },
	render: (args) => resizable(html`
		<rr-toolbar
			size=${args.size}
			?show-item-labels=${args.showItemLabels}
		>
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Terug">
					<rr-icon-button>
						<rr-icon name="chevron-left"></rr-icon>
						Terug
					</rr-icon-button>
					<rr-menu-item
						text="Terug"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-title-group
					text="Document titel"
					subtext="Laatste wijziging: vandaag"
				></rr-toolbar-title-group>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Annuleren">
					<rr-button>Annuleren</rr-button>
					<rr-menu-item
						text="Annuleren"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item
						text="Opslaan"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`),
};
export const WithTitleGroupCentered = {
	args: { size: 'md', showItemLabels: false },
	render: (args) => resizable(html`
		<rr-toolbar
			size=${args.size}
			?show-item-labels=${args.showItemLabels}
		>
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Terug">
					<rr-icon-button>
						<rr-icon name="chevron-left"></rr-icon>
						Terug
					</rr-icon-button>
					<rr-menu-item
						text="Terug"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-center-area>
				<rr-toolbar-title-group
					text="Document titel"
					subtext="Laatste wijziging: vandaag"
					align="center"
				></rr-toolbar-title-group>
			</rr-toolbar-center-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item
						text="Opslaan"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`),
};
export const SizeSmall = {
	args: { size: 'sm', showItemLabels: false },
	render: (args) => resizable(html`
		<rr-toolbar
			size=${args.size}
			?show-item-labels=${args.showItemLabels}
		>
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Bewerk">
					<rr-button>Bewerk</rr-button>
					<rr-menu-item
						text="Bewerk"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Dupliceer">
					<rr-button>Dupliceer</rr-button>
					<rr-menu-item
						text="Dupliceer"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item
						text="Opslaan"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`),
};
export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div>
				<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">md (default)</p>
				${resizable(html`
					<rr-toolbar size="md">
						<rr-toolbar-start-area>
							<rr-toolbar-item label="Bewerk">
								<rr-button>Bewerk</rr-button>
								<rr-menu-item
									text="Bewerk"
								></rr-menu-item>
							</rr-toolbar-item>
							<rr-toolbar-item label="Dupliceer">
								<rr-button>Dupliceer</rr-button>
								<rr-menu-item
									text="Dupliceer"
								></rr-menu-item>
							</rr-toolbar-item>
						</rr-toolbar-start-area>
						<rr-toolbar-end-area>
							<rr-toolbar-item label="Opslaan">
								<rr-button variant="accent-filled">Opslaan</rr-button>
								<rr-menu-item
									text="Opslaan"
								></rr-menu-item>
							</rr-toolbar-item>
						</rr-toolbar-end-area>
					</rr-toolbar>
				`)}
			</div>
			<div>
				<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">sm</p>
				${resizable(html`
					<rr-toolbar size="sm">
						<rr-toolbar-start-area>
							<rr-toolbar-item label="Bewerk">
								<rr-button>Bewerk</rr-button>
								<rr-menu-item
									text="Bewerk"
								></rr-menu-item>
							</rr-toolbar-item>
							<rr-toolbar-item label="Dupliceer">
								<rr-button>Dupliceer</rr-button>
								<rr-menu-item
									text="Dupliceer"
								></rr-menu-item>
							</rr-toolbar-item>
						</rr-toolbar-start-area>
						<rr-toolbar-end-area>
							<rr-toolbar-item label="Opslaan">
								<rr-button variant="accent-filled">Opslaan</rr-button>
								<rr-menu-item
									text="Opslaan"
								></rr-menu-item>
							</rr-toolbar-item>
						</rr-toolbar-end-area>
					</rr-toolbar>
				`)}
			</div>
		</div>
	`,
};
export const LabelsToggle = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div>
				<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">Zonder labels</p>
				${resizable(html`
					<rr-toolbar size="md">
						<rr-toolbar-start-area>
							<rr-toolbar-item label="Vet">
								<rr-icon-button>
									<rr-icon name="bold"></rr-icon>
									Vet
								</rr-icon-button>
								<rr-menu-item
									text="Vet"
									type="checkbox"
								></rr-menu-item>
							</rr-toolbar-item>
							<rr-toolbar-item label="Cursief">
								<rr-icon-button>
									<rr-icon name="italic"></rr-icon>
									Cursief
								</rr-icon-button>
								<rr-menu-item
									text="Cursief"
									type="checkbox"
								></rr-menu-item>
							</rr-toolbar-item>
							<rr-toolbar-item label="Onderstrepen">
								<rr-icon-button>
									<rr-icon name="underlined"></rr-icon>
									Onderstrepen
								</rr-icon-button>
								<rr-menu-item
									text="Onderstrepen"
									type="checkbox"
								></rr-menu-item>
							</rr-toolbar-item>
						</rr-toolbar-start-area>
					</rr-toolbar>
				`)}
			</div>
			<div>
				<p style="font-size: 0.75rem; color: #64748b; margin: 0 0 8px;">Met labels</p>
				${resizable(html`
					<rr-toolbar
						size="md"
						show-item-labels
					>
						<rr-toolbar-start-area>
							<rr-toolbar-item label="Vet">
								<rr-icon-button>
									<rr-icon name="bold"></rr-icon>
									Vet
								</rr-icon-button>
								<rr-menu-item
									text="Vet"
									type="checkbox"
								></rr-menu-item>
							</rr-toolbar-item>
							<rr-toolbar-item label="Cursief">
								<rr-icon-button>
									<rr-icon name="italic"></rr-icon>
									Cursief
								</rr-icon-button>
								<rr-menu-item
									text="Cursief"
									type="checkbox"
								></rr-menu-item>
							</rr-toolbar-item>
							<rr-toolbar-item label="Onderstrepen">
								<rr-icon-button>
									<rr-icon name="underlined"></rr-icon>
									Onderstrepen
								</rr-icon-button>
								<rr-menu-item
									text="Onderstrepen"
									type="checkbox"
								></rr-menu-item>
							</rr-toolbar-item>
						</rr-toolbar-start-area>
					</rr-toolbar>
				`)}
			</div>
		</div>
	`,
};
export const WithOverflow = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Vet">
					<rr-icon-button>
						<rr-icon name="bold"></rr-icon>
						Vet
					</rr-icon-button>
					<rr-menu-item
						text="Vet"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Cursief">
					<rr-icon-button>
						<rr-icon name="italic"></rr-icon>
						Cursief
					</rr-icon-button>
					<rr-menu-item
						text="Cursief"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Onderstrepen">
					<rr-icon-button>
						<rr-icon name="underlined"></rr-icon>
						Onderstrepen
					</rr-icon-button>
					<rr-menu-item
						text="Onderstrepen"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Lijst">
					<rr-icon-button>
						<rr-icon name="bullet-list"></rr-icon>
						Lijst
					</rr-icon-button>
					<rr-menu-item
						text="Lijst"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Genummerd">
					<rr-icon-button>
						<rr-icon name="numbered-list"></rr-icon>
						Genummerd
					</rr-icon-button>
					<rr-menu-item
						text="Genummerd"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Annuleren">
					<rr-button>Annuleren</rr-button>
					<rr-menu-item
						text="Annuleren"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item
						text="Opslaan"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`),
};
export const WithOverflowPartial = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Vet">
					<rr-icon-button>
						<rr-icon name="bold"></rr-icon>
						Vet
					</rr-icon-button>
					<rr-menu-item
						text="Vet"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Cursief">
					<rr-icon-button>
						<rr-icon name="italic"></rr-icon>
						Cursief
					</rr-icon-button>
					<!-- Geen overflow slot: wordt stilzwijgend overgeslagen in het menu -->
				</rr-toolbar-item>
				<rr-toolbar-item label="Onderstrepen">
					<rr-icon-button>
						<rr-icon name="underlined"></rr-icon>
						Onderstrepen
					</rr-icon-button>
					<rr-menu-item
						text="Onderstrepen"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item
						text="Opslaan"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`),
};
export const WithPriority = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-start-area>
				<rr-toolbar-item
					label="Vet"
					priority="1"
				>
					<rr-icon-button>
						<rr-icon name="bold"></rr-icon>
						Vet
					</rr-icon-button>
					<rr-menu-item
						text="Vet"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item
					label="Cursief"
					priority="1"
				>
					<rr-icon-button>
						<rr-icon name="italic"></rr-icon>
						Cursief
					</rr-icon-button>
					<rr-menu-item
						text="Cursief"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item
					label="Onderstrepen"
					priority="1"
				>
					<rr-icon-button>
						<rr-icon name="underlined"></rr-icon>
						Onderstrepen
					</rr-icon-button>
					<rr-menu-item
						text="Onderstrepen"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item
					label="Lijst"
					priority="2"
				>
					<rr-icon-button>
						<rr-icon name="bullet-list"></rr-icon>
						Lijst
					</rr-icon-button>
					<rr-menu-item
						text="Lijst"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item
					label="Genummerd"
					priority="2"
				>
					<rr-icon-button>
						<rr-icon name="numbered-list"></rr-icon>
						Genummerd
					</rr-icon-button>
					<rr-menu-item
						text="Genummerd"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-center-area>
				<rr-toolbar-title-group
					text="Document titel"
					subtext="Laatste wijziging: vandaag"
					align="center"
				></rr-toolbar-title-group>
			</rr-toolbar-center-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item
					label="Annuleren"
					priority="3"
				>
					<rr-button>Annuleren</rr-button>
					<rr-menu-item
						text="Annuleren"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item
					label="Opslaan"
					priority="10"
				>
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item
						text="Opslaan"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`),
};
export const WithFluidItem = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-start-area>
				<rr-toolbar-item
					label="Terug"
					priority="1"
				>
					<rr-icon-button>
						<rr-icon name="chevron-left"></rr-icon>
						Terug
					</rr-icon-button>
					<rr-menu-item
						text="Terug"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-center-area>
				<rr-toolbar-item
					label="Zoeken"
					min-width="240px"
					width="40%"
					priority="3"
				>
					<rr-search-field placeholder="Zoeken..."></rr-search-field>
					<rr-menu-item
						text="Zoeken"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-center-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Annuleren">
					<rr-button>Annuleren</rr-button>
					<rr-menu-item
						text="Annuleren"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item
					label="Opslaan"
					priority="2"
				>
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item
						text="Opslaan"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
		</rr-toolbar>
	`),
};
export const WithPinnedOverflow = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Vet">
					<rr-icon-button>
						<rr-icon name="bold"></rr-icon>
						Vet
					</rr-icon-button>
					<rr-menu-item
						text="Vet"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item label="Cursief">
					<rr-icon-button>
						<rr-icon name="italic"></rr-icon>
						Cursief
					</rr-icon-button>
					<rr-menu-item
						text="Cursief"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item
						text="Opslaan"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
			<rr-toolbar-overflow-area>
				<rr-menu-divider></rr-menu-divider>
				<rr-menu-item text="Instellingen"></rr-menu-item>
				<rr-menu-item text="Help"></rr-menu-item>
			</rr-toolbar-overflow-area>
		</rr-toolbar>
	`),
};
export const WithPinnedOverflowOnly = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-start-area>
				<rr-toolbar-item label="Terug">
					<rr-icon-button>
						<rr-icon name="chevron-left"></rr-icon>
						Terug
					</rr-icon-button>
				</rr-toolbar-item>
				<rr-toolbar-title-group
					text="Document titel"
					subtext="Laatste wijziging: vandaag"
				></rr-toolbar-title-group>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item label="Opslaan">
					<rr-button variant="accent-filled">Opslaan</rr-button>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
			<rr-toolbar-overflow-area>
				<rr-menu-divider></rr-menu-divider>
				<rr-menu-item text="Exporteren"></rr-menu-item>
				<rr-menu-item text="Delen"></rr-menu-item>
				<rr-menu-divider></rr-menu-divider>
				<rr-menu-item text="Verwijderen"></rr-menu-item>
			</rr-toolbar-overflow-area>
		</rr-toolbar>
	`),
};
export const WithPinnedAndDynamicOverflow = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-start-area>
				<rr-toolbar-item
					label="Vet"
					priority="1"
				>
					<rr-icon-button>
						<rr-icon name="bold"></rr-icon>
						Vet
					</rr-icon-button>
					<rr-menu-item
						text="Vet"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item
					label="Cursief"
					priority="1"
				>
					<rr-icon-button>
						<rr-icon name="italic"></rr-icon>
						Cursief
					</rr-icon-button>
					<rr-menu-item
						text="Cursief"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item
					label="Onderstrepen"
					priority="1"
				>
					<rr-icon-button>
						<rr-icon name="underlined"></rr-icon>
						Onderstrepen
					</rr-icon-button>
					<rr-menu-item
						text="Onderstrepen"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item
					label="Lijst"
					priority="2"
				>
					<rr-icon-button>
						<rr-icon name="bullet-list"></rr-icon>
						Lijst
					</rr-icon-button>
					<rr-menu-item
						text="Lijst"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
				<rr-toolbar-item
					label="Genummerd"
					priority="2"
				>
					<rr-icon-button>
						<rr-icon name="numbered-list"></rr-icon>
						Genummerd
					</rr-icon-button>
					<rr-menu-item
						text="Genummerd"
						type="checkbox"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-start-area>
			<rr-toolbar-end-area>
				<rr-toolbar-item
					label="Opslaan"
					priority="10"
				>
					<rr-button variant="accent-filled">Opslaan</rr-button>
					<rr-menu-item
						text="Opslaan"
					></rr-menu-item>
				</rr-toolbar-item>
			</rr-toolbar-end-area>
			<rr-toolbar-overflow-area>
				<rr-menu-divider></rr-menu-divider>
				<rr-menu-item text="Exporteren"></rr-menu-item>
				<rr-menu-item text="Instellingen"></rr-menu-item>
				<rr-menu-divider></rr-menu-divider>
				<rr-menu-item text="Verwijderen"></rr-menu-item>
			</rr-toolbar-overflow-area>
		</rr-toolbar>
	`),
};
