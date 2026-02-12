import { html } from 'lit';
import './rr-alert.ts';

/**
 * De Alert component voor het tonen van belangrijke meldingen met variant-specifieke styling.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1340-4678)
 *
 * ## Gebruik
 * ```html
 * <rr-alert variant="info" heading="Informatie">
 *   Dit is een informatief bericht.
 * </rr-alert>
 * ```
 */
export default {
  title: 'Components/Feedback/Alert',
  component: 'rr-alert',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1340-4678',
    },
    componentSource: {
      file: 'src/components/alert/rr-alert.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Alert variant',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    heading: {
      control: 'text',
      description: 'Alert heading',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
      table: {
        defaultValue: { summary: false },
      },
    },
    content: {
      control: 'text',
      description: 'Alert body text',
    },
  },
  args: {
    variant: 'info',
    heading: 'Informatie',
    dismissible: false,
    content: 'Dit is een informatief bericht voor de gebruiker.',
  },
};

const Template = ({ variant, heading, dismissible, content }) => html`
  <rr-alert variant=${variant} heading=${heading} ?dismissible=${dismissible}>
    ${content}
  </rr-alert>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {};

// Success variant
export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  heading: 'Gelukt',
  content: 'Uw wijzigingen zijn succesvol opgeslagen.',
};

// Warning variant
export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  heading: 'Waarschuwing',
  content: 'Uw sessie verloopt over 5 minuten. Sla uw werk op.',
};

// Danger variant
export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  heading: 'Fout',
  content: 'Er is een fout opgetreden bij het opslaan. Probeer het opnieuw.',
};

// Dismissible
export const Dismissible = Template.bind({});
Dismissible.args = {
  variant: 'info',
  heading: 'Tip',
  content: 'U kunt deze melding sluiten door op het kruisje te klikken.',
  dismissible: true,
};

// All variants overview
export const AllVariants = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <rr-alert variant="info" heading="Informatie">
      Uw aanvraag wordt verwerkt. Dit kan enkele minuten duren.
    </rr-alert>
    <rr-alert variant="success" heading="Gelukt">
      Uw wijzigingen zijn succesvol opgeslagen.
    </rr-alert>
    <rr-alert variant="warning" heading="Waarschuwing">
      Uw sessie verloopt over 5 minuten. Sla uw werk op.
    </rr-alert>
    <rr-alert variant="danger" heading="Fout">
      Er is een fout opgetreden bij het opslaan. Probeer het opnieuw.
    </rr-alert>
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
        Alert (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1340-4678" style="display: inline-block;">
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 480px;">
          <rr-alert variant="info" heading="Informatie">Dit is een informatief bericht.</rr-alert>
          <rr-alert variant="success" heading="Gelukt">Actie succesvol uitgevoerd.</rr-alert>
          <rr-alert variant="warning" heading="Waarschuwing">Let op deze waarschuwing.</rr-alert>
          <rr-alert variant="danger" heading="Fout">Er is een fout opgetreden.</rr-alert>
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
