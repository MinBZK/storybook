import { html } from 'lit';
import './rr-drop-down-field-cell.ts';
import '../../../inputs/drop-down-field/rr-drop-down-field.ts';

/**
 * De Drop Down Field Cell component is een wrapper voor drop-down fields met uitlijningsopties.
 *
 * ## Gebruik
 * ```html
 * <rr-drop-down-field-cell>
 *   <rr-drop-down-field .options=${options}></rr-drop-down-field>
 * </rr-drop-down-field-cell>
 * ```
 */
export default {
  title: 'Components/Lists & Menus/Cells/Drop Down Field Cell',
  component: 'rr-drop-down-field-cell',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/lists/drop-down-field-cell/rr-drop-down-field-cell.ts',
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
