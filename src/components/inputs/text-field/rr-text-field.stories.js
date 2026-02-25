import { html } from 'lit';
import './rr-text-field.ts';

/**
 * De Text Field component is een basis input veld voor tekst invoer.
 *
 * ## Gebruik
 * ```html
 * <rr-text-field placeholder="Voer tekst in"></rr-text-field>
 * ```
 */
export default {
  title: 'Components/Inputs/Text Field',
  component: 'rr-text-field',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/inputs/text-field/rr-text-field.ts',
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
      table: {
        defaultValue: { summary: '' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        defaultValue: { summary: '' },
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
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url'],
      description: 'Input type',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    name: {
      control: 'text',
      description: 'Input name for form submission',
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state',
      table: {
        defaultValue: { summary: false },
      },
    },
    required: {
      control: 'boolean',
      description: 'Required state',
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    value: '',
    placeholder: 'Text field',
    validation: 'neutral',
    disabled: false,
    type: 'text',
    name: '',
    readonly: false,
    required: false,
  },
};

const Template = ({
  value,
  placeholder,
  validation,
  disabled,
  type,
  name,
  readonly,
  required,
}) => html`
  <rr-text-field
    value=${value}
    placeholder=${placeholder}
    validation=${validation}
    ?disabled=${disabled}
    type=${type}
    name=${name}
    ?readonly=${readonly}
    ?required=${required}
  ></rr-text-field>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {};

// With value
export const WithValue = Template.bind({});
WithValue.args = {
  value: 'Hello World',
};

// Validation states
export const Valid = Template.bind({});
Valid.args = {
  value: 'Correct value',
  validation: 'valid',
};

export const Invalid = Template.bind({});
Invalid.args = {
  value: 'Incorrect value',
  validation: 'invalid',
};

// Disabled
export const Disabled = Template.bind({});
Disabled.args = {
  value: 'Disabled field',
  disabled: true,
};

// Password
export const Password = Template.bind({});
Password.args = {
  type: 'password',
  placeholder: 'Enter password',
};

// All states overview
export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Neutral</label>
      <rr-text-field placeholder="Neutral text field"></rr-text-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Valid</label>
      <rr-text-field value="Valid input" validation="valid"></rr-text-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Invalid</label>
      <rr-text-field value="Invalid input" validation="invalid"></rr-text-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Disabled</label>
      <rr-text-field value="Disabled field" disabled></rr-text-field>
    </div>
  </div>
`;
AllStates.parameters = {
  controls: { disable: true },
};

// Interactive example
export const InteractiveExample = () => {
  const handleInput = (e) => {
    console.log('Input:', e.detail.value);
  };

  const handleChange = (e) => {
    console.log('Change:', e.detail.value);
  };

  return html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <h3 style="margin: 0; font-family: RijksSansVF, system-ui; font-size: 20px; font-weight: 550;">
        Contact gegevens
      </h3>

      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-family: RijksSansVF, system-ui; font-size: 16px;">Naam</label>
        <rr-text-field
          @input=${handleInput}
          @change=${handleChange}
          name="naam"
          placeholder="Uw volledige naam"
        ></rr-text-field>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-family: RijksSansVF, system-ui; font-size: 16px;">E-mail</label>
        <rr-text-field
          @input=${handleInput}
          @change=${handleChange}
          name="email"
          type="email"
          placeholder="uw@email.nl"
        ></rr-text-field>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-family: RijksSansVF, system-ui; font-size: 16px;">Telefoonnummer</label>
        <rr-text-field
          @input=${handleInput}
          @change=${handleChange}
          name="telefoon"
          type="tel"
          placeholder="+31 6 12345678"
        ></rr-text-field>
      </div>

      <div style="margin-top: 1rem; padding: 1rem; background-color: #f1f5f9; border-radius: 5px;">
        <p style="margin: 0; font-family: RijksSansVF, system-ui; font-size: 14px; color: #475569;">
          Tip: Open de browser console om de input en change events te zien
        </p>
      </div>
    </div>
  `;
};
InteractiveExample.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Een interactief voorbeeld met meerdere text fields. De component triggert `input` en `change` events.',
    },
  },
};
