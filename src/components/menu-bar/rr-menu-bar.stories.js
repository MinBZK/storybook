import { html } from 'lit';
import './rr-menu-bar.js';
import './rr-menu-item.js';

/**
 * De Menu Bar component is een navigatie-element met menu items die horizontaal worden weergegeven.
 *
 * ## Gebruik
 * ```html
 * <rr-menu-bar>
 *   <rr-menu-item selected>Home</rr-menu-item>
 *   <rr-menu-item href="/about">Over ons</rr-menu-item>
 *   <rr-menu-item href="/contact">Contact</rr-menu-item>
 * </rr-menu-bar>
 * ```
 */
export default {
  title: 'Components/Menu Bar',
  component: 'rr-menu-bar',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/menu-bar/rr-menu-bar.js',
      repository: 'https://github.com/regelrecht/design-system',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Title size (only affects title slot)',
      table: {
        defaultValue: { summary: 'm' },
      },
    },
  },
  args: {
    size: 'm',
  },
};

const Template = ({ size }) => html`
  <rr-menu-bar size=${size}>
    <rr-menu-item selected>Home</rr-menu-item>
    <rr-menu-item>Diensten</rr-menu-item>
    <rr-menu-item>Projecten</rr-menu-item>
    <rr-menu-item>Over ons</rr-menu-item>
    <rr-menu-item>Contact</rr-menu-item>
  </rr-menu-bar>
`;

// Primary story
export const Default = Template.bind({});
Default.args = {};

// With links
export const WithLinks = () => html`
  <rr-menu-bar>
    <rr-menu-item href="/" selected>Home</rr-menu-item>
    <rr-menu-item href="/diensten">Diensten</rr-menu-item>
    <rr-menu-item href="/projecten">Projecten</rr-menu-item>
    <rr-menu-item href="/over-ons">Over ons</rr-menu-item>
    <rr-menu-item href="/contact">Contact</rr-menu-item>
  </rr-menu-bar>
`;
WithLinks.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Menu bar met href attributen. Menu items worden weergegeven als anchor tags.',
    },
  },
};

// With disabled item
export const WithDisabledItem = () => html`
  <rr-menu-bar>
    <rr-menu-item selected>Home</rr-menu-item>
    <rr-menu-item>Diensten</rr-menu-item>
    <rr-menu-item disabled>Projecten</rr-menu-item>
    <rr-menu-item>Over ons</rr-menu-item>
    <rr-menu-item>Contact</rr-menu-item>
  </rr-menu-bar>
`;
WithDisabledItem.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Menu bar met een uitgeschakeld menu item. Disabled items zijn niet interactief.',
    },
  },
};

// With title - Small
export const WithTitleSmall = () => html`
  <rr-menu-bar size="s">
    <h2 slot="title" style="margin: 0;">Navigatie</h2>
    <rr-menu-item selected>Home</rr-menu-item>
    <rr-menu-item>Diensten</rr-menu-item>
    <rr-menu-item>Projecten</rr-menu-item>
    <rr-menu-item>Over ons</rr-menu-item>
    <rr-menu-item>Contact</rr-menu-item>
  </rr-menu-bar>
`;
WithTitleSmall.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Menu bar met een titel in small size (18px).',
    },
  },
};

// With title - Medium
export const WithTitleMedium = () => html`
  <rr-menu-bar size="m">
    <h2 slot="title" style="margin: 0;">Navigatie</h2>
    <rr-menu-item selected>Home</rr-menu-item>
    <rr-menu-item>Diensten</rr-menu-item>
    <rr-menu-item>Projecten</rr-menu-item>
    <rr-menu-item>Over ons</rr-menu-item>
    <rr-menu-item>Contact</rr-menu-item>
  </rr-menu-bar>
`;
WithTitleMedium.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Menu bar met een titel in medium size (20px, default).',
    },
  },
};

