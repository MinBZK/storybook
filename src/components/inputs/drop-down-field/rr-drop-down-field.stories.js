import { html } from 'lit';
import './rr-drop-down-field.ts';

/**
 * De Drop Down Field component is een select/dropdown veld.
 *
 * ## Gebruik
 * ```html
 * <rr-drop-down-field
 *   .options=${[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *   ]}
 *   placeholder="Select an option"
 * ></rr-drop-down-field>
 * ```
 */
export default {
  title: 'Components/Inputs/Drop Down Field',
  component: 'rr-drop-down-field',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/inputs/drop-down-field/rr-drop-down-field.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected value',
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
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Field size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
    name: {
      control: 'text',
      description: 'Input name for form submission',
    },
  },
  args: {
    value: '',
    placeholder: 'Drop down field',
    size: 'md',
    disabled: false,
    name: '',
  },
};

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const Template = ({ value, placeholder, size, disabled, name }) => html`
  <rr-drop-down-field
    value=${value}
    placeholder=${placeholder}
    size=${size}
    ?disabled=${disabled}
    name=${name}
    .options=${sampleOptions}
  ></rr-drop-down-field>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {};

// With selected value
export const WithValue = Template.bind({});
WithValue.args = {
  value: 'option1',
};

// Size small
export const Small = Template.bind({});
Small.args = {
  size: 'sm',
};

// Disabled
export const Disabled = Template.bind({});
Disabled.args = {
  value: 'option1',
  disabled: true,
};

// All sizes overview
export const AllSizes = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Medium (default)</label>
      <rr-drop-down-field
        size="md"
        placeholder="Drop down field"
        .options=${sampleOptions}
      ></rr-drop-down-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Small</label>
      <rr-drop-down-field
        size="sm"
        placeholder="Drop down field"
        .options=${sampleOptions}
      ></rr-drop-down-field>
    </div>
  </div>
`;
AllSizes.parameters = {
  controls: { disable: true },
};

// All states overview
export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Default</label>
      <rr-drop-down-field
        placeholder="Drop down field"
        .options=${sampleOptions}
      ></rr-drop-down-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">With value</label>
      <rr-drop-down-field
        value="option1"
        .options=${sampleOptions}
      ></rr-drop-down-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Disabled</label>
      <rr-drop-down-field
        value="option1"
        disabled
        .options=${sampleOptions}
      ></rr-drop-down-field>
    </div>
  </div>
`;
AllStates.parameters = {
  controls: { disable: true },
};

// Interactive example
export const InteractiveExample = () => {
  const countries = [
    { value: 'nl', label: 'Nederland' },
    { value: 'be', label: 'België' },
    { value: 'de', label: 'Duitsland' },
    { value: 'fr', label: 'Frankrijk' },
    { value: 'uk', label: 'Verenigd Koninkrijk' },
  ];

  const handleChange = (e) => {
    console.log('Selection changed:', e.detail.value);
  };

  return html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <h3 style="margin: 0; font-family: RijksSansVF, system-ui; font-size: 20px; font-weight: 550;">
        Land selecteren
      </h3>

      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-family: RijksSansVF, system-ui; font-size: 16px;">Land</label>
        <rr-drop-down-field
          @change=${handleChange}
          placeholder="Selecteer een land"
          name="country"
          .options=${countries}
        ></rr-drop-down-field>
      </div>

      <div style="padding: 1rem; background-color: #f1f5f9; border-radius: 5px;">
        <p style="margin: 0; font-family: RijksSansVF, system-ui; font-size: 14px; color: #475569;">
          Tip: Open de browser console om de change events te zien
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
        'Een interactief voorbeeld met een drop down field. De component triggert een `change` event bij selectie.',
    },
  },
};
