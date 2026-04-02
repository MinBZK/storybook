import { html } from 'lit';
import './ndd-toolbar.ts';
import '../button/ndd-button.ts';
import '../icon-button/ndd-icon-button.ts';
import '../button-bar/ndd-button-bar.ts';
import '../../content/icon/ndd-icon.ts';
import '../../lists-and-menus/menu/ndd-menu.ts';
import '../../inputs/search-field/ndd-search-field.ts';
import '../../inputs/segmented-control/ndd-segmented-control.ts';

export default {
	title: 'Components/Actions/Toolbar',
	component: 'ndd-toolbar',
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
	<div
		style="resize: horizontal; overflow: hidden; min-width: 200px; max-width: 100%; padding: 8px;"
	>
		${content}
	</div>
	<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 8px 0 0;">
		↔ Sleep de hoek rechtsonder om de breedte aan te passen
	</p>
`;

export const Default = {
	args: { size: 'md', showItemLabels: false },
	render: (args) =>
		resizable(html`
			<ndd-toolbar size=${args.size} ?show-item-labels=${args.showItemLabels}>
				<ndd-toolbar-item slot="start" label="Vorige/Volgende">
					<ndd-button-bar>
						<ndd-icon-button text="Vorige" icon="chevron-left"></ndd-icon-button>
						<ndd-button-bar-divider></ndd-button-bar-divider>
						<ndd-icon-button text="Volgende" icon="chevron-right"></ndd-icon-button>
					</ndd-button-bar>
					<ndd-menu-item slot="overflow" text="Vorige"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Volgende"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Sla op">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
					<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`),
};

export const WithLabels = {
	args: { size: 'md', showItemLabels: true },
	render: (args) =>
		resizable(html`
			<ndd-toolbar size=${args.size} ?show-item-labels=${args.showItemLabels}>
				<ndd-toolbar-item slot="start" label="Tekststijl">
					<ndd-segmented-control
						type="checkbox"
						variant="icon"
						size=${args.size}
						accessible-label="Tekststijl"
					>
						<ndd-segmented-control-item
							value="vet"
							text="Vet"
							icon="bold"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="cursief"
							text="Cursief"
							icon="italic"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="onderstrepen"
							text="Onderstrepen"
							icon="underlined"
						></ndd-segmented-control-item>
					</ndd-segmented-control>
					<ndd-menu-item slot="overflow" text="Vet" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Cursief" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Onderstrepen" type="checkbox"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Sla op">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
					<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`),
};

export const WithTitleGroup = {
	args: { size: 'md', showItemLabels: false },
	render: (args) =>
		resizable(html`
			<ndd-toolbar size=${args.size} ?show-item-labels=${args.showItemLabels}>
				<ndd-toolbar-item slot="start" label="Terug">
					<ndd-icon-button text="Terug" icon="chevron-left"></ndd-icon-button>
					<ndd-menu-item slot="overflow" text="Terug"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-title-group
					slot="start"
					text="Document titel"
					subtext="Laatste wijziging: vandaag"
				></ndd-toolbar-title-group>
				<ndd-toolbar-item slot="end" label="Annuleer">
					<ndd-button text="Annuleer"></ndd-button>
					<ndd-menu-item slot="overflow" text="Annuleer"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Sla op">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
					<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`),
};

export const WithTitleGroupCentered = {
	args: { size: 'md', showItemLabels: false },
	render: (args) =>
		resizable(html`
			<ndd-toolbar size=${args.size} ?show-item-labels=${args.showItemLabels}>
				<ndd-toolbar-item slot="start" label="Terug">
					<ndd-icon-button text="Terug" icon="chevron-left"></ndd-icon-button>
					<ndd-menu-item slot="overflow" text="Terug"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-title-group
					slot="center"
					text="Document titel"
					subtext="Laatste wijziging: vandaag"
					align="center"
				></ndd-toolbar-title-group>
				<ndd-toolbar-item slot="end" label="Sla op">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
					<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`),
};

export const SizeSmall = {
	args: { size: 'sm', showItemLabels: false },
	render: (args) =>
		resizable(html`
			<ndd-toolbar size=${args.size} ?show-item-labels=${args.showItemLabels}>
				<ndd-toolbar-item slot="start" label="Bewerken">
					<ndd-button text="Bewerken"></ndd-button>
					<ndd-menu-item slot="overflow" text="Bewerken"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="start" label="Dupliceer">
					<ndd-button text="Dupliceer"></ndd-button>
					<ndd-menu-item slot="overflow" text="Dupliceer"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Sla op">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
					<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`),
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">
					md (default)
				</p>
				${resizable(html`
					<ndd-toolbar size="md">
						<ndd-toolbar-item slot="start" label="Bewerken">
							<ndd-button text="Bewerken"></ndd-button>
							<ndd-menu-item slot="overflow" text="Bewerken"></ndd-menu-item>
						</ndd-toolbar-item>
						<ndd-toolbar-item slot="start" label="Dupliceer">
							<ndd-button text="Dupliceer"></ndd-button>
							<ndd-menu-item slot="overflow" text="Dupliceer"></ndd-menu-item>
						</ndd-toolbar-item>
						<ndd-toolbar-item slot="end" label="Sla op">
							<ndd-button variant="primary" text="Sla op"></ndd-button>
							<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
						</ndd-toolbar-item>
					</ndd-toolbar>
				`)}
			</div>
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">
					sm
				</p>
				${resizable(html`
					<ndd-toolbar size="sm">
						<ndd-toolbar-item slot="start" label="Bewerken">
							<ndd-button text="Bewerken"></ndd-button>
							<ndd-menu-item slot="overflow" text="Bewerken"></ndd-menu-item>
						</ndd-toolbar-item>
						<ndd-toolbar-item slot="start" label="Dupliceer">
							<ndd-button text="Dupliceer"></ndd-button>
							<ndd-menu-item slot="overflow" text="Dupliceer"></ndd-menu-item>
						</ndd-toolbar-item>
						<ndd-toolbar-item slot="end" label="Sla op">
							<ndd-button variant="primary" text="Sla op"></ndd-button>
							<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
						</ndd-toolbar-item>
					</ndd-toolbar>
				`)}
			</div>
		</div>
	`,
};

