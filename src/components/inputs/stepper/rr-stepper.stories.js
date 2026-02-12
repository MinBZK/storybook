import { html } from 'lit';
import './rr-stepper.ts';

/**
 * De Stepper component is een numerieke control met increment en decrement buttons.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-39011)
 *
 * ## Gebruik
 * ```html
 * <rr-stepper value="5" min="0" max="10"></rr-stepper>
 * ```
 */
export default {
  title: 'Components/Inputs/Stepper',
  component: 'rr-stepper',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-39011',
    },
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Current value',
      table: { defaultValue: { summary: 0 } },
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
      table: { defaultValue: { summary: 0 } },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
      table: { defaultValue: { summary: 100 } },
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment',
      table: { defaultValue: { summary: 1 } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: false } },
    },
    size: {
      control: 'select',
      options: ['s', 'm'],
      description: 'Stepper size',
      table: { defaultValue: { summary: 'm' } },
    },
  },
  args: {
    value: 5,
    min: 0,
    max: 10,
    step: 1,
    disabled: false,
    size: 'm',
  },
};

const Template = ({ value, min, max, step, disabled, size }) => html`
  <rr-stepper
    value=${value}
    min=${min}
    max=${max}
    step=${step}
    ?disabled=${disabled}
    size=${size}
    @change=${(e) => console.log('Value changed:', e.detail.value)}
  ></rr-stepper>
`;

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = { size: 's' };

export const Medium = Template.bind({});
Medium.args = { size: 'm' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const AtMinimum = Template.bind({});
AtMinimum.args = { value: 0, min: 0 };

export const AtMaximum = Template.bind({});
AtMaximum.args = { value: 10, max: 10 };

// All sizes
export const AllSizes = () => html`
  <div style="display: flex; gap: 2rem; align-items: center;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
      <span style="font-size: 14px; color: #64748b;">Small</span>
      <rr-stepper size="s" value="5"></rr-stepper>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
      <span style="font-size: 14px; color: #64748b;">Medium</span>
      <rr-stepper size="m" value="5"></rr-stepper>
    </div>
  </div>
`;
AllSizes.parameters = { controls: { disable: true } };

// Interactive example with display
export const InteractiveExample = () => {
  return html`
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <rr-stepper
          id="demo-stepper"
          value="5"
          min="0"
          max="10"
          @change=${(e) => {
            const display = document.querySelector('#value-display');
            if (display) display.textContent = e.detail.value;
          }}
        ></rr-stepper>
        <span style="font-size: 18px; font-weight: 500; min-width: 40px;">
          Value: <span id="value-display">5</span>
        </span>
      </div>
      <p style="font-size: 14px; color: #64748b; margin: 0;">
        Click the + and - buttons to change the value (min: 0, max: 10)
      </p>
    </div>
  `;
};
InteractiveExample.parameters = { controls: { disable: true } };

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our stepper (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="236:39011" style="display: inline-block;">
        <!--
          Figma stepper (236:39011) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Variants: md (top), sm (bottom)
          - Frame size: hug content
        -->
        <div
          style="display: flex; flex-direction: column; gap: 16px; padding: 16px; background: #ffffff;"
        >
          <rr-stepper size="m" value="5"></rr-stepper>
          <rr-stepper size="s" value="5"></rr-stepper>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
