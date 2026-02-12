import { html } from 'lit';
import './rr-window.ts';
import '../button/rr-button.ts';

/**
 * De Window component als standalone venster paneel zonder overlay.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1261-3627)
 *
 * ## Gebruik
 * ```html
 * <rr-window heading="Venster titel">
 *   <p>Venster inhoud</p>
 *   <div slot="footer">
 *     <rr-button variant="accent-filled">Opslaan</rr-button>
 *   </div>
 * </rr-window>
 * ```
 */
export default {
  title: 'Components/Overlays/Window',
  component: 'rr-window',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1261-3627',
    },
    componentSource: {
      file: 'src/components/window/rr-window.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'Window heading',
    },
    hasCloseButton: {
      control: 'boolean',
      description: 'Whether to show a close button',
      table: {
        defaultValue: { summary: true },
      },
    },
  },
  args: {
    heading: 'Venster titel',
    hasCloseButton: true,
  },
};

// Default window with footer
export const Default = () => html`
  <div style="max-width: 480px;">
    <rr-window heading="Instellingen">
      <p style="margin: 0;">Dit is de inhoud van het venster. Hier kan elke vorm van content worden geplaatst.</p>
      <div slot="footer">
        <rr-button variant="neutral-tinted">Annuleren</rr-button>
        <rr-button variant="accent-filled">Opslaan</rr-button>
      </div>
    </rr-window>
  </div>
`;
Default.parameters = {
  controls: { disable: true },
};

// With footer
export const WithFooter = () => html`
  <div style="max-width: 480px;">
    <rr-window heading="Bevestiging">
      <p style="margin: 0;">Wilt u deze actie uitvoeren? Dit kan niet ongedaan worden gemaakt.</p>
      <div slot="footer">
        <rr-button variant="neutral-tinted">Annuleren</rr-button>
        <rr-button variant="accent-filled">Bevestigen</rr-button>
      </div>
    </rr-window>
  </div>
`;
WithFooter.parameters = {
  controls: { disable: true },
};

// Without close button
export const WithoutCloseButton = () => html`
  <div style="max-width: 480px;">
    <rr-window heading="Overzicht" ?has-close-button=${false}>
      <p style="margin: 0;">Dit venster heeft geen sluitknop. De gebruiker moet een actie kiezen.</p>
      <div slot="footer">
        <rr-button variant="neutral-tinted">Terug</rr-button>
        <rr-button variant="accent-filled">Doorgaan</rr-button>
      </div>
    </rr-window>
  </div>
`;
WithoutCloseButton.parameters = {
  controls: { disable: true },
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Window (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1261-3627" style="display: inline-block;">
        <div style="max-width: 480px;">
          <rr-window heading="Window Heading">
            <p style="margin: 0;">Window body content goes here. This is an example of the window component rendered inline.</p>
            <div slot="footer">
              <rr-button variant="neutral-tinted">Cancel</rr-button>
              <rr-button variant="accent-filled">Confirm</rr-button>
            </div>
          </rr-window>
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
