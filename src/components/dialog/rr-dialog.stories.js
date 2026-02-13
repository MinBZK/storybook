import { html } from 'lit';
import './rr-dialog.ts';
import '../button/rr-button.ts';

/**
 * De Dialog component voor modale dialogen met overlay backdrop.
 * Gebruikt het native <dialog> element voor toegankelijkheid.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1506-5969)
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
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1506-5969',
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
      <rr-button slot="footer" variant="accent-filled" @click=${() => { document.querySelector('#demo-dialog').open = false; }}>Bevestigen</rr-button>
      <rr-button slot="footer" variant="neutral-tinted" @click=${() => { document.querySelector('#demo-dialog').open = false; }}>Annuleren</rr-button>
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
      <rr-button slot="footer" variant="accent-filled" @click=${() => { document.querySelector('#icon-dialog').open = false; }}>OK</rr-button>
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
      <ftl-holster node="1506-5969" style="display: inline-block;">
        <div style="padding: 40px 56px 72px 66px; display: inline-block;">
          <div style="
            background-color: var(--semantics-surfaces-background-color);
            padding: var(--primitives-space-24) var(--primitives-space-16);
            width: 480px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: var(--primitives-space-8);
            font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
          ">
          <div style="display: flex; justify-content: center; padding-bottom: 4px;">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 4"/>
            </svg>
          </div>
          <div style="text-align: center; font: var(--semantics-content-body-md-bold-tight); color: var(--semantics-content-color);">Modal dialog</div>
          <div style="text-align: center; font: var(--semantics-content-body-sm-regular-tight); color: var(--semantics-content-color);">Supporting text</div>
          <div style="display: flex; flex-direction: column; gap: var(--primitives-space-8); padding-top: var(--primitives-space-12);">
            <rr-button variant="accent-filled" style="display: block;">Button</rr-button>
            <rr-button variant="neutral-tinted" style="display: block;">Button</rr-button>
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
