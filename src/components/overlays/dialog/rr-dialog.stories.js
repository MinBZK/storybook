import { html } from 'lit';
import './rr-dialog.ts';
import '../../actions/button/rr-button.ts';

/**
 * De Dialog component voor modale dialogen met overlay backdrop.
 * Gebruikt het native <dialog> element voor toegankelijkheid.
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
    componentSource: {
      file: 'src/components/overlays/dialog/rr-dialog.ts',
      repository: 'https://github.com/MinBZK/storybook',
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
      <p style="margin: 0;">
        Weet u zeker dat u door wilt gaan met deze actie? Dit kan niet ongedaan worden gemaakt.
      </p>
      <rr-button
        slot="footer"
        variant="accent-filled"
        @click=${() => {
          document.querySelector('#demo-dialog').open = false;
        }}
        >Bevestigen</rr-button
      >
      <rr-button
        slot="footer"
        variant="neutral-tinted"
        @click=${() => {
          document.querySelector('#demo-dialog').open = false;
        }}
        >Annuleren</rr-button
      >
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
        <circle cx="24" cy="24" r="24" fill="#E8F5E9" />
        <path
          d="M20 25l3 3 6-6"
          stroke="#2E7D32"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p style="margin: 0;">Uw wijzigingen zijn succesvol opgeslagen.</p>
      <rr-button
        slot="footer"
        variant="accent-filled"
        @click=${() => {
          document.querySelector('#icon-dialog').open = false;
        }}
        >OK</rr-button
      >
    </rr-dialog>
  `;
};
WithIcon.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Een dialog met een icoon boven de heading, bijvoorbeeld voor een succes- of waarschuwingsbericht.',
    },
  },
};
