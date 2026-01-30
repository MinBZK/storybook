import { html } from 'lit';
import './rr-checkbox-field.ts';

/**
 * De Checkbox Field component is een checkbox met label.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=241:2345)
 */
export default {
  title: 'Components/Form Fields/Checkbox Field',
  component: 'rr-checkbox-field',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=241:2345',
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};

const Template = ({ checked, indeterminate, disabled }) => html`
  <rr-checkbox-field
    ?checked=${checked}
    ?indeterminate=${indeterminate}
    ?disabled=${disabled}
  >Checkbox field</rr-checkbox-field>
`;

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = { checked: true };

export const Indeterminate = Template.bind({});
Indeterminate.args = { indeterminate: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
    <rr-checkbox-field>Unchecked option</rr-checkbox-field>
    <rr-checkbox-field checked>Checked option</rr-checkbox-field>
    <rr-checkbox-field indeterminate>Indeterminate option</rr-checkbox-field>
    <rr-checkbox-field disabled>Disabled option</rr-checkbox-field>
    <rr-checkbox-field checked disabled>Checked disabled option</rr-checkbox-field>
  </div>
`;

const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <ftl-holster node="241:2345" style="display: inline-block;">
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 395px; background: #ffffff;">
        <rr-checkbox-field>Checkbox field</rr-checkbox-field>
        <rr-checkbox-field checked>Checkbox field</rr-checkbox-field>
        <rr-checkbox-field indeterminate>Checkbox field</rr-checkbox-field>
      </div>
    </ftl-holster>
  </ftl-belt>
`;
FigmaComparison.tags = ['!autodocs', 'figma'];
