import { html } from 'lit';
import './rr-input-field-button.ts';

/**
 * De Input Field Button component is een knop voor gebruik binnen invoervelden
 * (bijv. de +/- knoppen in een number-field).
 *
 * Heeft twee types: `icon` (vierkant met icon slot) en `text` (met tekst).
 *
 */
export default {
  title: 'Components/Inputs/Input Field Button',
  component: 'rr-input-field-button',
  tags: ['autodocs'],
  parameters: {
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
