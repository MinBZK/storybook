import { html } from 'lit';
import './rr-two-thirds-one-third-section.ts';

export default {
  title: 'Components/Layout/Two Thirds One Third Section',
  component: 'rr-two-thirds-one-third-section',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1255-1623',
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

const sampleContent = html`
  <div style="padding: 24px; background: #f1f5f9; border-radius: 8px;">
    <h2 style="margin: 0 0 8px 0;">Main Content (2/3)</h2>
    <p style="margin: 0;">This is the main content area taking two thirds of the width.</p>
  </div>
`;

const sampleAside = html`
  <div style="padding: 24px; background: #e2e8f0; border-radius: 8px;">
    <h3 style="margin: 0 0 8px 0;">Aside (1/3)</h3>
    <p style="margin: 0;">This is the aside content.</p>
  </div>
`;

export const Default = {
  args: {
    container: 'md',
  },
  render: (args) => html`
    <rr-two-thirds-one-third-section container=${args.container}>
      ${sampleContent}
      <div slot="aside">${sampleAside}</div>
    </rr-two-thirds-one-third-section>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Two Thirds One Third Section (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1255:1623" style="display: inline-block;">
        <div
          style="width: 1280px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; align-items: center;"
        >
          <rr-two-thirds-one-third-section container="sm" style="width: 640px;">
            <div
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #FF24BD;">SLOT</span>
            </div>
            <div
              slot="aside"
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(189, 36, 255, 0.1); border: 2px dashed #BD24FF; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #BD24FF;">ASIDE</span>
            </div>
          </rr-two-thirds-one-third-section>

          <rr-two-thirds-one-third-section container="md" style="width: 1007px;">
            <div
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #FF24BD;">SLOT</span>
            </div>
            <div
              slot="aside"
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(189, 36, 255, 0.1); border: 2px dashed #BD24FF; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #BD24FF;">ASIDE</span>
            </div>
          </rr-two-thirds-one-third-section>

          <rr-two-thirds-one-third-section container="lg" style="width: 1248px;">
            <div
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #FF24BD;">SLOT</span>
            </div>
            <div
              slot="aside"
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(189, 36, 255, 0.1); border: 2px dashed #BD24FF; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #BD24FF;">ASIDE</span>
            </div>
          </rr-two-thirds-one-third-section>
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
