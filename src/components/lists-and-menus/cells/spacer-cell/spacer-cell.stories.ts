import { html, nothing } from 'lit';
import './spacer-cell.js';

export default {
	title: 'Components/Lists & Menus/Cells/Spacer Cell',
	component: 'nldd-spacer-cell',
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96', 'flexible'],
			description: 'Spacer-grootte in pixels, of "flexible" om de resterende ruimte te vullen',
		},
		hideBelow: {
			name: 'hide-below',
			control: 'text',
			description: 'Verberg wanneer list-container smaller is dan deze CSS-lengte (bv. "320px", "20rem")',
			table: { defaultValue: { summary: '' } },
		},
		hideAbove: {
			name: 'hide-above',
			control: 'text',
			description: 'Verberg wanneer list-container breder is dan deze CSS-lengte (bv. "1200px")',
			table: { defaultValue: { summary: '' } },
		},
	},
};

const debugStyle = 'background: rgba(255, 36, 189, 0.2); outline: 1px dashed #ff24bd;';
const containerStyle = 'display: flex; align-items: center; background: #f0f0f0; padding: 8px;';

export const Default = {
	args: {
		size: '16',
		hideBelow: '',
		hideAbove: '',
	},
	render: (args: Record<string, any>) => html`
		<div style=${containerStyle}>
			<span>Voor</span>
			<nldd-spacer-cell
				size=${args.size}
				hide-below=${args.hideBelow || nothing}
				hide-above=${args.hideAbove || nothing}
				style=${debugStyle}
			></nldd-spacer-cell>
			<span>Na</span>
		</div>
	`,
};

export const Flexible = {
	render: () => html`
		<div style="${containerStyle} width: 400px;">
			<span>Links</span>
			<nldd-spacer-cell size="flexible" style=${debugStyle}></nldd-spacer-cell>
			<span>Rechts</span>
		</div>
	`,
};

export const AllFixedSizes = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
			${['2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'].map(size => html`
				<div style="display: flex; align-items: center; gap: 8px;">
					<span style="width: 40px; font-size: 12px; color: var(--semantics-content-color);">${size}px</span>
					<div style=${containerStyle}>
						<span>|</span>
						<nldd-spacer-cell size=${size} style=${debugStyle}></nldd-spacer-cell>
						<span>|</span>
					</div>
				</div>
			`)}
		</div>
	`,
};
