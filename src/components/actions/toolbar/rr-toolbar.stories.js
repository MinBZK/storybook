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
					<rr-icon-button text="Vorige" icon="chevron-left"></rr-icon-button>
					<rr-button-bar-divider></rr-button-bar-divider>
					<rr-icon-button text="Volgende" icon="chevron-right"></rr-icon-button>
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
				<rr-button variant="primary" text="Sla op"></rr-button>
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
					<rr-segmented-control-item value="vet" text="Vet" icon="bold"></rr-segmented-control-item>
					<rr-segmented-control-item value="cursief" text="Cursief" icon="italic"></rr-segmented-control-item>
					<rr-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></rr-segmented-control-item>
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
				<rr-button variant="primary" text="Sla op"></rr-button>
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
				<rr-icon-button text="Terug" icon="chevron-left"></rr-icon-button>
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
				<rr-button text="Annuleer"></rr-button>
				<rr-menu-item
					slot="overflow"
					text="Annuleer"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary" text="Sla op"></rr-button>
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
				<rr-icon-button text="Terug" icon="chevron-left"></rr-icon-button>
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
				<rr-button variant="primary" text="Sla op"></rr-button>
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
				<rr-button text="Bewerken"></rr-button>
				<rr-menu-item
					slot="overflow"
					text="Bewerken"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="start"
				label="Dupliceer"
			>
				<rr-button text="Dupliceer"></rr-button>
				<rr-menu-item
					slot="overflow"
					text="Dupliceer"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary" text="Sla op"></rr-button>
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
							<rr-button text="Bewerken"></rr-button>
							<rr-menu-item
								slot="overflow"
								text="Bewerken"
							></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-item
							slot="start"
							label="Dupliceer"
						>
							<rr-button text="Dupliceer"></rr-button>
							<rr-menu-item
								slot="overflow"
								text="Dupliceer"
							></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-item
							slot="end"
							label="Sla op"
						>
							<rr-button variant="primary" text="Sla op"></rr-button>
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
							<rr-button text="Bewerken"></rr-button>
							<rr-menu-item
								slot="overflow"
								text="Bewerken"
							></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-item
							slot="start"
							label="Dupliceer"
						>
							<rr-button text="Dupliceer"></rr-button>
							<rr-menu-item
								slot="overflow"
								text="Dupliceer"
							></rr-menu-item>
						</rr-toolbar-item>
						<rr-toolbar-item
							slot="end"
							label="Sla op"
						>
							<rr-button variant="primary" text="Sla op"></rr-button>
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
								<rr-segmented-control-item value="vet" text="Vet" icon="bold"></rr-segmented-control-item>
								<rr-segmented-control-item value="cursief" text="Cursief" icon="italic"></rr-segmented-control-item>
								<rr-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></rr-segmented-control-item>
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
								<rr-segmented-control-item value="vet" text="Vet" icon="bold"></rr-segmented-control-item>
								<rr-segmented-control-item value="cursief" text="Cursief" icon="italic"></rr-segmented-control-item>
								<rr-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></rr-segmented-control-item>
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
					<rr-segmented-control-item value="vet" text="Vet" icon="bold"></rr-segmented-control-item>
					<rr-segmented-control-item value="cursief" text="Cursief" icon="italic"></rr-segmented-control-item>
					<rr-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></rr-segmented-control-item>
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
					<rr-segmented-control-item value="none" text="Geen" icon="minus-small"></rr-segmented-control-item>
					<rr-segmented-control-item value="bullet" text="Lijst" icon="bullet-list"></rr-segmented-control-item>
					<rr-segmented-control-item value="numbered" text="Genummerd" icon="numbered-list"></rr-segmented-control-item>
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
				<rr-button text="Annuleer"></rr-button>
				<rr-menu-item
					slot="overflow"
					text="Annuleer"
				></rr-menu-item>
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="end"
				label="Sla op"
			>
				<rr-button variant="primary" text="Sla op"></rr-button>
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
				<rr-icon-button text="Vet" icon="bold"></rr-icon-button>
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
				<rr-icon-button text="Cursief" icon="italic"></rr-icon-button>
				<!-- Geen overflow slot: wordt stilzwijgend overgeslagen in het menu -->
			</rr-toolbar-item>
			<rr-toolbar-item
				slot="start"
				label="Onderstrepen"
			>
				<rr-icon-button text="Onderstrepen" icon="underlined"></rr-icon-button>
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
				<rr-button variant="primary" text="Sla op"></rr-button>
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
					<rr-segmented-control-item value="vet" text="Vet" icon="bold"></rr-segmented-control-item>
					<rr-segmented-control-item value="cursief" text="Cursief" icon="italic"></rr-segmented-control-item>
					<rr-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></rr-segmented-control-item>
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
					<rr-segmented-control-item value="none" text="Geen" icon="minus-small"></rr-segmented-control-item>
					<rr-segmented-control-item value="bullet" text="Lijst" icon="bullet-list"></rr-segmented-control-item>
					<rr-segmented-control-item value="numbered" text="Genummerd" icon="numbered-list"></rr-segmented-control-item>
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
				<rr-button text="Annuleer"></rr-button>
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
				<rr-button variant="primary" text="Sla op"></rr-button>
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
				<rr-icon-button text="Terug" icon="chevron-left"></rr-icon-button>
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
				<rr-button text="Annuleer"></rr-button>
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
				<rr-button variant="primary" text="Sla op"></rr-button>
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
					<rr-segmented-control-item value="vet" text="Vet" icon="bold"></rr-segmented-control-item>
					<rr-segmented-control-item value="cursief" text="Cursief" icon="italic"></rr-segmented-control-item>
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
				<rr-button variant="primary" text="Sla op"></rr-button>
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
				<rr-icon-button text="Terug" icon="chevron-left"></rr-icon-button>
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
				<rr-button variant="primary" text="Sla op"></rr-button>
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
					<rr-segmented-control-item value="vet" text="Vet" icon="bold"></rr-segmented-control-item>
					<rr-segmented-control-item value="cursief" text="Cursief" icon="italic"></rr-segmented-control-item>
					<rr-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></rr-segmented-control-item>
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
					<rr-segmented-control-item value="none" text="Geen" icon="minus-small"></rr-segmented-control-item>
					<rr-segmented-control-item value="bullet" text="Lijst" icon="bullet-list"></rr-segmented-control-item>
					<rr-segmented-control-item value="numbered" text="Genummerd" icon="numbered-list"></rr-segmented-control-item>
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
				<rr-button variant="primary" text="Sla op"></rr-button>
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
