import { html } from 'lit';
import './rr-dialog.ts';
import '../button/rr-button.ts';

/**
 * De Dialog component voor modale dialogen met overlay backdrop.
 * Gebruikt het native <dialog> element voor toegankelijkheid.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1340-4344)
 *
 * ## Gebruik
 * ```html
 * <rr-dialog open heading="Bevestiging">
 *   <p>Weet u het zeker?</p>
 *   <div slot="footer">
 *     <rr-button variant="accent-filled">Bevestigen</rr-button>
 *   </div>
 * </rr-dialog>
 * ```
 */
export default {
  title: 'Components/Overlays/Dialog',
  component: 'rr-dialog',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1340-4344',
    },
    componentSource: {
      file: 'src/components/dialog/rr-dialog.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
      table: {
        defaultValue: { summary: false },
      },
    },
    heading: {
      control: 'text',
      description: 'Dialog heading',
    },
  },
  args: {
    open: false,
    heading: 'Dialog titel',
  },
};

// Default story with trigger button
export const Default = () => {
  const openDialog = () => {
    const dialog = document.querySelector('#demo-dialog');
    if (dialog) dialog.open = true;
  };

  return html`
    <rr-button variant="accent-filled" @click=${openDialog}>Open Dialog</rr-button>
    <rr-dialog id="demo-dialog" heading="Bevestiging vereist">
      <p style="margin: 0;">Weet u zeker dat u door wilt gaan met deze actie? Dit kan niet ongedaan worden gemaakt.</p>
      <div slot="footer">
        <rr-button variant="neutral-tinted" @click=${() => { document.querySelector('#demo-dialog').open = false; }}>Annuleren</rr-button>
        <rr-button variant="accent-filled" @click=${() => { document.querySelector('#demo-dialog').open = false; }}>Bevestigen</rr-button>
      </div>
    </rr-dialog>
  `;
};
Default.parameters = {
  controls: { disable: true },
};

// With icon story
export const WithIcon = () => {
  const openDialog = () => {
    const dialog = document.querySelector('#icon-dialog');
    if (dialog) dialog.open = true;
  };

  return html`
    <rr-button variant="accent-filled" @click=${openDialog}>Open Dialog met Icoon</rr-button>
    <rr-dialog id="icon-dialog" heading="Succesvol opgeslagen">
      <svg slot="icon" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#E8F5E9"/>
        <path d="M20 25l3 3 6-6" stroke="#2E7D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p style="margin: 0;">Uw wijzigingen zijn succesvol opgeslagen.</p>
      <div slot="footer">
        <rr-button variant="accent-filled" @click=${() => { document.querySelector('#icon-dialog').open = false; }}>OK</rr-button>
      </div>
    </rr-dialog>
  `;
};
WithIcon.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Een dialog met een icoon boven de heading, bijvoorbeeld voor een succes- of waarschuwingsbericht.',
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
        Dialog (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1340-4344" style="display: inline-block;">
        <div style="padding: 24px; background: white; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); max-width: 480px; text-align: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <h2 style="margin: 0; font-size: 1rem; font-weight: 700;">Dialog Heading</h2>
            <p style="margin: 0; font-size: 0.875rem; color: #333;">Dialog body content goes here. This is an example of how the dialog looks when rendered.</p>
            <div style="display: flex; justify-content: center; gap: 8px; padding-top: 12px;">
              <rr-button variant="neutral-tinted">Annuleren</rr-button>
              <rr-button variant="accent-filled">Bevestigen</rr-button>
            </div>
          </div>
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
