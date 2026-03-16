import { html } from 'lit';
import './rr-switch.ts';

/**
 * De Switch component is een toggle control voor aan/uit instellingen.
 *
 * ## Gebruik
 * ```html
 * <rr-switch></rr-switch>
 * <rr-switch checked></rr-switch>
 * ```
 */
export default {
  title: 'Components/Inputs/Switch',
  component: 'rr-switch',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/inputs/switch/rr-switch.js',
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
      options: ['sm', 'md'],
      description: 'Switch size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: 'md',
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

// All sizes overview
export const AllSizes = () => html`
  <div style="display: flex; gap: 2rem; align-items: center;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
      <span style="font-size: 14px; color: var(--semantics-content-color);">Small (44x24)</span>
      <rr-switch size="sm" aria-label="Small switch"></rr-switch>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
      <span style="font-size: 14px; color: var(--semantics-content-color);">Medium (56x32)</span>
      <rr-switch size="md" aria-label="Medium switch"></rr-switch>
    </div>
  </div>
`;
AllSizes.parameters = { controls: { disable: true } };
