import { html } from 'lit';
import './rr-switch-field.ts';

/**
 * De Switch Field component is een switch toggle met een inline label voor gebruik in formulieren.
 */
export default {
  title: 'Components/Inputs/Switch Field',
  component: 'rr-switch-field',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/inputs/switch-field/rr-switch-field.ts',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Aangevinkte toestand',
      table: { defaultValue: { summary: false } },
    },
    disabled: {
      control: 'boolean',
      description: 'Uitgeschakelde toestand',
      table: { defaultValue: { summary: false } },
    },
    value: {
      control: 'text',
      description: 'Waarde voor formulierverwerking',
      table: { defaultValue: { summary: 'on' } },
    },
    name: {
      control: 'text',
      description: 'Naam voor formulierverwerking',
    },
  },
  args: {
    checked: false,
    disabled: false,
    value: 'on',
  },
};

const Template = ({ checked, disabled, value }) => html`
  <rr-switch-field ?checked=${checked} ?disabled=${disabled} value=${value}
    >Switch field</rr-switch-field
  >
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <rr-switch-field value="1">Niet aan</rr-switch-field>
    <rr-switch-field value="2" checked>Aan</rr-switch-field>
    <rr-switch-field value="3" disabled>Uitgeschakeld</rr-switch-field>
    <rr-switch-field value="4" checked disabled>Aan en uitgeschakeld</rr-switch-field>
  </div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
