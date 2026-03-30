import { html } from 'lit';
import './rr-toolbar.ts';
import '../button/rr-button.ts';
import '../icon-button/rr-icon-button.ts';
import '../button-bar/rr-button-bar.ts';
import '../../content/icon/rr-icon.ts';
import '../../lists-and-menus/menu/rr-menu.ts';
import '../../inputs/search-field/rr-search-field.ts';
import '../../inputs/segmented-control/rr-segmented-control.ts';

export default {
	title: 'Components/Actions/Toolbar',
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
	<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 8px 0 0;">
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
			<rr-toolbar-item
				slot="start"
				label="Vorige/Volgende"
			>
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
					slot="overflow"
					text="Vorige"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Volgende"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
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
			<rr-toolbar-item
				slot="start"
				label="Tekststijl"
			>
				<rr-segmented-control
					type="checkbox"
					variant="icon"
					size=${args.size}
					accessible-label="Tekststijl"
				>
					<rr-segmented-control-item value="vet">
						<rr-icon
							slot="icon"
							name="bold"
						></rr-icon>
						Vet
					</rr-segmented-control-item>
					<rr-segmented-control-item value="cursief">
						<rr-icon
							slot="icon"
							name="italic"
						></rr-icon>
						Cursief
					</rr-segmented-control-item>
					<rr-segmented-control-item value="onderstrepen">
						<rr-icon
							slot="icon"
							name="underlined"
						></rr-icon>
						Onderstrepen
					</rr-segmented-control-item>
				</rr-segmented-control>
				<rr-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Cursief"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Onderstrepen"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
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
			<rr-toolbar-item
				slot="start"
				label="Terug"
			>
				<rr-icon-button>
					<rr-icon name="chevron-left"></rr-icon>
					Terug
				</rr-icon-button>
				<rr-menu-item
					slot="overflow"
					text="Terug"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-title-group
				slot="start"
				text="Document titel"
				subtext="Laatste wijziging: vandaag"
			></rr-toolbar-title-group>
			<rr-toolbar-item
				slot="end"
				label="Annuleer"
			>
				<rr-button>Annuleer</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Annuleer"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
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
			<rr-toolbar-item
				slot="start"
				label="Terug"
			>
				<rr-icon-button>
					<rr-icon name="chevron-left"></rr-icon>
					Terug
				</rr-icon-button>
				<rr-menu-item
					slot="overflow"
					text="Terug"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-title-group
				slot="center"
				text="Document titel"
				subtext="Laatste wijziging: vandaag"
				align="center"
			></rr-toolbar-title-group>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
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
			<rr-toolbar-item
				slot="start"
				label="Bewerken"
			>
				<rr-button>Bewerken</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Bewerken"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="start"
				label="Dupliceer"
			>
				<rr-button>Dupliceer</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Dupliceer"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
		</rr-toolbar>
	`),
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">md (default)</p>
				${resizable(html`
					<rr-toolbar size="md">
						<rr-toolbar-item
							slot="start"
							label="Bewerken"
						>
							<rr-button>Bewerken</rr-button>
							<rr-menu-item
								slot="overflow"
								text="Bewerken"
							></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-item
							slot="start"
							label="Dupliceer"
						>
							<rr-button>Dupliceer</rr-button>
							<rr-menu-item
								slot="overflow"
								text="Dupliceer"
							></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-item
							slot="end"
							label="Sla op"
						>
							<rr-button variant="primary">Sla op</rr-button>
							<rr-menu-item
								slot="overflow"
								text="Sla op"
							></rr-menu-item>
						</rr-toolbar-item>
					</rr-toolbar>
				`)}
			</div>
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">sm</p>
				${resizable(html`
					<rr-toolbar size="sm">
						<rr-toolbar-item
							slot="start"
							label="Bewerken"
						>
							<rr-button>Bewerken</rr-button>
							<rr-menu-item
								slot="overflow"
								text="Bewerken"
							></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-item
							slot="start"
							label="Dupliceer"
						>
							<rr-button>Dupliceer</rr-button>
							<rr-menu-item
								slot="overflow"
								text="Dupliceer"
							></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-item
							slot="end"
							label="Sla op"
						>
							<rr-button variant="primary">Sla op</rr-button>
							<rr-menu-item
								slot="overflow"
								text="Sla op"
							></rr-menu-item>
						</rr-toolbar-item>
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
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">Zonder labels</p>
				${resizable(html`
					<rr-toolbar size="md">
						<rr-toolbar-item
							slot="start"
							label="Tekststijl"
						>
							<rr-segmented-control
								type="checkbox"
								variant="icon"
								accessible-label="Tekststijl"
							>
								<rr-segmented-control-item value="vet">
									<rr-icon
										slot="icon"
										name="bold"
									></rr-icon>
									Vet
								</rr-segmented-control-item>
								<rr-segmented-control-item value="cursief">
									<rr-icon
										slot="icon"
										name="italic"
									></rr-icon>
									Cursief
								</rr-segmented-control-item>
								<rr-segmented-control-item value="onderstrepen">
									<rr-icon
										slot="icon"
										name="underlined"
									></rr-icon>
									Onderstrepen
								</rr-segmented-control-item>
							</rr-segmented-control>
							<rr-menu-item
								slot="overflow"
								text="Vet"
								type="checkbox"
							></rr-menu-item>
							<rr-menu-item
								slot="overflow"
								text="Cursief"
								type="checkbox"
							></rr-menu-item>
							<rr-menu-item
								slot="overflow"
								text="Onderstrepen"
								type="checkbox"
							></rr-menu-item>
						</rr-toolbar-item>
					</rr-toolbar>
				`)}
			</div>
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">Met labels</p>
				${resizable(html`
					<rr-toolbar
						size="md"
						show-item-labels
					>
						<rr-toolbar-item
							slot="start"
							label="Tekststijl"
						>
							<rr-segmented-control
								type="checkbox"
								variant="icon"
								accessible-label="Tekststijl"
							>
								<rr-segmented-control-item value="vet">
									<rr-icon
										slot="icon"
										name="bold"
									></rr-icon>
									Vet
								</rr-segmented-control-item>
								<rr-segmented-control-item value="cursief">
									<rr-icon
										slot="icon"
										name="italic"
									></rr-icon>
									Cursief
								</rr-segmented-control-item>
								<rr-segmented-control-item value="onderstrepen">
									<rr-icon
										slot="icon"
										name="underlined"
									></rr-icon>
									Onderstrepen
								</rr-segmented-control-item>
							</rr-segmented-control>
							<rr-menu-item
								slot="overflow"
								text="Vet"
								type="checkbox"
							></rr-menu-item>
							<rr-menu-item
								slot="overflow"
								text="Cursief"
								type="checkbox"
							></rr-menu-item>
							<rr-menu-item
								slot="overflow"
								text="Onderstrepen"
								type="checkbox"
							></rr-menu-item>
						</rr-toolbar-item>
					</rr-toolbar>
				`)}
			</div>
		</div>
	`,
};

export const WithOverflow = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-item
				slot="start"
				label="Tekststijl"
			>
				<rr-segmented-control
					type="checkbox"
					variant="icon"
					accessible-label="Tekststijl"
				>
					<rr-segmented-control-item value="vet">
						<rr-icon
							slot="icon"
							name="bold"
						></rr-icon>
						Vet
					</rr-segmented-control-item>
					<rr-segmented-control-item value="cursief">
						<rr-icon
							slot="icon"
							name="italic"
						></rr-icon>
						Cursief
					</rr-segmented-control-item>
					<rr-segmented-control-item value="onderstrepen">
						<rr-icon
							slot="icon"
							name="underlined"
						></rr-icon>
						Onderstrepen
					</rr-segmented-control-item>
				</rr-segmented-control>
				<rr-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Cursief"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Onderstrepen"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="start"
				label="Lijst"
			>
				<rr-segmented-control
					type="radio"
					variant="icon"
					accessible-label="Lijsttype"
				>
					<rr-segmented-control-item value="none">
						<rr-icon
							slot="icon"
							name="minus-small"
						></rr-icon>
						Geen
					</rr-segmented-control-item>
					<rr-segmented-control-item value="bullet">
						<rr-icon
							slot="icon"
							name="bullet-list"
						></rr-icon>
						Lijst
					</rr-segmented-control-item>
					<rr-segmented-control-item value="numbered">
						<rr-icon
							slot="icon"
							name="numbered-list"
						></rr-icon>
						Genummerd
					</rr-segmented-control-item>
				</rr-segmented-control>
				<rr-menu-item
					slot="overflow"
					text="Geen"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Lijst"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Genummerd"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Annuleer"
			>
				<rr-button>Annuleer</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Annuleer"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
		</rr-toolbar>
	`),
};

