import { html } from 'lit';
import './rr-radio-button-field.ts';

/**
 * De Radio Button Field component is een radio button met label.
 *
 */
export default {
  title: 'Components/Inputs/Radio Button Field',
  component: 'rr-radio-button-field',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    disabled: false,
  },
};

const Template = ({ checked, disabled }) => html`
  <rr-radio-button-field
    ?checked=${checked}
    ?disabled=${disabled}
  >Radio button field</rr-radio-button-field>
`;

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = { checked: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const RadioGroup = () => html`
  <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
    <rr-radio-button-field name="option" value="1" checked>Option 1</rr-radio-button-field>
    <rr-radio-button-field name="option" value="2">Option 2</rr-radio-button-field>
    <rr-radio-button-field name="option" value="3">Option 3</rr-radio-button-field>
    <rr-radio-button-field name="option" value="4" disabled>Option 4 (disabled)</rr-radio-button-field>
  </div>
`;
