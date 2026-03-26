import { html } from 'lit';
import './rr-radio-button-field.ts';

/**
 * De Radio Button Field component is een radio button met een inline label.
 * Gebruik binnen `rr-radio-button-group` voor toetsenbordnavigatie en groepssemantiek.
 */
export default {
  title: 'Components/Inputs/Radio Button Field',
  component: 'rr-radio-button-field',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/inputs/radio-button-field/rr-radio-button-field.ts',
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
    },
  },
  args: {
    checked: false,
    disabled: false,
    value: 'optie-1',
  },
};

const Template = ({ checked, disabled, value }) => html`
  <rr-radio-button-field ?checked=${checked} ?disabled=${disabled} value=${value}
    >Radio button field</rr-radio-button-field
  >
`;

export const Standaard = Template.bind({});
Standaard.args = {};

export const AlleToestanden = () => html`
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <rr-radio-button-field value="1">Niet geselecteerd</rr-radio-button-field>
    <rr-radio-button-field value="2" checked>Geselecteerd</rr-radio-button-field>
    <rr-radio-button-field value="3" disabled>Uitgeschakeld</rr-radio-button-field>
    <rr-radio-button-field value="4" checked disabled
      >Geselecteerd en uitgeschakeld</rr-radio-button-field
    >
  </div>
`;
AlleToestanden.parameters = { controls: { disable: true } };
