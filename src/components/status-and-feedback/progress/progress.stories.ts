import { html } from 'lit';
import './progress.ts';
import '../progress-circle/progress-circle.ts';
import '../progress-bar/progress-bar.ts';

/**
 * Een layout placeholder die de beschikbare ruimte vult en een indeterminate
 * progress indicator centreert. De indicator verschijnt pas na 1000ms zodat
 * korte laad-acties niet onnodig een spinner laten flashen.
 *
 * Default is een indeterminate progress-circle met de vertaalde tekst "Laden".
 * Zet eigen content in de slot om de indicator volledig te configureren
 * (kleur, size, value, of een progress-bar in plaats van circle).
 */
export default {
	title: 'Components/Status & Feedback/Progress',
	component: 'nldd-progress',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/status-and-feedback/progress/progress.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	args: {
		text: '',
	},
	argTypes: {
		text: {
			control: 'text',
			description: 'Tekst onder de indicator. Leeg → vertaalde "Laden".',
			table: { defaultValue: { summary: '(geen)' } },
		},
	},
};

const Template = ({ text }: Record<string, unknown>) => html`
	<div style="height: 240px; display: flex;">
		<nldd-progress text=${text as string}></nldd-progress>
	</div>
`;

export const Default = {
	render: Template,
};

export const CustomText = {
	name: 'Custom text',
	render: Template,
	args: { text: 'Bezig met opslaan' },
};

export const ProgressBarViaSlot = {
	name: 'Progress bar via slot',
	render: () => html`
		<div style="height: 240px; display: flex;">
			<nldd-progress>
				<nldd-progress-bar indeterminate text="Uploaden"></nldd-progress-bar>
			</nldd-progress>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const CustomCircleViaSlot = {
	name: 'Custom circle via slot',
	render: () => html`
		<div style="height: 240px; display: flex;">
			<nldd-progress>
				<nldd-progress-circle size="64" color="success" indeterminate text="Verwerken"></nldd-progress-circle>
			</nldd-progress>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};
