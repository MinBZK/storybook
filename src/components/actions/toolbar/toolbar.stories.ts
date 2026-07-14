import { html, type TemplateResult } from 'lit';
import './toolbar.js';
import '../button/button.js';
import '../icon-button/icon-button.js';
import '../button-bar/button-bar.js';
import '../../content/icon/icon.js';
import '../../actions/menu/menu.js';
import '../../inputs/search-field/search-field.js';
import '../../inputs/segmented-control/segmented-control.js';
import '../../navigation/tab-bar/tab-bar.js';

export default {
	title: 'Components/Actions/Toolbar',
	component: 'nldd-toolbar',
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Grootte van de toolbar. Bij "lg" stapelen de overflow-knop en lg-controls (zoals nldd-icon-button) hun label onder het icoon — bedoeld als grote icon-button actiebalk.',
			table: { defaultValue: { summary: 'md' } },
		},
		showItemLabels: {
			name: 'show-item-labels',
			control: 'boolean',
			description: 'Toon labels onder toolbar-items',
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
					icon="chevron-left"
				></nldd-menu-item>
				<nldd-menu-item
					slot="overflow"
					text="Volgende"
					icon="chevron-right"
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
					icon="save"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const WithTitleGroup = {
	args: { size: 'md', showItemLabels: false },
	render: (args: Record<string, any>) => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
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
						icon="chevron-left"
					></nldd-menu-item>
				</nldd-toolbar-item>
				<nldd-toolbar-title
					slot="start"
					text="Document titel"
					supporting-text="Laatste wijziging: vandaag"
				></nldd-toolbar-title>
				<nldd-toolbar-item
					slot="end"
					label="Annuleer"
				>
					<nldd-button text="Annuleer"></nldd-button>
					<nldd-menu-item
						slot="overflow"
						text="Annuleer"
						icon="dismiss-circle"
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
						icon="save"
					></nldd-menu-item>
				</nldd-toolbar-item>
			</nldd-toolbar>
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
						icon="chevron-left"
					></nldd-menu-item>
				</nldd-toolbar-item>
				<nldd-toolbar-title
					slot="center"
					text="Document titel"
					supporting-text="Laatste wijziging: vandaag"
					align="center"
				></nldd-toolbar-title>
				<nldd-toolbar-item
					slot="end"
					label="Sla op"
				>
					<nldd-button variant="primary" text="Sla op"></nldd-button>
					<nldd-menu-item
						slot="overflow"
						text="Sla op"
						icon="save"
					></nldd-menu-item>
				</nldd-toolbar-item>
			</nldd-toolbar>
		</div>
	`,
};

export const TitleWithAction = {
	args: { size: 'md', showItemLabels: false },
	render: (args: Record<string, any>) => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<!-- Short name: the title shrink-wraps (fit-content) so the xs action
			     button sits right against it. -->
			<nldd-toolbar
				size=${args.size}
				?show-item-labels=${args.showItemLabels}
			>
				<nldd-toolbar-title
					slot="start"
					text="beleid-2026"
				>
					<nldd-icon-button
						slot="action"
						id="title-action-btn"
						size="xs"
						icon="chevron-down"
						text="Documentacties"
						tooltip-timing="never"
						popovertarget="title-action-menu"
					></nldd-icon-button>
				</nldd-toolbar-title>
				<nldd-toolbar-item slot="end" label="Opslaan">
					<nldd-button variant="primary" text="Opslaan"></nldd-button>
					<nldd-menu-item slot="overflow" text="Opslaan" icon="save"></nldd-menu-item>
				</nldd-toolbar-item>
			</nldd-toolbar>
			<!-- Long name: the title text truncates at the 240px default max-width;
			     the action button stays outside the cap and remains visible. -->
			<nldd-toolbar
				size=${args.size}
				?show-item-labels=${args.showItemLabels}
			>
				<nldd-toolbar-title
					slot="start"
					text="een-heel-lange-documentnaam-die-netjes-wordt-afgekapt"
				>
					<nldd-icon-button
						slot="action"
						id="title-action-btn-2"
						size="xs"
						icon="chevron-down"
						text="Documentacties"
						tooltip-timing="never"
						popovertarget="title-action-menu-2"
					></nldd-icon-button>
				</nldd-toolbar-title>
				<nldd-toolbar-item slot="end" label="Opslaan">
					<nldd-button variant="primary" text="Opslaan"></nldd-button>
					<nldd-menu-item slot="overflow" text="Opslaan" icon="save"></nldd-menu-item>
				</nldd-toolbar-item>
			</nldd-toolbar>
		</div>
		<nldd-menu id="title-action-menu" anchor="title-action-btn">
			<nldd-menu-item text="Naam wijzigen" icon="edit"></nldd-menu-item>
			<nldd-menu-divider></nldd-menu-divider>
			<nldd-menu-item text="Verwijderen" icon="delete" destructive></nldd-menu-item>
		</nldd-menu>
		<nldd-menu id="title-action-menu-2" anchor="title-action-btn-2">
			<nldd-menu-item text="Naam wijzigen" icon="edit"></nldd-menu-item>
			<nldd-menu-divider></nldd-menu-divider>
			<nldd-menu-item text="Verwijderen" icon="delete" destructive></nldd-menu-item>
		</nldd-menu>
	`,
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">md (default)</p>
				${html`
					<nldd-toolbar size="md">
						<nldd-toolbar-item
							slot="start"
							label="Bewerken"
						>
							<nldd-button text="Bewerken"></nldd-button>
							<nldd-menu-item
								slot="overflow"
								text="Bewerken"
								icon="edit"
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
								icon="duplicate"
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
								icon="save"
							></nldd-menu-item>
						</nldd-toolbar-item>
					</nldd-toolbar>
				`}
			</div>
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">sm</p>
				${html`
					<nldd-toolbar size="sm">
						<nldd-toolbar-item
							slot="start"
							label="Bewerken"
						>
							<nldd-button text="Bewerken"></nldd-button>
							<nldd-menu-item
								slot="overflow"
								text="Bewerken"
								icon="edit"
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
								icon="duplicate"
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
								icon="save"
							></nldd-menu-item>
						</nldd-toolbar-item>
					</nldd-toolbar>
				`}
			</div>
		</div>
	`,
};

export const LabelsToggle = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">Zonder labels</p>
				${html`
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
							<nldd-menu-group slot="overflow" text="Tekststijl">
								<nldd-menu-item
									text="Vet"
									icon="bold"
									type="checkbox"
								></nldd-menu-item>
								<nldd-menu-item
									text="Cursief"
									icon="italic"
									type="checkbox"
								></nldd-menu-item>
								<nldd-menu-item
									text="Onderstrepen"
									icon="underlined"
									type="checkbox"
								></nldd-menu-item>
							</nldd-menu-group>
						</nldd-toolbar-item>
					</nldd-toolbar>
				`}
			</div>
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">Met labels</p>
				${html`
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
							<nldd-menu-group slot="overflow" text="Tekststijl">
								<nldd-menu-item
									text="Vet"
									icon="bold"
									type="checkbox"
								></nldd-menu-item>
								<nldd-menu-item
									text="Cursief"
									icon="italic"
									type="checkbox"
								></nldd-menu-item>
								<nldd-menu-item
									text="Onderstrepen"
									icon="underlined"
									type="checkbox"
								></nldd-menu-item>
							</nldd-menu-group>
						</nldd-toolbar-item>
					</nldd-toolbar>
				`}
			</div>
		</div>
	`,
};

export const WithOverflow = {
	name: 'Overflow',
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
				<nldd-menu-group slot="overflow" text="Tekststijl">
					<nldd-menu-item
						text="Vet"
						icon="bold"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Cursief"
						icon="italic"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Onderstrepen"
						icon="underlined"
						type="checkbox"
					></nldd-menu-item>
				</nldd-menu-group>
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
					<nldd-segmented-control-item value="bullet" text="Opsomming" icon="bullet-list"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="numbered" text="Genummerd" icon="numbered-list"></nldd-segmented-control-item>
				</nldd-segmented-control>
				<nldd-menu-group slot="overflow" text="Lijst">
					<nldd-menu-item
						text="Geen"
						icon="minus-small"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Opsomming"
						icon="bullet-list"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Genummerd"
						icon="numbered-list"
						type="checkbox"
					></nldd-menu-item>
				</nldd-menu-group>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Annuleer"
			>
				<nldd-button text="Annuleer"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Annuleer"
					icon="dismiss-circle"
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
					icon="save"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const WithPriority = {
	name: 'Overflow with Priority',
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
				<nldd-menu-group slot="overflow" text="Tekststijl">
					<nldd-menu-item
						text="Vet"
						icon="bold"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Cursief"
						icon="italic"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Onderstrepen"
						icon="underlined"
						type="checkbox"
					></nldd-menu-item>
				</nldd-menu-group>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="start"
				label="Lijst"
				priority="1"
			>
				<nldd-segmented-control
					type="radio"
					variant="icon"
					accessible-label="Lijsttype"
				>
					<nldd-segmented-control-item value="none" text="Geen" icon="minus-small"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="bullet" text="Opsomming" icon="bullet-list"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="numbered" text="Genummerd" icon="numbered-list"></nldd-segmented-control-item>
				</nldd-segmented-control>
				<nldd-menu-group slot="overflow" text="Lijst">
					<nldd-menu-item
						text="Geen"
						icon="minus-small"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Opsomming"
						icon="bullet-list"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Genummerd"
						icon="numbered-list"
						type="checkbox"
					></nldd-menu-item>
				</nldd-menu-group>
			</nldd-toolbar-item>
			<nldd-toolbar-title
				slot="center"
				text="Document titel"
				supporting-text="Laatste wijziging: vandaag"
				align="center"
			></nldd-toolbar-title>
			<nldd-toolbar-item
				slot="end"
				label="Annuleer"
				priority="3"
			>
				<nldd-button text="Annuleer"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Annuleer"
					icon="dismiss-circle"
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
					icon="save"
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
					icon="chevron-left"
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
					icon="search"
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
					icon="dismiss-circle"
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
					icon="save"
				></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
};

export const WithPinnedOverflow = {
	name: 'With pinned overflow items',
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
				<nldd-menu-group slot="overflow" text="Tekststijl">
					<nldd-menu-item
						text="Vet"
						icon="bold"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Cursief"
						icon="italic"
						type="checkbox"
					></nldd-menu-item>
				</nldd-menu-group>
			</nldd-toolbar-item>
			<nldd-toolbar-item
				slot="end"
				label="Sla op"
			>
				<nldd-button variant="primary" text="Sla op"></nldd-button>
				<nldd-menu-item
					slot="overflow"
					text="Sla op"
					icon="save"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-menu-divider slot="overflow"></nldd-menu-divider>
			<nldd-menu-item
				slot="overflow"
				text="Instellingen"
				icon="settings"
			></nldd-menu-item>
			<nldd-menu-item
				slot="overflow"
				text="Help"
				icon="help"
			></nldd-menu-item>
		</nldd-toolbar>
	`),
};

export const WithPinnedAndDynamicOverflow = {
	name: 'With Pinned And Priority Overflow',
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
				<nldd-menu-group slot="overflow" text="Tekststijl">
					<nldd-menu-item
						text="Vet"
						icon="bold"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Cursief"
						icon="italic"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Onderstrepen"
						icon="underlined"
						type="checkbox"
					></nldd-menu-item>
				</nldd-menu-group>
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
					<nldd-segmented-control-item value="bullet" text="Opsomming" icon="bullet-list"></nldd-segmented-control-item>
					<nldd-segmented-control-item value="numbered" text="Genummerd" icon="numbered-list"></nldd-segmented-control-item>
				</nldd-segmented-control>
				<nldd-menu-group slot="overflow" text="Lijst">
					<nldd-menu-item
						text="Geen"
						icon="minus-small"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Opsomming"
						icon="bullet-list"
						type="checkbox"
					></nldd-menu-item>
					<nldd-menu-item
						text="Genummerd"
						icon="numbered-list"
						type="checkbox"
					></nldd-menu-item>
				</nldd-menu-group>
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
					icon="save"
				></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-menu-divider slot="overflow"></nldd-menu-divider>
			<nldd-menu-item
				slot="overflow"
				text="Exporteren"
				icon="export"
			></nldd-menu-item>
			<nldd-menu-item
				slot="overflow"
				text="Instellingen"
				icon="settings"
			></nldd-menu-item>
			<nldd-menu-divider slot="overflow"></nldd-menu-divider>
			<nldd-menu-item
				slot="overflow"
				destructive
				text="Verwijder"
				icon="delete"
			></nldd-menu-item>
		</nldd-toolbar>
	`),
};

export const MobieleActiebalk = {
	name: 'Mobiele actiebalk (lg)',
	render: () => resizable(html`
		<nldd-toolbar size="lg" label="Acties">
			<nldd-toolbar-item slot="start" priority="10">
				<nldd-tab-bar accessible-label="Hoofdnavigatie">
					<nldd-tab-bar-item selected text="Home" icon="home"></nldd-tab-bar-item>
					<nldd-tab-bar-item text="Profiel" icon="profile"></nldd-tab-bar-item>
					<nldd-tab-bar-item text="Zoeken" icon="search"></nldd-tab-bar-item>
				</nldd-tab-bar>
				<nldd-menu-group slot="overflow" text="Hoofdnavigatie">
					<nldd-menu-item text="Home" icon="home"></nldd-menu-item>
					<nldd-menu-item text="Profiel" icon="profile"></nldd-menu-item>
					<nldd-menu-item text="Zoeken" icon="search"></nldd-menu-item>
				</nldd-menu-group>
			</nldd-toolbar-item>
			<nldd-toolbar-item slot="end" label="Zoeken">
				<nldd-icon-button text="Zoeken" icon="search"></nldd-icon-button>
				<nldd-menu-item slot="overflow" text="Zoeken" icon="search"></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item slot="end" label="Downloaden">
				<nldd-icon-button text="Downloaden" icon="download"></nldd-icon-button>
				<nldd-menu-item slot="overflow" text="Downloaden" icon="download"></nldd-menu-item>
			</nldd-toolbar-item>
			<nldd-toolbar-item slot="end" label="Profiel">
				<nldd-icon-button text="Profiel" icon="profile"></nldd-icon-button>
				<nldd-menu-item slot="overflow" text="Profiel" icon="profile"></nldd-menu-item>
			</nldd-toolbar-item>
		</nldd-toolbar>
	`),
	parameters: { controls: { disable: true } },
};

/**
 * Een `align="center"` titel centreert nu ook wanneer hij het enige zichtbare
 * element is — zowel zonder start/end-items als wanneer een start-item
 * (bijv. een back-knop) `display:none` is. Voorheen sprong de titel dan naar
 * links. De gestreepte rand toont de toolbar-breedte.
 */
export const LoneCenteredTitle = {
	name: 'Lone centered title',
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px; max-width: 420px;">
			<div style="outline: 1px dashed var(--semantics-dividers-color);">
				<nldd-toolbar size="md" label="Zonder start of end">
					<nldd-toolbar-title slot="center" align="center" text="boodschappen">
						<nldd-icon-button slot="action" size="xs" icon="chevron-down" text="Acties" tooltip-timing="never"></nldd-icon-button>
					</nldd-toolbar-title>
				</nldd-toolbar>
			</div>
			<div style="outline: 1px dashed var(--semantics-dividers-color);">
				<nldd-toolbar size="md" label="Met verborgen back-knop">
					<nldd-toolbar-item slot="start" style="display: none">
						<nldd-icon-button icon="chevron-left" text="Terug" tooltip-timing="never"></nldd-icon-button>
					</nldd-toolbar-item>
					<nldd-toolbar-title slot="center" align="center" text="boodschappen">
						<nldd-icon-button slot="action" size="xs" icon="chevron-down" text="Acties" tooltip-timing="never"></nldd-icon-button>
					</nldd-toolbar-title>
				</nldd-toolbar>
			</div>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'De titel blijft gecentreerd of er nu geen start/end-items zijn, of een start-item verborgen is (`display:none`).',
			},
		},
	},
};
