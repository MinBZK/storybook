import { html } from 'lit';
import './rr-checkbox-field.ts';

/**
 * De Checkbox Field component is een checkbox met label.
 *
 */
export default {
  title: 'Components/Inputs/Checkbox Field',
  component: 'rr-checkbox-field',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};

const Template = ({ checked, indeterminate, disabled }) => html`
  <rr-checkbox-field
    ?checked=${checked}
    ?indeterminate=${indeterminate}
    ?disabled=${disabled}
  >Checkbox field</rr-checkbox-field>
`;

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = { checked: true };

export const Indeterminate = Template.bind({});
Indeterminate.args = { indeterminate: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
    <rr-checkbox-field>Unchecked option</rr-checkbox-field>
    <rr-checkbox-field checked>Checked option</rr-checkbox-field>
    <rr-checkbox-field indeterminate>Indeterminate option</rr-checkbox-field>
    <rr-checkbox-field disabled>Disabled option</rr-checkbox-field>
    <rr-checkbox-field checked disabled>Checked disabled option</rr-checkbox-field>
  </div>
`;
