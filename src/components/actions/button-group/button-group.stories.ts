import { html } from 'lit';
import './button-group.js';
import '../button/button.js';

export default {
	title: 'Components/Actions/Button Group',
	component: 'nldd-button-group',
	tags: ['autodocs'],

	argTypes: {
	  size: {
		control: 'select',
		options: ['sm', 'md'],
		description: 'Button group size',
		table: { defaultValue: { summary: 'md' } },
	  },
	  orientation: {
		control: 'select',
		options: ['horizontal', 'vertical'],
		description: 'Layout direction',
		table: { defaultValue: { summary: 'vertical' } },
	  },
	}
};

export const Default = {
	args: { size: 'md', orientation: 'vertical' },
	render: (args: Record<string, any>) => html`
	<nldd-button-group size=${args.size} orientation=${args.orientation}>
		<nldd-button variant="primary" text="Bewaar"></nldd-button>
		<nldd-button variant="secondary" text="Bewaar en maak nieuwe"></nldd-button>
	</nldd-button-group>
	`,
};

export const Horizontal = {
	args: { size: 'md', orientation: 'horizontal' },
	render: (args: Record<string, any>) => html`
	<nldd-button-group size=${args.size} orientation=${args.orientation}>
		<nldd-button variant="primary" text="Bewaar"></nldd-button>
		<nldd-button variant="secondary" text="Bewaar en maak nieuwe"></nldd-button>
	</nldd-button-group>
	`,
};

export const SizeSmall = {
	args: { size: 'sm', orientation: 'horizontal' },
	render: (args: Record<string, any>) => html`
	<nldd-button-group size=${args.size} orientation=${args.orientation}>
		<nldd-button variant="primary" text="Bewaar"></nldd-button>
		<nldd-button variant="secondary" text="Bewaar en maak nieuwe"></nldd-button>
	</nldd-button-group>
	`,
};

export const ThreeButtons = {
	args: { size: 'md', orientation: 'vertical' },
	render: (args: Record<string, any>) => html`
	<nldd-button-group size=${args.size} orientation=${args.orientation}>
		<nldd-button variant="primary" text="Bewaar"></nldd-button>
		<nldd-button variant="secondary" text="Bewaar en maak nieuwe"></nldd-button>
		<nldd-button variant="destructive" text="Verwijder"></nldd-button>
	</nldd-button-group>
	`,
};

export const MaxEnforced = {
	args: { size: 'md', orientation: 'vertical' },
	render: (args: Record<string, any>) => html`
	<nldd-button-group size=${args.size} orientation=${args.orientation}>
		<nldd-button variant="primary" text="Bewaar"></nldd-button>
		<nldd-button variant="secondary" text="Bewaar en maak nieuwe"></nldd-button>
		<nldd-button variant="destructive" text="Verwijder"></nldd-button>
		<nldd-button variant="secondary" text="Een knop te veel"></nldd-button>
	</nldd-button-group>
	`,
	name: 'Max 3 Enforced (4th button hidden)',
};
