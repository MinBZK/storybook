import { html } from 'lit';
import './rr-timeline-track-cell.js';

export default {
  title: 'Components/Lists/Timeline Track Cell',
  component: 'rr-timeline-track-cell',
  tags: ['autodocs'],
  parameters: {
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
