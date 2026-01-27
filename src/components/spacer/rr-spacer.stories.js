import { html } from 'lit';
import './rr-spacer.js';

/**
 * De Spacer component is een utility component voor het creëren van ruimte
 * tussen elementen. Ondersteunt vaste sizes, flexibele ruimte, en container-responsive sizes.
 *
 * ## Figma Design
 * [Open in Figma](https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=48-2234)
 *
 * ## Gebruik
 * ```html
 * <!-- Vaste spacing -->
 * <rr-spacer size="32"></rr-spacer>
 *
 * <!-- Flexibele spacing -->
 * <rr-spacer size="flexible"></rr-spacer>
 *
 * <!-- Container-responsive -->
 * <rr-spacer size="m" container="l"></rr-spacer>
 * ```
 */
export default {
  title: 'Components/Spacer',
  component: 'rr-spacer',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5DyHMXUNVxbgH7ZjhQxPZe/RR-Components?node-id=48-2234',
    },
    componentSource: {
      file: 'src/components/spacer/rr-spacer.ts',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [
        '2',
        '4',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
        '28',
        '32',
        '40',
        '44',
        '48',
        '56',
        '64',
        '80',
        '96',
        'm',
        'flexible',
      ],
      description: 'Spacer size',
      table: {
        defaultValue: { summary: '8' },
      },
    },
    container: {
      control: 'select',
      options: ['s', 'm', 'l', 'all'],
      description: 'Container size for responsive "m" size',
      table: {
        defaultValue: { summary: 'all' },
      },
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical', 'both'],
      description: 'Direction of spacing',
      table: {
        defaultValue: { summary: 'both' },
      },
    },
  },
  args: {
    size: '8',
    container: 'all',
    direction: 'both',
  },
};

// Helper to visualize spacer
const SpacerDemo = ({ size, container, direction }) => html`
  <div
    style="display: flex; align-items: center; gap: 8px; padding: 16px; background: #f8fafc; border-radius: 8px;"
  >
    <div
      style="padding: 8px 16px; background: #e2e8f0; border-radius: 4px; font-family: system-ui;"
    >
      Before
    </div>
    <rr-spacer
      size=${size}
      container=${container}
      direction=${direction}
      style="background: #3b82f6; opacity: 0.5;"
    ></rr-spacer>
    <div
      style="padding: 8px 16px; background: #e2e8f0; border-radius: 4px; font-family: system-ui;"
    >
      After
    </div>
  </div>
`;

// Primary story
export const Default = SpacerDemo.bind({});
Default.args = {
  size: '16',
};

// Fixed sizes
export const FixedSizes = () => html`
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <h3 style="margin: 0; font-family: system-ui;">Fixed Sizes (NxN squares)</h3>
    <div style="display: flex; gap: 8px; align-items: flex-end; flex-wrap: wrap;">
      ${['8', '16', '24', '32', '48', '64', '96'].map(
        (size) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <rr-spacer
              size=${size}
              style="background: #3b82f6; opacity: 0.7; border-radius: 2px;"
            ></rr-spacer>
            <span style="font-size: 12px; color: #64748b; font-family: system-ui;">${size}px</span>
          </div>
        `
      )}
    </div>
  </div>
`;
FixedSizes.parameters = {
  controls: { disable: true },
};

// Flexible size
export const Flexible = () => html`
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <h3 style="margin: 0; font-family: system-ui;">Flexible Spacing</h3>
    <p style="margin: 0; font-size: 14px; color: #64748b; font-family: system-ui;">
      The flexible spacer fills available space, useful for layouts like navigation bars.
    </p>
    <div
      style="display: flex; align-items: center; padding: 16px; background: #f8fafc; border-radius: 8px; width: 100%; box-sizing: border-box;"
    >
      <div style="padding: 8px 16px; background: #154273; color: white; border-radius: 4px; font-family: system-ui;">
        Logo
      </div>
      <rr-spacer size="flexible" style="background: #3b82f6; opacity: 0.2; min-height: 8px;"></rr-spacer>
      <div style="padding: 8px 16px; background: #e2e8f0; border-radius: 4px; font-family: system-ui;">
        Menu
      </div>
    </div>
  </div>
`;
Flexible.parameters = {
  controls: { disable: true },
};

// Container-responsive 'm' size
export const ContainerResponsive = () => html`
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <h3 style="margin: 0; font-family: system-ui;">Container-Responsive 'm' Size</h3>
    <p style="margin: 0; font-size: 14px; color: #64748b; font-family: system-ui;">
      The 'm' size changes based on the container size attribute.
    </p>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <code style="font-family: monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">container="s"</code>
        <span style="color: #64748b; font-family: system-ui;">→ 16x16px</span>
        <rr-spacer size="m" container="s" style="background: #3b82f6; opacity: 0.7; border-radius: 2px;"></rr-spacer>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <code style="font-family: monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">container="m"</code>
        <span style="color: #64748b; font-family: system-ui;">→ 24x24px</span>
        <rr-spacer size="m" container="m" style="background: #3b82f6; opacity: 0.7; border-radius: 2px;"></rr-spacer>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <code style="font-family: monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">container="l"</code>
        <span style="color: #64748b; font-family: system-ui;">→ 24x24px</span>
        <rr-spacer size="m" container="l" style="background: #3b82f6; opacity: 0.7; border-radius: 2px;"></rr-spacer>
      </div>
    </div>
  </div>
