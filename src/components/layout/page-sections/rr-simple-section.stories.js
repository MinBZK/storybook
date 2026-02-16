import { html } from 'lit';
import './rr-simple-section.ts';

export default {
  title: 'Components/Layout/Simple Section',
  component: 'rr-simple-section',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1255-1471',
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
    <h2 style="margin: 0 0 8px 0;">Section Content</h2>
    <p style="margin: 0;">This is the main content area of the section.</p>
  </div>
`;

export const Default = {
  args: {
    container: 'md',
  },
  render: (args) => html`
    <rr-simple-section container=${args.container}> ${sampleContent} </rr-simple-section>
  `,
};

export const AllContainerSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; background: #e2e8f0; padding: 16px;">
      <div>
        <h3 style="margin: 0 0 8px 16px;">Small Container (sm)</h3>
        <rr-simple-section container="sm" style="background: white;">
          <div style="padding: 24px; background: #f1f5f9;">Content with sm padding (16px)</div>
        </rr-simple-section>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 32px;">Medium Container (md)</h3>
        <rr-simple-section container="md" style="background: white;">
          <div style="padding: 24px; background: #f1f5f9;">Content with md padding (24px 32px)</div>
        </rr-simple-section>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 48px;">Large Container (lg)</h3>
        <rr-simple-section container="lg" style="background: white;">
          <div style="padding: 24px; background: #f1f5f9;">Content with lg padding (32px 48px)</div>
        </rr-simple-section>
      </div>
    </div>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Simple Section (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1255:1471" style="display: inline-block;">
        <div
          style="width: 1280px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; align-items: center;"
        >
          <!-- container=sm (640px) -->
          <rr-simple-section container="sm" style="width: 640px;">
            <div
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #FF24BD;">SLOT</span>
            </div>
          </rr-simple-section>

          <!-- container=md (1007px) -->
          <rr-simple-section container="md" style="width: 1007px;">
            <div
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #FF24BD;">SLOT</span>
            </div>
          </rr-simple-section>

          <!-- container=lg (1248px) -->
          <rr-simple-section container="lg" style="width: 1248px;">
            <div
              style="padding: 2px 8px; width: 100%; box-sizing: border-box; background: rgba(255, 36, 189, 0.1); border: 2px dashed #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; line-height: 1.125; color: #FF24BD;">SLOT</span>
            </div>
          </rr-simple-section>
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
