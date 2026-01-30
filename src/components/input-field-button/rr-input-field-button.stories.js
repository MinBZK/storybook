import { html } from 'lit';
import './rr-input-field-button.ts';

/**
 * De Input Field Button component is een knop voor gebruik binnen invoervelden.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=272:353)
 */
export default {
  title: 'Components/Form Fields/Input Field Button',
  component: 'rr-input-field-button',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=272:353',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['clear', 'submit', 'picker'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'clear',
    disabled: false,
  },
};

const Template = ({ variant, disabled }) => html`
  <rr-input-field-button
    variant=${variant}
    ?disabled=${disabled}
  ></rr-input-field-button>
`;

export const Default = Template.bind({});

export const Clear = Template.bind({});
Clear.args = { variant: 'clear' };

export const Submit = Template.bind({});
Submit.args = { variant: 'submit' };

export const Picker = Template.bind({});
Picker.args = { variant: 'picker' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const AllVariants = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <rr-input-field-button variant="clear"></rr-input-field-button>
      <span style="font-size: 12px; color: #64748b;">Clear</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <rr-input-field-button variant="submit"></rr-input-field-button>
      <span style="font-size: 12px; color: #64748b;">Submit</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <rr-input-field-button variant="picker"></rr-input-field-button>
      <span style="font-size: 12px; color: #64748b;">Picker</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <rr-input-field-button variant="clear" disabled></rr-input-field-button>
      <span style="font-size: 12px; color: #64748b;">Disabled</span>
    </div>
  </div>
`;

const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <ftl-holster node="272:353" style="display: inline-block;">
      <div style="display: flex; gap: 8px; padding: 16px; background: #ffffff;">
        <rr-input-field-button variant="clear"></rr-input-field-button>
        <rr-input-field-button variant="submit"></rr-input-field-button>
        <rr-input-field-button variant="picker"></rr-input-field-button>
      </div>
    </ftl-holster>
  </ftl-belt>
`;
FigmaComparison.tags = ['!autodocs', 'figma'];