`;
ContainerResponsive.parameters = {
  controls: { disable: true },
};

// Direction
export const Direction = () => html`
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <h3 style="margin: 0; font-family: system-ui;">Direction</h3>

    <div>
      <h4 style="margin: 0 0 8px 0; font-family: system-ui; font-size: 14px;">
        direction="both" (default) - NxN square
      </h4>
      <div
        style="display: inline-flex; align-items: center; padding: 8px; background: #f8fafc; border-radius: 4px;"
      >
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">A</div>
        <rr-spacer size="32" style="background: #3b82f6; opacity: 0.5;"></rr-spacer>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">B</div>
      </div>
    </div>

    <div>
      <h4 style="margin: 0 0 8px 0; font-family: system-ui; font-size: 14px;">
        direction="horizontal" - only width
      </h4>
      <div
        style="display: inline-flex; align-items: center; padding: 8px; background: #f8fafc; border-radius: 4px;"
      >
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">A</div>
        <rr-spacer
          size="32"
          direction="horizontal"
          style="background: #3b82f6; opacity: 0.5;"
        ></rr-spacer>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">B</div>
      </div>
    </div>

    <div>
      <h4 style="margin: 0 0 8px 0; font-family: system-ui; font-size: 14px;">
        direction="vertical" - only height
      </h4>
      <div
        style="display: inline-flex; flex-direction: column; align-items: center; padding: 8px; background: #f8fafc; border-radius: 4px;"
      >
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">A</div>
        <rr-spacer
          size="32"
          direction="vertical"
          style="background: #3b82f6; opacity: 0.5;"
        ></rr-spacer>
        <div style="padding: 8px; background: #e2e8f0; border-radius: 4px;">B</div>
      </div>
    </div>
  </div>
`;
Direction.parameters = {
  controls: { disable: true },
};

// All fixed sizes overview
export const AllSizes = () => html`
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <h3 style="margin: 0; font-family: system-ui;">All Fixed Sizes</h3>
    <div style="display: flex; gap: 4px; align-items: flex-end; flex-wrap: wrap;">
      ${['2', '4', '6', '8', '10', '12', '16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'].map(
        (size) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
            <rr-spacer
              size=${size}
              style="background: #3b82f6; opacity: 0.7; border-radius: 2px;"
            ></rr-spacer>
            <span style="font-size: 10px; color: #64748b; font-family: system-ui;">${size}</span>
          </div>
        `
      )}
    </div>
  </div>
`;
AllSizes.parameters = {
  controls: { disable: true },
};

// Real-world example: Navigation bar with spacers
export const NavigationExample = () => html`
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <h3 style="margin: 0; font-family: system-ui;">Real-World Example: Navigation Bar</h3>
    <div
      style="display: flex; align-items: center; padding: 8px 16px; background: #1f252d; border-radius: 8px; color: white; font-family: system-ui;"
    >
      <div style="font-weight: 600;">RegelRecht</div>
      <rr-spacer size="32"></rr-spacer>
      <nav style="display: flex; gap: 24px;">
        <a href="#" style="color: white; text-decoration: none;">Home</a>
        <a href="#" style="color: white; text-decoration: none;">Products</a>
        <a href="#" style="color: white; text-decoration: none;">About</a>
      </nav>
      <rr-spacer size="flexible"></rr-spacer>
      <button
        style="padding: 8px 16px; background: #154273; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        Login
      </button>
    </div>
  </div>
`;
NavigationExample.parameters = {
  controls: { disable: true },
};

// Figma Comparison - visual comparison with Figma design
const FIGMA_TOKEN = import.meta.env.STORYBOOK_FIGMA_TOKEN || '';
const FIGMA_FILE_ID = '5DyHMXUNVxbgH7ZjhQxPZe';

export const FigmaComparison = () => html`
  <ftl-belt access-token="${FIGMA_TOKEN}" file-id="${FIGMA_FILE_ID}">
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: #64748b; margin: 0;">
        Our spacers (Code) vs Figma design. Use Toggle/Overlay/Side-by-Side to compare.
      </p>
      <ftl-holster node="48:2234" style="display: inline-block;">
        <!--
          Figma spacer (48:2234) component set:
          - Variants: flexible (fill width, 8px height), fixed sizes (NxN)
          - Container-responsive 'm' size: s=16px, m/l=24px
        -->
        <div
          style="background: #ffffff; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; align-items: flex-start;"
        >
          <!-- Flexible spacer (width: fill, height: 8px) -->
          <div style="width: 200px; display: flex;">
            <rr-spacer size="flexible" style="background: #e2e8f0; min-height: 8px;"></rr-spacer>
          </div>
          <!-- Fixed sizes -->
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <rr-spacer size="8" style="background: #e2e8f0;"></rr-spacer>
            <rr-spacer size="16" style="background: #e2e8f0;"></rr-spacer>
            <rr-spacer size="24" style="background: #e2e8f0;"></rr-spacer>
            <rr-spacer size="32" style="background: #e2e8f0;"></rr-spacer>
          </div>
          <!-- Container-responsive 'm' sizes -->
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <rr-spacer size="m" container="s" style="background: #e2e8f0;"></rr-spacer>
            <rr-spacer size="m" container="m" style="background: #e2e8f0;"></rr-spacer>
            <rr-spacer size="m" container="l" style="background: #e2e8f0;"></rr-spacer>
          </div>
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
