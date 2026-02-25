import { html } from 'lit';
import './rr-button-group.ts';
import '../../actions/button/rr-button.ts';

export default {
  title: 'Components/Control Groups/Button Group',
  component: 'rr-button-group',
  tags: ['autodocs'],
  parameters: {
  },
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
  },
};

export const Default = {
	args: { size: 'md', flow: 'vertical' },
	render: (args) => html`
	<rr-button-group size=${args.size} flow=${args.flow}>
		<rr-button variant="primary">Bewaar</rr-button>
		<rr-button variant="secondary">Bewaar en maak nieuwe</rr-button>
	</rr-button-group>
	`,
};

export const Vertical = {
	args: { size: 'md', flow: 'horizontal' },
	render: (args) => html`
	<rr-button-group size=${args.size} flow=${args.flow}>
		<rr-button variant="primary">Bewaar</rr-button>
		<rr-button variant="secondary">Bewaar en maak nieuwe</rr-button>
	</rr-button-group>
	`,
};

export const SizeSmall = {
	args: { size: 'sm', flow: 'horizontal' },
	render: (args) => html`
	<rr-button-group size=${args.size} flow=${args.flow}>
		<rr-button variant="primary">Bewaar</rr-button>
		<rr-button variant="secondary">Bewaar en maak nieuwe</rr-button>
	</rr-button-group>
	`,
};

export const ThreeButtons = {
	args: { size: 'md', flow: 'vertical' },
	render: (args) => html`
	<rr-button-group size=${args.size} flow=${args.flow}>
		<rr-button variant="primary">Bewaar</rr-button>
		<rr-button variant="secondary">Bewaar en maak nieuwe</rr-button>
		<rr-button variant="destructive">Verwijder</rr-button>
	</rr-button-group>
	`,
};

export const MaxEnforced = {
	args: { size: 'md', flow: 'vertical' },
	render: (args) => html`
	<rr-button-group size=${args.size} flow=${args.flow}>
		<rr-button variant="primary">Bewaar</rr-button>
		<rr-button variant="secondary">Bewaar en maak nieuwe</rr-button>
		<rr-button variant="destructive">Verwijder</rr-button>
		<rr-button variant="secondary">Een knop te veel</rr-button>
	</rr-button-group>
	`,
};
MaxEnforced.storyName = 'Max 3 Enforced (4th button hidden)';
