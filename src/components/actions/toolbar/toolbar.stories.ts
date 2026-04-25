import { html, type TemplateResult } from 'lit';
import './toolbar.js';
import '../button/button.js';
import '../icon-button/icon-button.js';
import '../button-bar/button-bar.js';
import '../../content/icon/icon.js';
import '../../lists-and-menus/menu/menu.js';
import '../../inputs/search-field/search-field.js';
import '../../inputs/segmented-control/segmented-control.js';

export default {
	title: 'Components/Actions/Toolbar',
	component: 'nldd-toolbar',
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Toolbar size',
			table: { defaultValue: { summary: 'md' } },
		},
		showItemLabels: {
			name: 'show-item-labels',
			control: 'boolean',
			description: 'Show labels below toolbar items',
			table: { defaultValue: { summary: 'false' } },
		},
	},
};

const resizable = (content: TemplateResult) => html`
	<div style="resize: horizontal; overflow: hidden; min-width: 200px; max-width: 100%; padding: 8px;">
		${content}
	</div>
	<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 8px 0 0;">
		↔ Sleep de hoek rechtsonder om de breedte aan te passen
	</p>
`;

export const Default = {
	args: { size: 'md', showItemLabels: false },
	render: (args: Record<string, any>) => resizable(html`
		<nldd-toolbar
			size=${args.size}
			?show-item-labels=${args.showItemLabels}
		>
			<nldd-toolbar-item
				slot="start"
				label="Vorige/Volgende"
			>
				<nldd-button-bar>
					<nldd-icon-button text="Vorige" icon="chevron-left"></nldd-icon-button>
					<nldd-button-bar-divider></nldd-button-bar-divider>
					<nldd-icon-button text="Volgende" icon="chevron-right"></nldd-icon-button>
				</nldd-button-bar>
				<nldd-menu-item
					slot="overflow"
					text="Vorige"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Volgende"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const WithLabels = {
	args: { size: 'md', showItemLabels: true },
	render: (args: Record<string, any>) => resizable(html`
		<nldd-toolbar
			size=${args.size}
			?show-item-labels=${args.showItemLabels}
		>
			<nldd-toolbar-item
				slot="start"
				label="Tekststijl"
			>
				<nldd-segmented-control
					type="checkbox"
					variant="icon"
					size=${args.size}
					accessible-label="Tekststijl"
				>
					<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></nldd-segmented-control-item>
				</nldd-segmented-control>
				<nldd-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Cursief"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Onderstrepen"
					type="checkbox"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const WithTitleGroup = {
	args: { size: 'md', showItemLabels: false },
	render: (args: Record<string, any>) => resizable(html`
		<nldd-toolbar
			size=${args.size}
			?show-item-labels=${args.showItemLabels}
		>
			<nldd-toolbar-item
				slot="start"
				label="Terug"
			>
				<nldd-icon-button text="Terug" icon="chevron-left"></nldd-icon-button>
				<nldd-menu-item
					slot="overflow"
					text="Terug"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-title-group
				slot="start"
				text="Document titel"
				subtext="Laatste wijziging: vandaag"
			></nldd-toolbar-title-group>
			<nldd-toolbar-item
				slot="end"
				label="Annuleer"
			>
				<nldd-button text="Annuleer"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Annuleer"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const WithTitleGroupCentered = {
	args: { size: 'md', showItemLabels: false },
	render: (args: Record<string, any>) => resizable(html`
		<nldd-toolbar
			size=${args.size}
			?show-item-labels=${args.showItemLabels}
		>
			<nldd-toolbar-item
				slot="start"
				label="Terug"
			>
				<nldd-icon-button text="Terug" icon="chevron-left"></nldd-icon-button>
				<nldd-menu-item
					slot="overflow"
					text="Terug"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-title-group
				slot="center"
				text="Document titel"
				subtext="Laatste wijziging: vandaag"
				align="center"
			></nldd-toolbar-title-group>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const SizeSmall = {
	args: { size: 'sm', showItemLabels: false },
	render: (args: Record<string, any>) => resizable(html`
		<nldd-toolbar
			size=${args.size}
			?show-item-labels=${args.showItemLabels}
		>
			<nldd-toolbar-item
				slot="start"
				label="Bewerken"
			>
				<nldd-button text="Bewerken"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Bewerken"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="start"
				label="Dupliceer"
			>
				<nldd-button text="Dupliceer"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Dupliceer"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">md (default)</p>
				${resizable(html`
					<nldd-toolbar size="md">
						<nldd-toolbar-item
							slot="start"
							label="Bewerken"
						>
							<nldd-button text="Bewerken"></nldd-button>
							<nldd-menu-item
								slot="overflow"
								text="Bewerken"
							></nldd-menu-item>
						</nldd-toolbar-item>
						<nldd-toolbar-item
							slot="start"
							label="Dupliceer"
						>
							<nldd-button text="Dupliceer"></nldd-button>
							<nldd-menu-item
								slot="overflow"
								text="Dupliceer"
							></nldd-menu-item>
						</nldd-toolbar-item>
						<nldd-toolbar-item
							slot="end"
							label="Sla op"
						>
							<nldd-button variant="primary" text="Sla op"></nldd-button>
							<nldd-menu-item
								slot="overflow"
								text="Sla op"
							></nldd-menu-item>
						</nldd-toolbar-item>
					</nldd-toolbar>
				`)}
			</div>
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">sm</p>
				${resizable(html`
					<nldd-toolbar size="sm">
						<nldd-toolbar-item
							slot="start"
							label="Bewerken"
						>
							<nldd-button text="Bewerken"></nldd-button>
							<nldd-menu-item
								slot="overflow"
								text="Bewerken"
							></nldd-menu-item>
						</nldd-toolbar-item>
						<nldd-toolbar-item
							slot="start"
							label="Dupliceer"
						>
							<nldd-button text="Dupliceer"></nldd-button>
							<nldd-menu-item
								slot="overflow"
								text="Dupliceer"
							></nldd-menu-item>
						</nldd-toolbar-item>
						<nldd-toolbar-item
							slot="end"
							label="Sla op"
						>
							<nldd-button variant="primary" text="Sla op"></nldd-button>
							<nldd-menu-item
								slot="overflow"
								text="Sla op"
							></nldd-menu-item>
						</nldd-toolbar-item>
					</nldd-toolbar>
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
					<nldd-toolbar size="md">
						<nldd-toolbar-item
							slot="start"
							label="Tekststijl"
						>
							<nldd-segmented-control
								type="checkbox"
								variant="icon"
								accessible-label="Tekststijl"
							>
								<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
								<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
								<nldd-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></nldd-segmented-control-item>
							</nldd-segmented-control>
							<nldd-menu-item
								slot="overflow"
								text="Vet"
								type="checkbox"
							></nldd-menu-item>
							<nldd-menu-item
								slot="overflow"
								text="Cursief"
								type="checkbox"
							></nldd-menu-item>
							<nldd-menu-item
								slot="overflow"
								text="Onderstrepen"
								type="checkbox"
							></nldd-menu-item>
						</nldd-toolbar-item>
					</nldd-toolbar>
				`)}
			</div>
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">Met labels</p>
				${resizable(html`
					<nldd-toolbar
						size="md"
						show-item-labels
					>
						<nldd-toolbar-item
							slot="start"
							label="Tekststijl"
						>
							<nldd-segmented-control
								type="checkbox"
								variant="icon"
								accessible-label="Tekststijl"
							>
								<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
								<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
								<nldd-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></nldd-segmented-control-item>
							</nldd-segmented-control>
							<nldd-menu-item
								slot="overflow"
								text="Vet"
								type="checkbox"
							></nldd-menu-item>
							<nldd-menu-item
								slot="overflow"
								text="Cursief"
								type="checkbox"
							></nldd-menu-item>
							<nldd-menu-item
								slot="overflow"
								text="Onderstrepen"
								type="checkbox"
							></nldd-menu-item>
						</nldd-toolbar-item>
					</nldd-toolbar>
				`)}
			</div>
		</div>
	`,
};

export const WithOverflow = {
	render: () => resizable(html`
		<nldd-toolbar size="md">
			<nldd-toolbar-item
				slot="start"
				label="Tekststijl"
			>
				<nldd-segmented-control
					type="checkbox"
					variant="icon"
					accessible-label="Tekststijl"
				>
					<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></nldd-segmented-control-item>
				</nldd-segmented-control>
				<nldd-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Cursief"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Onderstrepen"
					type="checkbox"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="start"
				label="Lijst"
			>
				<nldd-segmented-control
					type="radio"
					variant="icon"
					accessible-label="Lijsttype"
				>
					<nldd-segmented-control-item value="none" text="Geen" icon="minus-small"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="bullet" text="Lijst" icon="bullet-list"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="numbered" text="Genummerd" icon="numbered-list"></nldd-segmented-control-item>
				</nldd-segmented-control>
				<nldd-menu-item
					slot="overflow"
					text="Geen"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Lijst"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Genummerd"
					type="checkbox"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Annuleer"
			>
				<nldd-button text="Annuleer"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Annuleer"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const WithOverflowPartial = {
	render: () => resizable(html`
		<nldd-toolbar size="md">
			<nldd-toolbar-item
				slot="start"
				label="Vet"
			>
				<nldd-icon-button text="Vet" icon="bold"></nldd-icon-button>
				<nldd-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="start"
				label="Cursief"
			>
				<nldd-icon-button text="Cursief" icon="italic"></nldd-icon-button>
				<!-- Geen overflow slot: wordt stilzwijgend overgeslagen in het menu -->
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="start"
				label="Onderstrepen"
			>
				<nldd-icon-button text="Onderstrepen" icon="underlined"></nldd-icon-button>
				<nldd-menu-item
					slot="overflow"
					text="Onderstrepen"
					type="checkbox"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const WithPriority = {
	render: () => resizable(html`
		<nldd-toolbar size="md">
			<nldd-toolbar-item
				slot="start"
				label="Tekststijl"
				priority="1"
			>
				<nldd-segmented-control
					type="checkbox"
					variant="icon"
					accessible-label="Tekststijl"
				>
					<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></nldd-segmented-control-item>
				</nldd-segmented-control>
				<nldd-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Cursief"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Onderstrepen"
					type="checkbox"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="start"
				label="Lijst"
				priority="2"
			>
				<nldd-segmented-control
					type="radio"
					variant="icon"
					accessible-label="Lijsttype"
				>
					<nldd-segmented-control-item value="none" text="Geen" icon="minus-small"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="bullet" text="Lijst" icon="bullet-list"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="numbered" text="Genummerd" icon="numbered-list"></nldd-segmented-control-item>
				</nldd-segmented-control>
				<nldd-menu-item
					slot="overflow"
					text="Geen"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Lijst"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Genummerd"
					type="checkbox"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-title-group
				slot="center"
				text="Document titel"
				subtext="Laatste wijziging: vandaag"
				align="center"
			></nldd-toolbar-title-group>
			<nldd-toolbar-item
				slot="end"
				label="Annuleer"
				priority="3"
			>
				<nldd-button text="Annuleer"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Annuleer"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
				priority="10"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const WithFluidItem = {
	render: () => resizable(html`
		<nldd-toolbar size="md">
			<nldd-toolbar-item
				slot="start"
				label="Terug"
				priority="1"
			>
				<nldd-icon-button text="Terug" icon="chevron-left"></nldd-icon-button>
				<nldd-menu-item
					slot="overflow"
					text="Terug"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="center"
				label="Zoeken"
				min-width="240px"
				width="40%"
				priority="3"
			>
				<nldd-search-field placeholder="Zoeken..."></nldd-search-field>
				<nldd-menu-item
					slot="overflow"
					text="Zoeken"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Annuleer"
			>
				<nldd-button text="Annuleer"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Annuleer"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
				priority="2"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const WithPinnedOverflow = {
	render: () => resizable(html`
		<nldd-toolbar size="md">
			<nldd-toolbar-item
				slot="start"
				label="Tekststijl"
			>
				<nldd-segmented-control
					type="checkbox"
					variant="icon"
					accessible-label="Tekststijl"
				>
					<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
				</nldd-segmented-control>
				<nldd-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Cursief"
					type="checkbox"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-menu-divider slot="overflow"></nldd-menu-divider>
			<nldd-menu-item
				slot="overflow"
				text="Instellingen"
			></nldd-menu-item>
			<nldd-menu-item
				slot="overflow"
				text="Help"
			></nldd-menu-item>
		</nldd-toolbar>
	`),
};

export const WithPinnedOverflowOnly = {
	render: () => resizable(html`
		<nldd-toolbar size="md">
			<nldd-toolbar-item
				slot="start"
				label="Terug"
			>
				<nldd-icon-button text="Terug" icon="chevron-left"></nldd-icon-button>
			</nldd-toolbar-item>
			<nldd-toolbar-title-group
				slot="start"
				text="Document titel"
				subtext="Laatste wijziging: vandaag"
			></nldd-toolbar-title-group>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
			</nldd-toolbar-item>
			<nldd-menu-divider slot="overflow"></nldd-menu-divider>
			<nldd-menu-item
				slot="overflow"
				text="Exporteren"
			></nldd-menu-item>
			<nldd-menu-item
				slot="overflow"
				text="Delen"
			></nldd-menu-item>
			<nldd-menu-divider slot="overflow"></nldd-menu-divider>
			<nldd-menu-item
				slot="overflow"
				text="Verwijder"
			></nldd-menu-item>
		</nldd-toolbar>
	`),
};

export const WithPinnedAndDynamicOverflow = {
	render: () => resizable(html`
		<nldd-toolbar size="md">
			<nldd-toolbar-item
				slot="start"
				label="Tekststijl"
				priority="1"
			>
				<nldd-segmented-control
					type="checkbox"
					variant="icon"
					accessible-label="Tekststijl"
				>
					<nldd-segmented-control-item value="vet" text="Vet" icon="bold"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="cursief" text="Cursief" icon="italic"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="onderstrepen" text="Onderstrepen" icon="underlined"></nldd-segmented-control-item>
				</nldd-segmented-control>
				<nldd-menu-item
					slot="overflow"
					text="Vet"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Cursief"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Onderstrepen"
					type="checkbox"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="start"
				label="Lijst"
				priority="2"
			>
				<nldd-segmented-control
					type="radio"
					variant="icon"
					accessible-label="Lijsttype"
				>
					<nldd-segmented-control-item value="none" text="Geen" icon="minus-small"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="bullet" text="Lijst" icon="bullet-list"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="numbered" text="Genummerd" icon="numbered-list"></nldd-segmented-control-item>
				</nldd-segmented-control>
				<nldd-menu-item
					slot="overflow"
					text="Geen"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Lijst"
					type="checkbox"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Genummerd"
					type="checkbox"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
				priority="10"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-menu-divider slot="overflow"></nldd-menu-divider>
			<nldd-menu-item
				slot="overflow"
				text="Exporteren"
			></nldd-menu-item>
			<nldd-menu-item
				slot="overflow"
				text="Instellingen"
			></nldd-menu-item>
			<nldd-menu-divider slot="overflow"></nldd-menu-divider>
			<nldd-menu-item
				slot="overflow"
				text="Verwijder"
			></nldd-menu-item>
		</nldd-toolbar>
	`),
};
