import { html } from 'lit';
import './rr-switch-field.ts';

/**
 * De Switch Field component is een switch toggle met label.
 *
 */
export default {
  title: 'Components/Inputs/Switch Field',
  component: 'rr-switch-field',
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
  <rr-switch-field
    ?checked=${checked}
    ?disabled=${disabled}
  >Switch field</rr-switch-field>
`;

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = { checked: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
    <rr-switch-field>Notifications enabled</rr-switch-field>
    <rr-switch-field checked>Dark mode</rr-switch-field>
    <rr-switch-field disabled>Premium feature (disabled)</rr-switch-field>
    <rr-switch-field checked disabled>Always on (disabled)</rr-switch-field>
  </div>
`;
