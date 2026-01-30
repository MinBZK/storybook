import { html } from 'lit';
import './rr-drop-down-field-cell.ts';
import '../drop-down-field/rr-drop-down-field.ts';

/**
 * De Drop Down Field Cell component is een wrapper voor drop-down fields met uitlijningsopties.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1014:3843)
 *
 * ## Gebruik
 * ```html
 * <rr-drop-down-field-cell>
 *   <rr-drop-down-field .options=${options}></rr-drop-down-field>
 * </rr-drop-down-field-cell>
 * ```
 */
export default {
  title: 'Components/Form Fields/Drop Down Field Cell',
  component: 'rr-drop-down-field-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1014:3843',
    },
    componentSource: {
      file: 'src/components/drop-down-field-cell/rr-drop-down-field-cell.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    verticalAlignment: {
      control: 'select',
      options: ['center', 'top'],
      description: 'Vertical alignment within the cell',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
  },
  args: {
    verticalAlignment: 'center',
  },
};

const sampleOptions = [
  { value: 'Drop down field', label: 'Drop down field' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const Template = ({ verticalAlignment }) => html`
  <rr-drop-down-field-cell
    vertical-alignment=${verticalAlignment}
    style="width: 300px;"
  >
    <rr-drop-down-field
      value="Drop down field"
      .options=${sampleOptions}
    ></rr-drop-down-field>
  </rr-drop-down-field-cell>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {};

// Vertical alignment top
export const TopAligned = Template.bind({});
TopAligned.args = {
  verticalAlignment: 'top',
};

// All variants
export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">
        Center aligned (default)
      </label>
      <rr-drop-down-field-cell vertical-alignment="center">
        <rr-drop-down-field
          value="Drop down field"
          .options=${sampleOptions}
        ></rr-drop-down-field>
      </rr-drop-down-field-cell>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">
        Top aligned
      </label>
      <rr-drop-down-field-cell vertical-alignment="top">
        <rr-drop-down-field
          value="Drop down field"
          .options=${sampleOptions}
        ></rr-drop-down-field>
      </rr-drop-down-field-cell>
    </div>
  </div>
`;
AllVariants.parameters = {
  controls: { disable: true },
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Drop Down Field Cell (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1014:3843" style="display: inline-block;">
        <!--
          Figma drop-down-field-cell component set layout:
          - 212px width
          - 16px padding
          - 16px gap between variants
          - 2 variants: center, top
        -->
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 180px; background: #ffffff;">
          <rr-drop-down-field-cell vertical-alignment="center">
            <rr-drop-down-field
              value="Drop down field"
              .options=${[{ value: 'Drop down field', label: 'Drop down field' }]}
            ></rr-drop-down-field>
          </rr-drop-down-field-cell>
          <rr-drop-down-field-cell vertical-alignment="top">
            <rr-drop-down-field
              value="Drop down field"
              .options=${[{ value: 'Drop down field', label: 'Drop down field' }]}
            ></rr-drop-down-field>
          </rr-drop-down-field-cell>
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
