import { html } from 'lit';
import './rr-page.js';

// Page component stories
export default {
  title: 'Components/Layout/Page',
  component: 'rr-page',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
