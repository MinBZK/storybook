import { html } from 'lit';
import './rr-input-field-button.ts';

/**
 * De Input Field Button component is een knop voor gebruik binnen invoervelden
 * (bijv. de +/- knoppen in een number-field).
 *
 * Heeft twee types: `icon` (vierkant met icon slot) en `text` (met tekst).
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=272:353)
 */
export default {
  title: 'Components/Inputs/Input Field Button',
  component: 'rr-input-field-button',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=272:353',
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['icon', 'text'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    type: 'icon',
    disabled: false,
    label: '',
  },
};

const iconSvg = html`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>
</svg>`;

const Template = ({ type, disabled, label }) => html`
  <rr-input-field-button
    type=${type}
    ?disabled=${disabled}
    label=${label}
  >${type === 'text' ? 'Button' : iconSvg}</rr-input-field-button>
`;

export const Default = Template.bind({});

export const Icon = Template.bind({});
Icon.args = { type: 'icon' };

export const Text = Template.bind({});
Text.args = { type: 'text' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const TextDisabled = Template.bind({});
TextDisabled.args = { type: 'text', disabled: true };

export const AllVariants = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <rr-input-field-button type="icon">${iconSvg}</rr-input-field-button>
      <span style="font-size: 12px; color: #64748b;">Icon</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <rr-input-field-button type="icon" disabled>${iconSvg}</rr-input-field-button>
      <span style="font-size: 12px; color: #64748b;">Icon Disabled</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <rr-input-field-button type="text">Button</rr-input-field-button>
      <span style="font-size: 12px; color: #64748b;">Text</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <rr-input-field-button type="text" disabled>Button</rr-input-field-button>
      <span style="font-size: 12px; color: #64748b;">Text Disabled</span>
    </div>
  </div>
`;

const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <ftl-holster node="272:353" style="display: inline-block;">
      <div style="display: flex; align-items: center; padding: 16px 17px 16px 7px; background: #ffffff;">
        <rr-input-field-button type="icon" style="margin-right: 1px;">${iconSvg}</rr-input-field-button>
        <rr-input-field-button type="icon" style="margin-right: 5px;">${iconSvg}</rr-input-field-button>
        <rr-input-field-button type="icon" disabled style="margin-right: 15px;">${iconSvg}</rr-input-field-button>
        <rr-input-field-button type="text" style="margin-right: 9px;">Button</rr-input-field-button>
        <rr-input-field-button type="text" disabled>Button</rr-input-field-button>
      </div>
    </ftl-holster>
  </ftl-belt>
`;
FigmaComparison.tags = ['!autodocs', 'figma'];
