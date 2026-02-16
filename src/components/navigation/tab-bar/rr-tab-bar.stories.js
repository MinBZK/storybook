import { html } from 'lit';
import './rr-tab-bar.ts';
import './rr-tab-bar-item.ts';

export default {
  title: 'Components/Navigation/Tab Bar',
  component: 'rr-tab-bar',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1366-43642',
    },
    componentSource: {
      file: 'src/components/navigation/tab-bar/rr-tab-bar.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: { type: 'stable' },
  },
};

export const Default = () => html`
  <rr-tab-bar>
    <rr-tab-bar-item selected>Tab bar item</rr-tab-bar-item>
    <rr-tab-bar-item>Tab bar item</rr-tab-bar-item>
    <rr-tab-bar-item>Tab bar item</rr-tab-bar-item>
  </rr-tab-bar>
`;

export const WithIcons = () => html`
  <rr-tab-bar>
    <rr-tab-bar-item content-type="icon-with-title" selected>
      <svg slot="icon" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="4 2"/></svg>
      Home
    </rr-tab-bar-item>
    <rr-tab-bar-item content-type="icon-with-title">
      <svg slot="icon" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="4 2"/></svg>
      Zoeken
    </rr-tab-bar-item>
    <rr-tab-bar-item content-type="icon-with-title">
      <svg slot="icon" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="4 2"/></svg>
      Profiel
    </rr-tab-bar-item>
  </rr-tab-bar>
`;
WithIcons.parameters = { controls: { disable: true } };

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Tab bar (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="1366:43642" style="display: inline-block;">
        <rr-tab-bar>
          <rr-tab-bar-item selected>Tab bar item</rr-tab-bar-item>
          <rr-tab-bar-item>Tab bar item</rr-tab-bar-item>
          <rr-tab-bar-item>Tab bar item</rr-tab-bar-item>
        </rr-tab-bar>
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
