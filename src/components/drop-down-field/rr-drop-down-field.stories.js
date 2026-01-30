import { html } from 'lit';
import './rr-drop-down-field.ts';

/**
 * De Drop Down Field component is een select/dropdown veld.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=358:717)
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
  title: 'Components/Form Fields/Drop Down Field',
  component: 'rr-drop-down-field',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=358:717',
    },
    componentSource: {
      file: 'src/components/drop-down-field/rr-drop-down-field.ts',
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

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Drop Down Field (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="358:717" style="display: inline-block;">
        <!--
          Figma drop-down-field component set layout:
          - 456px width
          - 16px padding
          - 16px gap between variants
          - 4 variants: md enabled, md disabled, sm enabled, sm disabled
        -->
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 424px; background: #ffffff;">
          <rr-drop-down-field size="md" value="Drop down field" .options=${[{ value: 'Drop down field', label: 'Drop down field' }]}></rr-drop-down-field>
          <rr-drop-down-field size="md" value="Drop down field" disabled .options=${[{ value: 'Drop down field', label: 'Drop down field' }]}></rr-drop-down-field>
          <rr-drop-down-field size="sm" value="Drop down field" .options=${[{ value: 'Drop down field', label: 'Drop down field' }]}></rr-drop-down-field>
          <rr-drop-down-field size="sm" value="Drop down field" disabled .options=${[{ value: 'Drop down field', label: 'Drop down field' }]}></rr-drop-down-field>
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
