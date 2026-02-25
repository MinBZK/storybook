import { html } from 'lit';
import './rr-password-field.ts';

/**
 * De Password Field component voor wachtwoordinvoer met zichtbaarheidstoggle.
 *
 * ## Gebruik
 * ```html
 * <rr-password-field placeholder="Password field"></rr-password-field>
 * ```
 */
export default {
  title: 'Components/Inputs/Password Field',
  component: 'rr-password-field',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/inputs/password-field/rr-password-field.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Input value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        defaultValue: { summary: 'Password field' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
    validation: {
      control: 'select',
      options: ['neutral', 'valid', 'invalid'],
      description: 'Validation state',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    masked: {
      control: 'boolean',
      description: 'Whether the password is masked',
      table: {
        defaultValue: { summary: true },
      },
    },
    name: {
      control: 'text',
      description: 'Form field name',
    },
  },
  args: {
    value: '',
    placeholder: 'Password field',
    disabled: false,
    validation: 'neutral',
    masked: true,
    name: 'password',
  },
};

const Template = ({ value, placeholder, disabled, validation, masked, name }) => html`
  <div style="width: 320px;">
    <rr-password-field
      value=${value}
      placeholder=${placeholder}
      ?disabled=${disabled}
      validation=${validation}
      ?masked=${masked}
      name=${name}
    ></rr-password-field>
  </div>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {};

// Unmasked
export const Unmasked = Template.bind({});
Unmasked.args = {
  value: 'visible-password',
  masked: false,
};

// Valid
export const Valid = Template.bind({});
Valid.args = {
  value: 'strong-password-123',
  validation: 'valid',
};

// Invalid
export const Invalid = Template.bind({});
Invalid.args = {
  value: '123',
  validation: 'invalid',
};

// Disabled
export const Disabled = Template.bind({});
Disabled.args = {
  value: 'disabled-password',
  disabled: true,
};

// All states overview
export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 320px;">
    <div>
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b;">Default (empty)</p>
      <rr-password-field placeholder="Password field"></rr-password-field>
    </div>
    <div>
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b;">With value (masked)</p>
      <rr-password-field value="my-password"></rr-password-field>
    </div>
    <div>
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b;">Unmasked</p>
      <rr-password-field value="visible-password" .masked=${false}></rr-password-field>
    </div>
    <div>
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b;">Valid</p>
      <rr-password-field value="strong-password" validation="valid"></rr-password-field>
    </div>
    <div>
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b;">Invalid</p>
      <rr-password-field value="123" validation="invalid"></rr-password-field>
    </div>
    <div>
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b;">Disabled</p>
      <rr-password-field value="disabled" disabled></rr-password-field>
    </div>
  </div>
`;
AllStates.parameters = {
  controls: { disable: true },
};
