import { html } from 'lit';
import './rr-number-field.ts';

/**
 * De Number Field component is een numeriek invoerveld met plus en min knoppen.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=266:344)
 *
 * ## Gebruik
 * ```html
 * <rr-number-field value="1" min="0" max="10"></rr-number-field>
 * ```
 */
export default {
  title: 'Components/Form Fields/Number Field',
  component: 'rr-number-field',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=266:344',
    },
    componentSource: {
      file: 'src/components/number-field/rr-number-field.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    value: {
      control: 'number',
      description: 'Numeric value',
      table: {
        defaultValue: { summary: 0 },
      },
    },
    min: {
      control: 'number',
      description: 'Minimum allowed value',
      table: {
        defaultValue: { summary: '-Infinity' },
      },
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value',
      table: {
        defaultValue: { summary: 'Infinity' },
      },
    },
    step: {
      control: 'number',
      description: 'Step increment for buttons',
      table: {
        defaultValue: { summary: 1 },
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
    value: 1,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    name: '',
  },
};

const Template = ({ value, min, max, step, disabled, name }) => html`
  <rr-number-field
    value=${value}
    min=${min}
    max=${max}
    step=${step}
    ?disabled=${disabled}
    name=${name}
  ></rr-number-field>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {};

// With constraints
export const WithConstraints = Template.bind({});
WithConstraints.args = {
  value: 5,
  min: 0,
  max: 10,
};

// At minimum
export const AtMinimum = Template.bind({});
AtMinimum.args = {
  value: 0,
  min: 0,
  max: 10,
};

// At maximum
export const AtMaximum = Template.bind({});
AtMaximum.args = {
  value: 10,
  min: 0,
  max: 10,
};

// Disabled
export const Disabled = Template.bind({});
Disabled.args = {
  value: 5,
  disabled: true,
};

// Custom step
export const CustomStep = Template.bind({});
CustomStep.args = {
  value: 0,
  min: 0,
  max: 100,
  step: 10,
};

// All states overview
export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Default</label>
      <rr-number-field value="1"></rr-number-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">At minimum (0)</label>
      <rr-number-field value="0" min="0" max="10"></rr-number-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">At maximum (10)</label>
      <rr-number-field value="10" min="0" max="10"></rr-number-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Disabled</label>
      <rr-number-field value="5" disabled></rr-number-field>
    </div>
  </div>
`;
AllStates.parameters = {
  controls: { disable: true },
};

// Interactive example
export const InteractiveExample = () => {
  const handleChange = (e) => {
    console.log('Value changed:', e.detail.value);
  };

  return html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <h3 style="margin: 0; font-family: RijksSansVF, system-ui; font-size: 20px; font-weight: 550;">
        Aantal personen
      </h3>

      <div style="display: flex; align-items: center; gap: 1rem;">
        <rr-number-field
          @change=${handleChange}
          value="2"
          min="1"
          max="10"
          name="aantal"
        ></rr-number-field>
        <span style="font-family: RijksSansVF, system-ui; font-size: 16px;">personen</span>
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
        'Een interactief voorbeeld met een number field. De component triggert `input` en `change` events.',
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
        Number Field (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="266:344" style="display: inline-block;">
        <!--
          Figma number-field component set layout:
          - Hug content
          - 16px padding
          - 16px gap between variants
          - 2 variants: enabled, disabled
        -->
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; background: #ffffff;">
          <rr-number-field value="1"></rr-number-field>
          <rr-number-field value="1" disabled></rr-number-field>
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
