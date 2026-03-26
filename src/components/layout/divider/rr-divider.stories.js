import { html } from 'lit';
import './rr-divider.ts';
import '../../content/rich-text/rr-rich-text.ts';

/**
 * Gebruik een scheidingslijn om secties van inhoud visueel van elkaar te scheiden.
 * De scheidingslijn loopt altijd horizontaal en past zich aan de breedte van zijn container aan.
 *
 * ## Gebruik
 * ```html
 * <rr-divider></rr-divider>
 * ```
 */
export default {
  title: 'Components/Layout/Divider',
  component: 'rr-divider',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/layout/divider/rr-divider.ts',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: {
      type: 'stable',
    },
  },
};

export const Standaard = () => html`
  <rr-rich-text>
    <p>Inhoud boven de scheidingslijn.</p>
  </rr-rich-text>
  <rr-divider></rr-divider>
  <rr-rich-text>
    <p>Inhoud onder de scheidingslijn.</p>
  </rr-rich-text>
`;
