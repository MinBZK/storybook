import { html, nothing } from 'lit';
import './ndd-window.ts';
import '../../layout/page/ndd-page.ts';
import '../../navigation/top-title-bar/ndd-top-title-bar.ts';
import '../../content/rich-text/ndd-rich-text.ts';
import '../../actions/button/ndd-button.ts';
import '../../actions/button-group/ndd-button-group.ts';
import '../../layout/page-sections/simple-section/ndd-simple-section.ts';
import '../../layout/container/ndd-container.ts';

/**
 * Een zwevend venster gebaseerd op het native `<dialog>`-element.
 * Kan modaal of niet-modaal worden weergegeven. Positioneerbaar via
 * CSS-waarden en optioneel versleepbaar.
 *
 * ## Gebruik
 * ```html
 * <ndd-window>
 *   <ndd-page sticky-header>
 *     <ndd-top-title-bar slot="header" text="Venster" dismiss-text="Sluit"></ndd-top-title-bar>
 *     <ndd-simple-section>
 *       <p>Inhoud</p>
 *     </ndd-simple-section>
 *   </ndd-page>
 * </ndd-window>
 * ```
 */
export default {
	title: 'Components/Layout/Window',
	component: 'ndd-window',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/window/ndd-window.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'experimental' },
	},
	argTypes: {
		modeless: {
			control: 'boolean',
			description: 'Niet-modaal (geen backdrop of focusvergrendeling)',
			table: { defaultValue: { summary: false } },
		},
		movable: {
			control: 'boolean',
			description: 'Verplaatsbaar (op sm uitgeschakeld)',
			table: { defaultValue: { summary: false } },
		},
		width: {
			control: 'text',
			description: 'CSS width',
			table: { defaultValue: { summary: '640px' } },
		},
		height: {
			control: 'text',
			description: 'CSS height (standaard: content height)',
			table: { defaultValue: { summary: '' } },
		},
		top: {
			control: 'text',
			description: 'CSS top positie',
			table: { defaultValue: { summary: '' } },
		},
		left: {
			control: 'text',
			description: 'CSS left positie',
			table: { defaultValue: { summary: '' } },
		},
		right: {
			control: 'text',
			description: 'CSS right positie',
			table: { defaultValue: { summary: '' } },
		},
		bottom: {
			control: 'text',
			description: 'CSS bottom positie',
			table: { defaultValue: { summary: '' } },
		},
	},
	args: {
		modeless: false,
		movable: false,
		width: '',
		height: '',
		top: '',
		left: '',
		right: '',
		bottom: '',
	},
};

const openNext = (e: Event) => ((e.currentTarget as HTMLElement).nextElementSibling as HTMLElement & { show(): void }).show();

const pageContent = html`
	<ndd-simple-section>
		<ndd-rich-text>
			<p>Dit is de inhoud van het venster.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		</ndd-rich-text>
	</ndd-simple-section>
`;

const Template = (args: Record<string, unknown>) => html`
	<ndd-button text="Open venster" @click=${openNext}></ndd-button>
	<ndd-window
		?modeless=${args.modeless}
		?movable=${args.movable}
		width=${args.width || nothing}
		height=${args.height || nothing}
		top=${args.top || nothing}
		left=${args.left || nothing}
		right=${args.right || nothing}
		bottom=${args.bottom || nothing}
		accessible-label="Voorbeeldvenster"
	>
		<ndd-page sticky-header>
			<ndd-top-title-bar
				slot="header"
				text="Venstertitel"
				dismiss-text="Sluit"
			></ndd-top-title-bar>
			${pageContent}
		</ndd-page>
	</ndd-window>
`;

export const Standaard = {
	render: Template,
};

export const NietModaal = {
	render: () => html`
		<ndd-button text="Open niet-modaal venster" @click=${openNext}></ndd-button>
		<ndd-window
			modeless
			accessible-label="Niet-modaal venster"
		>
			<ndd-page sticky-header>
				<ndd-top-title-bar
					slot="header"
					text="Niet-modaal venster"
					dismiss-text="Sluit"
				></ndd-top-title-bar>
				${pageContent}
			</ndd-page>
		</ndd-window>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Niet-modaal venster zonder backdrop en focusvergrendeling.',
			},
		},
	},
};

export const Versleepbaar = {
	render: () => html`
		<ndd-button text="Open versleepbaar venster" @click=${openNext}></ndd-button>
		<ndd-window
			modeless
			movable
			accessible-label="Versleepbaar venster"
		>
			<ndd-page sticky-header>
				<ndd-top-title-bar
					slot="header"
					text="Versleep mij"
					dismiss-text="Sluit"
					window-drag-handle
				></ndd-top-title-bar>
				${pageContent}
			</ndd-page>
		</ndd-window>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Versleepbaar venster. De `ndd-top-title-bar` heeft het `window-drag-handle` attribuut, waardoor alleen de titelbalk als greep functioneert.',
			},
		},
	},
};

export const Gepositioneerd = {
	render: () => html`
		<ndd-button text="Open rechtsonder" @click=${openNext}></ndd-button>
		<ndd-window
			right="32px"
			bottom="32px"
			width="400px"
			accessible-label="Gepositioneerd venster"
		>
			<ndd-page sticky-header>
				<ndd-top-title-bar
					slot="header"
					text="Rechtsonder"
					dismiss-text="Sluit"
				></ndd-top-title-bar>
				${pageContent}
			</ndd-page>
		</ndd-window>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Venster gepositioneerd rechtsonder via `right` en `bottom` attributen.',
			},
		},
	},
};

export const MetFooter = {
	render: () => html`
		<ndd-button text="Open venster met footer" @click=${openNext}></ndd-button>
		<ndd-window
			height="400px"
			accessible-label="Venster met footer"
		>
			<ndd-page sticky-header sticky-footer>
				<ndd-top-title-bar
					slot="header"
					text="Venster met acties"
					dismiss-text="Sluit"
				></ndd-top-title-bar>
				${pageContent}
				<ndd-container slot="footer" padding-inline="16" padding-bottom="16">
					<ndd-button-group orientation="horizontal">
						<ndd-button variant="primary" text="Opslaan"></ndd-button>
						<ndd-button variant="secondary" text="Annuleer"></ndd-button>
					</ndd-button-group>
				</ndd-container>
			</ndd-page>
		</ndd-window>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Modaal venster met sticky footer voor acties, via ndd-page met sticky-footer. Hier is `height` gezet zodat de footer onderaan kleeft.',
			},
		},
	},
};
