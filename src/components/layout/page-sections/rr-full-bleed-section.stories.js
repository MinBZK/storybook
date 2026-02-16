import { html } from 'lit';
import './rr-full-bleed-section.ts';

export default {
  title: 'Components/Layout/Full Bleed Section',
  component: 'rr-full-bleed-section',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1255-1496',
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
    <rr-full-bleed-section container=${args.container}>
      <div style="background: #154273; color: white; padding: 48px; text-align: center;">
        <h2 style="margin: 0 0 16px 0;">Full Bleed Section</h2>
        <p style="margin: 0;">This section extends to the full width of the container.</p>
      </div>
    </rr-full-bleed-section>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Full Bleed Section (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1255:1496" style="display: inline-block;">
        <div
          style="width: 1280px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; align-items: center;"
        >
          <rr-full-bleed-section container="sm" style="width: 640px;">
            <div
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #FF24BD;">SLOT</span>
            </div>
          </rr-full-bleed-section>

          <rr-full-bleed-section container="md" style="width: 1007px;">
            <div
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #FF24BD;">SLOT</span>
            </div>
          </rr-full-bleed-section>

          <rr-full-bleed-section container="lg" style="width: 1248px;">
            <div
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #FF24BD;">SLOT</span>
            </div>
          </rr-full-bleed-section>
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
