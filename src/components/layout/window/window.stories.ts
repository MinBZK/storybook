import { html, nothing } from 'lit';
import './window.js';
import '../../layout/page/page.js';
import '../../navigation/top-title-bar/top-title-bar.js';
import '../../content/rich-text/rich-text.js';
import '../../actions/button/button.js';
import '../../actions/button-group/button-group.js';
import '../../layout/page-sections/simple-section/simple-section.js';
import '../../layout/container/container.js';

/**
 * Een zwevend venster gebaseerd op het native `<dialog>`-element.
 * Kan modaal of niet-modaal worden weergegeven. Positioneerbaar via
 * CSS-waarden en optioneel versleepbaar.
 *
 * ## Gebruik
 * ```html
 * <nldd-window>
 *   <nldd-page sticky-header>
 *     <nldd-top-title-bar slot="header" text="Venster" dismiss-text="Sluit"></nldd-top-title-bar>
 *     <nldd-simple-section>
 *       <p>Inhoud</p>
 *     </nldd-simple-section>
 *   </nldd-page>
 * </nldd-window>
 * ```
 */
export default {
	title: 'Components/Layout/Window',
	component: 'nldd-window',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/window/window.ts',
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
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijk label voor screen readers (aria-label van het venster)',
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
		accessibleLabel: 'Voorbeeldvenster',
	},
};

const openNext = (e: Event) => ((e.currentTarget as HTMLElement).nextElementSibling as HTMLElement & { show(): void }).show();

const pageContent = html`
	<nldd-simple-section>
		<nldd-rich-text>
			<p>Dit is de inhoud van het venster.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		</nldd-rich-text>
	</nldd-simple-section>
`;

const Template = (args: Record<string, unknown>) => html`
	<nldd-button text="Open venster" @click=${openNext}></nldd-button>
	<nldd-window
		?modeless=${args.modeless}
		?movable=${args.movable}
		width=${args.width || nothing}
		height=${args.height || nothing}
		top=${args.top || nothing}
		left=${args.left || nothing}
		right=${args.right || nothing}
		bottom=${args.bottom || nothing}
		accessible-label=${args.accessibleLabel || nothing}
	>
		<nldd-page sticky-header>
			<nldd-top-title-bar
				slot="header"
				text="Venstertitel"
				dismiss-text="Sluit"
			></nldd-top-title-bar>
			${pageContent}
		</nldd-page>
	</nldd-window>
`;

export const Standaard = {
	render: Template,
};

export const NietModaal = {
	render: () => html`
		<nldd-button text="Open niet-modaal venster" @click=${openNext}></nldd-button>
		<nldd-window
			modeless
			accessible-label="Niet-modaal venster"
		>
			<nldd-page sticky-header>
				<nldd-top-title-bar
					slot="header"
					text="Niet-modaal venster"
					dismiss-text="Sluit"
				></nldd-top-title-bar>
				${pageContent}
			</nldd-page>
		</nldd-window>
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
		<nldd-button text="Open versleepbaar venster" @click=${openNext}></nldd-button>
		<nldd-window
			modeless
			movable
			accessible-label="Versleepbaar venster"
		>
			<nldd-page sticky-header>
				<nldd-top-title-bar
					slot="header"
					text="Versleep mij"
					dismiss-text="Sluit"
					window-drag-handle
				></nldd-top-title-bar>
				${pageContent}
			</nldd-page>
		</nldd-window>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Versleepbaar venster. De `nldd-top-title-bar` heeft het `window-drag-handle` attribuut, waardoor alleen de titelbalk als greep functioneert.',
			},
		},
	},
};

export const Gepositioneerd = {
	render: () => html`
		<nldd-button text="Open rechtsonder" @click=${openNext}></nldd-button>
		<nldd-window
			right="32px"
			bottom="32px"
			width="400px"
			accessible-label="Gepositioneerd venster"
		>
			<nldd-page sticky-header>
				<nldd-top-title-bar
					slot="header"
					text="Rechtsonder"
					dismiss-text="Sluit"
				></nldd-top-title-bar>
				${pageContent}
			</nldd-page>
		</nldd-window>
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
		<nldd-button text="Open venster met footer" @click=${openNext}></nldd-button>
		<nldd-window
			height="400px"
			accessible-label="Venster met footer"
		>
			<nldd-page sticky-header sticky-footer>
				<nldd-top-title-bar
					slot="header"
					text="Venster met acties"
					dismiss-text="Sluit"
				></nldd-top-title-bar>
				${pageContent}
				<nldd-container slot="footer" padding-inline="16" padding-bottom="16">
					<nldd-button-group orientation="horizontal">
						<nldd-button variant="primary" text="Opslaan"></nldd-button>
						<nldd-button variant="secondary" text="Annuleer"></nldd-button>
					</nldd-button-group>
				</nldd-container>
			</nldd-page>
		</nldd-window>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Modaal venster met sticky footer voor acties, via nldd-page met sticky-footer. Hier is `height` gezet zodat de footer onderaan kleeft.',
			},
		},
	},
};
