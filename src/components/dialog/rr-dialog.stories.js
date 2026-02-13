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
        <div style="padding: 48px 64px 80px 64px; display: inline-block;">
          <div style="
            background-color: var(--semantics-surfaces-background-color);
            padding: var(--primitives-space-24) var(--primitives-space-16);
            width: 480px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
          ">
          <div style="display: flex; justify-content: center; padding-bottom: 4px;">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M29.1719 43.3203C25.7842 44.2243 22.2079 44.2248 18.8203 43.3203L19.8516 39.4609C22.5634 40.1848 25.4327 40.1849 28.1445 39.4609L29.1719 43.3203Z" fill="#333A45"/>
              <path d="M10.1387 31.998C11.5443 34.4275 13.5725 36.4557 16.002 37.8613L14 41.3184C10.965 39.5621 8.43557 37.0333 6.67969 33.998L10.1387 31.998Z" fill="#333A45"/>
              <path d="M41.3184 33.998C39.5622 37.0334 37.0334 39.5622 33.998 41.3184L31.998 37.8613C34.4275 36.4557 36.4557 34.4275 37.8613 31.998L41.3184 33.998Z" fill="#333A45"/>
              <path d="M8.54102 19.8555C8.18892 21.1729 8 22.5613 8 24C8 25.4387 8.18892 26.8271 8.54102 28.1445L4.67969 29.1758C4.23848 27.5246 4 25.7902 4 24C4 22.2091 4.23816 20.4739 4.67969 18.8223L8.54102 19.8555Z" fill="#333A45"/>
              <path d="M43.3184 18.8223C43.76 20.4741 44 22.2089 44 24C44 25.7904 43.7597 27.5245 43.3184 29.1758L41.3906 28.6621L39.459 28.1445C39.8111 26.8271 40 25.4387 40 24C40 22.5613 39.8111 21.1729 39.459 19.8555L43.3184 18.8223Z" fill="#333A45"/>
              <path d="M16.002 10.1387C13.5725 11.5443 11.5443 13.5725 10.1387 16.002L6.67969 14C8.4357 10.9651 10.9651 8.4357 14 6.67969L16.002 10.1387Z" fill="#333A45"/>
              <path d="M33.998 6.67969C37.0333 8.43557 39.5621 10.965 41.3184 14L37.8613 16.002C36.4557 13.5725 34.4275 11.5443 31.998 10.1387L33.998 6.67969Z" fill="#333A45"/>
              <path d="M24 4C25.7902 4 27.5246 4.23848 29.1758 4.67969L28.6621 6.60938L28.6602 6.60742L28.1445 8.54102C26.8271 8.18892 25.4387 8 24 8C22.5613 8 21.1729 8.18892 19.8555 8.54102L18.8223 4.67969C20.4739 4.23816 22.2091 4 24 4Z" fill="#333A45"/>
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
