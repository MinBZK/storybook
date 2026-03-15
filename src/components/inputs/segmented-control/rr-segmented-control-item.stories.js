import { html } from 'lit';
import './rr-segmented-control.ts';
import './rr-segmented-control-item.ts';

/**
 * Een individueel item binnen een Segmented Control.
 * Wordt altijd gebruikt als child van `<rr-segmented-control>`.
 *
 * ## Gebruik
 * ```html
 * <rr-segmented-control value="option1">
 *   <rr-segmented-control-item value="option1">Optie 1</rr-segmented-control-item>
 *   <rr-segmented-control-item value="option2">Optie 2</rr-segmented-control-item>
 * </rr-segmented-control>
 * ```
 */
export default {
  title: 'Components/Inputs/Segmented Control Item',
  component: 'rr-segmented-control-item',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Item value',
    },
    selected: {
      control: 'boolean',
      description: 'Selected state',
      table: { defaultValue: { summary: false } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: false } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Item size (inherited from parent)',
      table: { defaultValue: { summary: 'md' } },
    },
  },
  args: {
    value: 'option1',
    selected: false,
    disabled: false,
    size: 'md',
  },
};

const Template = ({ value, selected, disabled, size }) => html`
  <rr-segmented-control size=${size}>
    <rr-segmented-control-item value=${value} ?selected=${selected} ?disabled=${disabled}>
      Optie
    </rr-segmented-control-item>
    <rr-segmented-control-item value="other">Andere optie</rr-segmented-control-item>
  </rr-segmented-control>
`;

export const Default = Template.bind({});
Default.args = {};

export const Selected = Template.bind({});
Selected.args = { selected: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const Small = Template.bind({});
Small.args = { size: 'sm' };

export const States = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <span style="font-size: 14px; color: var(--semantics-content-color);">Default</span>
      <rr-segmented-control>
        <rr-segmented-control-item value="a">Optie A</rr-segmented-control-item>
        <rr-segmented-control-item value="b">Optie B</rr-segmented-control-item>
      </rr-segmented-control>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <span style="font-size: 14px; color: var(--semantics-content-color);">Selected</span>
      <rr-segmented-control value="a">
        <rr-segmented-control-item value="a">Optie A</rr-segmented-control-item>
        <rr-segmented-control-item value="b">Optie B</rr-segmented-control-item>
      </rr-segmented-control>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <span style="font-size: 14px; color: var(--semantics-content-color);">Disabled</span>
      <rr-segmented-control disabled>
        <rr-segmented-control-item value="a">Optie A</rr-segmented-control-item>
        <rr-segmented-control-item value="b">Optie B</rr-segmented-control-item>
      </rr-segmented-control>
    </div>
  </div>
`;
States.parameters = { controls: { disable: true } };
