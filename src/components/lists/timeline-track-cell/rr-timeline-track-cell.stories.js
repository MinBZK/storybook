import { html } from 'lit';
import './rr-timeline-track-cell.js';

export default {
  title: 'Components/Lists/Timeline Track Cell',
  component: 'rr-timeline-track-cell',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=1404-10417',
    },
  },
  argTypes: {
    step: {
      control: 'select',
      options: ['past', 'future', 'none'],
      description: 'Timeline step state',
    },
    child: {
      control: 'select',
      options: ['first', 'between', 'last'],
      description: 'Position in timeline sequence',
    },
  },
};

export const Default = {
  args: {
    step: 'past',
    child: 'between',
  },
  render: (args) => html`
    <rr-timeline-track-cell
      step=${args.step}
      child=${args.child}
      style="height: 50px;"
    ></rr-timeline-track-cell>
  `,
};

export const Timeline = {
  render: () => html`
    <div style="display: flex; flex-direction: column;">
      <rr-timeline-track-cell step="past" child="first" style="height: 50px;"></rr-timeline-track-cell>
      <rr-timeline-track-cell step="past" child="between" style="height: 50px;"></rr-timeline-track-cell>
      <rr-timeline-track-cell step="future" child="between" style="height: 50px;"></rr-timeline-track-cell>
      <rr-timeline-track-cell step="none" child="between" style="height: 50px;"></rr-timeline-track-cell>
      <rr-timeline-track-cell step="future" child="last" style="height: 50px;"></rr-timeline-track-cell>
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
        Individual variant comparisons (Code vs Figma). Use Toggle/Overlay/Side-by-Side to compare.
      </p>

      <!-- step=past, child=first -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">step=past / child=first</span>
        <ftl-holster node="1404:10435" style="display: inline-block;">
          <rr-timeline-track-cell step="past" child="first" style="height: 50px;"></rr-timeline-track-cell>
        </ftl-holster>
      </div>

      <!-- step=past, child=between -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">step=past / child=between</span>
        <ftl-holster node="1404:10418" style="display: inline-block;">
          <rr-timeline-track-cell step="past" child="between" style="height: 50px;"></rr-timeline-track-cell>
        </ftl-holster>
      </div>

      <!-- step=future, child=between -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">step=future / child=between</span>
        <ftl-holster node="1404:10422" style="display: inline-block;">
          <rr-timeline-track-cell step="future" child="between" style="height: 50px;"></rr-timeline-track-cell>
        </ftl-holster>
      </div>

      <!-- step=none, child=between -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">step=none / child=between</span>
        <ftl-holster node="1404:10426" style="display: inline-block;">
          <rr-timeline-track-cell step="none" child="between" style="height: 50px;"></rr-timeline-track-cell>
        </ftl-holster>
      </div>

      <!-- step=past, child=last -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">step=past / child=last</span>
        <ftl-holster node="1404:10429" style="display: inline-block;">
          <rr-timeline-track-cell step="past" child="last" style="height: 50px;"></rr-timeline-track-cell>
        </ftl-holster>
      </div>

      <!-- step=future, child=last -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">step=future / child=last</span>
        <ftl-holster node="1404:10432" style="display: inline-block;">
          <rr-timeline-track-cell step="future" child="last" style="height: 50px;"></rr-timeline-track-cell>
        </ftl-holster>
      </div>

      <!-- step=future, child=first -->
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span style="font-size: 0.75rem; color: #64748b;">step=future / child=first</span>
        <ftl-holster node="1404:10438" style="display: inline-block;">
          <rr-timeline-track-cell step="future" child="first" style="height: 50px;"></rr-timeline-track-cell>
        </ftl-holster>
      </div>

      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = '🎨 Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = { controls: { disable: true } };
