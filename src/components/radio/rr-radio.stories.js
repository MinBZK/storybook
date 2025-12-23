import { html } from 'lit';
import './rr-radio.js';

/**
 * De Radio Button component wordt gebruikt voor het maken van exclusieve keuzes binnen een groep opties.
 * Slechts één radio button binnen een groep (met dezelfde `name`) kan tegelijkertijd geselecteerd zijn.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-41398)
 *
 * ## Gebruik
 * Voor optimale toegankelijkheid volgens WAI-ARIA, gebruik een container met `role="radiogroup"`:
 * ```html
 * <div role="radiogroup" aria-labelledby="group-label">
 *   <div id="group-label">Kies een optie</div>
 *   <rr-radio name="option" value="1" checked>Optie 1</rr-radio>
 *   <rr-radio name="option" value="2">Optie 2</rr-radio>
 * </div>
 * ```
 *
 * Of gebruik een HTML `<fieldset>` voor formulieren:
 * ```html
 * <fieldset>
 *   <legend>Kies een optie</legend>
 *   <rr-radio name="option" value="1" checked>Optie 1</rr-radio>
 *   <rr-radio name="option" value="2">Optie 2</rr-radio>
 * </fieldset>
 * ```
 */
export default {
  title: 'Components/Radio Button',
  component: 'rr-radio',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=236-41398',
    },
    componentSource: {
      file: 'src/components/radio/rr-radio.js',
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
      description: 'Radio button size',
      table: {
        defaultValue: { summary: 'm' },
      },
    },
    name: {
      control: 'text',
      description: 'Form control name (for radio groups)',
    },
    value: {
      control: 'text',
      description: 'Form control value',
    },
    label: {
      control: 'text',
      description: 'Label text (for demo purposes)',
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: 'm',
    name: 'demo-radio',
    value: 'option1',
    label: 'Radio Option',
  },
};

const Template = ({ checked, disabled, size, name, value, label }) => html`
  <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
    <rr-radio
      ?checked=${checked}
      ?disabled=${disabled}
      size=${size}
      name=${name}
      value=${value}
      aria-label=${label}
    ></rr-radio>
    <span
      style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
    >
      ${label}
    </span>
  </label>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
  label: 'Standaard optie',
};

// States
export const Checked = Template.bind({});
Checked.args = {
  label: 'Geselecteerde optie',
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Uitgeschakelde optie',
  disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  label: 'Uitgeschakeld en geselecteerd',
  disabled: true,
  checked: true,
};

// Sizes
export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  label: 'Extra klein',
  size: 'xs',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Klein',
  size: 's',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Medium',
  size: 'm',
};

// Radio Group Example (with proper WAI-ARIA radiogroup)
export const RadioGroup = () => html`
  <div role="radiogroup" aria-labelledby="group-label-1" style="padding: 0; margin: 0;">
    <div
      id="group-label-1"
      style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 18px; font-weight: 600; margin-bottom: 16px;"
    >
      Kies een optie
    </div>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
        <rr-radio name="group1" value="option1" checked aria-label="Optie 1"></rr-radio>
        <span
          style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
        >
          Optie 1
        </span>
      </label>
      <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
        <rr-radio name="group1" value="option2" aria-label="Optie 2"></rr-radio>
        <span
          style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
        >
          Optie 2
        </span>
      </label>
      <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
        <rr-radio name="group1" value="option3" aria-label="Optie 3"></rr-radio>
        <span
          style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
        >
          Optie 3
        </span>
      </label>
      <label
        style="display: flex; align-items: center; gap: 12px; cursor: not-allowed; opacity: 0.5;"
      >
        <rr-radio
          name="group1"
          value="option4"
          disabled
          aria-label="Optie 4 (uitgeschakeld)"
        ></rr-radio>
        <span
          style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
        >
          Optie 4 (uitgeschakeld)
        </span>
      </label>
    </div>
  </div>
`;
RadioGroup.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Een groep radio buttons waarbij slechts één optie geselecteerd kan zijn. Let op: de radio buttons zijn omwikkeld in een container met role="radiogroup" en aria-labelledby voor optimale toegankelijkheid volgens WAI-ARIA.',
    },
  },
};

// All sizes overview
export const AllSizes = () => html`
  <div style="display: flex; gap: 2rem; align-items: center;">
    <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
      <rr-radio name="sizes" value="xs" size="xs" checked aria-label="Extra Small (XS)"></rr-radio>
      <span
        style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 14px;"
      >
        Extra Small (XS)
      </span>
    </label>
    <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
      <rr-radio name="sizes" value="s" size="s" aria-label="Small (S)"></rr-radio>
      <span
        style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
      >
        Small (S)
      </span>
    </label>
    <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
      <rr-radio name="sizes" value="m" size="m" aria-label="Medium (M)"></rr-radio>
      <span
        style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 18px;"
      >
        Medium (M)
      </span>
    </label>
  </div>
