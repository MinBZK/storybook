import { html } from 'lit';
import './rr-checkbox.ts';

/**
 * De Checkbox component stelt gebruikers in staat om een of meerdere opties te selecteren.
 *
 * ## Gebruik
 * ```html
 * <rr-checkbox>Label</rr-checkbox>
 * ```
 */
export default {
  title: 'Components/Inputs/Checkbox',
  component: 'rr-checkbox',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/inputs/checkbox/rr-checkbox.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state',
      table: {
        defaultValue: { summary: false },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (partially checked)',
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
    value: {
      control: 'text',
      description: 'Value for form submission',
      table: {
        defaultValue: { summary: 'on' },
      },
    },
    name: {
      control: 'text',
      description: 'Name for form submission',
    },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    value: 'on',
    name: '',
  },
};

const Template = ({
  checked,
  indeterminate,
  disabled,
  value,
  name,
  'aria-label': ariaLabel,
}) => html`
  <rr-checkbox
    ?checked=${checked}
    ?indeterminate=${indeterminate}
    ?disabled=${disabled}
    value=${value}
    name=${name}
    aria-label=${ariaLabel || 'Checkbox'}
  ></rr-checkbox>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {};

// States
export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  indeterminate: true,
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
  <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
      <div style="font-size: 14px; color: #64748b;">Unchecked</div>
      <rr-checkbox aria-label="Unchecked checkbox"></rr-checkbox>
    </div>
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
      <div style="font-size: 14px; color: #64748b;">Checked</div>
      <rr-checkbox checked aria-label="Checked checkbox"></rr-checkbox>
    </div>
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
      <div style="font-size: 14px; color: #64748b;">Indeterminate</div>
      <rr-checkbox indeterminate aria-label="Indeterminate checkbox"></rr-checkbox>
    </div>
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
      <div style="font-size: 14px; color: #64748b;">Disabled</div>
      <rr-checkbox disabled aria-label="Disabled checkbox"></rr-checkbox>
    </div>
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
      <div style="font-size: 14px; color: #64748b;">Checked Disabled</div>
      <rr-checkbox checked disabled aria-label="Checked disabled checkbox"></rr-checkbox>
    </div>
  </div>
`;
AllStates.parameters = {
  controls: { disable: true },
};

// With labels
export const WithLabel = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
      <rr-checkbox aria-label="Ik ga akkoord met de voorwaarden"></rr-checkbox>
      <span style="font-family: RijksSansVF, system-ui; font-size: 18px;"
        >Ik ga akkoord met de voorwaarden</span
      >
    </label>
    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
      <rr-checkbox checked aria-label="Ik wil updates ontvangen per e-mail"></rr-checkbox>
      <span style="font-family: RijksSansVF, system-ui; font-size: 18px;"
        >Ik wil updates ontvangen per e-mail</span
      >
    </label>
    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
      <rr-checkbox indeterminate aria-label="Selecteer alle opties (3 van 5)"></rr-checkbox>
      <span style="font-family: RijksSansVF, system-ui; font-size: 18px;"
        >Selecteer alle opties (3 van 5)</span
      >
    </label>
    <label style="display: flex; align-items: center; gap: 0.75rem; cursor: not-allowed;">
      <rr-checkbox disabled aria-label="Deze optie is niet beschikbaar"></rr-checkbox>
      <span style="font-family: RijksSansVF, system-ui; font-size: 18px; opacity: 0.38;"
        >Deze optie is niet beschikbaar</span
      >
    </label>
  </div>
`;
WithLabel.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Checkboxes worden meestal gebruikt met labels. Gebruik een `<label>` element om de checkbox en tekst te groeperen.',
    },
  },
};

// Interactive example
export const InteractiveExample = () => {
  const handleChange = (e) => {
    console.log('Checkbox changed:', {
      checked: e.target.checked,
      value: e.target.value,
      name: e.target.name,
    });
  };

  return html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <h3
        style="margin: 0; font-family: RijksSansVF, system-ui; font-size: 20px; font-weight: 550;"
      >
        Selecteer uw voorkeuren
      </h3>

      <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
        <rr-checkbox
          @change=${handleChange}
          value="nieuwsbrief"
          name="voorkeuren"
          aria-label="Nieuwsbrief ontvangen"
        ></rr-checkbox>
        <span style="font-family: RijksSansVF, system-ui; font-size: 18px;"
          >Nieuwsbrief ontvangen</span
        >
      </label>

      <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
        <rr-checkbox
          @change=${handleChange}
          value="updates"
          name="voorkeuren"
          aria-label="Product updates"
        ></rr-checkbox>
        <span style="font-family: RijksSansVF, system-ui; font-size: 18px;">Product updates</span>
      </label>

      <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
        <rr-checkbox
          @change=${handleChange}
          value="marketing"
          name="voorkeuren"
          aria-label="Marketing communicatie"
        ></rr-checkbox>
        <span style="font-family: RijksSansVF, system-ui; font-size: 18px;"
          >Marketing communicatie</span
        >
      </label>

      <div style="margin-top: 1rem; padding: 1rem; background-color: #f1f5f9; border-radius: 5px;">
        <p style="margin: 0; font-family: RijksSansVF, system-ui; font-size: 14px; color: #475569;">
          Tip: Open de browser console om de change events te zien
        </p>
      </div>
    </div>
  `;
};
InteractiveExample.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Een interactief voorbeeld met meerdere checkboxes. De component triggert een `change` event wanneer de status verandert.',
    },
  },
};

// State matrix
export const StateMatrix = () => html`
  <table style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Unchecked
        </th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Checked
        </th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Indeterminate
        </th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Disabled
        </th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Checked Disabled
        </th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">
          Indeterminate Disabled
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-checkbox aria-label="Unchecked"></rr-checkbox>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-checkbox checked aria-label="Checked"></rr-checkbox>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-checkbox indeterminate aria-label="Indeterminate"></rr-checkbox>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-checkbox disabled aria-label="Disabled"></rr-checkbox>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-checkbox checked disabled aria-label="Checked disabled"></rr-checkbox>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-checkbox indeterminate disabled aria-label="Indeterminate disabled"></rr-checkbox>
        </td>
      </tr>
    </tbody>
  </table>
`;
StateMatrix.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Overzicht van alle checkbox states.',
    },
  },
};