export const WithOverflowPartial = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-item
				slot="start"
				label="Vet"
			>
				<rr-icon-button>
					<rr-icon name="bold"></rr-icon>
					Vet
				</rr-icon-button>
				<rr-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="start"
				label="Cursief"
			>
				<rr-icon-button>
					<rr-icon name="italic"></rr-icon>
					Cursief
				</rr-icon-button>
				<!-- Geen overflow slot: wordt stilzwijgend overgeslagen in het menu -->
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="start"
				label="Onderstrepen"
			>
				<rr-icon-button>
					<rr-icon name="underlined"></rr-icon>
					Onderstrepen
				</rr-icon-button>
				<rr-menu-item
					slot="overflow"
					text="Onderstrepen"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
		</rr-toolbar>
	`),
};

export const WithPriority = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-item
				slot="start"
				label="Tekststijl"
				priority="1"
			>
				<rr-segmented-control
					type="checkbox"
					variant="icon"
					accessible-label="Tekststijl"
				>
					<rr-segmented-control-item value="vet">
						<rr-icon
							slot="icon"
							name="bold"
						></rr-icon>
						Vet
					</rr-segmented-control-item>
					<rr-segmented-control-item value="cursief">
						<rr-icon
							slot="icon"
							name="italic"
						></rr-icon>
						Cursief
					</rr-segmented-control-item>
					<rr-segmented-control-item value="onderstrepen">
						<rr-icon
							slot="icon"
							name="underlined"
						></rr-icon>
						Onderstrepen
					</rr-segmented-control-item>
				</rr-segmented-control>
				<rr-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Cursief"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Onderstrepen"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="start"
				label="Lijst"
				priority="2"
			>
				<rr-segmented-control
					type="radio"
					variant="icon"
					accessible-label="Lijsttype"
				>
					<rr-segmented-control-item value="none">
						<rr-icon
							slot="icon"
							name="minus-small"
						></rr-icon>
						Geen
					</rr-segmented-control-item>
					<rr-segmented-control-item value="bullet">
						<rr-icon
							slot="icon"
							name="bullet-list"
						></rr-icon>
						Lijst
					</rr-segmented-control-item>
					<rr-segmented-control-item value="numbered">
						<rr-icon
							slot="icon"
							name="numbered-list"
						></rr-icon>
						Genummerd
					</rr-segmented-control-item>
				</rr-segmented-control>
				<rr-menu-item
					slot="overflow"
					text="Geen"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Lijst"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Genummerd"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-title-group
				slot="center"
				text="Document titel"
				subtext="Laatste wijziging: vandaag"
				align="center"
			></rr-toolbar-title-group>
			<rr-toolbar-item
				slot="end"
				label="Annuleer"
				priority="3"
			>
				<rr-button>Annuleer</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Annuleer"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
				priority="10"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
		</rr-toolbar>
	`),
};

