import { html } from 'lit';
import './rr-radio-button-field.ts';

/**
 * De Radio Button Field component is een radio button met label.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=241:2382)
 */
export default {
  title: 'Components/Inputs/Radio Button Field',
  component: 'rr-radio-button-field',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=241:2382',
    },
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
  <rr-radio-button-field
    ?checked=${checked}
    ?disabled=${disabled}
  >Radio button field</rr-radio-button-field>
`;

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = { checked: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const RadioGroup = () => html`
  <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
    <rr-radio-button-field name="option" value="1" checked>Option 1</rr-radio-button-field>
    <rr-radio-button-field name="option" value="2">Option 2</rr-radio-button-field>
    <rr-radio-button-field name="option" value="3">Option 3</rr-radio-button-field>
    <rr-radio-button-field name="option" value="4" disabled>Option 4 (disabled)</rr-radio-button-field>
  </div>
`;

const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <ftl-holster node="241:2382" style="display: inline-block;">
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 363px; background: #ffffff;">
        <rr-radio-button-field>Radio button field</rr-radio-button-field>
        <rr-radio-button-field checked>Radio button field</rr-radio-button-field>
      </div>
    </ftl-holster>
  </ftl-belt>
`;
FigmaComparison.tags = ['!autodocs', 'figma'];
