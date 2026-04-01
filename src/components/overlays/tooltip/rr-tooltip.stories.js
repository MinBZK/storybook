import { html } from 'lit';
import './rr-tooltip.ts';

/**
 * De Tooltip component voor het tonen van informatie tekst.
 *
 * ## Gebruik
 * ```html
 * <rr-tooltip text="Tooltip tekst"></rr-tooltip>
 * ```
 */
export default {
  title: 'Components/Overlays/Tooltip',
  component: 'rr-tooltip',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/overlays/tooltip/rr-tooltip.ts',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Tooltip text content',
    },
  },
  args: {
    text: 'Tooltip tekst',
  },
};

const Template = ({ text }) => html`
  <div style="padding: 2rem; display: flex; justify-content: center;">
    <rr-tooltip text=${text}></rr-tooltip>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  text: 'Dit is een tooltip',
};
