import { html } from 'lit';
import './rr-password-field.ts';

const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

/**
 * De Password Field component voor wachtwoordinvoer met zichtbaarheidstoggle.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1380-5781)
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1380-5781',
    },
    componentSource: {
      file: 'src/components/password-field/rr-password-field.ts',
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

// Figma Comparison
export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Password Field (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1380-5781" style="display: inline-block;">
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 320px;">
          <rr-password-field placeholder="Password field"></rr-password-field>
          <rr-password-field value="password123" validation="valid"></rr-password-field>
          <rr-password-field value="123" validation="invalid"></rr-password-field>
          <rr-password-field value="disabled" disabled></rr-password-field>
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
