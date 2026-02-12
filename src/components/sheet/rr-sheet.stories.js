import { html } from 'lit';
import './rr-sheet.ts';
import '../button/rr-button.ts';

/**
 * De Sheet component voor slide-in panelen vanuit de onderkant of rechterkant.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=108-25937)
 *
 * ## Gebruik
 * ```html
 * <rr-sheet open position="bottom" heading="Sheet titel">
 *   <p>Sheet inhoud</p>
 * </rr-sheet>
 * ```
 */
export default {
  title: 'Components/Overlays/Sheet',
  component: 'rr-sheet',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=108-25937',
    },
    componentSource: {
      file: 'src/components/sheet/rr-sheet.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the sheet is open',
      table: {
        defaultValue: { summary: false },
      },
    },
    position: {
      control: 'select',
      options: ['bottom', 'right'],
      description: 'Sheet position',
      table: {
        defaultValue: { summary: 'bottom' },
      },
    },
    heading: {
      control: 'text',
      description: 'Sheet heading',
    },
  },
  args: {
    open: false,
    position: 'bottom',
    heading: 'Sheet titel',
  },
};

// Default bottom sheet with open button
export const Default = () => {
  const openSheet = () => {
    const sheet = document.querySelector('#default-sheet');
    if (sheet) sheet.open = true;
  };

  return html`
    <rr-button variant="accent-filled" @click=${openSheet}>Open Bottom Sheet</rr-button>
    <rr-sheet id="default-sheet" position="bottom" heading="Opties">
      <p style="margin: 0 0 1rem;">Kies een actie uit onderstaande opties.</p>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <rr-button variant="neutral-tinted" @click=${() => { document.querySelector('#default-sheet').open = false; }}>Optie 1</rr-button>
        <rr-button variant="neutral-tinted" @click=${() => { document.querySelector('#default-sheet').open = false; }}>Optie 2</rr-button>
        <rr-button variant="neutral-tinted" @click=${() => { document.querySelector('#default-sheet').open = false; }}>Optie 3</rr-button>
      </div>
    </rr-sheet>
  `;
};
Default.parameters = {
  controls: { disable: true },
};

// Right sheet
export const RightSheet = () => {
  const openSheet = () => {
    const sheet = document.querySelector('#right-sheet');
    if (sheet) sheet.open = true;
  };

  return html`
    <rr-button variant="accent-filled" @click=${openSheet}>Open Right Sheet</rr-button>
    <rr-sheet id="right-sheet" position="right" heading="Details">
      <p style="margin: 0 0 1rem;">Gedetailleerde informatie over het geselecteerde item.</p>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <strong>Naam:</strong>
          <p style="margin: 0.25rem 0 0;">Voorbeeld item</p>
        </div>
        <div>
          <strong>Status:</strong>
          <p style="margin: 0.25rem 0 0;">Actief</p>
        </div>
        <div>
          <strong>Beschrijving:</strong>
          <p style="margin: 0.25rem 0 0;">Dit is een voorbeeld van een detail paneel dat van rechts inschuift.</p>
        </div>
      </div>
    </rr-sheet>
  `;
};
RightSheet.parameters = {
  controls: { disable: true },
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Sheet (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="108-25937" style="display: inline-block;">
        <div style="position: relative; width: 480px; height: 300px; background: #f8f9fa; border-radius: 16px; overflow: hidden;">
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: white; border-radius: 16px 16px 0 0; box-shadow: 0 -4px 24px rgba(0,0,0,0.1); padding: 16px 24px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
              <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">Sheet Heading</h3>
            </div>
            <p style="margin: 0; color: #333;">Sheet content goes here.</p>
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
