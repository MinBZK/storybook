import { html } from 'lit';
import './ndd-button-group.ts';
import '../button/ndd-button.ts';

export default {
	title: 'Components/Actions/Button Group',
	component: 'ndd-button-group',
	tags: ['autodocs'],

	argTypes: {
	  size: {
		control: 'select',
		options: ['sm', 'md'],
		description: 'Button group size',
	  },
	  flow: {
		control: 'select',
		options: ['horizontal', 'vertical'],
		description: 'Layout direction',
	  },
	}
};

export const Default = {
	args: { size: 'md', flow: 'vertical' },
	render: (args) => html`
	<ndd-button-group size=${args.size} flow=${args.flow}>
		<ndd-button variant="primary" text="Bewaar"></ndd-button>
		<ndd-button variant="secondary" text="Bewaar en maak nieuwe"></ndd-button>
	</ndd-button-group>
	`,
};

export const Horizontal = {
	args: { size: 'md', flow: 'horizontal' },
	render: (args) => html`
	<ndd-button-group size=${args.size} flow=${args.flow}>
		<ndd-button variant="primary" text="Bewaar"></ndd-button>
		<ndd-button variant="secondary" text="Bewaar en maak nieuwe"></ndd-button>
	</ndd-button-group>
	`,
};

export const SizeSmall = {
	args: { size: 'sm', flow: 'horizontal' },
	render: (args) => html`
	<ndd-button-group size=${args.size} flow=${args.flow}>
		<ndd-button variant="primary" text="Bewaar"></ndd-button>
		<ndd-button variant="secondary" text="Bewaar en maak nieuwe"></ndd-button>
	</ndd-button-group>
	`,
};

export const ThreeButtons = {
	args: { size: 'md', flow: 'vertical' },
	render: (args) => html`
	<ndd-button-group size=${args.size} flow=${args.flow}>
		<ndd-button variant="primary" text="Bewaar"></ndd-button>
		<ndd-button variant="secondary" text="Bewaar en maak nieuwe"></ndd-button>
		<ndd-button variant="destructive" text="Verwijder"></ndd-button>
	</ndd-button-group>
	`,
};

export const MaxEnforced = {
	args: { size: 'md', flow: 'vertical' },
	render: (args) => html`
	<ndd-button-group size=${args.size} flow=${args.flow}>
		<ndd-button variant="primary" text="Bewaar"></ndd-button>
		<ndd-button variant="secondary" text="Bewaar en maak nieuwe"></ndd-button>
		<ndd-button variant="destructive" text="Verwijder"></ndd-button>
		<ndd-button variant="secondary" text="Een knop te veel"></ndd-button>
	</ndd-button-group>
	`,
};
MaxEnforced.storyName = 'Max 3 Enforced (4th button hidden)';
