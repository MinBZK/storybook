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

// Figma Comparison - visual comparison with Figma design
// Note: The Figma node 236:41353 is the switch-list-cell container showing all switch variants.
// For true pixel-perfect overlay comparison, individual switch node IDs are needed.
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div
        style="padding: 1rem; background: #fefce8; border: 1px solid #fef08a; border-radius: 8px; margin-bottom: 1rem;"
      >
        <p style="margin: 0; font-size: 0.875rem; color: #854d0e;">
          <strong>Note:</strong> The Figma overlay shows the entire switch-list-cell container (node
          236:41353) which contains all switch variants. For pixel-perfect comparison, scroll the
          Design panel below to column 4 (switch column) and compare manually with our
          implementation.
        </p>
      </div>

      <h3 style="margin: 0; font-size: 1.125rem; color: #1e293b;">Our Implementation</h3>

      <div style="display: flex; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #475569;">Unchecked</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <rr-switch size="xs" aria-label="XS unchecked"></rr-switch>
              <span style="font-size: 0.75rem; color: #64748b;">XS</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <rr-switch size="s" aria-label="S unchecked"></rr-switch>
              <span style="font-size: 0.75rem; color: #64748b;">S</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <rr-switch size="m" aria-label="M unchecked"></rr-switch>
              <span style="font-size: 0.75rem; color: #64748b;">M</span>
            </div>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #475569;">Checked</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <rr-switch size="xs" checked aria-label="XS checked"></rr-switch>
              <span style="font-size: 0.75rem; color: #64748b;">XS</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <rr-switch size="s" checked aria-label="S checked"></rr-switch>
              <span style="font-size: 0.75rem; color: #64748b;">S</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <rr-switch size="m" checked aria-label="M checked"></rr-switch>
              <span style="font-size: 0.75rem; color: #64748b;">M</span>
            </div>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #475569;">Disabled</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <rr-switch size="m" disabled aria-label="M disabled unchecked"></rr-switch>
              <span style="font-size: 0.75rem; color: #64748b;">Unchecked</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <rr-switch size="m" checked disabled aria-label="M disabled checked"></rr-switch>
              <span style="font-size: 0.75rem; color: #64748b;">Checked</span>
            </div>
          </div>
        </div>
      </div>

      <h3 style="margin: 1.5rem 0 0 0; font-size: 1.125rem; color: #1e293b;">
        Pixel-Perfect Comparison
      </h3>
      <p style="font-size: 0.875rem; color: #64748b; margin: 0.5rem 0 1rem 0;">
        Our switches (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="236:41353" style="display: inline-block;">
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
          <rr-switch size="s" aria-label="S switch top"></rr-switch>
          <rr-switch size="s" aria-label="S switch center"></rr-switch>
          <rr-switch size="m" aria-label="M switch top"></rr-switch>
          <rr-switch size="m" aria-label="M switch center"></rr-switch>
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
  docs: {
    description: {
      story:
        'Vergelijking met Figma design. Het Figma overlay toont de switch-list-cell container (node 236:41353). Scroll in het Design panel naar kolom 4 voor de switch componenten. Vergelijk visueel met onze implementatie hierboven.',
    },
  },
};