// With title - Large
export const WithTitleLarge = () => html`
  <rr-menu-bar size="l">
    <h2 slot="title" style="margin: 0;">Navigatie</h2>
    <rr-menu-item selected>Home</rr-menu-item>
    <rr-menu-item>Diensten</rr-menu-item>
    <rr-menu-item>Projecten</rr-menu-item>
    <rr-menu-item>Over ons</rr-menu-item>
    <rr-menu-item>Contact</rr-menu-item>
  </rr-menu-bar>
`;
WithTitleLarge.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Menu bar met een titel in large size (23px).',
    },
  },
};

// Interactive example
export const Interactive = () => {
  const handleItemSelect = (event) => {
    console.log('Selected item:', event.detail.item.textContent);
  };

  return html`
    <rr-menu-bar @itemselect=${handleItemSelect}>
      <rr-menu-item selected>Home</rr-menu-item>
      <rr-menu-item>Diensten</rr-menu-item>
      <rr-menu-item>Projecten</rr-menu-item>
      <rr-menu-item>Over ons</rr-menu-item>
      <rr-menu-item>Contact</rr-menu-item>
    </rr-menu-bar>
    <p style="margin-top: 1rem; color: #64748b; font-size: 14px;">
      Open de browser console om de 'itemselect' events te zien.
      <br>
      Gebruik de pijltjestoetsen (← →), Home en End om te navigeren.
    </p>
  `;
};
Interactive.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Interactief voorbeeld dat laat zien hoe de menu bar reageert op selectie. Ondersteunt ook keyboard navigatie met pijltjestoetsen.',
    },
  },
};

// States showcase
export const AllStates = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: #64748b;">Default state</h3>
      <rr-menu-bar>
        <rr-menu-item>Home</rr-menu-item>
        <rr-menu-item>Diensten</rr-menu-item>
        <rr-menu-item>Projecten</rr-menu-item>
      </rr-menu-bar>
    </div>

    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: #64748b;">With selection</h3>
      <rr-menu-bar>
        <rr-menu-item>Home</rr-menu-item>
        <rr-menu-item selected>Diensten</rr-menu-item>
        <rr-menu-item>Projecten</rr-menu-item>
      </rr-menu-bar>
    </div>

    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: #64748b;">With disabled item</h3>
      <rr-menu-bar>
        <rr-menu-item>Home</rr-menu-item>
        <rr-menu-item disabled>Diensten</rr-menu-item>
        <rr-menu-item selected>Projecten</rr-menu-item>
      </rr-menu-bar>
    </div>

    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: #64748b;">With title (size m)</h3>
      <rr-menu-bar size="m">
        <h2 slot="title" style="margin: 0;">Navigatie</h2>
        <rr-menu-item>Home</rr-menu-item>
        <rr-menu-item selected>Diensten</rr-menu-item>
        <rr-menu-item>Projecten</rr-menu-item>
      </rr-menu-bar>
    </div>
  </div>
`;
AllStates.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Overzicht van alle mogelijke states van de menu bar component.',
    },
  },
};

// Title sizes comparison
export const TitleSizes = () => html`
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: #64748b;">Small (18px)</h3>
      <rr-menu-bar size="s">
        <h2 slot="title" style="margin: 0;">Navigatie</h2>
        <rr-menu-item selected>Home</rr-menu-item>
        <rr-menu-item>Diensten</rr-menu-item>
        <rr-menu-item>Projecten</rr-menu-item>
      </rr-menu-bar>
    </div>

    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: #64748b;">Medium (20px, default)</h3>
      <rr-menu-bar size="m">
        <h2 slot="title" style="margin: 0;">Navigatie</h2>
        <rr-menu-item selected>Home</rr-menu-item>
        <rr-menu-item>Diensten</rr-menu-item>
        <rr-menu-item>Projecten</rr-menu-item>
      </rr-menu-bar>
    </div>

    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: #64748b;">Large (23px)</h3>
      <rr-menu-bar size="l">
        <h2 slot="title" style="margin: 0;">Navigatie</h2>
        <rr-menu-item selected>Home</rr-menu-item>
        <rr-menu-item>Diensten</rr-menu-item>
        <rr-menu-item>Projecten</rr-menu-item>
      </rr-menu-bar>
    </div>
  </div>
`;
TitleSizes.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Vergelijking van de verschillende title sizes.',
    },
  },
};
