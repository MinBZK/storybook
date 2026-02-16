import { html } from 'lit';
import './rr-lister-section.ts';

export default {
  title: 'Components/Layout/Lister Section',
  component: 'rr-lister-section',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1449-33380',
    },
  },
  argTypes: {
    container: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Container size',
    },
  },
};

export const Default = {
  args: {
    container: 'md',
  },
  render: (args) => html`
    <rr-lister-section container=${args.container}>
      ${[1, 2, 3, 4, 5, 6].map(
        (i) => html`
          <div style="padding: 24px; background: #f1f5f9; border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0;">Card ${i}</h3>
            <p style="margin: 0;">Card content goes here.</p>
          </div>
        `
      )}
    </rr-lister-section>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Lister Section (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1449:33380" style="display: inline-block;">
        <div
          style="width: 1280px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; align-items: center;"
        >
          <rr-lister-section container="md" style="width: 1007px;">
            ${[1, 2, 3, 4, 5, 6].map(
              (i) => html`
                <div
                  style="padding: 2px 8px; box-sizing: border-box; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; text-align: center;"
                >
                  <span
                    style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #FF24BD;"
                    >SLOT ${i}</span
                  >
                </div>
              `
            )}
          </rr-lister-section>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
