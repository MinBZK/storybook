import { html } from 'lit';
import './rr-switch.js';

/**
 * De Switch component is een toggle control voor aan/uit instellingen.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-41353)
 *
 * ## Gebruik
 * ```html
 * <rr-switch></rr-switch>
 * <rr-switch checked></rr-switch>
 * ```
 */
export default {
  title: 'Components/Switch',
  component: 'rr-switch',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-41353',
    },
    componentSource: {
      file: 'src/components/switch/rr-switch.js',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is on',
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm'],
      description: 'Switch size',
      table: {
        defaultValue: { summary: 'm' },
      },
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: 'm',
  },
};

const Template = ({ checked, disabled, size }) => html`
  <rr-switch
    ?checked=${checked}
    ?disabled=${disabled}
    size=${size}
    aria-label="Toggle switch"
    @change=${(e) => {
      console.log('Switch changed:', e.detail.checked);
    }}
  ></rr-switch>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
  checked: false,
};

// States
export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const CheckedDisabled = Template.bind({});
CheckedDisabled.args = {
  checked: true,
  disabled: true,
};

// Sizes
export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  size: 'xs',
};

export const Small = Template.bind({});
Small.args = {
  size: 's',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'm',
};

// All sizes overview
export const AllSizes = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <rr-switch size="xs" aria-label="Extra small switch"></rr-switch>
      <span style="font-size: 0.875rem; color: #64748b;">XS</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <rr-switch size="s" aria-label="Small switch"></rr-switch>
      <span style="font-size: 0.875rem; color: #64748b;">S</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
      <rr-switch size="m" aria-label="Medium switch"></rr-switch>
      <span style="font-size: 0.875rem; color: #64748b;">M</span>
    </div>
  </div>
`;
AllSizes.parameters = {
  controls: { disable: true },
};

// All states overview
export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; gap: 1rem; align-items: center;">
      <rr-switch aria-label="Unchecked switch"></rr-switch>
      <span>Unchecked</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <rr-switch checked aria-label="Checked switch"></rr-switch>
      <span>Checked</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <rr-switch disabled aria-label="Disabled switch"></rr-switch>
      <span>Disabled</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <rr-switch checked disabled aria-label="Checked disabled switch"></rr-switch>
      <span>Checked Disabled</span>
    </div>
  </div>
`;
AllStates.parameters = {
  controls: { disable: true },
};

// Interactive example with label
export const WithLabel = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
      <rr-switch id="notifications" aria-label="Notificaties inschakelen"></rr-switch>
      <span>Notificaties inschakelen</span>
    </label>
    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
      <rr-switch id="dark-mode" checked aria-label="Donkere modus"></rr-switch>
      <span>Donkere modus</span>
    </label>
    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
      <rr-switch id="auto-save" checked aria-label="Automatisch opslaan"></rr-switch>
      <span>Automatisch opslaan</span>
    </label>
  </div>
`;
WithLabel.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Switch met een label. Gebruik een `<label>` element voor betere toegankelijkheid.',
    },
  },
};

// Size comparison matrix
export const SizeStateMatrix = () => html`
  <table style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr>
        <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">Size</th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Unchecked
        </th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Checked
        </th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Disabled
        </th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Checked Disabled
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">XS</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-switch size="xs" aria-label="XS unchecked switch"></rr-switch>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-switch size="xs" checked aria-label="XS checked switch"></rr-switch>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-switch size="xs" disabled aria-label="XS disabled switch"></rr-switch>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-switch size="xs" checked disabled aria-label="XS checked disabled switch"></rr-switch>
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">S</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-switch size="s" aria-label="S unchecked switch"></rr-switch>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-switch size="s" checked aria-label="S checked switch"></rr-switch>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-switch size="s" disabled aria-label="S disabled switch"></rr-switch>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-switch size="s" checked disabled aria-label="S checked disabled switch"></rr-switch>
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;">M</td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-switch size="m" aria-label="M unchecked switch"></rr-switch>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-switch size="m" checked aria-label="M checked switch"></rr-switch>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-switch size="m" disabled aria-label="M disabled switch"></rr-switch>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-switch size="m" checked disabled aria-label="M checked disabled switch"></rr-switch>
        </td>
      </tr>
    </tbody>
  </table>
`;
SizeStateMatrix.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Overzicht van alle beschikbare sizes en states in een matrix.',
    },
  },
};

// Programmatic control example
export const ProgrammaticControl = () => {
  const handleToggle = () => {
    const switchEl = document.querySelector('#programmatic-switch');
    if (switchEl) {
      switchEl.checked = !switchEl.checked;
    }
  };

  return html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <rr-switch
        id="programmatic-switch"
        aria-label="Programmatisch bestuurbare switch"
        @change=${(e) => {
          const status = document.querySelector('#status');
          if (status) {
            status.textContent = e.detail.checked ? 'Aan' : 'Uit';
          }
        }}
      ></rr-switch>
      <button @click=${handleToggle} style="padding: 0.5rem 1rem; width: fit-content;">
        Toggle Switch
      </button>
      <p>Status: <strong id="status">Uit</strong></p>
    </div>
  `;
};
ProgrammaticControl.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Voorbeeld van programmatische controle van de switch. De switch kan worden getoggeld via JavaScript.',
    },
  },
};