export const LabelsToggle = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">
					Zonder labels
				</p>
				${resizable(html`
					<ndd-toolbar size="md">
						<ndd-toolbar-item slot="start" label="Tekststijl">
							<ndd-segmented-control type="checkbox" variant="icon" accessible-label="Tekststijl">
								<ndd-segmented-control-item
									value="vet"
									text="Vet"
									icon="bold"
								></ndd-segmented-control-item>
								<ndd-segmented-control-item
									value="cursief"
									text="Cursief"
									icon="italic"
								></ndd-segmented-control-item>
								<ndd-segmented-control-item
									value="onderstrepen"
									text="Onderstrepen"
									icon="underlined"
								></ndd-segmented-control-item>
							</ndd-segmented-control>
							<ndd-menu-item slot="overflow" text="Vet" type="checkbox"></ndd-menu-item>
							<ndd-menu-item slot="overflow" text="Cursief" type="checkbox"></ndd-menu-item>
							<ndd-menu-item slot="overflow" text="Onderstrepen" type="checkbox"></ndd-menu-item>
						</ndd-toolbar-item>
					</ndd-toolbar>
				`)}
			</div>
			<div>
				<p style="font-size: 0.75rem; color: var(--semantics-content-color); margin: 0 0 8px;">
					Met labels
				</p>
				${resizable(html`
					<ndd-toolbar size="md" show-item-labels>
						<ndd-toolbar-item slot="start" label="Tekststijl">
							<ndd-segmented-control type="checkbox" variant="icon" accessible-label="Tekststijl">
								<ndd-segmented-control-item
									value="vet"
									text="Vet"
									icon="bold"
								></ndd-segmented-control-item>
								<ndd-segmented-control-item
									value="cursief"
									text="Cursief"
									icon="italic"
								></ndd-segmented-control-item>
								<ndd-segmented-control-item
									value="onderstrepen"
									text="Onderstrepen"
									icon="underlined"
								></ndd-segmented-control-item>
							</ndd-segmented-control>
							<ndd-menu-item slot="overflow" text="Vet" type="checkbox"></ndd-menu-item>
							<ndd-menu-item slot="overflow" text="Cursief" type="checkbox"></ndd-menu-item>
							<ndd-menu-item slot="overflow" text="Onderstrepen" type="checkbox"></ndd-menu-item>
						</ndd-toolbar-item>
					</ndd-toolbar>
				`)}
			</div>
		</div>
	`,
};

export const WithOverflow = {
	render: () =>
		resizable(html`
			<ndd-toolbar size="md">
				<ndd-toolbar-item slot="start" label="Tekststijl">
					<ndd-segmented-control type="checkbox" variant="icon" accessible-label="Tekststijl">
						<ndd-segmented-control-item
							value="vet"
							text="Vet"
							icon="bold"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="cursief"
							text="Cursief"
							icon="italic"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="onderstrepen"
							text="Onderstrepen"
							icon="underlined"
						></ndd-segmented-control-item>
					</ndd-segmented-control>
					<ndd-menu-item slot="overflow" text="Vet" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Cursief" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Onderstrepen" type="checkbox"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="start" label="Lijst">
					<ndd-segmented-control type="radio" variant="icon" accessible-label="Lijsttype">
						<ndd-segmented-control-item
							value="none"
							text="Geen"
							icon="minus-small"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="bullet"
							text="Lijst"
							icon="bullet-list"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="numbered"
							text="Genummerd"
							icon="numbered-list"
						></ndd-segmented-control-item>
					</ndd-segmented-control>
					<ndd-menu-item slot="overflow" text="Geen" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Lijst" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Genummerd" type="checkbox"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Annuleer">
					<ndd-button text="Annuleer"></ndd-button>
					<ndd-menu-item slot="overflow" text="Annuleer"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Sla op">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
					<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`),
};

export const WithOverflowPartial = {
	render: () =>
		resizable(html`
			<ndd-toolbar size="md">
				<ndd-toolbar-item slot="start" label="Vet">
					<ndd-icon-button text="Vet" icon="bold"></ndd-icon-button>
					<ndd-menu-item slot="overflow" text="Vet" type="checkbox"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="start" label="Cursief">
					<ndd-icon-button text="Cursief" icon="italic"></ndd-icon-button>
					<!-- Geen overflow slot: wordt stilzwijgend overgeslagen in het menu -->
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="start" label="Onderstrepen">
					<ndd-icon-button text="Onderstrepen" icon="underlined"></ndd-icon-button>
					<ndd-menu-item slot="overflow" text="Onderstrepen" type="checkbox"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Sla op">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
					<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`),
};

export const WithPriority = {
	render: () =>
		resizable(html`
			<ndd-toolbar size="md">
				<ndd-toolbar-item slot="start" label="Tekststijl" priority="1">
					<ndd-segmented-control type="checkbox" variant="icon" accessible-label="Tekststijl">
						<ndd-segmented-control-item
							value="vet"
							text="Vet"
							icon="bold"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="cursief"
							text="Cursief"
							icon="italic"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="onderstrepen"
							text="Onderstrepen"
							icon="underlined"
						></ndd-segmented-control-item>
					</ndd-segmented-control>
					<ndd-menu-item slot="overflow" text="Vet" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Cursief" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Onderstrepen" type="checkbox"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="start" label="Lijst" priority="2">
					<ndd-segmented-control type="radio" variant="icon" accessible-label="Lijsttype">
						<ndd-segmented-control-item
							value="none"
							text="Geen"
							icon="minus-small"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="bullet"
							text="Lijst"
							icon="bullet-list"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="numbered"
							text="Genummerd"
							icon="numbered-list"
						></ndd-segmented-control-item>
					</ndd-segmented-control>
					<ndd-menu-item slot="overflow" text="Geen" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Lijst" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Genummerd" type="checkbox"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-title-group
					slot="center"
					text="Document titel"
					subtext="Laatste wijziging: vandaag"
					align="center"
				></ndd-toolbar-title-group>
				<ndd-toolbar-item slot="end" label="Annuleer" priority="3">
					<ndd-button text="Annuleer"></ndd-button>
					<ndd-menu-item slot="overflow" text="Annuleer"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Sla op" priority="10">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
					<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`),
};

export const WithFluidItem = {
	render: () =>
		resizable(html`
			<ndd-toolbar size="md">
				<ndd-toolbar-item slot="start" label="Terug" priority="1">
					<ndd-icon-button text="Terug" icon="chevron-left"></ndd-icon-button>
					<ndd-menu-item slot="overflow" text="Terug"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="center" label="Zoeken" min-width="240px" width="40%" priority="3">
					<ndd-search-field placeholder="Zoeken..."></ndd-search-field>
					<ndd-menu-item slot="overflow" text="Zoeken"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Annuleer">
					<ndd-button text="Annuleer"></ndd-button>
					<ndd-menu-item slot="overflow" text="Annuleer"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Sla op" priority="2">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
					<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`),
};

export const WithPinnedOverflow = {
	render: () =>
		resizable(html`
			<ndd-toolbar size="md">
				<ndd-toolbar-item slot="start" label="Tekststijl">
					<ndd-segmented-control type="checkbox" variant="icon" accessible-label="Tekststijl">
						<ndd-segmented-control-item
							value="vet"
							text="Vet"
							icon="bold"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="cursief"
							text="Cursief"
							icon="italic"
						></ndd-segmented-control-item>
					</ndd-segmented-control>
					<ndd-menu-item slot="overflow" text="Vet" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Cursief" type="checkbox"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Sla op">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
					<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-menu-divider slot="overflow"></ndd-menu-divider>
				<ndd-menu-item slot="overflow" text="Instellingen"></ndd-menu-item>
				<ndd-menu-item slot="overflow" text="Help"></ndd-menu-item>
			</ndd-toolbar>
		`),
};

export const WithPinnedOverflowOnly = {
	render: () =>
		resizable(html`
			<ndd-toolbar size="md">
				<ndd-toolbar-item slot="start" label="Terug">
					<ndd-icon-button text="Terug" icon="chevron-left"></ndd-icon-button>
				</ndd-toolbar-item>
				<ndd-toolbar-title-group
					slot="start"
					text="Document titel"
					subtext="Laatste wijziging: vandaag"
				></ndd-toolbar-title-group>
				<ndd-toolbar-item slot="end" label="Sla op">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
				</ndd-toolbar-item>
				<ndd-menu-divider slot="overflow"></ndd-menu-divider>
				<ndd-menu-item slot="overflow" text="Exporteren"></ndd-menu-item>
				<ndd-menu-item slot="overflow" text="Delen"></ndd-menu-item>
				<ndd-menu-divider slot="overflow"></ndd-menu-divider>
				<ndd-menu-item slot="overflow" text="Verwijder"></ndd-menu-item>
			</ndd-toolbar>
		`),
};

export const WithPinnedAndDynamicOverflow = {
	render: () =>
		resizable(html`
			<ndd-toolbar size="md">
				<ndd-toolbar-item slot="start" label="Tekststijl" priority="1">
					<ndd-segmented-control type="checkbox" variant="icon" accessible-label="Tekststijl">
						<ndd-segmented-control-item
							value="vet"
							text="Vet"
							icon="bold"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="cursief"
							text="Cursief"
							icon="italic"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="onderstrepen"
							text="Onderstrepen"
							icon="underlined"
						></ndd-segmented-control-item>
					</ndd-segmented-control>
					<ndd-menu-item slot="overflow" text="Vet" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Cursief" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Onderstrepen" type="checkbox"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="start" label="Lijst" priority="2">
					<ndd-segmented-control type="radio" variant="icon" accessible-label="Lijsttype">
						<ndd-segmented-control-item
							value="none"
							text="Geen"
							icon="minus-small"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="bullet"
							text="Lijst"
							icon="bullet-list"
						></ndd-segmented-control-item>
						<ndd-segmented-control-item
							value="numbered"
							text="Genummerd"
							icon="numbered-list"
						></ndd-segmented-control-item>
					</ndd-segmented-control>
					<ndd-menu-item slot="overflow" text="Geen" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Lijst" type="checkbox"></ndd-menu-item>
					<ndd-menu-item slot="overflow" text="Genummerd" type="checkbox"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="Sla op" priority="10">
					<ndd-button variant="primary" text="Sla op"></ndd-button>
					<ndd-menu-item slot="overflow" text="Sla op"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-menu-divider slot="overflow"></ndd-menu-divider>
				<ndd-menu-item slot="overflow" text="Exporteren"></ndd-menu-item>
				<ndd-menu-item slot="overflow" text="Instellingen"></ndd-menu-item>
				<ndd-menu-divider slot="overflow"></ndd-menu-divider>
				<ndd-menu-item slot="overflow" text="Verwijder"></ndd-menu-item>
			</ndd-toolbar>
		`),
};
