import { html } from 'lit';
import './rr-search-field.ts';

/**
 * De Search Field component is een zoekveld met zoekicoon.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=243:3235)
 *
 * ## Gebruik
 * ```html
 * <rr-search-field placeholder="Zoeken..."></rr-search-field>
 * ```
 */
export default {
  title: 'Components/Inputs/Search Field',
  component: 'rr-search-field',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=243:3235',
    },
    componentSource: {
      file: 'src/components/inputs/search-field/rr-search-field.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Search value',
      table: {
        defaultValue: { summary: '' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        defaultValue: { summary: 'Search' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Field size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
    name: {
      control: 'text',
      description: 'Input name for form submission',
    },
  },
  args: {
    value: '',
    placeholder: 'Search',
    size: 'md',
    disabled: false,
    name: '',
  },
};

const Template = ({ value, placeholder, size, disabled, name }) => html`
  <rr-search-field
    value=${value}
    placeholder=${placeholder}
    size=${size}
    ?disabled=${disabled}
    name=${name}
  ></rr-search-field>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {};

// With value
export const WithValue = Template.bind({});
WithValue.args = {
  value: 'Example search',
};

// Size small
export const Small = Template.bind({});
Small.args = {
  size: 'sm',
};

// Disabled
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

// All sizes overview
export const AllSizes = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Medium (default)</label>
      <rr-search-field size="md" placeholder="Search"></rr-search-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Small</label>
      <rr-search-field size="sm" placeholder="Search"></rr-search-field>
    </div>
  </div>
`;
AllSizes.parameters = {
  controls: { disable: true },
};

// All states overview
export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Default</label>
      <rr-search-field placeholder="Search"></rr-search-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">With value</label>
      <rr-search-field value="Example search"></rr-search-field>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">Disabled</label>
      <rr-search-field disabled placeholder="Search"></rr-search-field>
    </div>
  </div>
`;
AllStates.parameters = {
  controls: { disable: true },
};

// Interactive example
export const InteractiveExample = () => {
  const handleInput = (e) => {
    console.log('Input:', e.detail.value);
  };

  const handleSearch = (e) => {
    console.log('Search submitted:', e.detail.value);
    alert(`Searching for: ${e.detail.value}`);
  };

  return html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <h3 style="margin: 0; font-family: RijksSansVF, system-ui; font-size: 20px; font-weight: 550;">
        Zoeken
      </h3>

      <rr-search-field
        @input=${handleInput}
        @search=${handleSearch}
        placeholder="Zoek documenten..."
        name="search"
      ></rr-search-field>

      <div style="padding: 1rem; background-color: #f1f5f9; border-radius: 5px;">
        <p style="margin: 0; font-family: RijksSansVF, system-ui; font-size: 14px; color: #475569;">
          Tip: Druk op Enter om te zoeken. Open de console voor events.
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
        'Een interactief voorbeeld met een search field. De component triggert `input`, `change`, en `search` (bij Enter) events.',
    },
  },
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Search Field (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="243:3235" style="display: inline-block;">
        <!--
          Figma search-field component set layout:
          - 456px width
          - 16px padding
          - 16px gap between variants
          - 4 variants: md enabled, md disabled, sm enabled, sm disabled
        -->
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 424px; background: #ffffff;">
          <rr-search-field size="md" placeholder="Search"></rr-search-field>
          <rr-search-field size="md" placeholder="Search" disabled></rr-search-field>
          <rr-search-field size="sm" placeholder="Search"></rr-search-field>
          <rr-search-field size="sm" placeholder="Search" disabled></rr-search-field>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = 'Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = {
  controls: { disable: true },
};
