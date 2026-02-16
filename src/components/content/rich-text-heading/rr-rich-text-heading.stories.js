import { html } from 'lit';
import './rr-rich-text-heading.ts';

/**
 * De Rich Text Heading component voor het renderen van headings met de juiste
 * semantische title tokens gebaseerd op container grootte en heading level.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=980-145)
 *
 * ## Gebruik
 * ```html
 * <rr-rich-text-heading level="2" container="md">Mijn Heading</rr-rich-text-heading>
 * ```
 */
export default {
  title: 'Components/Content/Rich Text Heading',
  component: 'rr-rich-text-heading',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=980-145',
    },
    componentSource: {
      file: 'src/components/content/rich-text-heading/rr-rich-text-heading.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    level: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Heading level (1-6)',
      table: {
        defaultValue: { summary: 1 },
      },
    },
    container: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Container size for responsive title tokens',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    text: {
      control: 'text',
      description: 'Heading text',
    },
  },
  args: {
    level: 1,
    container: 'md',
    text: 'Heading tekst',
  },
};

const Template = ({ level, container, text }) => html`
  <rr-rich-text-heading level=${level} container=${container}>${text}</rr-rich-text-heading>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
  text: 'Heading 1',
};

// All levels in one view
export const AllLevels = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <rr-rich-text-heading level="1" container="md">Heading 1 - Paginatitel</rr-rich-text-heading>
    <rr-rich-text-heading level="2" container="md">Heading 2 - Sectie titel</rr-rich-text-heading>
    <rr-rich-text-heading level="3" container="md">Heading 3 - Subsectie</rr-rich-text-heading>
    <rr-rich-text-heading level="4" container="md">Heading 4 - Onderdeel</rr-rich-text-heading>
    <rr-rich-text-heading level="5" container="md">Heading 5 - Detail</rr-rich-text-heading>
    <rr-rich-text-heading level="6" container="md">Heading 6 - Kleinste titel</rr-rich-text-heading>
  </div>
`;
AllLevels.parameters = {
  controls: { disable: true },
};

// Container size comparison
export const ContainerSizes = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b;">Small container</p>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <rr-rich-text-heading level="1" container="sm">H1 Small Container</rr-rich-text-heading>
        <rr-rich-text-heading level="2" container="sm">H2 Small Container</rr-rich-text-heading>
        <rr-rich-text-heading level="3" container="sm">H3 Small Container</rr-rich-text-heading>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b;">Medium container (default)</p>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <rr-rich-text-heading level="1" container="md">H1 Medium Container</rr-rich-text-heading>
        <rr-rich-text-heading level="2" container="md">H2 Medium Container</rr-rich-text-heading>
        <rr-rich-text-heading level="3" container="md">H3 Medium Container</rr-rich-text-heading>
      </div>
    </div>
    <div>
      <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: #64748b;">Large container</p>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <rr-rich-text-heading level="1" container="lg">H1 Large Container</rr-rich-text-heading>
        <rr-rich-text-heading level="2" container="lg">H2 Large Container</rr-rich-text-heading>
        <rr-rich-text-heading level="3" container="lg">H3 Large Container</rr-rich-text-heading>
      </div>
    </div>
  </div>
`;
ContainerSizes.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Vergelijking van heading groottes over de drie container formaten (sm, md, lg).',
    },
  },
};

// Figma Comparison
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Rich Text Heading (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="980-145" style="display: inline-block;">
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; width: 313px; box-sizing: border-box;">
          <rr-rich-text-heading level="1" container="sm">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="2" container="sm">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="3" container="sm">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="4" container="sm">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="5" container="sm">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="6" container="sm">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="1" container="md">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="2" container="md">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="3" container="md">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="4" container="md">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="5" container="md">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="6" container="md">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="1" container="lg">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="2" container="lg">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="3" container="lg">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="4" container="lg">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="5" container="lg">Heading</rr-rich-text-heading>
          <rr-rich-text-heading level="6" container="lg">Heading</rr-rich-text-heading>
        </div>
      </ftl-holster>
      <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
        Keyboard: T (toggle) | O (overlay) | S (side-by-side)
      </p>
    </div>
  </ftl-belt>
`;
FigmaComparison.storyName = 'Figma Comparison';
FigmaComparison.tags = ['!autodocs', 'figma'];
FigmaComparison.parameters = {
  controls: { disable: true },
};
