import { html } from 'lit';
import './rr-text-field-cell.ts';
import '../text-field/rr-text-field.ts';

/**
 * De Text Field Cell component is een wrapper voor text fields met ondersteuning voor validatie feedback.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1019:3941)
 *
 * ## Gebruik
 * ```html
 * <rr-text-field-cell feedback-text="Dit veld is verplicht">
 *   <rr-text-field validation="invalid"></rr-text-field>
 * </rr-text-field-cell>
 * ```
 */
export default {
  title: 'Components/Inputs/Text Field Cell',
  component: 'rr-text-field-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1019:3941',
    },
    componentSource: {
      file: 'src/components/text-field-cell/rr-text-field-cell.ts',
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
    feedbackText: {
      control: 'text',
      description: 'Feedback text shown when invalid',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
  args: {
    verticalAlignment: 'center',
    feedbackText: '',
  },
};

const Template = ({ verticalAlignment, feedbackText }) => html`
  <rr-text-field-cell
    vertical-alignment=${verticalAlignment}
    feedback-text=${feedbackText}
    style="width: 300px;"
  >
    <rr-text-field
      placeholder="Text field"
      validation=${feedbackText ? 'invalid' : 'neutral'}
    ></rr-text-field>
  </rr-text-field-cell>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {};

// With feedback text
export const WithFeedback = Template.bind({});
WithFeedback.args = {
  feedbackText: 'Dit veld is verplicht',
};

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
      <rr-text-field-cell vertical-alignment="center">
        <rr-text-field placeholder="Text field"></rr-text-field>
      </rr-text-field-cell>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">
        Top aligned
      </label>
      <rr-text-field-cell vertical-alignment="top">
        <rr-text-field placeholder="Text field"></rr-text-field>
      </rr-text-field-cell>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">
        With feedback (invalid)
      </label>
      <rr-text-field-cell feedback-text="Dit veld is verplicht">
        <rr-text-field placeholder="Text field" validation="invalid"></rr-text-field>
      </rr-text-field-cell>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 14px; color: #64748b;">
        Top aligned with feedback
      </label>
      <rr-text-field-cell vertical-alignment="top" feedback-text="Voer een geldig e-mailadres in">
        <rr-text-field placeholder="E-mail" validation="invalid" type="email"></rr-text-field>
      </rr-text-field-cell>
    </div>
  </div>
`;
AllVariants.parameters = {
  controls: { disable: true },
};

// In a form context
export const FormExample = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
    <h3 style="margin: 0; font-family: RijksSansVF, system-ui; font-size: 20px; font-weight: 550;">
      Contactformulier
    </h3>

    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 16px;">Naam *</label>
      <rr-text-field-cell>
        <rr-text-field placeholder="Uw volledige naam" required></rr-text-field>
      </rr-text-field-cell>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 16px;">E-mail *</label>
      <rr-text-field-cell feedback-text="Voer een geldig e-mailadres in">
        <rr-text-field
          placeholder="uw@email.nl"
          type="email"
          validation="invalid"
          value="invalid-email"
          required
        ></rr-text-field>
      </rr-text-field-cell>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <label style="font-family: RijksSansVF, system-ui; font-size: 16px;">Telefoonnummer</label>
      <rr-text-field-cell>
        <rr-text-field placeholder="+31 6 12345678" type="tel"></rr-text-field>
      </rr-text-field-cell>
    </div>
  </div>
`;
FormExample.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Voorbeeld van text field cells in een formulier context met labels en validatie.',
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
        Text Field Cell (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1019:3941" style="display: inline-block;">
        <!--
          Figma text-field-cell component set layout:
          - Hug width
          - 16px padding
          - 16px gap between variants
          - 4 variants: center/top x normal/invalid
          - Each cell is 180px width
        -->
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; background: #ffffff;">
          <rr-text-field-cell vertical-alignment="center" style="width: 180px;">
            <rr-text-field value="Text field"></rr-text-field>
          </rr-text-field-cell>
          <rr-text-field-cell vertical-alignment="top" style="width: 180px;">
            <rr-text-field value="Text field"></rr-text-field>
          </rr-text-field-cell>
          <rr-text-field-cell vertical-alignment="center" feedback-text="Feedback text" style="width: 180px;">
            <rr-text-field value="Text field" validation="invalid"></rr-text-field>
          </rr-text-field-cell>
          <rr-text-field-cell vertical-alignment="top" feedback-text="Feedback text" style="width: 180px;">
            <rr-text-field value="Text field" validation="invalid"></rr-text-field>
          </rr-text-field-cell>
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
