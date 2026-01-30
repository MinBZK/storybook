import { html } from 'lit';
import './rr-form-field.ts';
import '../text-field/rr-text-field.ts';

/**
 * De Form Field component is een generieke wrapper voor formuliervelden met label en beschrijving.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=376:2395)
 */
export default {
  title: 'Components/Form Fields/Form Field',
  component: 'rr-form-field',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=376:2395',
    },
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    required: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    label: 'Label',
    description: '',
    required: false,
    error: '',
  },
};

const Template = ({ label, description, required, error }) => html`
  <rr-form-field
    label=${label}
    description=${description}
    ?required=${required}
    error=${error}
    style="max-width: 400px;"
  >
    <rr-text-field placeholder="Enter value"></rr-text-field>
  </rr-form-field>
`;

export const Default = Template.bind({});

export const WithDescription = Template.bind({});
WithDescription.args = {
  label: 'Email address',
  description: 'We will never share your email with anyone.',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Full name',
  required: true,
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Email',
  error: 'Please enter a valid email address',
  required: true,
};

export const CompleteForm = () => html`
  <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
    <rr-form-field label="Full name" required>
      <rr-text-field placeholder="John Doe"></rr-text-field>
    </rr-form-field>

    <rr-form-field label="Email address" description="We'll send a confirmation email" required>
      <rr-text-field type="email" placeholder="john@example.com"></rr-text-field>
    </rr-form-field>

    <rr-form-field label="Phone number" error="Please enter a valid phone number">
      <rr-text-field type="tel" placeholder="+31 6 12345678" validation="invalid"></rr-text-field>
    </rr-form-field>

    <rr-form-field label="Comments" description="Optional">
      <rr-text-field placeholder="Any additional comments..."></rr-text-field>
    </rr-form-field>
  </div>
`;

const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <ftl-holster node="376:2395" style="display: inline-block;">
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 363px; background: #ffffff;">
        <rr-form-field label="Form field">
          <rr-text-field placeholder="Value"></rr-text-field>
        </rr-form-field>
      </div>
    </ftl-holster>
  </ftl-belt>
`;
FigmaComparison.tags = ['!autodocs', 'figma'];
