import { html } from 'lit';
import './rr-switch-field.ts';

/**
 * De Switch Field component is een switch toggle met label.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=348:2635)
 */
export default {
  title: 'Components/Inputs/Switch Field',
  component: 'rr-switch-field',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=348:2635',
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
  <rr-switch-field
    ?checked=${checked}
    ?disabled=${disabled}
  >Switch field</rr-switch-field>
`;

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = { checked: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
    <rr-switch-field>Notifications enabled</rr-switch-field>
    <rr-switch-field checked>Dark mode</rr-switch-field>
    <rr-switch-field disabled>Premium feature (disabled)</rr-switch-field>
    <rr-switch-field checked disabled>Always on (disabled)</rr-switch-field>
  </div>
`;

const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <ftl-holster node="348:2635" style="display: inline-block;">
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 395px; background: #ffffff;">
        <rr-switch-field>Switch field</rr-switch-field>
        <rr-switch-field checked>Switch field</rr-switch-field>
      </div>
    </ftl-holster>
  </ftl-belt>
`;
FigmaComparison.tags = ['!autodocs', 'figma'];
