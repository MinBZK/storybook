import { html } from 'lit';
import './rr-segmented-control.ts';
import './rr-segmented-control-item.ts';

/**
 * De Segmented Control component is een horizontale groep van wederzijds exclusieve opties.
 *
 * ## Gebruik
 * ```html
 * <rr-segmented-control value="option1">
 *   <rr-segmented-control-item value="option1">Optie 1</rr-segmented-control-item>
 *   <rr-segmented-control-item value="option2">Optie 2</rr-segmented-control-item>
 *   <rr-segmented-control-item value="option3">Optie 3</rr-segmented-control-item>
 * </rr-segmented-control>
 * ```
 */
export default {
  title: 'Components/Inputs/Segmented Control',
  component: 'rr-segmented-control',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['option1', 'option2', 'option3'],
      description: 'Currently selected value',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Control size',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: false } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the control should take full width',
      table: { defaultValue: { summary: false } },
    },
  },
  args: {
    value: 'option1',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
};

const Template = ({ value, size, disabled, fullWidth }) => html`
  <rr-segmented-control
    value=${value}
    size=${size}
    ?disabled=${disabled}
    ?full-width=${fullWidth}
    @change=${(e) => console.log('Changed:', e.detail)}
  >
    <rr-segmented-control-item value="option1">Optie 1</rr-segmented-control-item>
    <rr-segmented-control-item value="option2">Optie 2</rr-segmented-control-item>
    <rr-segmented-control-item value="option3">Optie 3</rr-segmented-control-item>
  </rr-segmented-control>
`;

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = { size: 'sm' };

export const Medium = Template.bind({});
Medium.args = { size: 'md' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const FullWidth = Template.bind({});
FullWidth.args = { fullWidth: true };
FullWidth.decorators = [
  (Story) => html`<div style="width: 400px;">${Story()}</div>`,
];

// All sizes comparison
export const AllSizes = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <span style="font-size: 14px; color: var(--semantics-content-color);">Small</span>
      <rr-segmented-control size="sm" value="option1">
        <rr-segmented-control-item value="option1">Optie 1</rr-segmented-control-item>
        <rr-segmented-control-item value="option2">Optie 2</rr-segmented-control-item>
        <rr-segmented-control-item value="option3">Optie 3</rr-segmented-control-item>
      </rr-segmented-control>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <span style="font-size: 14px; color: var(--semantics-content-color);">Medium</span>
      <rr-segmented-control size="md" value="option1">
        <rr-segmented-control-item value="option1">Optie 1</rr-segmented-control-item>
        <rr-segmented-control-item value="option2">Optie 2</rr-segmented-control-item>
        <rr-segmented-control-item value="option3">Optie 3</rr-segmented-control-item>
      </rr-segmented-control>
    </div>
  </div>
`;
AllSizes.parameters = { controls: { disable: true } };

// Two items
export const TwoItems = () => html`
  <rr-segmented-control value="yes">
    <rr-segmented-control-item value="yes">Ja</rr-segmented-control-item>
    <rr-segmented-control-item value="no">Nee</rr-segmented-control-item>
  </rr-segmented-control>
`;
TwoItems.parameters = { controls: { disable: true } };

// View mode example
export const ViewModeExample = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <rr-segmented-control value="list" @change=${(e) => console.log('View:', e.detail.value)}>
      <rr-segmented-control-item value="list">Lijst</rr-segmented-control-item>
      <rr-segmented-control-item value="grid">Raster</rr-segmented-control-item>
      <rr-segmented-control-item value="table">Tabel</rr-segmented-control-item>
    </rr-segmented-control>
    <p style="font-size: 14px; color: var(--semantics-content-color); margin: 0;">
      Klik op een optie om de weergave te wijzigen (check console)
    </p>
  </div>
`;
ViewModeExample.parameters = { controls: { disable: true } };
