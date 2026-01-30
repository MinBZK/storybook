import { html } from 'lit';
import './rr-text-field.ts';

/**
 * De Text Field component is een basis input veld voor tekst invoer.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=192:37504)
 *
 * ## Gebruik
 * ```html
 * <rr-text-field placeholder="Voer tekst in"></rr-text-field>
 * ```
 */
export default {
  title: 'Components/Form Fields/Text Field',
  component: 'rr-text-field',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=192:37504',
    },
    componentSource: {
      file: 'src/components/text-field/rr-text-field.ts',
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

// Figma Comparison - visual comparison with Figma design
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Text Field (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="192:37504" style="display: inline-block;">
        <!--
          Figma text-field component set layout:
          - 411px width
          - 16px padding
          - 16px gap between variants
          - 4 variants: neutral, disabled, valid, invalid
        -->
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 379px; background: #ffffff;">
          <rr-text-field placeholder="Text field" validation="neutral"></rr-text-field>
          <rr-text-field placeholder="Text field" validation="neutral" disabled></rr-text-field>
          <rr-text-field placeholder="Text field" validation="valid"></rr-text-field>
          <rr-text-field placeholder="Text field" validation="invalid"></rr-text-field>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = 'Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = {
  controls: { disable: true },
};
