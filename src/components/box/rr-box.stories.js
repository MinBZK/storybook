import { html } from 'lit';
import './rr-box.js';

/**
 * De Box component is een eenvoudige container/card component met achtergrondkleur, padding en afgeronde hoeken.
 *
 * ## Gebruik
 * ```html
 * <rr-box>
 *   <h3>Titel</h3>
 *   <p>Inhoud van de box.</p>
 * </rr-box>
 * ```
 */
export default {
  title: 'Components/Box',
  component: 'rr-box',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/box/rr-box.js',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    padding: {
      control: 'text',
      description: 'Custom padding value (overrides default)',
      table: {
        defaultValue: { summary: '16px (from token)' },
      },
    },
    radius: {
      control: 'text',
      description: 'Custom border-radius value (overrides default)',
      table: {
        defaultValue: { summary: '11px (from token)' },
      },
    },
    content: {
      control: 'text',
      description: 'Content to display inside the box',
    },
  },
  args: {
    content: 'Dit is de inhoud van de box.',
    padding: '',
    radius: '',
  },
};

const Template = ({ content, padding, radius }) => html`
  <rr-box
    ${padding ? `padding="${padding}"` : ''}
    ${radius ? `radius="${radius}"` : ''}
  >
    ${content}
  </rr-box>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {
  content: 'Dit is een standaard box met de default styling uit de design tokens.',
};

// With custom content
export const WithRichContent = () => html`
  <rr-box>
    <h3 style="margin: 0 0 8px 0; color: #154273;">Titel van de Box</h3>
    <p style="margin: 0 0 12px 0; color: #334155;">
      Deze box bevat rijke content met een titel, paragraaf en een lijst.
    </p>
    <ul style="margin: 0; padding-left: 20px; color: #334155;">
      <li>Eerste punt</li>
      <li>Tweede punt</li>
      <li>Derde punt</li>
    </ul>
  </rr-box>
`;
WithRichContent.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Box met rijke content zoals titels, tekst en lijsten.',
    },
  },
};

// Custom padding
export const CustomPadding = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <rr-box padding="8px">
      <strong>Klein padding (8px)</strong>
      <p style="margin: 4px 0 0 0;">Minder ruimte rondom de content.</p>
    </rr-box>
    <rr-box>
      <strong>Standaard padding (16px)</strong>
      <p style="margin: 4px 0 0 0;">De default padding uit de design tokens.</p>
    </rr-box>
    <rr-box padding="32px">
      <strong>Groot padding (32px)</strong>
      <p style="margin: 4px 0 0 0;">Meer ruimte rondom de content.</p>
    </rr-box>
  </div>
`;
CustomPadding.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Voorbeelden van verschillende padding waardes.',
    },
  },
};

// Custom radius
export const CustomRadius = () => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <rr-box radius="0px">
      <strong>Geen afronding (0px)</strong>
      <p style="margin: 4px 0 0 0;">Rechte hoeken.</p>
    </rr-box>
    <rr-box radius="4px">
      <strong>Kleine afronding (4px)</strong>
      <p style="margin: 4px 0 0 0;">Subtiel afgeronde hoeken.</p>
    </rr-box>
    <rr-box>
      <strong>Standaard afronding (11px)</strong>
      <p style="margin: 4px 0 0 0;">De default afronding uit de design tokens.</p>
    </rr-box>
    <rr-box radius="24px">
      <strong>Grote afronding (24px)</strong>
      <p style="margin: 4px 0 0 0;">Meer afgeronde hoeken.</p>
    </rr-box>
  </div>
`;
CustomRadius.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Voorbeelden van verschillende border-radius waardes.',
    },
  },
};

// Nested boxes
export const NestedBoxes = () => html`
  <rr-box>
    <h3 style="margin: 0 0 12px 0; color: #154273;">Outer Box</h3>
    <p style="margin: 0 0 12px 0; color: #334155;">
      Deze box bevat een andere box binnenin.
    </p>
    <rr-box padding="12px" style="--rr-box-background-color: #ffffff;">
      <strong style="color: #154273;">Inner Box</strong>
      <p style="margin: 4px 0 0 0; color: #334155;">
        Je kunt boxes nesten voor complexere layouts.
      </p>
    </rr-box>
  </rr-box>
`;
NestedBoxes.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Box component ondersteunt nesting. De inner box gebruikt een CSS custom property override voor een witte achtergrond.',
    },
  },
};

// With custom CSS properties
export const WithCustomProperties = () => html`
  <rr-box style="--rr-box-background-color: #dce3ea; --rr-box-corner-radius: 16px; --rr-box-padding: 24px;">
    <h3 style="margin: 0 0 8px 0; color: #154273;">Custom Styling</h3>
    <p style="margin: 0; color: #334155;">
      Deze box gebruikt CSS custom properties voor volledige controle over de styling:
    </p>
    <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #334155;">
      <li><code>--rr-box-background-color: #dce3ea</code></li>
      <li><code>--rr-box-corner-radius: 16px</code></li>
      <li><code>--rr-box-padding: 24px</code></li>
    </ul>
  </rr-box>
`;
WithCustomProperties.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Je kunt CSS custom properties gebruiken voor volledige controle over de styling.',
    },
  },
};

// Different use cases
export const UseCases = () => html`
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
    <rr-box>
      <h4 style="margin: 0 0 8px 0; color: #154273;">Informatie Card</h4>
      <p style="margin: 0; color: #64748b; font-size: 14px;">
        Gebruik een box voor informatieve content die visueel gescheiden moet worden van de rest van de pagina.
      </p>
    </rr-box>

    <rr-box>
      <h4 style="margin: 0 0 8px 0; color: #154273;">Formulier Sectie</h4>
      <label style="display: block; margin-bottom: 4px; color: #334155; font-size: 14px;">
        Naam
      </label>
      <input
        type="text"
        placeholder="Voer uw naam in"
        style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;"
      />
    </rr-box>

    <rr-box style="--rr-box-background-color: #fef3c7;">
      <h4 style="margin: 0 0 8px 0; color: #92400e;">Waarschuwing</h4>
      <p style="margin: 0; color: #78350f; font-size: 14px;">
        Gebruik aangepaste achtergrondkleuren voor verschillende boodschaptypes.
      </p>
    </rr-box>
  </div>
`;
UseCases.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Verschillende use cases voor de Box component.',
    },
  },
};
