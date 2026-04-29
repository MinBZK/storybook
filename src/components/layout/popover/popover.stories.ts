import { html } from 'lit';
import './popover.js';
import '../container/container.js';
import '../../actions/button/button.js';
import '../../inputs/text-field/text-field.js';
import '../../content/rich-text/rich-text.js';

/**
 * Een non-modal floating panel verankerd aan een trigger-element.
 * Gebouwd op de native Popover API met Floating UI voor positionering.
 *
 * ## Gebruik
 * ```html
 * <nldd-button id="trigger" text="Open"></nldd-button>
 *
 * <nldd-popover anchor="trigger" accessible-label="Voorbeeld">
 *   <nldd-container padding="16">
 *     <nldd-rich-text><p>Inhoud</p></nldd-rich-text>
 *   </nldd-container>
 * </nldd-popover>
 * ```
 *
 * Klikken op het anchor-element opent of sluit de popover (toggle). Esc en
 * klik buiten sluiten ook (native popover light-dismiss). Voor een custom
 * focus-target binnen de popover: gebruik `autofocus` op het gewenste
 * child-element.
 */
export default {
	title: 'Components/Layout/Popover',
	component: 'nldd-popover',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/popover/popover.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'experimental' },
	},
	argTypes: {
		placement: {
			control: 'select',
			options: [
				'bottom-start', 'bottom', 'bottom-end',
				'top-start', 'top', 'top-end',
				'right-start', 'right', 'right-end',
				'left-start', 'left', 'left-end',
			],
			description: 'Floating UI placement t.o.v. anchor',
			table: { defaultValue: { summary: 'bottom-start' } },
		},
		width: {
			control: 'text',
			description: 'Expliciete width (bv. "400px"). Default 320px via CSS variable.',
			table: { defaultValue: { summary: '320px' } },
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Toegankelijke naam (aria-label). Verplicht.',
			table: { defaultValue: { summary: 'Popover' } },
		},
	},
	args: {
		placement: 'bottom-start',
		width: '',
		accessibleLabel: 'Voorbeeld popover',
	},
};

const Template = ({ placement, width, accessibleLabel }: Record<string, any>) => html`
	<nldd-button id="trigger-default" text="Open popover"></nldd-button>

	<nldd-popover
		anchor="trigger-default"
		placement=${placement}
		width=${width || ''}
		accessible-label=${accessibleLabel}
	>
		<nldd-container padding="16">
			<nldd-rich-text>
				<p>Dit is een eenvoudige popover. Klik buiten of druk op Esc om te sluiten.</p>
			</nldd-rich-text>
		</nldd-container>
	</nldd-popover>
`;

export const Standaard = {
	render: Template,
};

export const MetForm = {
	render: () => html`
		<nldd-button id="trigger-form" text="Open form"></nldd-button>

		<nldd-popover
			anchor="trigger-form"
			accessible-label="Filter instellingen"
		>
			<nldd-container padding="16">
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					<nldd-text-field placeholder="Naam" autofocus></nldd-text-field>
					<nldd-text-field placeholder="E-mail" type="email"></nldd-text-field>
					<nldd-button text="Toepassen"></nldd-button>
				</div>
			</nldd-container>
		</nldd-popover>
	`,
	parameters: { controls: { disable: true } },
};

export const Placements = {
	render: () => html`
		<div style="display: flex; gap: 1rem; align-items: center; justify-content: center; min-height: 320px;">
			<nldd-button id="trigger-placement-bottom-start" text="Bottom start"></nldd-button>
			<nldd-popover anchor="trigger-placement-bottom-start" placement="bottom-start" accessible-label="Bottom start">
				<nldd-container padding="16"><nldd-rich-text><p>placement="bottom-start"</p></nldd-rich-text></nldd-container>
			</nldd-popover>

			<nldd-button id="trigger-placement-top-start" text="Top start"></nldd-button>
			<nldd-popover anchor="trigger-placement-top-start" placement="top-start" accessible-label="Top start">
				<nldd-container padding="16"><nldd-rich-text><p>placement="top-start"</p></nldd-rich-text></nldd-container>
			</nldd-popover>

			<nldd-button id="trigger-placement-right" text="Right"></nldd-button>
			<nldd-popover anchor="trigger-placement-right" placement="right" accessible-label="Right">
				<nldd-container padding="16"><nldd-rich-text><p>placement="right"</p></nldd-rich-text></nldd-container>
			</nldd-popover>

			<nldd-button id="trigger-placement-left" text="Left"></nldd-button>
			<nldd-popover anchor="trigger-placement-left" placement="left" accessible-label="Left">
				<nldd-container padding="16"><nldd-rich-text><p>placement="left"</p></nldd-rich-text></nldd-container>
			</nldd-popover>
		</div>
	`,
	parameters: { controls: { disable: true } },
};