`;
AllSizes.parameters = {
  controls: { disable: true },
};

// State Matrix
export const StateMatrix = () => html`
  <table style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr>
        <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">State</th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">XS</th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">S</th>
        <th style="text-align: center; padding: 0.75rem; border-bottom: 2px solid #e2e8f0;">M</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">Unchecked</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-radio name="unchecked" value="xs" size="xs" aria-label="Unchecked XS"></rr-radio>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-radio name="unchecked" value="s" size="s" aria-label="Unchecked S"></rr-radio>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-radio name="unchecked" value="m" size="m" aria-label="Unchecked M"></rr-radio>
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">Checked</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-radio name="checked" value="xs" size="xs" checked aria-label="Checked XS"></rr-radio>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-radio name="checked" value="s" size="s" checked aria-label="Checked S"></rr-radio>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-radio name="checked" value="m" size="m" checked aria-label="Checked M"></rr-radio>
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">Disabled</td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-radio
            name="disabled"
            value="xs"
            size="xs"
            disabled
            aria-label="Disabled XS"
          ></rr-radio>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-radio name="disabled" value="s" size="s" disabled aria-label="Disabled S"></rr-radio>
        </td>
        <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <rr-radio name="disabled" value="m" size="m" disabled aria-label="Disabled M"></rr-radio>
        </td>
      </tr>
      <tr>
        <td style="padding: 0.75rem;">Disabled Checked</td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-radio
            name="disabled-checked"
            value="xs"
            size="xs"
            disabled
            checked
            aria-label="Disabled checked XS"
          ></rr-radio>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-radio
            name="disabled-checked"
            value="s"
            size="s"
            disabled
            checked
            aria-label="Disabled checked S"
          ></rr-radio>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <rr-radio
            name="disabled-checked"
            value="m"
            size="m"
            disabled
            checked
            aria-label="Disabled checked M"
          ></rr-radio>
        </td>
      </tr>
    </tbody>
  </table>
`;
StateMatrix.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Overzicht van alle states (unchecked, checked, disabled, disabled checked) voor alle beschikbare groottes.',
    },
  },
};

// Multiple groups
export const MultipleGroups = () => html`
  <div style="display: flex; gap: 3rem;">
    <fieldset style="border: none; padding: 0; margin: 0;">
      <legend
        style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px; font-weight: 600; margin-bottom: 12px;"
      >
        Groep 1: Voorkeur
      </legend>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
          <rr-radio name="preference" value="yes" checked aria-label="Ja"></rr-radio>
          <span
            style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
          >
            Ja
          </span>
        </label>
        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
          <rr-radio name="preference" value="no" aria-label="Nee"></rr-radio>
          <span
            style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
          >
            Nee
          </span>
        </label>
      </div>
    </fieldset>

    <fieldset style="border: none; padding: 0; margin: 0;">
      <legend
        style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px; font-weight: 600; margin-bottom: 12px;"
      >
        Groep 2: Prioriteit
      </legend>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
          <rr-radio name="priority" value="high" aria-label="Hoog"></rr-radio>
          <span
            style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
          >
            Hoog
          </span>
        </label>
        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
          <rr-radio name="priority" value="medium" checked aria-label="Gemiddeld"></rr-radio>
          <span
            style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
          >
            Gemiddeld
          </span>
        </label>
        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
          <rr-radio name="priority" value="low" aria-label="Laag"></rr-radio>
          <span
            style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
          >
            Laag
          </span>
        </label>
      </div>
    </fieldset>
  </div>
`;
MultipleGroups.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Meerdere onafhankelijke radio button groepen. Elke groep heeft een unieke `name` attribute, waardoor selecties binnen groepen onafhankelijk zijn.',
    },
  },
};

// Interactive form example
export const FormIntegration = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    alert(`Geselecteerde waarden:\n${JSON.stringify(data, null, 2)}`);
  };

  return html`
    <form @submit=${handleSubmit} style="max-width: 400px;">
      <fieldset style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 0;">
        <legend
          style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 18px; font-weight: 600; padding: 0 8px;"
        >
          Vragenlijst
        </legend>

        <div style="margin-bottom: 20px;">
          <div
            style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px; font-weight: 600; margin-bottom: 12px;"
          >
            1. Hoe tevreden bent u?
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <rr-radio
                name="satisfaction"
                value="very-satisfied"
                aria-label="Zeer tevreden"
              ></rr-radio>
              <span
                style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
              >
                Zeer tevreden
              </span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <rr-radio
                name="satisfaction"
                value="satisfied"
                checked
                aria-label="Tevreden"
              ></rr-radio>
              <span
                style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
              >
                Tevreden
              </span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <rr-radio name="satisfaction" value="neutral" aria-label="Neutraal"></rr-radio>
              <span
                style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
              >
                Neutraal
              </span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <rr-radio name="satisfaction" value="unsatisfied" aria-label="Ontevreden"></rr-radio>
              <span
                style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
              >
                Ontevreden
              </span>
            </label>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <div
            style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px; font-weight: 600; margin-bottom: 12px;"
          >
            2. Zou u dit aanbevelen?
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <rr-radio name="recommend" value="yes" aria-label="Ja"></rr-radio>
              <span
                style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
              >
                Ja
              </span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <rr-radio name="recommend" value="no" aria-label="Nee"></rr-radio>
              <span
                style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
              >
                Nee
              </span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
              <rr-radio name="recommend" value="maybe" checked aria-label="Misschien"></rr-radio>
              <span
                style="font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui); font-size: 16px;"
              >
                Misschien
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          style="
          font-family: var(--rr-font-family-sans, 'RijksoverheidSans', system-ui);
          font-size: 16px;
          font-weight: 600;
          padding: 10px 20px;
          background: #154273;
          color: white;
          border: none;
          border-radius: 7px;
          cursor: pointer;
          width: 100%;
        "
        >
          Verstuur
        </button>
      </fieldset>
    </form>
  `;
};
FormIntegration.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Voorbeeld van radio buttons geïntegreerd in een formulier. Klik op "Verstuur" om de geselecteerde waarden te zien.',
    },
  },
};