export const WithFluidItem = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-item
				slot="start"
				label="Terug"
				priority="1"
			>
				<rr-icon-button>
					<rr-icon name="chevron-left"></rr-icon>
					Terug
				</rr-icon-button>
				<rr-menu-item
					slot="overflow"
					text="Terug"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="center"
				label="Zoeken"
				min-width="240px"
				width="40%"
				priority="3"
			>
				<rr-search-field placeholder="Zoeken..."></rr-search-field>
				<rr-menu-item
					slot="overflow"
					text="Zoeken"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Annuleer"
			>
				<rr-button>Annuleer</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Annuleer"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
				priority="2"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
		</rr-toolbar>
	`),
};

export const WithPinnedOverflow = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-item
				slot="start"
				label="Tekststijl"
			>
				<rr-segmented-control
					type="checkbox"
					variant="icon"
					accessible-label="Tekststijl"
				>
					<rr-segmented-control-item value="vet">
						<rr-icon
							slot="icon"
							name="bold"
						></rr-icon>
						Vet
					</rr-segmented-control-item>
					<rr-segmented-control-item value="cursief">
						<rr-icon
							slot="icon"
							name="italic"
						></rr-icon>
						Cursief
					</rr-segmented-control-item>
				</rr-segmented-control>
				<rr-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Cursief"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-menu-divider slot="overflow"></rr-menu-divider>
			<rr-menu-item
				slot="overflow"
				text="Instellingen"
			></rr-menu-item>
			<rr-menu-item
				slot="overflow"
				text="Help"
			></rr-menu-item>
		</rr-toolbar>
	`),
};

