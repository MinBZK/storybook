import { html } from 'lit';
import './rr-switch.ts';

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
  title: 'Components/Inputs/Switch',
  component: 'rr-switch',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-41353',
    },
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
      <span style="font-size: 14px; color: #64748b;">Small (44x24)</span>
      <rr-switch size="sm" aria-label="Small switch"></rr-switch>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
      <span style="font-size: 14px; color: #64748b;">Medium (56x32)</span>
      <rr-switch size="md" aria-label="Medium switch"></rr-switch>
    </div>
  </div>
`;
AllSizes.parameters = { controls: { disable: true } };

// Figma Comparison - visual comparison with Figma design (standalone switch node)
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our switches (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="232:38506" style="display: inline-block;">
        <!--
          Figma switch standalone (232:38506) component set:
          - Frame: 152x168px
          - Variants in absolute positioning:
            Row 1 (y=16): sm off (16,16), sm on (68,16)
            Row 2 (y=48): sm off disabled, sm on disabled
            Row 3 (y=80): md off (16,80), md on (80,80)
            Row 4 (y=120): md off disabled, md on disabled
        -->
        <div style="width: 152px; height: 168px; background: #ffffff; position: relative; box-sizing: border-box;">
          <!-- Row 1: sm enabled -->
          <div style="position: absolute; left: 16px; top: 16px;">
            <rr-switch size="sm" aria-label="Small off"></rr-switch>
          </div>
          <div style="position: absolute; left: 68px; top: 16px;">
            <rr-switch size="sm" checked aria-label="Small on"></rr-switch>
          </div>
          <!-- Row 2: sm disabled -->
          <div style="position: absolute; left: 16px; top: 48px;">
            <rr-switch size="sm" disabled aria-label="Small off disabled"></rr-switch>
          </div>
          <div style="position: absolute; left: 68px; top: 48px;">
            <rr-switch size="sm" checked disabled aria-label="Small on disabled"></rr-switch>
          </div>
          <!-- Row 3: md enabled -->
          <div style="position: absolute; left: 16px; top: 80px;">
            <rr-switch size="md" aria-label="Medium off"></rr-switch>
          </div>
          <div style="position: absolute; left: 80px; top: 80px;">
            <rr-switch size="md" checked aria-label="Medium on"></rr-switch>
          </div>
          <!-- Row 4: md disabled -->
          <div style="position: absolute; left: 16px; top: 120px;">
            <rr-switch size="md" disabled aria-label="Medium off disabled"></rr-switch>
          </div>
          <div style="position: absolute; left: 80px; top: 120px;">
            <rr-switch size="md" checked disabled aria-label="Medium on disabled"></rr-switch>
          </div>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = {
  controls: { disable: true },
};
