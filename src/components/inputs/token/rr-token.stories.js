import { html } from 'lit';
import './rr-token.ts';

/**
 * De Token component is een tag/chip component voor het weergeven van geselecteerde waarden of filters.
 *
 * ## Gebruik
 * ```html
 * <rr-token>Label</rr-token>
 * <rr-token control="dismiss">Verwijderbaar</rr-token>
 * <rr-token control="picker">Kies optie</rr-token>
 * ```
 */
export default {
  title: 'Components/Inputs/Token',
  component: 'rr-token',
  tags: ['autodocs'],
  parameters: {
  },
  argTypes: {
    control: {
      control: 'select',
      options: ['none', 'dismiss', 'picker'],
      description: 'Control type',
      table: { defaultValue: { summary: 'none' } },
    },
    open: {
      control: 'boolean',
      description: 'Whether picker menu is open',
      table: { defaultValue: { summary: false } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: false } },
    },
    label: {
      control: 'text',
      description: 'Token text',
    },
  },
  args: {
    control: 'none',
    open: false,
    disabled: false,
    label: 'Token',
  },
};

const Template = ({ control, open, disabled, label }) => html`
  <rr-token
    control=${control}
    ?open=${open}
    ?disabled=${disabled}
    @dismiss=${() => console.log('Dismiss clicked')}
    @toggle=${(e) => console.log('Toggle:', e.detail)}
  >
    ${label}
  </rr-token>
`;

export const Default = Template.bind({});
Default.args = {};

export const WithDismiss = Template.bind({});
WithDismiss.args = { control: 'dismiss', label: 'Verwijderbaar' };

export const WithPicker = Template.bind({});
WithPicker.args = { control: 'picker', label: 'Kies optie' };

export const PickerOpen = Template.bind({});
PickerOpen.args = { control: 'picker', open: true, label: 'Menu open' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

// All variants
export const AllVariants = () => html`
  <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
    <rr-token>Geen control</rr-token>
    <rr-token control="dismiss">Met dismiss</rr-token>
    <rr-token control="picker">Met picker</rr-token>
    <rr-token control="picker" open>Picker open</rr-token>
  </div>
`;
AllVariants.parameters = { controls: { disable: true } };

// Interactive example
export const FilterExample = () => {
  const handleDismiss = (e) => {
    e.target.remove();
  };

  return html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="margin: 0; font-size: 14px; color: var(--semantics-content-color);">
        Klik op het X icoon om een filter te verwijderen:
      </p>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <rr-token control="dismiss" @dismiss=${handleDismiss}>Status: Actief</rr-token>
        <rr-token control="dismiss" @dismiss=${handleDismiss}>Type: Document</rr-token>
        <rr-token control="dismiss" @dismiss=${handleDismiss}>Datum: Vandaag</rr-token>
        <rr-token control="dismiss" @dismiss=${handleDismiss}>Auteur: Jan</rr-token>
      </div>
    </div>
  `;
};
FilterExample.parameters = { controls: { disable: true } };
