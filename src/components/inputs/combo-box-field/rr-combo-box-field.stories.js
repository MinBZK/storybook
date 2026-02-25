import { html } from 'lit';
import './rr-combo-box-field.ts';

/**
 * De Combo Box Field component is een tekstveld met autocomplete/dropdown functionaliteit.
 *
 * ## Gebruik
 * ```html
 * <rr-combo-box-field placeholder="Type to search..."></rr-combo-box-field>
 * ```
 */
export default {
  title: 'Components/Inputs/Combo Box Field',
  component: 'rr-combo-box-field',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    value: '',
    placeholder: 'Combo box field',
    disabled: false,
  },
};

const Template = ({ value, placeholder, disabled }) => html`
  <rr-combo-box-field
    value=${value}
    placeholder=${placeholder}
    ?disabled=${disabled}
  ></rr-combo-box-field>
`;

export const Default = Template.bind({});

export const WithValue = Template.bind({});
WithValue.args = { value: 'Selected value' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
    <rr-combo-box-field placeholder="Combo box field"></rr-combo-box-field>
    <rr-combo-box-field placeholder="Combo box field" disabled></rr-combo-box-field>
  </div>
`;
