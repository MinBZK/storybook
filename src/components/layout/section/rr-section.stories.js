import { html } from 'lit';
import './rr-section.ts';

export default {
  title: 'Components/Layout/Section',
  component: 'rr-section',
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
    variant: {
      control: 'select',
      options: ['simple', 'full-bleed', 'one-third-two-thirds', 'two-thirds-one-third', 'half-half', 'lister'],
      description: 'Section layout variant',
    },
  },
};

const sampleContent = html`
  <div style="padding: 24px; background: #f1f5f9; border-radius: 8px;">
    <h2 style="margin: 0 0 8px 0;">Section Content</h2>
    <p style="margin: 0;">This is the main content area of the section.</p>
  </div>
`;

const sampleAside = html`
  <div style="padding: 24px; background: #e2e8f0; border-radius: 8px;">
    <h3 style="margin: 0 0 8px 0;">Aside</h3>
    <p style="margin: 0;">This is the aside content.</p>
  </div>
`;

export const Default = {
  args: {
    container: 'md',
    variant: 'simple',
  },
  render: (args) => html`
    <rr-section container=${args.container} variant=${args.variant}> ${sampleContent} </rr-section>
  `,
};

export const Simple = {
  args: {
    container: 'md',
    variant: 'simple',
  },
  render: (args) => html` <rr-section container=${args.container} variant="simple"> ${sampleContent} </rr-section> `,
};

export const FullBleed = {
  args: {
    container: 'md',
    variant: 'full-bleed',
  },
  render: (args) => html`
    <rr-section container=${args.container} variant="full-bleed">
      <div style="background: #154273; color: white; padding: 48px; text-align: center;">
        <h2 style="margin: 0 0 16px 0;">Full Bleed Section</h2>
        <p style="margin: 0;">This section extends to the full width of the container.</p>
      </div>
    </rr-section>
  `,
};

export const OneThirdTwoThirds = {
  args: {
    container: 'md',
    variant: 'one-third-two-thirds',
  },
  render: (args) => html`
    <rr-section container=${args.container} variant="one-third-two-thirds">
      ${sampleContent}
      <div slot="aside">${sampleAside}</div>
    </rr-section>
  `,
};

export const TwoThirdsOneThird = {
  args: {
    container: 'md',
    variant: 'two-thirds-one-third',
  },
  render: (args) => html`
    <rr-section container=${args.container} variant="two-thirds-one-third">
      ${sampleContent}
      <div slot="aside">${sampleAside}</div>
    </rr-section>
  `,
};

export const HalfHalf = {
  args: {
    container: 'md',
    variant: 'half-half',
  },
  render: (args) => html`
    <rr-section container=${args.container} variant="half-half">
      ${sampleContent}
      <div slot="aside">${sampleAside}</div>
    </rr-section>
  `,
};

export const Lister = {
  args: {
    container: 'md',
    variant: 'lister',
  },
  render: (args) => html`
    <rr-section container=${args.container} variant="lister">
      ${[1, 2, 3, 4, 5, 6].map(
        (i) => html`
          <div style="padding: 24px; background: #f1f5f9; border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0;">Card ${i}</h3>
            <p style="margin: 0;">Card content goes here.</p>
          </div>
        `
      )}
    </rr-section>
  `,
};

export const AllContainerSizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; background: #e2e8f0; padding: 16px;">
      <div>
        <h3 style="margin: 0 0 8px 16px;">Small Container (sm)</h3>
        <rr-section container="sm" variant="simple" style="background: white;">
          <div style="padding: 24px; background: #f1f5f9;">Content with sm padding (16px)</div>
        </rr-section>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 32px;">Medium Container (md)</h3>
        <rr-section container="md" variant="simple" style="background: white;">
          <div style="padding: 24px; background: #f1f5f9;">Content with md padding (24px 32px)</div>
        </rr-section>
      </div>
      <div>
        <h3 style="margin: 0 0 8px 48px;">Large Container (lg)</h3>
        <rr-section container="lg" variant="simple" style="background: white;">
          <div style="padding: 24px; background: #f1f5f9;">Content with lg padding (32px 48px)</div>
        </rr-section>
      </div>
    </div>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparisonSimple = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Simple Section (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1255:1471" style="display: inline-block;">
        <!--
          Figma simple-section (1255:1471) component set:
          - Layout: column, gap: 16px, padding: 16px
          - Variants: container (sm/md/lg)
          - Width: 1280px
        -->
        <div
          style="width: 1280px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; align-items: center;"
        >
          <!-- container=sm -->
          <rr-section container="sm" variant="simple" style="width: 100%;">
            <div
              style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
          </rr-section>

          <!-- container=md -->
          <rr-section container="md" variant="simple" style="width: 100%;">
            <div
              style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
          </rr-section>

          <!-- container=lg -->
          <rr-section container="lg" variant="simple" style="width: 100%;">
            <div
              style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
          </rr-section>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparisonSimple.storyName = '🎨 Figma Comparison (Simple)';
FigmaComparisonSimple.tags = ['!autodocs', 'figma'];
FigmaComparisonSimple.parameters = { controls: { disable: true } };
