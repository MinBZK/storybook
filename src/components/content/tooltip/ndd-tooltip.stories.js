import { html } from 'lit';
import './ndd-tooltip.ts';
import '../../actions/button/ndd-button.ts';
import '../../actions/icon-button/ndd-icon-button.ts';

/**
 * De Tooltip toont informatieve tekst bij hover of focus op een child element.
 * Gebruikt `display: contents` zodat het de layout niet beïnvloedt.
 *
 * ## Gebruik
 * ```html
 * <ndd-tooltip text="Meer informatie">
 *   <ndd-icon-button icon="info" text="Info"></ndd-icon-button>
 * </ndd-tooltip>
 * ```
 */
export default {
	title: 'Components/Content/Tooltip',
	component: 'ndd-tooltip',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/tooltip/ndd-tooltip.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'stable' },
	},
	argTypes: {
		text: {
			control: 'text',
			description: 'Tooltip tekst',
		},
		placement: {
			control: 'select',
			options: ['top', 'bottom', 'left', 'right'],
			description: 'Positie van de tooltip',
			table: { defaultValue: { summary: 'top' } },
		},
	},
	args: {
		text: 'Dit is een tooltip',
		placement: 'top',
	},
};

export const Standaard = {
	render: (args) => html`
		<div style="display: flex; justify-content: center; padding: 4rem;">
			<ndd-tooltip
				text=${args.text}
				placement=${args.placement}
			>
				<ndd-button text="Hover mij"></ndd-button>
			</ndd-tooltip>
		</div>
	`,
};

export const MetIconButton = {
	render: () => html`
		<div style="display: flex; justify-content: center; padding: 4rem;">
			<ndd-icon-button
				icon="info"
				text="Info"
			></ndd-icon-button>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Icon-button rendert intern een ndd-tooltip wanneer de tekst niet zichtbaar is.',
			},
		},
	},
};

export const Posities = {
	render: () => html`
		<div style="display: flex; gap: 2rem; justify-content: center; padding: 4rem;">
			<ndd-tooltip text="Boven" placement="top">
				<ndd-button text="Top"></ndd-button>
			</ndd-tooltip>
			<ndd-tooltip text="Onder" placement="bottom">
				<ndd-button text="Bottom"></ndd-button>
			</ndd-tooltip>
			<ndd-tooltip text="Links" placement="left">
				<ndd-button text="Left"></ndd-button>
			</ndd-tooltip>
			<ndd-tooltip text="Rechts" placement="right">
				<ndd-button text="Right"></ndd-button>
			</ndd-tooltip>
		</div>
	`,
	parameters: { controls: { disable: true } },
};
