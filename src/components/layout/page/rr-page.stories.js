import { html } from 'lit';
import './rr-page.js';

// Page component stories
export default {
  title: 'Components/Layout/Page',
  component: 'rr-page',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1255-1052',
    },
  },
  argTypes: {
    headerSticky: {
      control: 'boolean',
      description: 'Whether the header should be sticky',
    },
    footerSticky: {
      control: 'boolean',
      description: 'Whether the footer should be sticky',
    },
    tinted: {
      control: 'boolean',
      description: 'Use tinted (gray) background instead of white',
    },
  },
};

// Sample content for demos
const sampleHeader = html`
  <div style="padding: 16px; background: rgba(0, 100, 200, 0.1); border-bottom: 1px solid #e2e8f0;">
    <strong>Header Content</strong>
  </div>
`;

const sampleFooter = html`
  <div style="padding: 16px; background: rgba(0, 200, 100, 0.1); border-top: 1px solid #e2e8f0;">
    <strong>Footer Content</strong>
  </div>
`;

const sampleContent = html`
  <div style="padding: 16px;">
    <h1 style="margin: 0 0 16px 0;">Page Title</h1>
    <p>This is the main content area of the page. It will scroll when the content exceeds the viewport height.</p>
    ${Array(20)
      .fill(null)
      .map(
        (_, i) => html`
          <p style="margin: 16px 0;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paragraph ${i + 1}: Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris.
          </p>
        `
      )}
  </div>
`;

export const Default = {
  args: {
    headerSticky: false,
    footerSticky: false,
    tinted: false,
  },
  render: (args) => html`
    <rr-page
      ?header-sticky=${args.headerSticky}
      ?footer-sticky=${args.footerSticky}
      ?tinted=${args.tinted}
      style="height: 400px;"
    >
      <div slot="header">${sampleHeader}</div>
      ${sampleContent}
      <div slot="footer">${sampleFooter}</div>
    </rr-page>
  `,
};

export const StickyHeader = {
  args: {
    headerSticky: true,
    footerSticky: false,
    tinted: false,
  },
  render: (args) => html`
    <rr-page
      ?header-sticky=${args.headerSticky}
      ?footer-sticky=${args.footerSticky}
      ?tinted=${args.tinted}
      style="height: 400px;"
    >
      <div slot="header">${sampleHeader}</div>
      ${sampleContent}
      <div slot="footer">${sampleFooter}</div>
    </rr-page>
  `,
};

export const StickyFooter = {
  args: {
    headerSticky: false,
    footerSticky: true,
    tinted: false,
  },
  render: (args) => html`
    <rr-page
      ?header-sticky=${args.headerSticky}
      ?footer-sticky=${args.footerSticky}
      ?tinted=${args.tinted}
      style="height: 400px;"
    >
      <div slot="header">${sampleHeader}</div>
      ${sampleContent}
      <div slot="footer">${sampleFooter}</div>
    </rr-page>
  `,
};

export const StickyBoth = {
  args: {
    headerSticky: true,
    footerSticky: true,
    tinted: false,
  },
  render: (args) => html`
    <rr-page
      ?header-sticky=${args.headerSticky}
      ?footer-sticky=${args.footerSticky}
      ?tinted=${args.tinted}
      style="height: 400px;"
    >
      <div slot="header">${sampleHeader}</div>
      ${sampleContent}
      <div slot="footer">${sampleFooter}</div>
    </rr-page>
  `,
};

export const Tinted = {
  args: {
    headerSticky: true,
    footerSticky: true,
    tinted: true,
  },
  render: (args) => html`
    <rr-page
      ?header-sticky=${args.headerSticky}
      ?footer-sticky=${args.footerSticky}
      ?tinted=${args.tinted}
      style="height: 400px;"
    >
      <div slot="header">${sampleHeader}</div>
      ${sampleContent}
      <div slot="footer">${sampleFooter}</div>
    </rr-page>
  `,
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Page component variants (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1255:1052" style="display: inline-block;">
        <!--
          Figma page (1255:1052) component set:
          - Layout: row, gap: 16px, padding: 16px
          - Variants: 8 (header-is-sticky x footer-is-sticky x is-tinted)
          - Each variant: 460px x fixed height
        -->
        <div
          style="width: 3824px; background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: row; gap: 16px; align-items: stretch;"
        >
          <!-- header-is-sticky=false, footer-is-sticky=false, is-tinted=false -->
          <rr-page style="width: 460px; height: 700px;">
            <div slot="header">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
            <div
              style="padding: 2px 8px; flex: 1; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; display: flex; align-items: center; justify-content: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
            <div slot="footer">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
          </rr-page>

          <!-- header-is-sticky=true, footer-is-sticky=false, is-tinted=false -->
          <rr-page header-sticky style="width: 460px; height: 700px;">
            <div slot="header">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
            <div
              style="padding: 2px 8px; flex: 1; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; display: flex; align-items: center; justify-content: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
            <div slot="footer">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
          </rr-page>

          <!-- header-is-sticky=false, footer-is-sticky=true, is-tinted=false -->
          <rr-page footer-sticky style="width: 460px; height: 700px;">
            <div slot="header">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
            <div
              style="padding: 2px 8px; flex: 1; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; display: flex; align-items: center; justify-content: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
            <div slot="footer">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
          </rr-page>

          <!-- header-is-sticky=true, footer-is-sticky=true, is-tinted=false -->
          <rr-page header-sticky footer-sticky style="width: 460px; height: 700px;">
            <div slot="header">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
            <div
              style="padding: 2px 8px; flex: 1; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; display: flex; align-items: center; justify-content: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
            <div slot="footer">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
          </rr-page>

          <!-- header-is-sticky=false, footer-is-sticky=false, is-tinted=true -->
          <rr-page tinted style="width: 460px; height: 700px;">
            <div slot="header">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
            <div
              style="padding: 2px 8px; flex: 1; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; display: flex; align-items: center; justify-content: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
            <div slot="footer">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
          </rr-page>

          <!-- header-is-sticky=true, footer-is-sticky=false, is-tinted=true -->
          <rr-page tinted header-sticky style="width: 460px; height: 700px;">
            <div slot="header">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
            <div
              style="padding: 2px 8px; flex: 1; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; display: flex; align-items: center; justify-content: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
            <div slot="footer">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
          </rr-page>

          <!-- header-is-sticky=false, footer-is-sticky=true, is-tinted=true -->
          <rr-page tinted footer-sticky style="width: 460px; height: 700px;">
            <div slot="header">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
            <div
              style="padding: 2px 8px; flex: 1; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; display: flex; align-items: center; justify-content: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
            <div slot="footer">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
          </rr-page>

          <!-- header-is-sticky=true, footer-is-sticky=true, is-tinted=true -->
          <rr-page tinted header-sticky footer-sticky style="width: 460px; height: 700px;">
            <div slot="header">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
            <div
              style="padding: 2px 8px; flex: 1; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; display: flex; align-items: center; justify-content: center;"
            >
              <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
            </div>
            <div slot="footer">
              <div
                style="padding: 2px 8px; background: rgba(255, 36, 189, 0.1); border: 2px solid #FF24BD; text-align: center;"
              >
                <span style="font-family: RijksSansVF; font-weight: 700; font-size: 18px; color: #FF24BD;">SLOT</span>
              </div>
            </div>
          </rr-page>
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