export const WithPinnedOverflowOnly = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-item
				slot="start"
				label="Terug"
			>
				<rr-icon-button>
					<rr-icon name="chevron-left"></rr-icon>
					Terug
				</rr-icon-button>
			</rr-toolbar-item>
			<rr-toolbar-title-group
				slot="start"
				text="Document titel"
				subtext="Laatste wijziging: vandaag"
			></rr-toolbar-title-group>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary">Sla op</rr-button>
			</rr-toolbar-item>
			<rr-menu-divider slot="overflow"></rr-menu-divider>
			<rr-menu-item
				slot="overflow"
				text="Exporteren"
			></rr-menu-item>
			<rr-menu-item
				slot="overflow"
				text="Delen"
			></rr-menu-item>
			<rr-menu-divider slot="overflow"></rr-menu-divider>
			<rr-menu-item
				slot="overflow"
				text="Verwijder"
			></rr-menu-item>
		</rr-toolbar>
	`),
};

export const WithPinnedAndDynamicOverflow = {
	render: () => resizable(html`
		<rr-toolbar size="md">
			<rr-toolbar-item
				slot="start"
				label="Tekststijl"
				priority="1"
			>
				<rr-segmented-control
					type="checkbox"
					variant="icon"
					accessible-label="Tekststijl"
				>
					<rr-segmented-control-item value="vet">
						<rr-icon
							slot="icon"
							name="bold"
						></rr-icon>
						Vet
					</rr-segmented-control-item>
					<rr-segmented-control-item value="cursief">
						<rr-icon
							slot="icon"
							name="italic"
						></rr-icon>
						Cursief
					</rr-segmented-control-item>
					<rr-segmented-control-item value="onderstrepen">
						<rr-icon
							slot="icon"
							name="underlined"
						></rr-icon>
						Onderstrepen
					</rr-segmented-control-item>
				</rr-segmented-control>
				<rr-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Cursief"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Onderstrepen"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="start"
				label="Lijst"
				priority="2"
			>
				<rr-segmented-control
					type="radio"
					variant="icon"
					accessible-label="Lijsttype"
				>
					<rr-segmented-control-item value="none">
						<rr-icon
							slot="icon"
							name="minus-small"
						></rr-icon>
						Geen
					</rr-segmented-control-item>
					<rr-segmented-control-item value="bullet">
						<rr-icon
							slot="icon"
							name="bullet-list"
						></rr-icon>
						Lijst
					</rr-segmented-control-item>
					<rr-segmented-control-item value="numbered">
						<rr-icon
							slot="icon"
							name="numbered-list"
						></rr-icon>
						Genummerd
					</rr-segmented-control-item>
				</rr-segmented-control>
				<rr-menu-item
					slot="overflow"
					text="Geen"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Lijst"
					type="checkbox"
				></rr-menu-item>
				<rr-menu-item
					slot="overflow"
					text="Genummerd"
					type="checkbox"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
				priority="10"
			>
				<rr-button variant="primary">Sla op</rr-button>
				<rr-menu-item
					slot="overflow"
					text="Sla op"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-menu-divider slot="overflow"></rr-menu-divider>
			<rr-menu-item
				slot="overflow"
				text="Exporteren"
			></rr-menu-item>
			<rr-menu-item
				slot="overflow"
				text="Instellingen"
			></rr-menu-item>
			<rr-menu-divider slot="overflow"></rr-menu-divider>
			<rr-menu-item
				slot="overflow"
				text="Verwijder"
			></rr-menu-item>
		</rr-toolbar>
	`),
};
